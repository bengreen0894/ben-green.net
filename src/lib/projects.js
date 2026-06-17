/** @type {import('./types').Project[]} */
export const projects = [
	{
		slug: 'usbank-transfers',
		title: 'U.S. Bank — Transfers Product Merge',
		category: 'Fintech · Web & Mobile',
		year: '2025',
		description:
			'Merged Internal and External Transfers into a single money-movement experience across web and mobile. Staggered rollout reached 100% of digital customers with a +7 point CSAT lift.',
		bg: '#D4D8E0',
		deco: '#2A3244',
		hero: '/images/transfers-merge-hero.png',
		heroFit: 'contain',
		thumb: '/images/transfers-merge-thumb.jpg',
		comingSoon: false,
		role: 'Senior Experience Designer',
		team: 'U.S. Bank Digital',
		tools: ['Figma', 'FigJam'],
		sections: [
			{
				type: 'overview',
				text: "After leading U.S. Bank's first in-house External Transfers product in 2021, the next chapter was clear: customers shouldn't have to pick a different product depending on which accounts they wanted to move money between. The Transfers Product Merge was a multi-year initiative — pushed from the design side starting in 2021, picked up by the business in 2023 — to unify Internal and External Transfers into a single experience across web and mobile. I led design end-to-end from initial pitch through the staggered rollout that wrapped in early 2026."
			},
			{
				type: 'stats',
				items: [
					{ value: '88% → 95%', label: 'CSAT lift after the merged experience reached 100% of customers' },
					{ value: '13 million / month', label: 'transfers processed through the unified experience' }
				]
			},
			{
				type: 'prose',
				label: 'Challenge',
				text: "Internal and External Transfers lived as completely separate products, owned by separate organizations, with separate IAs, separate components, and separate engineering pipelines — even though from the customer's perspective both were just 'move money between my accounts.' Users had to know which product to enter based on whether the destination was a U.S. Bank account or not. In moderated usability testing, 88% of participants said they'd prefer a single merged experience over the two siloed products. The challenge was as political as it was technical: aligning two organizations around a single front-end while preserving the backend systems of record each side depended on. I started pressing on product portfolio leads in 2021 right after the External Transfers launch; by 2023, alignment finally landed and the merge was funded."
			},
			{
				type: 'image',
				src: '/images/transfers-merge-desktop.png',
				alt: 'Desktop happy-path flow for the merged Transfers product',
				caption: 'Full happy-path flow on desktop — source, destination, amount, review, OTP, confirmation'
			},
			{
				type: 'prose',
				label: 'Approach',
				text: "We unified the entry point so customers landed in one Transfers experience and the right backend was invoked automatically based on the account combination they chose. I reimagined the local navigation to handle Transfer Activity, History, and Linked Accounts as first-class concerns of the merged product, not bolted-on satellites. The trickiest design work was smoothing the seams between several different APIs and systems of record — making sure the experience felt continuous when the underlying plumbing was anything but. I ran three rounds of moderated usability testing (one on mobile, two on desktop) to validate the new flows. In parallel, I consolidated a large atomic component library in Figma — branched from the U.S. Bank Org design system — that became the single source of truth for the merged product across both platforms."
			},
			{
				type: 'image',
				src: '/images/transfers-merge-mobile.png',
				alt: 'Mobile flow for the merged Transfers product',
				caption: 'The same flow translated to mobile — chooser, amount, review, OTP, confirmation'
			},
			{
				type: 'prose',
				label: 'Outcome',
				text: "Staggered rollout began in September 2025. As of February 2026, 100% of U.S. Bank digital customers are on the merged Transfers experience. CSAT for the unified product jumped from 88% to 95% — a 7-point lift over the pre-merge baseline, and validation of the 2021 user-testing signal that customers wanted this from the start."
			}
		]
	},
	{
		slug: 'mulligan-labs',
		title: 'Mulligan Labs',
		category: 'Independent Project · Web App',
		year: '2024',
		description:
			'Designed and co-built a real-time multiplayer Commander (EDH) deck testing platform integrating with Scryfall, Archidekt, and MTGGoldfish.',
		bg: '#D0CCE8',
		deco: '#2B1F5C',
		hero: '/images/ml-landing.jpeg',
		thumb: '/images/ml-thumb.jpg',
		heroEmbed: 'https://mulligan-labs.com/',
		siteUrl: 'https://mulligan-labs.com/',
		comingSoon: false,
		role: 'Designer & Co-founder',
		team: '707 Labs',
		tools: ['Figma', 'FigJam'],
		sections: [
			{
				type: 'overview',
				text: "Mulligan Labs is an independent project built under my LLC, 707 Labs. It lets Magic: The Gathering players test and play their Commander (EDH) decks online in real-time multiplayer — with seamless deck imports from Archidekt and MTGGoldfish and live card data from Scryfall. This project gave me hands-on experience with the full product lifecycle outside of a corporate environment."
			},
			{
				type: 'stats',
				items: [
					{ value: '4P', label: 'real-time multiplayer — up to 4 players' },
					{ value: '3', label: 'deck import integrations' },
					{ value: '2024', label: 'launched under 707 Labs' }
				]
			},
			{
				type: 'image',
				src: '/images/ml-lobby.jpeg',
				alt: 'Mulligan Labs game lobby — room settings and deck selection',
				caption: 'Game lobby: room settings, player slots, and deck import — all before the first card is drawn'
			},
			{
				type: 'prose',
				label: 'Challenge',
				text: "Commander players have no great way to test decks against real opponents without physically meeting up or using clunky workarounds. Existing digital tools are either solitaire-only, paywalled, or lack real deck import options. The goal was a frictionless, free-to-use multiplayer table where any player could import and playtest a Commander deck in minutes."
			},
			{
				type: 'prose',
				label: 'My Role',
				text: 'I led all design and contributed to frontend development. From defining the product concept and information architecture through visual design to working in code alongside my co-founder — this project sharpened both my product thinking and my ability to collaborate directly in the codebase.'
			}
		]
	},
	{
		slug: 'usbank-ach-payments',
		title: 'U.S. Bank — ACH Payments',
		category: 'Fintech · Web & Mobile',
		year: '2022',
		description:
			'Designed the small business ACH payments flow for web and mobile, streamlining how business owners pay vendors, contractors, and employees.',
		bg: '#C8DDE0',
		deco: '#1A3840',
		hero: '/images/ach-hero.png',
		thumb: '/images/ach-thumb.jpg',
		comingSoon: false,
		role: 'Senior Experience Designer',
		team: 'U.S. Bank Digital',
		tools: ['Figma', 'FigJam', 'UserZoom'],
		sections: [
			{
				type: 'overview',
				text: "Small business customers needed a reliable, in-house way to pay vendors, contractors, and employees via ACH — a secure, high-limit payment method without the friction of paper checks or the dollar-amount limitations of Zelle. I led the design from initial product brief through two major releases, building out the end-to-end payment flow for both web and mobile in React."
			},
			{
				type: 'stats',
				items: [
					{ value: 'Apr 2022', label: 'initial release shipped' },
					{ value: 'n=5', label: 'small business owners in moderated usability study' },
					{ value: '2', label: 'major releases designed end-to-end' }
				]
			},
			{
				type: 'prose',
				label: 'Challenge',
				text: "ACH payments live in a crowded space — customers already have Zelle, Venmo, checks, and wire transfers available. The brief was to make a platform that was reliable, clear, and flexible enough for real business needs. Before design kicked off, a key question had to be answered: why would a small business owner choose ACH over Zelle? The answer was higher transfer limits, tighter fraud controls via FTE enrollment, and flexibility for payees who don't share a bank account."
			},
			{
				type: 'image',
				src: '/images/ach-slide3.png',
				alt: 'Why ACH? — comparison with Zelle and bills pay',
				caption: 'Positioning ACH for small business: higher limits, tighter fraud controls, no shared-bank requirement'
			},
			{
				type: 'process',
				label: 'Approach',
				steps: [
					{
						num: '01',
						title: 'Product Scoping',
						desc: 'Collaborated with the PM and business SMEs to define ACH use cases and what "reliable, clear, flexible" meant in practice for small business owners paying contractors and employees.'
					},
					{
						num: '02',
						title: 'User Flows',
						desc: "Mapped the happy path from the landing page through recipient setup, payment details, and confirmation — then refined for edge cases around duplicate recipients, multi-pay, and recurring schedules."
					},
					{
						num: '03',
						title: 'Research & Testing',
						desc: 'Ran a remote moderated usability study (n=5 small business owners) via Webex with a high-fidelity InVision prototype. Participants were given real-world payment tasks and follow-up questions.'
					},
					{
						num: '04',
						title: 'Iteration',
						desc: 'Study results surfaced demand for multi-pay (batch up to 5 recipients) and recurring payments — both were incorporated into the roadmap and shipped in the second major release.'
					}
				]
			},
			{
				type: 'image',
				src: '/images/ach-slide5.png',
				alt: 'Research and user testing — recipient management screen',
				caption: 'Remote moderated usability study with 5 small business owners using an InVision prototype'
			},
			{
				type: 'callout',
				label: 'Test Results',
				text: "Users found the flow easy and intuitive — navigation from the 'External Transfers, Wires & ACH' landing page worked well, and repeat setups were faster. The main friction was setting up payments one at a time; small business owners wanted batch efficiency. The $1 processing fee was flagged as a deterrent, and the product team committed to working with the business line to reduce or remove it."
			},
			{
				type: 'image',
				src: '/images/ach-slide8.png',
				alt: 'Test results — what worked and what needed improvement',
				caption: 'Study findings: strong navigation and repeat-setup performance, friction around single-payment limitation'
			},
			{
				type: 'image',
				src: '/images/ach-slide9.png',
				alt: 'Responding to results — multi-pay concept UI',
				caption: 'Multi-pay (batch up to 5 recipients) designed and prioritized for release 2 based on study feedback'
			},
			{
				type: 'prose',
				label: 'Outcome',
				text: "The first release shipped in April 2022. Based on research findings, multi-pay (up to 5 recipients per transaction) and recurring payment scheduling were prioritized and shipped in the next release. I handed off to a junior designer after release 2 while continuing to advise on patterns and design system alignment across the Money Movement org."
			}
		]
	},
	{
		slug: 'usbank-external-transfers',
		title: 'U.S. Bank — External Transfers',
		category: 'Fintech · Web & Mobile',
		year: '2021',
		description:
			'End-to-end redesign of the external transfers experience for web and mobile — replacing a legacy vendor product with an in-house solution serving millions of customers.',
		bg: '#CAD5EA',
		deco: '#1B3A5C',
		hero: '/images/et-hero.jpg',
		thumb: '/images/et-thumb.jpg',
		comingSoon: false,
		role: 'Senior Experience Designer',
		team: 'U.S. Bank Digital',
		tools: ['Figma', 'FigJam', 'UserZoom'],
		sections: [
			{
				type: 'overview',
				text: "U.S. Bank's only external transfer product was a legacy Fiserv vendor tool — desktop-only, visually outdated, and scheduled to be sunset. With transferring funds being the #2 task for digital customers right after checking balances, the urgency for a polished in-house replacement was clear. I led end-to-end design of the new external transfers experience across responsive web and native-feel mobile, from initial user flows through the November 2021 launch."
			},
			{
				type: 'stats',
				items: [
					{ value: '#2', label: 'most-used task for U.S. Bank digital customers' },
					{ value: '2', label: 'platforms — responsive web & adaptive mobile' },
					{ value: '+85%', label: 'DIY transfer completion rates post-launch' }
				]
			},
			{
				type: 'prose',
				label: 'Challenge',
				text: "The Fiserv partnership was planned to sunset, leaving no external transfer capability for millions of customers. The legacy tool was desktop-only and full of friction. The brief called for a seamless experience to quickly move funds between U.S. Bank and outside financial institutions — with a strategic push from design leadership to merge the product with Internal Transfers for a one-stop money-movement hub. I was design lead alongside one junior designer, with content strategy shared across team resources."
			},
			{
				type: 'pullquote',
				text: 'Just after viewing balances, transferring funds is the 2nd most common task for our digital customers.'
			},
			{
				type: 'image',
				src: '/images/et-concepts.png',
				alt: 'Two concept directions for the External Transfers flow',
				caption: 'Concept A vs. Concept B — tested before committing to a direction'
			},
			{
				type: 'process',
				label: 'Approach',
				steps: [
					{
						num: '01',
						title: 'Requirements & Flows',
						desc: 'Worked with product and business lines to define the core requirement set, then created low-fidelity user flows and two distinct concept directions around different interaction patterns.'
					},
					{
						num: '02',
						title: 'Concept Testing',
						desc: 'Ran moderated usability sessions to evaluate both concepts before committing. Navigation and internal vs. external account differentiation surfaced as the biggest friction points.'
					},
					{
						num: '03',
						title: 'Iteration & Design System',
						desc: "Designed a landing page to solve the mobile navigation problem, improved the review screen, and contributed new 'radio row with icon' components back to the design system — fully adopted by 2023."
					},
					{
						num: '04',
						title: 'Cross-team Alignment',
						desc: "Facilitated recurring 'Money-Movement Alignment' syncs across product teams to share patterns — resulting in reused components across account selection, dollar inputs, and review screens."
					}
				]
			},
			{
				type: 'image',
				src: '/images/et-landing.png',
				alt: 'External Transfers landing page — mobile and desktop',
				caption: 'The landing page solution — organizing money movement around customer mental models'
			},
			{
				type: 'callout',
				label: 'Key Insight',
				text: "Navigation was the top pain point — users on mobile had to scan an overwhelming native sheet menu to find external transfers. The solution was a purpose-built landing page that organized the entire money movement portfolio around customer mental models, not internal product siloes. It was approved in design review and shipped as part of the MVP."
			},
			{
				type: 'image',
				src: '/images/et-design-system.png',
				alt: 'Design system contribution — radio row with icon component',
				caption: 'The "radio row with icon" component contributed to the design system, fully adopted org-wide by 2023'
			},
			{
				type: 'prose',
				label: 'Outcome',
				text: "The new external transfers product shipped in November 2021. Post-launch metrics showed a +5% lift in CSAT scores, approximately 20,000 new customer engagements, and an +85% improvement in DIY transfer completion rates. The radio-button-with-icon design system contribution became a fully adopted component across the Money Movement org by 2023."
			}
		]
	}
];
