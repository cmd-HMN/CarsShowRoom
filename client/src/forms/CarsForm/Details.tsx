import { useFormContext } from "react-hook-form";
import { CarType } from "./ManageCarsFrom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import ImageSection from "./ImageSection";
import Category from "./Category";

type Props = {
  edit: boolean
}
const Details = ({edit}: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CarType>();

  const editorValue = watch("description");

  useEffect(() => {
    register("description", { required: "This field is required" });
  }, [register]);

  const onEditorChange = (value: string) => {
    setValue("description", value, { shouldValidate: true });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <h1 className="flex justify-center items-center font-bold text-3xl my-6">
        Add/Edit Cars
      </h1>
      {edit && 
      <div className="my-1">
            <span className="text-sm font-bold">
                Instructions
                <p>
                    1. Upload images first
                    <br />
                    2. Then fill in the form
                </p>
            </span>
        </div>
}
      <div className="p-6 gap-8 border border-gray-300 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm font-bold">Car Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("model", { required: "This field is required" })}
            />
            {errors.model && (
              <span className="text-red-500 text-sm">
                {errors.model.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm font-bold">Price</label>
            <input
              type="text"
              placeholder="The price should be in dollars"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
              {...register("price", { required: "This field is required" })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2 h-72">
          <label className="text-gray-700 text-sm font-bold">Description</label>
          <ReactQuill
            value={editorValue || ""}
            onChange={onEditorChange}
            placeholder={editorValue ? "" : "Enter the description(required)"}
            className="h-40"
            modules={modules}
            formats={formats}
          />

          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2 -mt-9">
          <Category />
          <div className="flex flex-col space-y-2 -mt-9">
            <label className="text-gray-700 text-sm font-bold">Company</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
              {...register("company", { required: "This field is required" })}
            />
            {errors.company && (
              <span className="text-red-500 text-sm">
                {errors.company.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 text-sm font-bold">Sold</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("sold", { required: "This field is required" })}
            />
            {errors.sold && (
              <span className="text-red-500 text-sm">
                {errors.sold.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 text-sm font-bold max-w[50%]">
              Rating
              <select
                {...register("rating", {
                  required: "This Field is Required",
                })}
                className="border rounded w-full p-2 text-gray-700 font-normal"
              >
                <option value="" className="text-xm font-bold">
                  Select a Rating
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.rating && (
                <span className="text-red-500">{errors.rating.message}</span>
              )}
            </label>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-3">
          <ImageSection />
        </div>
      </div>
    </>
  );
};

export default Details;
