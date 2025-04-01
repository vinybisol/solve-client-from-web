import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-accounting-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './accounting-form.component.html',
  styleUrl: './accounting-form.component.scss'
})
export class AccountingFormComponent {
  @Input() accountingForm!: FormGroup;
};
