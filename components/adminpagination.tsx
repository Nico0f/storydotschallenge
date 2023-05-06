import { JSXElementConstructor, ReactElement } from "react"

export default function AdminPagination({ length, pagination, setPagination }: {length: number, pagination: number, setPagination: Function}) {



    const display: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | JSX.Element[] | null | undefined = []

    const maxIndex = Math.ceil(length / 10)

    if (maxIndex <= 7) {
        for (let i = maxIndex; i > 0; i--) {
            display.unshift(<li onClick={() => setPagination(i)} className={pagination ===  i ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={i}>
                    {i}
            </li>)
        }
    } else if (maxIndex > 7 && pagination < 5) {
        for (let i = 5; i > 0; i--) {
            display.unshift(<li onClick={() => setPagination(i)} className={pagination ===  i ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={i}>
                    {i}
            </li>)
        }
        display.push(<li className="flex items-end mx-1" key={'suspense'}>
            . . .
        </li>)
        display.push(
            <li onClick={() => setPagination(maxIndex)} className={pagination ===  maxIndex ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={maxIndex}>
                    {maxIndex}
            </li>
        )
    } else if (maxIndex > 7 && pagination >= 5 && pagination < maxIndex - 3) {
        for (let i = pagination + 1; i >= pagination - 1; i--) {
            display.unshift(<li onClick={() => setPagination(i)} className={pagination === i  ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={i}>
                    {i}
            </li>)
        }
        display.unshift(<li className="flex items-end mx-1" key={'suspense'}>
            . . .
        </li>)
        display.unshift(<li onClick={() => setPagination(1)} className={pagination ===  1 ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={1}>
                {1}
        </li>)
        display.push(<li className="flex items-end mx-1" key={'suspense2'}>
            . . .
        </li>)
        display.push(
            <li onClick={() => setPagination(maxIndex)} className={pagination ===  maxIndex ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={maxIndex}>
                    {maxIndex}
            </li>
        )
    } else {
        for (let i = maxIndex; i >= maxIndex - 4; i--) {
            display.unshift(<li onClick={() => setPagination(i)} className={pagination === i  ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={i}>
                    {i}
            </li>)
        }
        display.unshift(<li className="flex items-end mx-1" key={'suspense'}>
            . . .
        </li>)
        display.unshift(<li onClick={() => setPagination(1)} className={pagination ===  1 ? "bg-slate-500 border-gray-600 hover:cursor-pointer m-1 border p-3" : "hover:cursor-pointer m-1 border p-3"} key={1}>
                {1}
        </li>)
    }
    return (

        <ol className="flex justify-center gap-1 text-xs font-medium">
            {
                pagination > 1
                    ?

                    <li onClick={() => setPagination((prevState: number) => prevState - 1)} className="hover:cursor-pointer m-1 border p-3" key={'minus'}>
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
                    </li>
                    :
                    null
            }

            {display}

            {
                pagination < maxIndex
                    ?
                    <li onClick={() => setPagination((prevState: number) => prevState + 1)} className="hover:cursor-pointer m-1 border p-3" key={'add'}>
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
                    </li>
                    :
                    null

            }
        </ol>

    )
}

