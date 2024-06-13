import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Ad = () => {
    const [sliderRequests, setSliderRequests] = useState([]);

    useEffect(() => {
        const fetchSliderRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/slider');
                setSliderRequests(response.data || []);
            } catch (error) {
                console.error('Error fetching slider requests:', error);
            }
        };
        fetchSliderRequests();
    }, []);

    const handleUpdateStatus = async (id, isUsedInSlider) => {
        try {
            await axios.put(`http://localhost:5000/slider/${id}`, { isUsedInSlider: !isUsedInSlider });
            setSliderRequests(prevRequests => 
                prevRequests.map(request =>
                    request._id === id ? { ...request, isUsedInSlider: !isUsedInSlider } : request
                )
            );
        } catch (error) {
            console.error('Error updating slider status:', error);
        }
    };

    return (
        <div>
               <Helmet>
        <title>Medi corner | Advertisement</title>
      </Helmet>
            <h1 className="text-center font-bold text-xl md:text-3xl">Manage Banner Advertisement</h1>

            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-orange-400">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Details</th>

              <th>Email</th>
              <th>Action</th>
           
            </tr>
          </thead>
          <tbody>
            {
                sliderRequests.map((item,index) =>   <tr key={item._id}>
                   
                    <th>{index + 1}</th>
                    <th><img src={item.medicineImage} alt="medicine" className=" rounded-md" /></th>
                    <td> {item.medicineName} </td>
                    <td>{item.description}</td>
                    <td> {item.sellerEmail} </td>
                    <td>
                        <button className='btn bg-slate-400' onClick={() => handleUpdateStatus(item._id, item.isUsedInSlider)}>
                            {item.isUsedInSlider ? 'Remove from Slider' : 'Add to Slider'}
                        </button></td>
                   
                  </tr>)
            }
          
         
           
          </tbody>
         
        </table>
      </div>
          
                {/* {sliderRequests.map(request => (
                    <div key={request._id}>
                        <img src={request.medicineImage} alt="Medicine" />
                        <p>Medicine Name: {request.medicineName}</p>
                        <p>Description: {request.description}</p>
                        <p>Seller Email: {request.sellerEmail}</p>
                        <button onClick={() => handleUpdateStatus(request._id, request.isUsedInSlider)}>
                            {request.isUsedInSlider ? 'Remove from Slider' : 'Add to Slider'}
                        </button>
                    </div>
                ))} */}
           
        </div>
    );
};

export default Ad;

