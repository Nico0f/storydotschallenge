import Link from "next/link"
import { useEffect, useState, MouseEvent } from "react"

export default function CreateProduct({ setShowCreate }: any): JSX.Element {


    const [info, setInfo] = useState({
        name: '',
        price: '',
        lastName: '',
        description: '',
        image_url: '',
        detail: '',
        city: '',
        country: '',
        state: '',
        postalCode: '',
        phone: '',
    })

    const [errors, setErrors] = useState({
        name: true,
        lastName: true,
        description: true,
        image_url: true,
        city: true,
        country: true,
        state: true,
        postalCode: true,
        phone: true,
    })

    const [formState, setFormState] = useState({
        name: false,
        lastName: false,
        description: false,
        image_url: false,
        city: false,
        country: false,
        state: false,
        postalCode: false,
        phone: false,
    })



    function validateDisabled(event: MouseEvent) {
        event.preventDefault()
        if (info.name.length === 0) {
            setFormState((prevState) => ({ ...prevState, name: true }))
        }
        if (info.lastName.length === 0) {
            setFormState((prevState) => ({ ...prevState, lastName: true }))
        }
        if (info.description.length === 0) {
            setFormState((prevState) => ({ ...prevState, description: true }))
        }
        if (info.image_url.length === 0) {
            setFormState((prevState) => ({ ...prevState, image_url: true }))
        }
        if (info.detail.length === 0) {
            setFormState((prevState) => ({ ...prevState, detail: true }))
        }
        if (info.city.length === 0) {
            setFormState((prevState) => ({ ...prevState, city: true }))
        }
        if (info.country.length === 0) {
            setFormState((prevState) => ({ ...prevState, country: true }))
        }
        if (info.state.length === 0) {
            setFormState((prevState) => ({ ...prevState, state: true }))
        }
        if (info.postalCode.length === 0) {
            setFormState((prevState) => ({ ...prevState, postalCode: true }))
        }
        if (info.phone.length === 0) {
            setFormState((prevState) => ({ ...prevState, phone: true }))
        }
    }

    function validate(info: any) {
        if (info.name.length > 0) {
            setErrors((prevState) => ({ ...prevState, name: false }))
            setFormState((prevState) => ({ ...prevState, name: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, name: true }))
        }
        if (info.lastName.length > 0) {
            setErrors((prevState) => ({ ...prevState, lastName: false }))
            setFormState((prevState) => ({ ...prevState, lastName: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, lastName: true }))
        }
        if (info.description.length > 0) {
            setErrors((prevState) => ({ ...prevState, description: false }))
            setFormState((prevState) => ({ ...prevState, description: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, description: true }))
        }
        if (info.image_url.length > 0) {
            setErrors((prevState) => ({ ...prevState, image_url: false }))
            setFormState((prevState) => ({ ...prevState, image_url: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, image_url: true }))
        }
        if (info.detail.length > 0) {
            setErrors((prevState) => ({ ...prevState, detail: false }))
            setFormState((prevState) => ({ ...prevState, detail: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, detail: true }))
        }
        if (info.city.length > 0) {
            setErrors((prevState) => ({ ...prevState, city: false }))
            setFormState((prevState) => ({ ...prevState, city: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, city: true }))
        }
        if (info.country.length > 0) {
            setErrors((prevState) => ({ ...prevState, country: false }))
            setFormState((prevState) => ({ ...prevState, country: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, country: true }))
        }
        if (info.state.length > 0) {
            setErrors((prevState) => ({ ...prevState, state: false }))
            setFormState((prevState) => ({ ...prevState, state: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, state: true }))
        }
        if (info.postalCode.length > 0) {
            setErrors((prevState) => ({ ...prevState, postalCode: false }))
            setFormState((prevState) => ({ ...prevState, postalCode: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, postalCode: true }))
        }
        if (info.phone.length > 0) {
            setErrors((prevState) => ({ ...prevState, phone: false }))
            setFormState((prevState) => ({ ...prevState, phone: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, phone: true }))
        }
    }








    function handleAddressChange(event: any): any {
        //@ts-ignore
        const { name, value } = event.target
        setInfo((prevState) => ({ ...prevState, [name]: value }))
    }




    useEffect(() => {
        validate(info);
    }, [info])


    return (
        <section>
            <div onClick={() => setShowCreate(false)} className="hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>

            </div>
            <div className="bg-white">
                <div className="px-4 mx-auto lg:px-16">
                    <div className="flex items-center justify-center sm:justify-start border-b pb-2">
                        <p className="text-xl text-gray-600">Create Product</p>
                    </div>
                    <form className="grid grid-cols-6 gap-4 mt-6">
                        <div className="col-span-3">
                            <label
                                htmlFor="name"
                                className="block text-xs font-medium text-gray-700"
                            >
                                Product Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={
                                    (formState.name && errors.name)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleAddressChange}
                            />
                            {
                                (formState.name && errors.name)
                                    ?
                                    <label className="absolute w-full h-0 label">
                                        <span className="label-text-alt text-red-500">* Required</span>
                                    </label>
                                    :
                                    null
                            }
                        </div>

                        <div className="col-span-6 md:col-span-3 lg:col-span-3">
                            <label htmlFor="style" className="block text-xs font-medium text-gray-700">
                                Published
                            </label>
                            <select
                                id="style"
                                name='style'
                                className=
                                {
                                    (formState.description && errors.description)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleAddressChange}
                            >
                                <option value='true'>true</option>
                                <option value='false'>false</option>
                            </select>
                        </div>



                        <div className="col-span-6">
                            <label htmlFor="image_url" className="block text-xs font-medium text-gray-700">
                                Image Url
                            </label>

                            <input
                                type="text"
                                id="image_url"
                                name="image_url"
                                className=
                                {
                                    (formState.image_url && errors.image_url)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleAddressChange}
                            />
                            {
                                (formState.image_url && errors.image_url)
                                    ?
                                    <label className="absolute w-full h-0 label">
                                        <span className="label-text-alt text-red-500">* Required</span>
                                    </label>
                                    :
                                    null
                            }
                        </div>
                        <div className="col-span-6 md:col-span-3 lg:col-span-3">
                            <label htmlFor="Description" className="block text-xs font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                id="description"
                                name='description'
                                className=
                                {
                                    (formState.description && errors.description)
                                        ?
                                        "form-control h-3/4 w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control h-3/4 w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleAddressChange}
                            >
                            </textarea>
                            {
                                (formState.description && errors.description)
                                    ?
                                    <label className="absolute w-full h-0 label">
                                        <span className="label-text-alt text-red-500">* Required</span>
                                    </label>
                                    :
                                    null
                            }
                        </div>
                        <div className="col-span-6 md:col-span-3 lg:col-span-3">
                            <label htmlFor="style" className="block text-xs font-medium text-gray-700">
                                Style
                            </label>

                            <select
                                id="style"
                                name='style'
                                className=
                                {
                                    (formState.description && errors.description)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleAddressChange}
                            >
                                <option value='women'>Women</option>
                                <option value='men'>Men</option>
                                <option value=''>Unisex</option>
                                <option value=''>Other...</option>
                            </select>
                            <label htmlFor="category" className="block text-xs font-medium text-gray-700">
                                Category
                            </label>

                            <select
                                id="category"
                                name='category'
                                className=
                                {
                                    (formState.description && errors.description)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleAddressChange}
                            >
                                <option value=''>Categories</option>
                            </select>
                        </div>
                        <div className="col-span-6">
                            {(errors.name || errors.lastName || errors.description  || errors.city || errors.country || errors.state || errors.postalCode || errors.phone)
                                ?
                                <button
                                    className="block w-full rounded-md bg-gray-500 p-2.5 text-sm text-white transition hover:shadow-lg"
                                    onClick={validateDisabled}
                                >
                                    Proceed to Payment
                                </button>
                                :
                                <button
                                    className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                                    onClick={() => console.log('arreglar')}
                                >
                                    Proceed to Payment
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}