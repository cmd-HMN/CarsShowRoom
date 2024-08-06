import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";

const ShopSideBar = () => {
  const [notShow, setNotShow] = useState<boolean>(false);

  const { data: latest } = useQuery("getLatestCar", apiClient.getLatestCar);

  const {data: featured} = useQuery('featuredProduct', apiClient.featuredProduct)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setNotShow(true);
      } else {
        setNotShow(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const sidebarVariants = {
    open: {
      width: !notShow ? 200 : 70,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const contentVariants = {
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      className={`bg-Dark min-h-screen flex flex-col items-center relative`}
      variants={sidebarVariants}
      initial="closed"
      animate={"open"}
    >
      <AnimatePresence>
        <motion.div
          className="w-full mt-8 sticky"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <hr className="border-1 border-orange-500 w-full  mt-10" />
          <motion.div
            className="text-sm sm:text-lg font-extrabold text-orange-500 p-2 cursor-pointer text-center"
            whileHover={{ scale: 1.05 }}
          >
            Latest
          </motion.div>
          <div className="flex flex-col items-center">
            <hr className="border-1 mb-2 border-orange-500 w-full" />
            <motion.div className="space-y-2 flex flex-col justify-start">
              {latest &&
                latest.map((car ,index) => (
                <Link to={'/view-details'} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    key={car._id}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    className=" text-[8px] cursor-pointer text-white sm:text-xs"
                  >
                    {car.model}
                  </motion.div>
                </Link>
                ))}
            </motion.div>
            </div>
          <hr className="border-1 border-orange-500 w-full  mt-10" />
          <motion.div
            className="text-sm sm:text-lg font-extrabold text-orange-500 p-2 cursor-pointer text-center"
            whileHover={{ scale: 1.05 }}
          >
            Featured
          </motion.div>
          <div className="flex flex-col items-center">
            <hr className="border-1 mb-2 border-orange-500 w-full" />
            <motion.div className="space-y-2 flex flex-col justify-start p-1 sm:p-0 sm:ml-4">
              {featured &&
                featured.map((car ,index) => (
                <Link to={'/view-details'} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    key={car._id}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    className=" text-[8px] cursor-pointer text-white sm:text-xs"
                  >
                    {car.model}
                  </motion.div>
                </Link>
                ))}
            </motion.div>
            </div>
        </motion.div>
         
      </AnimatePresence>
    </motion.div>
  );
};

export default ShopSideBar;
