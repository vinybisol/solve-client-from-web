import { CommonModule } from '@angular/common';
import { Component, effect, input, Input, signal, untracked } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export type BranchesWithPixOrTef = {
  number: string,
  name: string
}
@Component({
  selector: 'app-other-informations-form',
  imports: [MatCheckboxModule, CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatSelectModule],
  templateUrl: './other-informations-form.component.html',
  styleUrl: './other-informations-form.component.scss'
})
export class OtherInformationsFormComponent {
  public otherForm = input.required<FormGroup>();
  public isSingleBranch = input.required<boolean>();
  protected hasAdiquitente = signal(false);
  protected hasPixIntegraded = signal(false);
  protected allBranches: BranchesWithPixOrTef[] = [];

  constructor() {
    effect(() => {
      this.isSingleBranch();

      untracked(() => {
        this.resetForm();
      })
    })
  }

  onChange(event: any) {
    this.hasAdiquitente.set(event === true);
    if (this.hasAdiquitente())
      this.updateBranchesWithPixOrTef();
  }

  onChangePix(event: any) {
    this.hasPixIntegraded.set(event === true);
    if (this.hasPixIntegraded())
      this.updateBranchesWithPixOrTef();
  }

  resetForm() {
    this.otherForm().get('hasTef')?.setValue(false);
    this.onChange(false);
    this.otherForm().get('hasPix')?.setValue(false);
    this.onChangePix(false);
    this.resetBranchesWithPixOrTef();
  }


  updateBranchesWithPixOrTef() {
    const branches = this.otherForm().get('branches') as FormArray;
    this.allBranches = branches.controls.map((branch: any) => {
      return {
        number: branch.get('branchNumber').value,
        name: branch.get('branchName').value
      };
    });

    const branchesWithTef = this.otherForm().get('branchesWithTef') as FormGroup;
    const branchesWithPix = this.otherForm().get('branchesWithPix') as FormGroup;
    this.allBranches.forEach((branch: BranchesWithPixOrTef, index: number) => {
      branchesWithTef.addControl(index.toString(), new FormControl(false));
      branchesWithPix.addControl(index.toString(), new FormControl(false));
    });
  }

  resetBranchesWithPixOrTef() {
    const branchesWithTef = this.otherForm().get('branchesWithTef') as FormGroup;
    const branchesWithPix = this.otherForm().get('branchesWithPix') as FormGroup;
    this.allBranches.forEach((branch: BranchesWithPixOrTef, index: number) => {
      branchesWithTef.removeControl(index.toString());
      branchesWithPix.removeControl(index.toString());
    });
    this.allBranches = [];
  }
}
