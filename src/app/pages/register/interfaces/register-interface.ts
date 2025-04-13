import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { BranchesWithPixOrTef } from "../other-informations-form/other-informations-form.component";

export interface RegisterInterface {
    startDate: FormControl<string | null>;
    saller: FormControl<string | null>;
    startType: FormControl<string | null>;
    systemConversion: FormControl<string | null>;
    linkConversion: FormControl<string | null>;
    typeConversion: FormControl<string | null>;
    whatConverterProducts: FormControl<boolean | null>;
    whatConverterClients: FormControl<boolean | null>;
    whatConverterSuppliers: FormControl<boolean | null>;
    conversionDataObservation: FormControl<string | null>;
    branches: FormArray<FormGroup<BranchesInterface>>;
    accountingName: FormControl<string | null>;
    accountingCNPJ: FormControl<string | null>;
    accounterName: FormControl<string | null>;
    accounterCPF: FormControl<string | null>;
    accounterCRC: FormControl<string | null>;
    accountingPhone: FormControl<string | null>;
    accountingEmail: FormControl<string | null>;
    propertyOwnerName: FormControl<string | null>;
    propertyOwnerPhone: FormControl<string | null>;
    propertyOwnerEmail: FormControl<string | null>;
    hasTef: FormControl<boolean | null>;
    tefAdiquirente: FormControl<string | null>;
    branchesWithTef: FormGroup<any>;
    hasPix: FormControl<boolean | null>;
    branchesWithPix: FormGroup<any>;
    argoModules: FormGroup<ArgoModulesInterface>;
    argoModulesDistribution: FormGroup<ArgoModulesDistributionInterface>;
    otherInformations: FormControl<string | null>;
}

export interface BranchesInterface {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    branchNumber: FormControl<string | null>;
    branchCNPJ: FormControl<string | null>;
    branchIE: FormControl<string | null>;
    branchName: FormControl<string | null>;
    branchFantasy: FormControl<string | null>;
    branchCity: FormControl<string | null>;
    branchState: FormControl<string | null>;
    branchPhone: FormControl<string | null>;
    branchType: FormControl<string | null>;
    branchTypeOthers: FormControl<string | null>;
    isSameBranchContactEmail: FormControl<boolean | null>;
    branchContactEmail: FormControl<string | null>;
    isSamebranchChargeEmail: FormControl<boolean | null>;
    branchChargeEmail: FormControl<string | null>;
    branchSocialContract: FormControl<boolean | null>;
    branchDigitalCertified: FormControl<boolean | null>;
    branchLogotype: FormControl<string | null>;
    branchLaw: FormControl<string | null>;
    bankNumber: FormControl<string | null>;
    bankAgency: FormControl<string | null>;
    bankCheckingAccount: FormControl<string | null>;
    bankManagerName: FormControl<string | null>;
    bankMangerPhone: FormControl<string | null>;
}

export interface ArgoModulesInterface {
    argo360Custom: FormControl<boolean | null>;
    argo360: FormControl<boolean | null>;
    customerPortal: FormControl<boolean | null>;
}

export interface ArgoModulesDistributionInterface {
    ipirangaAmPm: FormControl<boolean | null>;
    ipitangaPista: FormControl<boolean | null>;
    ipirangaFrotas: FormControl<boolean | null>;
    ipirangaJetOil: FormControl<boolean | null>;
    vibraGasStaion: FormControl<boolean | null>;
    vibraMania: FormControl<boolean | null>;
    shellBox: FormControl<boolean | null>;
    shellSelect: FormControl<boolean | null>;
}