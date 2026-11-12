import { useEffect, useRef, useState } from "react";
import UtilityIcon from "../components/layout/UtilityIcon";
import MajorProjectMarker from "../components/projects/MajorProjectMarker";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectOrderTable from "../components/projects/ProjectOrderTable";
import ProjectPlacementField from "../components/projects/ProjectPlacementField";
import { useWorkspace } from "../context/WorkspaceContext";
import { deleteProject, getProjectsForPrimaryUniverses, getProjectsForUniverse, placeProjectInUniverse, saveProjectInUniverse, unlinkProjectToUniverse } from "../services/projects";
import { projectMediaTypes, type Project, type ProjectInput } from "../types/project";
import { formatUniverseLabel } from "../utils/formatUniverseLabel";

const releaseDateFormatter = new Intl.DateTimeFormat("en-GB", {
	dateStyle: "medium",
	timeZone: "UTC"
});

interface ProjectsPageProps {
	universeId: number;
	showPrimaryUniverses: boolean;
}

export default function ProjectsPage({
	universeId,
	showPrimaryUniverses: showOrigin
}: ProjectsPageProps) {
	const { universes } = useWorkspace();

	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [loadAttempt, setLoadAttempt] = useState(0);

	const [search, setSearch] = useState("");

	const [editor, setEditor] = useState<Project | "new" | null>(null);
	const pageRef = useRef<HTMLElement>(null);

	const [libraryOpen, setLibraryOpen] = useState(false);
	const libraryButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (editor !== null || libraryOpen) {
			pageRef.current?.scrollTo({ top: 0 });
		}
	}, [editor, libraryOpen]);

	const [notice, setNotice] = useState<string | null>(null);
	const [actionError, setActionError] = useState<string | null>(null);

	const [libraryProjects, setLibraryProjects] = useState<Project[]>([]);
	const [existingProjectId, setExistingProjectId] = useState("");
	const [beforeProjectId, setBeforeProjectId] = useState("");
	const [savingPlacement, setSavingPlacement] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [needsReload, setNeedsReload] = useState(false);
	const [removingId, setRemovingId] = useState<number | null>(null);

	const [deletingId, setDeletingId] = useState<number | null>(null);
	const changingRef = useRef(false);

	const actionsDisabled =
		editor !== null ||
		deletingId !== null ||
		savingPlacement ||
		needsReload ||
		removingId !== null;

	const controlsDisabled = actionsDisabled || dragging;

	const availableProjects = libraryProjects.filter((project) =>
		!projects.some((linked) => linked.id === project.id)
	);

	const query = search.trim().toLowerCase();

	const matchingProjects = projects
		.map((project, index) => ({
			project,
			position: index + 1
		}))
		.filter(({ project }) =>
			project.title.toLowerCase().includes(query)
		);

	useEffect(() => {
		let cancelled = false;

		async function loadProjects() {
			try {
				const [data, library] = await Promise.all([
					getProjectsForUniverse(universeId),
					getProjectsForPrimaryUniverses(
						universes.map((universe) => universe.id)
					)
				]);

				if (cancelled) return;

				setProjects(data);
				setLibraryProjects(library);
				setNeedsReload(false);
			} catch (error) {
				if (cancelled) return;

				console.error(error);
				setError("Could not load projects.")
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		void loadProjects();

		return () => {
			cancelled = true;
		}
	}, [universeId, universes, loadAttempt])

	function retry() {
		setActionError(null);
		setError(null);
		setLoading(true);
		setLoadAttempt((current) => current + 1);
	}

	function openEditor(value: Project | "new") {
		setNotice(null);
		setActionError(null);
		setLibraryOpen(false);
		setEditor(value);
	}

	async function handleSave(
		input: ProjectInput,
		position: number
	): Promise<void> {
		if (editor === null) throw new Error("No project editor is open.")

		const orderedProjects = await saveProjectInUniverse(
			universeId,
			editor === "new" ? null : editor.id,
			input,
			position
		);

		setProjects(orderedProjects);

		setLibraryProjects((current) => {
			const updatedIds = new Set(
				orderedProjects.map((project) => project.id)
			);

			return [
				...current.filter((project) => !updatedIds.has(project.id)),
				...orderedProjects
			].filter((project) =>
				universes.some((universe) =>
					universe.id === project.primary_universe_id
				)
			).sort((a, b) =>
				a.title.localeCompare(b.title) || a.id - b.id
			);
		});

		setNotice(`${input.title} saved.`);
		setEditor(null);
	}

	async function handleDelete(project: Project) {
		if (changingRef.current || editor !== null) return;

		const confirmed = window.confirm(
			`Permanently delete "${project.title}"?\n\n` +
			"This removes the project from every universe and deletes " +
			"all appearances and character events attached to it.\n\n" +
			"This cannot be undone."
		);

		if (!confirmed) return;

		changingRef.current = true;
		setDeletingId(project.id);
		setActionError(null);
		setNotice(null);

		try {
			await deleteProject(project.id);

			setProjects((current) =>
				current.filter((item) => item.id !== project.id)
			);

			setLibraryProjects((current) =>
				current.filter((item) => item.id !== project.id)
			);

			setExistingProjectId("");
			setBeforeProjectId(current =>
				current === String(project.id) ? "" : current
			);
			setNotice(`${project.title} deleted.`)
		} catch (caughtError) {
			console.error(caughtError);
			setActionError("Could not delete the project. Please try again.");
		} finally {
			changingRef.current = false;
			setDeletingId(null);
		}
	}

	async function placeProject(
		project: Project,
		beforeId: number | null,
		add: boolean
	): Promise<boolean> {
		if (changingRef.current || editor !== null || needsReload) return false;

		const previous = projects;
		const others = previous.filter(item => item.id !== project.id);

		const index = beforeId === null
			? others.length
			: others.findIndex(item => item.id === beforeId);

		if (index < 0) {
			setActionError("Choose a placement again; that project is no longer available.");
			return false;
		}

		changingRef.current = true;
		setSavingPlacement(true);
		setNotice(null);
		setActionError(null);

		if (!add) {
			const optimistic = [...others];
			optimistic.splice(index, 0, project);
			setProjects(optimistic);
		}

		try {
			const saved = await placeProjectInUniverse(
				universeId,
				project.id,
				previous.map(item => item.id),
				beforeId,
				add
			);

			setProjects(saved);

			setNotice(add
				? project.title + " added to this timeline."
				: "Project order saved."
			);

			return true;
		} catch (caughtError) {
			console.error(caughtError);
			setProjects(previous);

			try {
				// The save may have succeeded even if its response was lost.
				const [latest, library] = await Promise.all([
					getProjectsForUniverse(universeId),
					getProjectsForPrimaryUniverses(
						universes.map(item => item.id)
					)
				]);

				setProjects(latest);
				setLibraryProjects(library);

				setExistingProjectId(current =>
					library.some(item => item.id === Number(current)) &&
						!latest.some(item => item.id === Number(current))
						? current
						: ""
				);

				setBeforeProjectId(current =>
					latest.some(item => item.id === Number(current))
						? current
						: ""
				);

				setActionError(
					"The change could not be confirmed. " +
					"The saved list has been reloaded; " +
					"check its order before trying again."
				);

			} catch (reloadError) {
				console.error(reloadError);
				setNeedsReload(true);

				setActionError(
					"The saved order could not be checked. " +
					"Reload projects before making more changes."
				);
			}

			return false;
		} finally {
			changingRef.current = false;
			setSavingPlacement(false);
		}
	}

	async function handleMoveProject(
		projectId: number,
		beforeId: number | null
	) {
		const project = projects.find(item => item.id === projectId);

		if (project && !query && !libraryOpen) {
			await placeProject(project, beforeId, false);
		}
	}

	async function handleLinkProject() {
		const project = availableProjects.find((item) =>
			item.id === Number(existingProjectId)
		);

		if (!project) return;

		const saved = await placeProject(
			project,
			beforeProjectId === "" ? null : Number(beforeProjectId),
			true
		);

		if (saved) {
			setExistingProjectId("");
			setBeforeProjectId("");
		}
	}

	async function handleUnlinkProject(project: Project) {
		if (changingRef.current || editor !== null) return;

		const confirmed = window.confirm(
			`Remove "${project.title}" from this timeline?\n\n` +
			"This deletes its appearances and events on this timeline.\n\n" +
			"The project and its entries on other timelines stay saved. " +
			"Adding it here again starts with empty cells.\n\n" +
			"The deleted entries cannot be recovered."
		);

		if (!confirmed) return;

		changingRef.current = true;
		setRemovingId(project.id);
		setNotice(null);
		setActionError(null);

		try {
			await unlinkProjectToUniverse(universeId, project.id);

			setProjects(current =>
				current.filter(item => item.id !== project.id)
			);

			setBeforeProjectId(current =>
				current === String(project.id) ? "" : current
			);

			setNotice(`${project.title} removed from this timeline.`);
		} catch (caughtError) {
			console.error(caughtError);
			setActionError(
				"Could not remove the project from this timeline. Please try again."
			);
		} finally {
			changingRef.current = false;
			setRemovingId(null);
		}
	}

	if (loading) {
		return (
			<p className="status-message" role="status">
				Loading projects...
			</p>
		)
	}

	if (error) {
		return (
			<div className="status-message status-error" role="alert">
				<p>{error}</p>
				<button
					type="button"
					className="utility-button"
					onClick={retry}
				>
					Try again
				</button>
			</div>
		);
	}

	return (
		<section
			ref={pageRef}
			className="management-page management-page-compact"
			aria-label="Projects"
		>
			<div className="management-toolbar">
				<label className="form-field management-search">
					<input
						type="search"
						disabled={savingPlacement || dragging || needsReload}
						aria-label="Search projects"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search projects"
					/>
				</label>

				{search && (
					<button
						type="button"
						disabled={savingPlacement || dragging || needsReload}
						className="utility-button"
						onClick={() => setSearch("")}
					>
						Clear search
					</button>
				)}

				{query && (
					<p className="management-summary">
						{matchingProjects.length}{" of "}
						{projects.length}{" "}
						{projects.length === 1 ? "project" : "projects"}
						{" · Clear search to drag rows"}
					</p>
				)}

				<button
					ref={libraryButtonRef}
					type="button"
					className="utility-button"
					disabled={controlsDisabled}
					aria-expanded={libraryOpen}
					aria-controls="existing-project-form"
					onClick={() => setLibraryOpen((open) => !open)}
				>
					<UtilityIcon name="add" /> Add existing
				</button>

				<button
					type="button"
					className="utility-button"
					disabled={controlsDisabled}
					onClick={() => openEditor("new")}
				>
					<UtilityIcon name="add" /> New project
				</button>
			</div>

			{savingPlacement && (
				<p className="management-notice" role="status">
					Saving project order...
				</p>
			)}

			{needsReload && (
				<button
					type="button"
					className="utility-button"
					onClick={retry}
				>
					Reload projects
				</button>
			)}

			{notice && (
				<p className="management-notice" role="status">
					{notice}
				</p>
			)}

			{actionError && (
				<p className="form-error" role="alert">
					{actionError}
				</p>
			)}

			{editor !== null && (
				<ProjectForm
					key={editor === "new" ? "new" : editor.id}
					project={editor === "new" ? null : editor}
					universeId={universeId}
					universes={universes}
					projects={projects}
					onSave={handleSave}
					onCancel={() => setEditor(null)}
				/>
			)}

			{libraryOpen && (
				<form
					id="existing-project-form"
					className="management-form"
					aria-label="Add existing project"
					onSubmit={(event) => {
						event.preventDefault();
						void handleLinkProject();
					}}
				>
					<fieldset disabled={controlsDisabled}>
						<div className="form-fields">
							<label className="form-field">
								<span>Project from this franchise</span>

								<select
									value={existingProjectId}
									onChange={(event) => setExistingProjectId(event.target.value)}
									disabled={availableProjects.length === 0}
									autoFocus
									required
								>
									<option value="" disabled>
										{availableProjects.length === 0
										? "No unlinked projects in this franchise"
											: "Choose a project"}
									</option>

									{availableProjects.map((project) => (
										<option key={project.id} value={project.id}>
											{project.title}{" — "}
											{formatUniverseLabel(
												project.primary_universe_id,
												universes
											)}
										</option>
									))}
								</select>

								<small>
									The project starts with empty cells on this timeline.
								</small>
							</label>

							<ProjectPlacementField
								projects={projects}
								beforeProjectId={beforeProjectId}
								onChange={setBeforeProjectId}
								disabled={availableProjects.length === 0}
							/>
						</div>

						<div className="form-actions">
							<button
								type="submit"
								className="utility-button"
								disabled={!existingProjectId}
							>
								{savingPlacement ? "Adding..." : "Add to timeline"}
							</button>

							<button
								type="button"
								className="utility-button"
								onClick={() => {
									setLibraryOpen(false);
									libraryButtonRef.current?.focus({
										preventScroll: true
									});
								}}
							>
								Close
							</button>
						</div>
					</fieldset>
				</form>
			)}

			{matchingProjects.length === 0 ? (
				<p className="status-message">
					{projects.length === 0
						? "No projects are linked to this universe."
						: "No linked projects match your search. Clear it or try another title."
					}
				</p>
			) : (
				<ProjectOrderTable
					rows={matchingProjects}
					disabled={
						actionsDisabled ||
						libraryOpen ||
						!!query ||
						projects.length < 2
					}
					onDraggingChange={setDragging}
					onMove={handleMoveProject}
					headers={
						<>
							<th scope="col">Project</th>
							<th scope="col">Type</th>
							<th scope="col">Release date</th>
							{showOrigin && (
								<th scope="col">Primary universe</th>
							)}
							<th scope="col">Actions</th>
						</>
					}
					renderCells={project => (
						<>
							<td className="management-name">
								<strong>{project.title}</strong>
								{project.is_major && <> <MajorProjectMarker /></>}
							</td>

							<td>{project.media_type ? projectMediaTypes[project.media_type] : "Not set"}</td>
							<td>
								{project.release_date ? (
									<time dateTime={project.release_date}>
										{releaseDateFormatter.format(new Date(project.release_date))}
									</time>
								) : "Not set"}
							</td>

							{showOrigin && (
								<td>
									{formatUniverseLabel(project.primary_universe_id, universes)}
								</td>
							)}

							<td>
								<div className="management-row-actions">
									<button
										type="button"
										className="utility-button"
										disabled={controlsDisabled}
										aria-label={`Edit ${project.title}`}
										onClick={() => openEditor(project)}
									>
										<UtilityIcon name="edit" /> Edit
									</button>

									<button
										type="button"
										className="utility-button"
										disabled={controlsDisabled}
										onClick={() => handleUnlinkProject(project)}
									>
										{removingId === project.id
											? "Removing..."
											: "Remove from timeline"}
									</button>

									<button
										type="button"
										className="utility-button utility-button-danger"
										disabled={controlsDisabled}
										aria-label={`Delete ${project.title}`}
										onClick={() => handleDelete(project)}
									>
										<UtilityIcon name="delete" />
										{deletingId === project.id ? "Deleting..." : "Delete"}
									</button>
								</div>
							</td>
						</>
					)}
				/>
			)}
		</section >
	);
}
