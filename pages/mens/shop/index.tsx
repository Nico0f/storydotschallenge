import DisplayMen from "@/components/displaymen";
import ShopLayout from "./layout";

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
        },
        // {
        //   id: 'category',
        //   name: 'Category',
        //   options: [
        //     { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        //     { value: 'sale', label: 'Sale', checked: false },
        //     { value: 'travel', label: 'Travel', checked: true },
        //     { value: 'organization', label: 'Organization', checked: false },
        //     { value: 'accessories', label: 'Accessories', checked: false },
        //   ],
        // },
        // {
        //   id: 'size',
        //   name: 'Size',
        //   options: [
        //     { value: '2l', label: '2L', checked: false },
        //     { value: '6l', label: '6L', checked: false },
        //     { value: '12l', label: '12L', checked: false },
        //     { value: '18l', label: '18L', checked: false },
        //     { value: '20l', label: '20L', checked: false },
        //     { value: '40l', label: '40L', checked: true },
        //   ],
        // },
      ]


    return(
        <ShopLayout filters={filters} title={'title'} type={'mens'} staticPage={true} length={length}>
            <DisplayMen data={data} pagination={pagination} type={'mens'} length={length}/>
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