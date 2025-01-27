import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../components/shared/Loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { getCoreRowModel, getPaginationRowModel, useReactTable, getSortedRowModel } from "@tanstack/react-table";
import { Button, Card, CardBody, IconButton, Progress, Tooltip, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { PauseIcon, PencilIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-campaigns`);
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

  const handleToggleCampaign = (id) => {
    toggleMutation.mutate(id);
  }

  const deleteMutation = useMutation({
    mutationFn: (petId) => axiosSecure.delete(`/donation-campaign/${petId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pets"]);
      Swal.fire("Deleted!", "The pet has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the pet.", "error");
    },
  });


  const handleDelete = (petId) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(petId);
      }
    });
  };


  const columns = [
    {
      accessorKey: "index",
      header: "S/N",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "petImage",
      header: "Pet Image",
      cell: ({ row }) => (
        <img src={row.original.petImage}
          className="w-16 h-16 object-cover rounded-lg"
          alt="" />
      ),
    },
    {
      accessorKey: "lastDate",
      header: "Last Date",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.lastDate}
        </Typography>
      ),
    },
    {
      accessorKey: "addedBy",
      header: "Asked By",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.addedBy}
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
              onClick={() => handleToggleCampaign(row.original._id)}
            >
              {row.original?.isPaused ? <PlayIcon className="h-6 w-6" strokeWidth={2} /> : <PauseIcon className="h-6 w-6" strokeWidth={2} />}
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Campaign">
            <IconButton
              variant="outlined"
              color="red"
              onClick={() => handleDelete(row.original._id)}
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    initialState: { pagination: { pageSize: 10 } },
  });

  if (isLoading) return <Loader />
  if (error) return <Typography color="red">Error: {error.message}</Typography>;


  return (
    <div className="p-4">
      <Card>
        <Typography variant="h3" className="text-center mb-6">
          Manage All Campaigns
        </Typography>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-200">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-4 py-2 border text-center text-sm border-gray-300"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : typeof header.column.columnDef.header === "function"
                            ? header.column.columnDef.header()
                            : header.column.columnDef.header}
                        {header.column.getIsSorted() === "asc" && " \u2191"}
                        {header.column.getIsSorted() === "desc" && " \u2193"}
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
                          {typeof cell.column.columnDef.cell === "function"
                            ? cell.column.columnDef.cell(cell.getContext())
                            : cell.getValue()}
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
                      No Campaigns Found.
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

export default AllDonations;