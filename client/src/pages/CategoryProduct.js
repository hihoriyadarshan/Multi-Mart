import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null); // State for validation error

  useEffect(() => {
    if (slug) {
      getProductByCat(slug);
    } else {
      setError("Category slug is required.");
    }
  }, [slug]);

  const getProductByCat = async (categorySlug) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${categorySlug}`);
      const data = response.data;
      if (data) {
        setProducts(data.products || []);
        setCategory(data.category || null);
      } else {
        setError("Category not found.");
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        {error ? (
          <h4 className="text-center text-danger">{error}</h4>
        ) : (
          <h4 className="text-center">Category - {category?.name}</h4>
        )}
      </div>
      {error ? null : (
        <div className="container mt-3">
          <h6 className="text-center">{products.length} results found</h6>
          <div className="row">
            <div className="d-flex flex-wrap ms-3">
              {products.map((product) => (
                <div className="card m-4" style={{ width: '18rem' }} key={product._id}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description.substring(0, 26)}...</p>
                    <p className="card-text">₹{product.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout> 
  );
};

export default CategoryProduct;
