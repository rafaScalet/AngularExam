import { Component } from '@angular/core';
import { Book } from '../../interfaces/book';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Book[] = [];
  bookFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  save() {
    this.books.push(this.bookFormGroup.value);
  }
}
