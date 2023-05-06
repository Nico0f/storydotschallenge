import ShopLayout from "../layout";
import DisplayProducts from "@/components/displayproducts";

export default function ShopMen({ data, pagination, category, length }: any) {

    const filters = [
        {
          id: 'category',
          name: 'Category',
          options: [
            { value: 'mens_shirts', label: 'Shirts', checked: false },
            { value: 'mens_jeans', label: 'Jeans', checked: false },
            { value: 'mens_polos', label: 'Polos', checked: false },
            { value: 'mens_tees', label: 'T-Shirts', checked: false },
            { value: 'mens_pants', label: 'Pants', checked: false },
            { value: 'mens_shorts', label: 'Shorts', checked: false },
            { value: 'mens_sweaters', label: 'Sweaters', checked: false },
            { value: 'mens_outerwear', label: 'Outerwear', checked: false },
          ],
        }
      ]


    return(
        <ShopLayout filters={filters} title={'title'} type={'mens'} category={category} length={length}>
            <DisplayProducts data={data} title={'All mens'} pagination={pagination} category={category} type={'mens'} length={length}/>
        </ShopLayout>
    )
}


export async function getServerSideProps({ query }: any) {
    const { pagination, category, order } = query
    const offset = (12 * ( pagination -1 ))
    const response =
    category && order
    ?
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=men&offset=${offset}&limit=12&order=${order}&category=${category}`)
    :
    category
    ?
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=men&offset=${offset}&limit=12&category=${category}`)
    :
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=men&offset=${offset}&limit=12&order=${order}`)
    
    const data = await response.json()
    
    const length = Object.fromEntries(response.headers.entries()).count

    if (order && category) {
      return {
        props: {
          data,
          length,
          pagination: Number(pagination),
          category
        },
      }
    } else if (order) {
      return {
        props: {
          data,
          length,
          pagination: Number(pagination),
        },
      }
    } else if (category) {
      return {
        props: {
          data,
          length,
          pagination: Number(pagination),
          category
        },
      }
    } else {
      return {
        props: {
          data,
          length,
          pagination: Number(pagination),
        },
      }
    }
  }