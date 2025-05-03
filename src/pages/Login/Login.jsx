import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../utilities/utiliti";
import { Button, Input, Typography, Card, IconButton } from "@material-tailwind/react";
import { 
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon 
} from "@heroicons/react/24/solid";
import facebook from '../../assets/icons/facebook_2.png';
import { toast } from "react-toastify";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const { signInUser, signInWithGoogle, signInWithFacebook, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate(from, { replace: true });
      toast.success('Login with Google successful');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Facebook Signin
  const handleFacebookSignIn = async () => {
    try {
      const data = await signInWithFacebook();
      await saveUser(data?.user);
      navigate(from, { replace: true });
      toast.success('Login with Facebook successful');
    } catch (err) {
      toast.error(err?.message);
    }
  };

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
        navigate(from, { replace: true });
        toast.success('Login Successful');
        resetForm();
      } catch (err) {
          toast.error("Invalid Cradential");
      }
    },
  });

  if (user) return <Navigate to={from} replace={true} />

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-gray-50 dark:bg-blue-gray-900">
      <Card className="w-full max-w-md p-8 shadow-lg bg-white dark:bg-blue-gray-800">
      <div className="flex justify-between items-center mb-4">
          <Button
            variant="text"
            size="sm"
            color="blue-gray"
            className="flex items-center gap-1 p-1 dark:text-blue-gray-300"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>
          <Button
            variant="text"
            size="sm"
            color="blue-gray"
            className="flex items-center gap-1 p-1 dark:text-blue-gray-300"
            onClick={() => navigate('/')}
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Button>
        </div>
        <div className='mb-8 text-center'>
          <Typography variant="h3" className="mb-2 text-blue-gray-800 dark:text-white">
            Log In
          </Typography>
          <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-300">
            Sign in to access your account
          </Typography>
        </div>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              color="blue-gray"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              className="dark:text-white"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="flex items-center mt-1">
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                <Typography variant="small" color="red" className="text-sm">
                  {formik.errors.email}
                </Typography>
              </div>
            )}
          </div>

          <div>
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                color="blue-gray"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                className="dark:text-white"
                icon={
                  <IconButton
                    variant="text"
                    size="sm"
                    className="!absolute right-0 rounded-full hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-blue-gray-500 dark:text-blue-gray-300" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-blue-gray-500 dark:text-blue-gray-300" />
                    )}
                  </IconButton>
                }
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="flex items-center mt-1">
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                <Typography variant="small" color="red" className="text-sm">
                  {formik.errors.password}
                </Typography>
              </div>
            )}
            <div className='mt-1 text-right'>
              <Link 
                to="/forgot-password" 
                className="text-xs hover:underline text-blue-gray-500 hover:text-amber-600 dark:text-blue-gray-300 dark:hover:text-amber-300"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button 
            type="submit" 
            color="amber" 
            fullWidth 
            className="mt-2"
          >
            Login
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-blue-gray-100 dark:bg-blue-gray-700"></div>
          <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-300">OR</Typography>
          <div className="h-px flex-1 bg-blue-gray-100 dark:bg-blue-gray-700"></div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center gap-3 hover:bg-blue-gray-50 dark:hover:bg-blue-gray-700"
          >
            <img 
              src="https://docs.material-tailwind.com/icons/google.svg" 
              alt="Google" 
              className="h-5 w-5" 
            />
            Continue with Google
          </Button>
          <Button
            onClick={handleFacebookSignIn}
            fullWidth
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center gap-3 hover:bg-blue-gray-50 dark:hover:bg-blue-gray-700"
          >
            <img 
              src={facebook} 
              alt="Facebook" 
              className="h-5 w-5" 
            />
            Continue with Facebook
          </Button>
        </div>

        <Typography 
          variant="small" 
          className="mt-6 text-center text-blue-gray-500 dark:text-blue-gray-300"
        >
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signUp'
            className="font-medium hover:underline text-amber-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            Sign Up
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;