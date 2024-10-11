export interface Supplier {
  ID?: string;
  // Supplier Details
  SupplierName: string;
  VendorType: string;
  Address?: string;
  City: string;
  Country: string;
  Mobile: string;
  Email: string;
  FirstName: string;
  LastName: string;
  contactPersonMobile: string;
  contactPersonEmail: string;

  // Payment and Invoice Details
  paymentmethod: string;
  invoicecurrency: string;
  invoicematchoption: string;
  invoicepaymentterm: string;
  vatregno: number;
  vatstatus: string;
  vateffectivefrom: string | null;
  vattradelicencenumber: number;

  // Banking Details
  bankname: string;
  branchname: string;
  accountnumber: number;
  ifsccode: string;
  micrcode: string;
  swiftcode?: string;
  bankcity: string;
  bankcountry: string;
  accounttype: string;
  beneficiaryname: string;

  // Save and Submit
  Attachments: File | null;
  remark: string;
}