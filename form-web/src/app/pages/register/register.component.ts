import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { GeneralFormComponent } from './general-form/general-form.component';

@Component({
  selector: 'app-register',
  imports: [GeneralFormComponent, AccountingFormComponent, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: []
})
export class RegisterComponent {

}
