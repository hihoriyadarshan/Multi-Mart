import React,{useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout'
import { CgMouse } from "react-icons/cg";
import axios from "axios";
import {Checkbox, Radio} from 'antd'
import "./css/Home.css"
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
 const navigate = useNavigate()
 const [products,setProducts] = useState([])
 const [categories,setCategories] = useState([])
 const [checked, setChecked] = useState([]);
 const [radio, setRadio] = useState([]);
 const [total, setTotal] = useState(0);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(false);
  

   //get all category
   const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

 //get products
 const getAllProducts = async () => {
  try {
    setLoading(true)
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
    setLoading(false)
    setProducts(data.products);
  } catch (error) {
    setLoading(false)
    console.log(error);
  }
};


//get Total count
const getTotal = async () => {
  try{
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
    setTotal(data?.total);
  }catch(error){
    console.log(error)
  }
 };

//filter category
const handleFilter = (value, id) => {
  let all = [...checked];
  if (value) {
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setChecked(all);
};
useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) filterProduct();
}, [checked, radio]);

useEffect(()=>{
  if(page ===1)return
  loadMore()
},[page])

//load more

const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products, ...data?.products]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

//get filterd product
const filterProduct = async () => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
      checked,
      radio,
    });
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};


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
     <div className='col-md-2'>
      <h4 className='text-center'>Filter By Category</h4>
      <div className="d-flex flex-column">
      {categories?.map(c => (
        <Checkbox key={c._id} on onChange={(e) => handleFilter(e.target.checked,c._id) }>
          {c.name}
        </Checkbox>
      )) }
      </div>


      {/* Price filter */}

      <h4 className='text-center mt-4'>Filter By Prices</h4>
      <div className="d-flex flex-column">
      <Radio.Group onChange={e => setRadio(e.target.value)}>
        {Prices?.map(p => (
          <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
          </div>
        ))}
      </Radio.Group>
      </div>
      <div className="d-flex flex-column">
      <button className='btn btn-danger' onClick={() => window.location.reload()}> Reset Filter</button>
      </div>
     </div>
     <div className='col-md-9'>
        {/* {JSON.stringify(radio,null, 4)} */}
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
                    <p className="card-text">{p.description.substring(0, 26)}...</p>
                    <p className="card-text">₹{p.price}</p>
                    <button className='btn btn-primary ms-1' onClick={() =>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className='btn btn-Secondary ms-1'>ADD TO Cart</button>

                  </div>
                </div>
             
            ))}
       </div>
       <div className='m-2 p-3'>
          {products && products.length <total &&(
            <button className='btn-btn-warning' 
            onClick={(e) => {e.preventDefault(); 
            setPage(page+1);
          }}
          >
              {loading ? "Loading ..." : "Loadmore"}
            </button>
          )}
       </div>
       </div>
       </div>
    </Layout>
  )
}

export default Homepage
