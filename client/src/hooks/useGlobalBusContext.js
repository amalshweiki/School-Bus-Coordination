import { useContext } from "react";
import { BusContext } from "../context/BusContext";

export const useGlobalBusContext = () => {
  return useContext(BusContext);
};
