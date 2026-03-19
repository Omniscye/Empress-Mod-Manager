<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import * as api from '$lib/api';
	import { brand } from '$lib/brand';
	import ModDetails from '$lib/components/mod-list/ModDetails.svelte';
	import ModList from '$lib/components/mod-list/ModList.svelte';
	import ModListFilters from '$lib/components/mod-list/ModListFilters.svelte';
	import InstallModButton from '$lib/components/mod-list/InstallModButton.svelte';
	import ModListItem from '$lib/components/mod-list/ModListItem.svelte';
	import ProfileLockedBanner from '$lib/components/mod-list/ProfileLockedBanner.svelte';
	import {
		defaultProfileVault,
		EMPRESS_VAULT_UPDATED_EVENT,
		type EmpressProfileVault,
		readProfileVault
	} from '$lib/empress/vault';
	import { defaultContextItems } from '$lib/context';
	import games from '$lib/state/game.svelte';
	import profiles from '$lib/state/profile.svelte';
	import { modQuery } from '$lib/state/misc.svelte';
	import { onMount } from 'svelte';
	import { listen, type UnlistenFn } from '@tauri-apps/api/event';
	import Icon from '@iconify/svelte';
	import { type Mod, type ModId, type SortBy } from '$lib/types';

	type ReconView = 'all' | 'uninstalled' | 'installed' | 'intel' | 'nsfw' | 'deprecated';

	const sortOptions: SortBy[] = ['lastUpdated', 'newest', 'rating', 'downloads'];
	const contextItems = [...defaultContextItems];
	const reconViews: Array<{
		key: ReconView;
		label: string;
		icon: string;
		description: string;
	}> = [
		{
			key: 'all',
			label: 'All results',
			icon: 'mdi:view-grid-outline',
			description: 'Everything matching the current recon query.'
		},
		{
			key: 'uninstalled',
			label: 'Unclaimed',
			icon: 'mdi:download-outline',
			description: 'Packages not yet installed in the active profile.'
		},
		{
			key: 'installed',
			label: 'Already loaded',
			icon: 'mdi:check-circle-outline',
			description: 'Packages already present in the profile.'
		},
		{
			key: 'intel',
			label: 'Intel board',
			icon: 'mdi:target-variant',
			description: 'Packages marked for later investigation.'
		},
		{
			key: 'nsfw',
			label: 'Explicit',
			icon: 'material-symbols:explicit-outline',
			description: 'Packages flagged as NSFW.'
		},
		{
			key: 'deprecated',
			label: 'Legacy',
			icon: 'mdi:archive-alert-outline',
			description: 'Deprecated packages that may need caution.'
		}
	];

	let mods: Mod[] = $state([]);
	let vault: EmpressProfileVault = $state(defaultProfileVault());
	let reconView = $state<ReconView>('all');

	let modList: ModList;
	let maxCount: number = $state(20);
	let selectedMod: Mod | null = $state(null);

	let unlistenFromQuery: UnlistenFn | undefined;

	function currentVaultScope() {
		return {
			gameSlug: games.active?.slug,
			profileId: profiles.activeId
		};
	}

	function loadVault() {
		vault = readProfileVault(currentVaultScope());
	}

	onMount(() => {
		listen<Mod[]>('mod_query_result', (evt) => {
			mods = evt.payload;
		}).then((unlisten) => {
			unlistenFromQuery = unlisten;
		});

		const reload = () => loadVault();
		window.addEventListener(EMPRESS_VAULT_UPDATED_EVENT, reload);

		return () => {
			window.removeEventListener(EMPRESS_VAULT_UPDATED_EVENT, reload);
			unlistenFromQuery?.();
			api.thunderstore.stopQuerying();
		};
	});

	let hasRefreshed = $state(false);
	let refreshing = false;

	async function refresh() {
		if (refreshing) return;
		refreshing = true;

		mods = await api.thunderstore.query({ ...modQuery.current, maxCount });
		if (selectedMod) {
			selectedMod = mods.find((mod) => mod.uuid === selectedMod!.uuid) ?? null;
		}

		refreshing = false;
		hasRefreshed = true;
	}

	async function installLatest(mod: Mod) {
		await install({
			packageUuid: mod.uuid,
			versionUuid: mod.versions[0].uuid
		});
	}

	async function install(id: ModId) {
		await api.profile.install.mod(id);
		await refresh();
		loadVault();
	}

	function onModClicked(evt: MouseEvent, mod: Mod) {
		if (evt.ctrlKey) {
			installLatest(mod);
		} else {
			modList.selectMod(mod);
		}
	}

	function setReconView(view: ReconView) {
		reconView = view;
		selectedMod = null;
	}

	function setReconSort(sortBy: SortBy) {
		modQuery.current.sortBy = sortBy;
		modQuery.current.sortOrder = 'descending';
	}

	beforeNavigate(() => {
		api.thunderstore.stopQuerying();
	});

	$effect(() => {
		if (maxCount > 0) {
			modQuery.current;
			profiles.active;
			refresh();
		}
	});

	$effect(() => {
		profiles.activeId;
		games.active?.slug;
		loadVault();
	});

	let locked = $derived(profiles.activeLocked);
	let intelUuidSet = $derived.by(() => new Set(vault.intelTargets.map((target) => target.uuid)));
	let displayedMods = $derived.by(() => {
		switch (reconView) {
			case 'uninstalled':
				return mods.filter((mod) => !mod.isInstalled);
			case 'installed':
				return mods.filter((mod) => mod.isInstalled);
			case 'intel':
				return mods.filter((mod) => intelUuidSet.has(mod.uuid));
			case 'nsfw':
				return mods.filter((mod) => mod.containsNsfw);
			case 'deprecated':
				return mods.filter((mod) => mod.isDeprecated);
			default:
				return mods;
		}
	});
	let reconCounts = $derived.by(() => ({
		all: mods.length,
		uninstalled: mods.filter((mod) => !mod.isInstalled).length,
		installed: mods.filter((mod) => mod.isInstalled).length,
		intel: mods.filter((mod) => intelUuidSet.has(mod.uuid)).length,
		nsfw: mods.filter((mod) => mod.containsNsfw).length,
		deprecated: mods.filter((mod) => mod.isDeprecated).length
	}));

	$effect(() => {
		displayedMods;
		if (selectedMod && !displayedMods.some((mod) => mod.uuid === selectedMod?.uuid)) {
			selectedMod = null;
		}
	});
</script>

<svelte:head>
	<title>Empress Recon | Empress Mod Manager</title>
</svelte:head>

<div class="min-w-0 h-full overflow-hidden">
	<div class="flex w-[60%] grow flex-col overflow-hidden pt-3 pl-3">
		<section class="empress-card empress-card-accent mr-4 mb-3 rounded-[1.5rem] p-5">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="max-w-3xl">
					<div class="display-font text-accent-300 text-xs">Recon Deck</div>
					<div class="mt-2 flex items-center gap-3">
						<img
							src={brand.logoPath}
							alt={`${brand.shortName} sigil`}
							class="size-11 rounded-2xl bg-black/20 p-2 drop-shadow-[0_0_18px_rgba(96,165,250,0.25)]"
						/>
						<div>
							<h1 class="text-3xl font-semibold text-white">Package reconnaissance</h1>
							<div class="text-primary-300 mt-1 text-sm">
								Scout Thunderstore like an intel surface instead of a plain storefront.
							</div>
						</div>
					</div>
					<p class="text-primary-200 mt-4 max-w-3xl text-sm leading-6">
						Use recon views to isolate installable finds, already-loaded packages, your own intel
						board, or risky content before it touches the active profile.
					</p>
				</div>

				<div class="grid gap-2 sm:grid-cols-3">
					<button
						class="border-primary-700/55 hover:border-primary-400/45 hover:bg-primary-900/72 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
						onclick={() => setReconSort('rating')}
					>
						Top rated
					</button>
					<button
						class="border-primary-700/55 hover:border-primary-400/45 hover:bg-primary-900/72 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
						onclick={() => setReconSort('downloads')}
					>
						Most downloaded
					</button>
					<button
						class="border-primary-700/55 hover:border-primary-400/45 hover:bg-primary-900/72 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
						onclick={() => setReconSort('newest')}
					>
						Fresh drops
					</button>
				</div>
			</div>

			<div class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
				<div class="rounded-2xl border border-primary-700/45 bg-primary-950/55 px-4 py-4">
					<div class="display-font text-primary-300 text-[0.68rem]">Results</div>
					<div class="mt-2 text-3xl font-semibold text-white">{mods.length}</div>
					<div class="text-primary-400 mt-1 text-sm">Packages currently loaded into the recon grid.</div>
				</div>
				<div class="rounded-2xl border border-primary-700/45 bg-primary-950/55 px-4 py-4">
					<div class="display-font text-primary-300 text-[0.68rem]">Unclaimed</div>
					<div class="mt-2 text-3xl font-semibold text-white">{reconCounts.uninstalled}</div>
					<div class="text-primary-400 mt-1 text-sm">Packages not installed in this profile yet.</div>
				</div>
				<div class="rounded-2xl border border-primary-700/45 bg-primary-950/55 px-4 py-4">
					<div class="display-font text-primary-300 text-[0.68rem]">Intel</div>
					<div class="mt-2 text-3xl font-semibold text-white">{vault.intelTargets.length}</div>
					<div class="text-primary-400 mt-1 text-sm">Packages tracked for later investigation.</div>
				</div>
				<div class="rounded-2xl border border-accent-700/35 bg-accent-950/18 px-4 py-4">
					<div class="display-font text-accent-300 text-[0.68rem]">Risky</div>
					<div class="mt-2 text-3xl font-semibold text-white">
						{reconCounts.nsfw + reconCounts.deprecated}
					</div>
					<div class="text-primary-400 mt-1 text-sm">NSFW and deprecated packages in the result set.</div>
				</div>
			</div>

			<div class="mt-4 flex flex-wrap gap-2">
				{#each reconViews as view (view.key)}
					<button
						class={[
							reconView === view.key
								? 'border-accent-500/45 bg-accent-950/26 text-white'
								: 'border-primary-700/50 bg-primary-950/45 text-primary-200 hover:border-primary-400/40 hover:bg-primary-900/75',
							'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors'
						]}
						onclick={() => setReconView(view.key)}
					>
						<Icon icon={view.icon} class="text-base" />
						<span>{view.label}</span>
						<span class="rounded-full bg-black/20 px-2 py-0.5 text-xs text-primary-100">
							{reconCounts[view.key]}
						</span>
					</button>
				{/each}
			</div>
		</section>

		<ModListFilters {sortOptions} queryArgs={modQuery.current} />

		{#if locked}
			<ProfileLockedBanner class="mr-4 mb-1" />
		{/if}

		<ModList
			mods={displayedMods}
			queryArgs={modQuery.current}
			bind:this={modList}
			bind:maxCount
			bind:selected={selectedMod}
		>
			{#snippet placeholder()}
				{#if hasRefreshed}
					<div class="mt-4 text-lg">No packages match this Empress recon view.</div>
					<div class="text-primary-400">
						Try a different recon preset, search term, or sort mode.
					</div>
				{/if}
			{/snippet}

			{#snippet item({ mod, isSelected })}
				<ModListItem
					{mod}
					{isSelected}
					{contextItems}
					locked={profiles.activeLocked}
					oninstall={() => installLatest(mod)}
					onclick={(evt) => onModClicked(evt, mod)}
				/>
			{/snippet}
		</ModList>
	</div>

	{#if selectedMod}
		<ModDetails {locked} mod={selectedMod} {contextItems} onclose={() => (selectedMod = null)}>
			<InstallModButton mod={selectedMod} {install} {locked} />
		</ModDetails>
	{:else}
		<aside class="border-primary-600 bg-primary-700 relative flex w-[40%] min-w-72 flex-col border-l px-6 pt-6 pb-4 text-white">
			<div class="light-scrollbar grow overflow-x-hidden overflow-y-auto pb-2">
				<div class="display-font text-accent-300 text-xs">Recon Rail</div>
				<h2 class="mt-2 text-3xl font-semibold text-white">Intel board</h2>
				<p class="text-primary-300 mt-2 text-sm leading-6">
					Track packages before you install them, keep the current search state useful, and bounce
					back into Ops when you want the bigger strategic picture.
				</p>

				<div class="mt-5 grid gap-3">
					<div class="rounded-[1.4rem] border border-primary-700/45 bg-primary-950/55 p-4">
						<div class="display-font text-primary-300 text-[0.68rem]">Scout Priorities</div>
						<div class="mt-4 grid gap-3 sm:grid-cols-2">
							<a
								href="/ops"
								class="rounded-2xl border border-accent-500/30 bg-accent-950/20 px-4 py-4 transition-colors hover:bg-accent-950/30"
							>
								<div class="font-semibold text-white">Open Ops Center</div>
								<div class="text-primary-400 mt-1 text-sm">
									Snapshots, notes, watchlists, and rituals live there.
								</div>
							</a>
							<a
								href="/"
								class="rounded-2xl border border-primary-700/40 bg-black/10 px-4 py-4 transition-colors hover:bg-primary-900/65"
							>
								<div class="font-semibold text-white">Return to Arsenal</div>
								<div class="text-primary-400 mt-1 text-sm">
									Go back to the active loadout and installed package control.
								</div>
							</a>
						</div>
					</div>

					<div class="rounded-[1.4rem] border border-primary-700/45 bg-primary-950/55 p-4">
						<div class="display-font text-accent-300 text-[0.68rem]">Tracked Packages</div>
						<div class="mt-2 text-xl font-semibold text-white">Saved for later</div>

						<div class="mt-4 space-y-3">
							{#if vault.intelTargets.length === 0}
								<div class="text-primary-400 rounded-2xl border border-primary-700/35 bg-black/10 px-4 py-4 text-sm">
									Use the mod details panel to add packages to the Empress intel board before
									committing them to a profile.
								</div>
							{:else}
								{#each vault.intelTargets.slice(0, 8) as target (target.uuid)}
									<div class="rounded-2xl border border-primary-700/35 bg-black/10 px-4 py-3">
										<div class="font-semibold text-white">{target.name}</div>
										<div class="text-primary-400 mt-1 text-sm">
											{target.author ?? 'Unknown author'}
											{#if target.version}
												<span class="text-primary-600 mx-1">/</span>
												{target.version}
											{/if}
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>

					<div class="rounded-[1.4rem] border border-primary-700/45 bg-primary-950/55 p-4">
						<div class="display-font text-primary-300 text-[0.68rem]">Recon Notes</div>
						<div class="mt-2 text-sm leading-6 text-primary-300">
							Ctrl-click installs the latest version instantly. The Intel Board view shows only
							packages you marked for later review.
						</div>
					</div>
				</div>
			</div>
		</aside>
	{/if}
</div>
