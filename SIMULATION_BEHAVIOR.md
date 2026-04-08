# Simulation Behavior

This document describes how the simulations should run — the expected behaviors, rules, and scenarios.

**Important Note:** As of this writing, Claude has already built some features for this app, including two different simulations for antibiotic resistance. None of these features should be changed unless explicitly instructed for in Claude chat. Instead, add the features made from this doc as yet another feature in the app. So for now, do **not** change or remove the existing app features even if it's instructed for in this document. The chat is where I'll instruct you on what changes should be made.

<!-- Add your simulation context below -->

# Basic Behavior of Antibiotic Resistance Simulation

The goal of the simulation is to give a simplified yet intuitive visual introduction to natural selection, and consequently, the development of antibiotic resistance in bacteria.

Here's how I envision the simulation to unfold:

1. The simulation starts with a single bacterium, which then divides into two.
2. In the third generation of fission, we show an antibiotic resistance mutation occuring in a single daughter bacterium. This mutation should be labelled as "small resistance (S)" or "medium resistance (M)". Choose whichever one is suitable for the simulation but not both. We'll show mutations among the resistant bacteria leading to small, medium, and high resistance in later generations.
3. The bacteria reproduce without much problems for the next two generations. Some may die due to natural causes and competition for resources but there should always be a few non-resistant and a few resistant bacteria present at the end of this step.
4. Then, antibiotics is introduced. The non-resistant strains get rapidly decimated within the next couple generations or more.
5. Some resistant bacteria also die, but most thrive in comparison to non-resistant cells.
6. After two generations, we start seeing mutations among the resistant cells. Some bacteria develop high resistance, others medium, and others yet have small resistance.
7. Over time, the high-resistant mutants proliferate. Maybe a few medium-resistant ones remain, while the low-resistant ones get nearly decimated (or completely decimated, choose based on how appropriate it is, or with relevant probabilistic maths).


## Choosing the  Descent Trees to Visualize

It's clear that our visualization tool won't be able to show each and every daughter cell that reproduce over time. So, in certain (and frequent) instances, we'll only choose to focus on certain branches of the descent tree.

We'll also inform the users each time a branch is selected for focus, and point out which branch that is visually. The simulation thus shouldn't move incredibly fast; doing so will result in users not being able to properly track what's going on.

This is shown in the drawings I've made below:

**Simulation Stage 1 Image:**

![simulation-stage-1](/assets/simulation-stage-1.jpg)

In this drawing, the part above "Taking Only Part of the Descent Tree" shows stage 1 of the simulation, where we show a single bacterium reproducing and eventually leading to a resistant mutant (shown by shaded circles). These mutants can be low or medium resistant.

The  part below "Taking Only Part..." label shows that I've chosen to focus on only part of the descent tree that starts with the original mutant's parent as the root. This sets us up for Stage 2 of the simulation.

**Simulation Stage 1 Image:**

![simulation-stage-2](/assets/simulation-stage-2.jpg)

Stage 2 begins with the parent of the original mutant, as mentioned before. The dark shaded circles are bacteria with small or medium resistance.

The dotted line represents the introduction of antibiotics. Once it's introduced, the non-resistant bacteria start dying off. Some resistant ones also die off. Eventually, another mutation occurs where high resistance is developed (labelled incorrectly as "S" for strong, when I've already said "S" stands for small resistance; use H for high resistance instead in the app).

Eventually, the high resistance ones dominate.

## Why Use This Approach?

Claude has already generated two simulations for antibiotic resistance. The simulation I've described is to be a separate one that can be accessed just like the second simulation I previously added.

The reasons for this version of the simulation are as follows:

- The first two simulations already start with bacteria that are resistant to antibiotics.
- But if we are to gain a fuller understanding of natural selection, then we must start with an ancestor that was not resistant, then move on to the appearance of the first resistant mutation, and then proceed to show how this mutant's lineage fares against those of his sisters.
- As a result, this simulation plants the seeds for understanding diverging descent from a common ancestor, which will be useful in other simulations (such as speciation, domestication, etc.).

## UI Features and Functionality

- Use full canvas just like in the "Simple Demo" simulation of antibiotic resistance.
- Make the simulation slow enough for users to comprehend what's going on in each step.
- Add buttons for previous step, next step, play/pause button to auto-simulate, and restart simulation.
- Every time the simulation chooses to focus on a subtree, the subtree must be visually indicated to the user for selection. Use attractive and attention-grabbing highlighting techniques and accompanying text such as "Focusing on This Branch Now!"
- Add accompanying text and AI voiceovers to explain key details of each step/generation. Make the simulation more like an interactive video tutorial (but don't use video; just use the current SVG and other graphical techniques in addition to voice).