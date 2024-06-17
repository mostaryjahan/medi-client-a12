import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from 'react-helmet-async';

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const tableRef = useRef(null);
  
  const { data: sales = [] } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });
  // console.log(sales);
  
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Email', 'Price', 'Date']],
            body:  (filteredSales.length ? filteredSales : sales).map(sale => [
                sale.email,
                sale.price,
                new Date(sale.date).toLocaleDateString()
            ])
        });
        doc.save('sales_report.pdf');
    };

    const [filteredSales, setFilteredSales] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateFilter = () => {
        if (startDate && endDate) {
         
            const filtered = sales.filter(sale => {
                const saleDate = new Date(sale.date).getTime();
                return saleDate >= new Date(startDate).setHours(0, 0, 0, 0) && saleDate <= new Date(endDate).setHours(23, 59, 59, 999);

            });
            setFilteredSales(filtered);
        } else {
            setFilteredSales(sales);
        }
    };



  return (
    <div>
        <h1 className='text-2xl md:4xl font-semibold text-center mt-6'>
            Sales Report
        </h1>
        <Helmet>
            medi corner | sales report
        </Helmet>
                    <div className="flex justify-center mt-4 mb-4">
                 <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="mr-2"
                />
                 <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    className="mr-2"
                />
                <button
                    onClick={handleDateFilter}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                    Filter
                </button>
            </div>
                   <div className="flex justify-center mt-4">
                <button onClick={exportPDF} className="bg-red-500 text-white py-1 px-3 rounded mr-2">Export PDF</button>
                </div>
                

      <div className="overflow-x-auto my-16 border-2 w-full">
        {
          <table className="table font-bold" ref={tableRef}>
            {/* head */}
            <thead className="w-full border-2 ">
              <tr>
                <th>#</th>
                <th>Total Price</th>
                <th>Medicine Name</th>
                <th>Buyer Email</th>
                <th>seller Email</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {/* row 1 */}

              {(filteredSales.length ? filteredSales : sales).map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td> $ {item.price} </td>
                  <td>{item.nameOfMedicine}</td>
                  <td>{item?.email}</td>
                  <td>{item?.seller_email}</td>
                </tr>
              
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default SalesReport;








