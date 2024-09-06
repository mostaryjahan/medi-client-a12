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
            head: [['Medicine Name','Email', 'Price', 'Date','Seller Email']],
            body:  (filteredSales.length ? filteredSales : sales).map(sale => [
               sale.nameOfMedicine,
                sale.email,
                sale.price,
                new Date(sale.date).toLocaleDateString(),
                sale.seller_email
            ])
        });
        doc.save('sales_report.pdf');
    };

    const [filteredSales, setFilteredSales] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

 
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
    };



  return (
    <div>
             <Helmet>
        <title>MediCorner | All sales report</title>
      </Helmet>
      <div className="p-4 dark:bg-gray-100 dark:text-black">

     
        <h1 className='text-2xl md:4xl font-semibold text-center mt-6'>
          All  Sales Report
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
                    className="mr-2  p-1 text-center  border-2 border-primary rounded-md"
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
                

      <div className="overflow-x-auto my-8 w-full">
        {
          <table className="table font-medium border border-black" ref={tableRef}>
            {/* head */}
            <thead className="w-full  ">
              <tr className='bg-primary text-white'>
                <th>#</th>
                <th>Total Price</th>
                <th>Medicine Name</th>
                <th>Date</th>
                <th>Buyer Email</th>
                <th>seller Email</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {/* row 1 */}

              {(filteredSales.length ? filteredSales : sales).map((item, index) => (
                <tr key={item._id}>
                  <td className='border border-black'>{index + 1}</td>

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
    </div>
    </div>
  );
};

export default SalesReport;








