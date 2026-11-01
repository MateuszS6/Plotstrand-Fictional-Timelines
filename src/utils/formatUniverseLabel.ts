import type { Universe } from "../types/universe";

export function formatUniverseLabel(
	universeId: number,
	universes: Universe[]
): string {
	const universe = universes.find((item) => item.id === universeId);

	if (!universe) return `Universe #${universeId}`;

	return universe.code?.trim() ||
		universe.name.trim() ||
		`Universe #${universeId}`;
}

export function formatUniverseCode(
	code: string | null,
	franchiseName: string
): string | null {
	const value = code?.trim();

	if (!value) return null;

	const usesEarthCodes = ["marvel", "dc"].includes(
		franchiseName.trim().toLowerCase()
	);

	return usesEarthCodes && !/^earth[-\s]/i.test(value)
		? "Earth-" + value
		: value;
}