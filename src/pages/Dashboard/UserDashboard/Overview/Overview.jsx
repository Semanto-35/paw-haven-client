import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaUsers, FaPaw, FaDonate, FaStar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPets: 0,
    totalDonations: 0,
    totalCampaigns: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosSecure.get(`/stats`);
        setStats(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosSecure]);

  const statsData = [
    { title: "Total Users", value: stats.totalUsers, icon: <FaUsers size={30} className="text-blue-500" />, bg: "bg-blue-100" },
    { title: "Pets Listed", value: stats.totalPets, icon: <FaPaw size={30} className="text-green-500" />, bg: "bg-green-100" },
    { title: "Total Donations", value: `$${stats.totalDonations}`, icon: <FaDonate size={30} className="text-yellow-500" />, bg: "bg-yellow-100" },
    { title: "Total Campaigns", value: stats.totalCampaigns, icon: <FaStar size={30} className="text-red-500" />, bg: "bg-red-100" },
  ];

  const barData = [
    { name: "Jan", users: 200, pets: 50, donations: 1500 },
    { name: "Feb", users: 180, pets: 60, donations: 2000 },
    { name: "Mar", users: 220, pets: 80, donations: 2500 },
    { name: "Apr", users: 260, pets: 100, donations: 3200 },
    { name: "May", users: 300, pets: 120, donations: 4000 },
  ];

  const pieData = [
    { name: "Adopted Pets", value: 120 },
    { name: "Available Pets", value: 200 },
  ];

  const COLORS = ["#4CAF50", "#FF9800"];

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className={`shadow-lg flex items-center justify-between p-6 rounded-xl ${stat.bg}`}>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{stat.title}</h2>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div>{stat.icon}</div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="shadow-lg p-6 rounded-xl">
          <CardHeader floated={false} className="text-lg font-semibold text-gray-700">
            Monthly User & Pet Registrations
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                <Bar dataKey="pets" fill="#34D399" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Line Chart */}
        <Card className="shadow-lg p-6 rounded-xl">
          <CardHeader floated={false} className="text-lg font-semibold text-gray-700">
            Donations Over Time
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={barData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke="#FBBF24" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-lg p-6 rounded-xl">
          <CardHeader floated={false} className="text-lg font-semibold text-gray-700">
            Pet Adoption Status
          </CardHeader>
          <CardBody className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
