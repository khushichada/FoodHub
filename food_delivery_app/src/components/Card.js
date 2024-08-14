import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    //console.log(new Date())
    const handleAddToCart = async () => {
        let existingFood = data.find(item => item.id === props.foodItem._id && item.size === size);

        if (existingFood) {
            // If item with the same size exists, update quantity and price
            await dispatch({
                type: "UPDATE",
                id: props.foodItem._id,
                size: size,
                price: finalprice,
                qty: qty
            })
            return
        } else {
            // If item with the same size does not exist, add it
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalprice,
                qty: qty,
                size: size,
                img: props.ImgSrc
            }

            )
            return
        }

    }



    //console.log(data);


    useEffect(() => {
        setSize(priceRef.current.value)

    }, [])
    let finalprice = qty * parseInt(options[size]);



    return (

        <div>

            <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "420px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded text-white' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}

                        </select>
                        <select className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e) => setSize(e.target.value)}>

                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>

                            })}

                        </select>
                        <hr>
                        </hr>
                        <div className='d-inline h-100 fs-5'>
                            Total price
                            ₹{finalprice}/-

                        </div>
                    </div>


                    <hr>
                    </hr>
                    <button className='btn-btn-success justify-centre ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>

        </div>
    );
}
