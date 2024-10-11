import * as React from "react";
import SupplierDetailsForm from "./Forms/SupplierDetailsForm";
import PaymentDetailsForm from "./Forms/PaymentDetailsForm";
import BankingDetailsForm from "./Forms/BankingDetailsForm";
import SaveAndSubmitForm from "./Forms/SaveAndSubmitForm";
import { Tabs, Tab, Box, Typography, Slide } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchSupplierById, resetSupplierState } from "./store/supplierSlice";
import { getQueryParams } from "./utils/utils";
import { styled } from "@mui/system";

// Custom styles for the animated tab indicator
const StyledTabs = styled(Tabs)({
  position: "relative",
  '& .MuiTabs-indicator': {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "48px",
    '& > div': {
      width: "100%",
      backgroundColor: "rgb(0, 57, 94)", // Tab indicator background color
      borderRadius: "24px", // Rounded effect for the indicator
      transition: "all 0.4s ease", // Smooth animation
    },
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  minWidth: "100px",
  fontWeight: "bold",
  marginRight: "12px",
  color: "rgb(0, 57, 94)", // Non-selected tab text color
  "&.Mui-selected": {
    color: "#fff", // White text color for the selected tab
    zIndex: 1, // Ensures text stays above the indicator
  },
});

const SupplierCreation: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const dispatch = useDispatch();
  const { recordId } = getQueryParams();
  const [direction, setDirection] = React.useState<"left" | "right">("left");

  // Fetch supplier data if recordId is present (update mode)
  React.useEffect(() => {
    if (recordId) {
      dispatch(fetchSupplierById(recordId));
    }
  }, [recordId, dispatch]);

  // Handle tab change with animation direction
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setDirection(newValue > activeTab ? "left" : "right");
    setActiveTab(newValue);
  };

  // Reset supplier state when component unmounts or recordId changes
  React.useEffect(() => {
    return () => {
      dispatch(resetSupplierState());
    };
  }, [dispatch, recordId]);

  return (
    <div>
      <Typography
          variant="h5"
          gutterBottom
          align="center"
          style={{
            fontWeight: "bold",
            backgroundColor: "rgb(0, 57, 94)",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
        Supplier Registration Request
      </Typography>

      <Box >
        <StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            children: <div />, // Custom indicator style
          }}
        >
          <StyledTab label="Supplier Details" />
          <StyledTab label="Payment and Invoice Details" />
          <StyledTab label="Banking Details" />
          <StyledTab label="Save and Submit" />
        </StyledTabs>
      </Box>

      <Box sx={{ padding: 3 }}>
        <Slide direction={direction} in={activeTab === 0} mountOnEnter unmountOnExit>
          <div>{activeTab === 0 && <SupplierDetailsForm />}</div>
        </Slide>
        <Slide direction={direction} in={activeTab === 1} mountOnEnter unmountOnExit>
          <div>{activeTab === 1 && <PaymentDetailsForm />}</div>
        </Slide>
        <Slide direction={direction} in={activeTab === 2} mountOnEnter unmountOnExit>
          <div>{activeTab === 2 && <BankingDetailsForm />}</div>
        </Slide>
        <Slide direction={direction} in={activeTab === 3} mountOnEnter unmountOnExit>
          <div>{activeTab === 3 && <SaveAndSubmitForm setActiveTab={setActiveTab}/>}</div>
        </Slide>
      </Box>
    </div>
  );
};

export default SupplierCreation;
