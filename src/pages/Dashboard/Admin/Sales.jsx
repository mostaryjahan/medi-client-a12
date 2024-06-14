import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Helmet } from 'react-helmet-async';

const SalesReport = () => {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await axios.get('/payments');
            if (Array.isArray(response.data)) {
                setSales(response.data);
                setFilteredSales(response.data);
            } else {
                setSales([]);
                setFilteredSales([]);
            }
        } catch (error) {
            console.error('Error fetching sales data', error);
            setSales([]);
            setFilteredSales([]);
        }
    };

    const handleDateFilter = () => {
        if (startDate && endDate) {
            const filtered = sales.filter(sale => {
                const saleDate = new Date(sale.date);
                return saleDate >= startDate && saleDate <= endDate;
            });
            setFilteredSales(filtered);
        } else {
            setFilteredSales(sales);
        }
    };

    const columns = [
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Price', selector: row => row.price, sortable: true },
        { name: 'Date', selector: row => new Date(row.date).toLocaleDateString(), sortable: true }
    ];

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Email', 'Price', 'Date']],
            body: filteredSales.map(sale => [
                sale.email,
                sale.price,
                new Date(sale.date).toLocaleDateString()
            ])
        });
        doc.save('sales_report.pdf');
    };

    return (
        <div>
            <Helmet>
                <title>Medi corner | Sales</title>
            </Helmet>
            <h1 className="font-bold text-3xl text-center mt-10">Sales Report</h1>
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
            <DataTable
                columns={columns}
                data={filteredSales}
                pagination
            />
                <div className="flex justify-center mt-4">
                {filteredSales.map(sale => (
                    <ul key={sale._id} className="">
                        <li>Email: {sale.email}</li>
                        <li>Price: {sale.price}</li>
                        <li>Date: {new Date(sale.date).toLocaleDateString()}</li>
                    </ul>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={exportPDF} className="bg-red-500 text-white py-1 px-3 rounded mr-2">Export PDF</button>
            </div>
        
        </div>
    );
};

export default SalesReport;
