import { useState } from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";


const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    phone: "",
    address: "",
    bio: "",
  });


  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader floated={false} className="bg-gray-900 text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-semibold">User Profile</h2>
        </CardHeader>
        <CardBody>
          <Tabs value={activeTab} onChange={(val) => setActiveTab(val)}>
            <TabsHeader className="bg-gray-100 dark:bg-blue-gray-800 rounded-lg text-black dark:text-white">
              <Tab value="overview">Overview</Tab>
              <Tab value="edit">Edit Profile</Tab>
              <Tab value="security">Security</Tab>
            </TabsHeader>

            <TabsBody>
              {/* Overview Tab */}
              <TabPanel value="overview">
                <div className="flex items-center space-x-6">
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                    <p className="text-gray-500">{formData.phone || "No phone number"}</p>
                    <p className="text-gray-500">{formData.address || "No address provided"}</p>
                  </div>
                </div>
              </TabPanel>

              {/* Edit Profile Tab */}
              <TabPanel value="edit">
                <div className="grid gap-4">
                  <Input
                    type="text"
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="text"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    type="text"
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <Input
                    type="text"
                    label="Short Bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                  <Button  className="w-full">
                    Save Changes
                  </Button>
                </div>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value="security">
                <p className="text-gray-600">
                  To update your password, go to <strong>Account Settings</strong>.
                </p>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;