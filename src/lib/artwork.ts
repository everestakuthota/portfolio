export type Artwork = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  image: string;
};

// Placeholder pieces — swap `image` for real photos in /public/artwork
// and edit title/year/medium once real work is in.
export const artworks: Artwork[] = [
  { slug: "piece-1", title: "Untitled I", year: "2026", medium: "Oil on canvas", image: "/artwork/piece-1.svg" },
  { slug: "piece-2", title: "Untitled II", year: "2026", medium: "Acrylic on wood", image: "/artwork/piece-2.svg" },
  { slug: "piece-3", title: "Untitled III", year: "2025", medium: "Mixed media", image: "/artwork/piece-3.svg" },
  { slug: "piece-4", title: "Untitled IV", year: "2025", medium: "Ink on paper", image: "/artwork/piece-4.svg" },
  { slug: "piece-5", title: "Untitled V", year: "2025", medium: "Oil on canvas", image: "/artwork/piece-5.svg" },
  { slug: "piece-6", title: "Untitled VI", year: "2024", medium: "Digital", image: "/artwork/piece-6.svg" },
];
