import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../../components/shared/Loader/Loader";
import { Button, Card, CardBody, Chip, Tooltip, Typography } from "@material-tailwind/react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { toast } from "react-toastify";



const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations, isLoading, error } = useQuery({
    queryKey: ["userDonations", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donations/${user?.email}`);
      return data;
    },
  });

  const handleRefund = (id) => {
    const camp = donations.find(donation => donation._id === id);
    refundMutation.mutate({ campaignId: camp.campaignId, money: camp.currentDonation });

  }


  const deleteMutation = useMutation({
    mutationFn: (donationId) => axiosSecure.delete(`/delete-donation/${donationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["userDonations"]);
      toast.success("Donation removed from my donations");
    },
    onError: () => {
      toast.error("Failled to removed donation")
    },
  });

  const refundMutation = useMutation({
    mutationFn: ({campaignId, money}) => axiosSecure.patch(`/refundMoney/${campaignId}`, { money }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userDonations"]);
      Swal.fire("Success!", "Refund successful.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to submit refund request.", "error");
    },
  });

  const handleDeleteDonation = (id) => {
    Swal.fire({
      title: "Are you wanted to refund?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleRefund(id);
        deleteMutation.mutate(id);
      }
    });
  };

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
      accessorKey: "petImage",
      header: "Pet Image",
      cell: ({ row }) => (
        <img
          src={row.original.petImage}
          alt={row.original.petName}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      accessorKey: "donatedAmount",
      header: "Donated Amount",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.donatedAmount}
        </Typography>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        row.original.isRefundRequested ? (
          <Chip variant="outlined" color="red" value="Refund Requested" />
        ) : (
          <Tooltip content="Refund Donations">
            <Button
              size="sm"
              color="red"
              onClick={() => handleDeleteDonation(row.original._id)}
            >
              Ask for Refund
            </Button>
          </Tooltip>
        )
      )
    },
  ]

  const table = useReactTable({
    data: donations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  if (isLoading) return <div><Loader /></div>;
  if (error) {
    console.error("Error fetching pet data:", error);
    return <Typography color="red">Failed to fetch donations details.</Typography>
  }

  return (
    <div className="p-4">
      <Card className="py-4 bg-teal-50">
        <Typography variant="h3" className="text-center mb-6">
          My Donations
        </Typography>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full table-auto  border">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-100">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="border border-gray-300 px-4 py-2 text-center text-sm"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100 even:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2 text-center border text-sm">
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
                      No Donations made yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
              size="sm"
              variant="outlined"
            >
              Previous
            </Button>
            <Typography variant="small">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Typography>
            <Button
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
              size="sm"
              variant="outlined"
            >
              Next
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyDonations;