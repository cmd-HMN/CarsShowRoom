import { useQuery } from "react-query"
import * as apiClient from '../api-client'
import { useLoadingContext } from "../context/LoadingContext";
import { useEffect } from "react";
import AdmSideBar from "../components/Admin/AdmSideBar";

interface AdmData {
    name: string;
    email: string;
}
const AdminProfile = () => {

    const {setLoading} = useLoadingContext()
    const {data: admId, isLoading: admIdLoading} = useQuery("AdmId", apiClient.getAdmId)
    const {data: admProfile, isLoading: admProfileLoading} = useQuery<AdmData>(["admProfile", admId], () => apiClient.getAdmProfile(admId))

    useEffect(()=> {
        setLoading(admIdLoading || admProfileLoading)
    }, 
    [admIdLoading, admProfileLoading, setLoading])

    return (
        <div className="flex min-h-screen">
            <div className="sticky top-0 h-full">
            <AdmSideBar 
            optionOne={true}
            optionTwo={false}
            optionThree={false}
            optionFour={false}
            optionFive={false}
            head="Profile"
            />
            </div>
            <div className="w-full h-full flex-col p-2 sm:p-5">
                    <div className="flex flex-row flex-wrap font-bold text-sm sm:text-lg justify-between items-center">
                        <div className="flex flex-row">
                        Name:
                        <span className="flex text-orange-500 text-xs sm:text-sm ml-1 justify-center items-center">
                            {admProfile?.name}
                            </span>
                    </div>
                        <div className="flex flex-row flex-wrap">
                        Email:
                        <span className="flex text-orange-500 text-xs sm:text-sm ml-1 justify-center items-center">
                            {admProfile?.email}
                            </span>
                    </div>
                        </div>
                        <div className="mt-8 flex justify-center items-center">
                            <i>To change the password or for any inquiry, contact the main head office.</i>
                        </div>
                        <div className='flex flex-row flex-wrap justify-evenly font-bold mt-10'>
                <a href='tel:"+(234)3214"' className='text-sm text-orange-500 hover:text-green-500'>Phone</a>     
                <a href='mailto:"hmnonly1029@gmail.com"' className='text-sm text-orange-500 hover:text-green-500'>Email</a>     
                <a href='http://github.com/cmd-HMN' className='text-sm text-orange-500 hover:text-green-500'>Contact</a>     
          </div>
            </div>
            
        </div>
    )
}

export default AdminProfile