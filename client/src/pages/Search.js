import { Layout as AntdLayout } from 'antd'; // Rename the imported Layout from 'antd'
import CustomLayout from '../components/Layout/Layout'; // Use a different name for the custom Layout component
import { useSearch } from '../context/search';

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <AntdLayout title={'search results'}>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? 'No Product Found' : `Found${values?.results.length}`}</h6>
          <div className='d-flex flex-wrap mt-4'>
     {values?.results.map((p) => (
              
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
                    <button className='btn btn-primary ms-1'>More Details</button>
                    <button className='btn btn-Secondary ms-1'>ADD TO Cart</button>

                  </div>
                </div>   
            ))}
          </div>
        </div>
      </div>
    </AntdLayout>
  );
}

export default Search;
