import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';

const layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
       <Helmet>
           <meta charSet="utf-8" />
           <meta name="description" content={description} />
           <meta name="keywords" content={keywords} />
           <meta name="author" content={author} />
              <title>{title}</title>
        </Helmet>
     <Header/>
     <main style={{minHeight:'80vh'}}> 
     <Toaster />
            { children}
    </main>
    <Footer/>

    </div>
  )
}

layout.defultProps ={
  title:'Multimart app',
  description:'Mern stack project',
  keywords:'mern,react,node,moongoDB',
  author:'Darshan'

}

export default layout
