import React from "react"
import { category } from "../../config/cars-option-config"

type Props = {
    category_: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CategoryFilter = ({category_, onChange}: Props) => {

    return (
        <div>
            <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Category</label>
                <div className="grid grid-cols-2 gap-3">
                    {category.map((cat) => (
                        <label key={cat} className="text-xs flex gap-1 text-gray-700">
                            <input
                                type="checkbox"
                                value={cat}
                                checked={category_?.includes(cat)}
                                onChange={onChange}
                            />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryFilter