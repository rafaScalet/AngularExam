import { Rating } from '../enum/rating';

export interface Book {
  id: number;
  title: string;
  synopsis: string;
  gender: string;
  year: number;
  rating: Rating;
  idAuthor: number;
}
