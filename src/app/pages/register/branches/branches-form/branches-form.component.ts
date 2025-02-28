import { Component, inject, output, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BranchesBankFormComponent } from '../branches-bank-form/branches-bank-form.component';

@Component({
  selector: 'app-branches-form',
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, BranchesBankFormComponent, MatCardModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.scss'
})
export class BranchesFormComponent {
  @ViewChild(BranchesBankFormComponent) bankForm: BranchesBankFormComponent | null = null;

  private formBuilder = inject(FormBuilder);

  registerFormGroup = this.formBuilder.group({
    branchNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
    branchCNPJ: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    branchName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    branchFantasy: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    branchCSCToken: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    branchCSCID: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(7)]],
    branchPhone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    branchEmail: ['', [Validators.required, Validators.email]],
    branchLaw: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    branchROT: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    branchBank: this.bankForm?.formControls
  })

  get formControls() {
    const bankControls = this.bankForm?.formControls
    this.registerFormGroup.patchValue({ branchBank: bankControls })
    return this.registerFormGroup.value;
  }

  close = output<void>();

}
