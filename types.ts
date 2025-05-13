export type Screenshot = {
  image: string;
  description: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  mainImage: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  screenshots: Screenshot[];
};