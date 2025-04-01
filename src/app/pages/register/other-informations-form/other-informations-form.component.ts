import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-other-informations-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './other-informations-form.component.html',
  styleUrl: './other-informations-form.component.scss'
})
export class OtherInformationsFormComponent {
  @Input() otherForm!: FormGroup;
}
