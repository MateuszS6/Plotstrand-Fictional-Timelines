import type { Universe, UniverseType } from "../types/universe";

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
	franchiseName: string,
	universeType: UniverseType
): string | null {
	const value = code?.trim();

	if (!value) return null;

	const usesEarthCodes = ["marvel", "dc"].includes(
		franchiseName.trim().toLowerCase()
	);

	// Locations can have codes too, but Earth- is a universe designation only.
	return universeType === "universe" &&
		usesEarthCodes &&
		!/^earth[-\s]/i.test(value)
		? "Earth-" + value
		: value;
}
