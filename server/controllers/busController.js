import Bus from "../models/Bus.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc      Get all buses
// @route     GET /api/v1/buses
// @access    Public
export const getBuses = asyncHandler(async (req, res, next) => {
  const buses = await Bus.find();

  return res.status(200).json(buses);
});

// @desc      Get single bus
// @route     GET /api/v1/buses/:id
// @access    Public
export const getBus = asyncHandler(async (req, res, next) => {
  const bus = await Bus.findById(req.params.id);

  if (!bus) {
    return next(
      new ErrorResponse(
        `Bus that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  res.status(200).json(bus);
});

// @desc      Add a bus
// @route     POST /api/v1/buses
// @access    Private
export const addBus = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with ID that ends with '${req.user.id.slice(
          -6
        )}' is not authorized to add a Bus`,
        401
      )
    );
  }

  const bus = await Bus.create(req.body);

  res.status(200).json(bus);
});

// @desc      Update a bus
// @route     PUT /api/v1/buses/:id
// @access    Private
export const updateBus = asyncHandler(async (req, res, next) => {
  let bus = await Bus.findById(req.params.id);

  if (!bus) {
    return next(
      new ErrorResponse(
        `Bus that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with ID that ends with '${req.user.id.slice(
          -6
        )}' is not authorized to update this Bus`,
        401
      )
    );
  }

  bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(bus);
});

// @desc      Delete a bus
// @route     Delete /api/v1/buses/:id
// @access    Private
export const deleteBus = asyncHandler(async (req, res, next) => {
  const bus = await Bus.findById(req.params.id);

  if (!bus) {
    return next(
      new ErrorResponse(
        `Bus that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with ID that ends with '${req.user.id.slice(
          -6
        )}' is not authorized to delete this Bus`,
        401
      )
    );
  }

  await bus.deleteOne();

  res.status(200).json({});
});
