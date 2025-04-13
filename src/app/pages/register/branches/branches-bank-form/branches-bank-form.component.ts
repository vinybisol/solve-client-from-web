import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-branches-bank-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './branches-bank-form.component.html',
  styleUrl: './branches-bank-form.component.scss'
})
export class BranchesBankFormComponent {
  public bankForm = input.required<FormGroup>();
}
