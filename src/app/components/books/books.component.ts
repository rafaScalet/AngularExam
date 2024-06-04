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
    this.service.getBooks().subscribe({
      next: (data) => (this.books = data),
    });
  }

  save() {
    this.books.push(this.bookFormGroup.value);
  }
}
