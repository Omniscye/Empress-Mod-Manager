<script lang="ts">
	import * as api from '$lib/api';
	import { brand } from '$lib/brand';
	import games from '$lib/state/game.svelte';
	import profiles from '$lib/state/profile.svelte';
	import Icon from '@iconify/svelte';
	import { ModType, type Mod, type ProfileQuery } from '$lib/types';
	import { isOutdated, shortenNum, timeSince } from '$lib/util';

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
	let notes = $state('');
	let loadedNotesKey = $state<string | null>(null);
	let refreshCounter = 0;

	function notesKey() {
		if (profiles.activeId === null) return null;
		return `empress:vault:${games.active?.slug ?? 'unknown'}:${profiles.activeId}`;
	}

	function loadNotes() {
		const key = notesKey();
		if (typeof localStorage === 'undefined' || key === null) return;

		loadedNotesKey = key;
		notes = localStorage.getItem(key) ?? '';
	}

	async function refreshIntel() {
		if (profiles.active === null) {
			intel = emptyQuery;
			loading = false;
			return;
		}

		const ticket = ++refreshCounter;
		loading = true;

		try {
			const result = await api.profile.query({
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
			});

			if (ticket !== refreshCounter) return;

			intel = result;
			error = null;
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
		games.active?.slug;
		loadNotes();
		refreshIntel();
	});

	$effect(() => {
		if (typeof localStorage === 'undefined' || loadedNotesKey === null) return;
		localStorage.setItem(loadedNotesKey, notes);
	});

	let outdatedMods = $derived.by(() => intel.mods.filter((mod) => isOutdated(mod)));
	let disabledMods = $derived.by(() => intel.mods.filter((mod) => mod.enabled === false));
	let localMods = $derived.by(() => intel.mods.filter((mod) => mod.type === ModType.Local));
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
</script>

<svelte:head>
	<title>Empress Ops | Empress Mod Manager</title>
</svelte:head>

<div class="flex grow overflow-auto px-5 py-4">
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
						<h1 class="mt-2 text-4xl font-semibold text-white">{brand.name}</h1>
						<p class="text-primary-200 mt-2 max-w-2xl text-lg">{brand.tagline}</p>
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

		<section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Installed Mods</div>
				<div class="mt-3 text-4xl font-semibold text-white">{intel.totalModCount}</div>
				<p class="text-primary-400 mt-2 text-sm">Enabled loadout mass across the active profile.</p>
			</div>

			<div class="empress-card rounded-3xl p-5">
				<div class="display-font text-primary-300 text-xs">Updates Waiting</div>
				<div class="mt-3 text-4xl font-semibold text-white">{intel.updates.length}</div>
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
					<div class="display-font text-accent-300 text-xs">War Notes</div>
					<h2 class="mt-2 text-2xl font-semibold text-white">Profile notebook</h2>
					<p class="text-primary-400 mt-2 text-sm">
						Autosaved per active profile. Keep launch args, conflict notes, or test plans here.
					</p>

					<textarea
						class="empress-textarea mt-4"
						bind:value={notes}
						placeholder="Write down unstable mods, load-order experiments, commands, or release notes..."
					></textarea>

					<div class="mt-3 flex items-center justify-between gap-3">
						<div class="text-primary-400 text-xs tracking-[0.16em] uppercase">
							Saved to local Empress vault
						</div>
						<button
							class="border-primary-700/70 hover:border-accent-500/45 hover:bg-primary-900/70 rounded-full border px-4 py-2 text-sm text-white transition-colors"
							onclick={() => (notes = '')}
						>
							Clear notes
						</button>
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

		<section class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
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
	</div>
</div>
