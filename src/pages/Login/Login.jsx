import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../utilities/utiliti";
import { Button, Input } from "@material-tailwind/react";
import github from '../../assets/icons/github.png';
import { toast } from "react-toastify";



const Login = () => {
  const { signInUser, signInWithGoogle, user, } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle()
      await saveUser(data?.user)
      navigate(from, { replace: true })
      toast.success('Login with google successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await signInUser(values.email, values.password);
        navigate(from, { replace: true })
        toast.success('Login Successful')
        resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  if (user) return <Navigate to={from} replace={true} />




  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className='flex flex-col max-w-md p-6 rounded-md sm:px-10 bg-gray-100 text-gray-900'>
        <div className='mb-6 text-center'>
          <h1 className='my-2 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>Sign in to access your account</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="">

          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <Button type="submit" color="blue" fullWidth>
            Login
          </Button>
        </form>
        <div className='mt-1'>
          <button className='text-xs hover:underline hover:text-gray-600 text-gray-500'>
            Forgot password?
          </button>
        </div>
        <p className='text-center py-2'>
          OR
        </p>
        <div className="flex flex-col justify-center items-center gap-3">
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
          >
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            fullWidth
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
          >
            <img src={github} alt="metamask" className="h-4 w-4" />
            Continue with Github
          </Button>
        </div>
        <p className='px-6 text-sm text-center text-gray-500 mt-4'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signUp'
            className='hover:underline font-medium text-blue-600'
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;