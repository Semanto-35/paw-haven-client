import { Typography } from "@material-tailwind/react";
import facebook from '../../../assets/icons/facebook_2.png';
import instagram from '../../../assets/icons/instagram.png';
import linkedin from '../../../assets/icons/linkedin.png';
import github from '../../../assets/icons/github.png';
import twitter from '../../../assets/icons/twitter.png';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    {
      title: "Product",
      items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    {
      title: "Company",
      items: ["About us", "Careers", "Press", "News"],
    },
    {
      title: "Resource",
      items: ["Blog", "Newsletter", "Events", "Help center"],
    },
  ];


  return (
    <footer className="relative dark:bg-gray-900 dark:text-gray-100 w-full py-16">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6">
            Paw Haven
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4">
            {links.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color=""
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal  md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Paw Haven</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
              <img className="h-5 w-5" src={facebook} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
            <img className="h-5 w-5" src={instagram} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-90 transition-opacity hover:opacity-100">
            <img className="h-5 w-5" src={twitter} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
            <img className="h-5 w-5" src={github} alt="" />
            </Typography>
            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
            <img className="h-5 w-5" src={linkedin} alt="" />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;