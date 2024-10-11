import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sp } from "@pnp/sp";

// Define the AttachmentState
export interface AttachmentState {
  fetchedAttachments: Array<{ FileName: string; ServerRelativeUrl: string }>;
}

// Initial state for attachments
const initialState: AttachmentState = {
  fetchedAttachments: [],
};

sp.setup({
    sp: {
      baseUrl: "https://58ryfc.sharepoint.com/sites/SupplierCreation", // Correct Site URL
    },
  });

// Fetch attachments
export const fetchAttachments = createAsyncThunk(
  "attachments/fetchAttachments",
  async (supplierId: number, { rejectWithValue }) => {
    try {
      const attachments = await sp.web.lists
        .getByTitle("SupplierList")
        .items.getById(supplierId)
        .attachmentFiles.get();
      return attachments;
    } catch (error) {
      console.error("Error fetching attachments:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Add attachment
export const addAttachment = createAsyncThunk(
  "attachments/addAttachment",
  async ({ supplierId, file }: { supplierId: number; file: File }, { rejectWithValue }) => {
    try {
      await sp.web.lists
        .getByTitle("SupplierList")
        .items.getById(supplierId)
        .attachmentFiles.add(file.name, file);
      return file; // Return the added file for further processing if needed
    } catch (error) {
      console.error("Error adding attachment:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Delete attachment
export const deleteAttachment = createAsyncThunk(
  "attachments/deleteAttachment",
  async ({ supplierId, fileName }: { supplierId: number; fileName: string }, { rejectWithValue }) => {
    try {
      await sp.web.lists
        .getByTitle("SupplierList")
        .items.getById(supplierId)
        .attachmentFiles.getByName(fileName)
        .delete();
      return fileName; // Return the name of the deleted file for further processing if needed
    } catch (error) {
      console.error("Error deleting attachment:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create the attachment slice
const attachmentSlice = createSlice({
  name: "attachments",
  initialState,
  reducers: {
    resetAttachments: (state) => {
      state.fetchedAttachments = []; // Reset attachments to initial state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttachments.fulfilled, (state, action) => {
      state.fetchedAttachments = action.payload; // Set fetched attachments
    });
    builder.addCase(addAttachment.fulfilled, (state, action) => {
      if (action.payload) {
        state.fetchedAttachments.push({
          FileName: action.payload.name,
          ServerRelativeUrl: `${sp.web.toUrl()}/path-to-attachments/${action.payload.name}`, // Update URL based on your structure
        });
      }
    });
    builder.addCase(deleteAttachment.fulfilled, (state, action) => {
      state.fetchedAttachments = state.fetchedAttachments.filter(file => file.FileName !== action.payload); // Remove deleted attachment from state
    });
  },
});

// Export actions and reducer
export const { resetAttachments } = attachmentSlice.actions;
export default attachmentSlice.reducer;
