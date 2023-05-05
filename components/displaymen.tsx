import Link from "next/link"
import Card from "./card"
import Pagination from "./pagination"
export default function DisplayMen({ data, category, type, length, pagination }: any) {
    return (
        <section>
            <div className="flex">
                <Link href='' className="text-gray-600 font-light text-sm hover:text-gray-900">Home</Link >
                <span className="text-gray-600 mx-1 font-light text-sm">/</span>
                <Link href='' className="text-gray-600 font-light text-sm hover:text-gray-900">Men</Link >
                <span className="text-gray-600 mx-1 font-light text-sm">/</span>
                <span className="text-gray-600 font-light text-sm hover:text-gray-900">All</span >
            </div>
            <div>
                <h2 className="text-4xl my-4">All men's</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3">
                {
                    data.map((product: any) => <Card key={product.id} id={product.id} name={product.name} price={product.price} colors={product.color}/>)
                }
            </div>
            <Pagination category={category} type={type} length={length} pagination={pagination}/>
        </section>
    )
}

