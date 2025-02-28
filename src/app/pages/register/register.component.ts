import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AccountingFormComponent } from './accounting-form/accounting-form.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { BranchesListComponent } from './branches/branches-list/branches-list.component';
import { OtherInformationsFormComponent } from "./other-informations-form/other-informations-form.component";
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { RegisterService } from './service/register.service';

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


  private registerService = inject(RegisterService);

  onReset() {
    window.location.reload();
  }
  onSave() {
    console.log('General Form:', this.generalForm?.formControls);
    console.log('Accounting Form:', this.accountingForms?.formControls);
    console.log('Branches Form:', this.branchesLists?.formControls);
    console.log('Other Informations Form:', this.otherInformationsForms?.formControls);

    const generalData = this.generalForm?.formControls;
    const accountingData = this.accountingForms?.formControls;
    const branchesData = this.branchesLists?.formControls;
    const otherInformationsData = this.otherInformationsForms?.formControls;

    if (generalData && accountingData && branchesData && otherInformationsData) {

      let content = '';
      content += '----------------------------------------------------------------------------------------------------\n';
      content += 'Start Date: ' + generalData.startDate + '\n';
      content += 'Nome do sistema: ' + generalData.systemConversion + '\n';
      content += 'Dados para converter: ' + generalData.conversionData + '\n';
      content += 'Link da base: ' + generalData.databaseLink + '\n';
      content += '----------------------------------------------------------------------------------------------------\n';
      content += 'Nome da Contabilidade: ' + accountingData.accounterName + '\n';
      content += 'CNPJ: ' + accountingData.accountingCNPJ + '\n';
      content += 'Nome Contador: ' + accountingData.accounterName + '\n';
      content += 'CPF: ' + accountingData.accounterCPF + '\n';
      content += 'CRC: ' + accountingData.accounterCRC + '\n';
      content += 'Telefone: ' + accountingData.accountingPhone + '\n';
      content += 'E-mail: ' + accountingData.accountingEmail + '\n';
      this.branchesLists?.formControls.forEach((branch) => {
        content += '----------------------------------------------------------------------------------------------------\n';
        content += 'Numero da Filial: ' + branch.branchNumber + '\n';
        content += 'CNPJ: ' + branch.branchCNPJ + '\n';
        content += 'Nome da Filial: ' + branch.branchName + '\n';
        content += 'Fantasia: ' + branch.branchFantasy + '\n';
        content += 'ID: ' + branch.branchCSCID + '\n';
        content += 'Token: ' + branch.branchCSCToken + '\n';
        content += 'Telefone: ' + branch.branchPhone + '\n';
        content += 'E-mail: ' + branch.branchEmail + '\n';
        content += 'Regime Tributário: ' + branch.branchLaw + '\n';
        content += 'Posto é Participante do ROT: ' + branch.branchROT + '\n';
        content += '----------------------------------------------------------------------------------------------------\n';
        content += 'Agencia: ' + branch.branchBank?.bankAgency + '\n';
        content += 'Conta: ' + branch.branchBank?.bankCheckingAccount + '\n';
        content += 'Contato do Gerente: ' + branch.branchBank?.bankManagerName + '\n';
        content += 'Nome do Gerente: ' + branch.branchBank?.bankManagerName + '\n';
      });
      content += '----------------------------------------------------------------------------------------------------\n';
      content += 'Certificado Digital: ' + otherInformationsData.digitalCertificate + '\n';
      content += 'Senha do Certificado Digital: ' + otherInformationsData.digitalCertificatePassword + '\n';
      content += 'Contrato Social:' + otherInformationsData.socialContract + '\n';
      content += 'Certificado Digital: ' + otherInformationsData.digitalCertificate + '\n';
      content += '----------------------------------------------------------------------------------------------------\n';
      content += 'Logotipo\n';
      content += 'Contato do Proprietário: ' + otherInformationsData.propertyOwnerPhone + '\n';
      content += 'Email: ' + otherInformationsData.propertyOwnerEmail + '\n';

      this.registerService.downloadStringAsFile(content);
    }
  }

}
