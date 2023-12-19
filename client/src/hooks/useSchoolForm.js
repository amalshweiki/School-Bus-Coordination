import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { schoolAPI } from "../api";
import { useGlobalSchoolContext } from "../hooks/useGlobalSchoolContext";

const useSchoolForm = (schoolId) => {
  const navigate = useNavigate();
  const [school, setSchool] = useState({
    name: "",
    location: "",
    contact: "",
    busServices: [],
  });
  const [errors, setErrors] = useState({
    name: null,
    location: null,
    contact: null,
    busServices: null,
  });
  const [loading, setLoading] = useState(false);
  const { currentSchool, addNewSchool, editSchool } = useGlobalSchoolContext();
  // Convert busServices back to array from string if necessary before sending
  const formattedSchool = {
    ...school,
    busServices: Array.isArray(school.busServices)
      ? school.busServices
      : school.busServices.split(",").map((v) => v.trim()),
  };
  useEffect(() => {
    if (schoolId) {
      setLoading(true);
      const fetchSchool = async () => {
        const schoolData = await schoolAPI.getSchool(schoolId);
        setSchool({
          ...schoolData.data,
          busServices: schoolData.data.busServices.join(", "), // Convert array to string
        });
        setLoading(false);
      };
      fetchSchool();
    }
  }, [schoolId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "busServices" ? value.split(",").map((v) => v.trim()) : value;
    setSchool({
      ...school,
      [name]: updatedValue,
    });
    setErrors((prevState) => ({
      ...prevState,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};
    // Validation here...

    // Convert busServices back to array from string if necessary before sending
    const formattedSchool = {
      ...school,
      busServices:
        typeof school.busServices === "string"
          ? school.busServices.split(",").map((v) => v.trim())
          : school.busServices,
    };

    setErrors(newErrors);
    if (isValid) {
      setLoading(true);
      if (schoolId) {
        await editSchool(formattedSchool);
        navigate(`/schools`);
      } else {
        await addNewSchool(formattedSchool);
        navigate(`/schools`);
      }
      setLoading(false);
    }
  };

  return { school, loading, errors, handleChange, handleSubmit };
};

export default useSchoolForm;
