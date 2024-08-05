import { useFormContext } from "react-hook-form"
import { CarType } from "./ManageCarsFrom"
import { category } from '../../config/cars-option-config';

const Category = () => {

    const {register, formState: {errors}} = useFormContext<CarType>();

    return (
        <div>
        <h2 className="font-bold text-sm mb-2 mt-2">Category</h2>
        <div className="grid grid-cols-4 gap-3">  
        {category.map((type) => (
            <label key={type} className="text-sm flex gap-1 text-gray-700">
                <input
                    type="checkbox"
                    value={type}
                    {...register("category", {
                        validate: (cat_) => {
                            return cat_.length > 0 || "This field is required";
                        }
                    })}
                />
                {type}
            </label>
        ))}
        {errors.category && (
            <span className="text-red-500 text-sm">
                {errors.category.message}
            </span>
        )}
     </div>
    </div>
    )
}

export default Category