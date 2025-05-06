import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const CheckoutForm = ({ campaign, closeModal, maxAmount }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formik = useFormik({
    initialValues: {
      donatedAmount: "",
    },
    validationSchema: Yup.object({
      donatedAmount: Yup.number()
        .typeError("Must be a number")
        .min(1, "Minimum donation is $1")
        .max(maxAmount, `Maximum remaining amount is $${maxAmount}`)
        .required("Donation amount is required"),
    }),
    onSubmit: async (values) => {
      if (!stripe || !elements) return;
      setIsProcessing(true);

      try {
        // Create payment intent
        const { data } = await axiosSecure.post("/create-payment-intent", {
          donatedAmount: values.donatedAmount,
          campaignId: campaign._id
        });

        // Confirm card payment
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: user?.displayName || "Anonymous Donor",
                email: user?.email,
              },
            },
          }
        );

        if (stripeError) {
          toast.error(stripeError.message);
          setIsProcessing(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          const donorsCount = campaign?.donors + 1;
          // Save donation to database
          await axiosSecure.post("/donations", {
            campaignId: campaign._id,
            petImage: campaign.petImage,
            petName: campaign.petName,
            addedBy: campaign.addedBy,
            isRefundRequested: false,
            donatedAmount: parseFloat(values.donatedAmount),
            donorEmail: user?.email,
            donorName: user?.displayName,
            paymentId: paymentIntent.id
          });

          // Update campaign total
          await axiosSecure.patch(`/donated-camp/${campaign._id}`, {
            totalDonation: parseFloat(values.donatedAmount),
            donors: donorsCount,
          });

          setPaymentSuccess(true);
          setTimeout(() => {
            closeModal();
            navigate("/donations");
            toast.success(
              `Thank you for your $${values.donatedAmount} donation to ${campaign.petName}!`,
              { autoClose: 3000 }
            );
          }, 2000);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Payment failed. Please try again.");
        setIsProcessing(false);
      }
    },
  });

  // Suggested donation amounts
  const suggestedAmounts = [10, 25, 50, 100].filter(amount => amount <= maxAmount);

  // Payment success screen
  if (paymentSuccess) {
    return (
      <div className="p-8 text-center bg-blue-gray-50 dark:bg-blue-gray-900">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
          <CheckCircleIcon className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        </div>
        <Typography variant="h4" className="mb-2 text-blue-gray-900 dark:text-white">
          Donation Successful!
        </Typography>
        <Typography color="blue-gray" className="mb-6 dark:text-blue-gray-300">
          Thank you for supporting <span className="text-amber-600 dark:text-amber-400 font-medium">{campaign.petName}</span>
        </Typography>
        <div className="animate-pulse">
          <Typography variant="small" className="text-blue-gray-600 dark:text-blue-gray-400">
            Redirecting to your donations...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-blue-gray-50 dark:bg-blue-gray-900">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Suggested Donation Amounts */}
        {suggestedAmounts.length > 0 && (
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 dark:text-blue-gray-300">
              Quick Donate
            </Typography>
            <div className="flex flex-wrap gap-2">
              {suggestedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={formik.values.donatedAmount == amount ? "filled" : "outlined"}
                  color="amber"
                  size="sm"
                  className="rounded-full transition-all"
                  onClick={() => formik.setFieldValue("donatedAmount", amount)}
                >
                  ${amount}
                </Button>
              ))}
              {maxAmount > 100 && (
                <Button
                  type="button"
                  variant={formik.values.donatedAmount == maxAmount ? "filled" : "outlined"}
                  color="amber"
                  size="sm"
                  className="rounded-full transition-all"
                  onClick={() => formik.setFieldValue("donatedAmount", maxAmount)}
                >
                  Full ${maxAmount}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Donation Amount Input */}
        <div>
          <Input
            label="Donation Amount"
            type="number"
            name="donatedAmount"
            value={formik.values.donatedAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.donatedAmount && Boolean(formik.errors.donatedAmount)}
            icon={<span className="text-blue-gray-500 dark:text-blue-gray-300">$</span>}
            min="1"
            max={maxAmount}
            className="bg-white dark:bg-blue-gray-800 dark:text-blue-gray-300"
            color="amber"
            labelProps={{
              className: "dark:text-blue-gray-300"
            }}
          />
          {formik.touched.donatedAmount && formik.errors.donatedAmount && (
            <Typography variant="small" color="red" className="mt-1">
              {formik.errors.donatedAmount}
            </Typography>
          )}
          <Typography variant="small" className="mt-2 text-blue-gray-600 dark:text-blue-gray-400">
            Maximum remaining amount: <span className="font-bold text-amber-600 dark:text-amber-400">${maxAmount}</span>
          </Typography>
        </div>

        {/* Card Details */}
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 dark:text-blue-gray-300">
            Card Details
          </Typography>
          <div className="border border-blue-gray-200 dark:border-blue-gray-700 rounded-lg p-3 bg-white dark:bg-blue-gray-800 dark:text-blue-gray-300">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#94a3b8',
                    '::placeholder': {
                      color: '#94a3b8',
                    },
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    backgroundColor: 'transparent',
                  },
                  invalid: {
                    color: '#ef4444',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            color="amber"
            disabled={!stripe || isProcessing}
            fullWidth
            loading={isProcessing}
            className="hover:shadow-amber-300/40 hover:shadow-lg transition-all"
          >
            {isProcessing ? "Processing..." : `Donate $${formik.values.donatedAmount || 0}`}
          </Button>
          <Button
            type="button"
            variant="text"
            color="blue-gray"
            onClick={closeModal}
            fullWidth
            disabled={isProcessing}
            className="hover:bg-blue-gray-100 dark:hover:bg-blue-gray-700"
          >
            Cancel
          </Button>
        </div>

        {/* Security Info */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <LockClosedIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <Typography variant="small" className="text-blue-gray-600 dark:text-blue-gray-400">
            Secure payment processed by Stripe
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;



// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Button, Input } from "@material-tailwind/react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";


// const CheckoutForm = ({ campaigns, closeModal }) => {
//   const { user } = useAuth();
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       donatedAmount: "",
//     },
//     validationSchema: Yup.object({
//       donatedAmount: Yup.number()
//         .typeError("Amount must be a number")
//         .min(1, "Minimum donation is $1")
//         .required("Donation amount is required"),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       if (!stripe || !elements) return;

//       const cardElement = elements.getElement(CardElement);

//       if (cardElement == null) {
//         return;
//       }

//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement
//       });

//       if (error) {
//         console.log('payment error', error);
//       } else {
//         console.log('payment method', paymentMethod);
//       }

//       try {
//         const { data } = await axiosSecure.post("/create-payment-intent", {
//           donatedAmount: values.donatedAmount,
//         });

//         const payment = await stripe.confirmCardPayment(data.clientSecret, {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               name: user?.displayName || "Anonymous Donor",
//             },
//           },
//         });

//         const totalDonation = campaigns?.currentDonation + values.donatedAmount;


//         if (payment.paymentIntent?.status === "succeeded") {
//           await axiosSecure.post("/donations", {
//             campaignId: campaigns?._id,
//             petImage: campaigns?.petImage,
//             petName: campaigns?.petName,
//             addedBy: campaigns?.addedBy,
//             isRefundRequested: false,
//             donatedAmount: parseFloat(values.donatedAmount),
//             donorEmail: user?.email,
//             donorName: user?.displayName,
//           });
//           await axiosSecure.patch(`/donated-camp/${campaigns._id}`, { totalDonation });

//           closeModal();
//           navigate("/donations")
//           Swal.fire("Success!", `You have successfully donated $${values.donatedAmount} to ${campaigns?.petName}`, "success");
//         }
//       } catch (err) {
//         console.error("Error processing donation:", err);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded-lg shadow-md">

//       <div className="mb-4">
//         <Input
//           label="Donation Amount"
//           type="number"
//           id="donatedAmount"
//           name="donatedAmount"
//           value={formik.values.donatedAmount}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.donatedAmount && Boolean(formik.errors.donatedAmount)}
//         />
//         {formik.touched.donatedAmount && formik.errors.donatedAmount && (
//           <p className="text-red-500 text-sm mt-1">{formik.errors.donatedAmount}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
//         <div className="border rounded-lg p-2">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>

//       <Button
//         type="submit"
//         color="light-green"
//         variant="gradient"
//         disabled={!stripe || !elements || formik.isSubmitting}
//         fullWidth
//         className="mt-4"
//       >
//         {formik.isSubmitting ? "Processing..." : "Donate"}
//       </Button>

//       <Button
//         type="button"
//         variant="text"
//         color="red"
//         onClick={closeModal}
//         fullWidth
//         className="mt-2"
//       >
//         Cancel
//       </Button>
//     </form>
//   );
// };

// export default CheckoutForm;