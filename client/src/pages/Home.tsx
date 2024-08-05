import { Link } from "react-router-dom" 
import Mail from "../components/Home/Mail"
import Tags from "../components/Home/Tags"
import BottomLinks from "../components/Home/BottomLinks"
import * as apiClient from '../api-client'
import Prod from "../components/Home/Prod"
const Home =() => {

    const day = new Date()
    const year = day.getFullYear()
    return(
        <>
        <div className="bg-Dark">
            <div className="flex flex-col justify-center items-center bg-[url('/src/assets/Hero.jpg')] bg-cover bg-center w-full h-[80vh] shadow-2xl">
                <div className="text-center">
                    <h2 className="text-white text-[6vh] font-extrabold">NEW CARZ {year}</h2>
                    <div className="flex flex-row gap-1 justify-center items-center">
                        <Link 
                            to={"/gallery"} 
                            className="inline-block text-white text-[2vh] bg-orange-500 hover:bg-orange-600  border-2 border-orange-500 transition-colors duration-300 px-2 py-1 w-38"
                        >
                            MORE MOTORSPORTS
                        </Link>
                        <Link 
                            to={"/gallery"} 
                            className="inline-block text-white text-[2vh] bg-[blur] border-2 border-white bg-opacity-20 px-10 py-1 hover:text-gray-200 hover:border-gray-200"
                        >
                            GET CARZ
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-white flex flex-row flex-wrap p-7 gap-5 justify-center">
                <div className="relative flex justify-center items-center text-center transition-all bg-[url('/src/assets/C.jpg')] w-[50vh] h-[30vh] bg-cover grayscale-[60] hover:grayscale-0 cursor-pointer group shadow-lg rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#1e2023] opacity-50 transition-opacity duration-300 group-hover:opacity-0 rounded-lg" />
                    <p className="absolute text-white text-lg font-semibold hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Sports Cars
                    </p>
                </div>

                <div className="relative flex justify-center items-center text-center transition-all bg-[url('/src/assets/C-2.jpg')] w-[50vh] h-[30vh] bg-cover grayscale-[60] hover:grayscale-0 cursor-pointer group shadow-lg rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#1e2023] opacity-50 transition-opacity duration-300 group-hover:opacity-0 rounded-lg" />
                    <p className="absolute text-white text-lg font-semibold hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Family Cars
                    </p>
                </div>

                <div className="relative flex justify-center items-center text-center transition-all bg-[url('/src/assets/C-3.jpg')] w-[50vh] h-[30vh] bg-cover grayscale-[60] hover:grayscale-0 cursor-pointer group shadow-lg rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#1e2023] opacity-50 transition-opacity duration-300 group-hover:opacity-0 rounded-lg" />
                    <p className="absolute text-white text-lg font-semibold hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        Couple Cars
                    </p>
                </div>
            </div>
            <div className="flex justify-center pb-7">
            <Link to={"/gallery"} className="text-[2vh] text-white flex justify-center items-center bg-gradient-to-br from-gray-500 to-gray-800 hover:from-gray-800 hover:to-gray-500 transition-all  duration-100 p-3 w-38">
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