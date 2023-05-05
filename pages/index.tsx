import Image from 'next/image'
import { Inter } from 'next/font/google'
import CarouselMain from '@/components/carouselmain'
import Card from '@/components/card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className=''>
      <CarouselMain />
      <div className='grid grid-cols-5'>
      </div>
    </main>
  )
}
