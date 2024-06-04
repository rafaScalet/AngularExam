import { Component } from '@angular/core';
import { Author } from '../../interfaces/author';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent {
  authors: Author[] = [];
  authorFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.authorFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      nationality: [''],
      pseudonym: [''],
      date: [''],
      awarded: [''],
    });
  }

  save() {
    this.authors.push(this.authorFormGroup.value);
  }
}
