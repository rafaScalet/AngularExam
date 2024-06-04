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

  getAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(this.url);
  }
}
