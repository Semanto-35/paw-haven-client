import { Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

const PetCategory = () => {
  const navigate = useNavigate();

  // Fetch categories from backend
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['petCategories'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/pet-categories`);
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white"
            >
              Browse by Category
            </Typography>
            <Typography
              variant="lead"
              className="text-lg max-w-2xl mx-auto text-blue-gray-600 dark:text-blue-gray-300"
            >
              Loading categories...
            </Typography>
          </div>
          <div className="flex justify-center">
            <Spinner className="h-12 w-12" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white"
            >
              Browse by Category
            </Typography>
            <Typography
              variant="lead"
              className="text-lg max-w-2xl mx-auto text-red-500 dark:text-red-400"
            >
              Error loading categories: {error.message}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white"
          >
            Browse by Category
          </Typography>
          <Typography
            variant="lead"
            className="text-lg max-w-2xl mx-auto text-blue-gray-600 dark:text-blue-gray-300"
          >
            Find your perfect pet by exploring our different categories
          </Typography>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories?.map((category, index) => (
            <motion.div
              key={category._id || category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Button
                variant="text"
                className="w-full h-full p-4 flex flex-col items-center justify-center bg-white dark:bg-blue-gray-800 shadow-md hover:shadow-lg rounded-xl transition-all duration-300 group"
                onClick={() => navigate(`/pets?category=${category.name}`)}
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-blue-gray-100 dark:bg-blue-gray-700 rounded-full group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors duration-300">
                  {category.icon ? (
                    <span className="text-3xl">{category.icon}</span>
                  ) : (
                    <span className="text-3xl">
                      {category.name === 'Dogs' ? '🐕' : 
                       category.name === 'Cats' ? '🐈' : 
                       category.name === 'Birds' ? '🦜' : 
                       category.name === 'Fish' ? '🐠' : '🐾'}
                    </span>
                  )}
                </div>
                <Typography
                  variant="h5"
                  className="text-lg font-semibold text-blue-gray-800 dark:text-white mb-1"
                >
                  {category.name}
                </Typography>
                <Typography
                  variant="small"
                  className="text-blue-gray-500 dark:text-blue-gray-400"
                >
                  {category.count || 0} available
                </Typography>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCategory;