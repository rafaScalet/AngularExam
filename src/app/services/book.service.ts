import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  postBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.url, book);
  }
}
