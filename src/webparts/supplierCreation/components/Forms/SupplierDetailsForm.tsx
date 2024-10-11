import * as React from "react";
import { useEffect } from "react";
import { Box, TextField, Grid, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSupplierField } from "../store/supplierSlice";

// Predefined countries and their cities
const countriesWithCities: { [key: string]: string[] } = {
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston"],
  France: ["Paris", "Lyon", "Marseille"],
};

const SupplierDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const supplierDetails = useSelector((state: RootState) => state.supplier);

  const [availableCities, setAvailableCities] = React.useState<string[]>([]);

  // Update cities based on selected country
  useEffect(() => {
    if (supplierDetails.Country) {
      const cities = countriesWithCities[supplierDetails.Country] || [];
      setAvailableCities(cities);

      // If city is not in the available cities, clear the city field
      if (!cities.includes(supplierDetails.City)) {
        dispatch(setSupplierField({ field: "City", value: "" }));
      }
    }
  }, [supplierDetails.Country, dispatch]);

  // Handle country change and populate cities
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCountry = event.target.value;
    setAvailableCities(countriesWithCities[selectedCountry] || []);
    dispatch(setSupplierField({ field: "Country", value: selectedCountry }));
  };

  const handleInputChange = (
    field: keyof typeof supplierDetails,
    value: string | number
  ) => {
    dispatch(setSupplierField({ field, value: value.toString() })); // Convert value to string if needed
  };

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
        Supplier Details
      </Typography>
      <Grid container spacing={3}>
        {/* Supplier Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Supplier Name"
            fullWidth
            required
            value={supplierDetails.SupplierName}
            onChange={(e) => handleInputChange("SupplierName", e.target.value)}
          />
        </Grid>

        {/* Vendor Type */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Vendor Type"
            fullWidth
            required
            value={supplierDetails.VendorType || ""}
            onChange={(e) => handleInputChange("VendorType", e.target.value)}
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </TextField>
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={12}>
          <TextField
            label="Address"
            fullWidth
            required
            value={supplierDetails.Address || ""}
            onChange={(e) => handleInputChange("Address", e.target.value)}
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Country"
            fullWidth
            required
            value={supplierDetails.Country || ""}
            onChange={handleCountryChange}
          >
            {Object.keys(countriesWithCities).map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* City */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="City"
            fullWidth
            required
            value={supplierDetails.City || ""}
            onChange={(e) => handleInputChange("City", e.target.value)}
            disabled={!availableCities.length}
          >
            {availableCities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Mobile */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Mobile"
            fullWidth
            required
            value={supplierDetails.contactPersonMobile || ""}
            onChange={(e) =>
              handleInputChange("contactPersonMobile", e.target.value)
            } // Keep as string
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            required
            type="email"
            value={supplierDetails.Email}
            onChange={(e) => handleInputChange("Email", e.target.value)}
          />
        </Grid>
      </Grid>
      <Typography
        variant="subtitle1"
        sx={{
          margin: "20px 0",
          color: "rgb(0, 57, 94)",
          fontWeight: "bold",
        }}
      >
        Contact Details
      </Typography>
      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="First Name"
            fullWidth
            required
            value={supplierDetails.FirstName}
            onChange={(e) => handleInputChange("FirstName", e.target.value)}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Last Name"
            fullWidth
            required
            value={supplierDetails.LastName}
            onChange={(e) => handleInputChange("LastName", e.target.value)}
          />
        </Grid>

        {/* Contact Person Mobile */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Contact Person Mobile"
            fullWidth
            required
            value={supplierDetails.contactPersonMobile || ""}
            onChange={(e) =>
              handleInputChange("contactPersonMobile", e.target.value)
            } // Keep as string
          />
        </Grid>

        {/* Contact Person Email */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Contact Person Email"
            fullWidth
            required
            type="email"
            value={supplierDetails.contactPersonEmail}
            onChange={(e) =>
              handleInputChange("contactPersonEmail", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierDetailsForm;
