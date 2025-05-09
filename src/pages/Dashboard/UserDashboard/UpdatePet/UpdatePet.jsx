import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { imageUpload } from "../../../../utilities/utiliti";
import { toast } from "react-toastify";
import {
  Button,
  Input,
  Textarea,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/shared/Loader/Loader";


const UpdatePet = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const { data: petData, isLoading, error } = useQuery({
    queryKey: ["petData", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pets/${id}`);
      return data;
    },
  });

  const petCategories = [
    { value: "Dogs", label: "Dogs" },
    { value: "Cats", label: "Cats" },
    { value: "Birds", label: "Birds" },
    { value: "Rabbits", label: "Rabbits" },
    { value: "Fish", label: "Fish" },
  ];



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      petName: petData?.petName || '',
      petAge: petData?.petAge || 0,
      petCategory: petData?.petCategory
        ? { value: petData.petCategory, label: petData.petCategory }
        : null,
      petLocation: petData?.petLocation || '',
      shortDescription: petData?.shortDescription,
      petImage: petData?.petImage || null,
      longDescription: petData?.longDescription || '',
    },
    validationSchema: Yup.object({
      petName: Yup.string()
        .min(6, "Pet name must be at least 6 characters")
        .required("Pet name is required"),
      petAge: Yup.number()
        .min(0, "Pet age cannot be negative")
        .max(5, "Pet age cannot exceed 5")
        .required("Pet age is required"),
      petCategory: Yup.object()
        .shape({
          value: Yup.string().required("Pet category is required"),
          label: Yup.string(),
        })
        .nullable()
        .required("Pet category is required"),
      petLocation: Yup.string().required("Pet location is required"),
      shortDescription: Yup.string()
        .min(20, "Short description must be at least 20 characters")
        .max(35, "Short description must be under 35 characters")
        .required("Short description is required"),
      petImage: Yup.mixed().required("Pet image is required"),
      longDescription: Yup.string()
        .min(200, "Long description must be at least 200 characters")
        .required("Long description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const petImageURL = await imageUpload(values.petImage);
        const text = quillRef.current?.getEditor().getText();

        const updateData = {
          ...values,
          petImage: petImageURL || petData?.petImage,
          petCategory: values.petCategory.label,
          longDescription: text,
        }

        await axiosSecure.put(`/update-pet/${id}`, updateData);
        toast.success("Pet updated successfully!");
        formik.resetForm();
        navigate('/dashboard/my-pets')
      } catch (error) {
        console.error("Error adding pet:", error);
        toast.error("An error occurred while adding the pet.");
      }
    },
  });

  if (isLoading) return <Loader />;
  if (error) {
    console.error("Error fetching pet data:", error);
    return <Typography color="red">Failed to fetch pet details.</Typography>;
  }

  return (
    <div className="p-4">
      <Card className="max-w-3xl mx-auto py-4 shadow-lg bg-blue-50">
        <Typography variant="h3" className="text-center mb-2">
          Give <span className="text-orange-500">{petData.petName}</span> a Update
        </Typography>
        <Typography variant="paragraph" className="text-center mb-4">
          Help me to be adopted by giving it&apos;s updated details below.
        </Typography>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <Input
                label="Pet Name"
                name="petName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.petName}
                error={formik.touched.petName && !!formik.errors.petName}
              />
              {formik.touched.petName && formik.errors.petName && (
                <Typography variant="small" color="red">
                  {formik.errors.petName}
                </Typography>
              )}
            </div>

            <div className="mb-4">
              <Input
                label="Pet Age"
                name="petAge"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.petAge}
                error={formik.touched.petAge && !!formik.errors.petAge}
              />
              {formik.touched.petAge && formik.errors.petAge && (
                <Typography variant="small" color="red">
                  {formik.errors.petAge}
                </Typography>
              )}
            </div>

            <div className="mb-4">
              <Typography variant="small" className="block text-gray-700 mb-2">
                Pet Category
              </Typography>
              <Select
                options={petCategories}
                onChange={(option) =>
                  formik.setFieldValue("petCategory", option)
                }
                value={formik.values.petCategory}
                placeholder="Select Category"
              />
              {formik.touched.petCategory && formik.errors.petCategory && (
                <Typography variant="small" color="red">
                  {formik.errors.petCategory}
                </Typography>
              )}
            </div>

            <div className="mb-4">
              <Input
                type="text"
                label="Pet Location"
                name="petLocation"
                onChange={formik.handleChange}
                value={formik.values.petLocation}
                error={formik.touched.petLocation && !!formik.errors.petLocation}
              />
              {formik.touched.petLocation && formik.errors.petLocation && (
                <Typography variant="small" color="red">
                  {formik.errors.petLocation}
                </Typography>
              )}
            </div>

            <div className="mb-4">
              <Textarea
                label="Short Description"
                name="shortDescription"
                onChange={formik.handleChange}
                value={formik.values.shortDescription}
                error={
                  formik.touched.shortDescription &&
                  !!formik.errors.shortDescription
                }
              />
              {formik.touched.shortDescription &&
                formik.errors.shortDescription && (
                  <Typography variant="small" color="red">
                    {formik.errors.shortDescription}
                  </Typography>
                )}
            </div>


            <div className="mb-4">
              <Typography variant="small" className="block text-gray-700 mb-2">
                Long Description
              </Typography>
              <ReactQuill
                ref={quillRef}
                placeholder="Enter Pet Description here..."
                value={formik.values.longDescription}
                onChange={(content) =>
                  formik.setFieldValue("longDescription", content)
                }
                theme="snow"
              />
              {formik.touched.longDescription &&
                formik.errors.longDescription && (
                  <Typography variant="small" color="red">
                    {formik.errors.longDescription}
                  </Typography>
                )}
            </div>

            <div className="mb-4">
              <Typography variant="small" className="block text-gray-700 mb-2">
                Pet Image
              </Typography>
              <input
                type="file"
                onChange={(event) =>
                  formik.setFieldValue("petImage", event.target.files[0])
                }
                className="block w-full border rounded-lg p-2"
              />
              {formik.touched.petImage && formik.errors.petImage && (
                <Typography variant="small" color="red">
                  {formik.errors.petImage}
                </Typography>
              )}
            </div>

            <Button
              type="submit"
              color="orange"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Add Pet"}
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <Typography variant="small" className="text-gray-500">
            Update the form to provide new details for your pet.
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdatePet;