"use client" //<-- To add this was important
export function TextInput ({
    label,
    onChange,
    placeholder
} :{
    label : string,
    onChange : (value : string ) => void ,//<-- This is how to write function
    placeholder : string
}){
    return <div className="mb-5 mt-2">
        <div className="pb-2">
            <label className="text-lg font-medium">{label}</label>
        </div>
        <div className="w-full">
            <input onChange={(e) => onChange(e.target.value)} className="rounded border-2 focus:outline-0 bg-gray-50 border w-11/12 p-1 cursor-pointer" type="text" placeholder={placeholder}/>
        </div>
    </div>
}

//IT IS INTERSESTING TO SEE HOW TO USE ONCHANGE LIEK THIS
//THERE IS SO MUCH TO LEARN ABOUT