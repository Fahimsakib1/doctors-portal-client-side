import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthContext } from './Contexts/AuthProvider';
import routes from './Routes/Routes/Routes';

function App() {
  

  
  return (
    <div className='max-w-[1440px] mx-auto dark:bg-black dark:text-white dark:max-w-[1550px]'>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
