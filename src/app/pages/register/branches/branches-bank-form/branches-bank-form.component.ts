import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-branches-bank-form',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './branches-bank-form.component.html',
  styleUrl: './branches-bank-form.component.scss'
})
export class BranchesBankFormComponent {
  private formBuilder = inject(FormBuilder);

  registerFormGroup = this.formBuilder.group({
    bankNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
    bankAgency: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    bankCheckingAccount: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    bankManagerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    bankMangerPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
  })
}
