import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@material-tailwind/react";
import Swal from "sweetalert2";


const CheckoutForm = ({ campaigns, closeModal}) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  console.log(campaigns);
  const formik = useFormik({
    initialValues: {
      donatedAmount: "",
    },
    validationSchema: Yup.object({
      donatedAmount: Yup.number()
        .typeError("Amount must be a number")
        .min(1, "Minimum donation is $1")
        .required("Donation amount is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      if (cardElement == null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });

      if (error) {
        console.log('payment error', error);
      } else {
        console.log('payment method', paymentMethod);
      }

      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          amount: values.donatedAmount,
        });

        const payment = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.displayName || "Anonymous Donor",
            },
          },
        });

        const totalDonation = campaigns?.currentDonation + values.donatedAmount;


        if (payment.paymentIntent?.status === "succeeded") {
          await axiosSecure.post("/donations", {
            campaignId: campaigns?._id,
            petImage: campaigns?.petImage,
            petName: campaigns?.petName,
            addedBy: campaigns?.addedBy,
            isRefundRequested: false,
            donatedAmount: parseFloat(values.donatedAmount),
            donorEmail: user?.email,
            donorName: user?.displayName,
          });
          await axiosSecure.patch(`/donated-camp/${campaigns._id}`,{totalDonation});

          closeModal();

          Swal.fire("Success!", `You have successfully donated $${values.donatedAmount} to ${campaigns?.petName}`, "success");
        }
      } catch (err) {
        console.error("Error processing donation:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded-lg shadow-md">

      <div className="mb-4">
        <Input
          label="Donation Amount"
          type="number"
          id="donatedAmount"
          name="donatedAmount"
          value={formik.values.donatedAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.donatedAmount && Boolean(formik.errors.donatedAmount)}
        />
        {formik.touched.donatedAmount && formik.errors.donatedAmount && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.donatedAmount}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
        <div className="border rounded-lg p-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <Button
        type="submit"
        color="light-green"
        variant="gradient"
        disabled={!stripe || !elements || formik.isSubmitting}
        fullWidth
        className="mt-4"
      >
        {formik.isSubmitting ? "Processing..." : "Donate"}
      </Button>

      <Button
        type="button"
        variant="text"
        color="red"
        onClick={closeModal}
        fullWidth
        className="mt-2"
      >
        Cancel
      </Button>
    </form>
  );
};

export default CheckoutForm;