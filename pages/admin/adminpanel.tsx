import AdminPagination from "@/components/adminpagination"
import Link from "next/link"
import { useEffect, useState } from "react"
import ProductDetails from "./productdetails"
import { useRouter } from 'next/router'
import CreateProduct from "./createform"

export default function AdminPanel({ children }: any) {

    const [products, setProducts] = useState([])
    const [length, setLenght] = useState<number>(0)
    const [pagination, setPagination] = useState<number>(1)
    const [ showAdmin, setShowAdmin ] = useState<boolean>(false)

    const router = useRouter()

    const [productList, setProductList] = useState<string[]>([])

    const [productShow, setProductShow] = useState('')

    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [showCreate, setShowCreate] = useState<boolean>(false)

    function adminView() {
        setShowCreate(false)
        setShowDetails(false)
    }


    async function getProducts() {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `admin/products?limit=10&offset=${10 * (pagination - 1)}`)
        const data = await response.json()
        // const length = Object.fromEntries(response.headers.entries()).count
        console.log(data)
        setProducts(data.products)
        setLenght(data.count)
    }

    function changeView(id: string) {
        setProductShow(id)
        setShowDetails(true)
    }

    function changeProductList(event: any) {
        const { value } = event.target
        productList.includes(value)
            ?
            setProductList((prevState) => prevState.filter((element: string) => element !== value))
            :
            setProductList((prevState) => [...prevState, value])
    }

    async function deleteProducts() {
        const token = localStorage.getItem('token')
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'admin/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'origin',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ products: productList })
        })
    }

    async function disableProducts() {
        const token = localStorage.getItem('token')
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'admin/disable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'origin',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(productList)
        })
    }

    async function checkAdmin() {

    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setShowAdmin(true)
        } else {
            router.push('/')
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [pagination])

    return (
        showAdmin
        ?
        <>
            <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 dark:bg-gray-800 dark:border-gray-700">
                <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8" aria-label="Global">
                    <div className="mr-5 lg:mr-0 lg:hidden">
                        <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a>
                    </div>

                    <div className="w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
                        <div className="sm:hidden">
                            <button type="button" className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="hidden sm:block">
                            <label htmlFor="icon" className="sr-only">Search</label>
                            <div className="flex relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                <input type="text" id="icon" name="icon" className="py-2 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Search" />
                                <div className="flex items-center ml-3 gap-3">
                                    {
                                        productList.length > 0
                                            ?
                                            <div className="flex gap-3">
                                                <button onClick={deleteProducts} className="btn btn-sm bg-red-500">Delete</button>
                                                <button onClick={disableProducts} className="btn btn-sm bg-yellow-400">Disable</button>
                                            </div>
                                            :
                                            null}
                                    <button onClick={() => setShowCreate(true)} className="btn btn-sm bg-green-600">Add product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center py-4">
                    <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle Navigation</span>
                        <svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                    <ol className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
                        <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                            Admin
                            <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </li>
                        <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
                            Dashboard
                        </li>
                    </ol>
                </div>
            </div>

            <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700 z-[60] hs-overlay-backdrop-open:z-[55]">
                <div className="px-6">
                    <img src="https://res.cloudinary.com/dgcsnhguo/image/upload/v1683231773/storydots/logo_vsgyyw.png" />
                </div>

                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li>
                            <span onClick={adminView} className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white hover:cursor-pointer">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                                </svg>
                                Dashboard
                            </span>
                        </li>

                        <li className="hs-accordion" id="users-accordion">
                            <span className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white">
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                                </svg>
                                Users (wip)
                            </span>


                        </li>
                    </ul>
                </nav>
            </div>

            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">





                {
                    showCreate
                    ?
                    <CreateProduct setShowCreate={setShowCreate}/>
                    :
                    showDetails
                        ?
                        <ProductDetails productShow={productShow} setShowDetails={setShowDetails} />
                        :
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="" />
                                            </label>
                                        </th>
                                        <th>Id</th>
                                        <th>Product</th>
                                        <th>Style</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Published</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        products
                                            ?
                                            products.map((element: any) => (
                                                <tr key={element.id}>
                                                    <th>
                                                        <label>
                                                            <input type="checkbox" value={element.id} checked={productList.includes(String(element.id))} className="" onChange={changeProductList} />
                                                        </label>
                                                    </th>
                                                    <td>
                                                        {element.id}
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <Link href={`/admin/product/${element.id}`}>
                                                                        <img src={element.image_url} alt={`img-${element.id}`} />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Link href={`/admin/product/${element.id}`}>
                                                                    <div className="font-bold">{element.name}</div>
                                                                </Link>
                                                                {/* <div className="font-bold">Hart Hagerty</div>
                                                    <div className="text-sm opacity-50">United States</div> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-ghost badge-sm">{element.style[0].style.name}</span>
                                                    </td>
                                                    <td>
                                                        <span>{element.category[0].category.name.replace('_', ' ')}</span>
                                                    </td>
                                                    <td>
                                                        <span>{element.price}</span>
                                                    </td>
                                                    <td>
                                                        <span>{element.published ? 'published' : 'NOT'}</span>
                                                    </td>
                                                    <th>
                                                        <span onClick={() => changeView(element.id)} className="btn btn-xs">details</span>
                                                    </th>
                                                </tr>
                                            ))
                                            :
                                            null
                                    }

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Product</th>
                                        <th>Style</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Published</th>
                                        <th>Details</th>
                                    </tr>
                                </tfoot>

                            </table>
                            <AdminPagination length={length} pagination={pagination} setPagination={setPagination} />
                        </div>
                }
            </div>
        </>
        :
        <p>Loading ...</p>
    )
}