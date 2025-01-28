import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

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


  if (status === "loading") return <Loader />
  if (status === "error") return <Typography color="red">Failed to load campaigns.</Typography>;


  return (
    <div className="max-w-screen-2xl mx-auto px-4 my-12">
      <div className="my-8 text-center">
        <Typography variant="h2" >
          Donation Campaigns
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.pages.map((page) =>
          page.campaigns.map((campaign) => (
            <Card key={campaign._id} className="shadow-md rounded-lg w-full">
              <CardHeader floated={false} color="blue-gray">
                <img
                  src={campaign.petImage}
                  alt={campaign.petName}
                  className="w-full h-48 lg:h-60 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardBody className="p-4">
                <Typography variant="h5" color="blue-gray">
                  {campaign.petName}
                </Typography>

                <Typography variant="paragraph" color="blue-gray" className="font-medium">
                  Max Donation: ${campaign.maxDonation}
                </Typography>

                <Typography variant="paragraph" color="blue-gray" className="font-medium">
                  Donated: ${campaign.currentDonation}
                </Typography>
              </CardBody>

              <CardFooter className="pt-3">
                <Link to={`/campaigns/${campaign._id}`}>
                  <Button size="md" fullWidth>
                    view details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage && <Typography variant="paragraph" color="blue-gray">
          Loading more campaigns...
        </Typography>}
        {!hasNextPage && !isFetchingNextPage && (
          <Typography variant="paragraph" color="blue-gray">No more campaigns to show</Typography>
        )}
      </div>
    </div>
  );
};

export default DonationCampaigns;