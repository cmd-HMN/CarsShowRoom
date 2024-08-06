import { UserType } from "../../server/src/models/user.model";
import { CarType } from "./forms/CarsForm/ManageCarsFrom";
import { UserModelType } from "./pages/Profile";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export type SignUp = {
    email: string;
    password: string;
    name: string;   
}
export const signup = async (data: SignUp) => {

    try{
    const response = await fetch(`${API_BASE_URL}/new-user/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    if (response.status === 200) {
        return response.json();
    }

    if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.msg)
    }

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
}catch (err) {
    if (err instanceof Error) {
        throw new Error(err.message || 'Sign in failed');
    } else {
        throw new Error('Sign in failed');
    }
}
}

export type SignInDataType = {
    email: string;
    password: string;
}
export const signin = async (data: SignInDataType) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            return response.json();
        }

        if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Sign in failed');
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message || 'Sign in failed');
        } else {
            throw new Error('Sign in failed');
        }
    }
}


export const signout = async() => {

    const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign out failed')
    }

    return response

}
export const validateToken = async ()=> {

    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Token invalid')
    }

    return response.json()
}

export const admSignIn = async (data: SignInDataType) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/sign-in`, {
        credentials: 'include',
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
    return response.json()
}

export const admValidateToken = async () => {

    const response = await fetch(`${API_BASE_URL}/api/admin/validate-token`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Token invalid')
    }
    
    return response.json();
}

export const admCarsForm = async (data: FormData) => {
    
    const response = await fetch(`${API_BASE_URL}/api/admin/form`, {
        credentials: 'include',
        method:"POST",
        body: data,
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    return response.json()
}

export const fetchCar = async() => {

    const response = await fetch(`${API_BASE_URL}/api/admin`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
    return response.json()
}

export const fetchCarById = async(carId: string):Promise<CarType> =>{

    const response = await fetch(`${API_BASE_URL}/api/admin/${carId}`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
    
    return response.json()
}

export const admEditCar = async(data: FormData) => {

    const response = await fetch(`${API_BASE_URL}/api/admin/${data.get("carId")}`, {
        credentials: 'include',
        method:"POST",
        body: data,
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    return response.json()
}

export const featuredProduct = async():Promise<CarType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/admin/featured-product`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
    
    return response.json()
}

export const bestSellerProd = async():Promise<CarType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/admin/best-seller-product`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('No such thing')
    }
    
    return response.json()
}
export type news= {
    email: string
}
export const newsLetter = async(data: news) => {

    const response = await fetch(`${API_BASE_URL}/api/auth/news`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    return response.json()

}

export const getUser = async () => {

    const response = await fetch(`${API_BASE_URL}/api/auth`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    const data = await response.json()
    return data


}
export const getUserProfile = async(userId: string):Promise<UserType> => {

    const response = await fetch(`${API_BASE_URL}/api/auth/profile/${userId}`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
    
    return response.json()

}

export const updateUserProfile = async (userId:string, data: UserModelType) => {

    const response = await fetch(`${API_BASE_URL}/api/auth/update/${userId}`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
},
        body: JSON.stringify(data)
    })

    
    if(!response.ok) {
        throw new Error('update failed')
    }

    return response.json()
}

export const addToCart = async (userId:string, carID:string) => {
    
    const response = await fetch(`${API_BASE_URL}/api/profile/cart/${userId}/${carID}`, {
        credentials: 'include',
        method: 'PUT',
    })

    if(response.status == 400) {
        throw new Error('Car already in Cart')
    }
    if(!response.ok) {
        throw new Error('failed')
    }
    
    return response.json()
}

export const addToFav = async (userId:string, carID:string) => {
    
    const response = await fetch(`${API_BASE_URL}/api/profile/favorite/${userId}/${carID}`, {
        credentials: 'include',
        method: 'PUT',
    })

    if(response.status == 400) {
        throw new Error('Car already in favorite')
    }
    if(!response.ok) {
        throw new Error('failed')
    }
    
    return response.json()
}

export type ReportForm = {
    userId: string;
    detail: string
}
export const ReportProblem = async(data: ReportForm) => {

    const response = await fetch(`${API_BASE_URL}/api/contact-us/report`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    return response.json()
}

export const ChangeSold = async(carId: string) => {

    const response = await fetch(`${API_BASE_URL}/api/profile/sold/${carId}`,{
        credentials: 'include',
        method: 'PUT',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    response.json()
}
export const ChangeFav = async(carId: string) => {

    const response = await fetch(`${API_BASE_URL}/api/profile/fav/${carId}`,{
        credentials: 'include',
        method: 'PUT',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    response.json()
}

export const removeFromCart = async (userId:string, carId:string) => {

    const response = await fetch(`${API_BASE_URL}/api/profile/cart/remove/${userId}/${carId}`, {
        credentials: 'include',
        method: 'PUT',
    })
    
    if(!response.ok) {
        throw new Error('failed')
    }
    
    return response.json()

}
export const removeFromFav = async (userId:string, carId:string) => {

    const response = await fetch(`${API_BASE_URL}/api/profile/fav/remove/${userId}/${carId}`, {
        credentials: 'include',
        method: 'PUT',
    })
    
    if(!response.ok) {
        throw new Error('failed')
    }
    
    return response.json()
}


export type CarsSearchProps = {
    data: CarType[],
    pagination: {
        total: number
        page: number,
        pages: number,
    },
};

export const getLatestCar = async():Promise<CarType[]> => {

    const response = await fetch(`${API_BASE_URL}/api/shop/latest`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }

    return response.json()
}

export type searchParams = {
    model?: string
    company?: string
    page?:string
    pageSize?:string
    category?:string[]
    maxPrice?:string
    minPrice?:string
    sort?: string
}

export const shopSearch_ = async (searchParams: searchParams):Promise<CarsSearchProps> => {


    const queryParams = new URLSearchParams()

    if(searchParams.model){
        queryParams.append('model', searchParams.model || "");
    }

    if(searchParams.company){
        queryParams.append('company', searchParams.company || "");
    }
    if(searchParams.page){
        queryParams.append('page', searchParams.page || "");
    }
    if(searchParams.pageSize){
        queryParams.append('pageSize', searchParams.pageSize || "");
    }
    if(searchParams.sort){
        queryParams.append('sort', searchParams.sort || "");
    }

    if(searchParams.maxPrice){
        queryParams.append('maxPrice', searchParams.maxPrice || "");
    }

    searchParams.category?.forEach((cat) => (
        queryParams.append('category', cat)

    ))
    if(searchParams.minPrice) {
        queryParams.append('minPrice', searchParams.minPrice || "");
    }
    const response = await fetch(`${API_BASE_URL}/api/shop/search?${queryParams}`, {
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error('Sign in failed')
    }
    
    return await response.json()
}