import { Button, Card, CardBody, Input, Textarea, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup"
import { imageUpload } from "../../../../utilities/utiliti";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/shared/Loader/Loader";



const EditDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: campaignData, isLoading, error } = useQuery({
    queryKey: ["campaignData", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-campaigns/${id}`);
      return data;
    },
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      petName: campaignData?.petName || "",
      petImage: campaignData?.petImage || null,
      maxDonation: campaignData?.maxDonation || 0,
      lastDate: campaignData?.lastDate || "",
      shortDescription: campaignData?.shortDescription || "",
      longDescription: campaignData?.longDescription || "",
    },
    validationSchema: Yup.object({
      petName: Yup.string()
        .min(6, "Pet name must be at least 6 characters")
        .required("Pet name is required"),
      petImage: Yup.mixed().required("Pet image is required"),
      maxDonation: Yup.number()
        .min(5000, "Maximum Donation amount must be at least $5000")
        .required("Maximum donation amount is required"),
      lastDate: Yup.date().required("Last date of donation is required"),
      shortDescription: Yup.string()
        .min(10, "Short description must be at least 10 characters")
        .required("Short description is required"),
      longDescription: Yup.string()
        .min(150, "Long description must be at least 50 characters")
        .required("Long description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const image = await imageUpload(values.petImage)

        const updateData = {
          ...values,
          petImage: image || campaignData?.petImage,
        };

        await axiosSecure.put(`/update-campaign/${id}`, updateData);
        toast.success("Donation campaign updated successfully!");
        formik.resetForm();
        navigate('/dashboard/my-donation-campaigns')
      } catch (error) {
        console.error("Error updating campaign:", error);
        toast.error("An error occurred while updating the campaign.");
      }
    },
  });

  if (isLoading) return <Loader />;
  if (error) {
    console.error("Error fetching pet data:", error);
    return <Typography color="red">Failed to fetch campaigns details.</Typography>
  }

  return (
    <Card className="max-w-2xl mx-auto p-4 shadow-lg">
      <Typography variant="h3" className="text-center mb-6 text-teal-600">
        Update {campaignData?.petName}&apos;s Donation Campaign
      </Typography>

      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <Input
              type="text"
              label="PetName"
              {...formik.getFieldProps("petName")}
            />
            {formik.touched.petName && formik.errors.petName && (
              <Typography variant="small" color="red">
                {formik.errors.petName}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image">Pet Image</label>
            <input
              name="image"
              type="file"
              onChange={(event) => formik.setFieldValue("petImage", event.target.files[0])}
              className="border px-3 py-1.5 w-full rounded-lg border-gray-400"
            />
            {formik.touched.petImage && formik.errors.petImage && (
              <Typography variant="small" color="red">
                {formik.errors.petImage}
              </Typography>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="number"
              label="Maximum Donation Amount"
              {...formik.getFieldProps("maxDonation")}
            />
            {formik.touched.maxDonation && formik.errors.maxDonation && (
              <Typography variant="small" color="red">
                {formik.errors.maxDonation}
              </Typography>
            )}
          </div>

          <div className="mb-4">
            <Input
              type="date"
              label="Last Date"
              {...formik.getFieldProps("lastDate")}
            />
            {formik.touched.lastDate && formik.errors.lastDate && (
              <Typography variant="small" color="red">
                {formik.errors.lastDate}
              </Typography>
            )}
          </div>

          <div className="mb-4">
            <Textarea
              label="Short Description"
              {...formik.getFieldProps("shortDescription")}
            />
            {formik.touched.shortDescription && formik.errors.shortDescription && (
              <Typography variant="small" color="red">
                {formik.errors.shortDescription}
              </Typography>
            )}
          </div>

          <div className="mb-6">
            <Textarea
              label="Long Description"
              {...formik.getFieldProps("longDescription")}
            />
            {formik.touched.longDescription && formik.errors.longDescription && (
              <Typography variant="small" color="red">
                {formik.errors.longDescription}
              </Typography>
            )}
          </div>

          <Button
            type="submit"
            color="teal"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Update Campaign"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default EditDonation;