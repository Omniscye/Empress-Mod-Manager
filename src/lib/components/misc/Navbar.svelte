<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';
	import { m } from '$lib/paraglide/messages';
	import { brand } from '$lib/brand';

	const links = [
		{
			to: '/ops',
			icon: 'mdi:shield-crown-outline',
			tooltip: 'Empress Ops'
		},
		{
			to: '/',
			icon: 'mdi:account-circle',
			tooltip: m.navBar_link_profile()
		},
		{
			to: '/browse',
			icon: 'mdi:store-search',
			tooltip: m.navBar_link_browse()
		},
		{
			to: '/config',
			icon: 'mdi:file-cog',
			tooltip: m.navBar_link_config()
		},
		{
			to: '/modpack',
			icon: 'mdi-package-variant',
			tooltip: m.navBar_link_modpack()
		},
		{
			to: '/prefs',
			icon: 'mdi:cog',
			tooltip: m.navBar_link_prefs()
		}
	];
</script>

<nav
	class="border-primary-700/70 bg-primary-950/70 relative flex w-[88px] shrink-0 flex-col items-center gap-1.5 border-r px-3 py-4 backdrop-blur-xl"
>
	<a
		href="/ops"
		class="empress-card empress-card-accent mb-2 flex w-full flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center"
	>
		<img
			src={brand.logoPath}
			alt={`${brand.shortName} sigil`}
			class="size-10 drop-shadow-[0_0_18px_rgba(96,165,250,0.32)]"
		/>
		<div class="display-font text-[0.55rem] leading-tight text-white">{brand.shortName}</div>
	</a>

	{#each links as link (link.to)}
		<NavbarLink {...link} />
	{/each}
</nav>
