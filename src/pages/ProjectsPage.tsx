import { useEffect, useRef, useState } from "react";
import UtilityIcon from "../components/layout/UtilityIcon";
import ProjectForm from "../components/projects/ProjectForm";
import { useWorkspace } from "../context/WorkspaceContext";
import { deleteProject, getProjectsForPrimaryUniverses, getProjectsForUniverse, linkProjectToUniverse, saveProjectInUniverse, unlinkProjectToUniverse } from "../services/projects";
import type { Project, ProjectInput } from "../types/project";
import { formatUniverseLabel } from "../utils/formatUniverseLabel";

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
	const [linking, setLinking] = useState(false);
	const [removingId, setRemovingId] = useState<number | null>(null);

	const [deletingId, setDeletingId] = useState<number | null>(null);
	const changingRef = useRef(false);

	const controlsDisabled =
		editor !== null ||
		deletingId !== null ||
		linking ||
		removingId !== null;

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
			setNotice(`${project.title} deleted.`)
		} catch (caughtError) {
			console.error(caughtError);
			setActionError("Could not delete the project. Please try again.");
		} finally {
			changingRef.current = false;
			setDeletingId(null);
		}
	}

	async function handleLinkProject() {
		if (changingRef.current || editor !== null) return;

		const project = availableProjects.find((item) =>
			item.id === Number(existingProjectId)
		);

		if (!project) return;

		changingRef.current = true
		setLinking(true);
		setNotice(null);
		setActionError(null);

		try {
			const orderedProjects = await linkProjectToUniverse(
				universeId,
				project.id
			);

			setProjects(orderedProjects);
			setExistingProjectId("");
			setNotice(`${project.title} added to this timeline.`);
		} catch (caughtError) {
			console.error(caughtError);
			setActionError(
				"Could not add the project to this timeline. Please try again."
			);
		} finally {
			changingRef.current = false;
			setLinking(false);
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

			setProjects((current) =>
				current.filter((item) => item.id !== project.id)
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
						aria-label="Search projects"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search projects"
					/>
				</label>

				{search && (
					<button
						type="button"
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
										? "No other projects in this franchise"
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
								Adds it at the end with empty cells. Use Edit to change its timeline position.
							</small>
						</label>

						<div className="form-actions">
							<button
								type="submit"
								className="utility-button"
								disabled={!existingProjectId}
							>
								{linking ? "Adding..." : "Add to timeline"}
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
				<div className="management-table-container">
					<table className="management-table">
						<thead>
							<tr>
								<th scope="col">Order</th>
								<th scope="col">Project</th>
								<th scope="col">Release date</th>
								{showOrigin && (
									<th scope="col">Primary universe</th>
								)}
								<th scope="col">Actions</th>
							</tr>
						</thead>

						<tbody>
							{matchingProjects.map(({ project, position }) => (
								<tr key={project.id}>
									<td>{position}</td>

									<td className="management-name">
										<strong>{project.title}</strong>
									</td>

									<td>{project.release_date ?? "Not set"}</td>

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
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}