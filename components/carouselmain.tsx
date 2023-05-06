import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useCallback } from "react";

type Props = PropsWithChildren & EmblaOptionsType;

const CarouselMain = ({ ...options }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                <div className='flex-[0_0_100%]'>
                    <Link href='womens/shop/'>
                        <Image className="hidden lg:flex md:flex" width={1920} height={800} alt='banner-1' src='https://res.cloudinary.com/dgcsnhguo/image/upload/v1683175056/storydots/banner1_hjcvmu.png' />
                        <Image className="flex lg:hidden md:hidden" width={1920} height={800} alt='banner-1' src='https://res.cloudinary.com/dgcsnhguo/image/upload/v1683175056/storydots/banner1-mobile_jj7sx6.png' />
                    </Link>
                </div>
                <div className='flex-[0_0_100%]'>
                    <Link href='mens/shop/'>
                        <Image className="hidden lg:flex md:flex" width={1920} height={800} alt='banner-1' src='https://res.cloudinary.com/dgcsnhguo/image/upload/v1683175056/storydots/bannermen_jqshux.png' />
                        <Image className="flex lg:hidden md:hidden" width={1920} height={800} alt='banner-1' src='https://res.cloudinary.com/dgcsnhguo/image/upload/v1683175055/storydots/bannermen-mobile_sbac4h.png' />
                    </Link>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <button className="embla__prev" onClick={scrollPrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>

                </button>
                <button className="embla__next" onClick={scrollNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>

                </button>
            </div>
        </div>
    );
};
export default CarouselMain;
