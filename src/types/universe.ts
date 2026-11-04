export type UniverseType = "universe" | "location";

export type TimelineContentStatus = "in_progress" | "up_to_date";

export interface Universe {
	id: number;
	franchise_id: number;
	name: string;
	universe_type: UniverseType;
	code: string | null;
	content_status: TimelineContentStatus;
	is_published: boolean;
}

export interface UniverseInput {
	name: string;
	universe_type: UniverseType;
	code: string | null;
	content_status: TimelineContentStatus;
	is_published: boolean;
}

export interface UniverseProjects {
	universe_id: number;
	project_id: number;
	timeline_position: number;
}