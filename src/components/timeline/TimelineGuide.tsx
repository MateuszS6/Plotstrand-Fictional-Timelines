import { useCallback, useRef, useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { APPEARANCE_OPTIONS, type AppearanceType } from "../../types/appearance";
import { CHARACTER_EVENT_OPTIONS } from "../../types/characterEvent";
import AppearanceEditor from "./AppearanceEditor";
import TimelineMarkers from "./TimelineMarkers";
import CloseButton from "../layout/CloseButton";

const descriptions: Record<AppearanceType, string> = {
	standard: "An ordinary appearance in the project.",
	flashback: "An appearance depicting an earlier moment.",
	footage: "A recording or reused footage of the character.",
	depiction: "A statue, picture, photograph or similar representation.",
	vision: "An appearance in a vision.",
	afterlife: "An appearance in an afterlife.",
	non_chronological: "An appearance outside this project's place in the chronology."
};

export default function TimelineGuide() {
	const { canEdit } = useWorkspace();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);
	const close = useCallback(() => setOpen(false), []);

	return (
		<div className="timeline-tools">
			<div ref={anchorRef}>
				<button
					type="button"
					className="utility-button timeline-guide-button"
					aria-label="Timeline guide"
					aria-haspopup="dialog"
					aria-expanded={open}
					onClick={() => setOpen((current) => !current)}
				>
					<span className="timeline-guide-icon" aria-hidden="true">?</span>
					<span className="timeline-guide-label">Help</span>
				</button>
			</div>

			{open && (
				<AppearanceEditor
					anchorRef={anchorRef}
					onClose={close}
					label="Timeline guide"
					className="timeline-legend-popup"
				>
					<div className="legend-heading">
						<h2>Timeline guide</h2>
						<CloseButton onClick={close} />
					</div>

					<div className="legend-body">
						<p className="legend-copy">
							Rows follow characters. Projects run left to right in
							timeline order, not release order.
						</p>

						<p className="legend-copy">
							{canEdit
								? " Touch: tap a cell to edit. Mouse: click a cell to add/remove; right-click to edit. Keyboard: focus a cell, then press Enter or Space."
								: "Select an entry for details, or a character name for their history."}
						</p>

						<details className="legend-section">
							<summary>Appearance symbols</summary>

							<ul className="legend-list">
								{APPEARANCE_OPTIONS.map((option) => (
									<li key={option.value}>
										<span
											className="legend-sample"
											aria-hidden="true"
										>
											<TimelineMarkers appearance={{
												appearance_type: option.value,
												is_detached: false
											}} />
										</span>

										<span>
											<strong>{option.label}</strong>
											<span className="legend-description">
												{descriptions[option.value]}
											</span>
										</span>
									</li>
								))}
							</ul>
						</details>

						<details className="legend-section">
							<summary>Event symbols</summary>

							<ul className="legend-list">
								{CHARACTER_EVENT_OPTIONS.map((option) => (
									<li key={option.value}>
										<span
											className="legend-sample"
											aria-hidden="true"
										>
											<TimelineMarkers characterEvent={{
												event_type: option.value,
												event_position: "at"
											}} />
										</span>

										<span>{option.label}</span>
									</li>
								))}
							</ul>
						</details>

						<details className="legend-section">
							<summary>Lines, positions and origins</summary>

							<ul className="legend-list">
								<li>
									<span className="legend-sample" aria-hidden="true">
										<span className="timeline-line timeline-line-right" />
										<TimelineMarkers
											isFirstConnected
											appearance={{
												appearance_type: "standard",
												is_detached: false
											}}
										/>
									</span>
									<span>
										Arrow: first connected appearance to the line.
									</span>
								</li>

								<li>
									<span className="legend-sample" aria-hidden="true">
										<TimelineMarkers appearance={{
											appearance_type: "standard",
											is_detached: true
										}} />
									</span>
									<span>
										Faded: shown separately from the character's continuity.
									</span>
								</li>

								<li>
									<span className="legend-sample" aria-hidden="true">
										<TimelineMarkers
											appearance={{
												appearance_type: "standard",
												is_detached: false
											}}
											characterEvent={{
												event_type: "death",
												event_position: "at"
											}}
										/>
									</span>
									<span>
										Symbol inside a dot: appearance and event at the same project.
									</span>
								</li>

								<li>
									<span className="legend-sample" aria-hidden="true">
										<span className="timeline-line timeline-line-left" />
										<span className="timeline-line timeline-line-right" />
										<TimelineMarkers characterEvent={{
											event_type: "unknown",
											event_position: "after"
										}} />
									</span>
									<span>
										Marker at the column edge: an event after that project
									</span>
								</li>
							</ul>
						</details>

						<p className="legend-copy">
							Lines connect recorded continuity. Faded appearances do not
							start or extend them. A line ending alone does not mean death.
							Some appearance/event combinations show separate symbols.
						</p>

						<p className="legend-copy">
							A label beside a visiting character names their origin.
							Select it to visit that timeline when available.
						</p>

						<p className="legend-copy">
							Swipe or scroll for more projects. Escape closes popups.
							{!canEdit && " Use Tab, then Enter or Space, to open entry details."}
						</p>
					</div>
				</AppearanceEditor>
			)}
		</div>
	);
}