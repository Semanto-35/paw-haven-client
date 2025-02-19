import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLongLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';


const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white'>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <p className='p-3 text-sm font-medium text-red-500 rounded-full bg-blue-50 '>
            <ExclamationCircleIcon className='w-10 h-10 animate-bounce' />
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Something Went Wrong!
          </h1>
          <p className='mt-4 text-gray-500 '>
            Sorry, the page you are looking for doesnt exist.Here are some
            helpful links:
          </p>

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <Button
              size='sm'
              color='pink'
              variant='outlined'
              onClick={() => navigate(-1)}
              className="flex items-center gap-3"
            >
              <ArrowLongLeftIcon className='w-6 h-6' />
              go back
            </Button>

            <Button color='pink' onClick={() => navigate('/')}>
              Go back to home
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage;