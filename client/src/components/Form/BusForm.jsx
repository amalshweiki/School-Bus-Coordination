import useBusForm from "../../hooks/useBusForm";

import Input from "./Input";

const BusForm = ({ buslId, btnText, onClose, onSubmit }) => {
  const { bus, loading, errors, handleChange, handleSubmit } =
    useBusForm(buslId);

  const fields = [
    {
      id: 1,
      name: "Driver Name",
      inputName: "drivername",
      value: bus.drivername,
      type: "text",

      error: errors.drivername,
    },
    {
      id: 2,
      name: "contact",
      inputName: "contact",
      value: bus.contact,
      type: "text",

      error: errors.contact,
    },
    {
      id: 3,
      name: "Pickup Times",
      inputName: "pickupTimes",
      value: bus.pickupTimes,
      type: Array,
      error: errors.pickupTimes,
    },
    {
      id: 4,
      name: "Drop off Times",
      inputName: "dropoffTimes",
      value: bus.dropoffTimes,
      type: Array,
      error: errors.dropoffTimes,
    },
    {
      id: 5,
      name: "loading/Unloading Station",
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
