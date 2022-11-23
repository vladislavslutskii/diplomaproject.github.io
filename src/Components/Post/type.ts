export type PostType = {
  id: number;
  imageUrl: string | null;
  summary: string;
  title: string;
};

export type PostProps = {
  post: PostType;
};
