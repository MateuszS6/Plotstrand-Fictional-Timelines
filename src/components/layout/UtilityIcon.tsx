import type { ProjectMediaType } from "../../types/project";

type UtilityIconName =
	| "add"
	| "edit"
	| "timeline"
	| "delete"
	| "lock"
	| "close"
	| "drag"
	| "star"
	| ProjectMediaType;

const paths: Record<UtilityIconName, string> = {
	add: "M12 5v14M5 12h14",
	edit: "m16 3 5 5-12 12-6 1 1-6ZM14 5l5 5",
	timeline: "M3 12h18M6 7v10M12 9v6M18 7v10",
	delete: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
	lock: "M6 10h12v11H6zM8 10V7a4 4 0 0 1 8 0v3",
	close: "M6 6l12 12M18 6 6 18",
	drag: "M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01",
	star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z",
	film: "M3 4h18v16H3zM7 4v16M17 4v16M3 9h4m-4 6h4M17 9h4m-4 6h4",
	series: "M3 5h18v12H3zM8 21h8m-4-4v4",
	short: "M3 5h18v14H3zM9 9l5 3-5 3zM17 10v4",
	special: "M12 3c0 6-3 9-9 9 6 0 9 3 9 9 0-6 3-9 9-9-6 0-9-3-9-9Z",
	video: "M3 5h18v14H3zM10 8l6 4-6 4Z",
	game: "M8 7h8c2 0 3.5 1.4 4 3.5l1 4c.7 2.8-1.4 4-3.4 2.5l-2.5-2h-6l-2.5 2c-2 1.5-4.1.3-3.4-2.5l1-4C4.7 8.4 6 7 8 7Zm0 2v4m-2-2h4m6-1h.01m2 2h.01"
}

export default function UtilityIcon({
	name
}: {
	name: UtilityIconName
}) {
	return (
		<svg
			className="utility-icon"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.8}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d={paths[name]} />
		</svg>
	);
}
