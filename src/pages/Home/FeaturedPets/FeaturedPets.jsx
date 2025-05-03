import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeaturedPets = () => {
  const navigate = useNavigate();

  const fetchFeaturedPets = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/featuredPets`);
    return response.data;
  };

  const { data: pets, isLoading, error } = useQuery({
    queryKey: ['featuredPets'],
    queryFn: fetchFeaturedPets,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-blue-gray-50 dark:bg-blue-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white"
            >
              Featured Pets Needing Homes
            </Typography>
            <Typography
              variant="lead"
              className="text-lg max-w-2xl mx-auto text-blue-gray-600 dark:text-blue-gray-300"
            >
              Meet some of our wonderful pets looking for their forever families
            </Typography>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                {/* Image Skeleton */}
                <div className="relative h-60 overflow-hidden">
                  <div className="w-full h-full bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded-none"></div>
                </div>
  
                <CardBody className="pt-4 pb-2">
                  {/* Title Skeleton */}
                  <div className="h-6 w-3/4 bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded mb-2"></div>
  
                  {/* Tags Skeleton */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="h-4 w-16 bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded-full"></div>
                    <div className="h-4 w-16 bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded-full"></div>
                    <div className="h-4 w-16 bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded-full"></div>
                  </div>
  
                  {/* Description Skeleton */}
                  <div className="h-4 w-full bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded"></div>
                </CardBody>
  
                <CardFooter className="pt-0">
                  {/* Button Skeleton */}
                  <div className="h-10 w-full bg-blue-gray-100 dark:bg-gray-700 animate-pulse rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-20 bg-blue-gray-50 dark:bg-blue-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <Typography 
            variant="paragraph" 
            className="text-red-600 dark:text-red-400"
          >
            Error loading pets: {error.message}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <Typography 
            variant="h2" 
            className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white"
          >
            Featured Pets Needing Homes
          </Typography>
          <Typography 
            variant="lead" 
            className="text-lg max-w-2xl mx-auto text-blue-gray-600 dark:text-blue-gray-300"
          >
            Meet some of our wonderful pets looking for their forever families
          </Typography>
        </div>

        {pets?.length === 0 ? (
          <div className="text-center">
            <Typography 
              variant="paragraph" 
              className="text-blue-gray-600 dark:text-blue-gray-300"
            >
              No featured pets available at the moment. Please check back later.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pets?.map((pet, index) => (
              <motion.div
                key={pet?._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-blue-gray-800">
                  <div className="relative h-60 overflow-hidden group">
                    <img
                      src={pet?.petImage}
                      alt={pet?.petName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardBody className="pt-4 pb-2">
                    <Typography 
                      variant="h5" 
                      className="mb-1 text-blue-gray-800 dark:text-white"
                    >
                      {pet?.petName}
                    </Typography>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Typography 
                        variant="small" 
                        className="px-2 py-1 rounded-full bg-blue-gray-100 dark:bg-gray-700 text-blue-gray-800 dark:text-white"
                      >
                        {pet?.petCategory}
                      </Typography>
                      <Typography 
                        variant="small" 
                        className="px-2 py-1 rounded-full bg-blue-gray-100 dark:bg-gray-700 text-blue-gray-800 dark:text-white"
                      >
                        {pet?.petBreed || 'Mixed'}
                      </Typography>
                      <Typography 
                        variant="small" 
                        className="px-2 py-1 rounded-full bg-blue-gray-100 dark:bg-gray-700 text-blue-gray-800 dark:text-white"
                      >
                        {pet?.petAge} years
                      </Typography>
                    </div>
                    <Typography 
                      variant="small" 
                      className="flex items-center text-blue-gray-600 dark:text-blue-gray-300"
                    >
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {pet?.petLocation}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      variant="filled"
                      color="amber"
                      fullWidth
                      onClick={() => navigate(`/pets/${pet?._id}`)}
                      className="dark:bg-amber-600 dark:hover:bg-amber-700"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button 
            variant="outlined" 
            color="amber"  
            onClick={() => navigate('/pets')}
            className="dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/20"
          >
            View All Available Pets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;