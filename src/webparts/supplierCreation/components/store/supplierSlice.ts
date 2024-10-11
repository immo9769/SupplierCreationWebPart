import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Supplier } from "../interface/Supplier";
import { sp } from "@pnp/sp";

// Define the SupplierState to manage supplier data
export interface SupplierState extends Supplier {}

// Initial state for the supplier
const initialState: SupplierState = {
  SupplierName: "",
  VendorType: "",
  Address: "",
  City: "",
  Country: "",
  Mobile: "", // Ensure Mobile is a string
  Email: "",
  FirstName: "",
  LastName: "",
  contactPersonMobile: "", // Ensure this matches the type
  contactPersonEmail: "",
  paymentmethod: "",
  invoicecurrency: "",
  invoicematchoption: "",
  invoicepaymentterm: "",
  vatregno: 0,
  vatstatus: "",
  vateffectivefrom: "",
  vattradelicencenumber: 0,
  bankname: "",
  branchname: "",
  accountnumber: 0,
  ifsccode: "",
  micrcode: "",
  swiftcode: "",
  bankcity: "",
  bankcountry: "",
  accounttype: "",
  beneficiaryname: "",
  Attachments: null,
  remark: "",
};

sp.setup({
  sp: {
    baseUrl: " // Correct Site URL",
  },
});

// Fetch supplier by ID
export const fetchSupplierById = createAsyncThunk(
  "supplier/fetchById",
  async (recordId: string, { rejectWithValue }) => {
    try {
      const result = await sp.web.lists
        .getByTitle("SupplierList")
        .items.getById(Number(recordId))
        .get();
      return result; // Returns the supplier data
    } catch (error) {
      console.error("Error fetching supplier:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create a new supplier
export const createSupplier = createAsyncThunk(
  "supplier/create",
  async (data: Supplier, { rejectWithValue }) => {
    try {
      const result = await sp.web.lists.getByTitle("SupplierList").items.add({
        SupplierName: data.SupplierName || "",
        VendorType: data.VendorType || "",
        Address: data.Address || "",
        City: data.City || "",
        Country: data.Country || "",
        Mobile: data.Mobile || "", // Ensure it's a valid string
        Email: data.Email || "",
        FirstName: data.FirstName || "",
        LastName: data.LastName || "",
        contactPersonMobile: data.contactPersonMobile || "", // Ensure it's a valid string
        contactPersonEmail: data.contactPersonEmail || "",
        paymentmethod: data.paymentmethod || "",
        invoicecurrency: data.invoicecurrency || "",
        invoicematchoption: data.invoicematchoption || "",
        invoicepaymentterm: data.invoicepaymentterm || "",
        vatregno: data.vatregno || 0,
        vatstatus: data.vatstatus || "",
        vateffectivefrom: data.vateffectivefrom
          ? new Date(data.vateffectivefrom).toISOString()
          : null,
        vattradelicencenumber: data.vattradelicencenumber || 0,
        bankname: data.bankname || "",
        branchname: data.branchname || "",
        accountnumber: data.accountnumber || 0,
        ifsccode: data.ifsccode || "",
        micrcode: data.micrcode || "",
        swiftcode: data.swiftcode || "",
        bankcity: data.bankcity || "",
        bankcountry: data.bankcountry || "",
        accounttype: data.accounttype || "",
        beneficiaryname: data.beneficiaryname || "",
        remark: data.remark || "",
      });

      return result.data;
    } catch (error) {
      console.error("Error creating supplier:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Update an existing supplier
export const updateSupplier = createAsyncThunk(
  "supplier/update",
  async (
    { vendorId, data }: { vendorId: string; data: Supplier },
    { rejectWithValue }
  ) => {
    try {
      const result = await sp.web.lists
        .getByTitle("SupplierList")
        .items.getById(Number(vendorId))
        .update({
          SupplierName: data.SupplierName || "",
          VendorType: data.VendorType || "",
          Address: data.Address || "",
          City: data.City || "",
          Country: data.Country || "",
          Mobile: data.Mobile || "", // Ensure it's a valid string
          Email: data.Email || "",
          FirstName: data.FirstName || "",
          LastName: data.LastName || "",
          contactPersonMobile: data.contactPersonMobile || "", // Ensure it's a valid string
          contactPersonEmail: data.contactPersonEmail || "",
          paymentmethod: data.paymentmethod || "",
          invoicecurrency: data.invoicecurrency || "",
          invoicematchoption: data.invoicematchoption || "",
          invoicepaymentterm: data.invoicepaymentterm || "",
          vatregno: data.vatregno || 0,
          vatstatus: data.vatstatus || "",
          vateffectivefrom: data.vateffectivefrom
            ? new Date(data.vateffectivefrom).toISOString()
            : null,
          vattradelicencenumber: data.vattradelicencenumber || 0,
          bankname: data.bankname || "",
          branchname: data.branchname || "",
          accountnumber: data.accountnumber || 0,
          ifsccode: data.ifsccode || "",
          micrcode: data.micrcode || "",
          swiftcode: data.swiftcode || "",
          bankcity: data.bankcity || "",
          bankcountry: data.bankcountry || "",
          accounttype: data.accounttype || "",
          beneficiaryname: data.beneficiaryname || "",
          remark: data.remark || "",
        });

      return result.data;
    } catch (error) {
      console.error("Error updating supplier:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSupplierField: <T extends keyof SupplierState>(
      state: SupplierState,
      action: PayloadAction<{ field: T; value: SupplierState[T] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetSupplierState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSupplierById.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { setSupplierField, resetSupplierState } = supplierSlice.actions;
export default supplierSlice.reducer;
