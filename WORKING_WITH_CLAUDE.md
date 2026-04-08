# Working with Claude — Tips for Building This App

## The basics

You talk to me in natural language. I read your code, write code, run commands, and make changes to files directly. You review what I did, tell me what to fix, and we repeat.

---

## How to give me context effectively

### Use `@` to point me to files
In VS Code (Claude Code extension), type `@` followed by a filename to attach it to your message. This is the fastest way to say "look at this file."

Examples:
- "Fix the bug in @SimulationCanvas.tsx"
- "Refactor @simulationStore.ts to add a reset feature"

### Tell me what, not how
You don't need to write pseudocode or specify implementation details. Just describe the behavior you want.

**Good:** "When the user clicks Reset, the simulation should go back to generation 0 with the original population"
**Less useful:** "Add a function called resetSimulation that sets generation to 0 and calls initializePopulation and re-renders the component"

I'll figure out the implementation. If my approach is wrong, just tell me.

### Use reference documents
You've already created files like `SIMULATION_BEHAVIOR.md` and `MATH_EXPLAINED.md`. These are great. When you want me to follow specific rules, point me to them:

- "Implement the fitness formula described in @MATH_EXPLAINED.md section 3"
- "The simulation should behave as described in @SIMULATION_BEHAVIOR.md"

### Give me screenshots or describe what you see
If something looks wrong in the browser:
- Describe it: "The histogram bars are overlapping instead of side by side"
- Or take a screenshot and share the file path

### Be specific about what's wrong
**Good:** "The population count shows 502 but the cap is 500"
**Less useful:** "The numbers are wrong"

---

## How to iterate effectively

### 1. Work in small chunks
Don't ask me to build the entire app at once. Break it into pieces:

1. "Build the simulation engine with just the fitness calculation"
2. "Now add the antibiotic ramp"
3. "Now wire it up to the UI"

Each step, you can test and course-correct before moving on.

### 2. Test after each change
After I make changes, run the app (`npm run dev`) and check the result. Then tell me:
- What works
- What doesn't
- What to change next

### 3. Give feedback immediately
If I do something you don't like, say so right away:
- "Don't add comments to every line"
- "Keep the function in the same file, don't split it out"
- "That animation is too slow, make it snappier"

I'll remember your preferences for the rest of the conversation.

### 4. Use "undo" language when needed
- "Revert that last change" — I'll undo what I just did
- "That's not what I meant, instead do X" — I'll take a different approach

### 5. Ask me to explain before building
If you're unsure about an approach:
- "How would you implement X? Don't code it yet, just explain."
- "What are the tradeoffs between approach A and B?"

---

## Conversation management

### Start fresh for new topics
Each conversation has a context window (memory limit). For best results:
- Use one conversation per feature or bug fix
- If a conversation gets long and I start forgetting earlier context, start a new one

### Use `/compact` when the conversation gets long
This compresses the conversation history so I can keep working without losing track.

### Use plan mode for big features
For larger features, ask me to make a plan first:
- "Plan how to add the lineage tree visualization. Don't write code yet."
- I'll outline the approach, you approve or adjust, then I build it.

---

## Common workflows

### Adding a new feature
1. Describe the feature in plain language
2. Point me to relevant files with `@`
3. I'll implement it
4. You test in the browser
5. You tell me what to adjust
6. Repeat steps 3–5

### Fixing a bug
1. Tell me what's wrong and where you see it
2. I'll investigate the code and propose a fix
3. You confirm or redirect

### Refactoring
1. Tell me what you want changed and why
2. I'll make the changes
3. Run `npm run build` and `npm run test` to make sure nothing broke

### Polishing the UI
1. Describe what you want: "Make the cards have rounded corners and a subtle shadow"
2. Or reference a design: "Make it look like the Tailwind UI dashboard example"
3. I'll update the styles

---

## Things I'm good at

- Reading and modifying existing code
- Building features from a description
- Debugging errors (paste the error message)
- Explaining how code works
- Writing tests
- Refactoring and cleanup

## Things that work better with your help

- Visual design judgment (you need to see the result and tell me if it looks right)
- Domain accuracy (you know the biology — tell me if the simulation behavior is correct)
- Prioritization (tell me what matters most to build next)

---

## Quick reference

| You want to... | Say this |
|---|---|
| Build a feature | "Add X that does Y" |
| Fix a bug | "X is broken — I see Y but expected Z" |
| Understand code | "Explain how @filename.ts works" |
| Plan before building | "Plan how to do X, don't code yet" |
| Undo a change | "Revert that" |
| Set a preference | "Always do X" / "Never do Y" |
| Run the app | `npm run dev` |
| Run tests | `npm run test` |
| Check for errors | `npm run build` |
