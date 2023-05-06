// import CarouselDetail from '@/components/carousel-detail'
import { BookmarkSlashIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GetServerSidePropsContext } from 'next/types'


export async function getServerSideProps(context: GetServerSidePropsContext<any>) {
    const { id } = context.params

    // unir los dos fetch para mejor eficiencia
    const res = await fetch(process.env.SERVER_URL + `products/${id}`)
    const product: any = await res.json()
    // const data = await fetch(process.env.SERVER_URL + `books/related?id=${id}`)
    // const relatedBooks: BookCard[] = await data.json()
    return {
        props: { product },
    }
}



export default function Detail({ product }: { product: any }) {

    const { id, name, image_url, price, color } = product

    const [size, setSize] = useState<string>('')

    const [colors, setColor] = useState(color[0])

    function changeColor(colorName: string) {
        const uniquecolor = color.filter((element: any) => element.color.name === colorName)
        setColor(uniquecolor[0])
    }


    return (
        <>
            <section className=''>
                <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
                    <div className="grid items-start grid-cols-1 md:grid-cols-6">
                        <div className='grid justify-items-center col-span-4'>
                            <Image width={1920} height={2400} alt='cover-img' className='w-5/6 border border-[#4B5563]/10' src={colors.color.primary_url ? `${colors.color.primary_url}` : colors.color.colors_url[0]} />
                        </div>
                        <div className="col-span-2">

                            <div className="flex justify-between mt-2">
                                <div className="max-w-1/2">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl">
                                        {name}
                                    </h1>
                                    <p className="mt-0.5 text-sm">By brand</p>
                                </div>
                            </div>
                            <p className='mt-4 font-serif font-extralight underline'>Overview:</p>
                            {/* <div
                                className="overflow-ellipsis overflow-hidden line-clamp-3"

                            >
                            {product.description}
                            </div> */}
                            <details
                                className="group relative mt-2 [&_summary::-webkit-details-marker]:hidden text-left"
                            >
                                <summary className="block">
                                    <div>
                                        <div className="prose max-w-none group-open:hidden text-ellipsis overflow-hidden line-clamp-3">
                                            {product.description}
                                        </div>

                                        <span
                                            className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0"
                                        >
                                            Read More
                                        </span>
                                    </div>
                                </summary>

                                <div className="pb-6 prose max-w-none" >
                                    {product.description}
                                </div>
                            </details>
                            <h3 className='my-3 text-xl'>Colors</h3>
                            <div className='flex flex-wrap items-center'>
                                {
                                    color.map((element: any) => (
                                        <div key={element.color.name} onClick={() => changeColor(element.color.name)} className={
                                            colors.color.name === element.color.name
                                                ?
                                                'h-8 w-8 rounded-full my-1 mr-1 border-2 border-red-400'
                                                :
                                                `h-7 w-7 rounded-full my-1 mr-1 border`
                                        } style={{ background: `#${element.color.hex_value}` }}></div>
                                    ))
                                }
                            </div>
                            <div>
                                <h3 className='my-3 text-xl'>Size</h3>
                                <div className='flex gap-4'>
                                    <div onClick={() => setSize('xs')} className={size === 'xs' ? 'flex h-12 w-12 items-center justify-center border bg-gray-500 text-stone-100 border-black' : 'flex h-12 w-12 items-center justify-center border hover:border-gray-800 hover:bg-slate-300 hover:cursor-pointer'}>
                                        <div className='text-xl font-light'>xs</div>
                                    </div>
                                    <div onClick={() => setSize('s')} className={size === 's' ? 'flex h-12 w-12 items-center justify-center border bg-gray-500 text-stone-100 border-black' : 'flex h-12 w-12 items-center justify-center border hover:border-gray-800 hover:bg-slate-300 hover:cursor-pointer'}>
                                        <div className='text-xl font-light'>s</div>
                                    </div>
                                    <div onClick={() => setSize('m')} className={size === 'm' ? 'flex h-12 w-12 items-center justify-center border bg-gray-500 text-stone-100 border-black' : 'flex h-12 w-12 items-center justify-center border hover:border-gray-800 hover:bg-slate-300 hover:cursor-pointer'}>
                                        <div className='text-xl font-light'>m</div>
                                    </div>
                                    <div onClick={() => setSize('l')} className={size === 'l' ? 'flex h-12 w-12 items-center justify-center border bg-gray-500 text-stone-100 border-black' : 'flex h-12 w-12 items-center justify-center border hover:border-gray-800 hover:bg-slate-300 hover:cursor-pointer'}>
                                        <div className='text-xl font-light'>l</div>
                                    </div>
                                    <div onClick={() => setSize('xl')} className={size === 'xl' ? 'flex h-12 w-12 items-center justify-center border bg-gray-500 text-stone-100 border-black' : 'flex h-12 w-12 items-center justify-center border hover:border-gray-800 hover:bg-slate-300 hover:cursor-pointer'}>
                                        <div className='text-xl font-light'>xl</div>
                                    </div>
                                    <div onClick={() => setSize('xxl')} className={size === 'xxl' ? 'flex h-12 w-12 items-center justify-center border bg-gray-500 text-stone-100 border-black' : 'flex h-12 w-12 items-center justify-center border hover:border-gray-800 hover:bg-slate-300 hover:cursor-pointer'}>
                                        <div className='text-xl font-light'>xxl</div>
                                    </div>
                                </div>

                            </div>

                            <p className="text-5xl font-semibold mt-6">$ {price}</p>

                            <form className="mt-1">
                                <div className='mt-10 h-10 grid grid-cols-2 gap-3 lg:w-full'>
                                    <button className="bg-[#3d5962] text-stone-200">
                                        Buy now
                                    </button>
                                    <button className="flex gap-2 justify-center items-center bg-slate-400">
                                        Add to cart
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1" /><circle cx="18" cy="20.5" r="1" /><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}