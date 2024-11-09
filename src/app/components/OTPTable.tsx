import { order } from "@/interface/productList";
import React, { useState } from "react";


const exportTableToExcel = () => {
    const table = document.getElementById('otp-table');
	if(!table)return;
    const rows = table.querySelectorAll('tr');

    let csvContent = '';

	rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData: string[] = [];
		
		cols.forEach(col => {
			
			const text = (col as HTMLElement).innerText.replace(/,/g, ''); // Cast to HTMLElement to access innerText
            rowData.push(text);
			
        });
		
		csvContent += rowData.join(',') + '\n'; // Add a new line after each row
    });

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'table.csv'); // use .csv extension
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

};

interface OTPTableProps {
    orders: order[];
}
  

const OTPTable: React.FC<OTPTableProps> = ({ orders }) =>{
    return (
        
        <>
            <div className="flex mb-3">

                <button
                    onClick={exportTableToExcel}
                    
                    className={`cursor-pointer hover:bg-gray-200 ml-auto text-primaryBgClr`}
                >
                    Download CSV
                </button>
            </div>
                    
            <div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
                <table id="otp-table" className="min-w-full divide-y divide-gray-200 text-nowrap">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                Order Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                Device
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                OTP
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                Last 4 digits
                            </th>
                            
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                Pincode
                            </th>
                            
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                Tracking ID
                            </th>
                            
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
                                Order Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map(
                            (
                                {
                                    user,
                                    product,
                                    orderedAt,
                                    _id,
                                    trackingID,
                                    ordererName,
                                    otp,
                                    orderId,
                                    last4digits
                                },
                                index
                            ) => {

                                return (
                                    
                                    <tr
                                        key={
                                            index
                                        }
                                        className={
                                            index %
                                                2 ===
                                            0
                                                ? "bg-gray-100"
                                                : "bg-white"
                                        }
                                    >
                                        
                                        <td className="py-4 px-6 text-sm font-semibold text-primaryBgClr">
                                            {
                                                ordererName
                                            }
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {
                                                product.name
                                            }
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {
                                                otp
                                            }
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {
                                                last4digits
                                            }
                                        </td>
                                        
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {
                                                product.zipCode
                                            }
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            <span
                                                className="block overflow-hidden text-ellipsis whitespace-nowrap"
                                                title={trackingID}
                                            >
                                                {trackingID}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {orderedAt ? new Date(orderedAt).toDateString() : ''}
                                        </td>

                                        
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </>
        
        
    )
}

export default OTPTable;