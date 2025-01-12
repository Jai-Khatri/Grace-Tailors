import { useState } from "react";
import Navbar from "../Components/Navbar";
import axiosInstance from "../lib/axios.js";

const Admin_page = () => {
  const [orderData, setOrderData] = useState({
    name: "",
    address: "",
    date: "",
    phoneNo: "",
    customerId: "",
    pant: {
      measurements: [{
        length: "",
        waist: "",
        hips: "",
        forkLength: "",
        thighs: "",
        calf: "",
        bottom: ""
      }],
      type: ""
    },
    shirt: {
      measurements: [{
        length: "",
        chest: "",
        abs: "",
        hips: "",
        sleevelength: "",
        arms: "",
        shoulder: "",
        collar: ""
      }],
      type: ""
    },
    deliveryDate: "",
    balance: 0,
    advanceAmount: 0,
    totalAmount: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMeasurementChange = (e, type, measurement) => {
    const { name, value } = e.target;
    setOrderData((prevData) => {
      const updatedMeasurements = prevData[type].measurements.map((m, index) => {
        if (index === measurement) {
          return { ...m, [name]: value };
        }
        return m;
      });
      return {
        ...prevData,
        [type]: {
          ...prevData[type],
          measurements: updatedMeasurements
        }
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.post("/api/createOrder", orderData)
      if(response){
        setOrderData({
          name: "",
    address: "",
    date: "",
    phoneNo: "",
    customerId: "",
    pant: {
      measurements: [{
        length: "",
        waist: "",
        hips: "",
        forkLength: "",
        thighs: "",
        calf: "",
        bottom: ""
      }],
      type: ""
    },
    shirt: {
      measurements: [{
        length: "",
        chest: "",
        abs: "",
        hips: "",
        sleevelength: "",
        arms: "",
        shoulder: "",
        collar: ""
      }],
      type: ""
    },
    deliveryDate: "",
    balance: 0,
    advanceAmount: 0,
    totalAmount: 0
        })

        console.log("Successfully created order!!!")
      }
    } catch (error) {
      console.log("Error in creating the order!!!" , error)
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-sky-500">Create Order</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-8">
          {/* Customer Information */}
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Customer Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={orderData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={orderData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium">Order Date</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={orderData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="phoneNo" className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                required
                value={orderData.phoneNo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium">Customer ID</label>
              <input
                type="number"
                id="customerId"
                name="customerId"
                required
                value={orderData.customerId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Pant Measurements */}
          <h2 className="text-xl font-semibold mb-4">Pant Measurements</h2>
          {orderData.pant.measurements.map((measurement, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 border-gray-600">
              <h3 className="font-medium mb-2">Measurement {index + 1}</h3>
              {Object.keys(measurement).map((key) => (
                  key !== 'type' && (
                    <div key={key} className='mb-2'>
                      <label htmlFor={`${key}-${index}`} className={`block text-sm font-medium`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <input
                        type='number'
                        id={`${key}-${index}`}
                        name={key}
                        value={measurement[key]}
                        onChange={(e) => handleMeasurementChange(e, 'pant', index)}
                        className={`mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500`}
                      />
                    </div>
                  )
              ))}
            </div>
          ))}
          {/* Add pant type */}
          <div className='mb-6'>
            <label htmlFor='pantType' className='block text-sm font-medium'>Pant Type</label>
            <input
              type='text'
              id='pantType'
              name='pantType'
              value={orderData.pant.type}
              onChange={(e) => setOrderData(prev => ({
                  ...prev,
                  pant: { ...prev.pant, type: e.target.value }
              }))}
              className='mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500'
            />
          </div>

          {/* Shirt Measurements */}
          <h2 className="text-xl font-semibold mb-4">Shirt Measurements</h2>
          {orderData.shirt.measurements.map((measurement, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 border-gray-600">
              <h3 className="font-medium mb-2">Measurement {index + 1}</h3>
              {Object.keys(measurement).map((key) => (
                  key !== 'type' && (
                    <div key={key} className='mb-2'>
                      <label htmlFor={`${key}-shirt-${index}`} className={`block text-sm font-medium`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <input
                        type='number'
                        id={`${key}-shirt-${index}`}
                        name={key}
                        value={measurement[key]}
                        onChange={(e) => handleMeasurementChange(e, 'shirt', index)}
                        className={`mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500`}
                      />
                    </div>
                  )
              ))}
            </div>
          ))}
          {/* Add shirt type */}
          <div className='mb-6'>
            <label htmlFor='shirtType' className='block text-sm font-medium'>Shirt Type</label>
            <input
              type='text'
              id='shirtType'
              name='shirtType'
              value={orderData.shirt.type}
              onChange={(e) => setOrderData(prev => ({
                  ...prev,
                  shirt: { ...prev.shirt, type: e.target.value }
              }))}
              className='mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500'
            />
          </div>

          {/* Additional Fields */}
          <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6'>
            {/* Delivery Date */}
            <div>
              <label htmlFor='deliveryDate' className='block text-sm font-medium'>Delivery Date</label>
              <input
                type='date'
                id='deliveryDate'
                name='deliveryDate'
                value={orderData.deliveryDate}
                onChange={handleChange}
                required
                className='mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500'
              />
            </div>

            {/* Advance Amount */}
            <div>
              <label htmlFor='advanceAmount' className='block text-sm font-medium'>Advance Amount</label>
              <input
                type='number'
                id='advanceAmount'
                name='advanceAmount'
                value={orderData.advanceAmount}
                onChange={(e) => setOrderData(prev => ({ ...prev, advanceAmount: e.target.value }))}
                required
                min={0}
                step=".01"
                className='mt-1 block w-full border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:ring focus:ring-sky-500'
              />
            </div>

            {/* Total Amount */}
            <div>
              <label htmlFor='totalAmount' className='block text-sm font-medium'>Total Amount</label>
              <input
                type='number'
                id='totalAmount'
                name='totalAmount'
                value={orderData.totalAmount}
                onChange={(e) => setOrderData(prev => ({ ...prev, totalAmount: e.target.value }))}
                required
                min={0}
                step=".01"
                className='mt-1 block w-full border border-gray-600 bg-gray–700 rounded-md shadow-sm focus:ring focus:ring-sky–500'
              />
            </div>

            {/* Balance */}
            <div>
              <label htmlFor='balance' className='block text-sm font-medium'>Balance</label>
              <input
                  type='number'
                  id='balance'
                  name='balance'
                  value={orderData.balance}
                  onChange={(e) => setOrderData(prev => ({ ...prev, balance: e.target.value }))}
                  required
                  min={0}
                  step=".01"
                  className='mt–1 block w-full border border-gray–600 bg-gray–700 rounded-md shadow-sm focus:ring focus:ring-sky–500'
               />
           </div> 
         </div>

         {/* Submit Button */}
         <button 
           type="submit" 
           className="mt-[12px] w-full bg-sky-blue hover:bg-blue-dark text-white py-[12px] rounded-lg transition duration-[250ms]"
         >
           Create Order
         </button>

       </form> 
     </div> 
    </div>
   );
};

export default Admin_page;
