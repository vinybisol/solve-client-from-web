import { FormArray, FormControl, FormGroup } from "@angular/forms";

export default interface RegisterInterface {
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
    branches: FormArray<FormGroup<any>>;
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
    otherInformations: FormControl<string | null>;
}