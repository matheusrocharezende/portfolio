export interface Project {
  slug: string;
  title: string;
  description: string;
  year?: number;
  tags?: string[];
  coverImage?: string | null;
}
