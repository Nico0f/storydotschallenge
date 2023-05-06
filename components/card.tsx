import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ColorCards, ColorDetails } from "@/interfaces/interfaces"

export default function Card({ name, price, colors, id }: {name: string, price: number, colors: ColorCards[], id: string}): JSX.Element {

    const [color, setColor] = useState(colors[0])

    function changeColor(colorName: string) {
        const color = colors.filter((element: ColorCards) => element.color.name === colorName)
        setColor(color[0])
    }


    useEffect(() => {
        setColor(colors[0])
    }, [colors])



    return (
        <div className="p-3">
            <div key={id} className="relative aspect-w-5 aspect-h-8 w-full overflow-hidden bg-gray-200 xl:aspect-w-5 xl:aspect-h-8 border border-[#4B5563]/10 hover:cursor-pointer">
                <div className=''>
                    <Link href={`/p/${id}`}>
                        <Image
                            width={900}
                            height={1500}
                            src={
                                color.color.primary_url
                                    ?
                                    color.color.primary_url
                                    :
                                    color.color.colors_url[0]
                            }
                            alt={' - image'}
                            className="h-full w-full object-cover object-center hover:opacity-75 duration-700"
                        />
                    </Link>
                </div>
            </div>
            <div className="grid md:flex lg:flex justify-between">
                <Link href={`/p/${id}`}>
                    <h3 className="mt-1 text-[10px] md:text-[13px] lg:text-[13px] text-gray-700 ">
                        {name}
                    </h3>
                </Link>
                <span className="text-xs md:text-sm lg:text-sm">${price.toFixed(2)}</span>
            </div>
            <h3 className="text-[10px] md:text-[13px] lg:text-[13px] text-gray-700">by brand</h3>
            <div className="grid grid-flow-col auto-cols-max md:flex md:flex-wrap lg:flex lg:flex-wrap overflow-x-scroll items-center">
                {
                    colors.map((element: ColorCards) => (
                        <div
                            key={element.color.name + name}
                            className={
                                color.color.name === element.color.name
                                    ?
                                    'h-6 w-6 rounded-full my-1 mr-1 border-2 border-red-400'
                                    :
                                    `h-5 w-5 rounded-full my-1 mr-1 border`
                            }
                            style={element.color.hex_value_2 ? {
                                background: `linear-gradient(135deg, #${element.color.hex_value} 50%, #${element.color.hex_value_2} 50%);`} : { background: `#${element.color.hex_value}` }}
                            onClick={() => changeColor(element.color.name)}></div>))
                }

            </div>
        </div>
    )
}