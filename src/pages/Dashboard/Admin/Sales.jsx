import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from 'react-helmet-async';

const Sales = () => {
  const axiosSecure = useAxiosSecure();
  const tableRef = useRef(null);

  const { data: sales = [] } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Medicine Name', 'Email', 'Price', 'Date', 'Seller Email']],
      body: (filteredSales.length ? filteredSales : sales).map(sale => [
        sale.nameOfMedicine,
        sale.email,
        sale.price,
        new Date(sale.date).toLocaleDateString(),
        sale.seller_email
      ])
    });
    doc.save('sales_report.pdf');
  };

  // Filter sales by date
  const handleDateFilter = () => {
    if (startDate && endDate) {
      const startTimestamp = new Date(startDate).setHours(0, 0, 0, 0);
      const endTimestamp = new Date(endDate).setHours(23, 59, 59, 999);

      const filtered = sales.filter(sale => {
        const saleTimestamp = new Date(sale.date).getTime();
        return saleTimestamp >= startTimestamp && saleTimestamp <= endTimestamp;
      });
      setFilteredSales(filtered);
    } else {
      setFilteredSales(sales);
    }
    setCurrentPage(1); 
  };

  // Pagination logic
  const totalPages = Math.floor((filteredSales.length ? filteredSales : sales).length / itemsPerPage) + ((filteredSales.length ? filteredSales : sales).length % itemsPerPage === 0 ? 0 : 1);
  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = (filteredSales.length ? filteredSales : sales).slice(indexOfFirstSale, indexOfLastSale);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Helmet>
        <title>MediCorner | All Sales Report</title>
      </Helmet>
      <div className="p-4 dark:bg-gray-100 dark:text-black">
        <h1 className='text-2xl md:4xl font-semibold text-center mt-6'>
          All Sales Report
        </h1>

        <div className="flex justify-center mt-4 mb-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="mr-2 p-1 text-center border-2 border-primary rounded-md"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            className="mr-2 p-1 text-center border-2 border-primary rounded-md"
          />
          <button
            onClick={handleDateFilter}
            className="bg-green-600 text-white py-1 px-3 rounded"
          >
            Filter
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button onClick={exportPDF} className="bg-orange-500 text-white py-1 px-3 rounded mr-2">Export PDF</button>
        </div>

        <div className="overflow-x-auto my-8">
          {
            <table className="table font-medium border border-black" ref={tableRef}>
              {/* head */}
              <thead className="w-full">
                <tr className='bg-primary text-white text-center'>
                  <th>#</th>
                  <th>Total Price</th>
                  <th>Medicine Name</th>
                  <th>Date</th>
                  <th>Buyer Email</th>
                  <th>Seller Email</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {(currentSales).map((item, index) => (
                  <tr key={item._id}>
                    <td className='border border-black'>{indexOfFirstSale + index + 1}</td>
                    <td className='border border-black'> $ {item.price} </td>
                    <td className='border border-black'>{item.nameOfMedicine}</td>
                    <td className='border border-black'>{new Date(item.date).toLocaleDateString()}</td>
                    <td className='border border-black'>{item?.email}</td>
                    <td className='border border-black'>{item?.seller_email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition duration-300 ease-in-out`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition duration-300 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
