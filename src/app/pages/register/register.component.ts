import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { BranchesListComponent } from './branches/branches-list/branches-list.component';
import { OtherInformationsFormComponent } from "./other-informations-form/other-informations-form.component";

@Component({
  selector: 'app-register',
  imports: [GeneralFormComponent, AccountingFormComponent, MatCardModule, BranchesListComponent, OtherInformationsFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: []
})
export class RegisterComponent {

}
