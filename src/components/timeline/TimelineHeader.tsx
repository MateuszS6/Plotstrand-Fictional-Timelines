import { projectMediaTypes, type Project } from "../../types/project";
import UtilityIcon from "../layout/UtilityIcon";
import MajorProjectMarker from "../projects/MajorProjectMarker";

interface TimelineHeaderProps {
	projects: Project[];
}

export default function TimelineHeader({
	projects
}: TimelineHeaderProps) {
	return (
		<div className="timeline-row timeline-header">
			<div className="character-column timeline-corner">
				Character
			</div>

			{projects.map((project) => (
				<div
					key={project.id}
					className="project-column"
					data-major={project.is_major || undefined}
					title={project.title}
				>
					<span className="project-heading-title">
						{project.is_major && <><MajorProjectMarker /> </>}
						{project.title}
					</span>
					{(project.media_type || project.release_date) && (
						<div className="project-heading-metadata">
							{project.media_type && (
								<span className="project-heading-type">
									<UtilityIcon name={project.media_type} />
									{projectMediaTypes[project.media_type]}
								</span>
							)}
							{project.release_date && <span>{project.release_date.split("-")[0]}</span>}
						</div>
					)}
				</div>
			))}
		</div>
	)
}
