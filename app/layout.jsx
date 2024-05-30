import '@/assets/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title : 'Immo site',
  description: 'lorem ipsum dolor sit amet, consectetur adip'
};

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html lang="en">
      <body>
        <Navbar/>
        <div className='container mx-auto'>{children}</div> 
        <Footer/>
        <ToastContainer />
      </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout