export type Artwork = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  image: string;
  width: number;
  height: number;
  description: string;
};

// Edit title/year/medium/description here as needed; drop new images
// into /public/artwork and add an entry to swap in more work.
export const artworks: Artwork[] = [
  {
    slug: "longestt-cover",
    title: "Longestt",
    year: "2026",
    medium: "Photography & Photoshop (cover art)",
    image: "/artwork/longestt-cover.jpg",
    width: 2400,
    height: 2400,
    description: "",
  },
  {
    slug: "puppet",
    title: "Puppet",
    year: "2026",
    medium: "Linocut print",
    image: "/artwork/puppet.jpg",
    width: 1806,
    height: 2400,
    description: "",
  },
  {
    slug: "sunny",
    title: "Sunny",
    year: "2026",
    medium: "Linocut print",
    image: "/artwork/sunny.jpg",
    width: 1828,
    height: 2400,
    description: "",
  },
];
