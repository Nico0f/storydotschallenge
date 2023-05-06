import ShopLayout from "@/pages/mens/shop/layout";
import DisplayProducts from "@/components/displayproducts";
import { ProductDetails } from "@/interfaces/interfaces";
import { GetServerSidePropsContext } from "next";

export default function ShopWomen({ data, pagination, length }: {data: ProductDetails[], pagination: number, category: string[], length: number, order: string | null}): JSX.Element {

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
        <ShopLayout filters={filters} staticPage={true} title={'Womens clothing'} type={'womens'} category={null} length={length} order={null}>
            <DisplayProducts data={data} title={'All womens'} pagination={pagination} category={null} type={'womens'} length={length} order={null}/>
        </ShopLayout>
    )
}


export async function getStaticProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `products?style=women&limit=12&offset=0`)
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