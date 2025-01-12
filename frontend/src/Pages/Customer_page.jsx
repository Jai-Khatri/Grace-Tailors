import { useState } from "react";
import Navbar from "../Components/Navbar";
import axiosInstance from "../lib/axios.js";

const Customer_page = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axiosInstance.get(`/api/getOrder`, {
            params: { orderId } 
        });
        setOrder(response.data);
    } catch (error) {
        console.error("Error fetching order:", error);
        setOrder(null);
        alert("Failed to fetch order. Please check your order ID and try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">View Your Order</h1>
        <p className="text-lg text-white mb-4 text-center">Input your order ID to view the order details.</p>
        <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md" onSubmit={getOrder}>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
            Order ID
          </label>
          <input
            type="number"
            id="orderId"
            placeholder="Enter your order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            View Order
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center p-8">
        {loading ? (
          <p className="text-white mt-4">Loading...</p>
        ) : order ? (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6 text-black">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p className="mb-2"><strong>Name:</strong> {order.name}</p>
          <p className="mb-2"><strong>Address:</strong> {order.address}</p>
          <p className="mb-2"><strong>Phone No:</strong> {order.phoneNo}</p>
          <p className="mb-2"><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
          <p className="mb-2"><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
          
          {/* Pant Details */}
          <h3 className="text-lg font-semibold mt-4">Pant Details</h3>
          <p className="mb-2"><strong>Pant Type:</strong> {order.pant.type}</p>
          {order.pant.measurements.map((measurement, index) => (
              <div key={index} className="mb-2">
                  <h4 className="font-medium">Measurement {index + 1}:</h4>
                  <p><strong>Length:</strong> {measurement.length} inches</p>
                  <p><strong>Waist:</strong> {measurement.waist} inches</p>
                  <p><strong>Hips:</strong> {measurement.hips} inches</p>
                  <p><strong>Fork Length:</strong> {measurement.forkLength} inches</p>
                  <p><strong>Thighs:</strong> {measurement.thighs} inches</p>
                  <p><strong>Calf:</strong> {measurement.calf} inches</p>
                  <p><strong>Bottom:</strong> {measurement.bottom} inches</p>
              </div>
          ))}
          
          {/* Shirt Details */}
          <h3 className="text-lg font-semibold mt-4">Shirt Details</h3>
          <p className="mb-2"><strong>Shirt Type:</strong> {order.shirt.type}</p>
          {order.shirt.measurements.map((measurement, index) => (
              <div key={index} className="mb-2">
                  <h4 className="font-medium">Measurement {index + 1}:</h4>
                  <p><strong>Length:</strong> {measurement.length} inches</p>
                  <p><strong>Chest:</strong> {measurement.chest} inches</p>
                  <p><strong>Abs:</strong> {measurement.abs} inches</p>
                  <p><strong>Hips:</strong> {measurement.hips} inches</p>
                  <p><strong>Sleeve Length:</strong> {measurement.sleevelength} inches</p>
                  <p><strong>Arms:</strong> {measurement.arms} inches</p>
                  <p><strong>Shoulder:</strong> {measurement.shoulder} inches</p>
                  <p><strong>Collar:</strong> {measurement.collar} inches</p>
              </div>
          ))}
    
          {/* Financial Details */}
          <h3 className="text-lg font-semibold mt-4">Financial Details</h3>
          <p className="mb-2"><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          <p className="mb-2"><strong>Advance Amount:</strong> ${order.advanceAmount ? order.advanceAmount.toFixed(2) : 0}</p>
          <p className="mb-2"><strong>Balance Due:</strong> ${order.balance ? order.balance.toFixed(2) : 0}</p>
      
      </div>
      
        ) : (
          <p className="text-white mt-4 text-3xl">No Order found</p>
        )}
      </div>
    </div>
  );
};

export default Customer_page;
