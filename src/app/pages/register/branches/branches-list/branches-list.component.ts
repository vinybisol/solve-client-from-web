import { CommonModule } from '@angular/common';
import { Component, ComponentRef, input, Input, OnChanges, OnInit, SimpleChanges, viewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { BranchesFormComponent } from '../branches-form/branches-form.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branches-list',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './branches-list.component.html',
  styleUrl: './branches-list.component.scss'
})
export class BranchesListComponent implements OnChanges {

  @Input() branchForm!: FormGroup;
  @Input() isSingleBranch: boolean = true;

  vcr = viewChild('container', { read: ViewContainerRef });
  components: BranchesFormComponent[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSingleBranch']) {
      this.components.forEach(f => f.close.emit());
      this.addBranch();
    }
  }

  async addBranch() {
    const componentRef = this.vcr()?.createComponent(BranchesFormComponent);
    componentRef?.setInput('isSingleBranch', this.isSingleBranch);
    componentRef?.setInput('branchForm', this.branchForm);
    //se inscreve no evento close do componente    
    componentRef?.instance?.close.subscribe(() => this.removeBranch(componentRef));

    this.components.push(componentRef?.instance!);
  }

  removeBranch(componentRef: ComponentRef<BranchesFormComponent>): void {
    const index = this.vcr()?.indexOf(componentRef.hostView);
    if (index !== -1) {
      this.vcr()?.remove(index);
      this.components.splice(index!, 1);
    }
  }
  get formControls() {
    return this.components.map((component) => component.formControls);
  }
}

