<script lang="ts">
	import * as api from '$lib/api';
	import { brand } from '$lib/brand';
	import DependantsDialog from '$lib/components/dialogs/DependantsDialog.svelte';
	import ModDetails from '$lib/components/mod-list/ModDetails.svelte';
	import ModList from '$lib/components/mod-list/ModList.svelte';
	import ModListFilters from '$lib/components/mod-list/ModListFilters.svelte';
	import ProfileLockedBanner from '$lib/components/mod-list/ProfileLockedBanner.svelte';
	import ProfileModListItem from '$lib/components/mod-list/ProfileModListItem.svelte';
	import UnknownModsBanner from '$lib/components/mod-list/UnknownModsBanner.svelte';
	import UpdateAllBanner from '$lib/components/mod-list/UpdateAllBanner.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import ModCardList from '$lib/components/ui/ModCardList.svelte';
	import { defaultContextItems } from '$lib/context';
	import {
		defaultProfileVault,
		EMPRESS_VAULT_UPDATED_EVENT,
		type EmpressProfileVault,
		readProfileVault
	} from '$lib/empress/vault';
	import { m } from '$lib/paraglide/messages';
	import games from '$lib/state/game.svelte';
	import profiles from '$lib/state/profile.svelte';
	import { profileQuery } from '$lib/state/misc.svelte';
	import { emit } from '@tauri-apps/api/event';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import {
		ModType,
		type AvailableUpdate,
		type Dependant,
		type Mod,
		type ModContextItem,
		type ProfileQuery,
		type SortBy
	} from '$lib/types';
	import { isOutdated } from '$lib/util';

	type EmpressView = 'all' | 'updates' | 'disabled' | 'local' | 'tracked';

	const sortOptions: SortBy[] = [
		'custom',
		'installDate',
		'lastUpdated',
		'newest',
		'diskSpace',
		'name',
		'author',
		'rating',
		'downloads'
	];

	const contextItems: ModContextItem[] = [
		{
			label: m.page_modContextItem_uninstall(),
			icon: 'mdi:delete',
			onclick: (mod) =>
				uninstall({
					uuid: mod.uuid,
					fullName: mod.name
				}),
			showFor: (_, profileLocked) => !profileLocked
		},
		{
			label: m.page_modContextItem_changeVersion(),
			icon: 'mdi:edit',
			onclick: () => {},
			showFor: (mod, profileLocked) => mod.versions.length > 1 && !profileLocked,
			children: (mod) =>
				mod.versions.map((version) => ({
					label: version.name,
					onclick: () => updateMod(mod, version.uuid)
				}))
		},
		{
			label: m.page_modContextItem_showDependants(),
			icon: 'mdi:source-branch',
			onclick: openDependants
		},
		{
			label: m.page_modContextItem_openFolder(),
			icon: 'mdi:folder',
			onclick: (mod) => api.profile.openModDir(mod.uuid)
		},
		...defaultContextItems
	];

	const emptyQuery: ProfileQuery = {
		mods: [],
		totalModCount: 0,
		unknownMods: [],
		updates: []
	};

	const empressViews: Array<{
		key: EmpressView;
		label: string;
		icon: string;
		description: string;
	}> = [
		{
			key: 'all',
			label: 'All arsenal',
			icon: 'mdi:view-grid-outline',
			description: 'Everything in the active loadout.'
		},
		{
			key: 'updates',
			label: 'Needs upgrades',
			icon: 'mdi:arrow-up-circle-outline',
			description: 'Only packages with fresher versions available.'
		},
		{
			key: 'disabled',
			label: 'Dormant',
			icon: 'mdi:toggle-switch-off-outline',
			description: 'Installed but intentionally held back.'
		},
		{
			key: 'local',
			label: 'Local injections',
			icon: 'mdi:flask-outline',
			description: 'Manual imports and local experiments.'
		},
		{
			key: 'tracked',
			label: 'Ops watchlist',
			icon: 'mdi:target-variant',
			description: 'Packages you marked for close monitoring.'
		}
	];

	let mods: Mod[] = $state([]);
	let totalModCount = $state(0);
	let unknownMods: Dependant[] = $state([]);
	let updates: AvailableUpdate[] = $state([]);
	let summary: ProfileQuery = $state(emptyQuery);
	let vault: EmpressProfileVault = $state(defaultProfileVault());
	let empressView = $state<EmpressView>('all');

	let modList: ModList;
	let maxCount: number = $state(20);
	let selectedMod: Mod | null = $state(null);

	let removeDependants: DependantsDialog;
	let disableDependants: DependantsDialog;
	let enableDependencies: DependantsDialog;

	let dependantsOpen = $state(false);
	let dependants: string[] = $state([]);

	let activeMod: Mod | null = $state(null);

	let hasRefreshed = $state(false);
	let refreshing = false;
	let refreshingSummary = false;

	function currentVaultScope() {
		return {
			gameSlug: games.active?.slug,
			profileId: profiles.activeId
		};
	}

	function loadVault() {
		vault = readProfileVault(currentVaultScope());
	}

	async function refresh() {
		if (refreshing) return;
		refreshing = true;

		try {
			const result = await api.profile.query({ ...profileQuery.current, maxCount });

			mods = result.mods;
			totalModCount = result.totalModCount;
			unknownMods = result.unknownMods;
			updates = result.updates;
			hasRefreshed = true;
		} finally {
			refreshing = false;
		}
	}

	async function refreshSummary() {
		if (refreshingSummary) return;
		if (profiles.active === null) {
			summary = emptyQuery;
			return;
		}

		refreshingSummary = true;

		try {
			summary = await api.profile.query({
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
		} finally {
			refreshingSummary = false;
		}
	}

	async function syncAllViews() {
		await Promise.all([refresh(), refreshSummary()]);
	}

	async function toggleMod(mod: Mod, newState: boolean) {
		mod.enabled = !mod.enabled;
		let response = await api.profile.toggleMod(mod.uuid);

		if (response.type == 'done') {
			await syncAllViews();
			return;
		}

		if (newState) {
			enableDependencies.openFor(mod, response.dependants);
		} else {
			disableDependants.openFor(mod, response.dependants);
		}
	}

	async function uninstall(mod: Dependant) {
		let response = await api.profile.removeMod(mod.uuid);

		if (response.type == 'done') {
			selectedMod = null;
			await syncAllViews();
		} else {
			removeDependants.openFor(mod, response.dependants);
		}
	}

	async function openDependants(mod: Mod) {
		dependants = await api.profile.getDependants(mod.uuid);

		activeMod = mod;
		dependantsOpen = true;
	}

	async function updateMod(mod: Mod | null, versionUuid?: string) {
		if (mod === null) return;

		if (versionUuid === undefined) {
			await api.profile.update.mods([mod.uuid], false);
		} else {
			await api.profile.update.changeModVersion({
				packageUuid: mod.uuid,
				versionUuid: versionUuid
			});
		}

		await syncAllViews();

		if (selectedMod !== null) {
			selectedMod = mods.find((entry) => entry.uuid === selectedMod!.uuid) ?? null;
		}
	}

	function setEmpressView(view: EmpressView) {
		empressView = view;
		selectedMod = null;
	}

	let reorderUuid: string;
	let reorderPrevIndex: number;

	function ondragstart(evt: DragEvent) {
		if (!isDragApplicable(evt)) return;

		let element = evt.currentTarget as HTMLElement;

		reorderUuid = element.dataset.uuid!;
		reorderPrevIndex = parseInt(element.dataset.index!);

		evt.dataTransfer!.effectAllowed = 'move';
		evt.dataTransfer!.setData('text/html', element.outerHTML);
	}

	async function ondragover(evt: DragEvent) {
		if (!isDragApplicable(evt)) return;

		let target = evt.currentTarget as HTMLElement;
		let newIndex = parseInt(target.dataset.index!);
		let delta = newIndex - reorderPrevIndex;

		if (delta === 0) {
			return;
		}

		let temp = mods[reorderPrevIndex];
		mods[reorderPrevIndex] = mods[newIndex];
		mods[newIndex] = temp;

		reorderPrevIndex = newIndex;

		if (profileQuery.current.sortOrder === 'descending') {
			delta *= -1;
		}

		await emit('reorder_mod', { uuid: reorderUuid, delta });
	}

	async function ondragend(evt: DragEvent) {
		if (!isDragApplicable(evt)) return;
		await emit('finish_reorder');
	}

	function isDragApplicable(evt: DragEvent) {
		if (!reorderable || evt.dataTransfer === null) return false;
		let items = [...evt.dataTransfer.items];
		return items.length === 0 || items[0].kind !== 'file';
	}

	function riskTone(risk: EmpressProfileVault['dossier']['risk']) {
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

	function riskLabel(risk: EmpressProfileVault['dossier']['risk']) {
		switch (risk) {
			case 'watch':
				return 'Watch';
			case 'volatile':
				return 'Volatile';
			case 'cataclysm':
				return 'Cataclysm';
			default:
				return 'Dormant';
		}
	}

	$effect(() => {
		if (maxCount > 0) {
			profiles.active;
			profileQuery.current;
			refresh();
		}
	});

	$effect(() => {
		profiles.active;
		refreshSummary();
	});

	$effect(() => {
		profiles.activeId;
		games.active?.slug;
		loadVault();
	});

	onMount(() => {
		const reload = () => loadVault();
		window.addEventListener(EMPRESS_VAULT_UPDATED_EVENT, reload);
		return () => window.removeEventListener(EMPRESS_VAULT_UPDATED_EVENT, reload);
	});

	let reorderable = $derived(
		empressView === 'all' &&
			profileQuery.current.sortBy === 'custom' &&
			profileQuery.current.searchTerm === '' &&
			profileQuery.current.excludeCategories.length === 0 &&
			profileQuery.current.includeCategories.length === 0 &&
			profileQuery.current.includeDeprecated &&
			profileQuery.current.includeNsfw &&
			profileQuery.current.includeDisabled
	);

	let locked = $derived(profiles.activeLocked);
	let trackedUuidSet = $derived.by(() => new Set(vault.trackedMods));
	let displayedMods = $derived.by(() => {
		switch (empressView) {
			case 'updates':
				return mods.filter((mod) => isOutdated(mod));
			case 'disabled':
				return mods.filter((mod) => mod.enabled === false);
			case 'local':
				return mods.filter((mod) => mod.type === ModType.Local);
			case 'tracked':
				return mods.filter((mod) => trackedUuidSet.has(mod.uuid));
			default:
				return mods;
		}
	});
	let viewCounts = $derived.by(() => ({
		all: summary.totalModCount,
		updates: summary.mods.filter((mod) => isOutdated(mod)).length,
		disabled: summary.mods.filter((mod) => mod.enabled === false).length,
		local: summary.mods.filter((mod) => mod.type === ModType.Local).length,
		tracked: summary.mods.filter((mod) => trackedUuidSet.has(mod.uuid)).length
	}));
	let trackedSummaryMods = $derived.by(() =>
		summary.mods.filter((mod) => trackedUuidSet.has(mod.uuid)).slice(0, 6)
	);
	let missionText = $derived.by(
		() =>
			vault.dossier.mission.trim() ||
			'No mission brief yet. Jump into Empress Ops and define what this loadout is built to dominate.'
	);
	let enabledCount = $derived.by(() => summary.mods.filter((mod) => mod.enabled !== false).length);

	$effect(() => {
		displayedMods;
		if (selectedMod && !displayedMods.some((mod) => mod.uuid === selectedMod?.uuid)) {
			selectedMod = null;
		}
	});
</script>

<svelte:head>
	<title>Empress Arsenal | Empress Mod Manager</title>
</svelte:head>

<div class="flex grow overflow-hidden">
	<div class="flex w-[60%] grow flex-col overflow-hidden pt-3 pl-3">
		<section class="empress-card empress-card-accent mr-4 mb-3 rounded-[1.5rem] p-5">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="max-w-3xl">
					<div class="display-font text-accent-300 text-xs">Arsenal Command</div>
					<div class="mt-2 flex flex-wrap items-center gap-3">
						<img
							src={brand.logoPath}
							alt={`${brand.shortName} sigil`}
							class="size-11 rounded-2xl bg-black/20 p-2 drop-shadow-[0_0_18px_rgba(239,68,68,0.25)]"
						/>
						<div>
							<h1 class="text-3xl font-semibold text-white">
								{vault.dossier.codename || profiles.active?.name || 'No active profile'}
							</h1>
							<div class="text-primary-300 mt-1 text-sm">
								{profiles.active?.name ?? 'Select or create a profile to start commanding a loadout.'}
							</div>
						</div>
						<span class={['empress-badge border', riskTone(vault.dossier.risk)]}>
							<Icon icon="mdi:alert-decagram-outline" />
							{riskLabel(vault.dossier.risk)}
						</span>
					</div>

					<p class="text-primary-200 mt-4 max-w-3xl text-sm leading-6">
						{missionText}
					</p>
				</div>

				<div class="flex flex-wrap gap-2">
					<a
						href="/ops"
						class="border-accent-500/35 bg-accent-950/24 hover:bg-accent-950/38 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
					>
						<Icon icon="mdi:shield-crown-outline" class="text-lg" />
						Open Ops Center
					</a>
					<a
						href="/browse"
						class="border-primary-700/60 hover:border-primary-400/45 hover:bg-primary-900/70 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-white transition-colors"
					>
						<Icon icon="mdi:store-search-outline" class="text-lg" />
						Hunt New Mods
					</a>
				</div>
			</div>

			<div class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
				<div class="rounded-2xl border border-primary-700/45 bg-primary-950/55 px-4 py-4">
					<div class="display-font text-primary-300 text-[0.68rem]">Installed</div>
					<div class="mt-2 text-3xl font-semibold text-white">{summary.totalModCount}</div>
					<div class="text-primary-400 mt-1 text-sm">Packages currently bound to this loadout.</div>
				</div>
				<div class="rounded-2xl border border-primary-700/45 bg-primary-950/55 px-4 py-4">
					<div class="display-font text-primary-300 text-[0.68rem]">Live</div>
					<div class="mt-2 text-3xl font-semibold text-white">{enabledCount}</div>
					<div class="text-primary-400 mt-1 text-sm">Enabled and ready to enter the runtime.</div>
				</div>
				<div class="rounded-2xl border border-accent-700/35 bg-accent-950/18 px-4 py-4">
					<div class="display-font text-accent-300 text-[0.68rem]">Upgrades</div>
					<div class="mt-2 text-3xl font-semibold text-white">{viewCounts.updates}</div>
					<div class="text-primary-400 mt-1 text-sm">Packages with fresher versions available.</div>
				</div>
				<div class="rounded-2xl border border-primary-700/45 bg-primary-950/55 px-4 py-4">
					<div class="display-font text-primary-300 text-[0.68rem]">Tracked</div>
					<div class="mt-2 text-3xl font-semibold text-white">{viewCounts.tracked}</div>
					<div class="text-primary-400 mt-1 text-sm">Mods flagged in the Empress watchlist.</div>
				</div>
			</div>

			<div class="mt-4 flex flex-wrap gap-2">
				{#each empressViews as view (view.key)}
					<button
						class={[
							empressView === view.key
								? 'border-accent-500/45 bg-accent-950/26 text-white'
								: 'border-primary-700/50 bg-primary-950/45 text-primary-200 hover:border-primary-400/40 hover:bg-primary-900/75',
							'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors'
						]}
						onclick={() => setEmpressView(view.key)}
					>
						<Icon icon={view.icon} class="text-base" />
						<span>{view.label}</span>
						<span class="rounded-full bg-black/20 px-2 py-0.5 text-xs text-primary-100">
							{viewCounts[view.key]}
						</span>
					</button>
				{/each}
			</div>
		</section>

		<ModListFilters {sortOptions} queryArgs={profileQuery.current} />

		{#if locked}
			<ProfileLockedBanner class="mr-4 mb-1" />
		{:else}
			<UpdateAllBanner {updates} />
		{/if}

		{#if unknownMods.length > 0}
			<UnknownModsBanner mods={unknownMods} {uninstall} />
		{/if}

		<ModList
			mods={displayedMods}
			queryArgs={profileQuery.current}
			bind:this={modList}
			bind:maxCount
			bind:selected={selectedMod}
		>
			{#snippet placeholder()}
				{#if hasRefreshed}
					{#if totalModCount === 0}
						<Icon icon="ph:ghost" class="text-primary-500 mx-auto mt-4 text-9xl" />

						<div class="mt-1 text-lg">{m.page_modList_noMods_1()}</div>
						<a href="/browse" class="text-accent-400 hover:text-accent-300 hover:underline"
							><Icon
								icon="mdi:store-search"
								class="mr-0.5 ml-1 inline"
								inline
							/>{m.page_modList_noMods_2()}</a
						>
					{:else}
						<div class="mt-4 text-lg">No packages match this Empress view.</div>
						<div class="text-primary-400">
							Switch filters above, or refine the current search and category controls.
						</div>
					{/if}
				{/if}
			{/snippet}

			{#snippet item({ mod, index, isSelected })}
				<ProfileModListItem
					{mod}
					{index}
					{isSelected}
					{contextItems}
					{reorderable}
					{locked}
					{ondragstart}
					{ondragover}
					{ondragend}
					ontoggle={(newState) => toggleMod(mod, newState)}
					onclick={() => modList.selectMod(mod)}
				/>
			{/snippet}
		</ModList>
	</div>

	{#if selectedMod}
		<ModDetails {locked} mod={selectedMod} {contextItems} onclose={() => (selectedMod = null)}>
			{#if selectedMod && isOutdated(selectedMod) && !locked}
				<button
					class="bg-accent-600 hover:bg-accent-500 mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-lg font-medium"
					onclick={() => updateMod(selectedMod)}
				>
					<Icon icon="mdi:arrow-up-circle" class="align-middle text-xl" />
					{m.page_modDetails_button({ version: selectedMod.versions[0].name })}
				</button>
			{/if}
		</ModDetails>
	{:else}
		<aside class="border-primary-600 bg-primary-700 relative flex w-[40%] min-w-72 flex-col border-l px-6 pt-6 pb-4 text-white">
			<div class="light-scrollbar grow overflow-x-hidden overflow-y-auto pb-2">
				<div class="display-font text-accent-300 text-xs">Command Rail</div>
				<h2 class="mt-2 text-3xl font-semibold text-white">Empress sidecar</h2>
				<p class="text-primary-300 mt-2 text-sm leading-6">
					The right rail stays useful even when no mod is selected: profile identity, tracked
					pressure points, and your saved Empress systems all stay in reach.
				</p>

				<div class="mt-5 grid gap-3">
					<div class="rounded-[1.4rem] border border-primary-700/45 bg-primary-950/55 p-4">
						<div class="display-font text-primary-300 text-[0.68rem]">Profile Dossier</div>
						<div class="mt-2 text-xl font-semibold text-white">
							{vault.dossier.codename || 'Unnamed operation'}
						</div>
						<div class="text-primary-400 mt-2 text-sm">{missionText}</div>

						<div class="mt-4 flex flex-wrap gap-2">
							{#if vault.dossier.tags.length > 0}
								{#each vault.dossier.tags as tag (tag)}
									<span class="empress-badge">
										<Icon icon="mdi:tag-outline" />
										{tag}
									</span>
								{/each}
							{:else}
								<span class="text-primary-500 text-sm">No tags set yet.</span>
							{/if}
						</div>
					</div>

					<div class="rounded-[1.4rem] border border-primary-700/45 bg-primary-950/55 p-4">
						<div class="display-font text-primary-300 text-[0.68rem]">Empress Systems</div>
						<div class="mt-4 grid gap-3 sm:grid-cols-3">
							<div class="rounded-2xl border border-primary-700/40 bg-black/10 px-3 py-3">
								<div class="text-primary-300 text-xs">Launch rituals</div>
								<div class="mt-1 text-2xl font-semibold text-white">{vault.launchRituals.length}</div>
							</div>
							<div class="rounded-2xl border border-primary-700/40 bg-black/10 px-3 py-3">
								<div class="text-primary-300 text-xs">Intel targets</div>
								<div class="mt-1 text-2xl font-semibold text-white">{vault.intelTargets.length}</div>
							</div>
							<div class="rounded-2xl border border-primary-700/40 bg-black/10 px-3 py-3">
								<div class="text-primary-300 text-xs">Snapshots</div>
								<div class="mt-1 text-2xl font-semibold text-white">{vault.snapshots.length}</div>
							</div>
						</div>
					</div>

					<div class="rounded-[1.4rem] border border-primary-700/45 bg-primary-950/55 p-4">
						<div class="display-font text-accent-300 text-[0.68rem]">Ops Watchlist</div>
						<div class="mt-2 text-xl font-semibold text-white">Tracked pressure points</div>

						<div class="mt-4 space-y-3">
							{#if trackedSummaryMods.length === 0}
								<div class="text-primary-400 rounded-2xl border border-primary-700/35 bg-black/10 px-4 py-4 text-sm">
									Track mods from the details panel and they will appear here as part of your
									Empress watchlist.
								</div>
							{:else}
								{#each trackedSummaryMods as mod (mod.uuid)}
									<div class="rounded-2xl border border-primary-700/35 bg-black/10 px-4 py-3">
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
											{#if isOutdated(mod)}
												<span class="rounded-full border border-accent-500/35 bg-accent-950/24 px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-accent-200">
													Update
												</span>
											{/if}
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>

					<div class="grid gap-3 sm:grid-cols-2">
						<a
							href="/ops"
							class="rounded-[1.2rem] border border-accent-500/30 bg-accent-950/20 px-4 py-4 transition-colors hover:bg-accent-950/30"
						>
							<div class="font-semibold text-white">Go deeper in Ops</div>
							<div class="text-primary-400 mt-1 text-sm">
								Snapshots, notes, rituals, dossiers, and the full intel board live there.
							</div>
						</a>
						<a
							href="/browse"
							class="rounded-[1.2rem] border border-primary-700/45 bg-primary-950/55 px-4 py-4 transition-colors hover:bg-primary-900/70"
						>
							<div class="font-semibold text-white">Scout fresh packages</div>
							<div class="text-primary-400 mt-1 text-sm">
								Build out the loadout with new packages from Thunderstore.
							</div>
						</a>
					</div>
				</div>
			</div>
		</aside>
	{/if}
</div>

<Dialog
	title={m.page_dialog_title({ name: activeMod?.name ?? m.unknown() })}
	bind:open={dependantsOpen}
>
	<div class="text-primary-300 mt-4 text-center">
		{#if dependants.length === 0}
			{m.page_dialog_noDependants()}
		{:else}
			<ModCardList names={dependants} showVersion={false} />
		{/if}
	</div>
</Dialog>

<DependantsDialog
	bind:this={removeDependants}
	title={m.page_dependantsDialog_uninstall_title()}
	verb={m.page_dependantsDialog_uninstall_verb()}
	description={m.page_dependantsDialog_uninstall_description()}
	commandName="remove_mod"
	onExecute={() => {
		selectedMod = null;
	}}
	onCancel={syncAllViews}
/>

<DependantsDialog
	bind:this={disableDependants}
	title={m.page_dependantsDialog_disable_title()}
	verb={m.page_dependantsDialog_disable_verb()}
	description={m.page_dependantsDialog_disable_description()}
	commandName="toggle_mod"
	onCancel={syncAllViews}
/>

<DependantsDialog
	bind:this={enableDependencies}
	title={m.page_dependantsDialog_enable_title()}
	verb={m.page_dependantsDialog_enable_verb()}
	description={m.page_dependantsDialog_enable_description()}
	commandName="toggle_mod"
	onCancel={syncAllViews}
	positive
/>
