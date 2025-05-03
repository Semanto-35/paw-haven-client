import { Card, Typography, Button, Progress, Avatar } from "@material-tailwind/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";

export default function FeaturedCampaigns() {
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['donationCampaigns'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-campaigns`);
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-blue-gray-50 dark:bg-blue-gray-900">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white">
              Support Our Causes
            </Typography>
            <Typography variant="lead" className="text-lg text-blue-gray-600 dark:text-blue-gray-300 max-w-2xl mx-auto">
              Loading donation campaigns...
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="h-full overflow-hidden shadow-lg bg-white dark:bg-blue-gray-800">
                <div className="animate-pulse">
                  <div className="h-56 bg-blue-gray-100 dark:bg-blue-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 w-3/4 bg-blue-gray-100 dark:bg-blue-gray-700 rounded mb-4"></div>
                    <div className="h-4 w-full bg-blue-gray-100 dark:bg-blue-gray-700 rounded mb-6"></div>
                    <div className="h-2 w-full bg-blue-gray-100 dark:bg-blue-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-blue-gray-100 dark:bg-blue-gray-700 rounded mb-6"></div>
                    <div className="h-10 w-full bg-blue-gray-100 dark:bg-blue-gray-700 rounded"></div>
                  </div>
                </div>
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
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white">
              Support Our Causes
            </Typography>
            <Typography variant="lead" className="text-lg text-red-500 dark:text-red-400 max-w-2xl mx-auto">
              Error loading campaigns: {error.message}
            </Typography>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-blue-gray-50 dark:bg-blue-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-4 text-blue-gray-800 dark:text-white">
            Support Our Causes
          </Typography>
          <Typography variant="lead" className="text-lg text-blue-gray-600 dark:text-blue-gray-300 max-w-2xl mx-auto">
            Your donations help us provide care and find homes for pets in need
          </Typography>
        </motion.div>

        {campaigns?.length === 0 ? (
          <div className="text-center py-12">
            <Typography variant="h5" className="text-blue-gray-600 dark:text-blue-gray-300">
              No active donation campaigns at the moment. Please check back later.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns?.map((campaign, index) => {
              const daysLeft = differenceInDays(new Date(campaign.lastDate), new Date());
              const progressPercentage = (campaign.currentDonation / campaign.maxDonation) * 100;

              return (
                <motion.div
                  key={campaign._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col bg-white dark:bg-blue-gray-800 border border-blue-gray-100 dark:border-blue-gray-700">
                    {campaign.isPaused && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full z-10 text-sm font-bold">
                        Paused
                      </div>
                    )}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={campaign.petImage}
                        alt={campaign.petName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-gray-900/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Typography variant="h5" className="text-white font-bold">
                          {campaign.petName}
                        </Typography>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <Typography className="mb-6 text-blue-gray-600 dark:text-blue-gray-300 flex-grow">
                        {campaign.shortDescription}
                      </Typography>

                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <Typography variant="small" className="font-medium text-blue-gray-800 dark:text-white">
                            ${campaign.currentDonation} raised
                          </Typography>
                          <Typography variant="small" className="font-medium text-blue-gray-800 dark:text-white">
                            ${campaign.maxDonation} goal
                          </Typography>
                        </div>
                        <Progress
                          value={progressPercentage}
                          color={campaign.isPaused ? "gray" : "amber"}
                          className={`h-2 ${campaign.isPaused ? 'bg-blue-gray-300 dark:bg-blue-gray-600' : 'bg-blue-gray-100 dark:bg-blue-gray-700'}`}
                        />
                        <div className="flex justify-between mt-2">
                          <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-400">
                            {Math.round(progressPercentage)}% funded
                          </Typography>
                          <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-400">
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Campaign ended'}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={`https://ui-avatars.com/api/?name=${campaign.addedBy.split('@')[0]}`}
                            size="sm"
                            className="border border-amber-500 dark:border-amber-400"
                          />
                          <Typography variant="small" className="text-blue-gray-800 dark:text-white">
                            {campaign.addedBy}
                          </Typography>
                        </div>
                        <Typography variant="small" className="text-blue-gray-500 dark:text-blue-gray-400">
                          {format(new Date(campaign.createdAt), 'MMM d, yyyy')}
                        </Typography>
                      </div>

                      <Link to={`/campaigns/${campaign._id}`}>
                        <Button
                          color={campaign.isPaused ? "gray" : "amber"}
                          fullWidth
                          disabled={campaign.isPaused || daysLeft <= 0}
                          className="flex items-center justify-center gap-2 mt-auto group-hover:bg-amber-600 dark:group-hover:bg-amber-700 transition-colors"
                        >
                          <CurrencyDollarIcon className="w-5 h-5" />
                          {campaign.isPaused ? 'Campaign Paused' : daysLeft <= 0 ? 'Campaign Ended' : 'Donate Now'}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link to={'/donations'}>
            <Button
              variant="outlined"
              color="amber"
              className="dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/20"
            >
              View All Campaigns
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}