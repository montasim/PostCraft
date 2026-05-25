# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# Workflow
- Commit changes frequently and atomically while maintaining standards. Confidence: 0.90
- Use subagent-driven development for parallel task execution when building features. Confidence: 0.75

# Code Quality
- Follow clean code, SOLID principles, modular approach, and Next.js best practices for all implementations. Confidence: 0.95
- Use domain-appropriate naming - rename concepts that don't clearly convey meaning (e.g., "trend" → "generation"). Confidence: 0.85

# UI/UX Standards
- Build industry-standard SaaS UI/UX with psychology-based engagement patterns for longer user retention. Confidence: 0.90
- Focus on frontend/UI first, implement backend later when requested. Confidence: 0.85
- For overflow lists with "+n more" pattern: each section gets own button, not one global button. Show 5 items max, then "+n more" button. Same pattern as tones multi select component. Confidence: 0.80
- Display banned words as inline badges (chips) on single line with wrapping, not vertical list. Use light red color without background. Confidence: 0.75

# Technology Stack
- Use @tabler/icons-react instead of lucide-react for icons. Confidence: 0.90
- Use OKLCH color format for design tokens. Confidence: 0.80
- Use Next.js App Router with TypeScript and shadcn/ui components. Confidence: 0.85

# Communication Style
- Respond in terse "caveman" style: drop articles/filler/pleasantries, use fragments, short synonyms. Technical terms exact, code blocks unchanged. Confidence: 0.95
- Caveman mode active every response by default. Levels: lite (no filler, full sentences), full (drop articles, fragments OK), ultra (abbreviate prose words, arrows for causality), wenyan-lite/wenyan-full/wenyan-ultra (classical Chinese terseness). Confidence: 0.90
- Auto-clarity: drop caveman for security warnings, irreversible actions, multi-step sequences, technical ambiguity, or when user asks to clarify. Confidence: 0.85
- Code/commits/PRs: write normal prose. "stop caveman" or "normal mode" reverts to standard. Confidence: 0.80
