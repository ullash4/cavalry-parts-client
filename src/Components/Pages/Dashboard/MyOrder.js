import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const navigate= useNavigate()

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/order?email=${user.email}`, {
        method: "GET",
        headers:{
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => {
          if(res.status === 403 || res.status === 401){
            signOut(auth)
            localStorage.removeItem('accessToken')
            navigate('/login')
          }
          return res.json()
        })
        .then((data) => setOrders(data));
    }
  }, [user, navigate]);
  return (
    <div>
      <h1 className="text-xl text-center">My orderment {orders.length}</h1>

      <div className="overflow-x-auto ">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Order Name</th>
              <th>Quantity</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className="hover" key={order._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user?.photoURL ||
                            "https://images.pexels.com/photos/5875794/pexels-photo-5875794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {order.userName || "Normal guy"}
                      </div>
                      <div className="text-sm opacity-50">{order.email}</div>
                    </div>
                  </div>
                </td>
                <td>{order.productname}</td>
                <td>{order.quantity} pices</td>

                <td>
                  {order.productPrice && (
                    <Link to={`payment/${order._id}`}>
                      <button className="btn btn-xs">Pay</button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrder;
