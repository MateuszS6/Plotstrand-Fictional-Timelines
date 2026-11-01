import type { TimelineContentStatus } from "../../types/universe";

export default function TimelineStatus({
	status
}: {
	status: TimelineContentStatus;
}) {
	const upToDate = status === "up_to_date";

	return (
		<span
			className="timeline-status"
			data-status={upToDate ? "up_to_date" : "in_progress"}
			title={upToDate
				? "Marked up to date by the editor; this is a manual coverage label."
				: "This timeline is incomplete and is still being populated."
			}
		>
			{upToDate ? "Up to date" : "In progress"}
		</span>
	);
}