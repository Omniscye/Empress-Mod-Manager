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

export type EmpressProfileVault = {
	notes: string;
	dossier: EmpressDossier;
	trackedMods: string[];
	launchRituals: EmpressLaunchRitual[];
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
		launchRituals: rituals.slice(0, 24)
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
		launchRituals: []
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
