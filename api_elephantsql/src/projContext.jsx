import { createContext, useState, useEffect } from "react";
// import { createClient } from "contentful";
import fetcher from "./fetchData";
export const ProjContext = createContext()

import Layout from "./pages/layout";
import Continents from "./pages/continents";
import Blogs from "./pages/blogs";
import Contact from "./pages/contact";
import NoPage from "./pages/no_page";
import Message from './pages/message'
import Popular from './pages/popular'

const ProjContextProvider = (props) => {
  const [data, setData] = useState([]);
  const { getData } = fetcher();
  // const [cont, setCont] = useState({test: 'hello'});
  // const [cntry, setCntry] = useState(null);
  const contIds = ['africa', 'asia', 'europe', 'northAmerica', 'oceania', 'southAmerica'];
  const contNames = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
  useEffect(() => { getData().then((response) => setData(response))}, []);

  console.log(data)
  
  return(
    <ProjContext.Provider
      value={{data, 
              contIds,
              contNames, 
              Layout,
              Continents,
              Blogs,
              Contact,
              NoPage,
              Popular,
              Message,
              setData, 
              getData}}
    >  
      {props.children}
    </ProjContext.Provider>
    )
}

export default ProjContextProvider;