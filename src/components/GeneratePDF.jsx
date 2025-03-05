// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const GeneratePDF = ({ formData, dateRange, summary, csvData }) => {
//   const handleGeneratePDF = () => {
//     if (!formData || !csvData.length) {
//       alert("Please upload a CSV file and fill out the form before generating the PDF.");
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(12);

//     // Title
//     doc.text("CSV Report Summary", 10, 10);

//     // Form Data
//     doc.text(`Advertiser: ${formData.advertiser}`, 10, 20);
//     doc.text(`Date: ${formData.date}`, 10, 30);
//     doc.text(`Platforms: ${formData.platforms}`, 10, 40);
//     doc.text(`Category: ${formData.category}`, 10, 50);

//     // Date Range
//     doc.text(`Report Date Range: ${dateRange}`, 10, 70);

//     // Summary Data
//     doc.text("Summary:", 10, 90);
//     doc.text(`Total Ad Server Impressions: ${summary.impressions}`, 10, 100);
//     doc.text(`Total Ad Server Clicks: ${summary.clicks}`, 10, 110);
//     doc.text(`Total Ad Server CTR: ${summary.ctr}`, 10, 120);

//     // Table with Extracted Data
//     autoTable(doc, {
//       startY: 140,
//       head: [["Line Item", "Date", "Impressions", "Clicks", "CTR"]],
//       body: csvData.map(row => [
//         row.lineItem,
//         row.date,
//         row.impressions,
//         row.clicks,
//         row.ctr,
//       ]),
//       theme: "grid",
//       styles: { fontSize: 10 },
//     });

//     // Save PDF
//     doc.save("report.pdf");
//   };

//   return (
//     <button
//       onClick={handleGeneratePDF}
//       className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
//     >
//       Download PDF
//     </button>
//   );
// };

// export default GeneratePDF;



import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GeneratePDF = ({ formData, dateRange, summary, csvData }) => {
  const handleGeneratePDF = async () => {
    if (!formData || !csvData.length) {
      alert("Please upload a CSV file and fill out the form before generating the PDF.");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Load image from the public folder
    const img = new Image();
    img.src = "/bikroy_Image.png"; // Path relative to public folder

    img.onload = () => {
      doc.setFillColor(255, 255, 255); // White background
      doc.rect(0, 0, 210, 297, "F");

      // Add Image
      doc.addImage(img, "PNG", 75, 10, 60, 20);

      // Title with custom color
      doc.setFontSize(22);
      doc.setTextColor(20, 151, 119); // #149777 color
      doc.text("AD Banner Report", 70, 40);

      // Form Data Section
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Advertiser: ${formData.advertiser}`, 10, 55);
      doc.text(`Platforms: ${formData.platforms}`, 10, 65);
      doc.text(`Category: ${formData.category}`, 10, 75);

      // Report Date Range
      doc.setFontSize(14);
      doc.setTextColor(20, 151, 119);
      doc.text(`Report Date: ${dateRange}`, 10, 90);

      // Summary Data
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Summary:", 10, 105);
      doc.text(`Total Ad Server Impressions: ${summary.impressions}`, 10, 115);
      doc.text(`Total Ad Server Clicks: ${summary.clicks}`, 10, 125);
      doc.text(`Total Ad Server CTR: ${summary.ctr}`, 10, 135);

      // Table with CSV Data
      autoTable(doc, {
        startY: 150,
        head: [["Line Item", "Date", "Impressions", "Clicks", "CTR"]],
        body: csvData.map(row => [
          row.lineItem,
          row.date,
          row.impressions,
          row.clicks,
          row.ctr,
        ]),
        theme: "grid",
        headStyles: { fillColor: [20, 151, 119], textColor: [255, 255, 255] }, // Header Color #149777
        styles: { fontSize: 10 },
      });

      // Save PDF
      doc.save("ad_banner_report.pdf");
    };
  };

  return (
    <div className="flex justify-center">
        <button
      onClick={handleGeneratePDF}
      className="bg-[#149777] text-white p-2 rounded mt-4 hover:bg-[#128066] w-40 text-center"
    >
      Download PDF
    </button>
    </div>
  );
};

export default GeneratePDF;
