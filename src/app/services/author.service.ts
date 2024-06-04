import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  url = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url);
  }

  postAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.url, author);
  }

  deleteAuthor(author: Author): Observable<void> {
    return this.http.delete<void>(`${this.url}/${author.id}`);
  }

  putAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.url}/${author.id}`, author);
  }
}
