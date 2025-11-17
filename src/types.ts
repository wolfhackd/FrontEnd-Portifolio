export type Technology = {
  id: string;
  name: string;
  color: string;
  categoryID: string;
  icon: string;
  category: {
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
  created?: string;
};
