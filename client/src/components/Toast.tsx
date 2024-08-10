import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
    ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-Dark shadow-xl text-green-400 font-bold max-w-md"
    : "fixed top-4 right-4 z-50 p-4 rounded-md bg-Dark text-red-500 shadow-xl font-bold max-w-md"

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-sm font-semibold sm:text-lg">{message}</span>
      </div>
    </div>
  );
};

export default Toast;