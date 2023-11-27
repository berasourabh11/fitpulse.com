import { useEffect, useState } from 'react';
import Navbar from "./scenes/navbar";
import { SelectedPage } from './shared/types';
import Home from "./scenes/home"
function App() {
  const [selectedPage,setSelectedPage]= useState<SelectedPage>(SelectedPage.Home)
  const [isTopOfPage,setIsTopOfPage]= useState<boolean>(true);

  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY === 0){
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home)
      }else{
        setIsTopOfPage(false);
      }
      window.addEventListener("scroll",handleScroll);
      return () => window.removeEventListener("scroll",handleScroll);
    }
  },[]);

  return (
    <div className="app bg-gray-20">
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} isTopOfPage={isTopOfPage}/>
      <Home setSelectedPage={setSelectedPage}></Home>
    </div>
  )
}

export default App