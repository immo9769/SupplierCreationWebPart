import * as React from "react";
import { useEffect, useState } from "react";
import { Box, TextField, Grid, Typography, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSupplierField } from "../store/supplierSlice";

// Predefined bank options and branches
const banksWithBranches: { [key: string]: string[] } = {
  ICICI: ["ICICI Mumbai Branch", "ICICI Pune Branch", "ICICI Delhi Branch"],
  SBI: ["SBI Hyderabad Branch", "SBI Chennai Branch", "SBI Kolkata Branch"],
  HDFC: ["HDFC Bangalore Branch", "HDFC Ahmedabad Branch", "HDFC Jaipur Branch"],
};

// Predefined countries and cities
const countriesWithCities: { [key: string]: string[] } = {
  India: ["Mumbai", "Delhi", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  France: ["Paris", "Lyon", "Marseille"],
};

// Predefined account types
const accountTypes = ["Savings", "Current", "Fixed Deposit"];

const BankingDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const bankingDetails = useSelector((state: RootState) => state.supplier);
  
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);

  // Populate cities based on country selection
  useEffect(() => {
    if (bankingDetails.bankcountry) {
      setAvailableCities(countriesWithCities[bankingDetails.bankcountry] || []);
    }
  }, [bankingDetails.bankcountry]);

  // Populate branches based on bank name selection
  useEffect(() => {
    if (bankingDetails.bankname) {
      setAvailableBranches(banksWithBranches[bankingDetails.bankname] || []);
    }
  }, [bankingDetails.bankname]);

  const handleInputChange = (field: keyof typeof bankingDetails, value: string | number) => {
    dispatch(setSupplierField({ field, value }));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCountry = event.target.value;
    setAvailableCities(countriesWithCities[selectedCountry] || []);
    dispatch(setSupplierField({ field: "bankcountry", value: selectedCountry }));
  };

  const handleBankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBank = event.target.value;
    setAvailableBranches(banksWithBranches[selectedBank] || []);
    dispatch(setSupplierField({ field: "bankname", value: selectedBank }));
  };

  return (
    <Box sx={{ padding: "20px", borderRadius: "15px", boxShadow: "3px 3px 15px rgba(0,0,0,0.1)" }}>
      <Typography variant="subtitle1" sx={{ marginBottom: "20px", color: "rgb(0, 57, 94)", fontWeight: "bold" }}>
        Banking Details
      </Typography>

      <Grid container spacing={3}>
        {/* Bank Name */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Bank Name"
            fullWidth
            required
            value={bankingDetails.bankname}
            onChange={handleBankChange}
          >
            {Object.keys(banksWithBranches).map((bank, index) => (
              <MenuItem key={index} value={bank}>
                {bank}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Branch Name */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Branch Name"
            fullWidth
            required
            value={bankingDetails.branchname}
            onChange={(e) => handleInputChange("branchname", e.target.value)}
            disabled={!availableBranches.length}
          >
            {availableBranches.map((branch, index) => (
              <MenuItem key={index} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Bank Country */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Bank Country"
            fullWidth
            required
            value={bankingDetails.bankcountry}
            onChange={handleCountryChange}
          >
            {Object.keys(countriesWithCities).map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Bank City */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Bank City"
            fullWidth
            required
            value={bankingDetails.bankcity}
            onChange={(e) => handleInputChange("bankcity", e.target.value)}
            disabled={!availableCities.length}
          >
            {availableCities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Account Number */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Account Number"
            fullWidth
            required
            value={bankingDetails.accountnumber}
            onChange={(e) => handleInputChange("accountnumber", Number(e.target.value))}
          />
        </Grid>

        {/* IFSC Code */}
        <Grid item xs={12} md={6}>
          <TextField
            label="IFSC Code"
            fullWidth
            required
            value={bankingDetails.ifsccode}
            onChange={(e) => handleInputChange("ifsccode", e.target.value)}
          />
        </Grid>

        {/* MICR Code */}
        <Grid item xs={12} md={6}>
          <TextField
            label="MICR Code"
            fullWidth
            value={bankingDetails.micrcode}
            onChange={(e) => handleInputChange("micrcode", e.target.value)}
          />
        </Grid>

        {/* SWIFT Code */}
        <Grid item xs={12} md={6}>
          <TextField
            label="SWIFT Code"
            fullWidth
            value={bankingDetails.swiftcode}
            onChange={(e) => handleInputChange("swiftcode", e.target.value)}
          />
        </Grid>

        {/* Account Type */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Account Type"
            fullWidth
            required
            value={bankingDetails.accounttype}
            onChange={(e) => handleInputChange("accounttype", e.target.value)}
          >
            {accountTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Beneficiary Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Beneficiary Name"
            fullWidth
            required
            value={bankingDetails.beneficiaryname}
            onChange={(e) => handleInputChange("beneficiaryname", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BankingDetailsForm;
