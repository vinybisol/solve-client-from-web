import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BranchesBankFormComponent } from '../branches-bank-form/branches-bank-form.component';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-branches-form',
  imports: [CommonModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, BranchesBankFormComponent, MatCardModule, MatProgressBarModule],
  templateUrl: './branches-form.component.html',
  styleUrl: './branches-form.component.scss'
})
export class BranchesFormComponent {
  isSingleBranch = input.required<boolean>();
  branchForm = input.required<FormGroup>();
  index = input.required<number>();

  removeBranch = output<number>();
  close = output<void>();

  activeProgressBar = signal<boolean>(false);
  protected isBranchOthers = signal(false);
  protected isSameEmailContact = signal(false);
  protected isSameEmailCharge = signal(false);
  private branchService = inject(BranchService);
  private snackBar = inject(MatSnackBar);


  onCNPJLoad() {
    this.activeProgressBar.set(true);
    const cnpj = this.branchForm().get('branchCNPJ')?.value;
    if (!cnpj) {
      this.activeProgressBar.set(false);
      return;
    }

    this.branchService.loadBranchData(cnpj).subscribe({
      next: (data) => {
        let ie = '';
        if (data.estabelecimento.inscricoes_estaduais.length > 0) {
          ie = data.estabelecimento.inscricoes_estaduais[0].inscricao_estadual;
        }
        this.branchForm().patchValue({
          branchName: data.razao_social,
          branchFantasy: data.estabelecimento.nome_fantasia,
          branchCity: data.estabelecimento.cidade.nome,
          branchState: data.estabelecimento.estado.sigla,
          branchIE: ie
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

  onClickRemoveBranch(index: number): void {
    this.removeBranch.emit(index);
  }
  onBranchTypeChange(value: string): void {
    if (value === 'Outro') {
      this.isBranchOthers.set(true);
    } else {
      this.isBranchOthers.set(false);
    }
  }

  onEmailContractChange(value: boolean): void {
    this.isSameEmailContact.set(!value);
  }
  onEmailChargeChange(value: boolean): void {
    this.isSameEmailCharge.set(!value);
  }
}