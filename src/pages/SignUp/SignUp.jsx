import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { saveUser, imageUpload } from "../../utilities/utiliti";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Button, Input, Spinner } from "@material-tailwind/react";
import github from '../../assets/icons/github.png';
import { toast } from "react-toastify";



const SignUp = () => {
  const { createNewUser, signInWithGoogle, loading, updateUserProfile, } = useAuth();
  const navigate = useNavigate();



  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle()
      await saveUser(data?.user)
      navigate('/')
      toast.success('Signup with google successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

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
        await saveUser({ ...result?.user, displayName: values.name, photoURL })
        navigate('/');
        toast.success('Signup Successful')
        resetForm();
      } catch (err) {
        toast.error(err.message);
      }
    },
  });


  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className='flex flex-col max-w-md p-6 rounded-md sm:px-10 bg-gray-100 text-gray-900'>
        <div className='mb-6 text-center'>
          <h1 className='my-2 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to PawHaven</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="border">
          <div className="mb-4">
            <Input
              type="text"
              label="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

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

          <div className="mb-4">
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

          <div className="mb-4">
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <div className="mb-6">
            <Input
              type="file"
              name="photo"
              onChange={(e) => {
                formik.setFieldValue('photo', e.currentTarget.files[0]);
              }}
              error={formik.touched.photo && formik.errors.photo}
            />
            {formik.touched.photo && formik.errors.photo && (
              <p className="text-red-500 text-sm">{formik.errors.photo}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" color="blue" fullWidth>
            {loading ? (
              <Spinner className="text-center" />
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
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
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
            Continue with Google
          </Button>
          <Button
            fullWidth
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
          >
            <img src={github} alt="metamask" className="h-6 w-6" />
            Continue with Github
          </Button>
        </div>
        <p className='px-6 text-sm text-center text-gray-500 mt-4'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline font-medium text-blue-600'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;