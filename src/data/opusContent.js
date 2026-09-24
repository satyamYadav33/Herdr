export const OPUS_CONTENT = {
  releaseDate: "September 22, 2026",
  title: "Introducing Claude Opus 5.5",
  modelId: "claude-opus-5-5",
  summary: "We’re introducing Claude Opus 5.5, the first model in our new Claude 5.5 family. It performs at the level of Claude Fable 5.1 on most work and costs 40% less to run than Opus 5.",
  
  meta: {
    contextWindow: "1,000,000 tokens",
    maxOutputTokens: "128,000 tokens",
    defaultEffort: "medium",
    speedImprovement: ">30% faster output generation",
    costReduction: "40% lower cost on typical workloads",
    fastModeSpeed: "Up to 2.5x speed"
  },

  pricing: {
    opus55: {
      input: 4.00,
      output: 20.00,
      cacheRead: 0.20,
      cacheWrite: 5.00,
      fastInput: 8.00,
      fastOutput: 40.00
    },
    opus50: {
      input: 5.00,
      output: 25.00,
      cacheRead: 0.50,
      cacheWrite: 6.25,
      fastInput: null,
      fastOutput: null
    }
  },

  benchmarks: [
    {
      category: "Agentic coding",
      benchmark: "Terminal-Bench 4.0¹",
      opus55: "66.4%",
      fable51: "55.8%",
      opus5: "52.3%",
      gpt6Astra: "57.9%",
      gpt56Sol: "37.3%",
      winner: "opus55",
      note: "Standard error ±2.6 pts for Opus 5.5. Tested at xhigh effort."
    },
    {
      category: "Agentic coding",
      benchmark: "FrontierCode v1.1 (Main)",
      opus55: "54.4%",
      fable51: "50.3%",
      opus5: "48.0%",
      gpt6Astra: "53.3%",
      gpt56Sol: "47.5%",
      winner: "opus55",
      note: "Evaluates whether an agent's code changes would be merged in production."
    },
    {
      category: "Agentic coding",
      benchmark: "CursorBench 4.0",
      opus55: "57.8%",
      fable51: "51.8%",
      opus5: "46.6%",
      gpt6Astra: "—",
      gpt56Sol: "41.7%",
      winner: "opus55",
      note: "Ambiguous, multi-file tasks taken from real Cursor developer sessions."
    },
    {
      category: "Knowledge work",
      benchmark: "GDPval-AA v2.1",
      opus55: "1846 Elo",
      fable51: "1735",
      opus5: "1708",
      gpt6Astra: "1542",
      gpt56Sol: "1588",
      winner: "opus55",
      note: "Evaluates agents on real-world professional work across 44 occupations."
    },
    {
      category: "Business workflows",
      benchmark: "AutomationBench²",
      opus55: "40.0%",
      fable51: "31.4%",
      opus5: "26.9%",
      gpt6Astra: "41.4%",
      gpt56Sol: "28.8%",
      winner: "gpt6Astra",
      note: "Built by Zapier; run without fallback models (safeguard interventions counted as failures)."
    },
    {
      category: "Multidisciplinary reasoning",
      benchmark: "Humanity's Last Exam",
      opus55: "67.7%",
      fable51: "65.6%",
      opus5: "63.6%",
      gpt6Astra: "57.2%",
      gpt56Sol: "—",
      winner: "opus55",
      qualifier: "with tools",
      note: "High-complexity expert reasoning spanning advanced academic disciplines."
    },
    {
      category: "Agentic scientific research",
      benchmark: "Terminal-Bench-Science 0.1³",
      opus55: "58.7%",
      fable51: "52.6%",
      opus5: "29.0%",
      gpt6Astra: "64.6%",
      gpt56Sol: "22.4%",
      winner: "gpt6Astra",
      note: "Standard error ±3.5–5 pts per model. Production safeguards enabled."
    },
    {
      category: "Computer use",
      benchmark: "OSWorld 2.0",
      opus55: "81.8%",
      fable51: "80.7%",
      opus5: "74.0%",
      gpt6Astra: "—",
      gpt56Sol: "—",
      winner: "opus55",
      qualifier: "partial",
      note: "Autonomous desktop GUI navigation and multi-application task completion."
    },
    {
      category: "Visual chart recognition",
      benchmark: "Chartography",
      opus55: "89.0%",
      fable51: "88.4%",
      opus5: "83.4%",
      gpt6Astra: "—",
      gpt56Sol: "—",
      winner: "opus55",
      qualifier: "with tools",
      note: "Complex multimodal chart extraction, analysis, and mathematical deduction."
    }
  ],

  chartData: {
    terminalBench: {
      title: "Terminal-Bench 4.0: Accuracy vs Cost",
      description: "Terminal-Bench 4.0 measures how well a model can complete complex, multi-step professional tasks within a command line interface. Opus 5.5 at default effort beats Opus 5 at max effort for about a fifth of the cost, and matches GPT-6 Astra at about 40% of the cost.",
      yAxisLabel: "Score (%)",
      xAxisLabel: "Cost per attempt (USD, log scale)",
      models: [
        { name: "Opus 5.5", color: "#D97757", points: [{ effort: "low", cost: 2.1, score: 54.2 }, { effort: "med", cost: 3.8, score: 62.1 }, { effort: "high", cost: 6.9, score: 65.0 }, { effort: "xhigh", cost: 11.2, score: 66.4 }] },
        { name: "Fable 5.1", color: "#7B61FF", points: [{ effort: "low", cost: 4.5, score: 48.0 }, { effort: "med", cost: 8.2, score: 52.4 }, { effort: "high", cost: 15.6, score: 55.8 }] },
        { name: "Opus 5", color: "#9E9A90", points: [{ effort: "low", cost: 3.5, score: 42.1 }, { effort: "med", cost: 7.2, score: 47.3 }, { effort: "high", cost: 14.8, score: 51.2 }, { effort: "max", cost: 22.0, score: 52.3 }] },
        { name: "GPT-6 Astra", color: "#10A37F", points: [{ effort: "med", cost: 12.0, score: 53.0 }, { effort: "high", cost: 24.5, score: 57.9 }] },
        { name: "GPT-5.6 Sol", color: "#4A90E2", points: [{ effort: "med", cost: 6.0, score: 32.5 }, { effort: "high", cost: 13.0, score: 37.3 }] }
      ]
    },
    frontierCode: {
      title: "FrontierCode v1.1: Accuracy vs Cost",
      description: "FrontierCode measures whether an agent's code changes would be merged. At default effort (medium), Opus 5.5 scores 54.6%, higher than all other models, beating GPT-6 Astra's top score (53.3%) for about a fifth of the cost per task.",
      yAxisLabel: "Score (%)",
      xAxisLabel: "Cost per task (USD, log scale)",
      models: [
        { name: "Opus 5.5", color: "#D97757", points: [{ effort: "low", cost: 0.6, score: 47.8 }, { effort: "med", cost: 1.1, score: 54.6 }, { effort: "high", cost: 2.4, score: 54.4 }] },
        { name: "Fable 5.1", color: "#7B61FF", points: [{ effort: "med", cost: 2.8, score: 49.0 }, { effort: "high", cost: 5.2, score: 50.3 }] },
        { name: "Opus 5", color: "#9E9A90", points: [{ effort: "med", cost: 2.2, score: 44.5 }, { effort: "high", cost: 5.5, score: 48.0 }] },
        { name: "GPT-6 Astra", color: "#10A37F", points: [{ effort: "high", cost: 5.8, score: 53.3 }] },
        { name: "GPT-5.6 Sol", color: "#4A90E2", points: [{ effort: "high", cost: 3.2, score: 47.5 }] }
      ]
    },
    cursorBench: {
      title: "CursorBench 4.0: Accuracy vs Cost",
      description: "CursorBench evaluates coding agents on ambiguous, multi-file tasks taken from real Cursor sessions. At default effort (medium), Opus 5.5 scores 52.5%, compared to 51.8% for Fable 5.1 (max) and 46.6% for Opus 5 (max). It beats GPT-5.6 Sol's top score (41.7%) by 11 points for about a third of the cost per task.",
      yAxisLabel: "Score (%)",
      xAxisLabel: "Cost per task (USD, log scale)",
      models: [
        { name: "Opus 5.5", color: "#D97757", points: [{ effort: "low", cost: 1.2, score: 46.1 }, { effort: "med", cost: 2.4, score: 52.5 }, { effort: "high", cost: 5.1, score: 57.8 }] },
        { name: "Fable 5.1", color: "#7B61FF", points: [{ effort: "med", cost: 4.8, score: 48.2 }, { effort: "max", cost: 11.0, score: 51.8 }] },
        { name: "Opus 5", color: "#9E9A90", points: [{ effort: "med", cost: 3.9, score: 41.5 }, { effort: "max", cost: 9.8, score: 46.6 }] },
        { name: "GPT-5.6 Sol", color: "#4A90E2", points: [{ effort: "high", cost: 7.5, score: 41.7 }] }
      ]
    },
    gdpVal: {
      title: "GDPval-AA v2.1: Elo vs Cost",
      description: "Artificial Analysis's GDPval-AA v2.1 evaluates agents on real-world professional work across 44 occupations. At max effort, Opus 5.5 scores 1846 Elo, where Fable 5.1 scores 1735 and Opus 5 scores 1708. At default effort (medium), Opus 5.5 beats GPT-6 Astra at max effort for about a fifth of the cost per task.",
      yAxisLabel: "Elo Rating",
      xAxisLabel: "Estimated cost per task (USD, log scale)",
      models: [
        { name: "Opus 5.5", color: "#D97757", points: [{ effort: "low", cost: 0.35, score: 1720 }, { effort: "med", cost: 0.85, score: 1795 }, { effort: "high", cost: 1.9, score: 1832 }, { effort: "max", cost: 3.8, score: 1846 }] },
        { name: "Fable 5.1", color: "#7B61FF", points: [{ effort: "med", cost: 1.8, score: 1680 }, { effort: "high", cost: 4.2, score: 1735 }] },
        { name: "Opus 5", color: "#9E9A90", points: [{ effort: "med", cost: 1.5, score: 1640 }, { effort: "high", cost: 3.6, score: 1708 }] },
        { name: "GPT-6 Astra", color: "#10A37F", points: [{ effort: "med", cost: 2.1, score: 1480 }, { effort: "max", cost: 5.5, score: 1542 }] },
        { name: "GPT-5.6 Sol", color: "#4A90E2", points: [{ effort: "high", cost: 2.8, score: 1588 }] }
      ]
    },
    automationBench: {
      title: "AutomationBench: Accuracy vs Cost",
      description: "AutomationBench, built by Zapier, tests whether an agent can carry out real business workflows across many connected apps. Opus 5.5 outscores Opus 5 and GPT-5.6 Sol at every effort level.",
      yAxisLabel: "Pass rate (%)",
      xAxisLabel: "Cost per task (USD, log scale)",
      models: [
        { name: "Opus 5.5", color: "#D97757", points: [{ effort: "low", cost: 0.45, score: 32.0 }, { effort: "med", cost: 0.95, score: 37.5 }, { effort: "high", cost: 1.85, score: 40.0 }] },
        { name: "GPT-6 Astra", color: "#10A37F", points: [{ effort: "med", cost: 1.2, score: 38.2 }, { effort: "high", cost: 2.5, score: 41.4 }] },
        { name: "Fable 5.1", color: "#7B61FF", points: [{ effort: "high", cost: 2.2, score: 31.4 }] },
        { name: "GPT-5.6 Sol", color: "#4A90E2", points: [{ effort: "high", cost: 1.6, score: 28.8 }] },
        { name: "Opus 5", color: "#9E9A90", points: [{ effort: "high", cost: 1.9, score: 26.9 }] }
      ]
    },
    wandr: {
      title: "WANDR: Accuracy vs Cost",
      description: "Perplexity's WANDR benchmark measures agents on large data collection tasks. Opus 5.5 outperforms Fable 5.1 and Opus 5 at a lower cost per task.",
      yAxisLabel: "Score (%)",
      xAxisLabel: "Cost per attempt (USD, log scale)",
      models: [
        { name: "Opus 5.5", color: "#D97757", points: [{ effort: "low", cost: 2.4, score: 55.0 }, { effort: "med", cost: 5.2, score: 64.8 }, { effort: "high", cost: 11.5, score: 71.2 }] },
        { name: "Fable 5.1", color: "#7B61FF", points: [{ effort: "med", cost: 8.5, score: 58.2 }, { effort: "high", cost: 18.0, score: 66.0 }] },
        { name: "Opus 5", color: "#9E9A90", points: [{ effort: "med", cost: 7.8, score: 51.5 }, { effort: "high", cost: 16.5, score: 60.1 }] }
      ]
    }
  },

  communicationDiffs: [
    {
      id: "bug-explanation",
      title: "Explaining a bug",
      prompt: "Please explain the issue to me.",
      context: "Investigating why monthly account billing dropped unexpectedly on account 'acme'.",
      opus5: {
        title: "Claude Opus 5",
        text: `What I found\n\nThe extra drop isn’t the free tier — it’s a regression in 0552feb (“extract billing period boundaries into periods.py”, labelled “No behaviour change”).\n\nThe bug\n\naggregate.monthly_usage used to do a half-open interval:\nstart, end = month_start(year, month), next_month_start(year, month)\nif start <= e.ts < end:\n\nIt now does:\nif period.contains(e.ts)\n\nand in periods.py :\n@property\ndef last_day(self) -> datetime:\n    return next_month_start(...) - timedelta(days=1) # 2026-08-31 00:00:00 UTC\n\ndef contains(self, ts):\n    return self.first_day <= ts <= self.last_day\n\nlast_day is a datetime at midnight, not a whole day. Subtracting one day from Sep 1 00:00 gives Aug 31 00:00 , and the comparison is inclusive, so the period effectively ends at the first instant of the 31st. Every event timestamped after midnight on the last day of the month is silently dropped — roughly one day of usage per account, per month.\n\nThe new test_periods.py doesn’t catch it because it only checks last_day.date() (which is correctly 2026-08-31 ) and tests contains at Aug 1 00:00, Aug 15 12:00, Jul 31 23:59 and Sep 1 00:00 — it never probes anywhere inside the 31st.`,
        stats: { tokens: 342, clarity: "Dense, rambles before bottom-line dollar impact", directness: "Low" }
      },
      opus55: {
        title: "Claude Opus 5.5",
        text: `The extra drop is a bug in the billing refactor\n\nThe free-tier change accounts for only $1.50 of acme’s August drop. The other $9.92 comes from a bug in commit 0552feb . That commit was labelled “No behaviour change,” but it stops counting usage from the last day of the month.\n\nWhat changed\n\nBefore the merge, aggregate.py used a half-open interval:\nstart <= e.ts < next_month_start(year, month) # [Aug 1 00:00, Sep 1 00:00)\n\nThe refactor moved this into Period.contains and made the interval closed on the wrong boundary:\nlast_day = next_month_start(...) - timedelta(days=1) # = 2026-08-31T00:00:00Z\nreturn self.first_day <= ts <= self.last_day\n\nlast_day is a timestamp at midnight, not a whole day. So every event after 2026-08-31T00:00:00Z is excluded. The September period starts Sep 1, so it doesn’t pick these events up either. The usage isn’t moved to another month; it’s never billed at all.`,
        stats: { tokens: 218, clarity: "Leads with the immediate financial bottom-line ($1.50 vs $9.92)", directness: "High" }
      }
    },
    {
      id: "thread-summary",
      title: "Summarizing a thread",
      prompt: "Summarize this Slack thread for my manager in three bullet points:\n[09:41] Dana Osei: I’ll tell them. I’ll also confirm nobody else reads the Friday file.\n[09:43] Marcus Webb: I can move the schedule, it’s a one-line cron change. But not until Dana confirms.\n[10:02] Dana Osei: Finance says the Friday file is only used Monday. Sunday night is fine.",
      context: "Distilling operational downtime and schedule mitigation for engineering leadership.",
      opus5: {
        title: "Claude Opus 5",
        text: `Friday orders export — #data-platform, Tuesday\n\nProblem: The Friday orders export timed out again (second failure this month) after running 2h on the warehouse query; order volume is up ~40% since the summer sale. Finance was left without weekend numbers for their Monday 9am review, and both failures only surfaced on Monday.\n\nFixed same day: The Saturday ops dashboard tile was repointed to read the live table instead of the export (Sam), finance confirmed the Friday file is only used on Mondays (Dana), a failure alert now pages the on-call channel (Priya), and the export moves to Sunday 10pm from next week with the Friday run dropped (Marcus). A one-off ~$300 warehouse upgrade covers this Friday as a stopgap.\n\nStill in progress: Ji-woo owns rewriting the query to run incrementally (re-scanning the last 3 days to catch late-arriving orders), expected to cut runtime from hours to minutes — design doc Thursday, roughly two weeks including testing. The schedule change buys time in the meantime.`,
        stats: { tokens: 285, clarity: "Convoluted list with parentheticals", directness: "Medium" }
      },
      opus55: {
        title: "Claude Opus 5.5",
        text: `• Problem: The Friday orders export has failed twice this month. The warehouse query times out after 2 hours because order volume is up ~40% since the summer sale. As a result, Finance was missing weekend numbers for their Monday 9am review.\n\n• Immediate fixes: The export will move to Sunday 10pm starting next week, and the Friday run will be dropped (Marcus). Finance has confirmed this works for them (Dana). The ops dashboard tile that depended on the Friday file now reads from the live table (Sam, done). A failure alert now pages the on-call channel (Priya, done and tested). For this Friday only, Marcus will increase the warehouse slot as a ~$300 one-off stopgap, which Dana approved.\n\n• Longer-term fix: Ji-woo will rewrite the query to process only new orders, re-scanning the last 3 days to catch late arrivals. This should cut runtime from hours to minutes. The work will take ~2 weeks including testing, with a design doc due for review by Thursday.`,
        stats: { tokens: 194, clarity: "Clean bullet structure strictly respecting user formatting instruction", directness: "High" }
      }
    },
    {
      id: "design-change",
      title: "Explaining a design change",
      prompt: "Write Python that reads a chess position (FEN) and lists which pieces are under attack. Use TensorFlow for speed. Here's my design: build an 8x8 tensor board, generate an attack map for each piece type from its movement pattern, and flag opposing pieces on attacked squares. Change anything you think is wrong, and in your final summary explain each change you made and why.",
      context: "Mathematical vectorization vs architectural clarity in algorithmic code.",
      opus5: {
        title: "Claude Opus 5",
        text: `tf.math.cumsum replaces the bit scan. The geometry is unrolled into ray_targets[square, direction, step] — an ordered walk outwards. An exclusive cumsum over the step axis counts blockers strictly before each step, so the first blocker on a ray is the single step that is blocking with nothing blocking before it. This is the vectorized form of the bit scan a bitboard engine uses. I did look at bitwise_ops for true 64-bit bitboards — population_count exists, but hyperbola-quintessence needs a byte-reverse primitive TF doesn't expose, so it would have fallen back to per-direction loops anyway.`,
        stats: { tokens: 156, clarity: "Theoretical digression about bitboards and hyperbola-quintessence", directness: "Low" }
      },
      opus55: {
        title: "Claude Opus 5.5",
        text: `Blocked lines (bishops, rooks, queens). A fixed mask can't say “stop at the first piece in the way.” I added a second stack of masks marking the squares strictly between every two squares on the same line. One matrix multiply with the board's occupancy counts the blockers on every line at once, and an attack survives only if that count is zero. Knights and single steps have nothing between them, so one rule covers every piece.`,
        stats: { tokens: 92, clarity: "Crisp, intuitive mechanical explanation with no unnecessary jargon", directness: "Very High" }
      }
    }
  ],

  testimonials: [
    {
      company: "GitHub",
      author: "Mario Rodriguez",
      role: "Chief Product Officer",
      quote: "Developers want agents that can take on real software work and finish it. In our testing across GitHub Copilot CLI and VS Code, Claude Opus 5.5 used among the fewest tokens and steps we measured. In VS Code, it solved more terminal tasks than Opus 5 in less than half the steps. More than making individual tasks more efficient, it’s making developers’ bigger projects more achievable.",
      tag: "Agentic Coding"
    },
    {
      company: "Clio",
      author: "Sean Heintz",
      role: "Staff Software Developer",
      quote: "I handed Claude Opus 5.5 a large engineering task across six of our repositories and let it run overnight, unattended. It stayed on task for over 18 hours defining how our services talk to each other and working out how each one should apply that. Compared with Opus 5, it hit milestones faster and required minimal reworking. Its code comments were short and useful instead of long and prose-heavy. I’m struggling to find anything negative to say.",
      tag: "Autonomous Migration"
    },
    {
      company: "Lovable",
      author: "Fabian Hedin",
      role: "CTO and Co-founder",
      quote: "For Lovable builders, Opus 5.5 means faster builds with the same quality, whether you’re starting from scratch or working on a live app. It gathers context once, makes fewer and more complete edits, and doesn’t get stuck retrying, finishing in a third to half fewer steps and using significantly fewer tokens along the way.",
      tag: "Full-Stack Dev"
    },
    {
      company: "Stripe",
      author: "Cristian Rivera",
      role: "Staff Software Engineer",
      quote: "I run long Claude Code sessions every day. On a multi-day rebase of 40 stacked pull requests, one Claude Opus 5.5 session directed a dozen more sessions and laid out every conflict plainly. On the calls that it held, it framed them clearly that after hours away I could answer in minutes. All 40 passed CI the next afternoon. It’s a substantial upgrade over Opus 5.",
      tag: "Code Review & Git"
    },
    {
      company: "Quantium",
      author: "Harley Barnes",
      role: "Executive Manager, AI Technology",
      quote: "We tested Claude Opus 5.5 across Chat, Cowork, and Claude Code, the full range of how our teams work. A complex coding task that previously took 38 prompts over four days came in at 11 prompts over three hours, with more production-ready outputs and less rework. For our teams solving complex problems at pace, that means less time iterating and more time interrogating.",
      tag: "Enterprise Speedup"
    },
    {
      company: "Optiver",
      author: "Noyan Tokgozoglu",
      role: "Global Head of AI Engineering",
      quote: "We test models on real engineering and trading-desk work. On our agentic coding tasks, Claude Opus 5.5 matched Opus 5’s quality in about half the turns, time and output tokens, cutting the cost of that workload by 40 to 50%. It posted the highest score we’ve recorded on one desk’s trading-support suite, passing tasks earlier Claude models had failed.",
      tag: "Quantitative Finance"
    },
    {
      company: "Walleye Capital",
      author: "Frank Corrao",
      role: "Head of Central Equity Quant Research Engineering",
      quote: "In quant research, one wrong assumption can undermine a result. At its lowest effort setting, Claude Opus 5.5 largely solved our evaluation task. At higher settings, it went even further: it detected that the minute indexing in our own instructions was off by one and corrected for it, noting that this would cost it points with the grader. It was right, and no model we’ve tested had caught and acted on that before.",
      tag: "Quant Research"
    },
    {
      company: "Deloitte Consulting LLP",
      author: "Carl Bennett",
      role: "CIO",
      quote: "Even at its lowest effort setting, Claude Opus 5.5 caught 72% of known bugs in our code reviews to Opus 5’s 56% at high effort, with fewer false alarms and a fraction of the output. On US consulting analysis, low thinking effort matched its higher thinking settings on half the output and passed our quality checks.",
      tag: "Code Audit & Consulting"
    },
    {
      company: "Ramp",
      author: "John Ruelas",
      role: "Staff Software Engineer",
      quote: "Verbose, hard-to-follow output has been my biggest frustration with frontier models, and Claude Opus 5.5 fixes it. It writes like a good colleague, and follows our writing rules. A design spec came out usable with very minimal edits, and when it rewrote one of our prompts I preferred its version to my own.",
      tag: "Product Engineering"
    },
    {
      company: "Box",
      author: "Yashodha Bhavnani",
      role: "VP of AI Products",
      quote: "Our customers use Box AI on enormous amounts of content, so speed and cost are a top priority. In our evaluations, Claude Opus 5.5 used a third of the tokens Opus 5 did, and its answers were 40% less verbose without losing accuracy. We expect that to matter a lot for teams running agents across their content.",
      tag: "Enterprise Content"
    },
    {
      company: "Column",
      author: "Mitch Fierro",
      role: "Engineering",
      quote: "Claude Opus 5.5 delegates to subagents far more effectively and checks its own work in creative ways. Self-verification loops feel easier to set up. It found savings opportunities in our cloud bill that previous models had missed, and in code review it caught a bug by checking external docs for a third-party integration we’d modeled wrong several commits earlier.",
      tag: "Cloud Infrastructure"
    },
    {
      company: "Factory",
      author: "Zimu Li",
      role: "Member of Technical Staff",
      quote: "Claude Opus 5.5 is the first model we’d default to at medium effort. In our testing it matched Opus 5 on high effort, while using 20 to 25% fewer output tokens. On long, messy investigations it always came back with a clear, actionable answer. This means our customers get more done for less.",
      tag: "Autonomous Agents"
    }
  ],

  promptingGuide: {
    overview: {
      headline: "The Paradigm Shift: From Prompt Rituals to Outcome-Centric Engineering",
      description: "With Claude Opus 5.5, Anthropic has moved beyond the complex prompt rituals of earlier frontier generations. Because adaptive thinking is natively woven into the model's core execution loop, developers no longer need to micromanage chain-of-thought steps, plead for conciseness, or engineer fragile multi-prompt scaffolding."
    },

    whatChanged: [
      {
        title: "Thinking Cannot Be Disabled (Always-On Adaptive)",
        previous: "Developers explicitly toggled `thinking: { type: 'enabled', budget_tokens: 4096 }` or disabled it for quick queries.",
        opus55: "Adaptive thinking is permanently active. Sending `thinking: { type: 'disabled' }` returns a 400 error. The model automatically adjusts internal reasoning depth per token based on question difficulty.",
        impact: "Zero configuration required for reasoning; impossible to accidentally under-budget thinking for complex math or logic."
      },
      {
        title: "Default Effort Calibrated to 'Medium'",
        previous: "Models defaulted to 'high' effort, often triggering long, verbose chains of thought on straightforward questions.",
        opus55: "The new API parameter `effort: 'medium'` is standard. You can calibrate across `'low'`, `'medium'`, `'high'`, `'xhigh'`, and `'max'`.",
        impact: "Drastically lowers latency and token spend on everyday tasks while unlocking extreme depth when high effort is requested."
      },
      {
        title: "Tool Use Migration & Breaking Deprecation",
        previous: "Workflows often relied on `tool_choice: 'any'` to force the model to select at least one tool.",
        opus55: "Setting `tool_choice: 'any'` is no longer supported and returns a 400 Bad Request. You must use `tool_choice: 'auto'` or specify a tool directly.",
        impact: "Workflows must gracefully accommodate turns where the model decides direct answering is superior to an unnecessary tool call."
      },
      {
        title: "Preserved Thinking Anti-Distillation Safeguard",
        previous: "API users could rewrite or strip intermediate assistant reasoning tokens from the conversation history.",
        opus55: "Context tampering on prior thinking blocks is blocked for accounts created on/after Aug 31, 2026. Thinking tokens must remain unaltered in multi-turn payloads.",
        impact: "Prevents automated model distillation while preserving cache efficiency across conversation branches."
      },
      {
        title: "Radical Elimination of Prose Commentary",
        previous: "Models routinely prefaced code modifications with paragraphs of conversational filler and postscript disclaimers.",
        opus55: "Outputs lead directly with solutions. Code diffs contain targeted, high-utility comments instead of essays.",
        impact: "Saves 25-50% in output tokens and prevents context window exhaustion during multi-hour unattended runs."
      }
    ],

    anthropicGoalAndExpectation: {
      goal: "Transform AI from a short-turn chat assistant into a dependable, unattended engineering colleague capable of executing 10+ hour multi-repository migrations, auditing hundred-thousand-line codebases, and conducting rigorous scientific research safely and cost-effectively.",
      expectations: [
        "Enable autonomous overnight execution without hallucinated drift or infinite retry loops.",
        "Slash operational costs by 40-50% to make enterprise multi-agent workflows economically viable.",
        "Achieve ironclad alignment and sandbox containment (85% reduction in escape attempts) under Dario Amodei's 'Pacing the Frontier' mandate."
      ]
    },

    fourPillars: [
      {
        name: "1. Define Done (Outcome-Centric Specification)",
        rule: "Never tell Opus 5.5 how to think step-by-step. Instead, give an unmistakable definition of success.",
        goodExample: "The migration is complete when all 142 Jest integration tests pass in `/src/__tests__`, zero TypeScript errors exist under `--strict`, and `npm run build` succeeds.",
        badExample: "First think about the files you need to change, then list your thoughts, then write pseudo-code, then convert each file..."
      },
      {
        name: "2. Plan Mode & Explore-Plan-Code-Commit",
        rule: "For multi-file or multi-repo tasks, explicitly mandate a separate reconnaissance turn before any files are modified.",
        goodExample: "Before writing any code or modifying existing files, inspect the codebase architecture, read package configs, and output a concise execution plan. Wait for validation or proceed only after your own sanity check.",
        badExample: "Immediately start changing all imports across the repository."
      },
      {
        name: "3. Separation of Action Policy vs Task Instructions",
        rule: "Keep system instructions for tool boundaries distinct from user task context using clear XML containers.",
        goodExample: "<system_policy>\nOnly call git commands via bash. Never delete remote branches.\n</system_policy>\n<task>\nRefactor auth middleware.\n</task>",
        badExample: "Refactor auth middleware and also remember to only use bash and don't delete branches please."
      },
      {
        name: "4. Autonomous Self-Verification Checkpoints",
        rule: "Equip the model with self-evaluating rubric loops. Opus 5.5 excels at catching its own mistakes when asked to verify against an explicit rule.",
        goodExample: "After applying the refactor, run the linter and test suite. If any test fails, inspect the stack trace, formulate a hypothesis, and fix the root cause before completing.",
        badExample: "Apply the changes and return done."
      }
    ],

    effortGuide: [
      {
        level: "low",
        tokensPerTask: "Minimal (~200 - 800 thinking tokens)",
        bestFor: "Bug screening, citation lookup, JSON formatting, fast Slack bot responses, status reporting.",
        quote: "Deloitte: 'Even at lowest effort, caught 72% of known bugs vs Opus 5's 56% at high.'"
      },
      {
        level: "medium (Default)",
        tokensPerTask: "Balanced (~1,500 - 4,000 thinking tokens)",
        bestFor: "Day-to-day software engineering, feature generation, refactoring, exploratory data analysis.",
        quote: "Factory: 'First model we default to at medium effort. Matches Opus 5 high effort on 25% fewer tokens.'"
      },
      {
        level: "high",
        tokensPerTask: "Deep (~4,000 - 12,000 thinking tokens)",
        bestFor: "Multi-file architecture redesigns, tricky race condition debugging, multi-repo service contracts.",
        quote: "Stripe: 'Directed a dozen sessions through 40 stacked PR rebases without breaking CI.'"
      },
      {
        level: "xhigh / max",
        tokensPerTask: "Exhaustive (~12,000 - 32,000+ thinking tokens)",
        bestFor: "Frontier mathematical proofs, Humanity's Last Exam, 500k+ line whole-system migrations, zero-day threat analysis.",
        quote: "Walleye: 'Detected indexing off-by-one in our own test instructions that no other model had ever noticed.'"
      }
    ],

    promptTemplates: [
      {
        id: "unattended-migration",
        name: "Unattended Multi-Repo Migration",
        recommendedEffort: "high",
        systemPrompt: `You are an autonomous principal software engineer. You are operating in unattended execution mode.

<operational_rules>
1. Always explore the codebase first. Do not touch or modify code until you have mapped the dependency graph.
2. Structure your work into atomic phases: [Explore] -> [Plan] -> [Execute] -> [Verify].
3. Make concise, high-utility code edits. Do not generate verbose conversational commentary.
4. Verify every change with test suites and type checkers.
</operational_rules>`,
        userPrompt: `<task_objective>
Migrate all internal RPC endpoints in the service from gRPC v1 to Connect-RPC v2.
</task_objective>

<scope>
- Target directory: \`/services/order-gateway\`
- Ensure backward compatibility with existing protobuf definitions in \`/proto/orders/v1\`.
</scope>

<definition_of_done>
1. All unit tests in \`/services/order-gateway/tests\` pass.
2. \`golangci-lint run\` reports 0 warnings.
3. A concise summary markdown table of all touched endpoints is written to \`MIGRATION_REPORT.md\`.
</definition_of_done>`
      },
      {
        id: "quant-finance",
        name: "Quantitative Analysis & Anomaly Detection",
        recommendedEffort: "xhigh",
        systemPrompt: `You are a Senior Quantitative Researcher at a global equity trading firm.

<analytical_rigor>
- Scrutinize every data source for indexing errors, lookahead bias, and timezone mismatches.
- Lead directly with actionable financial findings and metric deltas.
- If evaluation rubrics contain contradictory assumptions, flag them explicitly before proceeding.
</analytical_rigor>`,
        userPrompt: `<data_source>
<earnings_release ticker="ACME" quarter="Q2-2026">
[Attached financial statements and 10-Q filing]
</earnings_release>
</data_source>

<analysis_instructions>
1. Extract GAAP and Non-GAAP operating margins.
2. Identify discrepancies between GAAP operating income and adjusted EBITDA.
3. Check if revenue recognition changes explain the gross margin expansion.
4. Output an executive briefing structured with:
   - Key Variance Summary (table)
   - Red Flags / Quality of Earnings Notes
   - Valuation Multiples Impact
</analysis_instructions>`
      },
      {
        id: "security-audit",
        name: "Security Vulnerability & Sandbox Audit",
        recommendedEffort: "high",
        systemPrompt: `You are a Principal Application Security Engineer performing static analysis on critical infrastructure code.

<security_policy>
- Adhere to safe remediation principles.
- Flag any potential sandbox escape, command injection, or privilege escalation vectors.
- Screen for indirect prompt injection vectors in untrusted markdown/text inputs.
</security_policy>`,
        userPrompt: `<source_repository>
[Target Node.js / Express microservice handling user-uploaded archive extracts]
</source_repository>

<audit_tasks>
1. Scan for path traversal (zip slip), SSRF in webhook delivery, and regex DoS.
2. Provide remediated code snippets for any finding, with unit test cases proving the exploit and its mitigation.
3. Lead with severity scoring (CVSS v4.0).
</audit_tasks>`
      }
    ]
  },

  safety: {
    title: "Safety, Pacing the Frontier & Responsible Scaling",
    amodeiQuote: "AI progress should be paced so that safety practices stay ahead of model capabilities. Pacing is an approach to keeping AI safe, remaining competitive with China, and realizing AI’s benefits, particularly in areas like biology and medicine.",
    timeHorizons: [
      {
        horizon: "Horizon 1: Current Generation Best Practices",
        details: "Pre-release audits by METR and Frontier Design; automated behavioral audit across 2,000+ simulation scenarios; biological and cyber safeguards matched to capability levels."
      },
      {
        horizon: "Horizon 2: Preparing for Future Autonomous AI Researchers",
        details: "Filtering RL training environments to prevent deception; automated diversity generation for safety fine-tuning; interpretability-based monitoring to replace fragile chain-of-thought audits."
      }
    ],
    safeguards: [
      {
        name: "Behavioral Alignment Audit",
        stat: "85% reduction",
        description: "Opus 5.5 attempted to circumvent sandbox boundaries ~85% less often than Opus 5 or Mythos 5.1. Every attempt was low-severity and self-reported by the model."
      },
      {
        name: "Preserved Thinking",
        stat: "Anti-Distillation",
        description: "Protects proprietary model reasoning against industrial-scale fake account distillation attacks by preventing modification of previous assistant thinking blocks."
      },
      {
        name: "Cyber Verification Program",
        stat: "Tiered Access",
        description: "Routine debugging works natively. Advanced offensive security tasks are re-routed to Opus 4.8 unless users are verified through the expanded 3-tier program."
      },
      {
        name: "Life Sciences Verification Program",
        stat: "Biology Safeguards",
        description: "Vetted pharmaceutical, academic, and biotech organizations (such as Dyno Therapeutics partners) receive specialized clearances for frontier molecular and protein design."
      },
      {
        name: "Zero Data Retention & EU Compliance",
        stat: "ZDR Standard",
        description: "Full enterprise zero data retention, automated watermarking compliance for the EU AI Act, and transparent fallback architectures."
      }
    ]
  }
};
