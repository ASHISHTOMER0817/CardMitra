"use client";
import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { order } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import { useRouter } from "next/navigation";

// Define the result type
interface SyncResult {
  matchedOrders: {trackingID: number, orderDetails: order}[];
  unmatchedIds: number[];
}

const SyncOrders: React.FC = () => {
  const [fileData, setFileData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult>({ matchedOrders: [], unmatchedIds: [] });
  const [error, setError] = useState<string | null>(null);

  // Handle Excel File Upload
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"].includes(file.type)) {
//       setError("Invalid file type. Please upload an Excel file.");
//       return;
//     }

//     setError(null);

//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = new Uint8Array(event?.target?.result as ArrayBuffer);
//       const workbook = XLSX.read(data, { type: "array" });

//       // Assuming the first sheet contains the data
//       const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//       const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

//       // Extract the first column (tracking IDs)
//       const trackingIds = jsonData.map((row: any) => row[0]).filter(Boolean);

//       setFileData(trackingIds);
//     };

//     reader.readAsArrayBuffer(file);
//   };

    // Handle Excel/CSV File Upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        // Validate file type
        if (!["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"].includes(file.type)) {
            setError("Invalid file type. Please upload an Excel or CSV file.");
            return;
        }
    
        setError(null);
    
        const reader = new FileReader();
    
        // Handle Excel files
        if (file.type.includes("excel")) {
            reader.onload = (event) => {
                const data = new Uint8Array(event?.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
        
                // Assuming the first sheet contains the data
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        
                // Extract the first column (tracking IDs)
                const trackingIds = jsonData.map((row: any) => row[0]).filter(Boolean);
        
                setFileData(trackingIds);
            };
        
            reader.readAsArrayBuffer(file);
        }
    
        // Handle CSV files
        if (file.type === "text/csv") {
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const rows = text.split("\n");
        
                // Extract the first column (tracking IDs)
                const trackingIds = rows.map((row) => row.split(",")[0].trim()).filter(Boolean);
        
                setFileData(trackingIds);
            };
        
            reader.readAsText(file);
        }
    };
  

  // Handle Sync Orders
  const handleSyncOrders = async () => {
    if (!fileData) return;

    setLoading(true);

    console.log('filedata: ', fileData);

    try {
      const response = await axios.post("/api/sync-orders", { trackingIds: fileData });
      setResult(response.data);
    } catch (error) {
      console.error("Error syncing orders:", error);
      setError("Failed to sync orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const onMarkDeliver = async () => {
    try {
      const matchedIds = result.matchedOrders.map(({orderDetails})=> orderDetails._id); // Assuming 'result' holds the matched IDs

      // Make sure there are IDs to send
      if (!matchedIds || matchedIds.length === 0) {
        alert('No matched IDs to mark as delivered.');
        return;
      }

      // Confirm action
      const confirmDelivery = confirm(`Are you sure you want to mark ${matchedIds.length} orders as delivered?`);
      if (!confirmDelivery) return;

      // Send POST request to the backend
      const response = await axios.post('/api/orders/markDelivered/', {
        order_ids: matchedIds,
      });

      // Handle success response

      const router = useRouter();

      if (response.data.success) {
        Popup("success", response.data.message);
        setTimeout(() => {
          router.refresh(); // Refresh the page in Next.js
        }, 2000); // Adjust the delay as needed
      } else {
        Popup("error", response.data.message);
      }

    } catch (error) {
      console.error('Error marking orders as delivered:', error);
      alert('Failed to mark orders as delivered.');
    }
  };


  return (
    <div className="mx-6 w-[95%] mt-3 md:text-xs sm:mx-0 sm:w-full">
      <h5 className="mb-4 text-xl font-semibold">Upload Excel Sheet</h5>

      <div className="text-sm text-red-500 mb-3">The first column of every row must be the Tracking ID of the order.</div>

      {/* File Upload */}
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {/* Error Message */}
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* Sync Orders Button */}
      {fileData && (
        <button
          onClick={handleSyncOrders}
          className="bg-primaryBgClr inline-block px-4 py-2 font-semibold text-base rounded-full border text-center w-auto text-white md:w-[100px] md:mt-4 sm:mx-auto sm:text-sm"
          disabled={loading}
        >
          {loading ? "Syncing Orders..." : "Sync Orders"}
        </button>
      )}

      {/* Result Display */}
      {(result.matchedOrders.length > 0 || result.unmatchedIds.length > 0) && (
        <div className="">
            <h6>Result: </h6>
            <div className="mt-4">
                <p>✅ Matched Orders: {result.matchedOrders.length}</p>
                <p>❌ Unmatched Orders: {result.unmatchedIds.length}</p>
            </div>

            {
                result.unmatchedIds.length > 0 && (
                    <div className="overflow-x-auto bg-white p-3 shadow-md rounded-[8px] mt-3">
                        <span>The Tracking IDs which went unmatched are: </span>
                        <span>
                          { result.unmatchedIds.join(', ') || 'None'}
                        </span>
                    </div>
                )
            }
            {
                result.matchedOrders.length > 0 && (

                <div className="overflow-x-auto bg-white p-3 shadow-md rounded-[8px] mt-3">
                  <div className="mb-3">The matched orders are as follows:</div> 

                  <table className="min-w-full divide-y divide-gray-200 text-nowrap">

                    <thead className="bg-green-100">
                      <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                        Tracking ID
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                        Order Date
                      </th>
                      
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                        User Name
                      </th>
                      
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                        Product
                      </th>
                      
                      </tr>
                    </thead>
                    
                    <tbody>
                      {result.matchedOrders?.map(( {trackingID, orderDetails}, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>

                          <td className="py-4 px-6 text-gray-500">
                            {trackingID}
                          </td>
                          
                          <td className="py-4 px-6 text-gray-500">
                            {new Date(orderDetails.orderedAt).toDateString()}
                          </td>
                          <td className="py-4 px-6 text-gray-500">
                            {orderDetails.ordererName}
                          </td>
                          <td className="py-4 px-6 text-gray-500">
                            {orderDetails.product.name}
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>

                  </table>

                  <button onClick={onMarkDeliver} className="bg-primaryBgClr mt-3 float-right inline-block px-4 py-2 font-semibold text-base rounded-full border text-center w-auto text-white md:w-[100px] md:mt-4 sm:mx-auto sm:text-sm">
                    Mark as Delivered
                  </button>
                </div>
                )
              }

             
        </div>
      )}
    </div>
  );
};

export default SyncOrders;
