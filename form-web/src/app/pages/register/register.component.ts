import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: []
})
export class RegisterComponent {

}
