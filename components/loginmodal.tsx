import { Dialog, Transition } from "@headlessui/react";
import { useState, useRef, Fragment, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import ErrorLogin from "./errorlogin";
import { useRouter } from "next/router";
import { LoginData } from "@/interfaces/interfaces";





export default function LoginModal({ modalOpen, setModalOpen, setLoginStatus, setUserInfo, setAdminStatus }: { modalOpen: boolean, setModalOpen: Function, setLoginStatus: Function, setUserInfo: Function, setAdminStatus: Function }): JSX.Element {

  const [errorLogin, setErrorLogin] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const router = useRouter()
  const { asPath } = useRouter()


  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: true,
    password: true
  })

  const [formState, setFormState] = useState({
    email: false,
    password: false
  })


  function validateDisabled() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (loginData.email.length >= 0 && !emailRegex.test(loginData.email)) {
      setFormState((prevState) => ({ ...prevState, email: true }))
    }
    if (loginData.password.length >= 0 && (!/\d/.test(loginData.password) || !/[a-z]/.test(loginData.password) || !/[A-Z]/.test(loginData.password))) {
      setFormState((prevState) => ({ ...prevState, password: true }))
    }
  }

  function validate(loginData: LoginData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (loginData.email.length > 0 && emailRegex.test(loginData.email)) {
      setErrors((prevState) => ({ ...prevState, email: false }))
      setFormState((prevState) => ({ ...prevState, email: true }))
    } else {
      setErrors((prevState) => ({ ...prevState, email: true }))
    }
    if (loginData.password.length > 0) {
      setFormState((prevState) => ({ ...prevState, password: true }))
    }
    if (loginData.password.length > 8 && /\d/.test(loginData.password) && /[a-z]/.test(loginData.password) && /[A-Z]/.test(loginData.password)) {
      setErrors((prevState) => ({ ...prevState, password: false }))
    } else {
      setErrors((prevState) => ({ ...prevState, password: true }))
    }
  }




  

  async function submitHandle() {
    event?.preventDefault()
    let res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'origin'
      },
      body: JSON.stringify(loginData)
    })
    let data = await res.json()
    if (data.message === "Success") {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('avatar', data.avatar);
      localStorage.setItem('first_name', data.first_name);
      localStorage.setItem('last_name', data.last_name);
      setModalOpen(false)
      setUserInfo({
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar,
        email: data.email
      })
      setLoginStatus(true)
      if (data.admin) {
        setAdminStatus(true)
      } else {
        setAdminStatus(false)
      }
      if (asPath.includes('signup')) {
        router.push('/')
      }
    } else {
      setErrorMessage(data.message)
      setErrorLogin(true)
    }
  }


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  }

  useEffect(() => {
    validate(loginData);
  }, [loginData])

  const cancelButtonRef = useRef(null)

  return (
      <div>
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={() => setModalOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button type="button" onClick={() => setModalOpen(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <form className="space-y-6" action="#">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" value={loginData.email} onChange={handleChange}
                        className=
                        {
                          (formState.email && errors.email)
                            ?
                            "form-control bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            :
                            "form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        }
                        placeholder="name@mail.com" required />
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
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" value={loginData.password} onChange={handleChange} placeholder="••••••••"
                        className={
                          (formState.password && errors.password)
                            ?
                            "form-control bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            :
                            "form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        }
                        required />
                        {
                  (formState.password && errors.password)
                    ?
                    <label className="relative h--1 label my-0 py-0">
                      <span className="label-text-alt text-red-500">* Must contain at least one uppercase letter, one lowercase letter, and one number</span>
                    </label>
                    :
                    null
                }
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                          </div>
                          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <Link href="/asd" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                      </div>
                      {(errors.email || errors.password)
                      ?
                      <button onClick={validateDisabled} className="w-full text-white bg-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                      :
                      <button type="submit" onClick={submitHandle} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                      }
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link href="/signup" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setModalOpen(false)}>Create account</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
          <ErrorLogin errorLogin={errorLogin} setErrorLogin={setErrorLogin} message={errorMessage}/>
      </div>
  )
}