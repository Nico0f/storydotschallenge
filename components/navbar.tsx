import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import LoginModal from './loginmodal'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = {


  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: 'womens/shop/1?category=womens_tops' },
            { name: 'Dresses', href: 'womens/shop/1?category=womens_dresses' },
            { name: 'Sweaters', href: 'womens/shop/1?category=womens_sweaters' },
            { name: 'Outerwear', href: 'womens/shop/1?category=womens_outerwear' },
            { name: 'Browse All', href: 'womens/shop' },
          ],
        },
        {
          id: 'bottoms',
          name: 'Bottoms',
          items: [
            { name: 'Pants', href: 'womens/shop/1?category=womens_pants' },
            { name: 'Shorts & Skirts', href: 'womens/shop/1?category=womens_shortsandskirts' },
            { name: 'Jeans', href: 'womens/shop/1?category=womens_jeans' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Lotte', href: '#' },
            { name: 'Fit', href: '#' },
            { name: 'Globals', href: '#' }
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Browse All', href: 'mens/shop' },
            { name: 'Shirts', href: 'mens/shop/1?category=mens_shirts' },
            { name: 'T-Shirts', href: 'mens/shop/1?category=mens_tees' },
            { name: 'Sweaters', href: 'mens/shop/1?category=mens_sweaters' },
            { name: 'Polos', href: 'mens/shop/1?category=mens_polos' },
            { name: 'Outerwear', href: 'mens/shop/1?category=mens_outerwear' },
          ],
        },
        {
          id: 'bottoms',
          name: 'Bottoms',
          items: [
            { name: 'Pants', href: 'mens/shop/1?category=mens_pants' },
            { name: 'Shorts', href: 'mens/shop/1?category=mens_shorts' },
            { name: 'Jeans', href: 'mens/shop/1?category=mens_jeans' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Lotte', href: '#' },
            { name: 'Fit', href: '#' },
            { name: 'Globals', href: '#' }
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(): JSX.Element {

  const [modalOpen, setModalOpen] = useState(false)

  const [ loginStatus, setLoginStatus ] = useState(false)
  const [ adminStatus, setAdminStatus ] = useState(false)

  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    email: ''
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  async function checkAdmin(email: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `admin/check`, {
      method: 'POST',
      body: JSON.stringify({email}),
      headers: 
        {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json()
    if (data.message === 'Success') {
      setAdminStatus(true)
    } else {
      setAdminStatus(false)
    }
  }

  function signOut() {
    localStorage.removeItem('first_name')
    localStorage.removeItem('last_name')
    localStorage.removeItem('avatar')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    setLoginStatus(false)
  }

  useEffect(() => {
    const first_name = localStorage.getItem('first_name')
    const last_name = localStorage.getItem('last_name')
    const avatar = localStorage.getItem('avatar')
    const email = localStorage.getItem('email')
    if (first_name && last_name && avatar && email) {
      setUserInfo({
        first_name,
        last_name,
        avatar,
        email
      })
      checkAdmin(email)
      setLoginStatus(true)
    }
  }, [])

  return (
    <div className="relative w-full bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <span onClick={() => setModalOpen(true)} className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </span>
                  </div>
                  <div className="flow-root">
                    <Link href="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </Link>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="fixed w-full top-0 z-20 bg-white">
        <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">StoryDots</span>
                  <img
                    className="hidden md:flex lg:flex h-8 w-auto"
                    src="https://res.cloudinary.com/dgcsnhguo/image/upload/v1683231773/storydots/logo_vsgyyw.png"
                    alt=""
                  />
                  <img
                    className="flex md:hidden lg:hidden h-8 w-auto"
                    src="https://res.cloudinary.com/dgcsnhguo/image/upload/v1683231773/storydots/logo-m_jtgcup.png"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-20">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">

                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                {/* <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingCartIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div> */}
                {
                  loginStatus
                    ?
                    <div className="dropdown bg-gray-200 dropdown-bottom dropdown-end border rounded-l-xl rounded-r-3xl">
                    <label tabIndex={0} className="">
                        <div className="avatar items-center hover:cursor-pointer">
                            <span className='font-semibold mx-2'>{`${userInfo.first_name} ${userInfo.last_name}`}</span>
                            <div className="w-10 rounded-full">
                                {
                                    userInfo.avatar
                                        ?
                                        <img width={40} height={40} referrerPolicy='no-referrer' src={`${userInfo.avatar}`} alt='avatar-img' />
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </label>
                    <div tabIndex={0} className="dropdown-content menu absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
                        {
                          adminStatus
                          ?
                          <div className="p-2">
                            <Link
                                href="/admin"
                                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            >
                                Admin panel
                            </Link>
                        </div>
                        :
                        null
                        }

                        <div className="p-2">
                            <button
                                onClick={signOut}
                                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-700 hover:bg-red-50"

                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>


                                Sign out
                            </button>
                        </div>
                    </div>
                    {/* </ul> */}

                </div>
                    :
                    <div className="hidden lg:ml-5 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <span onClick={() => setModalOpen(true)} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </span>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link href="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                      </Link>
                    </div>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} setLoginStatus={setLoginStatus} setUserInfo={setUserInfo} setAdminStatus={setAdminStatus}/>
    </div>
  )
}