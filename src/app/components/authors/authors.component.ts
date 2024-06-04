import { Component, OnInit } from '@angular/core';
import { Author } from '../../interfaces/author';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit {
  isSubmiting: boolean = false;
  isEditing: boolean = false;
  authors: Author[] = [];
  authorFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthorService
  ) {
    this.authorFormGroup = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      pseudonym: ['', Validators.required],
      date: ['', Validators.required],
      awarded: [false, Validators.required],
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
    this.isSubmiting = true;
    if (this.authorFormGroup.valid) {
      if (this.isEditing) {
        this.service.putAuthor(this.authorFormGroup.value).subscribe({
          next: () => {
            this.loadAuthors();
            this.isEditing = false;
            this.authorFormGroup.reset();
            this.authorFormGroup.patchValue({ awarded: false });
            this.isSubmiting = false;
          },
        });
      } else {
        this.service.postAuthor(this.authorFormGroup.value).subscribe({
          next: (data) => {
            this.authors.push(data);
            // this.authorFormGroup.reset();
            this.authorFormGroup.patchValue({ awarded: false });
            this.isSubmiting = false;
          },
        });
      }
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

  get name(): any {
    return this.authorFormGroup.get('name');
  }

  get pseudonym(): any {
    return this.authorFormGroup.get('pseudonym');
  }

  get nationality(): any {
    return this.authorFormGroup.get('nationality');
  }

  get date(): any {
    return this.authorFormGroup.get('date');
  }

  get awarded(): any {
    return this.authorFormGroup.get('awarded');
  }
}
