import { useQuery } from "react-query";
import * as apiClient from '../api-client'; 
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import { CarType } from "../forms/CarsForm/ManageCarsFrom";


const AdminMyCars = () => {
    const { data: carData, isLoading, isError } = useQuery<CarType[]>("fetchCar", apiClient.fetchCar, {
        onError: (error) => {
            console.error('Error fetching car data:', error);
        }
    });

    if(!carData){
        return <p>
            no such data </p>
    }

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error loading car data.</span>;
    }


    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">Contributions</h1>
                <Link to={"/admin/admin-form"} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">
                    Add Car
                </Link>
            </span>

            <div className="grid grid-cols-1 gap-8">
                {carData.map((car) => {

                    return (
                        <div className="flex flex-col justify-between border border-slate-300 rounded-lg gap-5 p-4" key={car._id}>
                            <h2 className="text-2xl font-bold">{car.model}</h2>
                            <div 
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(car.description) }}
                            />
                            <div className="flex justify-between">
                                <p className="text-2xl font-bold">{car.price}</p>
                                <p className="text-2xl font-bold">{car.width}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-2xl font-bold">{car.category.join(', ')}</p>
                            </div>
                            
                            <span className="flex justify-end">
                                <Link to={`/admin/edit-form/${car._id}`} className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">
                                    View Details
                                </Link>
                            </span>
                            
                            </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminMyCars;
