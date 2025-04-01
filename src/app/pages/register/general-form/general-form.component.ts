import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-general-form',
  imports: [CommonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatCardModule, MatSelectModule],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class GeneralFormComponent {

  @Input() generalForm!: FormGroup;
}
