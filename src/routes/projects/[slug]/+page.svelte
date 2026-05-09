<script>
	export let data;
	$: p = data.project;
</script>

<svelte:head>
	<title>{p.title} — Ben Green</title>
	<meta name="description" content={p.description} />
</svelte:head>

<div class="case-study">

	<!-- ── Back link ── -->
	<a href="/#projects" class="back-link">← Back to work</a>

	<!-- ── Hero ── -->
	<header class="cs-header">
		<div class="cs-meta-top">
			<span class="cs-cat">{p.category}</span>
			<span class="cs-yr">{p.year}</span>
		</div>
		<h1 class="cs-title">{p.title}</h1>
		<p class="cs-summary-lead">{p.description}</p>
	</header>

	<!-- ── Color hero block ── -->
	<div class="cs-hero-block" style="background:{p.bg}">
		<div class="cs-hero-deco" style="border-color:{p.deco}"></div>
	</div>

	<!-- ── Metadata strip ── -->
	<div class="cs-strip">
		<div class="container">
			<dl class="strip-grid">
				<div>
					<dt>Role</dt>
					<dd>{p.role}</dd>
				</div>
				<div>
					<dt>Team</dt>
					<dd>{p.team}</dd>
				</div>
				{#if p.tools.length}
					<div>
						<dt>Tools</dt>
						<dd>{p.tools.join(' · ')}</dd>
					</div>
				{/if}
				<div>
					<dt>Year</dt>
					<dd>{p.year}</dd>
				</div>
			</dl>
		</div>
	</div>

	<!-- ── Case study body ── -->
	<div class="container cs-body">

		{#if p.summary}
			<section class="cs-section">
				<h2 class="cs-section-label">Overview</h2>
				<p class="cs-prose">{p.summary}</p>
			</section>
		{/if}

		{#if p.challenge}
			<section class="cs-section">
				<h2 class="cs-section-label">Challenge</h2>
				<p class="cs-prose">{p.challenge}</p>
			</section>
		{/if}

		{#if p.approach}
			<section class="cs-section">
				<h2 class="cs-section-label">Approach</h2>
				<p class="cs-prose">{p.approach}</p>
			</section>
		{/if}

		{#if p.outcome}
			<section class="cs-section">
				<h2 class="cs-section-label">Outcome</h2>
				<p class="cs-prose">{p.outcome}</p>
			</section>
		{/if}

		{#if !p.summary && !p.challenge && !p.approach && !p.outcome}
			<div class="cs-placeholder">
				<p>Case study content coming soon.</p>
			</div>
		{/if}

	</div>

	<!-- ── Footer nav ── -->
	<div class="cs-footer">
		<a href="/#projects" class="back-link">← Back to work</a>
	</div>

</div>


<style>
	.case-study {
		padding-top: var(--nav-h);
	}

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

	.cs-summary-lead {
		font-size: clamp(16px, 2vw, 20px);
		line-height: 1.6;
		color: var(--muted);
		max-width: 640px;
	}

	/* ── Hero color block ── */
	.cs-hero-block {
		width: 100%;
		height: clamp(280px, 40vw, 520px);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.cs-hero-deco {
		width: 22%;
		aspect-ratio: 1;
		border: 2px solid currentColor;
		opacity: 0.3;
		border-radius: 2px;
		transform: rotate(12deg);
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
	.container {
		max-width: var(--container);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.cs-body {
		padding-top: clamp(56px, 8vw, 100px);
		padding-bottom: clamp(56px, 8vw, 100px);
	}

	.cs-section {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 40px;
		padding-bottom: 56px;
		margin-bottom: 56px;
		border-bottom: 1px solid var(--border);
	}

	.cs-section:last-child {
		border-bottom: none;
	}

	.cs-section-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		padding-top: 6px;
	}

	.cs-prose {
		font-size: 17px;
		line-height: 1.75;
		max-width: 680px;
	}

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

	/* ── Responsive ── */
	@media (max-width: 700px) {
		.cs-section {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.strip-grid {
			gap: 20px 32px;
		}
	}
</style>
