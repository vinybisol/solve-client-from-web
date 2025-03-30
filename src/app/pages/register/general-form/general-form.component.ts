import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-general-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatCardModule, MatSelectModule],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class GeneralFormComponent {
  private formBuilder = inject(FormBuilder);

  registerFormGroup = this.formBuilder.group({
    startDate: [new Date().toISOString(), [Validators.required]],
    saller: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    startType: [''],
    systemConversion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    conversionData: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    databaseLink: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });

  get formControls() {
    return this.registerFormGroup.value;
  }

}
