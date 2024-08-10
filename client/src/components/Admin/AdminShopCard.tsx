import { Link } from "react-router-dom";
import { CarType } from "../../forms/CarsForm/ManageCarsFrom";
import Rating from "../Rating";

type Props = {
  carArray: CarType[] | undefined;
  total: number | undefined;
};

const AdminShopCard = ({ carArray, total }: Props) => {


  if(carArray?.length == 0){
    return <div className="text-center">No product found</div>
  }
  return (
    <div
      className={`relative w-full flex flex-col sm:flex-row flex-wrap justify-center items-center sm:px-0  gap-5 py-5`}
    >
      <div className="absolute top-0 text-xs invisible p-1 sm:visible text-white bg-orange-500  shadow-md cursor-pointer">
        {total} {total==1 ? 'Car' : 'Cars'} Found
      </div>
      {carArray?.map((car: CarType) => (
        <div
          key={car?._id}
          className={`w-full max-w-56 max-h-72 sm:max-h-[350px] sm:max-w-72 p-5 gap-3 bg-white shadow-xl flex flex-col`}
      >
          <div className="flex justify-center items-center overflow-hidden h-44">
            <img
              src={car?.imageUrls[0]}
              width={"auto"}
              className="transition-transform duration-500 hover:scale-105"
              alt={car?.model}
            />
          </div>
          <div className="flex flex-row justify-between">
          <p className="font-bold text-sm sm:text-base md:text-lg">
            {car?.model}
          </p>
          </div>
          <p className="text-orange-300 font-bold text-sm sm:text-base md:text-lg">
            <sup>$</sup>
            {`${car?.price}`}
          </p>
          <Rating rating={car?.rating} className="text-[8px] sm:text-xs" />
          <div className="flex flex-row gap-2 items-center justify-between mt-1 text-[8px]  sm:text-[12px]">
                <Link to={`/admin/cars/edit-form/${car._id}`} className="text-white bg-orange-500 p-2 hover:bg-orange-600  rounded-md">
                    Edit Card
                </Link>
                <Link to={`/view-details/${car._id}`} className="text-gray-400 border border-gray-400 p-2 hover:bg-gray-200  rounded-md">
                    View Details
                </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminShopCard;
