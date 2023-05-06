import Link from "next/link"
import { useEffect, useState, MouseEvent } from "react"

export default function CreateProduct({ setShowCreate }: { setShowCreate: Function }): JSX.Element {


    const [info, setInfo] = useState({
        name: '',
        price: '',
        description: '',
        image_url: '',
        published: '',
        style: '',
        category: '',
        brand: ''
    })

    const [errors, setErrors] = useState({
        name: true,
        price: true,
        description: true,
        image_url: true,
        published: true,
        style: true,
        category: true,
        brand: true
    })

    const [formState, setFormState] = useState({
        name: false,
        price: false,
        description: false,
        image_url: false,
        published: false,
        style: false,
        category: false,
        brand: false
    })



    function validateDisabled(event: MouseEvent) {
        event.preventDefault()
        if (info.name.length === 0) {
            setFormState((prevState) => ({ ...prevState, name: true }))
        }
        if (info.description.length === 0) {
            setFormState((prevState) => ({ ...prevState, description: true }))
        }
        if (info.image_url.length === 0) {
            setFormState((prevState) => ({ ...prevState, image_url: true }))
        }
        if (info.published.length === 0) {
            setFormState((prevState) => ({ ...prevState, published: true }))
        }
        if (Number(info.price) > 0) {
            setFormState((prevState) => ({ ...prevState, price: true }))
        }
        if (info.category.length === 0) {
            setFormState((prevState) => ({ ...prevState, category: true }))
        }
        if (info.brand.length === 0) {
            setFormState((prevState) => ({ ...prevState, brand: true }))
        }
        if (info.style.length === 0) {
            setFormState((prevState) => ({ ...prevState, style: true }))
        }
    }

    function validate(info: any) {
        if (info.name.length > 0) {
            setErrors((prevState) => ({ ...prevState, name: false }))
            setFormState((prevState) => ({ ...prevState, name: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, name: true }))
        }
        if (info.published.length > 0) {
            setErrors((prevState) => ({ ...prevState, published: false }))
            setFormState((prevState) => ({ ...prevState, published: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, published: true }))
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
        if (Number(info.price) > 0) {
            console.log('yes')
            setErrors((prevState) => ({ ...prevState, price: false }))
            setFormState((prevState) => ({ ...prevState, price: true }))
        } else {
            console.log('no')

            setErrors((prevState) => ({ ...prevState, price: true }))
        }
        if (info.category.length > 0) {
            setErrors((prevState) => ({ ...prevState, category: false }))
            setFormState((prevState) => ({ ...prevState, category: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, category: true }))
        }
        if (info.brand.length > 0) {
            setErrors((prevState) => ({ ...prevState, brand: false }))
            setFormState((prevState) => ({ ...prevState, brand: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, brand: true }))
        }
        if (info.style.length > 0) {
            setErrors((prevState) => ({ ...prevState, style: false }))
            setFormState((prevState) => ({ ...prevState, style: true }))
        } else {
            setErrors((prevState) => ({ ...prevState, style: true }))
        }
    }








    function handleInputsChange(event: any): any {
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
                                onChange={handleInputsChange}
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

                        <div className="col-span-3">
                            <label htmlFor="published" className="block text-xs font-medium text-gray-700">
                                Published
                            </label>
                            <select
                                id="published"
                                name='published'
                                className=
                                {
                                    (formState.published && errors.published)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleInputsChange}
                            >
                                <option value=''>Select option...</option>
                                <option value='true'>True</option>
                                <option value='false'>False</option>
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
                                onChange={handleInputsChange}
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
                                onChange={handleInputsChange}
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
                                    (formState.style && errors.style)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleInputsChange}
                            >
                                <option value=''>Select option...</option>
                                <option value='women'>Women</option>
                                <option value='men'>Men</option>
                            </select>
                            <label htmlFor="category" className="block text-xs font-medium text-gray-700">
                                Category
                            </label>

                            <select
                                id="category"
                                name='category'
                                className=
                                {
                                    (formState.category && errors.category)
                                        ?
                                        "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                        :
                                        "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                }
                                onChange={handleInputsChange}
                            >
                                <option value=''>Select option...</option>
                                {
                                    info.style === 'women'
                                    ?
                                    <>
                                    <option value='womens_sweaters'>Sweaters</option>
                                    <option value='womens_tops'>Tops & Shirts</option>
                                    <option value='womens_jeans'>Denim</option>
                                    <option value='womens_pants'>Pants</option>
                                    <option value='womens_outerwear'>Outerwear</option>
                                    <option value='womens_dresses'>Dresses</option>
                                    <option value='womens_shortsandskirts'>Shorts & Skirts</option>
                                    </>
                                    :
                                    info.style === 'men'
                                    ?
                                    <>
                                    <option value='mens_sweaters'>Sweaters</option>
                                    <option value='mens_shirts'>Shirts</option>
                                    <option value='mens_jeans'>Jeans</option>
                                    <option value='mens_pants'>Pants</option>
                                    <option value='mens_shorts'>Shorts</option>
                                    <option value='mens_tees'>T-Shirts</option>
                                    <option value='mens_polos'>Polos</option>
                                    <option value='mens_outerwear'>Outerwear</option>
                                    </>
                                    :
                                    <option value=''>Select style first</option>


                                }
                            </select>
                        </div>
                        <div className="col-span-6">
                            <div className="grid grid-cols-8 gap-4">
                            <div className="hidden md:col-span-2 md:flex lg:col-span-2 lg:flex"></div>
                                <div className="md:col-span-2 lg:col-span-2 col-span-4">
                                    <label htmlFor="brand" className="block text-xs font-medium text-gray-700">
                                        Brand
                                    </label>

                                    <select
                                        id="brand"
                                        name='brand'
                                        className=
                                        {
                                            (formState.brand && errors.brand)
                                                ?
                                                "form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                                :
                                                "form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                        }
                                        onChange={handleInputsChange}
                                    >
                                        <option value=''>Select option...</option>
                                        <option value='Lotte'>Lotte</option>
                                        <option value='Fit'>Fit</option>
                                        <option value='Globals'>Globals</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 lg:col-span-2 col-span-4">
                                <label htmlFor="price" className="block text-xs font-medium text-gray-700">
                                    Price
                                </label>
                                <input
                                    type='number'
                                    id="price"
                                    name='price'
                                    className=
                                    {
                                        (formState.price && errors.price)
                                            ?
                                            "md:col-span-2 lg:col-span-2 col-span-4 form-control w-full mt-1 border-red-500 focus:border-red-500 focus:ring-transparent rounded-md shadow-sm sm:text-sm"
                                            :
                                            "md:col-span-2 lg:col-span-2 col-span-4 form-control w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                    }
                                    onChange={handleInputsChange}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            {(errors.name || errors.published || errors.description || errors.image_url || errors.price || errors.category || errors.brand || errors.style)
                                ?
                                <button
                                    className="block w-full rounded-md bg-gray-500 p-2.5 text-sm text-white transition hover:shadow-lg"
                                    onClick={validateDisabled}
                                >
                                    Create Product
                                </button>
                                :
                                <button
                                    className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                                    onClick={() => console.log('arreglar')}
                                >
                                    Create Product
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}