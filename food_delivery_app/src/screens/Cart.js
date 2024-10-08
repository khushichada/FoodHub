import React from "react";
import trash from "../trash.svg"
import { useCart, useDispatchCart } from "../components/ContextReducer";
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-centre fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log("Retrieved User Email:", userEmail); // Check the retrieved email

        if (!userEmail) {
            alert("User email is not set. Please log in.");
            return;
        }

        let orderData = {
            order_data: data,
            email: userEmail,
            order_date: new Date().toISOString().split('T')[0]
        };
        console.log("Order Data:", orderData); // Log order data

        try {
            let response = await fetch('http://localhost:5000/api/orderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let result = await response.json();
            console.log("Order Response:", result);

            if (result.success) {
                dispatch({ type: "DROP" });
                //alert('Order placed successfully!');
            } else {
                alert('Failed to place order.');
            }

        } catch (error) {
            console.error("Fetch error:", error);
            alert('An error occurred. Please try again.');
        }
    };



    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className="container m-auto mt-5 table-responsive-sm tavle-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>

                            <th scope="col">Quantity</th>

                            <th scope="col">option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>




                        </tr>


                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>



                                </tr>
                            ))
                        }

                    </tbody>

                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
                </div>

            </div>
        </div>
    )
}