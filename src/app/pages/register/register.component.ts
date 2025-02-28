import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { BranchesListComponent } from './branches/branches-list/branches-list.component';
import { OtherInformationsFormComponent } from "./other-informations-form/other-informations-form.component";
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [GeneralFormComponent, AccountingFormComponent, MatCardModule, BranchesListComponent, OtherInformationsFormComponent, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: []
})
export class RegisterComponent {

  @ViewChild(GeneralFormComponent) generalForm: GeneralFormComponent | undefined;
  @ViewChild(AccountingFormComponent) accountingForms: AccountingFormComponent | undefined;
  @ViewChild(BranchesListComponent) branchesLists: BranchesListComponent | undefined;
  @ViewChild(OtherInformationsFormComponent) otherInformationsForms: OtherInformationsFormComponent | undefined;

  onReset() {
    throw new Error('Method not implemented.');
  }
  onSave() {
    console.log('General Form:', this.generalForm?.formControls);
    console.log('Accounting Form:', this.accountingForms?.formControls);
    console.log('Branches Form:', this.branchesLists?.formControls);
    console.log('Other Informations Form:', this.otherInformationsForms?.formControls);
  }
}
