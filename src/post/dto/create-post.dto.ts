export class CreatePostDto {
  title: string;
  description: string;
  author: string;
  slug: string;
  published: boolean;
  published_at: Date;
  category: number;
}
