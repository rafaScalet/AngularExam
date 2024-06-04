import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  isEditing: boolean = false;
  books: Book[] = [];
  bookFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: BookService) {
    this.bookFormGroup = formBuilder.group({
      id: [''],
      title: [''],
      synopsis: [''],
      gender: [''],
      year: [''],
      rating: [''],
      authorId: [''],
    });
  }
  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.service.getBooks().subscribe({
      next: (data) => (this.books = data),
    });
  }

  save() {
    if (this.isEditing) {
      this.service.putBook(this.bookFormGroup.value).subscribe({
        next: () => {
          this.loadBooks();
          this.isEditing = false;
          this.bookFormGroup.reset();
        },
      });
    } else {
      this.service.postBook(this.bookFormGroup.value).subscribe({
        next: (data) => {
          this.books.push(data);
          this.bookFormGroup.reset();
        },
      });
    }
  }

  delete(book: Book) {
    this.service.deleteBook(book).subscribe({
      next: () => this.loadBooks(),
    });
  }

  update(book: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }
}
