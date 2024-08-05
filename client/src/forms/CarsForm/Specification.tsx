import { specificationArray } from "../../config/cars-option-config";
import AdminFormInput from "./AdminFormInput";


const Specification = () => {


  return (
    <>
      <h1 className="flex justify-center items-center font-bold text-3xl my-6">
        Specification
      </h1>
      <h3 className="font-bold text-2xl">Dimensions</h3>
      <div className="p-6 gap-8 border border-gray-300 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          {specificationArray.map((name) => (
            <AdminFormInput key={name} car={name} name={name} />
          ))
          }
        </div>
        </div>
      </>
  );
};

export default Specification;
