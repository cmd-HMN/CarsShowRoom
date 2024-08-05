import { useQuery } from "react-query"
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from '../api-client'
import { useState } from "react"

const Search = () => {

    const search = useSearchContext()
    const [page, setPage] = useState<number>(1)

    const searchParams = {
        model: search.model
    
    }

    const {data: car} = useQuery(["searchHotels", searchParams], () => apiClient.shopSearch(searchParams))
    return (
        <div>
            {car?.data.length} Cars are found
            {car?.data.map((item, index) => (
                <div key={index}>
                    <h1>{item.model}</h1>
                </div>
            ))}
        </div>
    )
}

export default Search