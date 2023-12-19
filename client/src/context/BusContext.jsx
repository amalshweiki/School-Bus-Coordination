import { createContext, useState, useEffect, useCallback } from "react";

import { busAPI } from "../api";

import { showToast } from "../utils";

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState([]);
  const [currentBus, setCurrentBus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchBuses = async () => {
    setIsLoading(true);
    try {
      const response = await busAPI.getAllBuses();
      setBuses(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBus = useCallback(async (busId) => {
    setIsLoading(true);
    try {
      const response = await busAPI.getBus(busId);
      setCurrentBus(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBuses();
  }, []);

  const addNewBus = async (bus) => {
    setIsLoading(true);
    try {
      const response = await busAPI.addBus(bus);
      handleSuccess("Bus added successfully");
      return response.data.id;
    } catch (err) {
      showToast("An error occurred while adding the Bus", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const editBus = async (bus) => {
    setIsLoading(true);
    try {
      await busAPI.updateBus(bus, bus._id);
      handleSuccess("Bus updated successfully");
    } catch (err) {
      showToast("An error occurred while updating the Bus", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const removeBus = async (_id) => {
    setIsLoading(true);
    try {
      await busAPI.deleteBus(_id);
      handleSuccess("Bus deleted successfully");
    } catch (err) {
      showToast("An error occurred while deleting the Bus", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchBuses();
    showToast(message);
  };

  return (
    <BusContext.Provider
      value={{
        buses,
        currentBus,
        isLoading,
        fetchBus,
        addNewBus,
        editBus,
        removeBus,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};
