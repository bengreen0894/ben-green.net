<script>
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

	export let data;
	$: p = data.project;
</script>

<svelte:head>
	<title>{p.title} — Ben Green</title>
	<meta name="description" content={p.description} />
</svelte:head>

<div class="case-study" style="--proj-accent:{p.deco};--proj-bg:{p.bg}">

	<!-- ── Back link ── -->
	<a href="/#projects" class="back-link">← Back to work</a>

	<!-- ── Hero header ── -->
	<header class="cs-header">
		<div class="cs-meta-top">
			<span class="cs-cat">{p.category}</span>
			<span class="cs-yr">{p.year}</span>
		</div>
		<h1 class="cs-title">{p.title}</h1>
		<p class="cs-lead">{p.description}</p>
	</header>

	<!-- ── Hero ── -->
	{#if p.hero}
		<div class="cs-hero-img">
			<img src={p.hero} alt="{p.title} — project overview" />
		</div>
	{:else}
		<div class="cs-hero-block" style="background:{p.bg}">
			<div class="cs-hero-inner">
				<div class="cs-hero-ring" style="border-color:{p.deco}"></div>
				<div class="cs-hero-square" style="border-color:{p.deco}"></div>
			</div>
		</div>
	{/if}

	<!-- ── Metadata strip ── -->
	<div class="cs-strip">
		<div class="container">
			<dl class="strip-grid">
				<div><dt>Role</dt><dd>{p.role}</dd></div>
				<div><dt>Team</dt><dd>{p.team}</dd></div>
				{#if p.tools?.length}
					<div><dt>Tools</dt><dd>{p.tools.join(' · ')}</dd></div>
				{/if}
				<div><dt>Year</dt><dd>{p.year}</dd></div>
			</dl>
		</div>
	</div>

	<!-- ── Case study body ── -->
	<div class="cs-body">
		{#if p.sections?.length}
			{#each p.sections as sec}

				{#if sec.type === 'overview'}
					<div class="container">
						<section class="sec-overview" use:reveal={{ delay: 60 }}>
							<p>{sec.text}</p>
						</section>
					</div>

				{:else if sec.type === 'stats'}
					<section class="sec-stats">
						<div class="container">
							<ul class="stats-row">
								{#each sec.items as item, j}
									<li class="stat" use:reveal={{ delay: j * 100 }}>
										<span class="stat-val">{item.value}</span>
										<span class="stat-lbl">{item.label}</span>
									</li>
								{/each}
							</ul>
						</div>
					</section>

				{:else if sec.type === 'prose'}
					<div class="container">
						<section class="sec-prose" use:reveal={{ delay: 60 }}>
							<h2 class="sec-lbl">{sec.label}</h2>
							<p class="prose-text">{sec.text}</p>
						</section>
					</div>

				{:else if sec.type === 'pullquote'}
					<section class="sec-pullquote" use:reveal>
						<div class="container">
							<blockquote>
								<span class="pq-mark" aria-hidden="true">"</span>
								<p>{sec.text}</p>
							</blockquote>
						</div>
					</section>

				{:else if sec.type === 'process'}
					<div class="container">
						<section class="sec-process" use:reveal={{ delay: 40 }}>
							<h2 class="sec-lbl">{sec.label}</h2>
							<div class="steps">
								{#each sec.steps as step, j}
									<div class="step" use:reveal={{ delay: 80 + j * 80 }}>
										<span class="step-num">{step.num}</span>
										<h3 class="step-title">{step.title}</h3>
										<p class="step-desc">{step.desc}</p>
									</div>
								{/each}
							</div>
						</section>
					</div>

				{:else if sec.type === 'callout'}
					<div class="container">
						<section class="sec-callout" use:reveal={{ delay: 60 }}>
							<h2 class="sec-lbl">{sec.label}</h2>
							<div class="callout-card">
								<p>{sec.text}</p>
							</div>
						</section>
					</div>

				{:else if sec.type === 'image'}
					<div class="container" use:reveal={{ delay: 60 }}>
						<figure class="sec-image" class:full-bleed={sec.fullBleed}>
							<img src={sec.src} alt={sec.alt ?? ''} loading="lazy" />
							{#if sec.caption}
								<figcaption>{sec.caption}</figcaption>
							{/if}
						</figure>
					</div>

				{/if}

			{/each}
		{:else}
			<div class="container">
				<p class="cs-placeholder">Case study content coming soon.</p>
			</div>
		{/if}
	</div>

	<!-- ── Footer nav ── -->
	<div class="cs-footer">
		<a href="/#projects" class="back-link">← Back to work</a>
	</div>

</div>


<style>
	/* ── Layout ── */
	.case-study {
		padding-top: var(--nav-h);
	}

	.container {
		max-width: var(--container);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	/* ── Back link ── */
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
		padding: clamp(20px, 4vw, 40px) var(--gutter);
		transition: color 0.2s;
	}
	.back-link:hover { color: var(--text); }

	/* ── Header ── */
	.cs-header {
		max-width: var(--container);
		margin: 0 auto;
		padding: 40px var(--gutter) 56px;
	}

	.cs-meta-top {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 20px;
	}

	.cs-cat {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.cs-yr {
		font-size: 12px;
		color: var(--muted);
	}

	.cs-title {
		font-family: var(--font-display);
		font-size: clamp(40px, 7vw, 96px);
		font-style: italic;
		font-weight: 900;
		line-height: 0.95;
		letter-spacing: -0.03em;
		margin-bottom: 28px;
	}

	.cs-lead {
		font-size: clamp(16px, 2vw, 20px);
		line-height: 1.6;
		color: var(--muted);
		max-width: 640px;
	}

	/* ── Hero image ── */
	.cs-hero-img {
		width: 100%;
		max-height: clamp(320px, 45vw, 600px);
		overflow: hidden;
	}

	.cs-hero-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		display: block;
	}

	/* ── Hero color block (fallback) ── */
	.cs-hero-block {
		width: 100%;
		height: clamp(280px, 40vw, 520px);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.cs-hero-inner {
		position: relative;
		width: clamp(120px, 18vw, 220px);
		height: clamp(120px, 18vw, 220px);
	}

	.cs-hero-ring {
		position: absolute;
		inset: 0;
		border: 1.5px solid;
		border-radius: 50%;
		opacity: 0.25;
		animation: spin-slow 28s linear infinite;
	}

	.cs-hero-square {
		position: absolute;
		inset: 18%;
		border: 1.5px solid;
		opacity: 0.35;
		border-radius: 2px;
		animation: spin-rev 18s linear infinite;
	}

	/* ── Metadata strip ── */
	.cs-strip {
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		padding: 24px 0;
		background: var(--white);
	}

	.strip-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 32px 56px;
	}

	.strip-grid dt {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		margin-bottom: 4px;
	}

	.strip-grid dd {
		font-size: 15px;
		font-weight: 500;
	}

	/* ── Body ── */
	.cs-body {
		padding-bottom: clamp(80px, 10vw, 140px);
	}

	/* ── Shared section label ── */
	.sec-lbl {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		padding-top: 6px;
		width: 200px;
		flex-shrink: 0;
	}

	/* ── Overview ── */
	.sec-overview {
		padding: clamp(56px, 8vw, 100px) 0 clamp(48px, 6vw, 80px);
		border-bottom: 1px solid var(--border);
	}

	.sec-overview p {
		font-size: clamp(18px, 2.2vw, 22px);
		line-height: 1.72;
		max-width: 820px;
	}

	/* ── Stats ── */
	.sec-stats {
		background: var(--proj-bg);
		padding: clamp(56px, 7vw, 88px) 0;
	}

	.stats-row {
		display: flex;
		list-style: none;
		gap: 0;
	}

	.stat {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 0 clamp(24px, 4vw, 48px);
		border-left: 1px solid rgba(0, 0, 0, 0.14);
	}

	.stat:first-child {
		padding-left: 0;
		border-left: none;
	}

	.stat-val {
		font-family: var(--font-display);
		font-size: clamp(42px, 6.5vw, 80px);
		font-style: italic;
		font-weight: 900;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--proj-accent);
	}

	.stat-lbl {
		font-size: 13px;
		line-height: 1.5;
		color: var(--text);
		max-width: 20ch;
	}

	/* ── Prose ── */
	.sec-prose {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 40px;
		padding: clamp(56px, 7vw, 88px) 0;
		border-bottom: 1px solid var(--border);
	}

	.prose-text {
		font-size: 17px;
		line-height: 1.75;
		max-width: 680px;
	}

	/* ── Pull quote ── */
	.sec-pullquote {
		background: var(--proj-bg);
		padding: clamp(64px, 8vw, 108px) 0;
	}

	.sec-pullquote blockquote {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.pq-mark {
		display: block;
		font-family: var(--font-display);
		font-size: clamp(80px, 14vw, 160px);
		line-height: 0.65;
		color: var(--proj-accent);
		opacity: 0.3;
		margin-bottom: 12px;
	}

	.sec-pullquote p {
		font-family: var(--font-display);
		font-size: clamp(22px, 3vw, 34px);
		font-style: italic;
		font-weight: 700;
		line-height: 1.45;
		color: var(--text);
	}

	/* ── Process ── */
	.sec-process {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 40px;
		padding: clamp(56px, 7vw, 88px) 0;
		border-bottom: 1px solid var(--border);
	}

	.steps {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 44px 52px;
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.step-num {
		font-family: var(--font-display);
		font-size: 12px;
		font-style: italic;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--proj-accent);
		margin-bottom: 2px;
	}

	.step-title {
		font-size: 15px;
		font-weight: 700;
		letter-spacing: 0.01em;
		margin-bottom: 2px;
	}

	.step-desc {
		font-size: 14px;
		line-height: 1.68;
		color: var(--muted);
	}

	/* ── Callout ── */
	.sec-callout {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 40px;
		padding: clamp(56px, 7vw, 88px) 0;
		border-bottom: 1px solid var(--border);
	}

	.callout-card {
		background: var(--proj-bg);
		border-left: 3px solid var(--proj-accent);
		border-radius: 0 4px 4px 0;
		padding: 24px 28px;
	}

	.callout-card p {
		font-size: 16px;
		line-height: 1.75;
	}

	/* ── Image ── */
	.sec-image {
		margin: clamp(48px, 6vw, 80px) 0;
		border-radius: 6px;
		overflow: hidden;
	}

	.sec-image img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 6px;
	}

	.sec-image figcaption {
		margin-top: 12px;
		font-size: 13px;
		color: var(--muted);
		text-align: center;
		font-style: italic;
	}

	/* ── Placeholder ── */
	.cs-placeholder {
		padding: 80px 0;
		text-align: center;
		color: var(--muted);
		font-size: 16px;
		font-style: italic;
	}

	/* ── Footer ── */
	.cs-footer {
		border-top: 1px solid var(--border);
		padding: 8px 0;
	}

	/* ── Keyframes ── */
	@keyframes spin-slow {
		to { transform: rotate(360deg); }
	}
	@keyframes spin-rev {
		to { transform: rotate(-360deg); }
	}

	/* ── Responsive ── */
	@media (max-width: 860px) {
		.sec-prose,
		.sec-process,
		.sec-callout {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.sec-lbl { width: auto; }

		.steps {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}

	@media (max-width: 600px) {
		.stats-row {
			flex-direction: column;
			gap: 28px;
		}

		.stat {
			padding-left: 0;
			border-left: none;
			border-top: 1px solid rgba(0, 0, 0, 0.12);
			padding-top: 28px;
		}

		.stat:first-child {
			border-top: none;
			padding-top: 0;
		}

		.strip-grid { gap: 20px 32px; }
	}
</style>
