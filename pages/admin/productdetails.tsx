import { ChangeEvent, useEffect, useState } from "react"

export default function ProductDetails({ productShow, setShowDetails }: any) {

    const [productDetails, setProductDetails] = useState({
        id: '',
        name: '',
        description: '',
        image_url: '',
        price: '',
        published: ''
    })

    const [productInfo, setProductInfo] = useState({
        id: false,
        name: false,
        description: false,
        image_url: false,
        price: false
    })

    const [editProductInfo, setEditProductInfo] = useState({
        id: '',
        name: '',
        description: '',
        image_url: '',
        price: '',
    })

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;
        setEditProductInfo((prevState) => ({ ...prevState, [name]: value }))
    }

    function cancelInput(event: ChangeEvent<HTMLButtonElement>) {
        const name = event.target.id
        setEditProductInfo((prevState) => ({ ...prevState, [name]: '' }))
        setProductInfo((prevState) => ({ ...prevState, [name]: false }))
    }



    async function getProduct() {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `admin/products/${productShow}`)
        const data = await response.json()
        const newProduct = {
            id: data.id,
            name: data.name,
            description: data.description,
            image_url: data.image_url,
            price: data.price,
            published: data.published
        }
        setProductDetails(newProduct)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            <div onClick={() => setShowDetails(false)} className="hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>

            </div>
            <form className="grid grid-cols-6 gap-4 mt-6">
                <div className="col-span-6 sm:col-span-3 bg-gray-300 rounded-lg">
                    <span className="ml-2 font-bold">Product image</span>
                    <div className='flex items-center'>
                        <div className=''>
                            <img className="rounded-xl w-32 m-2" src={productDetails.image_url} alt='Product-image' />
                        </div>
                        <div className="grid justify-items-center h-fit">
                            <div className="flex">
                                {/* <form className="flex items-center space-x-6" onChange={updateAvatar}> */}
                                {/* <button className='btn btn-xs sm:btn-sm'>Update profile picture</button> */}
                                {/* <input type="file" onChange={updateAvatar} className="file-input file-input-bordered file-input-sm w-full max-w-xs" /> */}
                                {/* </form> */}
                                {/* @ts-ignore */}
                                {/* <button className='btn btn-xs sm:btn-sm btn-error ml-1' onClick={deleteAvatar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            </button> */}
                            </div>
                            <span className="text-[9px] sm:text-xs">Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    {
                        productInfo.name
                            ?
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    Product name •
                                    {/* @ts-ignore */}
                                    <span id='name' className="text-[9px] hover:cursor-pointer text-red-500" onClick={cancelInput}> Cancel edit</span>
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name='name'
                                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                    value={editProductInfo.name}
                                    onChange={handleChange}
                                />
                            </div>
                            :
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    Product name •
                                    <span className="text-[9px] hover:cursor-pointer text-blue-500" onClick={() => setProductInfo((prevState) => ({ ...prevState, name: true }))}> Edit</span>
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    placeholder={productDetails.name}
                                    value={productDetails.name}
                                    disabled
                                    className="w-full mt-1 border-gray-200 text-gray-400 rounded-md shadow-sm sm:text-sm"
                                />

                            </div>
                    }
                    {
                        productInfo.image_url
                            ?
                            <div>
                                <label
                                    htmlFor="image_url"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    Image url •
                                    {/* @ts-ignore */}
                                    <span id='image_url' className="text-[9px] hover:cursor-pointer text-red-500" onClick={cancelInput}> Cancel edit</span>
                                </label>

                                <input
                                    type="text"
                                    id="image_url"
                                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                    name='image_url'
                                    value={editProductInfo.image_url}
                                    onChange={handleChange}
                                />
                            </div>
                            :
                            <div>
                                <label
                                    htmlFor="Image url"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    Image url •
                                    <span className="text-[9px] hover:cursor-pointer text-blue-500" onClick={() => setProductInfo((prevState) => ({ ...prevState, image_url: true }))}> Edit</span>
                                </label>

                                <input
                                    type="text"
                                    id="image_url"
                                    placeholder={productDetails.image_url}
                                    value={productDetails.image_url}
                                    disabled
                                    className="w-full mt-1 border-gray-200 text-gray-400 rounded-md shadow-sm sm:text-sm"
                                />

                            </div>
                    }
                </div>

                {
                        productInfo.description
                            ?
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    Description •
                                    {/* @ts-ignore */}
                                    <span id='description' className="text-[9px] hover:cursor-pointer text-red-500" onClick={cancelInput}> Cancel edit</span>
                                </label>

                                <input
                                    type="text"
                                    id="description"
                                    className="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
                                    name='description'
                                    value={editProductInfo.description}
                                    onChange={handleChange}
                                />
                            </div>
                            :
                            <div>
                                <label
                                    htmlFor="Description"
                                    className="block text-xs font-medium text-gray-700"
                                >
                                    Description •
                                    <span className="text-[9px] hover:cursor-pointer text-blue-500" onClick={() => setProductInfo((prevState) => ({ ...prevState, description: true }))}> Edit</span>
                                </label>

                                <input
                                    type="text"
                                    id="description"
                                    placeholder={productDetails.description}
                                    value={productDetails.description}
                                    disabled
                                    className="w-full mt-1 border-gray-200 text-gray-400 rounded-md shadow-sm sm:text-sm"
                                />

                            </div>
                    }

            </form>


        </div>
    )
}

