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

// Prints for sale — shown on /prints and the home page strip. Images are
// the carved blocks, mirrored to read as pulled prints (see
// scripts/prepare-prints.mjs). Titles are editable placeholders.
export const prints: Artwork[] = [
  {
    slug: "star",
    title: "Star",
    year: "2026",
    medium: "Linocut print",
    image: "/artwork/prints/star-v2.jpg",
    width: 2075,
    height: 2400,
    description: "",
  },
  {
    slug: "hand",
    title: "Hand",
    year: "2026",
    medium: "Linocut print",
    image: "/artwork/prints/hand-v2.jpg",
    width: 2105,
    height: 2400,
    description: "",
  },
  {
    slug: "face",
    title: "Face",
    year: "2026",
    medium: "Linocut print",
    image: "/artwork/prints/face-v2.jpg",
    width: 2076,
    height: 2400,
    description: "",
  },
  {
    slug: "puppet-print",
    title: "Puppet",
    year: "2026",
    medium: "Linocut print",
    image: "/artwork/prints/puppet-v2.jpg",
    width: 1752,
    height: 2400,
    description: "",
  },
];
