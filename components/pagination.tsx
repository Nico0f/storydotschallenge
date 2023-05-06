import { JSXElementConstructor, ReactElement, ReactFragment, useEffect } from "react"
import Link from "next/link"
import { isArrayBuffer } from "util/types"

export default function Pagination({ length, type, order, pagination, category }: {length: number, type: string, order: string | null, pagination: number, category: string[] | null}) {

    if (category && !Array.isArray(category)) {
        category = [category]
    }

    const display: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | JSX.Element[] | null | undefined = []

    const maxIndex = Math.ceil(length / 12)

    if (maxIndex <= 7) {
        for (let i = maxIndex; i > 0; i--) {
            display.unshift(<li className="hover:cursor-pointer" key={i}>
                <Link
                    href={order && category ? `/${type.toLowerCase()}/shop/${i}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${i}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${i}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') :  `/${type.toLowerCase()}/shop/${i}`}
                    className={(pagination === i || (!pagination && i === 1)) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

                >
                    {i}
                </Link>
            </li>)
        }
    } else if (maxIndex > 7 && pagination < 5) {
        for (let i = 5; i > 0; i--) {
            display.unshift(<li className="hover:cursor-pointer" key={i}>
                <Link
                    href={order && category ? `/${type.toLowerCase()}/shop/${i}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${i}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${i}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${i}`}
                    className={(pagination === i || (!pagination && i === 1)) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

                >
                    {i}
                </Link>
            </li>)
        }
        display.push(<li className="flex items-end mx-1" key={'suspense'}>
            . . .
        </li>)
        display.push(
            <li className="hover:cursor-pointer" key={maxIndex}>
                <Link
                    href={order && category ? `/${type.toLowerCase()}/shop/${maxIndex}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${maxIndex}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${maxIndex}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${maxIndex}`}
                    className={(pagination === maxIndex) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

                >
                    {maxIndex}
                </Link>
            </li>
        )
    } else if (maxIndex > 7 && pagination >= 5 && pagination < maxIndex - 3) {
        for (let i = pagination + 1; i >= pagination - 1; i--) {
            display.unshift(<li className="hover:cursor-pointer" key={i}>
                <Link
                    href={order && category ? `/${type.toLowerCase()}/shop/${i}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${i}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${i}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${i}`}
                    className={(pagination === i) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

                >
                    {i}
                </Link>
            </li>)
        }
        display.unshift(<li className="flex items-end mx-1" key={'suspense'}>
            . . .
        </li>)
        display.unshift(<li className="hover:cursor-pointer" key={1}>
            <Link
                href={order && category ? `/${type.toLowerCase()}/shop/${1}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${1}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${1}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${1}`}
                className={(pagination === 1 || (!pagination)) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

            >
                {1}
            </Link>
        </li>)
        display.push(<li className="flex items-end mx-1" key={'suspense2'}>
            . . .
        </li>)
        display.push(
            <li className="hover:cursor-pointer" key={maxIndex}>
                <Link
                    href={order && category ? `/${type.toLowerCase()}/shop/${maxIndex}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${maxIndex}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${maxIndex}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${maxIndex}`}
                    className={(pagination === maxIndex) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

                >
                    {maxIndex}
                </Link>
            </li>
        )
    } else {
        for (let i = maxIndex; i >= maxIndex - 4; i--) {
            display.unshift(<li className="hover:cursor-pointer" key={i}>
                <Link
                    href={order && category ? `/${type.toLowerCase()}/shop/${i}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${i}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${i}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${i}`}
                    className={(pagination === i) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

                >
                    {i}
                </Link>
            </li>)
        }
        display.unshift(<li className="flex items-end mx-1" key={'suspense'}>
            . . .
        </li>)
        display.unshift(<li className="hover:cursor-pointer" key={1}>
            <Link
                href={order && category ? `/${type.toLowerCase()}/shop/${1}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${1}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${1}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${1}`}
                className={(pagination === 1 || (!pagination)) ? "block h-8 w-8 rounded border bg-slate-500 text-white border-slate-800 text-center leading-8" : "block h-8 w-8 rounded border border-gray-100 text-center leading-8"}

            >
                {1}
            </Link>
        </li>)
    }
    return (

        <ol className="flex justify-center gap-1 text-xs font-medium">
            {
                pagination > 1
                    ?

                    <li className="hover:cursor-pointer" key={'minus'}>
                        <Link
                            href={order && category ? `/${type.toLowerCase()}/shop/${pagination - 1}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${pagination - 1}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${pagination - 1}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${pagination - 1}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </li>
                    :
                    null
            }

            {display}

            {
                pagination < maxIndex
                    ?
                    <li className="hover:cursor-pointer" key={'add'}>
                        <Link
                            href={order && category ? `/${type.toLowerCase()}/shop/${pagination + 1}?order=${order}` + category.map((element: string) => `&category=${element}`).join('') : order ? `/${type.toLowerCase()}/shop/${pagination + 1}?order=${order}` : category ? `/${type.toLowerCase()}/shop/${pagination + 1}?` + category.map((element: string, i: number) => i === 0 ? `category=${element}` : `&category=${element}`).join('') : `/${type.toLowerCase()}/shop/${pagination + 1}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </li>
                    :
                    null

            }
        </ol>

    )
}

