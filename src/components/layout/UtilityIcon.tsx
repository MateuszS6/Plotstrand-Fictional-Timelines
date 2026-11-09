type UtilityIconName =
	| "add"
	| "edit"
	| "timeline"
	| "delete"
	| "lock"
	| "close"
	| "drag";

const paths: Record<UtilityIconName, string> = {
	add: "M12 5v14M5 12h14",
	edit: "m16 3 5 5-12 12-6 1 1-6ZM14 5l5 5",
	timeline: "M3 12h18M6 7v10M12 9v6M18 7v10",
	delete: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
	lock: "M6 10h12v11H6zM8 10V7a4 4 0 0 1 8 0v3",
	close: "M6 6l12 12M18 6 6 18",
	drag: "M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01",
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