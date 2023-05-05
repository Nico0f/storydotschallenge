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
            <button className="embla__prev" onClick={scrollPrev}>
                Prev
            </button>
            <button className="embla__next" onClick={scrollNext}>
                Next
            </button>
        </div>
    );
};
export default CarouselMain;
