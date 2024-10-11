import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Checkbox,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSupplierField } from "../store/supplierSlice";

// Format Date for the input
const formatDateForInput = (isoDate: string | null): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// Format Date for ISO before submission
const formatDateToISO = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toISOString();
};

const PaymentDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const supplierDetails = useSelector((state: RootState) => state.supplier);

  const [isPredefinedOption, setIsPredefinedOption] = useState(false);
  const [showVatDetails, setShowVatDetails] = useState(false);

  const currencyOptions = ["USD", "INR", "EUR", "GBP"];

  // Check if any VAT field has data and enable VAT checkbox
  useEffect(() => {
    if (
      supplierDetails.vatregno ||
      supplierDetails.vatstatus ||
      supplierDetails.vateffectivefrom ||
      supplierDetails.vattradelicencenumber
    ) {
      setShowVatDetails(true);
    }

    // Automatically check the checkbox for Invoice Match Option
    if (
      supplierDetails.invoicematchoption === "Purchase Order" ||
      supplierDetails.invoicematchoption === "Receipt"
    ) {
      setIsPredefinedOption(true);
    }
  }, [
    supplierDetails.vatregno,
    supplierDetails.vatstatus,
    supplierDetails.vateffectivefrom,
    supplierDetails.vattradelicencenumber,
    supplierDetails.invoicematchoption,
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPredefinedOption(event.target.checked);
    if (event.target.checked) {
      dispatch(setSupplierField({ field: "invoicematchoption", value: "" })); // Clear text input when switching to dropdown
    }
  };

  const handleInputChange = (
    field: keyof typeof supplierDetails,
    value: string | number
  ) => {
    dispatch(setSupplierField({ field, value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedISODate = formatDateToISO(e.target.value);
    handleInputChange("vateffectivefrom", formattedISODate);
  };

  const handleVatToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowVatDetails(event.target.checked);
    if (!event.target.checked) {
      // Clear VAT fields if VAT checkbox is unchecked
      dispatch(setSupplierField({ field: "vatregno", value: 0 }));
      dispatch(setSupplierField({ field: "vatstatus", value: "" }));
      dispatch(setSupplierField({ field: "vateffectivefrom", value: null }));
      dispatch(setSupplierField({ field: "vattradelicencenumber", value: 0 }));
    }
  };

  const invoicePaymentTerms = ["30 Days", "60 Days", "90 Days"];

  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "3px 3px 15px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          marginBottom: "20px",
          color: "rgb(0, 57, 94)",
          fontWeight: "bold",
        }}
      >
        Payment and Invoice Details
      </Typography>
      <Grid container spacing={3}>
        {/* Payment Method */}
        <Grid item xs={12} md={12}>
          <TextField
            label="Payment Method"
            fullWidth
            required
            value={supplierDetails.paymentmethod}
            onChange={(e) => handleInputChange("paymentmethod", e.target.value)}
          />
        </Grid>

        {/* Invoice Currency */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Invoice Currency"
            select
            fullWidth
            required
            value={supplierDetails.invoicecurrency}
            onChange={(e) =>
              handleInputChange("invoicecurrency", e.target.value)
            }
          >
            {currencyOptions.map((currency, index) => (
              <MenuItem key={index} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Invoice Payment Term */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Invoice Payment Term"
            select
            fullWidth
            required
            value={supplierDetails.invoicepaymentterm}
            onChange={(e) =>
              handleInputChange("invoicepaymentterm", e.target.value)
            }
          >
            {invoicePaymentTerms.map((term, index) => (
              <MenuItem key={index} value={term}>
                {term}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Invoice Match Option */}
        <Grid item xs={12} md={8}>
          {!isPredefinedOption ? (
            <TextField
              label="Invoice Match Option"
              fullWidth
              required
              value={supplierDetails.invoicematchoption}
              onChange={(e) =>
                handleInputChange("invoicematchoption", e.target.value)
              }
            />
          ) : (
            <TextField
              select
              label="Invoice Match Option"
              fullWidth
              required
              value={supplierDetails.invoicematchoption}
              onChange={(e) =>
                handleInputChange("invoicematchoption", e.target.value)
              }
            >
              <MenuItem value="Purchase Order">Purchase Order</MenuItem>
              <MenuItem value="Receipt">Receipt</MenuItem>
            </TextField>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPredefinedOption}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Specify your own"
            sx={{ marginLeft: "10px" }}
          />
        </Grid>
      </Grid>

      {/* Vat Details Section */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: 2,
            color: "#00395E",
            fontWeight: "bold",
          }}
        >
          Vat Details
        </Typography>
        <Checkbox
          checked={showVatDetails}
          onChange={handleVatToggle}
          color="primary"
        />
      </Box>

      {showVatDetails && (
        <Grid container spacing={3} marginTop={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="VAT Registration Number"
              fullWidth
              required
              value={supplierDetails.vatregno || ""}
              onChange={(e) =>
                handleInputChange("vatregno", Number(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="VAT Status"
              fullWidth
              required
              value={supplierDetails.vatstatus}
              onChange={(e) => handleInputChange("vatstatus", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="VAT Effective From"
              type="date"
              fullWidth
              value={formatDateForInput(supplierDetails.vateffectivefrom)}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="VAT Trade License Number"
              fullWidth
              required
              value={supplierDetails.vattradelicencenumber || ""}
              onChange={(e) =>
                handleInputChange(
                  "vattradelicencenumber",
                  Number(e.target.value)
                )
              }
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PaymentDetailsForm;
