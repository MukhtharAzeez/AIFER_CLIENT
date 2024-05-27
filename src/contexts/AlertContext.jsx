import { createContext, useContext, useState } from "react";
import { mdiAlertOutline, mdiSkullCrossbones } from "@mdi/js";

const SharedStoreContext = createContext();

export const useSharedStore = () => useContext(SharedStoreContext);

export const SharedStoreProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    icon: "",
    title: null,
    message: "",
    promise: null,
  });
  const [error, setError] = useState(null);

  const showAlert = (payload) => {
    const newAlert = {
      title: payload?.title || "Warning !",
      icon:
        payload?.title === "Warning !"
          ? mdiAlertOutline
          : payload?.title === "Danger !"
          ? mdiSkullCrossbones
          : payload?.icon,
      bg:
        payload?.title === "Warning !"
          ? "bg-yellow-50"
          : payload?.title === "Danger !"
          ? "bg-red-50"
          : payload?.bg,
      buttonBg: `${
        payload?.title === "Warning !"
          ? "bg-yellow-500"
          : payload?.title === "Danger !"
          ? "bg-red-500"
          : payload?.buttonBg
      } hover:${
        payload?.title === "Warning !"
          ? "bg-yellow-50"
          : payload?.title === "Danger !"
          ? "bg-red-50"
          : payload?.bg
      }`,
      color:
        payload?.title === "Warning !"
          ? "text-yellow-500"
          : payload?.title === "Danger !"
          ? "text-red-500"
          : payload?.color,
      message: payload?.message || null,
    };
    newAlert.promise = new Promise((resolve, reject) => {
      newAlert.resolve = resolve;
      newAlert.reject = reject;
    });
    setAlert(newAlert);
    return newAlert.promise;
  };

  const emptyAlert = () => {
    setAlert({
      icon: "",
      title: null,
      message: "",
      promise: null,
    });
  };

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  const showError = (message) => {
    setError(message || "Make sure you filled all the required fields");
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <SharedStoreContext.Provider
      value={{
        showAlert,
        alert,
        emptyAlert,
        isLoading,
        toggleLoading,
        setIsLoading,
        error,
        showError,
        setError,
      }}
    >
      {children}
    </SharedStoreContext.Provider>
  );
};
