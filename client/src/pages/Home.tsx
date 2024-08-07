import { Link } from "react-router-dom" 
import Mail from "../components/Home/Mail"
import Tags from "../components/Home/Tags"
import BottomLinks from "../components/Home/BottomLinks"
import * as apiClient from '../api-client'
import Prod from "../components/Home/Prod"
const Home =() => {

    const day = new Date()
    const year = day.getFullYear()
    const categorySports = JSON.stringify(["Sports Cars"])
    const categorySUV= JSON.stringify(["SUV"])
    const categoryCoupe = JSON.stringify(["Coupe"])
    const encodedCoupe = encodeURIComponent(categoryCoupe);
    const encodedSUV = encodeURIComponent(categorySUV);
    const encodedSports = encodeURIComponent(categorySports);
    return(
        <>
        <div className="bg-Dark">
            <div className="flex flex-col justify-center items-center bg-[url('/src/assets/Hero.jpg')] bg-cover bg-center w-full h-[80vh] shadow-2xl">
                <div className="text-center">
                    <h2 className="text-white text-[14px] font-extrabold sm:text-2xl">NEW CARZ {year}</h2>
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <Link 
                            to={"/shop"} 
                            className="inline-block text-white text-[6px] bg-orange-500 hover:bg-orange-600  border-2 border-orange-500 transition-colors duration-300 px-2 py-1 sm:text-xs "
                        >
                            MORE MOTORSPORTS
                        </Link>
                        <Link 
                            to={"/shop"} 
                            className="inline-block text-white text-[6px] bg-[blur] border-2 border-white bg-opacity-20 py-1 px-6 hover:text-gray-200 hover:border-gray-200 sm:text-xs sm:px-9"
                        >
                            GET CARZ
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-white flex flex-row flex-wrap p-3 gap-5 justify-center sm:p-7 relative w-full">
            <Link to={`/shop?category=${encodedSports}`}>
                <div className="relative flex justify-center items-center text-center transition-all bg-[url('/src/assets/C.jpg')] w-[30vh] h-[20vh] bg-cover bg-center grayscale-[60] hover:grayscale-0 cursor-pointer group shadow-lg rounded-lg overflow-hidden sm:w-[50vh] sm:h-[30vh]">
                    <div className="absolute inset-0 bg-[#1e2023] opacity-50 transition-opacity duration-300 group-hover:opacity-0 rounded-lg" />
                    <p className="absolute text-white text-lg font-semibold hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Sports Cars
                    </p>
                </div>
            </Link>
                
                <Link to={`/shop?category=${encodedSUV}`}>
                <div className="relative flex justify-center items-center text-center transition-all bg-[url('/src/assets/C-2.jpg')] w-[30vh] h-[20vh]  bg-cover grayscale-[60] hover:grayscale-0 cursor-pointer group shadow-lg rounded-lg overflow-hidden sm:w-[50vh] sm:h-[30vh]">
                    <div className="absolute inset-0 bg-[#1e2023] opacity-50 transition-opacity duration-300 group-hover:opacity-0 rounded-lg" />
                    <p className="absolute text-white text-lg font-semibold hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Family Cars
                    </p>
                </div>
                </Link>

                <Link to={`/shop?category=${encodedCoupe}`}>
                <div className="relative flex justify-center items-center text-center transition-all bg-[url('/src/assets/C-3.jpg')] w-[30vh] h-[20vh]  bg-cover grayscale-[60] hover:grayscale-0 cursor-pointer group shadow-lg rounded-lg overflow-hidden sm:w-[50vh] sm:h-[30vh]">
                    <div className="absolute inset-0 bg-[#1e2023] opacity-50 transition-opacity duration-300 group-hover:opacity-0 rounded-lg" />
                    <p className="absolute text-white text-lg font-semibold hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Coupe Cars
                    </p>
                </div>
                </Link>
            </div>
            <div className="flex justify-center pb-7">
            <Link to={"/shop"} className="text-[6px] text-white flex justify-center items-center bg-gradient-to-br from-gray-500 to-gray-800 hover:from-gray-800 hover:to-gray-500 transition-all  duration-100 p-2 w-38 sm:p-3 sm:text-xs">
                VIEW GALLERY
            </Link>
            </div>
        </div>

        <Prod api={apiClient.featuredProduct} heading="Our Featured Product"/>
        <Mail />
        <Prod api={apiClient.bestSellerProd} heading="Our Best Product"/>
        <Tags />
        <BottomLinks />
        </>
    )
}

export default Home