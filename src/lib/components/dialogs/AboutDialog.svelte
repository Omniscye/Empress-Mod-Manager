<script lang="ts">
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Link from '$lib/components/ui/Link.svelte';

	import Icon from '@iconify/svelte';
	import { getVersion } from '@tauri-apps/api/app';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import updates from '$lib/state/update.svelte';
	import { m } from '$lib/paraglide/messages';
	import { brand } from '$lib/brand';

	type Props = {
		open?: boolean;
	};

	let { open = $bindable(false) }: Props = $props();

	let version = $state('');
	let checkedUpdate = $state(false);

	$effect(() => {
		if (open) checkedUpdate = false;
	});

	onMount(async () => {
		version = await getVersion();
	});
</script>

<Dialog bind:open title={m.aboutDialog_title()}>
	<div class="h-3"></div>
	<img src={brand.logoPath} alt={`${brand.shortName} logo`} class="float-right size-20" />
	<div>
		<h3 class="display-font text-lg font-semibold text-white">{brand.name}</h3>
		<p class="text-primary-400 mt-1 max-w-md text-sm">{brand.tagline}</p>
		<p class="text-primary-300">
			{m.aboutDialog_version({ version: version })}
			<br />
			Derived from Gale under GNU General Public License v3.0
		</p>
		<div class="mt-3 flex items-center gap-2">
			<Icon icon="mdi:github" class="text-xl text-white" />
			<Link href={brand.repoUrl}>Empress repository</Link>
		</div>
		<div class="mt-1 flex items-center gap-2">
			<Icon icon="mdi:file-document" class="text-xl text-white" />
			<Link href={brand.changelogUrl}>Empress changes</Link>
		</div>
		<div class="mt-1 flex items-center gap-2">
			<Icon icon="mdi:file-document" class="text-xl text-white" />
			<Link href={brand.legalUrl}>Legal notice</Link>
		</div>
		<div class="mt-1 flex items-center gap-2">
			<Icon icon="mdi:source-fork" class="text-xl text-white" />
			<Link href={brand.upstreamRepo}>Code lineage: {brand.upstreamName}</Link>
		</div>
		<div class="mt-1 flex items-center gap-2">
			<Icon icon="mdi:alert-circle-outline" class="text-xl text-white" />
			<Link href={brand.issuesUrl}>Report an issue</Link>
		</div>
		{#if brand.updatesEnabled}
			<div class="mt-3 flex items-center gap-2">
				<Button
					onclick={() => updates.refresh().then(() => (checkedUpdate = true))}
					loading={updates.isChecking}
					color="primary"
					class="mr-2"
					icon="mdi:refresh"
				>
					{m.aboutDialog_checkUpdate()}
				</Button>

				{#if !updates.isChecking && checkedUpdate}
					{#if updates.next}
						<Icon icon="mdi:arrow-up-circle" class="text-accent-400 inline text-xl" />
						<span class="text-accent-400"
							>{m.aboutDialog_newVersion({ version: updates.next.version })}</span
						>
					{:else}
						<Icon icon="mdi:check" class="text-primary-300 text-xl" />
						<span class="text-primary-300">{m.aboutDialog_latestVersion()}</span>
					{/if}
				{/if}
			</div>
		{:else}
			<p class="text-primary-400 mt-3 text-sm">
				In-app updates are disabled until Empress has its own release pipeline.
			</p>
		{/if}
	</div>
</Dialog>
