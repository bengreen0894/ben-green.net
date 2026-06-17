<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let scrolled = false;
	let menuOpen = false;

	let cursorEl;

	onMount(() => {
		let pendingX = 0, pendingY = 0, rafScheduled = false;

		const flush = () => {
			rafScheduled = false;
			cursorEl.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0) translate(-50%, -50%)`;
		};
		const move = (e) => {
			pendingX = e.clientX;
			pendingY = e.clientY;
			if (!rafScheduled) {
				rafScheduled = true;
				requestAnimationFrame(flush);
			}
		};
		const over = (e) => {
			if (e.target.closest('a, button, [role="button"]')) cursorEl.classList.add('is-hover');
		};
		const out = (e) => {
			if (e.target.closest('a, button, [role="button"]')) cursorEl.classList.remove('is-hover');
		};
		const hide = () => { cursorEl.style.opacity = '0'; };
		const show = () => { cursorEl.style.opacity = '1'; };

		window.addEventListener('mousemove', move, { passive: true });
		document.addEventListener('mouseover', over);
		document.addEventListener('mouseout', out);
		document.addEventListener('mouseleave', hide);
		document.addEventListener('mouseenter', show);

		return () => {
			window.removeEventListener('mousemove', move);
			document.removeEventListener('mouseover', over);
			document.removeEventListener('mouseout', out);
			document.removeEventListener('mouseleave', hide);
			document.removeEventListener('mouseenter', show);
		};
	});

	onMount(() => {
		const onScroll = () => { scrolled = window.scrollY > 48; };
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '#projects', label: 'Projects' },
		{ href: '#resume',   label: 'Resume'   },
		{ href: '#contact',  label: 'Contact'  }
	];
</script>

<div class="paper" aria-hidden="true"></div>

<div class="cursor" bind:this={cursorEl} aria-hidden="true"></div>

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
	:global(*, *::before, *::after) { cursor: none !important; }

	/* Animated paper-grain texture across the whole page */
	.paper {
		position: fixed;
		inset: 0;
		z-index: 200;
		pointer-events: none;
		background-image: url('/paper.svg');
		background-size: 1200px 1200px;
		background-repeat: repeat;
		opacity: 0.12;
		mix-blend-mode: multiply;
	}

	@media (prefers-reduced-motion: reduce) {
		.paper { animation: none; }
	}

	.cursor {
		position: fixed;
		left: 0;
		top: 0;
		width: 10px;
		height: 10px;
		background: var(--accent);
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		transform: translate3d(-40px, -40px, 0) translate(-50%, -50%);
		will-change: transform;
		transition: width 0.18s ease, height 0.18s ease, background 0.18s ease, border 0.18s ease;
	}

	.cursor.is-hover {
		width: 28px;
		height: 28px;
		background: transparent;
		border: 1.5px solid var(--accent);
	}

	nav {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		height: var(--nav-h);
		padding: 0 var(--gutter);
		background: linear-gradient(
			180deg,
			rgba(240, 235, 225, 0.95) 0%,
			rgba(240, 235, 225, 0.75) 55%,
			rgba(240, 235, 225, 0) 100%
		);
		transition: box-shadow 0.3s, backdrop-filter 0.3s;
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
