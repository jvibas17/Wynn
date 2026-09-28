// Inline text supports **bold** and *italic*.
export type ArticleBlock =
  | ['p', string]
  | ['h2', string]
  | ['h3', string]
  | ['h3gold', string, string]
  | ['ul', string[]]
  | ['tip', string]
  | ['note', string]
  | ['faq', string, string];

export interface Article {
  docTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  readTime: string;
  blocks: ArticleBlock[];
}
