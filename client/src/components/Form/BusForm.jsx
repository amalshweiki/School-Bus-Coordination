import useBusForm from "../../hooks/useSchoolForm";

import Input from "./Input";

const BusForm = ({ schoolId, btnText, onClose, onSubmit }) => {
  const { bus, loading, errors, handleChange, handleSubmit } =
    useBusForm(schoolId);

  const fields = [
    {
      id: 1,
      name: "drivername",
      inputName: "drivername",
      value: bus.drivername,
      type: "text",
      placeholder: "driver name",
      error: errors.drivername,
    },
    {
      id: 2,
      name: "contact",
      inputName: "contact",
      value: bus.contact,
      type: "text",
      placeholder: "Driver contact",
      error: errors.contact,
    },
    {
      id: 3,
      name: "pickupTimes",
      inputName: "pickupTimes",
      value: bus.pickupTimes,
      type: Array,
      error: errors.pickupTimes,
    },
    {
      id: 4,
      name: "dropoffTimes",
      inputName: "dropoffTimes",
      value: bus.dropoffTimes,
      type: Array,
      error: errors.dropoffTimes,
    },
    {
      id: 5,
      name: "loadingUnloadingStation",
      inputName: "loadingUnloadingStation",
      value: bus.loadingUnloadingStation,
      type: Array,
      error: errors.loadingUnloadingStation,
    },
    {
      id: 6,
      name: "schools",
      inputName: "schools",
      value: bus.schools,
      type: Array,
      error: errors.schools,
    },
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Input key={field.id} {...field} handleChange={handleChange} />
      ))}
      <button className="button-88 edite button-style" type="submit">
        {btnText}
      </button>
      <button className="button-88 delete button-style" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default BusForm;
