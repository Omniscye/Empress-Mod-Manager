<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte';

	import * as api from '$lib/api';
	import Icon from '@iconify/svelte';
	import GameSelect from '$lib/components/toolbar/GameSelect.svelte';
	import Updater from './Updater.svelte';
	import Syncer from './Syncer.svelte';
	import ProfilesDropdown from './ProfilesDropdown.svelte';
	import games from '$lib/state/game.svelte';
	import InstallPopover from './InstallPopover.svelte';
	import { message } from '@tauri-apps/plugin-dialog';
	import { m } from '$lib/paraglide/messages';
	import { gameIconSrc, timeSince } from '$lib/util';

	let launchDialogOpen = $state(false);
	let gamesOpen = $state(false);

	let timeSinceGamesUpdate = $derived.by(() => {
		gamesOpen; // refresh whenever the dialog is opened
		return timeSince(games.lastUpdated);
	});

	async function launchGame() {
		if (await api.profile.install.hasPendingInstallations()) {
			await message(m.toolBar_launchGame_message());
			return;
		}

		launchDialogOpen = true;
		try {
			await api.profile.launch.launchGame();
		} catch {
			launchDialogOpen = false;
		}
	}
</script>

<div
	class="border-primary-700/60 bg-primary-950/70 flex h-12 shrink-0 flex-row border-t border-b backdrop-blur-xl"
>
	<button
		class="text-accent-300 hover:text-accent-200 border-primary-700/60 hover:bg-primary-900/70 display-font flex shrink-0 items-center border-r pr-8 pl-6 text-sm font-semibold"
		onclick={launchGame}
	>
		<Icon icon="mdi:play-circle" class="mr-2 text-xl" />
		{m.toolBar_launchGame_button()}
	</button>

	<button
		onclick={() => (gamesOpen = !gamesOpen)}
		class="group border-primary-700/60 text-primary-200 hover:bg-primary-900/70 flex shrink-0 items-center justify-between border-r pr-4 pl-2 font-semibold group-hover:text-white"
	>
		<img
			src={games.active ? gameIconSrc(games.active) : ''}
			class="mr-2 max-h-8 max-w-8 rounded-sm"
			alt={games.active?.name}
		/>

		{games.active?.name}

		<Icon
			icon="mdi:menu"
			class="text-primary-300 group-hover:text-primary-200 ml-6 shrink-0 text-lg"
		/>
	</button>

	<ProfilesDropdown />
	<Syncer />
	<InstallPopover />
	<Updater />
</div>

<Dialog
	title={m.toolBar_dialog_launch_title({ name: games.active?.name ?? m.unknown() })}
	bind:open={launchDialogOpen}
>
	<p class="text-primary-400">
		{m.toolBar_dialog_launch_content()}
	</p>
</Dialog>

<Dialog title={m.toolBar_dialog_games_title()} bind:open={gamesOpen}>
	<GameSelect onselect={() => (gamesOpen = false)} />
	<div class="text-primary-400 my-1 text-center text-sm">
		{m.toolBar_dialog_games_lastUpdated({ time: timeSinceGamesUpdate })}
	</div>
</Dialog>
