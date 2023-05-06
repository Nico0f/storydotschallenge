import Link from "next/link"
import Card from "./card"
import Pagination from "./pagination"
export default function DisplayProducts({ data, category, type, length, pagination, title }: any) {
    return (
        <section>
            <div>
                <h2 className="text-4xl my-4">{title}</h2>
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

