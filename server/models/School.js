import mongoose from "mongoose";

const schoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add Name "],
    },

    location: {
      type: String,
      required: [true, "please add Location "],
    },

    contact: {
      type: String,
      required: [true, "please add Contact "],
      match: [/^\d{3}-\d{3}-\d{3}$/, "Please use the format 111-111-111"],
    },

    busServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bus",
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("school", schoolSchema);
