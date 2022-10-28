import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const contNames = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
  const countries = [
  ['Egypt', 'Ethiopia', 'Kenya', 'Morocco', 'South Africa'], 
  ['China', 'India', 'Japan', 'Russia', 'Thailand'], 
  ['Denmark', 'France', 'Germany', 'Hungary', 'Ireland'],
  ['Alaska', 'Canada', 'Hawaii', 'Mexico', 'United States'],
  ['Australia', 'Fiji', 'New Zealand', 'Papua New Guinea', 'Vanuatu'],
  ['Argentina', 'Brazil', 'Chile', 'Colombia', 'Ecuador']
]
  return ( 
    <>
      <nav>
      <Link to="/">
            <img className="logoimg" src="/src/images/bjs.png" alt="" />
            </Link>
        <ul className="main">
          <li key="main" className="mainLi">
            {/* <Link to="/">
            <img className="logoimg" src="/src/images/bjs.png" alt="" />
            </Link> */}
          </li>
          <li key="main2" className="mainLi">
            <Link to="continents">Continents</Link>
            <ul className="sub">
              {
                contNames.map((item, idxx) => {
                  return <li key={item}> 
                    <Link to={`continents/${item}`}>{item}</Link>
                    <ul className="subsub">
                      {countries[idxx].map(itm => {
                      return <li key={itm}>
                        <Link to={`continents/${item}/${itm}`}> 
                        {itm}
                        </Link>
                      </li>
                      })}
                  </ul>
                </li>
              })
              }
           </ul>
          </li>
          <li key="main3" className="mainLi">
            <Link to="/blogs">Blogs</Link>
            <ul className="sub">
              <li key="popular">
                <Link to="/blogs/popular">Popular</Link>
              </li>
            </ul>
          </li>

          <li key="main4" className="mainLi">
            <Link to="/contact">Contacts</Link> 
            <ul className="sub">
              <li key="feedback">
                <Link to="contact/message">Feedback</Link>
              </li>  
            </ul>   
          </li> 
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;
      




