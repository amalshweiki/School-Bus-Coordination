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

  useEffect(() => {
    if (schoolId) {
      setLoading(true);
      const fetchSchool = async () => {
        const schoolData = await schoolAPI.getSchool(schoolId);
        setSchool(schoolData.data);
        setLoading(false);
      };

      fetchSchool();
    }
  }, [schoolId]);

  const handleChange = (e) => {
    setSchool({
      ...school,
      [e.target.name]: e.target.value,
    });
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    // Validation for 'name'
    if (school.name.length < 3) {
      newErrors.name = "name must be at least 3 characters long";
      isValid = false;
    }

    // Validation for 'location'
    if (school.location.length < 3) {
      newErrors.location = "location must be at least 3 characters long";
      isValid = false;
    }

    // Validation for 'contact'
    const contactRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!contactRegex.test(school.contact)) {
      newErrors.contact = "Please use the format 111-111-111 for contact";
      isValid = false;
    }

    // Validation for ' busServices'
    // if (school.busServices.length < 6) {
    //   newErrors.busServices =
    //     "Bus Service ID must be at least 6 characters long";
    //   isValid = false;
    // }

    setErrors(newErrors);

    if (isValid) {
      if (schoolId) {
        editSchool(school);
        navigate(`/schools`);
      } else {
        const newSchoolId = await addNewSchool(school);
        navigate(`/schools`);
      }
    }
  };

  return { school, loading, errors, handleChange, handleSubmit };
};

export default useSchoolForm;
