import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../components/shared/Loader/Loader";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button, Card, CardBody, Tooltip, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useState } from "react";


const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user?.email}`);
      return data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/user/role/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Success", "User promoted to admin successfully.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to promote user to admin.", "error");
    },
  });

  const banUserMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/user/ban/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Success", "User has been banned.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to ban a user.", "error");
    },
  });


  const columns = [
    {
      accessorKey: "image",
      header: "Profile Picture",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt="Pet"
          className="h-12 w-12 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.name}
        </Typography>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <Typography variant="small" className="font-medium">
          {row.original.email}
        </Typography>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Tooltip content="Make Admin">
            <Button
              size="sm"
              color="green"
              onClick={() => makeAdminMutation.mutate(row.original._id)}
              disabled={row.original.role === "admin"}
            >
              {row.original.role === "admin" ? "Admin" : "Admin"}
            </Button>
          </Tooltip>
          <Tooltip content="Ban User">
            <Button
              size="sm"
              color="red"
              onClick={() => banUserMutation.mutate(row.original._id)}
              disabled={row.original?.isBanned}
            >
              {row.original?.isBanned ? "Banned" : "Ban"}
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
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
          Manage All Users
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
                        className="px-4 py-2  text-center text-sm border border-gray-300"
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
                      No users Found.
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

export default ManageUsers;