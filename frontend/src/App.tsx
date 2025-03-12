import {Routes,Route} from 'react-router-dom'
import { Prouduct } from './pages/Prouduct'
import NavBar from './component/NavBar'
import Home from './pages/Home'
import { useThemeStore } from './store/ThemeStore'
import { Toaster } from "react-hot-toast";


const App = () => {
  const {themeColor} = useThemeStore() ;
  return (
    <div  className='min-h-screen bg-base-200 transition-colors duration-300' data-theme={themeColor}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Prouduct/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App