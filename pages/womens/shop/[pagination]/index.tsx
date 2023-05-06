import DisplayProducts from "@/components/displayproducts";
import ShopLayout from "@/pages/mens/shop/layout";

export default function ShopMen({ data, pagination, category, length }: any) {

    const filters = [
        {
          id: 'category',
          name: 'Category',
          options: [
            { value: 'womens_dresses', label: 'Dresses', checked: false },
            { value: 'womens_jeans', label: 'Jeans', checked: false },
            { value: 'womens_pants', label: 'Pants', checked: false },
            { value: 'womens_shortsandskirts', label: 'Shorts & Skirts', checked: false },
            { value: 'womens_sweaters', label: 'Sweaters', checked: false },
            { value: 'womens_tops', label: 'Tops', checked: false },
            { value: 'womens_outerwear', label: 'Outerwear', checked: false },
          ],
        }
      ]


    return(
        <ShopLayout filters={filters} title={'title'} type={'womens'} category={category} length={length}>
            <DisplayProducts data={data} title={'All womens'} pagination={pagination} category={category} type={'womens'} length={length}/>
        </ShopLayout>
    )
}


export async function getServerSideProps({ query }: any) {
    const { pagination, category, order } = query
    const offset = (12 * ( pagination -1 ))
    const response =
    category && order
    ?
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=women&offset=${offset}&limit=12&order=${order}&category=${category}`)
    :
    category
    ?
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=women&offset=${offset}&limit=12&category=${category}`)
    :
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=women&offset=${offset}&limit=12&order=${order}`)
    
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