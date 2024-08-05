import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../../api-client'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';



const Mail = () => {
  const [email, setEmail] = useState('')
  const {showToast} = useAppContext()

  const { mutate }= useMutation(apiClient.newsLetter, {
    onSuccess: (data) => {
      showToast({message: data.message, type: "SUCCESS"})
      console.log(data)
    },
    onError: (error) => {
      showToast({message: ((error as {message: string}).message), type: "ERROR"})
      console.log(error)
    }
  })

  return (
      <div className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] lg:h-[50vh]">
        <div
          className="absolute inset-0 bg-[url('/src/assets/H.jpg')] bg-cover bg-no-repeat grayscale-[60%]"
          style={{ backgroundPosition: "center 80%" }}
        >
          <div className="absolute inset-0 bg-orange-400 opacity-50 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-white flex flex-col sm:flex-row items-center justify-center h-full p-4 sm:p-6 md:p-8 gap-2">
          <h1 className="font-bold text-sm sm:text-xl md:text-2xl p-3">NEWS LETTER SIGN-UP</h1>
          <div className="relative">
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="w-[35vh] px-4 py-2 text-black  border rounded-md outline-none transition-all duration-300 focus:border-orange-500 peer focus:w-[45vh] md:py-1 sm:py-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500 hidden peer-valid:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500 hidden peer-invalid:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
            <div className='p-3 px-4 text-white rounded bg-gradient-to-br from-slate-500 to-Dark transition-all duration-300 hover:from-Dark hover:to-slate-500 md:p-3 md:text-xs sm:text-sm sm:p-1'>
              <Link   to={'/'} onClick={(e) =>
              {
                e.preventDefault();
                 mutate({email})
              }}>
                SUBSCRIBE NOW
              </Link>
            </div>
        </div>
      </div>
  );
};

export default Mail;
