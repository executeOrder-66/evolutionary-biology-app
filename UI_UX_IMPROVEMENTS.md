# UI/UX Improvement Plan

## Current Strengths

- **Educational UX**: Right sidebar teaches while simulating; clear learning path from tutorials → stories → sandbox
- **Visual storytelling**: Antibiotic drama at gen 10, extinction animations, narrative closure in SimulationSummary
- **Multi-view canvas**: Families, histogram, individuals — lets users explore data in different ways
- **Consistent design language**: Emerald + sage palette, card-based layout, glassmorphism effects
- **Dark mode**: Full support via CSS custom properties
- **Keyboard shortcuts**: Space, Arrow, R, +/- prominently displayed and functional
- **What-If branching**: Users can fork simulations mid-run and compare outcomes

---

## Critical — Accessibility

### 1. Respect `prefers-reduced-motion`
All framer-motion animations (page transitions, card stagger, spring physics, chart line draws) should check the user's motion preference. Users with vestibular disorders can experience nausea from animations.

**Fix**: Add a global `useReducedMotion()` hook that reads `window.matchMedia('(prefers-reduced-motion: reduce)')` and conditionally disables or simplifies animations app-wide.

### 2. Color-only status indicators
The header status dot (green = running, amber = paused, blue = completed) relies on color alone. Colorblind users can't distinguish these.

**Fix**: Add a text label next to each dot (already partially done — the word "running"/"paused" appears on desktop but is hidden on mobile). Ensure the label is always visible, or use distinct shapes (circle = running, square = paused, checkmark = completed).

### 3. Minimum font sizes
Several labels are 9px–10px (generation labels in LineageTreeView, keyboard hints, tooltip text). WCAG AAA requires at least 12px for body text.

**Fix**: Audit all `text-[9px]`, `text-[10px]`, `text-[11px]` classes. Increase to 12px minimum, or use `sr-only` alternative text for decorative micro-labels.

### 4. Visible focus indicators
Interactive elements (buttons, tabs, sliders, timeline dots) don't show visible focus rings when navigated via keyboard.

**Fix**: Add `focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2` to all interactive elements. Consider a global CSS rule.

### 5. Missing form labels
The speed range slider in ControlPanel has no associated `<label>` element.

**Fix**: Add `<label htmlFor="speed-slider" className="sr-only">Playback speed</label>` and matching `id` on the input.

### 6. Skip-to-content link
No way for screen reader users to skip past the header and sidebar.

**Fix**: Add a visually hidden `<a href="#main-content">Skip to main content</a>` as the first focusable element, with `id="main-content"` on the `<main>` tag.

---

## High Priority — Mobile UX

### 7. Touch targets too small
Timeline milestone dots (15px), progress dots (6px), and some icon buttons (28px) are below the 44px minimum recommended for touch.

**Fix**: Increase the clickable bounding box (padding) of these elements to at least 44x44px, even if the visual size stays small.

### 8. LineageTreeView on phones
The SVG tree is too dense on small screens. Generation labels (9px) are unreadable, and node tooltips require hover (unavailable on touch).

**Fix**:
- Show a simplified "family summary" view on screens < 640px instead of the full tree
- Replace hover tooltips with tap-to-reveal popovers
- Increase generation label font to 12px

### 9. Horizontal scroll hints
Wide SVG visualizations (tree view, charts) may extend beyond the viewport on mobile without any visual cue.

**Fix**: Add a subtle gradient fade on the right edge when content overflows, plus a "scroll →" hint that disappears after first interaction.

---

## High Priority — Data Visualization

### 10. Add x-axis labels to PopulationChart
The three mini charts (Avg Resistance, Survival Chance, Population Size) show trend lines but no generation numbers on the x-axis. Users can't tell which generation corresponds to which point.

**Fix**: Add tick marks at generations 0, 10, 20, 30, 40, 50 along the bottom of each chart.

### 11. Event markers on charts
When antibiotics are introduced (gen 10), pollution starts (gen 15), etc., there's no visual marker on the population charts.

**Fix**: Add a vertical dashed line at key event generations with a small label (e.g., "Antibiotics").

### 12. Zoom/pan for LineageTreeView
Large simulations (50+ generations) produce dense trees that are hard to navigate.

**Fix**: Add pinch-to-zoom on mobile and scroll-to-zoom on desktop. Consider a minimap in the corner showing the full tree with a viewport indicator.

### 13. Data table alternative
Some users (especially educators) want to see raw numbers, not just visualizations.

**Fix**: Add a "Table" view mode alongside Families/Histogram/Individuals that shows generation-by-generation statistics in a scrollable table.

---

## Medium Priority — Navigation & Information Architecture

### 14. First-time user onboarding
New users land on the home page with 3 sections (tutorials, stories, simulations) but no guidance on where to start.

**Fix**: Add a "New here? Start with the Quick Demo →" banner at the top of the home page for first-time visitors (check localStorage). Dismiss permanently on click.

### 15. Sidebar search/filter
With 8 scenarios (and growing), finding a specific one requires scrolling.

**Fix**: Add a search input at the top of the sidebar that filters scenarios by name, category, or difficulty.

### 16. Scenario difficulty indicators
The difficulty badge (beginner/intermediate/advanced) is text-only and easy to miss.

**Fix**: Add visual weight — e.g., 1/2/3 filled circles next to the difficulty label, or color-code the scenario card border (green → yellow → red).

### 17. Indicate which scenarios have guided stories
Not all scenarios have guided stories, but the sidebar doesn't distinguish them.

**Fix**: Add a small "story" icon or badge on scenarios that have an associated guided story route.

---

## Medium Priority — Interaction Design

### 18. View mode persistence
When users switch between Families/Histogram/Individuals views in SimulationCanvas, the choice resets when changing scenarios.

**Fix**: Persist the selected view mode in localStorage per scenario.

### 19. Playback speed presets
The speed slider (0.25x–5x) is precise but slow to use. Most users want 1x, 2x, or 5x.

**Fix**: Add 3 preset buttons (1x, 2x, 5x) next to the slider for quick access.

### 20. Destructive action confirmation
The "Revert to Start" button in WhatIfPanel resets the entire simulation without confirmation.

**Fix**: Show a small confirmation popover: "Reset simulation to gen 0? Branch history will be cleared."

### 21. Generation bookmarking
Users can't save interesting moments to return to later.

**Fix**: Add a "Bookmark" button that saves the current generation number + a screenshot/snapshot. Show bookmarks as dots on the progress bar.

### 22. Auto-pause at milestones
When the simulation reaches a key educational milestone (antibiotics introduced, population crash), it keeps running. Users may miss the moment.

**Fix**: Add an option (toggled in settings or per-scenario) to auto-pause at milestone generations.

---

## Medium Priority — Visual Polish

### 23. Text contrast
Some gray text (text-gray-400 on white, text-gray-500 on dark) doesn't meet WCAG AAA 7:1 contrast ratio.

**Fix**: Audit all text colors. Use text-gray-600 minimum on light backgrounds, text-gray-300 minimum on dark backgrounds.

### 24. Loading skeletons
SimulationCanvas shows nothing while the simulation initializes. Charts show blank space before gen 1.

**Fix**: Add pulsing skeleton placeholders (rounded rectangles) that match the layout of the final content.

### 25. Consistent icon system
The app mixes emoji (scenario icons), SVG icons (controls, navigation), and text symbols. This creates visual inconsistency.

**Fix**: Choose one system for each context:
- Emoji: scenario identity only (sidebar, cards)
- SVG: all UI controls and navigation
- Never mix in the same row/group

### 26. Card hover states in dark mode
Card shadows (var(--shadow-sm)) are too subtle in dark mode. Hover states are barely visible.

**Fix**: Increase dark mode shadow opacity and add a subtle border-color change on hover.

---

## Low Priority — Feature Ideas

### 27. Export simulation data
Educators want to export chart data for use in presentations or assignments.

**Fix**: Add an "Export" button that downloads a CSV of generation-by-generation statistics (generation, population, mean trait values, mean fitness).

### 28. Share simulation results
After completing a simulation, users may want to share their results.

**Fix**: Generate a shareable URL with the scenario ID and random seed, so others can reproduce the exact same simulation run.

### 29. Multi-simulation comparison
Users can't compare two runs of the same scenario side-by-side (e.g., with vs without antibiotics).

**Fix**: Add a "Compare" mode that shows two simulation canvases side-by-side with synchronized playback.

### 30. Print-friendly summary
The SimulationSummary component would be useful as a printable report for classroom use.

**Fix**: Add a "Print Report" button that opens a clean, print-optimized version of the summary with charts rendered as static images.

### 31. Glossary page
Biology terms (natural selection, fitness, allele frequency, etc.) are explained in tutorials but not accessible from elsewhere.

**Fix**: Create a `/glossary` page with a searchable list of all key terms and definitions, linked from the sidebar and explanation panel.

### 32. Simulation replay
After completion, users can't replay without losing the current results.

**Fix**: Save completed simulation results and allow "View Previous Run" alongside starting a new one.

### 33. Teacher/student mode
Teachers may want to control which scenarios are available or assign specific simulations.

**Fix**: Add a simple "Classroom Mode" that accepts a config URL with enabled scenarios, required quizzes, and progress tracking export.

---

## Implementation Priority Matrix

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| **Do First** | #1 Reduced motion | Low | High |
| **Do First** | #3 Min font sizes | Low | High |
| **Do First** | #4 Focus indicators | Low | High |
| **Do First** | #5 Form labels | Low | Medium |
| **Do First** | #6 Skip link | Low | Medium |
| **Do First** | #23 Text contrast | Low | High |
| **Do Next** | #2 Color-only indicators | Medium | High |
| **Do Next** | #7 Touch targets | Medium | High |
| **Do Next** | #10 Chart x-axis labels | Medium | High |
| **Do Next** | #11 Event markers on charts | Medium | High |
| **Do Next** | #14 Onboarding banner | Low | Medium |
| **Do Next** | #20 Destructive action confirm | Low | Medium |
| **Do Next** | #22 Auto-pause at milestones | Medium | High |
| **Do Next** | #24 Loading skeletons | Medium | Medium |
| **Later** | #8 Mobile tree view | High | High |
| **Later** | #12 Zoom/pan tree | High | Medium |
| **Later** | #13 Data table view | Medium | Medium |
| **Later** | #15 Sidebar search | Medium | Medium |
| **Later** | #18 View persistence | Low | Low |
| **Later** | #19 Speed presets | Low | Low |
| **Later** | #27 Export CSV | Medium | Medium |
| **Later** | #28 Share URL | High | Medium |
| **Later** | #29 Comparison mode | High | Medium |
| **Later** | #31 Glossary page | Medium | Medium |
| **Later** | #33 Classroom mode | High | Medium |
