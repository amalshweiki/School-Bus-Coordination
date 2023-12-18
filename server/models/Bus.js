import mongoose from "mongoose";

const busSchema = mongoose.Schema(
  {
    drivername: {
      type: String,
      required: [true, "Please add Name"],
    },

    contact: {
      type: String,
      required: [true, "please add Contact "],
    },
    pickupTimes: {
      type: [String],
      validate: [
        {
          validator: function (value) {
            // Custom validation for time format (HH:MM AM/PM) for each element in the array
            return value.every((time) =>
              /^([01]\d|2[0-3]):([0-5]\d)\s*(?:AM|PM)$/i.test(time)
            );
          },
          message:
            "Please provide a valid time format (HH:MM AM/PM) for each pickup time",
        },
      ],
      required: [true, "Please add pickup Times"],
    },
    dropoffTimes: {
      type: [String],
      validate: [
        {
          validator: function (value) {
            // Custom validation for time format (HH:MM AM/PM) for each element in the array
            return value.every((time) =>
              /^([01]\d|2[0-3]):([0-5]\d)\s*(?:AM|PM)$/i.test(time)
            );
          },
          message:
            "Please provide a valid time format (HH:MM AM/PM) for each dropoff time",
        },
      ],
      required: [true, "Please add dropoffTimes"],
    },
    loadingUnloadingStation: {
      type: [String],
      required: [true, "Please add loading / Unloading Station"],
    },
    schools: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("bus", busSchema);
