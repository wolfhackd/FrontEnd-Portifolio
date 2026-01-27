export type Technology = {
  id: string;
  name: string;
  color: string;
  categoryId: string;
  icon: string;
  category?: {
    id: string;
    name: string;
  };
};

export type Project = {
  id?: string;
  title: string;
  description: string;
  fastDescription: string;
  link: string;
  overview: string;
  technologies?: Technology[];
  images?: string[];
  created?: string;
  challenges?: Challenge[];
};

export type Challenge = {
  id?: string;
  title: string;
  text: string;
  projectId?: string;
};
