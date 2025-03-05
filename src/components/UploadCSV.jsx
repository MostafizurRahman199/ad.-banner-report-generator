// import { useState } from "react";
// import Papa from "papaparse";

// const UploadCSV = ({ onUpload }) => {
//   const [csvData, setCsvData] = useState([]);
//   const [summary, setSummary] = useState({});
//   const [dateRange, setDateRange] = useState("");

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         const rawData = result.data;

//         if (rawData.length < 10) {
//           alert("Invalid CSV format. Please check your file.");
//           return;
//         }

//         // Extract Date Range (From metadata, find "Date range" row)
//         const dateRangeRow = rawData.find(row => row[0]?.includes("Date range"));
//         const extractedDateRange = dateRangeRow ? dateRangeRow[1] : "N/A";

//         // Extract Last Row (Total Impressions, Clicks, CTR)
//         const lastRow = rawData[rawData.length - 1]; 
//         const lastRowLength = lastRow.length;

//         const summary = {
//           impressions: lastRow[lastRowLength - 3] || "N/A", // Ad server impressions
//           clicks: lastRow[lastRowLength - 2] || "N/A", // Ad server clicks
//           ctr: lastRow[lastRowLength - 1] || "N/A", // Ad server CTR
//         };

//         // Find header row (It contains "Line item" as a column)
//         const headerRowIndex = rawData.findIndex(row => row.includes("Line item"));
//         const headers = rawData[headerRowIndex]; 

//         // Identify column indexes of required fields
//         const colIndexes = {
//           lineItem: headers.indexOf("Line item"),
//           date: headers.indexOf("Date"),
//           impressions: headers.indexOf("Ad server impressions"),
//           clicks: headers.indexOf("Ad server clicks"),
//           ctr: headers.indexOf("Ad server CTR"),
//         };

//         // Extract table data from CSV (Ignoring metadata and only keeping required fields)
//         const records = rawData.slice(headerRowIndex + 1, rawData.length - 1).map(row => ({
//           lineItem: row[colIndexes.lineItem] || "N/A",
//           date: row[colIndexes.date] || "N/A",
//           impressions: row[colIndexes.impressions] || "0",
//           clicks: row[colIndexes.clicks] || "0",
//           ctr: row[colIndexes.ctr] || "0%",
//         }));

//         setCsvData(records);
//         setSummary(summary);
//         setDateRange(extractedDateRange);
//         onUpload(extractedDateRange, summary, records);
//       },
//       header: false, // Since CSV has metadata, we handle headers manually
//       skipEmptyLines: true,
//     });
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-md">
//       <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-2" />
//       {csvData.length > 0 && (
//         <p className="text-green-600">CSV Uploaded: {csvData.length} rows</p>
//       )}
//     </div>
//   );
// };

// export default UploadCSV;



import { useState } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react"; // Using an icon for better UI

const UploadCSV = ({ onUpload }) => {
  const [csvData, setCsvData] = useState([]);
  const [summary, setSummary] = useState({});
  const [dateRange, setDateRange] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name); // Store the file name for UI feedback

    Papa.parse(file, {
      complete: (result) => {
        const rawData = result.data;

        if (rawData.length < 10) {
          alert("Invalid CSV format. Please check your file.");
          return;
        }

        // Extract Date Range (From metadata, find "Date range" row)
        const dateRangeRow = rawData.find(row => row[0]?.includes("Date range"));
        const extractedDateRange = dateRangeRow ? dateRangeRow[1] : "N/A";

        // Extract Last Row (Total Impressions, Clicks, CTR)
        const lastRow = rawData[rawData.length - 1]; 
        const lastRowLength = lastRow.length;

        const summary = {
          impressions: lastRow[lastRowLength - 3] || "N/A", // Ad server impressions
          clicks: lastRow[lastRowLength - 2] || "N/A", // Ad server clicks
          ctr: lastRow[lastRowLength - 1] || "N/A", // Ad server CTR
        };

        // Find header row (It contains "Line item" as a column)
        const headerRowIndex = rawData.findIndex(row => row.includes("Line item"));
        const headers = rawData[headerRowIndex]; 

        // Identify column indexes of required fields
        const colIndexes = {
          lineItem: headers.indexOf("Line item"),
          date: headers.indexOf("Date"),
          impressions: headers.indexOf("Ad server impressions"),
          clicks: headers.indexOf("Ad server clicks"),
          ctr: headers.indexOf("Ad server CTR"),
        };

        // Extract table data from CSV (Ignoring metadata and only keeping required fields)
        const records = rawData.slice(headerRowIndex + 1, rawData.length - 1).map(row => ({
          lineItem: row[colIndexes.lineItem] || "N/A",
          date: row[colIndexes.date] || "N/A",
          impressions: row[colIndexes.impressions] || "0",
          clicks: row[colIndexes.clicks] || "0",
          ctr: row[colIndexes.ctr] || "0%",
        }));

        setCsvData(records);
        setSummary(summary);
        setDateRange(extractedDateRange);
        onUpload(extractedDateRange, summary, records);
      },
      header: false, // Since CSV has metadata, we handle headers manually
      skipEmptyLines: true,
    });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg mx-auto border border-gray-200">
      {/* Title */}
      <h2 className="text-3xl font-bold text-[#149777] text-center mb-6">
        Upload CSV File
      </h2>

      {/* File Upload Box */}
      <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#149777] rounded-lg cursor-pointer hover:bg-[#f7f7f7] transition-all duration-300">
        <Upload size={30} className="text-[#149777]" />
        <span className="text-[#149777] mt-2 font-semibold">Click to Upload</span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {/* Display Uploaded File Name */}
      {fileName && (
        <p className="mt-3 text-center text-sm text-gray-600">
          <strong className="text-[#149777]">File:</strong> {fileName}
        </p>
      )}

      {/* Success Message */}
      {csvData.length > 0 && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          CSV Uploaded: {csvData.length} rows
        </p>
      )}
    </div>
  );
};

export default UploadCSV;
