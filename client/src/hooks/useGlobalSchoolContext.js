import { useContext } from "react";
import { SchoolContext } from "../context/SchoolContext";

export const useGlobalSchoolContext = () => {
  return useContext(SchoolContext);
};
