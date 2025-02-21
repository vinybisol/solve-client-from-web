import { Component, OnInit, viewChild } from '@angular/core';
import { BranchesFormComponent } from '../branches-form/branches-form.component';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-branches-list',
  imports: [CommonModule, NgComponentOutlet, MatButtonModule],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.scss'
})
export class BranchesListComponent implements OnInit {
  public branchesForm: { new(): BranchesFormComponent }[] = [];

  async ngOnInit(): Promise<void> {
    await this.addBranch();
  }

  async addBranch() {
    const { BranchesFormComponent } = await import('../branches-form/branches-form.component');
    this.branchesForm?.push(BranchesFormComponent);
  }

}
