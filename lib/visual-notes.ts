export interface VisualNotesCountry {
  slug: string;
  label: string;
  titleImage: string;
  titleImageWidth: number;
  titleImageHeight: number;
  photos: string[];
}

export const visualNotesCountries: VisualNotesCountry[] = [
  {
    slug: "brasil",
    label: "Brasil",
    titleImage: "/images/visual-notes/brasil-title.svg",
    titleImageWidth: 1200,
    titleImageHeight: 261,
    photos: Array.from(
      { length: 10 },
      (_, i) => `/images/visual-notes/brasil-${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  },
  {
    slug: "new-york",
    label: "New York",
    titleImage: "/images/visual-notes/new-york-title.svg",
    titleImageWidth: 1200,
    titleImageHeight: 384,
    photos: Array.from(
      { length: 12 },
      (_, i) => `/images/visual-notes/ny-${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  },
  {
    slug: "italy",
    label: "Italy",
    titleImage: "/images/visual-notes/italy-title.svg",
    titleImageWidth: 1200,
    titleImageHeight: 470,
    photos: Array.from(
      { length: 6 },
      (_, i) => `/images/visual-notes/italy-${String(i + 1).padStart(2, "0")}.jpg`,
    ),
  },
];
