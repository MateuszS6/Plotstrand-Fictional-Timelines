export const projectMediaTypes = {
	film: "Film",
	series: "Series",
	short: "Short",
	special: "Special",
	video: "Video",
	game: "Game"
} as const;

export type ProjectMediaType = keyof typeof projectMediaTypes;

export interface ProjectInput {
	title: string;
	release_date: string | null;
	primary_universe_id: number;
	media_type: ProjectMediaType | null;
	is_major: boolean;
}

export interface Project extends ProjectInput {
	id: number;
}
