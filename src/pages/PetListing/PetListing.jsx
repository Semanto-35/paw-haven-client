import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Input, Select, Typography, Option, Button, Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const PetListing = () => {
  const [searchName, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const { ref, inView } = useInView();

  const fetchPets = async ({ pageParam = 1 }) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/pets?page=${pageParam}&limit=9&search=${searchName}&category=${category}`);

    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["pets", { searchName, category }],
    queryFn: fetchPets,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const renderSkeletons = (count) => (
    Array(count)
      .fill(0)
      .map((_, index) => (
        <Card key={index} className="w-full max-w-[26rem] shadow-lg">
          <CardHeader floated={false} color="blue-gray">
            <Skeleton height={200} />
          </CardHeader>
          <CardBody>
            <Skeleton width="70%" />
            <Skeleton width="50%" />
          </CardBody>
          <CardFooter>
            <Skeleton width="100%" height={40} />
          </CardFooter>
        </Card>
      ))
  );


  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="my-8 text-center">
        <Typography variant="h2" >
          Adopt Your New Best Friend
        </Typography>
      </div>

      <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
        <div className="">
          <Input
            type="text"
            label="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            icon={<MagnifyingGlassIcon />} />
        </div>
        <div className="">
          <Select
            label="Select"
            value={category}
            onChange={(value) => setCategory(value)}
          >
            <Option value="">All Categories</Option>
            <Option value="Cats">Cats</Option>
            <Option value="Dogs">Dogs</Option>
            <Option value="Birds">Birds</Option>
            <Option value="Rabbits">Rabbits</Option>
            <Option value="Fish">Fish</Option>
          </Select>
        </div>
        <Button variant="filled"
          onClick={() => refetch()}
        >search</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
        {isLoading
          ? renderSkeletons(9)
          : data?.pages.map((page) =>
            page.pets.map((pet) => (
              <Card key={pet._id} className="w-full shadow-lg">
                <CardHeader floated={false} color="blue-gray">
                  <motion.img
                    src={pet.image}
                    alt="ui/ux review check"
                    className="w-full h-48 lg:h-60 object-cover"
                    whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h4" color="blue-gray" className="font-medium">
                      {pet.name}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"
                    >
                      {pet.age} old
                    </Typography>
                  </div>
                  <Typography
                    color="blue-gray"
                    className="flex items-center gap-1.5 font-normal"
                  >
                    <MapPinIcon className="w-6 h-6" />
                    {pet.location}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-3">
                  <Link to={`/pets/${pet._id}`}>
                    <Button size="md" fullWidth>
                      see details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
      </div>

      <div ref={ref} className="text-center mt-8">
        {isFetchingNextPage && renderSkeletons(3)}
        {isError && (
          <Typography variant="paragraph" color="red">
            Something went wrong. Please try again later.
          </Typography>
        )}
        {!hasNextPage && !isLoading && (
          <Typography variant="paragraph" color="blue-gray">No more pets to load.</Typography>
        )}
      </div>
    </div >
  );
};

export default PetListing;
