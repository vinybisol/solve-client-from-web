import { CommonModule } from '@angular/common';
import { Component, input, Input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-other-informations-form',
  imports: [MatCheckboxModule, CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatSelectModule],
  templateUrl: './other-informations-form.component.html',
  styleUrl: './other-informations-form.component.scss'
})
export class OtherInformationsFormComponent {
  public otherForm = input.required<FormGroup>();
  public hasAdiquitente = signal(false);
  public hasPixIntegraded = signal(false);

  onChange(event: any) {
    this.hasAdiquitente.set(event === 'yes');
  }
  onChangePix(event: any) {
    this.hasPixIntegraded.set(event === 'yes');
  }
}
