import { useState } from "react";
import UploadCSV from "./components/UploadCSV";
import ReportForm from "./components/ReportForm";
import GeneratePDF from "./components/GeneratePDF";

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [summary, setSummary] = useState({});
  const [dateRange, setDateRange] = useState("");
  const [formData, setFormData] = useState(null);

  const handleCSVUpload = (dateRange, summary, data) => {
    setDateRange(dateRange);
    setSummary(summary);
    setCsvData(data);
  };

  return (
    // <div className="w-10/12  mx-auto mt-10 flex flex-col  gap-10">
   <div className="w-full min-h-screen mx-auto text-[#149777] font-bold">
        <div className="flex justify-center mt-2">
        <img src="https://bikroy.com/facebook-opengraph.png" className="w-24" alt="" />
        </div>
        <h1 className="text-center text-4xl mb-20">Make Ad. Banner Report</h1>
     <div className="w-full grid-cols-1 lg:grid grid-cols-2 gap-4   justify-center items-center">
      <div>
      <UploadCSV onUpload={handleCSVUpload} />

      </div>
     <div>
      <ReportForm onSubmit={setFormData} />
      {formData && (
        <GeneratePDF formData={formData} dateRange={dateRange} summary={summary} csvData={csvData} />
      )}

     </div>
    </div>
   </div>
  );
};

export default App;
