import { Author } from './../../interfaces/author';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Rating } from '../../enum/rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  isSubmiting: boolean = false;
  isEditing: boolean = false;
  books: Book[] = [];
  authors: Author[] = [];
  ratings = Object.values(Rating);
  bookFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService
  ) {
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      gender: ['', Validators.required],
      year: ['', Validators.required],
      rating: ['', Validators.required],
      authorId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
    });
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (data) => (this.authors = data),
    });
  }

  save() {
    this.isSubmiting = true;
    if (this.bookFormGroup.valid) {
      if (this.isEditing) {
        this.bookService.putBook(this.bookFormGroup.value).subscribe({
          next: () => {
            this.loadBooks();
            this.isEditing = false;
            this.bookFormGroup.reset();
            this.isSubmiting = false;
          },
        });
      } else {
        this.bookService.postBook(this.bookFormGroup.value).subscribe({
          next: (data) => {
            this.loadBooks();
            this.books.push(data);
            this.bookFormGroup.reset();
            this.isSubmiting = false;
          },
        });
      }
    }
  }

  delete(book: Book) {
    this.bookService.deleteBook(book).subscribe({
      next: () => this.loadBooks(),
    });
  }

  update(book: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }

  getAuthorName(authorId: number): Author | undefined {
    return this.authors.find((author) => author.id === authorId);
  }

  get title(): any {
    return this.bookFormGroup.get('title');
  }

  get synopsis(): any {
    return this.bookFormGroup.get('synopsis');
  }

  get gender(): any {
    return this.bookFormGroup.get('gender');
  }

  get year(): any {
    return this.bookFormGroup.get('year');
  }

  get rating(): any {
    return this.bookFormGroup.get('rating');
  }

  get authorId(): any {
    return this.bookFormGroup.get('authorId');
  }
}
