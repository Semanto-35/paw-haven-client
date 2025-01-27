import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../components/shared/Loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button, Card, CardBody, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);

  const { data: pets, isLoading, error } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-pets`);
      return data;
    },
  });



  const deletePetMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/pet/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pets"]);
      Swal.fire("Success", "Pet deleted successfully.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the pet.", "error");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/pet/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pets"]);
      Swal.fire("Success", `Pet status updated.`, "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update status.", "error");
    },
  });

  const updateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  }


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
        deletePetMutation.mutate(petId);
      }
    });
  };


  const columns = [
    {
      accessorKey: "petImage",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.petImage}
          alt="Pet"
          className="w-12 h-12 object-cover rounded-lg"
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
      accessorKey: "petCategory",
      header: "Category",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.petCategory}
        </Typography>
      ),
    },
    {
      accessorKey: "addedBy",
      header: "Email",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.addedBy}
        </Typography>
      ),
    },
    {
      accessorKey: "adopted",
      header: "Adoption Status",
      cell: ({ row }) => (
        <Chip
          size="sm"
          value={`${row.original.adopted ? "Adopted" : "Not Adopted"}`}
          color={`${row.original.adopted ? "green" : "pink"}`}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-evenly gap-2">
          <Tooltip content="Update Pet">
            <Link to={`/dashboard/update-pet/${row.original._id}`}>
              <IconButton
                variant="outlined"
                color="blue"
              >
                <PencilIcon className="h-5 w-5" />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Delete Pet">
            <IconButton
              variant="outlined"
              color="red"
              onClick={() => handleDelete(row.original._id)}
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Mark as Adopted">
            <IconButton
              variant="outlined"
              color="green"
              onClick={() => updateStatus(row.original._id, !row.original.adopted)}
            >
              <CheckIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: pets,
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
        <Typography variant="h3" className="mb-6 text-center">
          Manage All Pets
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
                      No pets Found.
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

export default AllPets;