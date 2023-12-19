import { createContext, useState, useEffect, useCallback } from "react";

import { schoolAPI } from "../api";

import { showToast } from "../utils";

export const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [currentSchool, setCurrentSchool] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchools = async () => {
    setIsLoading(true);
    try {
      const response = await schoolAPI.getAllSchools();
      setSchools(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSchool = useCallback(async (schoolId) => {
    setIsLoading(true);
    try {
      const response = await schoolAPI.getSchool(schoolId);
      setCurrentSchool(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchools();
  }, []);

  const addNewSchool = async (school) => {
    setIsLoading(true);
    try {
      const response = await schoolAPI.addSchool(school);
      handleSuccess("School added successfully");
      return response.data.id;
    } catch (err) {
      showToast("An error occurred while adding the School", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const editSchool = async (school) => {
    setIsLoading(true);
    try {
      await schoolAPI.updateSchool(school, school._id);
      handleSuccess("School updated successfully");
    } catch (err) {
      showToast("An error occurred while updating the School", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const removeSchool = async (_id) => {
    setIsLoading(true);
    try {
      await schoolAPI.deleteSchool(_id);
      handleSuccess("School deleted successfully");
    } catch (err) {
      showToast("An error occurred while deleting the School", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchSchools();
    showToast(message);
  };

  return (
    <SchoolContext.Provider
      value={{
        schools,
        currentSchool,
        isLoading,
        fetchSchool,
        addNewSchool,
        editSchool,
        removeSchool,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
