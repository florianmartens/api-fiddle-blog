export type DocHeading = { level: 1 | 2 | 3; title: string; slug: string };

export type DocsSection = {
  heading: DocHeading;
  content: string;
};
