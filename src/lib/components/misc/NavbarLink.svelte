<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	type Props = {
		to: string;
		icon: string;
		tooltip: string;
	};

	let { to, icon, tooltip }: Props = $props();

	let active = $derived(page.url.pathname === to);
</script>

<Tooltip text={tooltip} side="right">
	<a
		href={to}
		class={[
			active
				? 'text-accent-300 border-accent-500/40 bg-primary-900/90 font-semibold shadow-[0_0_18px_rgba(239,68,68,0.16)]'
				: 'text-primary-400 hover:bg-primary-900/75 hover:text-primary-100 border-transparent',
			'relative flex items-center gap-2 rounded-xl border p-2.5 transition-colors'
		]}
	>
		<Icon class="text-[1.75rem]" {icon} />
	</a>
</Tooltip>
