export type TimelineContentStatus = "in_progress" | "up_to_date";

export interface Universe {
	id: number;
	franchise_id: number;
	name: string;
	code: string | null;
	content_status: TimelineContentStatus;
	is_published: boolean;
}

export interface UniverseInput {
	name: string;
	code: string | null;
	content_status: TimelineContentStatus;
	is_published: boolean;
}

export interface UniverseProjects {
	universe_id: number;
	project_id: number;
	timeline_position: number;
}