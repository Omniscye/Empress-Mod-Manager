<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import * as api from '$lib/api';
	import { brand } from '$lib/brand';
	import {
		createLoadoutSnapshot,
		createLaunchRitual,
		defaultProfileVault,
		diffLoadoutSnapshot,
		empressRiskOptions,
		type EmpressIntelTarget,
		type EmpressLaunchRitual,
		type EmpressProfileVault,
		type EmpressRiskLevel,
		readProfileVault,
		type EmpressVaultScope,
		writeProfileVault
	} from '$lib/empress/vault';
	import games from '$lib/state/game.svelte';
	import profiles from '$lib/state/profile.svelte';
	import { pushInfoToast } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import { ModType, type Mod, type ProfileQuery } from '$lib/types';
	import { isOutdated, shortenNum, timeSince } from '$lib/util';

	const OPS_QUERY_TIMEOUT_MS = 4000;

	type PriorityEntry = {
		mod: Mod;
		reasons: string[];
	};

	type Action = {
		label: string;
		icon: string;
		description: string;
		run: () => Promise<unknown> | unknown;
	};

	const emptyQuery: ProfileQuery = {
		mods: [],
		totalModCount: 0,
		unknownMods: [],
		updates: []
	};

	const actions: Action[] = [
		{
			label: 'Open profile vault',
			icon: 'mdi:folder-open-outline',
			description: 'Jump straight into the active profile files.',
			run: () => api.profile.openDir()
		},
		{
			label: 'Open game folder',
			icon: 'mdi:folder-cog-outline',
			description: 'Inspect loaders, plugins, and patched files.',
			run: () => api.profile.launch.openGameDir()
		},
		{
			label: 'Open game log',
			icon: 'mdi:file-document-outline',
			description: 'Useful when a profile detonates on launch.',
			run: () => api.profile.openGameLog()
		}
	];

	let intel: ProfileQuery = $state(emptyQuery);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let vault: EmpressProfileVault = $state(defaultProfileVault());
	let ritualName = $state('');
	let snapshotName = $state('');
	let tagInput = $state('');
	let loadedVaultScope = $state<{ gameSlug: string; profileId: number } | null>(null);
	let refreshCounter = 0;
	let intelReady = $state(false);

	function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
		return new Promise<T>((resolve, reject) => {
			const timer = window.setTimeout(() => reject(new Error(message)), timeoutMs);

			promise.then(
				(value) => {
					window.clearTimeout(timer);
					resolve(value);
				},
				(reason) => {
					window.clearTimeout(timer);
					reject(reason);
				}
			);
		});
	}

	function currentVaultScope(): EmpressVaultScope {
		return {
			gameSlug: games.active?.slug,
			profileId: profiles.activeId
		};
	}

	function normalizeTags(input: string) {
		return input
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag, index, list) => tag.length > 0 && list.indexOf(tag) === index)
			.slice(0, 10);
	}

	function loadVault() {
		const scope = currentVaultScope();
		if (
			scope.gameSlug === null ||
			scope.gameSlug === undefined ||
			scope.profileId === null ||
			scope.profileId === undefined
		) {
			loadedVaultScope = null;
			vault = defaultProfileVault();
			tagInput = '';
			return;
		}

		loadedVaultScope = {
			gameSlug: scope.gameSlug,
			profileId: scope.profileId
		};

		vault = readProfileVault(scope);
		tagInput = vault.dossier.tags.join(', ');
	}

	function persistVault() {
		if (loadedVaultScope === null) return;

		vault.dossier.tags = normalizeTags(tagInput);
		writeProfileVault(loadedVaultScope, vault);
	}

	function riskTone(risk: EmpressRiskLevel) {
		switch (risk) {
			case 'watch':
				return 'border-primary-500/35 bg-primary-950/40 text-primary-200';
			case 'volatile':
				return 'border-yellow-500/35 bg-yellow-950/20 text-yellow-200';
			case 'cataclysm':
				return 'border-accent-500/35 bg-accent-950/25 text-accent-200';
			default:
				return 'border-emerald-500/35 bg-emerald-950/20 text-emerald-200';
		}
	}

	function setRisk(risk: EmpressRiskLevel) {
		vault.dossier.risk = risk;
		persistVault();
	}

	function removeTrackedMod(uuid: string) {
		vault.trackedMods = vault.trackedMods.filter((trackedUuid) => trackedUuid !== uuid);
		persistVault();
	}

	function removeIntelTarget(uuid: string) {
		vault.intelTargets = vault.intelTargets.filter((target) => target.uuid !== uuid);
		persistVault();
	}

	function captureCurrentRitual() {
		if (profiles.active === null) return;

		const name =
			ritualName.trim().length > 0 ? ritualName.trim() : `Ritual ${vault.launchRituals.length + 1}`;

		vault.launchRituals = [
			createLaunchRitual(name, profiles.active.customArgs, profiles.active.customArgsEnabled),
			...vault.launchRituals
		].slice(0, 24);

		ritualName = '';
		persistVault();
		pushInfoToast({ message: `Captured launch ritual "${name}".` });
	}

	async function applyRitual(ritual: EmpressLaunchRitual) {
		await api.profile.setCustomArgs(ritual.args, ritual.enabled);
		await profiles.refresh();
		pushInfoToast({ message: `Applied ritual "${ritual.name}".` });
	}

	function overwriteRitual(ritualId: string) {
		if (profiles.active === null) return;

		vault.launchRituals = vault.launchRituals.map((ritual) =>
			ritual.id === ritualId
				? {
						...ritual,
						args: [...profiles.active!.customArgs],
						enabled: profiles.active!.customArgsEnabled,
						updatedAt: new Date().toISOString()
					}
				: ritual
		);

		persistVault();
		pushInfoToast({ message: 'Updated ritual from the active profile args.' });
	}

	function deleteRitual(ritualId: string) {
		vault.launchRituals = vault.launchRituals.filter((ritual) => ritual.id !== ritualId);
		persistVault();
	}

	function captureSnapshot() {
		if (intel.mods.length === 0) return;

		const name =
			snapshotName.trim().length > 0
				? snapshotName.trim()
				: `Snapshot ${vault.snapshots.length + 1}`;

		vault.snapshots = [createLoadoutSnapshot(name, intel.mods), ...vault.snapshots].slice(0, 12);
		snapshotName = '';
		persistVault();
		pushInfoToast({ message: `Captured loadout snapshot "${name}".` });
	}

	function deleteSnapshot(snapshotId: string) {
		vault.snapshots = vault.snapshots.filter((snapshot) => snapshot.id !== snapshotId);
		persistVault();
	}

	async function refreshIntel() {
		const ticket = ++refreshCounter;
		const activeProfile = profiles.active;
		const activeModCount = activeProfile?.modCount ?? 0;

		if (activeProfile === null || activeModCount === 0) {
			intel = emptyQuery;
			error = null;
			loading = false;
			intelReady = false;
			return;
		}

		loading = true;
		intelReady = false;

		try {
			void api.thunderstore.stopQuerying();

			const result = await withTimeout(
				api.profile.querySummary({
					searchTerm: '',
					includeCategories: [],
					excludeCategories: [],
					includeNsfw: true,
					includeDeprecated: true,
					includeDisabled: true,
					includeEnabled: true,
					sortBy: 'installDate',
					sortOrder: 'descending',
					maxCount: 5000
				}),
				OPS_QUERY_TIMEOUT_MS,
				'Ops intel timed out. Leave the page and reopen Ops if you need another scan.'
			);

			if (ticket !== refreshCounter) return;

			intel = result;
			error = null;
			intelReady = true;
		} catch (err) {
			if (ticket !== refreshCounter) return;

			error = err instanceof Error ? err.message : String(err);
		} finally {
			if (ticket === refreshCounter) {
				loading = false;
			}
		}
	}

	function relativeTime(date: string) {
		const value = timeSince(date);
		return value.length > 0 ? value : 'a moment';
	}

	function priorityReasons(mod: Mod) {
		const reasons: string[] = [];

		if (isOutdated(mod)) reasons.push('outdated');
		if (mod.enabled === false) reasons.push('disabled');
		if (mod.type === ModType.Local) reasons.push('local');
		if (mod.containsNsfw) reasons.push('nsfw');

		return reasons;
	}

	$effect(() => {
		profiles.activeId;
		profiles.active?.modCount;
		games.active?.slug;
		loadVault();
		refreshCounter += 1;
		intel = emptyQuery;
		error = null;
		loading = false;
		intelReady = false;
	});

	beforeNavigate(() => {
		refreshCounter += 1;
		loading = false;
		void api.thunderstore.stopQuerying();
	});

	let outdatedMods = $derived.by(() => intel.mods.filter((mod) => isOutdated(mod)));
	let disabledMods = $derived.by(() => intel.mods.filter((mod) => mod.enabled === false));
	let localMods = $derived.by(() => intel.mods.filter((mod) => mod.type === ModType.Local));
	let trackedMods = $derived.by(() =>
		vault.trackedMods
			.map((uuid) => intel.mods.find((mod) => mod.uuid === uuid) ?? null)
			.filter((mod): mod is Mod => mod !== null)
	);
	let intelTargets = $derived.by(
		() =>
			vault.intelTargets.filter(
				(target) => !trackedMods.some((mod) => mod.uuid === target.uuid)
			) as EmpressIntelTarget[]
	);
	let activeRisk = $derived.by(
		() =>
			empressRiskOptions.find((option) => option.value === vault.dossier.risk) ??
			empressRiskOptions[0]
	);
	let displayProfileName = $derived.by(
		() => vault.dossier.codename || profiles.active?.name || 'No profile active'
	);
	let topCategories = $derived.by(() => {
		const counts = new Map<string, number>();

		for (const mod of intel.mods) {
			const names = mod.categories?.length ? mod.categories : ['uncategorized'];

			for (const name of names) {
				counts.set(name, (counts.get(name) ?? 0) + 1);
			}
		}

		return [...counts.entries()]
			.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
			.slice(0, 6);
	});
	let priorityMods = $derived.by(
		() =>
			intel.mods
				.map((mod) => ({ mod, reasons: priorityReasons(mod) }))
				.filter((entry) => entry.reasons.length > 0)
				.slice(0, 6) as PriorityEntry[]
	);
	let readinessScore = $derived.by(() => {
		const score =
			100 -
			intel.unknownMods.length * 22 -
			outdatedMods.length * 7 -
			disabledMods.length * 2 -
			localMods.length * 5;

		return Math.max(8, Math.min(100, score));
	});
	let readinessLabel = $derived.by(() => {
		if (readinessScore >= 86) return 'Dominant';
		if (readinessScore >= 65) return 'Stable';
		if (readinessScore >= 42) return 'Volatile';
		return 'Critical';
	});
	let latestSnapshot = $derived.by(() => vault.snapshots[0] ?? null);
	let snapshotDrift = $derived.by(() =>
		latestSnapshot ? diffLoadoutSnapshot(latestSnapshot, intel.mods) : null
	);
	let activeModCount = $derived.by(() => profiles.active?.modCount ?? 0);
</script>

<svelte:head>
	<title>Empress Ops | Empress Mod Manager</title>
</svelte:head>

<div class="min-w-0 grow overflow-x-hidden overflow-y-auto px-5 py-4">
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-4">
		<section
			class="empress-card empress-card-accent grid gap-4 rounded-[1.75rem] p-6 lg:grid-cols-[1.4fr_0.9fr]"
		>
			<div class="flex flex-col gap-4">
				<div class="flex items-start gap-4">
					<img
						src={brand.logoPath}
						alt={`${brand.shortName} sigil`}
						class="mt-1 size-16 shrink-0 drop-shadow-[0_0_28px_rgba(239,68,68,0.25)]"
					/>
					<div>
						<div class="display-font text-accent-300 text-xs">Ops Center</div>
						<h1 class="mt-2 text-4xl font-semibold text-white">{displayProfileName}</h1>
						<p class="text-primary-200 mt-2 max-w-2xl text-lg">
							{brand.name} command layer. {brand.tagline}
						</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-2">
					<span class="empress-badge">
						<Icon icon="mdi:sword-cross" />
						{games.active?.name ?? 'No game selected'}
					</span>
					<span class="empress-badge">
						<Icon icon="mdi:account-box-outline" />
						{profiles.active?.name ?? 'No profile active'}
					</span>
					{#if vault.dossier.codename}
						<span class="empress-badge">
							<Icon icon="mdi:card-account-details-outline" />
							Codename {vault.dossier.codename}
						</span>
					{/if}
					<span class={['empress-badge border', riskTone(vault.dossier.risk)]}>
						<Icon icon="mdi:alert-decagram-outline" />
						{activeRisk.label}
					</span>
					<span class="empress-badge">
						<Icon icon="mdi:update" />
						Catalog refreshed {relativeTime(games.lastUpdated)} ago
					</span>
				</div>
			</div>

			<div class="empress-card rounded-[1.4rem] p-5">
				<div class="display-font text-primary-300 text-xs">Readiness</div>
				<div class="mt-3 flex items-end justify-between gap-3">
					<div>
						<div class="text-4xl font-semibold text-white">{readinessScore}%</div>
						<div
							class={[
								readinessLabel === 'Dominant'
									? 'text-accent-300'
									: readinessLabel === 'Stable'
										? 'text-primary-200'
										: readinessLabel === 'Volatile'
											? 'text-yellow-300'
											: 'text-accent-300',
								'display-font mt-2 text-xs'
							]}
						>
							{readinessLabel}
						</div>
					</div>

					<div class="text-primary-300 max-w-[14rem] text-sm">
						Outdated mods, local injections, and unresolved packages all lower the profile health
						score.
					</div>
				</div>

				<div class="empress-meter mt-4">
					<span style="width: {readinessScore}%"></span>
				</div>
			</div>
		</section>

		<section class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Installed Mods</div>
				<div class="mt-3 text-4xl font-semibold text-white">
					{intelReady ? intel.totalModCount : activeModCount}
				</div>
				<p class="text-primary-400 mt-2 text-sm">Enabled loadout mass across the active profile.</p>
			</div>

			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Updates Waiting</div>
				<div class="mt-3 text-4xl font-semibold text-white">{outdatedMods.length}</div>
				<p class="text-primary-400 mt-2 text-sm">Packages with newer versions on Thunderstore.</p>
			</div>

			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Disabled Mods</div>
				<div class="mt-3 text-4xl font-semibold text-white">{disabledMods.length}</div>
				<p class="text-primary-400 mt-2 text-sm">
					Installed but intentionally held out of the runtime.
				</p>
			</div>

			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Local Injections</div>
				<div class="mt-3 text-4xl font-semibold text-white">{localMods.length}</div>
				<p class="text-primary-400 mt-2 text-sm">
					Manual or imported local mods that deserve extra attention.
				</p>
			</div>

			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Baselines</div>
				<div class="mt-3 text-4xl font-semibold text-white">{vault.snapshots.length}</div>
				<p class="text-primary-400 mt-2 text-sm">
					Saved Empress loadout captures for drift detection.
				</p>
			</div>
		</section>

		<section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
			<div class="empress-card rounded-[1.5rem] p-5">
				<div class="flex items-center justify-between gap-3">
					<div>
						<div class="display-font text-accent-300 text-xs">Threat Matrix</div>
						<h2 class="mt-2 text-2xl font-semibold text-white">Priority targets</h2>
					</div>
					<button
						class="border-primary-700/70 hover:border-accent-500/50 hover:bg-primary-900/70 rounded-full border px-4 py-2 text-sm text-white transition-colors"
						onclick={refreshIntel}
					>
						Refresh intel
					</button>
				</div>

				{#if loading}
					<div class="text-primary-300 mt-5 flex items-center gap-2">
						<Icon icon="mdi:loading" class="animate-spin text-lg" />
						Scanning the active profile...
					</div>
				{:else if error}
					<div
						class="mt-5 rounded-2xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-100"
					>
						Failed to pull ops data: {error}
					</div>
				{:else if activeModCount === 0}
					<div
						class="border-primary-700/40 bg-primary-950/55 text-primary-300 mt-5 rounded-2xl border px-4 py-4"
					>
						No installed mods are bound to the active profile, so there is nothing to scan yet.
					</div>
				{:else if !intelReady}
					<div
						class="border-primary-700/40 bg-primary-950/55 text-primary-300 mt-5 rounded-2xl border px-4 py-4"
					>
						Threat Matrix is idle. Hit <span class="text-white">Refresh intel</span> when you want a deep scan.
					</div>
				{:else}
					<div class="mt-5 grid gap-3 md:grid-cols-2">
						<div class="border-primary-700/50 bg-primary-950/55 rounded-2xl border p-4">
							<div class="text-primary-300 text-sm">Unknown packages</div>
							<div class="mt-2 text-3xl font-semibold text-white">{intel.unknownMods.length}</div>
							<div class="text-primary-400 mt-2 text-sm">
								Missing from current indexes or no longer resolvable.
							</div>
						</div>

						<div class="border-accent-700/40 bg-accent-950/18 rounded-2xl border p-4">
							<div class="text-primary-300 text-sm">Outdated packages</div>
							<div class="mt-2 text-3xl font-semibold text-white">{outdatedMods.length}</div>
							<div class="text-primary-400 mt-2 text-sm">
								Eligible for upgrade in the active loadout.
							</div>
						</div>
					</div>

					<div class="mt-5 space-y-3">
						{#if priorityMods.length === 0}
							<div
								class="border-primary-700/40 bg-primary-950/55 text-primary-300 rounded-2xl border px-4 py-4"
							>
								No obvious risks detected. This profile is clean enough to rule from.
							</div>
						{:else}
							{#each priorityMods as entry (entry.mod.uuid)}
								<div class="border-primary-700/45 bg-primary-950/55 rounded-2xl border px-4 py-3">
									<div class="flex flex-wrap items-start justify-between gap-3">
										<div>
											<div class="text-lg font-semibold text-white">{entry.mod.name}</div>
											<div class="text-primary-400 mt-1 text-sm">
												{entry.mod.author ?? 'Unknown author'}
												{#if entry.mod.version}
													<span class="text-primary-600 mx-1">/</span>
													{entry.mod.version}
												{/if}
											</div>
										</div>

										<div class="flex flex-wrap gap-2">
											{#each entry.reasons as reason}
												<span
													class={[
														reason === 'outdated'
															? 'border-accent-500/35 bg-accent-950/30 text-accent-200'
															: reason === 'disabled'
																? 'border-primary-500/30 bg-primary-950/45 text-primary-200'
																: reason === 'local'
																	? 'border-yellow-500/30 bg-yellow-950/20 text-yellow-200'
																	: 'border-fuchsia-500/30 bg-fuchsia-950/18 text-fuchsia-200',
														'rounded-full border px-2.5 py-1 text-xs font-medium tracking-[0.14em] uppercase'
													]}
												>
													{reason}
												</span>
											{/each}
										</div>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				{/if}
			</div>

			<div class="flex flex-col gap-4">
				<div class="empress-card rounded-[1.5rem] p-5">
					<div class="display-font text-accent-300 text-xs">Dossier</div>
					<h2 class="mt-2 text-2xl font-semibold text-white">Profile identity</h2>
					<p class="text-primary-400 mt-2 text-sm">
						Give this loadout its own codename, risk rating, and purpose so it feels like an Empress
						operation instead of a generic profile slot.
					</p>

					<div class="mt-4 grid gap-3">
						<div>
							<div class="text-primary-300 text-sm">Codename</div>
							<input
								class="empress-textarea mt-2 min-h-0"
								bind:value={vault.dossier.codename}
								oninput={persistVault}
								placeholder="Nightglass, Red Choir, Eclipse Lab..."
							/>
						</div>

						<div>
							<div class="text-primary-300 text-sm">Risk posture</div>
							<div class="mt-2 grid gap-2 sm:grid-cols-2">
								{#each empressRiskOptions as option (option.value)}
									<button
										class={[
											riskTone(option.value),
											vault.dossier.risk === option.value && 'ring-1 ring-white/25',
											'rounded-2xl border px-3 py-3 text-left transition-colors'
										]}
										onclick={() => setRisk(option.value)}
									>
										<div class="font-semibold">{option.label}</div>
										<div class="mt-1 text-sm opacity-85">{option.description}</div>
									</button>
								{/each}
							</div>
						</div>

						<div>
							<div class="text-primary-300 text-sm">Tags</div>
							<input
								class="empress-textarea mt-2 min-h-0"
								bind:value={tagInput}
								oninput={() => {
									vault.dossier.tags = normalizeTags(tagInput);
									persistVault();
								}}
								placeholder="bossing, testing, vanilla+, recording"
							/>
						</div>

						<div>
							<div class="text-primary-300 text-sm">Mission brief</div>
							<textarea
								class="empress-textarea mt-2"
								bind:value={vault.dossier.mission}
								oninput={persistVault}
								placeholder="What this profile is for, what it should never touch, and what success looks like..."
							></textarea>
						</div>
					</div>
				</div>

				<div class="empress-card rounded-[1.5rem] p-5">
					<div class="display-font text-accent-300 text-xs">War Notes</div>
					<h2 class="mt-2 text-2xl font-semibold text-white">Profile notebook</h2>
					<p class="text-primary-400 mt-2 text-sm">
						Autosaved per active profile. Keep launch args, conflict notes, or test plans here.
					</p>

					<textarea
						class="empress-textarea mt-4"
						bind:value={vault.notes}
						oninput={persistVault}
						placeholder="Write down unstable mods, load-order experiments, commands, or release notes..."
					></textarea>

					<div class="mt-3 flex items-center justify-between gap-3">
						<div class="text-primary-400 text-xs tracking-[0.16em] uppercase">
							Saved to local Empress vault
						</div>
						<button
							class="border-primary-700/70 hover:border-accent-500/45 hover:bg-primary-900/70 rounded-full border px-4 py-2 text-sm text-white transition-colors"
							onclick={() => {
								vault.notes = '';
								persistVault();
							}}
						>
							Clear notes
						</button>
					</div>
				</div>

				<div class="empress-card rounded-[1.5rem] p-5">
					<div class="display-font text-accent-300 text-xs">Launch Rituals</div>
					<h2 class="mt-2 text-2xl font-semibold text-white">Saved launch presets</h2>
					<p class="text-primary-400 mt-2 text-sm">
						Capture named profile arg sets and reapply them with one click whenever you bounce
						between stable, test, or recording builds.
					</p>

					<div class="border-primary-700/40 bg-primary-950/55 mt-4 rounded-2xl border p-4">
						<div class="flex flex-wrap items-center justify-between gap-3">
							<div>
								<div class="text-primary-300 text-sm">Active profile args</div>
								<div class="mt-1 text-xl font-semibold text-white">
									{profiles.active?.customArgs.length ?? 0} item{profiles.active?.customArgs
										.length === 1
										? ''
										: 's'}
								</div>
							</div>
							<div class="text-primary-400 text-sm">
								{profiles.active?.customArgsEnabled ? 'Enabled on launch' : 'Stored but disabled'}
							</div>
						</div>

						<div class="mt-4 flex flex-col gap-3 sm:flex-row">
							<input
								class="empress-textarea min-h-0 grow"
								bind:value={ritualName}
								placeholder="Stable raid, low-spec capture, mod test bed..."
							/>
							<button
								class="border-accent-500/35 bg-accent-950/24 hover:bg-accent-950/38 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
								onclick={captureCurrentRitual}
							>
								Capture current args
							</button>
						</div>
					</div>

					<div class="mt-4 space-y-3">
						{#if vault.launchRituals.length === 0}
							<div
								class="border-primary-700/40 bg-primary-950/55 text-primary-300 rounded-2xl border px-4 py-4 text-sm"
							>
								No rituals saved yet. Capture your active profile args once you have a loadout you
								want to reuse.
							</div>
						{:else}
							{#each vault.launchRituals as ritual (ritual.id)}
								<div class="border-primary-700/40 bg-primary-950/55 rounded-2xl border p-4">
									<div class="flex flex-wrap items-start justify-between gap-3">
										<div>
											<div class="font-semibold text-white">{ritual.name}</div>
											<div class="text-primary-400 mt-1 text-sm">
												{ritual.args.length} arg{ritual.args.length === 1 ? '' : 's'}
												<span class="text-primary-600 mx-1">/</span>
												{ritual.enabled ? 'enabled' : 'disabled'}
												<span class="text-primary-600 mx-1">/</span>
												updated {relativeTime(ritual.updatedAt)} ago
											</div>
										</div>

										<div class="flex flex-wrap gap-2">
											<button
												class="border-accent-500/35 bg-accent-950/24 hover:bg-accent-950/38 rounded-full border px-3 py-1.5 text-sm text-white transition-colors"
												onclick={() => applyRitual(ritual)}
											>
												Apply
											</button>
											<button
												class="border-primary-600/45 hover:bg-primary-900/70 rounded-full border px-3 py-1.5 text-sm text-white transition-colors"
												onclick={() => overwriteRitual(ritual.id)}
											>
												Overwrite
											</button>
											<button
												class="rounded-full border border-red-500/35 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-950/30"
												onclick={() => deleteRitual(ritual.id)}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				</div>

				<div class="empress-card rounded-[1.5rem] p-5">
					<div class="display-font text-accent-300 text-xs">Snapshot Lab</div>
					<h2 class="mt-2 text-2xl font-semibold text-white">Loadout baselines</h2>
					<p class="text-primary-400 mt-2 text-sm">
						Capture the active mod stack as a baseline, then compare live drift against the latest
						snapshot whenever a profile starts acting different.
					</p>

					<div class="border-primary-700/40 bg-primary-950/55 mt-4 rounded-2xl border p-4">
						<div class="flex flex-col gap-3 sm:flex-row">
							<input
								class="empress-textarea min-h-0 grow"
								bind:value={snapshotName}
								placeholder="Stable raid build, pre-update baseline..."
							/>
							<button
								class="border-accent-500/35 bg-accent-950/24 hover:bg-accent-950/38 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
								onclick={captureSnapshot}
							>
								Capture baseline
							</button>
						</div>

						{#if latestSnapshot && snapshotDrift}
							<div class="mt-4 grid gap-3 md:grid-cols-3">
								<div class="rounded-2xl border border-emerald-500/20 bg-emerald-950/12 px-4 py-3">
									<div class="text-sm text-emerald-200">Added since baseline</div>
									<div class="mt-1 text-2xl font-semibold text-white">
										{snapshotDrift.added.length}
									</div>
								</div>
								<div class="border-accent-500/20 bg-accent-950/12 rounded-2xl border px-4 py-3">
									<div class="text-accent-200 text-sm">Removed since baseline</div>
									<div class="mt-1 text-2xl font-semibold text-white">
										{snapshotDrift.removed.length}
									</div>
								</div>
								<div class="border-primary-500/20 bg-primary-950/18 rounded-2xl border px-4 py-3">
									<div class="text-primary-200 text-sm">Changed versions or state</div>
									<div class="mt-1 text-2xl font-semibold text-white">
										{snapshotDrift.changed.length}
									</div>
								</div>
							</div>
						{/if}
					</div>

					<div class="mt-4 space-y-3">
						{#if vault.snapshots.length === 0}
							<div
								class="border-primary-700/40 bg-primary-950/55 text-primary-300 rounded-2xl border px-4 py-4 text-sm"
							>
								No snapshots yet. Capture one once the profile feels stable enough to use as a
								baseline.
							</div>
						{:else}
							{#each vault.snapshots as snapshot (snapshot.id)}
								<div class="border-primary-700/40 bg-primary-950/55 rounded-2xl border p-4">
									<div class="flex flex-wrap items-start justify-between gap-3">
										<div>
											<div class="font-semibold text-white">{snapshot.name}</div>
											<div class="text-primary-400 mt-1 text-sm">
												{snapshot.mods.length} mod{snapshot.mods.length === 1 ? '' : 's'}
												<span class="text-primary-600 mx-1">/</span>
												captured {relativeTime(snapshot.createdAt)} ago
											</div>
										</div>

										<button
											class="rounded-full border border-red-500/35 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-950/30"
											onclick={() => deleteSnapshot(snapshot.id)}
										>
											Delete
										</button>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				</div>

				<div class="empress-card rounded-[1.5rem] p-5">
					<div class="display-font text-primary-300 text-xs">Command Links</div>
					<h2 class="mt-2 text-2xl font-semibold text-white">Quick actions</h2>

					<div class="mt-4 grid gap-3">
						{#each actions as action (action.label)}
							<button
								class="border-primary-700/55 hover:border-accent-500/40 hover:bg-primary-900/72 flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors"
								onclick={action.run}
							>
								<Icon icon={action.icon} class="text-accent-300 mt-0.5 text-xl" />
								<div>
									<div class="font-semibold text-white">{action.label}</div>
									<div class="text-primary-400 mt-1 text-sm">{action.description}</div>
								</div>
							</button>
						{/each}
					</div>

					<div class="mt-4 grid gap-3 md:grid-cols-2">
						<a
							href="/browse"
							class="border-primary-700/55 hover:border-primary-400/45 hover:bg-primary-900/70 rounded-2xl border px-4 py-3"
						>
							<div class="font-semibold text-white">Hunt new mods</div>
							<div class="text-primary-400 mt-1 text-sm">
								Search Thunderstore from the browse tab.
							</div>
						</a>

						<a
							href="/config"
							class="border-primary-700/55 hover:border-primary-400/45 hover:bg-primary-900/70 rounded-2xl border px-4 py-3"
						>
							<div class="font-semibold text-white">Patch configs</div>
							<div class="text-primary-400 mt-1 text-sm">
								Open the config editor for this loadout.
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>

		<section class="grid gap-4 xl:grid-cols-[0.9fr_0.9fr_1.1fr]">
			<div class="empress-card rounded-[1.5rem] p-5">
				<div class="display-font text-accent-300 text-xs">Ops Watchlist</div>
				<h2 class="mt-2 text-2xl font-semibold text-white">Tracked mods</h2>

				<div class="mt-4 space-y-3">
					{#if trackedMods.length === 0}
						<div
							class="text-primary-400 border-primary-700/40 bg-primary-950/55 rounded-2xl border px-4 py-4 text-sm"
						>
							No tracked mods yet. Mark mods from the details panel to keep them in your Empress
							watchlist.
						</div>
					{:else}
						{#each trackedMods as mod (mod.uuid)}
							<div class="border-primary-700/40 bg-primary-950/55 rounded-2xl border px-4 py-3">
								<div class="flex items-start justify-between gap-3">
									<div>
										<div class="font-semibold text-white">{mod.name}</div>
										<div class="text-primary-400 mt-1 text-sm">
											{mod.author ?? 'Unknown author'}
											{#if mod.version}
												<span class="text-primary-600 mx-1">/</span>
												{mod.version}
											{/if}
										</div>
									</div>

									<button
										class="border-primary-600/45 hover:bg-primary-900/70 rounded-full border px-3 py-1 text-xs tracking-[0.14em] text-white uppercase transition-colors"
										onclick={() => removeTrackedMod(mod.uuid)}
									>
										Remove
									</button>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="empress-card rounded-[1.5rem] p-5">
				<div class="display-font text-primary-300 text-xs">Arsenal Mix</div>
				<h2 class="mt-2 text-2xl font-semibold text-white">Category spread</h2>

				<div class="mt-4 space-y-3">
					{#if topCategories.length === 0}
						<div
							class="text-primary-400 border-primary-700/40 bg-primary-950/55 rounded-2xl border px-4 py-4 text-sm"
						>
							No category data has been indexed for this profile yet.
						</div>
					{:else}
						{#each topCategories as [name, count]}
							<div
								class="border-primary-700/40 bg-primary-950/55 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3"
							>
								<div class="font-medium text-white">{name}</div>
								<div class="text-primary-300 text-sm">
									{count} mod{count === 1 ? '' : 's'}
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="empress-card rounded-[1.5rem] p-5">
				<div class="display-font text-accent-300 text-xs">Unknown Packages</div>
				<h2 class="mt-2 text-2xl font-semibold text-white">Recovered fragments</h2>

				{#if intel.unknownMods.length === 0}
					<div
						class="text-primary-400 border-primary-700/40 bg-primary-950/55 mt-4 rounded-2xl border px-4 py-4 text-sm"
					>
						No unresolved packages are haunting the active profile.
					</div>
				{:else}
					<div class="mt-4 grid gap-3 md:grid-cols-2">
						{#each intel.unknownMods as mod (mod.uuid)}
							<div class="border-accent-700/35 bg-accent-950/18 rounded-2xl border px-4 py-3">
								<div class="font-semibold text-white">{mod.fullName}</div>
								<div class="text-primary-400 mt-1 text-sm">
									Not currently indexed in the source registry.
								</div>
							</div>
						{/each}
					</div>
				{/if}

				<div
					class="border-primary-700/45 mt-5 flex items-center justify-between gap-3 border-t pt-4"
				>
					<div>
						<div class="text-primary-300 text-sm">Total download footprint</div>
						<div class="mt-1 text-xl font-semibold text-white">
							{shortenNum(intel.mods.reduce((total, mod) => total + mod.fileSize, 0))}B tracked
						</div>
					</div>
					<div class="text-primary-400 max-w-xs text-right text-sm">
						A quick estimate based on indexed package file sizes, not full decompressed payloads.
					</div>
				</div>
			</div>
		</section>

		<section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
			<div class="empress-card rounded-[1.5rem] p-5">
				<div class="display-font text-accent-300 text-xs">Intel Board</div>
				<h2 class="mt-2 text-2xl font-semibold text-white">Packages under observation</h2>
				<p class="text-primary-400 mt-2 text-sm">
					These are browse-surface packages you flagged before installing. It lets Empress keep
					package recon separate from your active runtime.
				</p>

				<div class="mt-4 space-y-3">
					{#if intelTargets.length === 0}
						<div
							class="text-primary-400 border-primary-700/40 bg-primary-950/55 rounded-2xl border px-4 py-4 text-sm"
						>
							No remote intel targets yet. Add one from the browse details panel to keep it here.
						</div>
					{:else}
						{#each intelTargets as target (target.uuid)}
							<div class="border-primary-700/40 bg-primary-950/55 rounded-2xl border px-4 py-3">
								<div class="flex items-start justify-between gap-3">
									<div>
										<div class="font-semibold text-white">{target.name}</div>
										<div class="text-primary-400 mt-1 text-sm">
											{target.author ?? 'Unknown author'}
											{#if target.version}
												<span class="text-primary-600 mx-1">/</span>
												{target.version}
											{/if}
											<span class="text-primary-600 mx-1">/</span>
											marked {relativeTime(target.notedAt)} ago
										</div>
									</div>

									<button
										class="border-primary-600/45 hover:bg-primary-900/70 rounded-full border px-3 py-1 text-xs tracking-[0.14em] text-white uppercase transition-colors"
										onclick={() => removeIntelTarget(target.uuid)}
									>
										Remove
									</button>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="empress-card rounded-[1.5rem] p-5">
				<div class="display-font text-primary-300 text-xs">Baseline Drift</div>
				<h2 class="mt-2 text-2xl font-semibold text-white">Snapshot delta</h2>

				{#if latestSnapshot === null || snapshotDrift === null}
					<div
						class="text-primary-400 border-primary-700/40 bg-primary-950/55 mt-4 rounded-2xl border px-4 py-4 text-sm"
					>
						Capture a baseline snapshot first, then Empress will show exactly what changed since
						that checkpoint.
					</div>
				{:else}
					<div class="border-primary-700/40 bg-primary-950/55 mt-4 rounded-2xl border p-4">
						<div class="text-primary-300 text-sm">Current comparison target</div>
						<div class="mt-1 text-xl font-semibold text-white">{latestSnapshot.name}</div>
						<div class="text-primary-400 mt-1 text-sm">
							{latestSnapshot.mods.length} mod{latestSnapshot.mods.length === 1 ? '' : 's'}
							<span class="text-primary-600 mx-1">/</span>
							captured {relativeTime(latestSnapshot.createdAt)} ago
						</div>
					</div>

					<div class="mt-4 grid gap-3 md:grid-cols-3">
						<div class="rounded-2xl border border-emerald-500/20 bg-emerald-950/12 px-4 py-3">
							<div class="text-sm text-emerald-200">Added</div>
							<div class="mt-1 text-2xl font-semibold text-white">{snapshotDrift.added.length}</div>
						</div>
						<div class="border-accent-500/20 bg-accent-950/12 rounded-2xl border px-4 py-3">
							<div class="text-accent-200 text-sm">Removed</div>
							<div class="mt-1 text-2xl font-semibold text-white">
								{snapshotDrift.removed.length}
							</div>
						</div>
						<div class="border-primary-500/20 bg-primary-950/18 rounded-2xl border px-4 py-3">
							<div class="text-primary-200 text-sm">Changed</div>
							<div class="mt-1 text-2xl font-semibold text-white">
								{snapshotDrift.changed.length}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</section>
	</div>
</div>
