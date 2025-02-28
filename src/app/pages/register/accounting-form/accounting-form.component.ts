import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private formBuilder = inject(FormBuilder);

  registerFormGroup = this.formBuilder.group({
    accountingName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    accountingCNPJ: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    accounterName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    accounterCPF: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    accounterCRC: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    accountingPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    accountingEmail: ['', [Validators.required, Validators.email]],
  })

  get formControls() {
    return this.registerFormGroup.value;
  }
};
