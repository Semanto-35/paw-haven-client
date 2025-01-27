import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../../components/shared/Loader/Loader";
import { Button, Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";



const AdoptionRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ["adoptionRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/adopted-pet/${user?.email}`);
      return data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/pet/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["adoptionRequests"]);
      Swal.fire("Success!", "Request status updated.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update request status.", "error");
    },
  });

  const handleStatusUpdate = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  const columns = [
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
      accessorKey: "petName",
      header: "Pet Name",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.petName}
        </Typography>
      ),
    },
    {
      accessorKey: "requesterName",
      header: "Requester",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.requesterName}
        </Typography>
      ),
    },
    {
      accessorKey: "requester",
      header: "Contact",
      cell: ({ row }) => (
        <div>
          <Typography variant="small" className="font-medium">
            Email: {row.original.requesterEmail}
          </Typography>
          <Typography variant="small" className="font-medium">
            Phone: {row.original.phone}
          </Typography>
          <Typography variant="small" className="font-medium">
            Location: {row.original.location}
          </Typography>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        row.original.status ? (
          <Chip color="green" value="Accepted" />
        ) : (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              color="green"
              onClick={() => handleStatusUpdate(row.original._id, true)}
            >
              Accept
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={() => handleStatusUpdate(row.original._id, false)}
            >
              Reject
            </Button>
          </div>
        )
      }
    },
  ]

  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  if (isLoading) return <div><Loader /></div>;
  if (error) {
    console.error("Error fetching pet data:", error);
    return <Typography color="red">Failed to fetch adoption requests.</Typography>
  }

  return (
    <div className="p-4">
      <Card>
        <Typography variant="h4" className="text-center mb-6">
          Adoption Requests
        </Typography>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full table-auto  border">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-200">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="border border-gray-300 px-4 py-2 text-center text-sm"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())
                        }
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
                      No adoption requests yet.
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

export default AdoptionRequests;