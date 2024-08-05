import { useFormContext } from "react-hook-form";
import { CarType } from './ManageCarsFrom';

type Prop = {
  car: keyof CarType,
  name: string
};



const AdminFormInput = ({ car, name}: Prop) => {
  const { register, formState: { errors } } = useFormContext<CarType>();
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 text-sm font-bold uppercase">{name}</label>
      <input
        type="text"
        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register(`${car}`, {
          required: "This field is required",
        })}
      />
      {errors[car] && (
        <span className="text-red-500 text-sm">
          {errors[car]?.message}
        </span>
      )}
    </div>
  );
};

export default AdminFormInput;
