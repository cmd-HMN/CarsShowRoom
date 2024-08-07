import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { LiaPhoneSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";

type Props = {
  optionOne: boolean | false;
  optionTwo: boolean | false;
  optionThree: boolean | false;
  optionFour: boolean | false;
  optionFive: boolean | false;
  head: string | "Carz";
};

const SideBar = ({
  optionOne,
  optionTwo,
  optionThree,
  optionFour,
  optionFive,
  head,
}: Props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [notShow, setNotShow] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      width: 200,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      width: 40,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      ref={sidebarRef}
      className={`bg-Dark min-h-screen flex flex-col items-center relative`}
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      onMouseEnter={openSidebar}
      onMouseLeave={closeSidebar}
      onClick={() => {
        if (isOpen && !notShow) {
          closeSidebar();
        }
      }}
    >
      <motion.button
        className={`absolute top-1/2 -translate-y-1/2 opacity-20 hover:opacity-100 ${
          isOpen ? "right-0 translate-x-1/2" : "left-1/2 -translate-x-1/2"
        } 
                    text-[12px] sm:text-lg bg-orange-500 text-white p-2 rounded-full z-10`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
      >
        {isOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full space-y-8 mt-16 sticky"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="text-lg font-extrabold text-orange-500 p-2 cursor-pointer text-center"
              whileHover={{ scale: 1.05 }}
            >
              {head}
            </motion.div>
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className={`flex ${
                  optionOne && "bg-orange-500"
                } p-2 w-full h-10 items-center justify-center`}
                onClick={() => navigate("/profile")}
                animate={{ width: ["#ff6699", "#66ccff", "#ffcc66"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="relative group"
                >
                  <CiUser
                    className={`${
                      optionOne ? "text-white" : "text-orange-500"
                    } w-6 h-6 cursor-pointer`}
                  />
                  {!notShow && (
                    <motion.div
                      className="absolute left-full ml-2 top-0 bg-black hover:z-30 text-white px-2 py-1 rounded shadow-2xl whitespace-nowrap invisible group-hover:visible  text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Profile
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className={`flex ${
                  optionTwo && "bg-orange-500"
                }  p-2 w-full h-10 items-center justify-center relative group`}
                onClick={() => navigate("/favorite")}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="relative group"
                >
                  <CiHeart
                    className={`${
                      optionTwo ? "text-white" : "text-orange-500"
                    } w-6 h-6`}
                  />
                  {!notShow && (
                    <motion.div
                      className="absolute left-full ml-2 top-0 bg-black hover:z-30 text-white px-2 py-1 rounded shadow-2xl whitespace-nowrap invisible group-hover:visible  text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Favorites
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className={`flex ${
                  optionThree && "bg-orange-500"
                }  p-2 w-full h-10 items-center justify-center`}
                onClick={() => navigate("/cart")}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="relative group"
                >
                  <CiShoppingCart
                    className={`${
                      optionThree ? "text-white" : "text-orange-500"
                    } w-6 h-6`}
                  />
                  {!notShow && (
                    <motion.div
                      className="absolute left-full ml-2 top-0 bg-black hover:z-30 text-white px-2 py-1 rounded shadow-2xl whitespace-nowrap invisible group-hover:visible  text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Cart
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className={`flex ${
                  optionFour && "bg-orange-500"
                }  p-2 w-full h-10 items-center justify-center`}
                onClick={() => navigate("/contact-us")}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="relative group"
                >
                  <LiaPhoneSolid
                    className={`${
                      optionFour ? "text-white" : "text-orange-500"
                    } w-6 h-6  z-20`}
                  />
                  {!notShow && (
                    <motion.div
                      className="absolute left-full ml-2 top-0 bg-black hover:z-30 text-white px-1 py-2 rounded shadow-2xl whitespace-nowrap invisible group-hover:visible text-sm z-20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Contact us
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className={`flex ${
                  optionFive && "bg-orange-500"
                }  p-2 w-full h-10 items-center justify-center`}
                onClick={() => navigate("/sign-out")}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="relative group"
                >
                  <FiLogOut
                    className={`${
                      optionFive ? "text-white" : "text-orange-500"
                    } w-6 h-6  `}
                  />
                  {!notShow && (
                    <motion.div
                      className="absolute left-full ml-2 top-0 bg-black text-white px-1 py-2 rounded shadow-2xl whitespace-nowrap invisible group-hover:visible hover:z-30 text-sm z-20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Sign out
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SideBar;
