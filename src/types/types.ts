export type Technology = {
  id?: string;
  name: string;
  category: string;
  color: string;
  icon: string;
};

export type Challenge = {
  id?: string;
  title: string;
  text: string;
  projectId: string;
};

export type Project = {
  id?: string;
  title: string;
  description: string;
  images?: string[];
  link: string;
  created?: string;
  fastDescription: string;
  overview: string;
  technologies?: Technology[];
  challenges?: Challenge[];
};

export type ProjectUpdate = {
  id: string;

  title?: string;
  description?: string;
  images?: string[];
  link?: string;
  fastDescription?: string;
  overview?: string;

  technologyIds?: string[];
  challengeIds?: string[];
};
