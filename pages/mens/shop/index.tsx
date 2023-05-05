import ShopLayout from "./layout";
import DisplayProducts from "@/components/displayproducts";

export default function ShopMen({data, pagination, length}: any) {

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
        <ShopLayout filters={filters} title={'title'} type={'mens'} staticPage={true} length={length}>
            <DisplayProducts data={data} pagination={pagination} type={'mens'} length={length}/>
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