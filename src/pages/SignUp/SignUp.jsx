import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { saveUser, imageUpload } from "../../utilities/utiliti";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button, Input, Spinner, Typography, Card, IconButton } from "@material-tailwind/react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import facebook from '../../assets/icons/facebook_2.png';
import { toast } from "react-toastify";
import { useState } from "react";

const SignUp = () => {
  const { createNewUser, signInWithGoogle, signInWithFacebook, loading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate('/');
      toast.success('Signup with Google successful');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Facebook Signin
  const handleFacebookSignIn = async () => {
    try {
      const data = await signInWithFacebook();
      await saveUser(data?.user);
      navigate('/');
      toast.success('Signup with Facebook successful');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      photo: Yup.mixed().required('Profile photo is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const photoURL = await imageUpload(values.photo);
        const result = await createNewUser(values.email, values.password);
        await updateUserProfile(values.name, photoURL);
        await saveUser({ ...result?.user, displayName: values.name, photoURL });
        navigate('/');
        toast.success('Signup Successful');
        resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-gray-50 dark:bg-blue-gray-900">
      <Card className="w-full max-w-md px-8 py-6 shadow-lg bg-white dark:bg-blue-gray-800">
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
        </div>
        <div className='mb-6 text-center'>
          <Typography variant="h3" className="mb-2 text-blue-gray-800 dark:text-white">
            Sign Up
          </Typography>
          <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-300">
            Welcome to PawHaven
          </Typography>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              label="Full Name"
              name="name"
              color="blue-gray"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              className="dark:text-white"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="flex items-center mt-1">
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                <Typography variant="small" color="red" className="text-sm">
                  {formik.errors.name}
                </Typography>
              </div>
            )}
          </div>

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
                  className="!absolute right-0  rounded-full hover:bg-transparent"
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
            {formik.touched.password && formik.errors.password && (
              <div className="flex items-center mt-1">
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                <Typography variant="small" color="red" className="text-sm">
                  {formik.errors.password}
                </Typography>
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              color="blue-gray"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              className="dark:text-white"
              icon={
                <IconButton
                  variant="text"
                  size="sm"
                  className="!absolute right-0 rounded-full hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-blue-gray-500 dark:text-blue-gray-300" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-blue-gray-500 dark:text-blue-gray-300" />
                  )}
                </IconButton>
              }
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="flex items-center mt-1">
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                <Typography variant="small" color="red" className="text-sm">
                  {formik.errors.confirmPassword}
                </Typography>
              </div>
            )}
          </div>

          <div>
            <Input
              type="file"
              name="photo"
              color="blue-gray"
              onChange={(e) => {
                formik.setFieldValue('photo', e.currentTarget.files[0]);
              }}
              error={formik.touched.photo && Boolean(formik.errors.photo)}
              className="dark:text-white"
            />
            {formik.touched.photo && formik.errors.photo && (
              <div className="flex items-center mt-1">
                <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                <Typography variant="small" color="red" className="text-sm">
                  {formik.errors.photo}
                </Typography>
              </div>
            )}
          </div>

          <Button
            type="submit"
            color="amber"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <Spinner className="h-4 w-4 mx-auto" />
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
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
          Already have an account?{' '}
          <Link
            to='/login'
            className="font-medium hover:underline text-amber-600 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            Login
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default SignUp;