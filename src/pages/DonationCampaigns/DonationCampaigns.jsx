
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Progress,
  Chip,
  Avatar
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  HeartIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const DonationCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const { ref, inView } = useInView({ threshold: 0 });

  const fetchcampaigns = async ({ pageParam = 1 }) => {
    const { data } = await axiosSecure.get(`/allCampaigns?page=${pageParam}`);
    return data;
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["campaigns"],
    queryFn: fetchcampaigns,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") return <Loader />;
  if (status === "error") return <Typography color="red" className="text-center py-12">Failed to load campaigns.</Typography>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 pt-32 pb-10 bg-blue-gray-50 dark:bg-blue-gray-900">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-blue-gray-800 dark:text-white mb-4">
          Help Pets in <span className="text-amber-600 dark:text-amber-400">Need</span>
        </Typography>
        <Typography variant="lead" className="text-xl text-blue-gray-600 dark:text-blue-gray-300 max-w-3xl mx-auto">
          Your support provides food, shelter, and medical care for animals waiting for their forever homes.
        </Typography>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {data?.pages?.map((page) =>
          page?.campaigns?.map((campaign, index) => {
            const progress = (campaign.currentDonation / campaign.maxDonation) * 100;
            const daysLeft = Math.ceil((new Date(campaign.lastDate) - new Date()) / (1000 * 60 * 60 * 24));

            return (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-gray-100 dark:border-blue-gray-800 overflow-hidden bg-white dark:bg-blue-gray-800 h-full flex flex-col"
                >
                  <CardHeader floated={false} className="m-0 rounded-none relative h-64">
                    <img
                      src={campaign.petImage}
                      alt={campaign.petName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Chip
                        value={daysLeft > 0 ? `${Math.max(0, daysLeft)} days left` : 'Ended'}
                        color={daysLeft > 0 ? 'green' : 'red'}
                        size="sm"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                      <Typography variant="h4" className="text-white">
                        {campaign.petName}
                      </Typography>
                    </div>
                  </CardHeader>

                  <CardBody className="p-6 flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${campaign.addedBy.split('@')[0]}`}
                        alt={campaign.addedBy}
                        size="sm"
                        className="border-2 border-amber-500"
                      />
                      <Typography variant="small" className="text-blue-gray-600 dark:text-blue-gray-300">
                        By {campaign.addedBy.split('@')[0]}
                      </Typography>
                    </div>

                    <Typography className="text-blue-gray-700 dark:text-blue-gray-300">
                      {campaign.shortDescription}
                    </Typography>
                  </CardBody>

                  <CardFooter className="pt-0 pb-6 px-6">
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <Typography variant="small" className="text-blue-gray-600 dark:text-blue-gray-300">
                          ${campaign.currentDonation} raised
                        </Typography>
                        <Typography variant="small" className="text-blue-gray-600 dark:text-blue-gray-300">
                          ${campaign.maxDonation} goal
                        </Typography>
                      </div>
                      <Progress
                        value={progress}
                        color="amber"
                        className="h-2"
                      />
                      <Typography variant="small" className="text-right mt-1 text-amber-600 dark:text-amber-400">
                        {progress.toFixed(1)}% funded
                      </Typography>
                    </div>
                    <Link to={`/campaigns/${campaign._id}`}>
                      <Button
                        fullWidth
                        color="amber"
                        className="flex items-center justify-center gap-2"
                      >
                        View Details <ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={ref} className="text-center py-8">
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center">
            <Loader size="md" />
            <Typography variant="small" className="mt-2 text-blue-gray-600 dark:text-blue-gray-400">
              Loading more campaigns...
            </Typography>
          </div>
        ) : !hasNextPage && !isFetchingNextPage ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg max-w-md mx-auto">
            <Typography variant="h6" className="text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2">
              <HeartIcon className="h-5 w-5" />
              You&apos;ve reached the end!
            </Typography>
            <Typography variant="small" className="text-amber-600 dark:text-amber-300 mt-2">
              Thank you for supporting all our furry friends.
            </Typography>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DonationCampaigns;


// import { useInfiniteQuery } from "@tanstack/react-query";
// import Loader from "../../components/shared/Loader/Loader";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
// import { Link } from "react-router-dom";

// const DonationCampaigns = () => {
//   const axiosSecure = useAxiosSecure();
//   const { ref, inView } = useInView({ threshold: 0 });

//   const fetchcampaigns = async ({ pageParam = 1 }) => {
//     const { data } = await axiosSecure.get(`/allCampaigns?page=${pageParam}`);
//     return data;
//   }

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["campaigns"],
//     queryFn: fetchcampaigns,
//     getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
//   });

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


//   if (status === "loading") return <Loader />
//   if (status === "error") return <Typography color="red">Failed to load campaigns.</Typography>;


//   return (
//     <div className="max-w-screen-2xl mx-auto px-4 py-12 mt-[72px]">
//       <div className="mb-8 text-center">
//         <Typography variant="h2" >
//           Donation Campaigns
//         </Typography>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {data?.pages.map((page) =>
//           page.campaigns.map((campaign) => (
//             <Card key={campaign._id} className="shadow-md rounded-lg w-full dark:bg-blue-gray-800 dark:text-blue-gray-100">
//               <CardHeader floated={false} >
//                 <img
//                   src={campaign.petImage}
//                   alt={campaign.petName}
//                   className="w-full h-48 lg:h-60 object-cover rounded-t-lg"
//                 />
//               </CardHeader>
//               <CardBody className="p-4">
//                 <Typography variant="h5" >
//                   {campaign.petName}
//                 </Typography>

//                 <Typography variant="paragraph"  className="font-medium">
//                   Max Donation: ${campaign.maxDonation}
//                 </Typography>

//                 <Typography variant="paragraph"  className="font-medium">
//                   Donated: ${campaign.currentDonation}
//                 </Typography>
//               </CardBody>

//               <CardFooter className="pt-3">
//                 <Link to={`/campaigns/${campaign._id}`}>
//                   <Button size="md" color="pink" fullWidth>
//                     view details
//                   </Button>
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))
//         )}
//       </div>
//       <div ref={ref} className="text-center mt-4">
//         {isFetchingNextPage && <Typography variant="paragraph">
//           Loading more campaigns...
//         </Typography>}
//         {!hasNextPage && !isFetchingNextPage && (
//           <Typography variant="paragraph" >No more campaigns to show.</Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonationCampaigns;