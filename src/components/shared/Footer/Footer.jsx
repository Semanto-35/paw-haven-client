import { Typography } from "@material-tailwind/react";
import {
  HomeIcon,
  HeartIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import facebook from '../../../assets/icons/facebook_2.png';
import instagram from '../../../assets/icons/instagram.png';
import linkedin from '../../../assets/icons/linkedin.png';
import github from '../../../assets/icons/github.png';
import twitter from '../../../assets/icons/twitter.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    {
      title: "Navigation",
      icon: <HomeIcon className="w-4 h-4" />,
      items: [
        { name: "Home", href: "/" },
        { name: "Pet Listing", href: "/pets" },
        { name: "Donations", href: "/donations" },
        { name: "Success Stories", href: "/success-stories" }
      ],
    },
    {
      title: "Support",
      icon: <HeartIcon className="w-4 h-4" />,
      items: [
        { name: "Adoption Process", href: "/adoption-process" },
        { name: "Donate", href: "/donate" },
        { name: "Volunteer", href: "/volunteer" },
        { name: "Foster Care", href: "/foster" }
      ],
    },
    {
      title: "Company",
      icon: <UserGroupIcon className="w-4 h-4" />,
      items: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "/contact" }
      ],
    },
    {
      title: "Help",
      icon: <QuestionMarkCircleIcon className="w-4 h-4" />,
      items: [
        { name: "FAQs", href: "/faqs" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Blog", href: "/blog" }
      ],
    },
  ];

  return (
    <footer className="relative w-full bg-white dark:bg-blue-gray-800 text-blue-gray-800 dark:text-blue-gray-200 py-12"> 
      <div className="w-full max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"> 
          <div className="space-y-4">
            <Typography variant="h4" className="flex items-center gap-2 text-amber-600 dark:text-amber-400"> 
              <img src="https://i.ibb.co.com/3mVJxK4p/paw-print-1.png" alt="" />
              Paw Haven
            </Typography>
            <Typography className="max-w-md">
              Connecting loving homes with pets in need since {currentYear - 2}.
              Our mission is to reduce animal homelessness through adoption,
              education, and community support.
            </Typography>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-blue-gray-700 dark:text-blue-gray-300 hover:text-amber-500 dark:hover:text-amber-400">
                <img src={facebook} alt="" />
              </a>
              <a href="#" className="text-blue-gray-700 dark:text-blue-gray-300 hover:text-amber-500 dark:hover:text-amber-400">
                <img src={instagram} alt="" />
              </a>
              <a href="#" className="text-blue-gray-700 dark:text-blue-gray-300 hover:text-amber-500 dark:hover:text-amber-400">
                <img src={twitter} alt="" />
              </a>
              <a href="#" className="text-blue-gray-700 dark:text-blue-gray-300 hover:text-amber-500 dark:hover:text-amber-400">
                <img src={github} alt="" />
              </a>
              <a href="#" className="text-blue-gray-700 dark:text-blue-gray-300 hover:text-amber-500 dark:hover:text-amber-400">
                <img src={linkedin} alt="" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8"> {/* MODIFIED: 4-column layout */}
            {links.map(({ title, icon, items }) => (
              <div key={title}>
                <Typography variant="h6" className="mb-4 flex items-center gap-2">
                  {icon}
                  {title}
                </Typography>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.href}
                        className="font-normal transition-colors hover:text-amber-500 dark:hover:text-amber-400"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-200 dark:border-blue-gray-800 pt-8 md:flex-row md:justify-between"> {/* MODIFIED: Better border */}
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-600 dark:text-blue-gray-400 md:mb-0"
          >
            &copy; {currentYear} Paw Haven. All rights reserved.
          </Typography>

          <div className="flex gap-6">
            <Typography
              as="a"
              href="/privacy"
              className="font-normal transition-colors hover:text-amber-500 dark:hover:text-amber-400"
            >
              Privacy Policy
            </Typography>
            <Typography
              as="a"
              href="/terms"
              className="font-normal transition-colors hover:text-amber-500 dark:hover:text-amber-400"
            >
              Terms of Service
            </Typography>
            <Typography
              as="a"
              href="/contact"
              className="font-normal transition-colors hover:text-amber-500 dark:hover:text-amber-400"
            >
              Contact Us
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;