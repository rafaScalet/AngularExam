import { Component, OnInit } from '@angular/core';
import { Author } from '../../interfaces/author';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  authorFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthorService
  ) {
    this.authorFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      nationality: [''],
      pseudonym: [''],
      date: [''],
      awarded: [''],
    });
  }
  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.service.getAuthors().subscribe({
      next: (data) => (this.authors = data),
    });
  }

  save() {
    this.authors.push(this.authorFormGroup.value);
  }
}
