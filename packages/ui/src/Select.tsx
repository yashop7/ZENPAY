"use client" //<-- To add this was important
export function Select ({
    label,
    onSelect,
    options
} :{
    label : string,
    onSelect : (value :string) => void,
    options : {
        key : string,
        value : string
    }[]
}){
    return <div className="mb-5 mt-2">
        <div className="pb-2">
            <label className="text-lg font-medium">{label}</label>
        </div>
        <div>
            <select onChange={(e) => onSelect(e.target.value)} className="rounded border-2 focus:outline-0 bg-gray-50 border w-11/12 p-1 cursor-pointer">
                {options.map((option) => 
                <option key={option.key}>{option.value}</option>
                )}
            </select>
        </div>
    </div>
}
