// import { auth } from "@/config/firebase-config"
// import { AdditionalUserInfo, GoogleAuthProvider, User, UserCredential, getAdditionalUserInfo, onAuthStateChanged, signInWithPopup } from "firebase/auth"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import SuccessSignUp from "./success"
import ErrorSignUp from "./error"
// import SuccessSignUp from "./sucess"
// import ErrorSignUp from "./error"


export default function Signup() {

    const router = useRouter()
    const [logIn, setLogIn] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [showContent, setShowContent] = useState<boolean>(false)
  
    const [signUpData, setsignUpData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    })
  
    const [errors, setErrors] = useState({
      first_name: true,
      last_name: true,
      email: true,
      password: true,
      passwordConfirmation: true
    })
  
    const [formState, setFormState] = useState({
      first_name: false,
      last_name: false,
      email: false,
      password: false,
      passwordConfirmation: false
    })
  
    function handleChange(event: any) {
      const { name, value } = event.target
      setsignUpData((prevState) => ({ ...prevState, [name]: value }));
    }
  
    function validateDisabled() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (signUpData.first_name.length === 0) {
        setFormState((prevState) => ({ ...prevState, first_name: true }))
      }
      if (signUpData.last_name.length === 0) {
        setFormState((prevState) => ({ ...prevState, last_name: true }))
      }
      if (signUpData.email.length >= 0 && !emailRegex.test(signUpData.email)) {
        setFormState((prevState) => ({ ...prevState, email: true }))
      }
      if (signUpData.password.length >= 0 && (!/\d/.test(signUpData.password) || !/[a-z]/.test(signUpData.password) || !/[A-Z]/.test(signUpData.password))) {
        setFormState((prevState) => ({ ...prevState, password: true }))
      }
      if (signUpData.passwordConfirmation.length >= 0 && (signUpData.password !== signUpData.passwordConfirmation || errors.password === true)) {
        setFormState((prevState) => ({ ...prevState, passwordConfirmation: true }))
      }
    }
  
    function validate(signUpData: any) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (signUpData.first_name.length > 0) {
        setErrors((prevState) => ({ ...prevState, first_name: false }))
        setFormState((prevState) => ({ ...prevState, first_name: true }))
      } else {
        setErrors((prevState) => ({ ...prevState, first_name: true }))
      }
      if (signUpData.last_name.length > 0) {
        setErrors((prevState) => ({ ...prevState, last_name: false }))
        setFormState((prevState) => ({ ...prevState, last_name: true }))
      } else {
        setErrors((prevState) => ({ ...prevState, last_name: true }))
      }
      if (signUpData.email.length > 0 && emailRegex.test(signUpData.email)) {
        setErrors((prevState) => ({ ...prevState, email: false }))
        setFormState((prevState) => ({ ...prevState, email: true }))
      } else {
        setErrors((prevState) => ({ ...prevState, email: true }))
      }
      if (signUpData.password.length > 0) {
        setFormState((prevState) => ({ ...prevState, password: true }))
      }
      if (signUpData.password.length > 8 && /\d/.test(signUpData.password) && /[a-z]/.test(signUpData.password) && /[A-Z]/.test(signUpData.password)) {
        setErrors((prevState) => ({ ...prevState, password: false }))
      } else {
        setErrors((prevState) => ({ ...prevState, password: true }))
      }
      if (signUpData.passwordConfirmation.length > 0) {
        setFormState((prevState) => ({ ...prevState, passwordConfirmation: true }))
      }
      if (signUpData.passwordConfirmation.length > 0 && signUpData.password === signUpData.passwordConfirmation) {
        setErrors((prevState) => ({ ...prevState, passwordConfirmation: false }))
      } else {
        setErrors((prevState) => ({ ...prevState, passwordConfirmation: true }))
      }
    }
  
    async function submitHandle() {
      event?.preventDefault()
      let res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      })
      const data = await res.json()
      console.log(data)
      if (data.message === 'Success') {
        setLogIn(true)
      } else {
        setError(true)
      }
    }
  
    useEffect(() => {
      validate(signUpData);
    }, [signUpData])
  
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.push('/')
        } else {
            setShowContent(true)
        }
    }, [])
  
    //  if (loginstate) {
    //    return router.push('/')
    //  }
    return (
      <section className="bg-white mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-[80%] lg:px-8">
        {
          showContent
            ?
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
              <section
                className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
              >
                <Image
                  alt="books-img"
                  src="https://res.cloudinary.com/dgcsnhguo/image/upload/v1675660282/BookStore/signup_ubtyhy.png"
                  className="absolute inset-0 h-full w-full object-cover"
                  width={900}
                  height={650}
                />
  
                <div className="bg-gradient-to-t from-black to-transparent lg:relative lg:block lg:p-12">
                  <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    Welcome to Book Store
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/90">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
                    dolorum aliquam, quibusdam aperiam voluptatum.
                  </p>
                </div>
              </section>
  
              <main
                aria-label="Main"
                className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
              >
                <div className="max-w-xl lg:max-w-3xl">
                  <div className="bg-gradient-to-b from-white/50 to-transparent relative -mt-16 block lg:hidden">
                    <h1
                      className="text-center mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                    >
                      Welcome to Book Store
                    </h1>
  
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                      nam dolorum aliquam, quibusdam aperiam voluptatum.
                    </p>
                  </div>
  
                  <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
  
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        onChange={handleChange}
                        value={signUpData.first_name}
                        className={
                          (formState.first_name && errors.first_name)
                            ?
                            "form-control mt-1 w-full rounded-md border-red-500 focus:border-red-500 focus:ring-transparent bg-white text-sm text-gray-700 shadow-sm"
                            :
                            "form-control mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                      />
                      {
                        (formState.first_name && errors.first_name)
                          ?
                          <label className="absolute w-full h-0 label">
                            <span className="label-text-alt text-red-500">* Can&apos;t be empty</span>
                          </label>
                          :
                          null
                      }
                    </div>
  
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
  
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        onChange={handleChange}
                        value={signUpData.last_name}
                        className={
                          (formState.last_name && errors.last_name)
                            ?
                            "mt-1 w-full rounded-md border-red-500 focus:border-red-500 focus:ring-transparent bg-white text-sm text-gray-700 shadow-sm"
                            :
                            "mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                      />
                      {
                        (formState.last_name && errors.last_name)
                          ?
                          <label className="absolute w-full h-0 label">
                            <span className="label-text-alt text-red-500">* Can&apos;t be empty</span>
                          </label>
                          :
                          null
                      }
                    </div>
  
                    <div className="col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
  
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={signUpData.email}
                        className={
                          (formState.email && errors.email)
                            ?
                            "mt-1 w-full rounded-md border-red-500 focus:border-red-500 focus:ring-transparent bg-white text-sm text-gray-700 shadow-sm"
  
                            :
                            "mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                      />
                      {
                        (formState.email && errors.email)
                          ?
                          <label className="absolute w-full h-0 label">
                            <span className="label-text-alt text-red-500">* Must be a valid email</span>
                          </label>
                          :
                          null
                      }
                    </div>
  
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
  
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={signUpData.password}
                        className={
                          (formState.password && errors.password)
                            ?
                            "mt-1 w-full rounded-md border-red-500 focus:border-red-500 focus:ring-transparent bg-white text-sm text-gray-700 shadow-sm"
                            :
                            "mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        }
                      />
                      {
                        (formState.password && errors.password)
                          ?
                          <label className="relative h--1 label">
                            <span className="label-text-alt text-red-500">* Must contain at least one uppercase letter, one lowercase letter, and one number</span>
                          </label>
                          :
                          null
                      }
                    </div>
  
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="PasswordConfirmation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password Confirmation
                      </label>
  
                      <input
                        type="password"
                        id="PasswordConfirmation"
                        name="passwordConfirmation"
                        onChange={handleChange}
                        className={
                          (formState.passwordConfirmation && errors.passwordConfirmation)
                            ?
                            "mt-1 w-full rounded-md border-red-500 focus:border-red-500 focus:ring-transparent bg-white text-sm text-gray-700 shadow-sm"
                            :
                            "mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
  
                        }
                      />
                      {
                        (formState.passwordConfirmation && errors.passwordConfirmation)
                          ?
                          <label className="relative h--1 label">
                            <span className="label-text-alt text-red-500">* Both password must match</span>
                          </label>
                          :
                          null
                      }
                    </div>
  
                    <div className="col-span-6">
                      <label htmlFor="MarketingAccept" className="flex gap-4">
                        <input
                          type="checkbox"
                          id="MarketingAccept"
                          name="marketing_accept"
                          className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                        />
  
                        <span className="text-sm text-gray-700">
                          I want to receive emails about events, product updates and
                          company announcements.
                        </span>
                      </label>
                    </div>
  
                    <div className="col-span-6">
                      <p className="text-sm text-gray-500">
                        By creating an account, you agree to our {' '}
                        <Link href="/signup" className="text-gray-700 underline">
                          terms and conditions
                        </Link>
                        {' '} and {' '}
                        <Link href="/signup" className="text-gray-700 underline">privacy policy</Link>.
                      </p>
                    </div>
  
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      {(errors.first_name || errors.last_name || errors.email || errors.password || errors.passwordConfirmation)
                        ?
                        <span
                          onClick={validateDisabled}
                          className="inline-block shrink-0 rounded-md border bg-gray-500 px-12 py-3 text-sm font-medium text-white transition focus:outline-none hover:cursor-not-allowed"
                        >
                          Create an account
                        </span>
                        :
                        <button
                          onClick={submitHandle}
                          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                        >
                          Create an account
                        </button>
                      }
  
                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account?
                      </p>
                      <p className="text-sm text-gray-700 underline hover:cursor-pointer" onClick={() => console.log('arreglar')}>Log in</p>
                    </div>
                  </form>
                </div>
              </main>
            </div>
            :
            <div className="flex justify-center">
              <div>
                <div
                  className="w-16 h-16 border-4 border-t-transparent border-blue-400 border-double rounded-full animate-spin"></div>
              </div>
            </div>
        }
        <SuccessSignUp logIn={logIn} setLogIn={setLogIn} />
        <ErrorSignUp error={error} setError={setError} />
      </section>
    )
  }
  