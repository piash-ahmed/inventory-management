import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineDeliveredProcedure } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { CustomHook } from '../CustomHook/CustomHook';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './ProductDe.css'

const ProductDe = ({ product }) => {
    const [user] = useAuthState(auth);
    const { name, img, quantity, suplier, price } = product;
    const navigate = useNavigate();

    
    const edit = id =>{
        navigate(`/editProduct/${id}`);
    }
    

    const [products, setProducts] = CustomHook();
    const {id} = useParams();

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure delete this product?');
        if(proceed){
            const url = `https://laptop-management.herokuapp.com/deleteProduct/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                toast("Delete this Product")
                const rest = products.filter(product => product._id !== id);
                setProducts(rest);
            })
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{quantity}</td>
            <td className='text-center'>
                <img className='border rounded-circle custom-size' src={img} alt="" />
            </td>
            <td>{price} $</td>
            <td>{suplier}</td>
            <td>
                <div className="d-flex">
                   
                    <button onClick={()=>edit(product._id)} className='btn'><span className='edit-btn'><FaEdit /> </span></button>
                    <button onClick={()=>handleDelete(product._id)} className='btn'><span className='delete-btn'><AiFillDelete /></span></button>
                   
                </div>
            </td>
        </tr>
    );
};

export default ProductDe;