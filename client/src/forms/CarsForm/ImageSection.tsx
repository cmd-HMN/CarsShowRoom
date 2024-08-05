import { useFormContext } from "react-hook-form"
import { CarType } from "./ManageCarsFrom"

const ImageSection = () => {

    const {register, formState: {errors}, watch, setValue} = useFormContext<CarType>()

    const existingUrls = watch("imageUrls")

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,imageUrl: string) => {
        event.preventDefault()
        setValue("imageUrls", existingUrls.filter((url) => {
            return url !== imageUrl
        }))
    }

    return (
        <div>
            <label className="text-gray-700 text-sm font-bold">Images</label>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingUrls && (
                        <div className="grid grid-cols-6 gap-4">
                            {existingUrls.map((url) => {
                                return <div className="relative group">
                                    <img src={url} className="min-h-screen object-cover" />
                                    <button 
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                        <span className="text-white">Delete</span>
                                    </button>
                                </div>
                            })}
                        </div>
                    )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full py-1 px-2 font-normal"
                    {...register("imageFiles", {
                        validate: (val) => {
                            const totalLength = val.length + (existingUrls?.length || 0);
                            if (totalLength === 0) {
                                return "At least one image"
                            }
    
                            if (totalLength > 6) {
                                return "Max 6 images"
                            }
    
                            return true
                        }
                    })}
                />

                {errors.imageFiles && (
                    <span className="text-red-500 text-sm">
                        {errors.imageFiles.message}
                    </span>
                )}
            </div>
        </div>
    )
}

export default ImageSection