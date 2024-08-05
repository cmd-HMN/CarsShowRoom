import { Link } from "react-router-dom";
import HomeDropdown from "./HomeDropDown";
import { useAppContext } from "../context/AppContext";
import { ReactCountryFlag } from 'react-country-flag';

const Header = () => {
  const {isLoggedIn} = useAppContext();

    return (
      <header className="header">

        <div className="flex flex-row justify-between bg-Dark p-1 space-x-1 sm:p-4">
            <div className="flex flex-col text-center  justify-center items-center mt-2 ml-3">
              <Link to={"/"} className="text-white">
                <p className="font-extrabold text-orange-600 text-xl tracking-wide sm:text-2xl lg:text-4xl">CARZ</p>
                <p className="text-[0.2vh] tracking-[0.3vh] sm:text[0.5vh] lg:text-[1vh]">Accressories</p>
              </Link>
            </div>

            <div className="flex flex-row mt-[3vh]">
                <HomeDropdown />
             </div>

    
            {isLoggedIn ?
               <div className="flex justify-end items-end flex-col gap-1 sm:gap:2">
                <div className="space-x-2 sm:space-x-4">
                  <div className="flex flex-cols">
                  <div className=" hidden sm:block">
                  <ReactCountryFlag countryCode="DE" svg style={{width: '1.5em', height: '1.5em', marginLeft: '5px'}}/>
                  <ReactCountryFlag countryCode="GB" svg style={{width: '1.5em', height: '1.5em', marginLeft: '5px'}}/>
                  <ReactCountryFlag countryCode="IT" svg style={{width: '1.5em', height: '1.5em', marginLeft: '5px'}}/>
                  </div>
                  <Link to={"/profile"} className="text-white">
                    <i className="fa fa-user text-white text-sm p-1 hover:text-gray-300 cursor-pointer" />
                  </Link>
                  <Link to={'/search'}>
                  <i className="fa fa-search text-white text-sm p-1 hover:text-gray-300 cursor-pointer" />
                  </Link>
                </div>
                </div>
                <div className="flex flex-row space-x-1">
                    <Link to={"/"} className="text-white">
                        <i className="fa fa-home text-white text-sm p-1 hover:text-gray-300 cursor-pointer" />
                    </Link>
                     <p className="text-white font-bold text-sm p-1">
                       |
                     </p>
                     <p className="text-white text-1xl py-1 px-1 text-sm p-1 hidden sm:block">
                       Cart
                     </p>
                     <p className="text-white font-bold text-sm p-1 hidden sm:block">
                       |
                     </p>
                     <Link to={"/cart"} className="text-white">
                      <i className="fa fa-shopping-cart text-white text-sm p-1 hover:text-gray-300 cursor-pointer" />
                    </Link>
                   </div> 
              </div>

              :
              
              <div className="p-3">
                <Link to={'/sign-in'} className="text-black text-sm bg-white rounded-md p-1 font-medium shadow-md hover:bg-gray-400 sm:text-lg sm:p-3 sm:px-4">
                Sign in 
                </Link>
              </div>
                }

        </div>
      </header>
    );
  };
  
export default Header;  
