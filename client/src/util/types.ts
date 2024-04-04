export type primaryBelief = "Good" | "Bad" | "";
export type secondaryBelief =
  | "Safe"
  | "Dangerous"
  | "Enticing"
  | "Dull"
  | "Alive"
  | "Mechanistic"
  | "NoSecondaryBelief"
  | "";

export type TertiaryBelief =
  | "Pleasurable"
  | "Regenerative"
  | "Progressing"
  | "Harmless"
  | "Cooperative"
  | "Stable"
  | "Just"
  | "Interesting"
  | "Beautiful"
  | "Abundant"
  | "Worth Exploring"
  | "Improvable"
  | "Meaningful"
  | "Funny"
  | "Intentional"
  | "Needs Me"
  | "About Me"
  | "Acceptable"
  | "Changing"
  | "Hierarchical"
  | "Interconnected"
  | "Understandable"
  | "Miserable"
  | "Degenerative"
  | "Declining"
  | "Threatening"
  | "Competitive"
  | "Fragile"
  | "Unjust"
  | "Boring"
  | "Ugly"
  | "Barren"
  | "Not Worth Exploring"
  | "Too Hard to Improve"
  | "Meaningless"
  | "Not Funny"
  | "Unintentional"
  | "Doesn't Need Me"
  | "Indifferent"
  | "Unacceptable"
  | "Static"
  | "Non Hierarchical"
  | "Separable"
  | "Too Hard To Understand"
  | "";

export type Belief = primaryBelief | secondaryBelief | TertiaryBelief;

export interface PageData {
  content: string;
}

export interface AnnotationData {
  pages: PageData[];
}

export interface OptionSet {
  primaryBelief: primaryBelief;
  secondaryBelief: secondaryBelief;
  tertiaryBelief: TertiaryBelief;
}

export interface AnnotationEntry {
  page: number;
  primaryOptionSets: OptionSet;
  secondaryOptionSets?: OptionSet;
}

export type AnnotationEntries = AnnotationEntry[];
