import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Progress, Tooltip, Typography } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/shared/Loader/Loader";
import useAuth from "../../../../hooks/useAuth";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Swal from "sweetalert2";
import { CheckIcon, PauseIcon, PencilIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useState } from "react";


const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["campaigns", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-campaigns/${user?.email}`);
      return data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (donationId) => axiosSecure.patch(`/donation-campaigns/${donationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["donations"]);
      Swal.fire("Success!", "Donation status updated.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update donation status.", "error");
    },
  });

  const handlePauseCampaign = (id) => {
    toggleMutation.mutate(id);
  }

  const { mutate: handleViewDonators, data: donators, isPending, isSuccess } = useMutation({
    mutationFn: async (campaignId) => {
      const { data } = await axiosSecure.get(`/donations/${campaignId}`);
      return data;
    },
    onSuccess: () => {
      setOpen(true);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to fetch donators.", "error");
    },
  });


  const columns = [
    {
      accessorKey: "petName",
      header: "Pet Name",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.petName}
        </Typography>
      ),
    },
    {
      accessorKey: "maxDonation",
      header: "Max Donation",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.maxDonation}
        </Typography>
      ),
    },
    {
      header: "Progress",
      cell: ({ row }) => {
        const donation = row.original;
        return (
          <Progress
            value={(donation.currentDonation / donation.maxDonation) * 100}
            color="green"
          />
        );
      }
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-evenly gap-2">
          <Tooltip content="Edit Campaign">
            <Link to={`/dashboard/update-Campaign/${row.original._id}`}>
              <IconButton
                variant="outlined"
                color="blue"
              >
                <PencilIcon className="h-5 w-5" />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content={row.original?.isPaused ? "Resume Campaign" : "Pause Campaign"}>
            <IconButton
              variant="outlined"
              color="red"
              onClick={() => handlePauseCampaign(row.original._id)}
            >
              {row.original?.isPaused ? <PlayIcon className="h-6 w-6" strokeWidth={2} /> : <PauseIcon className="h-6 w-6" strokeWidth={2} />}
            </IconButton>
          </Tooltip>
          <Tooltip content="View Donators">
            <IconButton
              variant="outlined"
              color="green"
              onClick={() => handleViewDonators(row.original._id)}
            >
              <CheckIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Campaign">
            <IconButton
              variant="outlined"
              color="red"
              disabled
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loader />
  if (error) {
    console.error("Error fetching donation campaigns:", error);
    return <Typography color="red">Failed to load campaigns.</Typography>;
  }

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h3" className="text-center mb-6">
        My Donation Campaigns
      </Typography>
      <Card>
        <CardBody>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 px-4 py-2 text-left"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center py-4 text-gray-500"
                  >
                    No Results Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} size="md">
        <DialogHeader>Donators List</DialogHeader>
        <DialogBody divider>
          {isPending ? (
            <Typography>Loading donators...</Typography>
          ) : isSuccess && donators.length > 0 ? (
            <ul>
              {donators.map((donator) => (
                <li
                  key={donator._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <Typography>{donator.name}</Typography>
                  <Typography>${donator.amount}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No donators found.</Typography>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  );


};

export default MyDonationCampaigns;
