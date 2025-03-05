// import { useState } from "react";

// const ReportForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     advertiser: "",
//     date: "",
//     platforms: "",
//     category: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
//       <input
//         type="text"
//         name="advertiser"
//         placeholder="Advertiser"
//         value={formData.advertiser}
//         onChange={handleChange}
//         className="w-full mb-2 p-2 border"
//       />
//       <input
//         type="date"
//         name="date"
//         value={formData.date}
//         onChange={handleChange}
//         className="w-full mb-2 p-2 border"
//       />
//       <input
//         type="text"
//         name="platforms"
//         placeholder="Platforms"
//         value={formData.platforms}
//         onChange={handleChange}
//         className="w-full mb-2 p-2 border"
//       />
//       <input
//         type="text"
//         name="category"
//         placeholder="Category"
//         value={formData.category}
//         onChange={handleChange}
//         className="w-full mb-2 p-2 border"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Generate PDF
//       </button>
//     </form>
//   );
// };

// export default ReportForm;



import { useState } from "react";

const ReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    advertiser: "",
   
    platforms: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-[#149777] text-center mb-4">
        Report Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Advertiser */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Advertiser</label>
          <input
            type="text"
            name="advertiser"
            placeholder="Enter Advertiser Name"
            value={formData.advertiser}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#149777] focus:outline-none"
            required
          />
        </div>

    

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Platforms</label>
          <input
            type="text"
            name="platforms"
            placeholder="e.g. Android, Web, iOS"
            value={formData.platforms}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#149777] focus:outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#149777] focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#149777] text-white font-semibold py-2 px-4 rounded hover:bg-[#128066] transition-all duration-300"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
};

export default ReportForm;





