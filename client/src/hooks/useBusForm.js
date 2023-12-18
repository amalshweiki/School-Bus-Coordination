import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { busAPI } from "../api";
import { useGlobalBusContext } from "../hooks/useGlobalBusContext";

const useBusForm = (busId) => {
  const navigate = useNavigate();

  const [bus, setBus] = useState({
    drivername: "",
    contact: "",
    pickupTimes: "",
    dropoffTimes: "",
    loadingUnloadingStation: "",
    schools: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    contact: null,
    pickupTimes: null,
    dropoffTimes: null,
    loadingUnloadingStation: null,
    schools: null,
  });
  const [loading, setLoading] = useState(false);

  const { currentBus, addNewBus, editBus } = useGlobalBusContext();

  useEffect(() => {
    if (busId) {
      setLoading(true);
      const fetchBus = async () => {
        const busData = await busAPI.getBus(busId);
        setBus(busData.data);
        setLoading(false);
      };

      fetchBus();
    }
  }, [busId]);

  const handleChange = (e) => {
    setBus({
      ...bus,
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
    if (bus.drivername.length < 3) {
      newErrors.name = "name must be at least 3 characters long";
      isValid = false;
    }

    // Validation for 'contact'
    const contactRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!contactRegex.test(bus.contact)) {
      newErrors.contact = "Please use the format 111-111-111 for contact";
      isValid = false;
    }

    // Validation for 'pickupTimes'
    const pickupTimesRegex = /^([01]\d|2[0-3]):([0-5]\d)\s*(?:AM|PM)$/;
    if (!pickupTimesRegex.test(bus.pickupTimes)) {
      newErrors.pickupTimes =
        "Please provide a valid time format (HH:MM AM/PM) for pickup time";
      isValid = false;
    }

    // Validation for ' dropoffTimes'
    const dropoffTimesRegex = /^([01]\d|2[0-3]):([0-5]\d)\s*(?:AM|PM)$/;
    if (!dropoffTimesRegex.test(bus.dropoffTimes)) {
      newErrors.dropoffTimes =
        "Please provide a valid time format (HH:MM AM/PM) for Drop off Times ";
      isValid = false;
    }

    // Validation for 'loadingUnloadingStation'
    if (bus.loadingUnloadingStation.length < 6) {
      newErrors.loadingUnloadingStation =
        "Loading/Uploading Station must be at least 6 characters long";
      isValid = false;
    }
    // Validation for 'Schools'
    if (bus.schools.length < 6) {
      newErrors.schools = "Schools ID  must be at least 6 characters long";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      if (busId) {
        editBus(bus);
        navigate(`/bus/${busId}`);
      } else {
        const newBusId = await addNewBus(bus);
        navigate(`/bus/${newBusId}`);
      }
    }
  };

  return { bus, loading, errors, handleChange, handleSubmit };
};

export default useBusForm;
