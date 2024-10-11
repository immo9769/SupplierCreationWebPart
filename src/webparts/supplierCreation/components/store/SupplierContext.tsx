// import * as React from "react";

// import { createContext, useContext, useState } from 'react';
// import { sp } from '@pnp/sp';

// interface SupplierContextType {
//   supplierData: any;
//   setSupplierData: React.Dispatch<React.SetStateAction<any>>;
//   fetchSupplierById: (vendorId: number) => Promise<void>;
//   createSupplier: (data: any) => Promise<void>;
//   updateSupplier: (vendorId: number, data: any) => Promise<void>;
// }

// const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

// export const SupplierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [supplierData, setSupplierData] = useState<any>(null);

//   // Fetch supplier details by vendorId
//   const fetchSupplierById = async (vendorId: number): Promise<void> => {
//     try {
//       const result = await sp.web.lists.getByTitle('SupplierList').items.getById(vendorId).get();
//       setSupplierData(result);
//     } catch (error) {
//       console.error('Error fetching supplier by ID:', error);
//     }
//   };

//   // Create a new supplier
//   const createSupplier = async (data: any): Promise<void> => {
//     try {
//       await sp.web.lists.getByTitle('SupplierList').items.add(data);
//       console.log('Supplier created successfully');
//     } catch (error) {
//       console.error('Error creating supplier:', error);
//     }
//   };

//   // Update an existing supplier
//   const updateSupplier = async (vendorId: number, data: any): Promise<void> => {
//     try {
//       await sp.web.lists.getByTitle('SupplierList').items.getById(vendorId).update(data);
//       console.log('Supplier updated successfully');
//     } catch (error) {
//       console.error('Error updating supplier:', error);
//     }
//   };

//   return (
//     <SupplierContext.Provider value={{ supplierData, setSupplierData, fetchSupplierById, createSupplier, updateSupplier }}>
//       {children}
//     </SupplierContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useSupplierContext = () => {
//   const context = useContext(SupplierContext);
//   if (!context) {
//     throw new Error('useSupplierContext must be used within a SupplierProvider');
//   }
//   return context;
// };
