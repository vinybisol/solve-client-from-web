import { Component, inject, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BranchService } from '../branches/services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounting-form',
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatProgressBarModule],
  templateUrl: './accounting-form.component.html',
  styleUrl: './accounting-form.component.scss'
})
export class AccountingFormComponent {
  @Input() accountingForm!: FormGroup;

  activeProgressBar = signal<boolean>(false);
  private branchService = inject(BranchService);
  private snackBar = inject(MatSnackBar);

  onCNPJLoad() {
    this.activeProgressBar.set(true);
    const cnpj = this.accountingForm.get('accountingCNPJ')?.value;
    if (!cnpj) {
      this.activeProgressBar.set(false);
      return;
    }

    this.branchService.loadBranchData(cnpj).subscribe({
      next: (data) => {
        this.accountingForm.patchValue({
          accountingName: data.razao_social,
          accountingPhone: data.estabelecimento.ddd1 + data.estabelecimento.telefone1,
          accountingEmail: data.estabelecimento.email,
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
  };
}