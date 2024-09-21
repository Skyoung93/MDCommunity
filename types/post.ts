import { CommentDict } from './comment';

export type PostResponse = {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number | null;
  items: number | null;
  data: Post[];
};

export type PostMetaData = {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number | null;
  items: number | null;
};

export type Post = {
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: CommentDict;
  id: string;
  userHugged: boolean;
};
