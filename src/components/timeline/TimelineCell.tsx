import { useCallback, useRef, useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { APPEARANCE_OPTIONS, type Appearance, type AppearanceType, type AppearanceUpdate } from "../../types/appearance";
import { CHARACTER_EVENT_OPTIONS, type CharacterEvent, type CharacterEventPosition, type CharacterEventType } from "../../types/characterEvent";
import CloseButton from "../layout/CloseButton";
import AnchoredPopup from "./AnchoredPopup";
import TimelineMarkers from "./TimelineMarkers";

interface TimelineCellProps {
	characterId: number;
	projectId: number;

	characterName: string;
	projectTitle: string;

	appearance?: Appearance;
	characterEvent?: CharacterEvent;

	lineLeft: boolean;
	lineRight: boolean;
	isFirstConnected: boolean;

	onCreate: (
		characterId: number,
		projectId: number
	) => void;

	onUpdate: (
		characterId: number,
		projectId: number,
		updates: AppearanceUpdate
	) => void;

	onDelete: (
		characterId: number,
		projectId: number
	) => void;

	onSaveEvent: (
		characterId: number,
		projectId: number,
		eventType: CharacterEventType,
		eventPosition: CharacterEventPosition
	) => void;

	onDeleteEvent: (
		characterId: number,
		projectId: number
	) => void;

	saving: boolean;
}

export default function TimelineCell({
	characterId,
	projectId,
	characterName,
	projectTitle,
	appearance,
	characterEvent,
	lineLeft,
	lineRight,
	isFirstConnected,
	onCreate,
	onUpdate,
	onDelete,
	onSaveEvent,
	onDeleteEvent,
	saving
}: TimelineCellProps) {
	const { canEdit } = useWorkspace();
	const hasDetails = Boolean(appearance || characterEvent)
	const interactive = canEdit || hasDetails;

	const [editorOpen, setEditorOpen] = useState(false);
	const cellRef = useRef<HTMLDivElement>(null);
	const pointerTypeRef = useRef("");

	const closeEditor = useCallback(() => {
		setEditorOpen(false);
	}, []);

	function handleLeftClick(
		event: React.MouseEvent<HTMLDivElement>
	) {
		if (saving) return;

		if (!canEdit) {
			if (hasDetails) setEditorOpen((open) => !open);
			return;
		}

		if (
			pointerTypeRef.current === "touch" ||
			pointerTypeRef.current === "pen" ||
			event.detail === 0 // Non-pointer activation gives editor
		) {
			setEditorOpen(true);
			return;
		}

		if (!appearance) {
			onCreate(characterId, projectId);
		} else {
			onDelete(characterId, projectId);
			setEditorOpen(false);
		}
	}

	function handleRightClick(
		event: React.MouseEvent<HTMLDivElement>
	) {
		if (!canEdit) return;

		event.preventDefault();

		if (saving) return;

		// Empty cell can still contain/edit a timeline event.
		setEditorOpen((open) => !open);
	}

	function handleAppearanceTypeChange(type: AppearanceType) {
		if (!appearance || saving) return;

		// Selecting the current type keeps any manual detachment choice.
		if (appearance.appearance_type === type) {
			setEditorOpen(false);
			return;
		}

		onUpdate(characterId, projectId, {
			appearance_type: type,
			is_detached: type !== "standard" || appearance.is_detached
		});

		setEditorOpen(false);
	}

	function handleEventTypeChange(
		type: CharacterEventType
	) {
		onSaveEvent(
			characterId,
			projectId,
			type,
			characterEvent?.event_position ?? "at"
		);
	}

	function handleEventPositionChange(
		position: CharacterEventPosition
	) {
		if (!characterEvent) return;

		onSaveEvent(
			characterId,
			projectId,
			characterEvent.event_type,
			position
		);
	}

	function handleDeleteEvent(
		event: React.MouseEvent
	) {
		event.stopPropagation();

		onDeleteEvent(
			characterId,
			projectId
		);
	}

	return (
		<div
			ref={cellRef}
			className={
				canEdit
					? "timeline-cell"
					: "timeline-cell timeline-cell-viewer"
			}
			role={interactive ? "button" : undefined}
			tabIndex={interactive ? 0 : undefined}
			aria-label={
				interactive
					? `${canEdit ? "Edit" : "Details for"} ${characterName} in ${projectTitle}`
					: undefined
			}
			aria-haspopup={interactive ? "dialog" : undefined}
			aria-expanded={interactive ? editorOpen : undefined}
			aria-disabled={saving}
			onPointerDown={(event) => {
				pointerTypeRef.current = event.pointerType
			}}
			onClick={handleLeftClick}
			onContextMenu={handleRightClick}
			onKeyDown={(event) => {
				if (event.target !== event.currentTarget) return;

				if (
					interactive &&
					(event.key === "Enter" || event.key === " ")
				) {
					event.preventDefault();
					if (!saving) setEditorOpen((open) => !open);
				}
			}}
		>
			{/* CONNECTOR(S) */}

			{lineLeft && (
				<span className="timeline-line timeline-line-left" />
			)}

			{lineRight && (
				<span className="timeline-line timeline-line-right" />
			)}

			{/* APPEARANCE AND/OR EVENT MARKER(S) */}

			<TimelineMarkers
				appearance={appearance}
				characterEvent={characterEvent}
				isFirstConnected={isFirstConnected}
			/>

			{/* VIEWER | EDITOR */}

			{editorOpen && interactive && (
				<AnchoredPopup
					anchorRef={cellRef}
					onClose={closeEditor}
					className="cell-popup"
					label={`${canEdit ? "Edit " : ""}${characterName} — ${projectTitle}`}
				>
					{/* HEADING */}

					<div className="cell-popup-heading">
						<div className="cell-popup-heading-text">
							<strong>{characterName}</strong>

							<p className="cell-project">
								<span>Project</span>
								{projectTitle}
							</p>
						</div>

						<CloseButton onClick={closeEditor} />
					</div>

					{/* BODY */}

					<div className="cell-popup-body">
						{/* APPEARANCE SECTION */}

						{(canEdit || appearance) && (
							<section className="cell-popup-section" aria-label="Appearance">
								<h3>Appearance</h3>

								{canEdit ? (
									// STUDIO
									appearance ? (
										<>
											<div className="cell-choices">
												{APPEARANCE_OPTIONS.map(option => (
													<button
														key={option.value}
														type="button"
														disabled={saving}
														aria-pressed={appearance.appearance_type === option.value}
														className={
															"cell-choice" +
															(appearance.appearance_type === option.value ? " active" : "")
														}
														onClick={() => handleAppearanceTypeChange(option.value)}
													>
														{option.label}
													</button>
												))}
											</div>

											<div className="cell-control-group">
												<label className="cell-detach-control">
													<input
														type="checkbox"
														checked={appearance.is_detached}
														disabled={saving}
														onChange={event =>
															onUpdate(characterId, projectId, {
																is_detached: event.target.checked
															})
														}
													/>
													Detached from lifeline
												</label>
											</div>

											<button
												type="button"
												disabled={saving}
												className="cell-action cell-action-danger"
												onClick={() => {
													onDelete(characterId, projectId);
													setEditorOpen(false);
												}}
											>
												Remove appearance
											</button>
										</>
									) : (
										<button
											type="button"
											disabled={saving}
											className="cell-action"
											onClick={() => {
												onCreate(characterId, projectId);
												setEditorOpen(false);
											}}
										>
											Add standard appearance
										</button>
									)
								) : (
									// VIEWER
									<>
										<p>
											{APPEARANCE_OPTIONS.find(
												option => option.value === appearance?.appearance_type
											)?.label}
										</p>
										<p className="cell-secondary">
											{appearance?.is_detached
												? "Detached from the lifeline"
												: "Connected to the lifeline"}
										</p>
									</>
								)}
							</section>
						)}

						{/* EVENT SECTION */}

						{(canEdit || characterEvent) && (
							<section className="cell-popup-section" aria-label="Event">
								<h3>Event</h3>

								{canEdit ? (
									// STUDIO
									<>
										<div className="cell-choices">
											{CHARACTER_EVENT_OPTIONS.map(option => (
												<button
													key={option.value}
													type="button"
													disabled={saving}
													aria-pressed={characterEvent?.event_type === option.value}
													className={
														"cell-choice" +
														(characterEvent?.event_type === option.value ? " active" : "")
													}
													onClick={() => handleEventTypeChange(option.value)}
												>
													{option.label}
												</button>
											))}
										</div>

										{characterEvent && (
											<>
												<div className="cell-control-group">
													<label className="cell-position-control">
														<span>Position</span>

														<select
															value={characterEvent.event_position}
															disabled={saving}
															onChange={event => handleEventPositionChange(
																event.target.value === "after" ? "after" : "at"
															)}
														>
															<option value="at">At project</option>
															<option value="after">After project</option>
														</select>
													</label>
												</div>

												<button
													type="button"
													disabled={saving}
													className="cell-action cell-action-danger"
													onClick={handleDeleteEvent}
												>
													Remove event
												</button>
											</>
										)}
									</>
								) : (
									// VIEWER
									<>
										<p>
											{CHARACTER_EVENT_OPTIONS.find(
												option => option.value === characterEvent?.event_type
											)?.label}
										</p>
										<p className="cell-secondary">
											{characterEvent?.event_position === "after"
												? "After this project"
												: "At this project"}
										</p>
									</>
								)}
							</section>
						)}
					</div>
				</AnchoredPopup>
			)}
		</div >
	);
}