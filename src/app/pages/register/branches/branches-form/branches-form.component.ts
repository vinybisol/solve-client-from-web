import { Component, inject, output, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BranchesBankFormComponent } from '../branches-bank-form/branches-bank-form.component';
import { BranchService } from '../services/branch.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-branches-form',
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, BranchesBankFormComponent, MatCardModule, MatProgressBarModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.scss'
})
export class BranchesFormComponent {
  @ViewChild(BranchesBankFormComponent) bankForm: BranchesBankFormComponent | null = null;

  activeProgressBar = signal<boolean>(false);

  private formBuilder = inject(FormBuilder);
  private branchService = inject(BranchService);
  private snackBar = inject(MatSnackBar);

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

  onCNPJLoad() {
    this.activeProgressBar.set(true);
    const cnpj = this.registerFormGroup.get('branchCNPJ')?.value;
    if (!cnpj) {
      this.activeProgressBar.set(false);
      return;
    }

    this.branchService.loadBranchData(cnpj).subscribe({
      next: (data) => {
        this.registerFormGroup.patchValue({
          branchName: data.razao_social,
          branchFantasy: data.estabelecimento.nome_fantasia
        });
        this.activeProgressBar.set(false);
      },
      error: (e) => {
        console.error(e);
        this.activeProgressBar.set(false);
        this.snackBar.open('CNPJ não encontrado', 'Fechar', {
          duration: 5000
        });
      }
    });

  }
}