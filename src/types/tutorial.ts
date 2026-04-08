/** A single bite-sized tutorial page — one concept, one screen. */
export interface TutorialPage {
  title: string;
  /** Main body — supports a subset of markdown-like formatting in the renderer */
  content: string;
  /** Optional key term highlighted on this page */
  keyTerm?: { term: string; definition: string };
  /** Optional illustrative emoji or icon shown prominently */
  illustration?: string;
  /** Optional diagram ID — maps to an SVG component in TutorialDiagrams */
  diagramId?: string;
}

/** A lesson groups related pages under one overarching concept. */
export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  pages: TutorialPage[];
}

/** A chapter is the top-level grouping (e.g., "Basic Evolution"). */
export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}
