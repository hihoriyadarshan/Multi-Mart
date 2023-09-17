import React,{useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { CgMouse } from "react-icons/cg";
import axios from "axios";
import "./css/Home.css"

const Homepage = () => {
 const [auth,setAuth]=useAuth();
 const [products,setProducts] = useState([])
 const [categories,setCategories] = useState([])

 //get products
 const getAllProducts = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
    setProducts(data.products);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getAllProducts();
}, []);
  return (
    <Layout title="MultiMart">
       <div className="banner">
        <p>Welcome To Multi-Mart</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

     <h2 className="homeHeading">Featured Products</h2>
     <div className='row mt-3'>
     <div className='col-md-3'>
      <h4 className='text-center'>Filter By Category</h4>
     </div>
     <div className='col-md-9'>
     <div className='d-flex flex-wrap'>
     {products?.map((p) => (
              
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <button className='btn btn-primary ms-1'>More Details</button>
                    <button className='btn btn-Secondary ms-1'>ADD TO Cart</button>

                  </div>
                </div>
             
            ))}
       </div>
       </div>
       </div>
    </Layout>
  )
}

export default Homepage
