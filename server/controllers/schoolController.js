import School from "../models/School.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc      Get all schools
// @route     GET /api/v1/schools
// @access    Public
export const getSchools = asyncHandler(async (req, res, next) => {
  const schools = await School.find();

  return res.status(200).json(schools);
});

// @desc      Get single school
// @route     GET /api/v1/schools/:id
// @access    Public
export const getSchool = asyncHandler(async (req, res, next) => {
  const school = await School.findById(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(
        `School that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  res.status(200).json(school);
});

// @desc      Add a school
// @route     POST /api/v1/schools
// @access    Private
export const addSchool = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with ID that ends with '${req.user.id.slice(
          -6
        )}' is not authorized to add a school`,
        401
      )
    );
  }

  const school = await School.create(req.body);

  res.status(200).json(school);
});

// @desc      Update a school
// @route     PUT /api/v1/schools/:id
// @access    Private
export const updateSchool = asyncHandler(async (req, res, next) => {
  let school = await School.findById(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(
        `School that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with ID that ends with '${req.user.id.slice(
          -6
        )}' is not authorized to update this School`,
        401
      )
    );
  }

  school = await School.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(school);
});

// @desc      Delete a school
// @route     Delete /api/v1/schools/:id
// @access    Private
export const deleteSchool = asyncHandler(async (req, res, next) => {
  const school = await School.findById(req.params.id);

  if (!school) {
    return next(
      new ErrorResponse(
        `School that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with ID that ends with '${req.user.id.slice(
          -6
        )}' is not authorized to delete this school`,
        401
      )
    );
  }

  await school.deleteOne();

  res.status(200).json({});
});
