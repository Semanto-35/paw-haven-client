import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardBody, CardFooter, Typography, Button, Spinner, Select, Option, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

const PetListing = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [ref, inView] = useInView();

  // Fetch pets with infinite scroll
  const fetchPets = async ({ pageParam = 1 }) => {
    const params = new URLSearchParams({
      page: pageParam,
      limit: 10,
      search: searchTerm,
      category: categoryFilter,
      adopted: false,
    });

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets?${params}`);
    return response.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useQuery({
    queryKey: ['pets', searchTerm, categoryFilter],
    queryFn: fetchPets,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Handle infinite scroll
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Handle search and filter changes
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (categoryFilter) params.category = categoryFilter;
    setSearchParams(params);
    refetch();
  }, [searchTerm, categoryFilter, setSearchParams, refetch]);



  return (
    <section className="pb-16 pt-32 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white">
            Pets Available for Adoption
          </Typography>
          <Typography variant="lead" className="text-lg text-blue-gray-600 dark:text-blue-gray-300 max-w-2xl mx-auto">
            Find your perfect companion from our loving pets
          </Typography>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex-grow">
            <Input
              color='amber'
              label="Search pets by name"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:text-white"
            />
          </div>
          <div>
            <Select
              color='amber'
              label="Filter by category"
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
              className="dark:text-white"
            >
              <Option value="">All Categories</Option>
              <Option value="Dogs">Dogs</Option>
              <Option value="Cats">Cats</Option>
              <Option value="Birds">Birds</Option>
              <Option value="Rabbits">Rabbits</Option>
              <Option value="Fish">Fish</Option>
            </Select>
          </div>
          <Button
            size='md'
            color="amber"
            variant="gradient"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setSearchParams({});
            }}
          >
            Reset
          </Button>
          <div>

          </div>
        </div>

        {/* Pet Listing */}
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : status === 'error' ? (
          <div className="text-center text-red-500 dark:text-red-400">
            Error: {error.message}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.pets?.map((pet, index) => (
                <motion.div
                  key={pet._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col bg-white dark:bg-blue-gray-800">
                    <div className="relative h-60 overflow-hidden group">
                      <img
                        src={pet.petImage || 'https://via.placeholder.com/300'}
                        alt={pet.petName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-gray-900/70 via-transparent to-transparent" />
                    </div>
                    <CardBody className="p-6 flex-grow">
                      <Typography variant="h5" className="mb-2 text-blue-gray-800 dark:text-white">
                        {pet.petName}
                      </Typography>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Typography variant="small" className="px-2 py-1 rounded-full bg-blue-gray-100 dark:bg-blue-gray-700 text-blue-gray-800 dark:text-white">
                          {pet.petCategory}
                        </Typography>
                        <Typography variant="small" className="px-2 py-1 rounded-full bg-blue-gray-100 dark:bg-blue-gray-700 text-blue-gray-800 dark:text-white">
                          {pet.petAge} years
                        </Typography>
                      </div>
                      <Typography className="flex items-center text-blue-gray-600 dark:text-blue-gray-300 mb-4">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {pet.petLocation}
                      </Typography>
                      <Typography className="text-blue-gray-600 dark:text-blue-gray-300 line-clamp-3">
                        {pet.shortDescription}
                      </Typography>
                    </CardBody>
                    <CardFooter className="p-6 pt-0">
                      <Button
                        color="amber"
                        fullWidth
                        onClick={() => navigate(`/pets/${pet._id}`)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={ref} className="h-10 flex justify-center mt-8">
              {isFetchingNextPage ? (
                <Spinner className="h-8 w-8" />
              ) : hasNextPage ? (
                <Typography className="text-blue-gray-500 dark:text-blue-gray-400">
                  Loading more pets...
                </Typography>
              ) : (
                <Typography className="text-blue-gray-500 dark:text-blue-gray-400">
                  You&apos;ve seen all available pets
                </Typography>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PetListing;


// import { useEffect, useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
// import axios from "axios";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Input, Select, Typography, Option, Button, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
// import { MapPinIcon } from "@heroicons/react/24/solid";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";


// const PetListing = () => {
//   const [searchName, setSearchName] = useState("");
//   const [category, setCategory] = useState("");
//   const [sortByAge, setSortByAge] = useState("");
//   const { ref, inView } = useInView();

//   const fetchPets = async ({ pageParam = 1 }) => {
//     const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets?page=${pageParam}&limit=9&search=${searchName}&category=${category}&sortByAge=${sortByAge}`);

//     return response.data;
//   };

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//     refetch,
//   } = useInfiniteQuery({
//     queryKey: ["pets", { searchName, category }],
//     queryFn: fetchPets,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     enabled: true,
//   });

//   useEffect(() => {
//     if (inView && hasNextPage) fetchNextPage();
//   }, [inView, hasNextPage, fetchNextPage]);

//   const renderSkeletons = (count) => (
//     Array(count)
//       .fill(0)
//       .map((_, index) => (
//         <Card key={index} className="w-full max-w-[26rem] shadow-lg">
//           <CardHeader floated={false} color="blue-gray">
//             <Skeleton height={200} />
//           </CardHeader>
//           <CardBody>
//             <Skeleton width="70%" />
//             <Skeleton width="50%" />
//           </CardBody>
//           <CardFooter>
//             <Skeleton width="100%" height={40} />
//           </CardFooter>
//         </Card>
//       ))
//   );


//   return (
//     <div className="max-w-screen-2xl mt-[72px] mx-auto px-4 py-16">
//       <div className="py-8 text-center">
//         <Typography variant="h2" >
//           Adopt Your New Best Friend
//         </Typography>
//       </div>

//       <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
//         <div>
//           <Input
//             type="text"
//             label="Search by name..."
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//             icon={<MagnifyingGlassIcon />} />
//         </div>
//         <div>
//           <Select
//             label="Select"
//             value={category}
//             onChange={(value) => setCategory(value)}
//           >
//             <Option value="">All Categories</Option>
//             <Option value="Cats">Cats</Option>
//             <Option value="Dogs">Dogs</Option>
//             <Option value="Birds">Birds</Option>
//             <Option value="Rabbits">Rabbits</Option>
//             <Option value="Fish">Fish</Option>
//           </Select>
//         </div>
//         <div>
//           <Select label="Sort By Age" value={sortByAge} onChange={(value) =>  setSortByAge(value)}>
//             <Option value="">Sort By</Option>
//             <Option value="ageAsc">Youngest First</Option>
//             <Option value="ageDesc">Oldest First</Option>
//           </Select>
//         </div>
//         <Button color="blue-gray" variant="filled"
//           onClick={() => refetch()}
//         >search</Button>
//       </div>

//       {data?.pages[0]?.pets.length === 0 && !isLoading && (
//         <Typography variant="h5" className="text-center mt-6">
//           No pets found. Try a different search or category.
//         </Typography>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
//         {isLoading
//           ? renderSkeletons(9)
//           : data?.pages.map((page) =>
//             page.pets.map((pet) => (
//               <Card key={pet._id} className="w-full shadow-lg h-full dark:bg-gray-700 dark:text-gray-100">
//                 <CardHeader floated={false} color="blue-gray">
//                   <motion.img
//                     src={pet.petImage}
//                     alt={pet.petName}
//                     className="w-full h-48 lg:h-60 object-cover"
//                     whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
//                   />
//                 </CardHeader>
//                 <CardBody className="flex-grow">
//                   <div className="mb-3 flex items-center justify-between">
//                     <Typography variant="h4" className="font-medium">
//                       {pet.petName}
//                     </Typography>
//                     <Typography
//                       className="flex items-center gap-1.5 font-normal"
//                     >
//                       {pet.petAge < 1 ? `${Math.round(pet.petAge * 10)} months` : `${pet.petAge} years`}
//                     </Typography>
//                   </div>
//                   <Typography
//                     className="flex items-center gap-1.5 font-normal"
//                   >
//                     <MapPinIcon className="w-6 h-6" />
//                     {pet.petLocation}
//                   </Typography>
//                   <Typography
//                     className="font-normal mt-2"
//                   >
//                     {pet.shortDescription}
//                   </Typography>
//                 </CardBody>
//                 <CardFooter className="pt-3">
//                   <Link to={`/pets/${pet._id}`}>
//                     <Button size="md" color="pink" fullWidth>
//                       see details
//                     </Button>
//                   </Link>
//                 </CardFooter>
//               </Card>
//             ))
//           )}
//       </div>

//       <div ref={ref} className="text-center mt-8">
//         {isFetchingNextPage && renderSkeletons(3)}
//         {isError && (
//           <Typography variant="paragraph" color="red">
//             Something went wrong. Please try again later.
//           </Typography>
//         )}
//         {!hasNextPage && !isLoading && (
//           <Typography variant="paragraph" color="blue-gray">No more pets to load.</Typography>
//         )}
//       </div>
//     </div >
//   );
// };

// export default PetListing;