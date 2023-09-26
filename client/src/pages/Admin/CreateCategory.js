import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";
import "./Admin.css"; 


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


//update category
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
      { name: updatedName }
    );
    if (data?.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };



  return (
    <Layout>
      <div  className="container-fluid m-3 p-3 dashboard">
        <div  className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
            </div>

            <section className="panel important">
                <h2>Create Category</h2>
                  <ul>
                    {/* <li>Information Panel</li> */}
                  </ul>
            </section>


            <div className='panel important'>
              <div className="twothirds">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
              <div className='w-75'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>

                  </tr>
                </thead>
              
                <tbody>
                  {categories?.map((c) => (
                    <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button className='btn btn-primary ms-2'onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)} } >Edit</button>
                        <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                      </td>
                    </tr>
                    </>
                  ))}
                

                </tbody>

              </table>
              </div>
              <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
            </div>
            </div>
          </div>
          </div>
    </Layout>
  )
}

export default CreateCategory
