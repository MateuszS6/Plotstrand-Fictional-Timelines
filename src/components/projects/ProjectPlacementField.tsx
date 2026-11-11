import { useId } from "react";
import type { Project } from "../../types/project";

interface ProjectPlacementFieldProps {
	projects: Project[];
	beforeProjectId: string;
	onChange: (beforeProjectId: string) => void;
	disabled?: boolean;
}

export default function ProjectPlacementField({
	projects,
	beforeProjectId,
	onChange,
	disabled
}: ProjectPlacementFieldProps) {
	const id = useId();
	const hintId = id + "-hint";

	return (
		<div className="form-field">
			<label htmlFor={id}>Place in this timeline</label>
			<select
				id={id}
				value={beforeProjectId}
				onChange={(event) => onChange(event.target.value)}
				disabled={disabled}
				aria-describedby={projects.length > 0 ? hintId : undefined}
			>
				<option value="">At the end</option>
				{projects.map((project) => (
					<option key={project.id} value={project.id}>
						{project.title}
					</option>
				))}
			</select>
			{projects.length > 0 && (
				<small id={hintId}>Choose the project that should come immediately after this one.</small>
			)}
		</div>
	);
}
