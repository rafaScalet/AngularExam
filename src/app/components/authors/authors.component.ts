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
  isEditing: boolean = false;
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
    if (this.isEditing) {
      this.service.putAuthor(this.authorFormGroup.value).subscribe({
        next: () => {
          this.loadAuthors();
          this.isEditing = false;
          this.authorFormGroup.reset();
        },
      });
    } else {
      this.service.postAuthor(this.authorFormGroup.value).subscribe({
        next: (data) => {
          this.authors.push(data);
          this.authorFormGroup.reset();
        },
      });
    }
  }

  delete(author: Author) {
    this.service.deleteAuthor(author).subscribe({
      next: () => this.loadAuthors(),
    });
  }

  update(author: Author) {
    this.isEditing = true;
    this.authorFormGroup.setValue(author);
  }
}
