import { ProductDetails } from "@/interfaces/interfaces";
import ShopLayout from "./layout";
import DisplayProducts from "@/components/displayproducts";

export default function ShopMen({data, pagination, length}: { data: ProductDetails[], pagination: number, length: number }): JSX.Element {

    const filters = [
        {
          id: 'category',
          name: 'Category',
          options: [
            { value: 'mens_shirts', label: 'Shirts', checked: false },
            { value: 'mens_jeans', label: 'Jeans', checked: false },
            { value: 'mens_polos', label: 'Polos', checked: true },
            { value: 'mens_tees', label: 'T-Shirts', checked: false },
            { value: 'mens_pants', label: 'Pants', checked: false },
            { value: 'mens_shorts', label: 'Shorts', checked: false },
            { value: 'mens_sweaters', label: 'Sweaters', checked: false },
            { value: 'mens_outerwear', label: 'Outerwear', checked: false },
          ],
        }
      ]


    return(
        <ShopLayout filters={filters} title={'Mens clothing'} type={'mens'} staticPage={true} length={length} order={null} category={null}>
            <DisplayProducts data={data} title={'All mens'} pagination={pagination} type={'mens'} length={length} category={null} order={null}/>
        </ShopLayout>
    )
}

export async function getStaticProps() {
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=men&limit=12&offset=0`)
    const data = await response.json()

    const length = Object.fromEntries(response.headers.entries()).count
    return {
      props: {
        data,
        length,
        pagination: 1
      },
      revalidate: 1800,
    }
  }