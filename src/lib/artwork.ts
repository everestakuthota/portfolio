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
    slug: "blonded-poster",
    title: "Blonded",
    year: "2023",
    medium: "Photography & Photoshop (poster)",
    image: "/artwork/blonded-poster.jpg",
    width: 1800,
    height: 2400,
    description: "",
  },
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
    slug: "reject-the-urban",
    title: "Reject the Urban",
    year: "2024",
    medium: "Photography & digital collage (poster)",
    image: "/artwork/reject-the-urban.jpg",
    width: 1553,
    height: 2400,
    description: "",
  },
  {
    slug: "halo-cover",
    title: "Halo",
    year: "2026",
    medium: "Photography & Photoshop (cover art)",
    image: "/artwork/halo-cover.jpg",
    width: 2400,
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

// Pieces shown on the home page but not in the main gallery.
export const featured: Artwork[] = [
  {
    slug: "mellow",
    title: "Mellow",
    year: "2023",
    medium: "Photography & digital collage (poster)",
    image: "/artwork/mellow.jpg",
    width: 1084,
    height: 1470,
    description: "",
  },
];
