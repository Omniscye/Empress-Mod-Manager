<script lang="ts">
	import { PersistedState } from 'runed';
	import Link from '../ui/Link.svelte';
	import Icon from '@iconify/svelte';
	import InfoBox from '../ui/InfoBox.svelte';
	import { brand } from '$lib/brand';

	type Props = {
		show?: boolean;
	};

	let { show: showProp = true }: Props = $props();

	const closeDuration = 1000 * 60 * 60 * 24 * 7; // 1 week

	let closedAt = new PersistedState<string | null>('donationClosedAt', null);

	let show = $derived(
		showProp &&
			(!closedAt.current || Date.now() - new Date(closedAt.current).getTime() > closeDuration)
	);
</script>

<InfoBox class={!show && 'hidden'}>
	<div class="text-lg font-semibold text-white">Sync Infrastructure Status</div>

	<div class="text-primary-300">
		Empress is keeping sync offline until it has its own backend. Follow rollout notes in the
		<Link href={brand.repoUrl}>repo</Link>.
	</div>

	<button
		class="text-primary-400 hover:text-accent-400 mt-2 flex items-center gap-1 text-sm hover:underline"
		onclick={() => {
			closedAt.current = new Date().toISOString();
		}}
	>
		<Icon icon="mdi:close" />
		Hide for a week
	</button>
</InfoBox>
