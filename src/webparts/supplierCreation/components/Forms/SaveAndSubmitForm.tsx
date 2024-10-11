import * as React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // Adjust the path according to your structure
import {
  fetchAttachments,
  addAttachment,
  deleteAttachment,
  resetAttachments,
} from "../store/attachmentSlice"; // Attachment operations from the attachmentSlice
import { useDropzone } from "react-dropzone";
import {
  createSupplier,
  resetSupplierState,
  setSupplierField,
  updateSupplier,
} from "../store/supplierSlice"; // For supplier field handling
import { getQueryParams } from "../utils/utils";
import { toast } from "react-toastify"; // Import toast

const SaveAndSubmitForm: React.FC<{ setActiveTab: React.Dispatch<React.SetStateAction<number>> }> = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const { recordId } = getQueryParams();

  // Access supplier state
  const supplier = useSelector((state: RootState) => state.supplier);

  // Access attachments state from attachmentSlice
  const fetchedAttachments = useSelector(
    (state: RootState) => state.attachments.fetchedAttachments
  );

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  // Fetch attachments when the component mounts
  React.useEffect(() => {
    if (supplier.ID) {
      dispatch(fetchAttachments(Number(supplier.ID)));
    }
  }, [dispatch, supplier.ID]);

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles[0]); // Only store the first file
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Allow only single file uploads
  });

  // Handle adding attachments
  const handleAddAttachment = async (supplierId: number) => {
    if (uploadedFile) {
      try {
        await dispatch(addAttachment({ supplierId, file: uploadedFile }));
        toast.success("Attachment added successfully!"); // Success toast
        setUploadedFile(null); // Clear uploaded file after adding
      } catch (error) {
        toast.error("Error adding attachment."); // Error toast
      }
    }
  };
  // Delete attachment
  const handleDeleteAttachment = (fileName: string) => {
    if (supplier.ID) {
      dispatch(deleteAttachment({ supplierId: Number(supplier.ID), fileName }));
      toast.info("Attachment deleted successfully!");
    }
  };

  // Handle remark input
  const handleRemarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSupplierField({ field: "remark", value: event.target.value }));
  };

  // **Update** existing supplier if vendorId exists
  const handleUpdate = async (): Promise<void> => {
    if (recordId) {
      try {
        await dispatch(updateSupplier({ vendorId: recordId, data: supplier }));
        await handleAddAttachment(Number(recordId)); // Add attachments after updating
        toast.success("Supplier updated successfully!"); // Success toast
      } catch (error) {
        toast.error("Error updating supplier."); // Error toast
      }
    }
  };

  // **Save** a new supplier and update the URL with the new vendorId
  const handleSave = async (): Promise<void> => {
    try {
      const result = await dispatch(createSupplier(supplier));

      if (createSupplier.fulfilled.match(result)) {
        const createdSupplier = result.payload;

        // Handle attachments after supplier is created
        await handleAddAttachment(createdSupplier.ID); // Save attachments after creating
        toast.success("New supplier created successfully!"); // Success toast

        // Update URL with the newly created supplier ID
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}?vendorId=${createdSupplier.ID}`
        );
      } else {
        toast.error("Supplier creation failed."); // Error toast
      }
    } catch (error) {
      toast.error("Error during save."); // Error toast
    }
  };

  // **Create New** supplier after saving the current form
  const handleSaveAndCreateNew = async (): Promise<void> => {
    try {
      if (recordId) {
        await handleUpdate(); // Update the current supplier form
      } else {
        await handleSave(); // Create a new supplier if no vendorId is in the URL
      }
      // Reset the URL to remove vendorId
      window.history.pushState({}, "", window.location.pathname);

      // Reset the form for new entry
      dispatch(resetSupplierState());
      dispatch(resetAttachments());
      setActiveTab(0);
    } catch (error) {
      toast.error("Error during save or creating new supplier."); // Error toast
    }
  };

  return (
    <Box>
      {/* Remark Field */}
      <Typography variant="h6">Remark</Typography>
      <TextField
        label="Remark"
        multiline
        fullWidth
        rows={4}
        value={supplier.remark}
        onChange={handleRemarkChange}
        sx={{ marginBottom: "20px" }}
      />

      {/* Attachments Section */}
      <Typography variant="h6">Attachments</Typography>
      {fetchedAttachments && fetchedAttachments.length > 0 ? (
        <ul>
          {fetchedAttachments.map((file: any) => (
            <li key={file.FileName}>
              <a
                href={file.ServerRelativeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.FileName}
              </a>
              <Button
                onClick={() => handleDeleteAttachment(file.FileName)}
                color="secondary"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No attachments found.</Typography>
      )}

      {/* Drag and Drop Area */}
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          backgroundColor: isDragActive ? "#e0f7fa" : "white",
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? "Drop the file here..."
            : "Drag and drop a file here, or click to select a file"}
        </Typography>
      </Box>

      {/* Display uploaded file before submitting */}
      {uploadedFile && (
        <Box>
          <Typography variant="h6">File to be uploaded:</Typography>
          <ul>
            <li>{uploadedFile.name}</li>
          </ul>
        </Box>
      )}

      {/* Buttons for actions */}
      <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
        {recordId ? (
          <>
            <Button variant="contained" style={{ backgroundColor: 'rgb(0, 57, 94)' }}  onClick={handleUpdate}>
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveAndCreateNew}
            >
              Create New
            </Button>
          </>
        ) : (
          <Button variant="contained" style={{ backgroundColor: 'rgb(0, 57, 94)' }}  onClick={handleSave}>
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SaveAndSubmitForm;
