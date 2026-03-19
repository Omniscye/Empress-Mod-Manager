import { ModType, type Mod } from '$lib/types';

export type EmpressRiskLevel = 'dormant' | 'watch' | 'volatile' | 'cataclysm';

export type EmpressDossier = {
	codename: string;
	risk: EmpressRiskLevel;
	tags: string[];
	mission: string;
};

export type EmpressLaunchRitual = {
	id: string;
	name: string;
	args: string[];
	enabled: boolean;
	updatedAt: string;
};

export type EmpressIntelTarget = {
	uuid: string;
	name: string;
	author: string | null;
	version: string | null;
	notedAt: string;
};

export type EmpressSnapshotMod = {
	uuid: string;
	name: string;
	version: string | null;
	enabled: boolean | null;
	type: ModType;
};

export type EmpressLoadoutSnapshot = {
	id: string;
	name: string;
	createdAt: string;
	mods: EmpressSnapshotMod[];
};

export type EmpressSnapshotDiff = {
	added: EmpressSnapshotMod[];
	removed: EmpressSnapshotMod[];
	changed: Array<{
		previous: EmpressSnapshotMod;
		current: EmpressSnapshotMod;
	}>;
};

export type EmpressProfileVault = {
	notes: string;
	dossier: EmpressDossier;
	trackedMods: string[];
	launchRituals: EmpressLaunchRitual[];
	intelTargets: EmpressIntelTarget[];
	snapshots: EmpressLoadoutSnapshot[];
};

export type EmpressVaultScope = {
	gameSlug: string | null | undefined;
	profileId: number | null | undefined;
};

export const EMPRESS_VAULT_UPDATED_EVENT = 'empress-vault-updated';

export const empressRiskOptions: Array<{
	value: EmpressRiskLevel;
	label: string;
	description: string;
}> = [
	{
		value: 'dormant',
		label: 'Dormant',
		description: 'Low-risk loadout with only minor concerns.'
	},
	{
		value: 'watch',
		label: 'Watch',
		description: 'Worth monitoring before a long session or release.'
	},
	{
		value: 'volatile',
		label: 'Volatile',
		description: 'Known conflicts or experiments are in play.'
	},
	{
		value: 'cataclysm',
		label: 'Cataclysm',
		description: 'High-risk profile intended for testing or breakage.'
	}
];

function storage() {
	if (typeof localStorage === 'undefined') return null;
	return localStorage;
}

function eventHost() {
	if (typeof window === 'undefined') return null;
	return window;
}

function makeId() {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}

	return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeTags(tags: unknown): string[] {
	if (!Array.isArray(tags)) return [];

	return tags
		.filter((tag): tag is string => typeof tag === 'string')
		.map((tag) => tag.trim())
		.filter((tag, index, list) => tag.length > 0 && list.indexOf(tag) === index)
		.slice(0, 10);
}

function normalizeRitual(ritual: unknown): EmpressLaunchRitual | null {
	if (typeof ritual !== 'object' || ritual === null) return null;

	const input = ritual as Partial<EmpressLaunchRitual>;
	const name = typeof input.name === 'string' ? input.name.trim() : '';
	if (name.length === 0) return null;

	const args = Array.isArray(input.args)
		? input.args.filter((arg): arg is string => typeof arg === 'string').map((arg) => arg.trim())
		: [];

	return {
		id: typeof input.id === 'string' && input.id.length > 0 ? input.id : makeId(),
		name,
		args: args.filter((arg) => arg.length > 0),
		enabled: input.enabled !== false,
		updatedAt:
			typeof input.updatedAt === 'string' && input.updatedAt.length > 0
				? input.updatedAt
				: new Date().toISOString()
	};
}

function normalizeIntelTarget(target: unknown): EmpressIntelTarget | null {
	if (typeof target !== 'object' || target === null) return null;

	const input = target as Partial<EmpressIntelTarget>;
	if (typeof input.uuid !== 'string' || input.uuid.length === 0) return null;
	if (typeof input.name !== 'string' || input.name.trim().length === 0) return null;

	return {
		uuid: input.uuid,
		name: input.name.trim(),
		author: typeof input.author === 'string' && input.author.trim().length > 0 ? input.author.trim() : null,
		version:
			typeof input.version === 'string' && input.version.trim().length > 0
				? input.version.trim()
				: null,
		notedAt:
			typeof input.notedAt === 'string' && input.notedAt.length > 0
				? input.notedAt
				: new Date().toISOString()
	};
}

function normalizeSnapshotMod(mod: unknown): EmpressSnapshotMod | null {
	if (typeof mod !== 'object' || mod === null) return null;

	const input = mod as Partial<EmpressSnapshotMod>;
	if (typeof input.uuid !== 'string' || input.uuid.length === 0) return null;
	if (typeof input.name !== 'string' || input.name.trim().length === 0) return null;

	return {
		uuid: input.uuid,
		name: input.name.trim(),
		version:
			typeof input.version === 'string' && input.version.trim().length > 0
				? input.version.trim()
				: null,
		enabled:
			typeof input.enabled === 'boolean' || input.enabled === null
				? input.enabled
				: null,
		type: input.type === ModType.Local ? ModType.Local : ModType.Remote
	};
}

function normalizeSnapshot(snapshot: unknown): EmpressLoadoutSnapshot | null {
	if (typeof snapshot !== 'object' || snapshot === null) return null;

	const input = snapshot as Partial<EmpressLoadoutSnapshot>;
	const name = typeof input.name === 'string' ? input.name.trim() : '';
	if (name.length === 0) return null;

	const mods = Array.isArray(input.mods)
		? input.mods
				.map(normalizeSnapshotMod)
				.filter((mod): mod is EmpressSnapshotMod => mod !== null)
		: [];

	return {
		id: typeof input.id === 'string' && input.id.length > 0 ? input.id : makeId(),
		name,
		createdAt:
			typeof input.createdAt === 'string' && input.createdAt.length > 0
				? input.createdAt
				: new Date().toISOString(),
		mods
	};
}

function normalizeRiskLevel(input: unknown): EmpressRiskLevel {
	return input === 'watch' || input === 'volatile' || input === 'cataclysm' ? input : 'dormant';
}

function normalizeVault(input: unknown): EmpressProfileVault {
	if (typeof input !== 'object' || input === null) return defaultProfileVault();

	const raw = input as Partial<EmpressProfileVault>;
	const dossier = typeof raw.dossier === 'object' && raw.dossier !== null ? raw.dossier : {};
	const rituals = Array.isArray(raw.launchRituals)
		? raw.launchRituals.map(normalizeRitual).filter((ritual): ritual is EmpressLaunchRitual => ritual !== null)
		: [];
	const intelTargets = Array.isArray(raw.intelTargets)
		? raw.intelTargets
				.map(normalizeIntelTarget)
				.filter((target): target is EmpressIntelTarget => target !== null)
		: [];
	const snapshots = Array.isArray(raw.snapshots)
		? raw.snapshots
				.map(normalizeSnapshot)
				.filter((snapshot): snapshot is EmpressLoadoutSnapshot => snapshot !== null)
		: [];

	return {
		notes: typeof raw.notes === 'string' ? raw.notes : '',
		dossier: {
			codename:
				typeof (dossier as Partial<EmpressDossier>).codename === 'string'
					? (dossier as Partial<EmpressDossier>).codename!.trim()
					: '',
			risk: normalizeRiskLevel((dossier as Partial<EmpressDossier>).risk),
			tags: normalizeTags((dossier as Partial<EmpressDossier>).tags),
			mission:
				typeof (dossier as Partial<EmpressDossier>).mission === 'string'
					? (dossier as Partial<EmpressDossier>).mission!
					: ''
		},
		trackedMods: Array.isArray(raw.trackedMods)
			? raw.trackedMods.filter((uuid): uuid is string => typeof uuid === 'string')
			: [],
		launchRituals: rituals.slice(0, 24),
		intelTargets: intelTargets.slice(0, 40),
		snapshots: snapshots.slice(0, 12)
	};
}

export function defaultEmpressDossier(): EmpressDossier {
	return {
		codename: '',
		risk: 'dormant',
		tags: [],
		mission: ''
	};
}

export function defaultProfileVault(): EmpressProfileVault {
	return {
		notes: '',
		dossier: defaultEmpressDossier(),
		trackedMods: [],
		launchRituals: [],
		intelTargets: [],
		snapshots: []
	};
}

export function profileVaultKey(scope: EmpressVaultScope): string | null {
	if (scope.gameSlug === null || scope.gameSlug === undefined) return null;
	if (scope.profileId === null || scope.profileId === undefined) return null;

	return `empress:vault:${scope.gameSlug}:${scope.profileId}`;
}

export function readProfileVault(scope: EmpressVaultScope): EmpressProfileVault {
	const key = profileVaultKey(scope);
	const store = storage();
	if (key === null || store === null) return defaultProfileVault();

	try {
		const raw = store.getItem(key);
		if (raw === null) return defaultProfileVault();
		return normalizeVault(JSON.parse(raw));
	} catch {
		return defaultProfileVault();
	}
}

export function writeProfileVault(scope: EmpressVaultScope, vault: EmpressProfileVault): boolean {
	const key = profileVaultKey(scope);
	const store = storage();
	if (key === null || store === null) return false;

	const normalized = normalizeVault(vault);
	store.setItem(key, JSON.stringify(normalized));

	eventHost()?.dispatchEvent(
		new CustomEvent(EMPRESS_VAULT_UPDATED_EVENT, {
			detail: { key }
		})
	);

	return true;
}

export function readProfileDossier(scope: EmpressVaultScope): EmpressDossier {
	return readProfileVault(scope).dossier;
}

export function createLaunchRitual(
	name: string,
	args: string[],
	enabled: boolean
): EmpressLaunchRitual {
	return {
		id: makeId(),
		name: name.trim(),
		args: args.map((arg) => arg.trim()).filter((arg) => arg.length > 0),
		enabled,
		updatedAt: new Date().toISOString()
	};
}

function snapshotModFromMod(
	mod: Pick<Mod, 'uuid' | 'name' | 'version' | 'enabled' | 'type'>
): EmpressSnapshotMod {
	return {
		uuid: mod.uuid,
		name: mod.name,
		version: mod.version,
		enabled: mod.enabled ?? null,
		type: mod.type
	};
}

export function createLoadoutSnapshot(
	name: string,
	mods: Array<Pick<Mod, 'uuid' | 'name' | 'version' | 'enabled' | 'type'>>
): EmpressLoadoutSnapshot {
	return {
		id: makeId(),
		name: name.trim(),
		createdAt: new Date().toISOString(),
		mods: mods.map(snapshotModFromMod)
	};
}

export function diffLoadoutSnapshot(
	snapshot: EmpressLoadoutSnapshot,
	mods: Array<Pick<Mod, 'uuid' | 'name' | 'version' | 'enabled' | 'type'>>
): EmpressSnapshotDiff {
	const currentMods = mods.map(snapshotModFromMod);
	const previousByUuid = new Map(snapshot.mods.map((mod) => [mod.uuid, mod]));
	const currentByUuid = new Map(currentMods.map((mod) => [mod.uuid, mod]));

	const added = currentMods.filter((mod) => !previousByUuid.has(mod.uuid));
	const removed = snapshot.mods.filter((mod) => !currentByUuid.has(mod.uuid));
	const changed = currentMods
		.map((mod) => {
			const previous = previousByUuid.get(mod.uuid);
			if (!previous) return null;

			if (
				previous.version === mod.version &&
				previous.enabled === mod.enabled &&
				previous.type === mod.type
			) {
				return null;
			}

			return { previous, current: mod };
		})
		.filter(
			(entry): entry is { previous: EmpressSnapshotMod; current: EmpressSnapshotMod } =>
				entry !== null
		);

	return { added, removed, changed };
}

export function isTrackedMod(scope: EmpressVaultScope, uuid: string): boolean {
	return readProfileVault(scope).trackedMods.includes(uuid);
}

export function toggleTrackedMod(scope: EmpressVaultScope, uuid: string): boolean {
	const vault = readProfileVault(scope);
	const tracked = new Set(vault.trackedMods);

	if (tracked.has(uuid)) {
		tracked.delete(uuid);
		vault.trackedMods = [...tracked];
		writeProfileVault(scope, vault);
		return false;
	}

	tracked.add(uuid);
	vault.trackedMods = [...tracked];
	writeProfileVault(scope, vault);
	return true;
}

export function isIntelTarget(scope: EmpressVaultScope, uuid: string): boolean {
	return readProfileVault(scope).intelTargets.some((target) => target.uuid === uuid);
}

export function toggleIntelTarget(scope: EmpressVaultScope, mod: Mod): boolean {
	const vault = readProfileVault(scope);
	const existingIndex = vault.intelTargets.findIndex((target) => target.uuid === mod.uuid);

	if (existingIndex >= 0) {
		vault.intelTargets = vault.intelTargets.filter((target) => target.uuid !== mod.uuid);
		writeProfileVault(scope, vault);
		return false;
	}

	const intelTarget: EmpressIntelTarget = {
		uuid: mod.uuid,
		name: mod.name,
		author: mod.author,
		version: mod.version ?? mod.versions[0]?.name ?? null,
		notedAt: new Date().toISOString()
	};

	vault.intelTargets = [intelTarget, ...vault.intelTargets].slice(0, 40);
	writeProfileVault(scope, vault);
	return true;
}
