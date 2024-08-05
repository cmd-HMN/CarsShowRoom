import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";

const ShopSideBar = () => {
  const [notShow, setNotShow] = useState<boolean>(false);

  const { data: latest } = useQuery("getLatestCar", apiClient.getLatestCar);
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
      width: !notShow ? 150 : 70,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const contentVariants = {
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      className={`bg-Dark h-full flex flex-col items-center relative`}
      variants={sidebarVariants}
      initial="closed"
      animate={"open"}
    >
      <AnimatePresence>
        <motion.div
          className="w-full space-y-8 mt-8 sticky"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="text-lg font-extrabold text-orange-500 p-2 cursor-pointer text-center mt-10"
            whileHover={{ scale: 1.05 }}
          >
            Latest
          </motion.div>
          <div className="flex flex-col items-center gap-4">
            <motion.div className="space-y-6 flex flex-col justify-center items-center ">
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
                    animate={{
                      color: ["#ff0000", "#00ff00", "#0000ff"],
                      transition: {
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                    className=" text-xs cursor-pointer"
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
