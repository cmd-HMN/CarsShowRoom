import { FaSearch, FaSmileBeam } from "react-icons/fa"
import { GrMoney } from "react-icons/gr"


const   Tags = () =>  {   
    return (
        <div className="relative h-[35vh] md:h-[45vh]">
        <div
          className="absolute inset-0 bg-[url('/src/assets/H2.jpg')] bg-cover bg-no-repeat grayscale-[80%]"
          style={{ backgroundPosition: "center 75%" }}
        >
          <div className="absolute inset-0 bg-orange-400 opacity-50 mix-blend-multiply" />
        </div>
        <div className="relative flex flex-row justify-center items-center text-orange-500 h-full gap-10 md:gap-40 xl:gap-80 2xl:gap-96 text-sm md:text-lg xl:text-xl 2xl:text-1xl sm:text-[10px]">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="border rounded-full p-3 border-orange-500 ">
                <GrMoney />
            </div>
            <h1 className="font-normal text-orange-400">
                Cost Effective Product  
            </h1>
          </div>

          <div className="flex flex-col justify-center items-center  gap-2">
            <div className="border rounded-full p-3 border-orange-500">
                <FaSearch/>
            </div>
            <h1 className="font-normal text-orange-400">
                Search Inventory
            </h1>
          </div>

          <div className="flex flex-col justify-center items-center  gap-2">
            <div className="border rounded-full p-3 border-orange-500">
                <FaSmileBeam/>
            </div>
            <h1 className="font-normal text-orange-400">
                Best Reviews
            </h1>
          </div>
        </div>
      </div>

    )
}

export default Tags