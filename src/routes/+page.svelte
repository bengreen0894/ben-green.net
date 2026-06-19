<script>
	import { onMount } from 'svelte';

	let fontsReady = false;
	onMount(() => {
		if (typeof document !== 'undefined' && document.fonts?.ready) {
			document.fonts.ready.then(() => { fontsReady = true; });
		} else {
			fontsReady = true;
		}
	});

	/** @type {import('svelte/action').Action<HTMLElement, {delay?: number, y?: number}>} */
	function reveal(node, { delay = 0, y = 28 } = {}) {
		node.style.opacity = '0';
		node.style.transform = `translateY(${y}px)`;
		node.style.transition = `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`;

		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
					io.disconnect();
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
		);

		io.observe(node);
		return { destroy: () => io.disconnect() };
	}

	import { projects } from '$lib/projects.js';
	import topoSvgRaw from '$lib/topo.svg?raw';
	const topoInner = topoSvgRaw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

	let heroEl;
	let trailGroup;
	let lastStamp = 0;
	const SVG_NS = 'http://www.w3.org/2000/svg';

	function handleHeroMove(e) {
		if (!heroEl || !trailGroup) return;
		// Throttle to ~one dot per 22ms so fast moves don't flood the DOM
		const now = performance.now();
		if (now - lastStamp < 22) return;
		lastStamp = now;

		const r = heroEl.getBoundingClientRect();
		const x = e.clientX - r.left;
		const y = e.clientY - r.top;

		const c = document.createElementNS(SVG_NS, 'circle');
		c.setAttribute('cx', x);
		c.setAttribute('cy', y);
		c.setAttribute('r', 40);
		c.setAttribute('fill', 'url(#trail-dot-grad)');
		c.classList.add('trail-dot');
		trailGroup.appendChild(c);
		setTimeout(() => c.remove(), 450);
	}

	const experience = [
		{
			period: '2019 – Present',
			role: 'Senior Experience Designer',
			company: 'U.S. Bank',
			desc: 'Designing end-to-end digital banking experiences for consumer and small business, spanning ACH payments, wire transfers, and external account management.'
		},
		{
			period: '2025 – Present',
			role: 'Co-founder & Principal Designer',
			company: '707 Labs L.L.C.',
			desc: 'Building software solutions with my friend and co-founding architect; 707 Labs aims to build extremely high quality experiences on the web.'
		},
		{
			period: '2017 – 2019',
			role: 'UI/UX Designer',
			company: 'Wolf Appliance',
			desc: 'Led UI/UX work for the Wolf New-gen E-Series Oven — state machine flows, touchscreen control interfaces, and hardware interaction design.'
		}
	];

	const education = [
		{
			period: '2017',
			degree: 'B.F.A. Industrial Design',
			school: 'University of Wisconsin – Stout'
		}
	];

	const email = 'ben.green0894@gmail.com';
	let copied = false;

	function copyEmail() {
		navigator.clipboard.writeText(email);
		copied = true;
		setTimeout(() => { copied = false; }, 2200);
	}

</script>

<svelte:head>
	<title>Ben Green — Sr. Experience Designer</title>
</svelte:head>


<!-- ─────────────────────────────── HERO ─────────────────────────────── -->

<!-- Trail mask: pre-blurred radial-gradient dots (no SVG filter) reveal the orange topo -->
<svg class="filter-defs" width="0" height="0" aria-hidden="true">
	<defs>
		<radialGradient id="trail-dot-grad" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="white" stop-opacity="1" />
			<stop offset="55%" stop-color="white" stop-opacity="0.55" />
			<stop offset="100%" stop-color="white" stop-opacity="0" />
		</radialGradient>
		<mask id="trail-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="10000" height="10000">
			<g bind:this={trailGroup}></g>
		</mask>
		<symbol id="topo-shape" viewBox="0 0 654 655" preserveAspectRatio="xMidYMid slice">
			{@html topoInner}
		</symbol>
	</defs>
</svg>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section class="hero" bind:this={heroEl} on:mousemove={handleHeroMove}>
	<div class="hero-bg" aria-hidden="true">
		<svg class="topo topo-gray" viewBox="0 0 654 655" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
			<use href="#topo-shape" />
		</svg>
		<svg class="topo topo-orange" viewBox="0 0 654 655" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
			<use href="#topo-shape" />
		</svg>
	</div>

	<div class="hero-inner">
		<div class="hero-text">
			<p class="hero-greeting">Hello, I'm</p>

			<h1 class="hero-name" class:fonts-ready={fontsReady}>
				<span class="name-solid">Ben</span>
				<span class="name-outline">Green</span>
			</h1>

			<div class="hero-rule"></div>

			<div class="hero-about">
				<div class="hero-about-backdrop" aria-hidden="true"></div>
				<p class="hero-about-lead">
					I'm a <span class="accent">Senior product + experience designer</span> with
					<span class="accent">8 years</span> of industry experience crafting high-quality
					digital products.
				</p>
				<p>
					I've fully leaned into emerging tools — using AI-assisted workflows to build
					components, shape design systems, and ship complete products. Closing the gap
					between design and the build has made me a more precise designer and a faster
					collaborator.
				</p>
			</div>
		</div>
	</div>

	<a href="#projects" class="scroll-cue" aria-label="Scroll to projects section">
		<span>Scroll</span>
		<span class="arrow">↓</span>
	</a>
</section>


<!-- ─────────────────────────────── PROJECTS ─────────────────────────────── -->

<section class="projects" id="projects">
	<div class="container">
		<header class="sec-header">
			<span class="sec-num" aria-hidden="true">01</span>
			<span class="sec-label">Projects</span>
		</header>

		<div class="proj-grid">
			{#each projects as p, i}
				<a
					href={p.comingSoon ? undefined : `/projects/${p.slug}`}
					class="card card-{i + 1}"
					class:coming-soon={p.comingSoon}
					style="--cb:{p.bg};--ca:{p.deco}"
					use:reveal={{ delay: i * 60 }}
					aria-label={p.comingSoon ? `${p.title} — coming soon` : `View ${p.title} case study`}
				>
					<div class="card-thumb">
						{#if p.thumb || p.hero}
							<img
								class="card-thumb-img"
								src={p.thumb ?? p.hero}
								alt=""
								aria-hidden="true"
								width="600"
								height="368"
								loading={i === 0 ? 'eager' : 'lazy'}
								decoding="async"
								fetchpriority={i === 0 ? 'high' : 'auto'}
							/>
						{:else}
							<div class="card-deco"></div>
						{/if}
					</div>
					<div class="card-body">
						<div class="card-meta">
							<span class="card-cat">{p.category}</span>
							<span class="card-yr">{p.year}</span>
						</div>
						<h3 class="card-title">{p.title}</h3>
						<p class="card-desc">{p.description}</p>
						{#if !p.comingSoon}
							<span class="card-cta">View Case Study →</span>
						{:else}
							<span class="card-cta soon">Coming Soon</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>


<!-- ─────────────────────────────── RESUME ─────────────────────────────── -->

<section class="resume" id="resume">
	<div class="container">
		<header class="sec-header">
			<span class="sec-num" aria-hidden="true">02</span>
			<span class="sec-label">Resume</span>
		</header>

		<div class="cv-dl-inline" use:reveal>
			<a href="/Ben-Green-UX-Resume-2026.pdf" class="btn-dl" download>Download CV ↓</a>
		</div>

		<div class="resume-cols">
			<div>
				<h2 class="col-heading" use:reveal>Experience</h2>

				{#each experience as item, i}
					<div class="t-row" use:reveal={{ delay: i * 80 }}>
						<div class="t-period">{item.period}</div>
						<div>
							<h3 class="t-role">{item.role}</h3>
							<p class="t-company">{item.company}</p>
							<p class="t-desc">{item.desc}</p>
						</div>
					</div>
					{/each}
			</div>

			<div>
				<h2 class="col-heading" use:reveal={{ delay: 120 }}>Education</h2>

				{#each education as item}
					<div class="t-row" use:reveal={{ delay: 200 }}>
						<div class="t-period">{item.period}</div>
						<div>
							<h3 class="t-role">{item.degree}</h3>
							<p class="t-company">{item.school}</p>
							{#if item.note}<p class="t-note">{item.note}</p>{/if}
						</div>
					</div>
				{/each}

			</div>
		</div>
	</div>
</section>


<!-- ─────────────────────────────── CONTACT ─────────────────────────────── -->

<section class="contact" id="contact">
	<div class="container">
		<div class="contact-grid">
			<h2 class="contact-heading" use:reveal>
				Let's<br /><em>talk.</em>
			</h2>

			<div class="contact-body" use:reveal={{ delay: 120 }}>
				<p class="contact-intro">
					Open to full-time roles, freelance projects, and interesting conversations.
				</p>

				<button class="email-btn" on:click={copyEmail} aria-live="polite">
					<span class="email-str">{email}</span>
					<span class="copy-label" class:done={copied}>
						{copied ? 'Copied ✓' : 'Copy'}
					</span>
				</button>

				<nav class="socials" aria-label="Social links">
					<a href="https://www.linkedin.com/in/ben-green-26b63124/" target="_blank" rel="noopener noreferrer">
						LinkedIn
					</a>
					<a href="https://mulligan-labs.com" target="_blank" rel="noopener noreferrer">
						Mulligan Labs
					</a>
				</nav>
			</div>
		</div>

		<footer class="site-footer">
			<span>© 2025 Ben Green</span>
			<span>Designed &amp; built with care</span>
		</footer>
	</div>
</section>


<style>
	/* ── Shared ── */
	.container {
		max-width: var(--container);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.sec-header {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 64px;
	}

	.sec-num {
		font-family: var(--font-display);
		font-size: 11px;
		font-weight: 400;
		font-style: italic;
		color: var(--accent);
	}

	.sec-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}


	/* ── HERO ── */
	.hero {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: calc(var(--nav-h) + 56px) var(--gutter) 80px;
		position: relative;
		overflow: hidden;
	}

	/* topographic background — two stacked layers, top one masked to a cursor spotlight */
	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.topo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.topo-gray {
		color: rgba(26, 23, 20, 0.045);
	}

	.topo-orange {
		color: rgba(200, 71, 43, 0.55);
		-webkit-mask: url(#trail-mask);
		mask: url(#trail-mask);
		-webkit-mask-mode: alpha;
		mask-mode: alpha;
	}

	.filter-defs {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
		pointer-events: none;
	}

	:global(.trail-dot) {
		animation: trail-fade 420ms ease-out forwards;
	}

	@keyframes trail-fade {
		0%   { opacity: 1; }
		100% { opacity: 0; }
	}

	.hero-inner {
		max-width: var(--container);
		margin: 0 auto;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 40px;
		position: relative;
	}

	.hero-greeting {
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: capitalize;
		color: var(--accent);
		margin-bottom: 20px;
		animation: fadeUp 0.9s ease both;
	}

	.hero-text {
		max-width: 720px;
	}

	.hero-name {
		font-family: var(--font-display);
		font-size: clamp(56px, 6vw, 80px);
		font-weight: 700;
		font-style: normal;
		line-height: 0.9;
		letter-spacing: -0.03em;
		margin-bottom: 32px;
		color: #2d2c2b;
	}

	.name-solid,
	.name-outline {
		display: block;
		margin-left: 0;
		color: #2d2c2b;
	}

	.name-solid,
	.name-outline { opacity: 0; }

	.hero-name.fonts-ready .name-solid,
	.hero-name.fonts-ready .name-outline { animation: fadeUp 0.9s ease both; }

	.hero-rule {
		width: clamp(280px, 46vw, 662px);
		height: 1.5px;
		background: rgba(200, 71, 43, 0.5);
		margin-bottom: 32px;
		transform-origin: left;
		animation: growX 0.9s ease 0.35s both;
	}

	.hero-about {
		position: relative;
		max-width: 662px;
		padding: 24px 28px;
		animation: fadeUp 0.9s ease 0.45s both;
	}

	.hero-about-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(212, 216, 224, 0.6);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border-radius: 12px;
		z-index: 0;
		pointer-events: none;
	}

	.hero-about p {
		position: relative;
		z-index: 1;
		font-size: 17px;
		line-height: 1.72;
		color: var(--text);
		margin-bottom: 16px;
	}

	.hero-about p:last-child {
		margin-bottom: 0;
	}

	.hero-about-lead {
		font-weight: 700;
	}

	.hero-about .accent {
		color: var(--accent);
	}

	.scroll-cue {
		position: absolute;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
		animation: fadeIn 1.2s ease 1s both;
	}

	.scroll-cue .arrow {
		animation: bob 2.2s ease-in-out infinite;
	}


	/* ── PROJECTS ── */
	.projects {
		padding: var(--pad) 0;
		border-top: 1px solid var(--border);
	}

	.proj-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 16px;
	}

	/* asymmetric: wide–narrow / narrow–wide */
	.card-1 { grid-column: span 7; }
	.card-2 { grid-column: span 5; }
	.card-3 { grid-column: span 5; }
	.card-4 { grid-column: span 7; }

	.card {
		display: block;
		background: var(--white);
		border-radius: 3px;
		overflow: hidden;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
		            box-shadow 0.4s ease;
	}

	.card.coming-soon {
		cursor: default;
		pointer-events: none;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 28px 64px -16px rgba(0, 0, 0, 0.16);
	}

	.card-thumb {
		height: clamp(180px, 26vw, 340px);
		background: var(--cb);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.card-thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		display: block;
		transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.card:hover .card-thumb-img {
		transform: scale(1.04);
	}

	.card-deco {
		width: 36%;
		aspect-ratio: 1;
		border: 2px solid var(--ca);
		opacity: 0.28;
		border-radius: 2px;
		transform: rotate(18deg);
		transition: transform 0.55s ease, opacity 0.3s;
	}

	.card:hover .card-deco {
		transform: rotate(0deg);
		opacity: 0.48;
	}

	.card-body {
		padding: 22px 26px 28px;
	}

	.card-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.card-cat {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.card-yr {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--muted);
	}

	.card-title {
		font-family: var(--font-display);
		font-size: clamp(20px, 2.4vw, 28px);
		font-weight: 700;
		line-height: 1.15;
		margin-bottom: 10px;
		transition: color 0.2s;
	}

	.card:hover .card-title { color: var(--accent); }

	.card-desc {
		font-size: 14px;
		line-height: 1.65;
		color: var(--muted);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 16px;
	}

	.card-cta {
		font-size: 13px;
		font-weight: 700;
		color: var(--accent);
		letter-spacing: 0.02em;
		display: inline-block;
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.22s, transform 0.22s;
	}

	.card:hover .card-cta {
		opacity: 1;
		transform: none;
	}

	.card-cta.soon {
		opacity: 1;
		transform: none;
		color: var(--muted);
		font-style: italic;
		font-weight: 400;
		letter-spacing: 0;
	}


	/* ── RESUME ── */
	.resume :global(.sec-header) {
		margin-bottom: 32px;
	}

	.resume {
		padding: var(--pad) 0;
		border-top: 1px solid var(--border);
	}

	.resume-cols {
		display: grid;
		grid-template-columns: 3fr 2fr;
		gap: clamp(48px, 8vw, 100px);
	}

	.col-heading {
		font-family: var(--font-display);
		font-size: 26px;
		font-style: italic;
		font-weight: 400;
		background-color: var(--muted);
		background-image: url('/paper.svg');
		background-size: 600px 600px;
		background-blend-mode: multiply;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
		margin-bottom: 48px;
	}

	.t-row {
		display: grid;
		grid-template-columns: 124px 1fr;
		gap: 24px;
		padding-bottom: 40px;
		margin-bottom: 40px;
		border-bottom: 1px solid var(--border);
	}

	.t-row:last-of-type { border-bottom: none; }

	.t-period {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--muted);
		padding-top: 5px;
	}

	.t-role {
		font-family: var(--font-display);
		font-size: clamp(18px, 2vw, 22px);
		font-style: italic;
		font-weight: 700;
		margin-bottom: 4px;
	}

	.t-company {
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 10px;
	}

	.t-desc {
		font-size: 15px;
		line-height: 1.65;
		color: var(--muted);
	}

	.t-note {
		font-size: 13px;
		font-style: italic;
		color: var(--muted);
		margin-top: 8px;
	}

	.cv-dl-inline {
		margin-bottom: 56px;
	}

	.btn-dl {
		display: inline-flex;
		padding: 12px 22px;
		border: 1.5px solid var(--text);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition: background 0.22s, color 0.22s;
	}

	.btn-dl:hover {
		background: var(--text);
		color: var(--bg);
	}


	/* ── CONTACT ── */
	.contact {
		background: var(--text);
		color: var(--bg);
		padding: var(--pad) 0 56px;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(48px, 8vw, 100px);
		align-items: start;
		margin-bottom: 80px;
	}

	.contact-heading {
		font-family: var(--font-display);
		font-size: clamp(68px, 10vw, 148px);
		font-weight: 900;
		line-height: 0.88;
		letter-spacing: -0.03em;
	}

	.contact-heading em {
		font-style: italic;
		color: var(--accent);
	}

	.contact-intro {
		font-size: 17px;
		line-height: 1.65;
		color: rgba(240, 235, 225, 0.55);
		margin-bottom: 40px;
	}

	.email-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 20px;
		background: rgba(240, 235, 225, 0.07);
		border: 1px solid rgba(240, 235, 225, 0.16);
		border-radius: 4px;
		color: var(--bg);
		cursor: pointer;
		transition: background 0.22s, border-color 0.22s;
		margin-bottom: 32px;
		text-align: left;
	}

	.email-btn:hover {
		background: rgba(240, 235, 225, 0.12);
		border-color: rgba(240, 235, 225, 0.32);
	}

	.email-str {
		font-size: 15px;
		font-weight: 500;
	}

	.copy-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
		white-space: nowrap;
		flex-shrink: 0;
		transition: opacity 0.2s;
	}

	.copy-label.done { color: #74b474; }

	.socials {
		display: flex;
		gap: 28px;
	}

	.socials a {
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: rgba(240, 235, 225, 0.42);
		transition: color 0.22s;
	}

	.socials a:hover { color: var(--bg); }

	.site-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid rgba(240, 235, 225, 0.1);
		padding-top: 24px;
		font-size: 12px;
		color: rgba(240, 235, 225, 0.28);
	}


	/* ── Keyframes ── */
	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(22px); }
		to   { opacity: 1; transform: translateY(0);    }
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
	@keyframes growX {
		from { transform: scaleX(0); }
		to   { transform: scaleX(1); }
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	@keyframes bob {
		0%, 100% { transform: translateY(0);   }
		50%       { transform: translateY(5px); }
	}


	/* ── Responsive ── */
	@media (max-width: 960px) {
		.proj-grid { grid-template-columns: 1fr 1fr; }
		.card-1, .card-2, .card-3, .card-4 { grid-column: span 1; }

		.resume-cols { grid-template-columns: 1fr; gap: 56px; }

		.contact-grid { grid-template-columns: 1fr; gap: 48px; }
	}

	@media (max-width: 600px) {
		.sec-header { margin-bottom: 44px; }

		.proj-grid { grid-template-columns: 1fr; }

		.t-row { grid-template-columns: 1fr; gap: 6px; }

		.site-footer { flex-direction: column; gap: 8px; text-align: center; }
	}
</style>
