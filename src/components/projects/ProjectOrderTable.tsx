import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef, useState, type ReactNode } from "react";
import type { Project } from "../../types/project";
import UtilityIcon from "../layout/UtilityIcon";
import { createPortal } from "react-dom";

interface ProjectRow {
	project: Project;
	position: number;
}

interface Props {
	rows: ProjectRow[];
	disabled: boolean;
	headers: ReactNode;
	renderCells: (project: Project) => ReactNode;
	onDraggingChange: (dragging: boolean) => void;
	onMove: (
		projectId: number,
		beforeProjectId: number | null
	) => Promise<void>;
}

function SortableRow({
	project,
	position,
	disabled,
	children
}: ProjectRow & {
	disabled: boolean;
	children: ReactNode;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: project.id, disabled });

	return (
		<tr
			ref={setNodeRef}
			data-dragging={isDragging}
			style={{
				transform: CSS.Transform.toString(transform),
				transition
			}}
		>
			<td>
				<div className="project-order-cell">
					<button
						ref={setActivatorNodeRef}
						type="button"
						className="utility-button project-drag-handle"
						{...attributes}
						{...listeners}
						disabled={disabled}
						data-project-handle={project.id}
						aria-label={`Reorder ${project.title}`}
						title="Drag to reorder; or press Space, arrow keys, then Space"
					>
						<UtilityIcon name="drag" />
					</button>

					<span>{position}</span>
				</div>
			</td>

			{children}
		</tr>
	)
}

export default function ProjectOrderTable({
	rows,
	disabled,
	headers,
	renderCells,
	onDraggingChange,
	onMove
}: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeId, setActiveId] = useState<number | null>(null);

	const activeProject = rows.find(
		({ project }) => project.id === activeId
	)?.project;

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 }
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	const projectName = (id: string | number) =>
		rows.find(({ project }) => project.id === id)?.project.title
		?? "Project";

	function finishDrag() {
		setActiveId(null);
		onDraggingChange(false);
	}

	async function handleDragEnd({
		active,
		over,
		activatorEvent
	}: DragEndEvent) {
		finishDrag();

		if (disabled || !over || active.id === over.id) return;

		const from = rows.findIndex(
			({ project }) => project.id === active.id
		);
		const to = rows.findIndex(
			({ project }) => project.id === over.id
		);

		if (from < 0 || to < 0) return;

		const reordered = arrayMove(rows, from, to);

		await onMove(
			Number(active.id),
			reordered[to + 1]?.project.id ?? null
		);

		if (activatorEvent instanceof KeyboardEvent) {
			requestAnimationFrame(() => {
				containerRef.current?.querySelector<HTMLButtonElement>(
					`[data-project-handle="${active.id}"]`
				)?.focus();
			});
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={(args) => {
				const point = args.pointerCoordinates;
				const rect = containerRef.current?.getBoundingClientRect();

				if (point && rect && (
					point.x < rect.left ||
					point.x > rect.right ||
					point.y < rect.top ||
					point.y > rect.bottom
				)) {
					return [];
				}

				return closestCenter(args);
			}}
			onDragStart={({ active }) => {
				setActiveId(Number(active.id));
				onDraggingChange(true);
			}}
			onDragCancel={finishDrag}
			onDragEnd={event => {
				void handleDragEnd(event);
			}}
			accessibility={{
				screenReaderInstructions: {
					draggable:
						"Press Space to pick up a project. " +
						"Use Up and Down to move it. " +
						"Press Space to drop and save, or Escape to cancel."
				},
				announcements: {
					onDragStart: ({ active }) =>
						`Picked up ${projectName(active.id)}.`,
					onDragOver: ({ over }) => over
						? `Position ${rows.findIndex(
							({ project }) => project.id === over.id
						) + 1} of ${rows.length}.`
						: "Outside the list. Dropping here cancels the move.",
					onDragEnd: ({ active, over }) =>
						over && active.id !== over.id
							? `Dropped ${projectName(active.id)}. Saving order.`
							: "Order unchanged.",
					onDragCancel: () =>
						"Move cancelled. Order unchanged."
				}
			}}
		>
			<div
				ref={containerRef}
				className="management-table-container"
			>
				<table className="management-table">
					<thead>
						<tr>
							<th scope="col">Order</th>
							{headers}
						</tr>
					</thead>

					<SortableContext
						items={rows.map(({ project }) => project.id)}
						strategy={verticalListSortingStrategy}
					>
						<tbody>
							{rows.map(({ project, position }) => (
								<SortableRow
									key={project.id}
									project={project}
									position={position}
									disabled={disabled}
								>
									{renderCells(project)}
								</SortableRow>
							))}
						</tbody>
					</SortableContext>
				</table>
			</div>

			{createPortal(
				<DragOverlay dropAnimation={null}>
					{activeProject && (
						<div className="project-drag-preview">
							{activeProject.title}
						</div>
					)}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	);
}