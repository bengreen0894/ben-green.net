<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let scrolled = false;
	let menuOpen = false;

	onMount(() => {
		const onScroll = () => { scrolled = window.scrollY > 48; };
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '#about',    label: 'About'    },
		{ href: '#projects', label: 'Projects' },
		{ href: '#resume',   label: 'Resume'   },
		{ href: '#contact',  label: 'Contact'  }
	];
</script>

<nav class:scrolled>
	<div class="inner">
		<a href="/" class="logo" aria-label="Ben Green — Home">
			<span>B</span><span class="accent">G</span>
		</a>

		<ul class="links" class:open={menuOpen}>
			{#each links as l}
				<li>
					<a href={l.href} on:click={() => (menuOpen = false)}>{l.label}</a>
				</li>
			{/each}
		</ul>

		<button
			class="burger"
			class:open={menuOpen}
			on:click={() => (menuOpen = !menuOpen)}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
		>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>

<slot />

<style>
	nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		height: var(--nav-h);
		transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
	}

	nav.scrolled {
		background: rgba(240, 235, 225, 0.88);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		box-shadow: 0 1px 0 var(--border);
	}

	.inner {
		max-width: var(--container);
		margin: 0 auto;
		padding: 0 var(--gutter);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 800;
		letter-spacing: -0.02em;
		display: flex;
		gap: 1px;
		line-height: 1;
	}

	.logo .accent { color: var(--accent); }

	.links {
		display: flex;
		list-style: none;
		gap: 36px;
	}

	.links a {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted);
		position: relative;
		transition: color 0.2s;
	}

	.links a::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--accent);
		transition: width 0.25s ease;
	}

	.links a:hover { color: var(--text); }
	.links a:hover::after { width: 100%; }

	.burger {
		display: none;
		flex-direction: column;
		gap: 6px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}

	.burger span {
		display: block;
		width: 22px;
		height: 1.5px;
		background: var(--text);
		transition: transform 0.22s ease, opacity 0.22s ease;
		transform-origin: center;
	}

	.burger.open span:first-child { transform: translateY(3.75px) rotate(45deg); }
	.burger.open span:last-child  { transform: translateY(-3.75px) rotate(-45deg); }

	@media (max-width: 640px) {
		.burger { display: flex; }

		.links {
			position: fixed;
			inset: var(--nav-h) 0 0;
			background: var(--bg);
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 44px;
			transform: translateX(100%);
			transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
		}

		.links.open { transform: none; }

		.links a {
			font-size: 16px;
			letter-spacing: 0.12em;
		}
	}
</style>
