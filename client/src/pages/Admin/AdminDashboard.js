import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'


const AdminDashboard = () => {
  const[auth] = useAuth()
  return (
    <Layout>
      <AdminMenu/>
      <div className='col-md-9'>
        <div className='card'>
          {/* <h1>User name: {auth?.user?.name}</h1> */}
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
