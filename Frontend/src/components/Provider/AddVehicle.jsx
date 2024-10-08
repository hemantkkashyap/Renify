import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { PiMotorcycleFill } from "react-icons/pi";
import { PiCarProfile } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
const AddVehicle = () => {
  const { user, setMyVehicles, url } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData(); // Create a new FormData object
    formData.append("PID", user._id);

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]); // Add each image to formData
    }
    for (let key in data) {
      if (key !== "images") {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await axios.post(
        // `${url}/addvehicle`,
        `${url}/ADDVEHICLES`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Vehicle added successfully:", response.data.newVehicle); // object
      if (response?.data?.newVehicle) {
        setMyVehicles((prevList) => [...prevList, response.data.newVehicle]);
        navigate("/myvehicles");
      }

      toast.success("Vehicle added successfully");
    } catch (error) {
      if (error.response.data.res) toast.error(error.response.data.res);
      else toast.error("Error adding vehicle");
      console.error("Error adding vehicle:", error);
    }
  };

  const labelClass =
    "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  const inputClass =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const errorClass = "text-sm text-red-500 absolute right-0 top-3";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md dark:bg-slate-900 bg-gray-white outline-double dark:outline-none outline-gray-200  shadow-md rounded-xl  md:mx-auto m-2 md:my-5  my-10 p-5  "
    >
      <h1 className="text-xl font-semibold text-center border-b-4 pb-1 md:mx-32  mx-28 mb-3 border-blue-500 ">
        Add Vehicle
      </h1>

      {/* radio vehicle type */}
      <div className="mb-4 relative">
        <label>Vehicle Type</label>
        <div className=" my-2 flex flex-col gap-1 ">
          <div className="flex items-center  ">
            <input
              className="radio radio-error h-5 w-5"
              type="radio"
              value="car"
              id="car"
              {...register("type", { required: "Type is required" })}
            />
            <label
              className="mx-2 flex w-[70px] justify-between cursor-pointer"
              htmlFor="car"
            >
              Car
              <PiCarProfile className={`text-[28px] hover:text-orange-500`} />
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="radio radio-info h-5 w-5"
              type="radio"
              value="bike"
              id="bike"
              {...register("type", { required: "Type is required" })}
            />
            <label
              className="mx-2 flex w-[70px] justify-between cursor-pointer"
              htmlFor="bike"
            >
              Bike
              <PiMotorcycleFill className="text-[28px] hover:text-cyan-400" />
            </label>
          </div>
        </div>
        {errors.type && (
          <p className="text-sm text-red-500 absolute right-0 top-6 ">
            {errors.type.message}
          </p>
        )}
      </div>

      {/* brand */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("brand", { required: "Brand is required" })}
          className={inputClass}
          placeholder=" "
        />
        <label htmlFor="floating_email" className={labelClass}>
          Brand (Automobile Company)
        </label>
        {errors.brand && <p className={errorClass}>{errors.brand.message}</p>}
      </div>
      {/* Model */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("model", { required: "Model is required" })}
          type="text"
          className={inputClass}
          placeholder=" "
        />
        <label htmlFor="floating_password" className={labelClass}>
          Model
        </label>
        {errors.model && <p className={errorClass}>{errors.model.message}</p>}
      </div>
      {/* registration number */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("registrationNumber", {
            required: "Registration Number is required",
          })}
          type="text"
          id="floating_repeat_password"
          className={inputClass}
          placeholder=" "
        />
        <label htmlFor="floating_repeat_password" className={labelClass}>
          Registration No.
        </label>
        {errors.registrationNumber && (
          <p className={errorClass}>{errors.registrationNumber.message}</p>
        )}
      </div>
      {/* loacation */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("location", {
            required: "required",
          })}
          type="text"
          className={inputClass}
          placeholder=""
        />
        <label className={labelClass}>Location</label>
        {errors.location && (
          <p className={errorClass}>{errors.location.message}</p>
        )}
      </div>

      {/* rents */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("rentPerHour", {
              required: "required",
              min: {
                value: 50,
                message: "Value must be greater than 50",
              },
              max: {
                value: 5000,
                message: "Value must be less than 10,000",
              },
            })}
            type="number"
            min={50}
            max={5000}
            className={inputClass}
            placeholder=""
            required
          />

          <label className={labelClass}>Rent Per Hour</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("rentPerDay", {
              required: "required",
              min: {
                value: 200,
                message: "Value must be greater than 50",
              },
              max: {
                value: 10000,
                message: "Value must be less than 10,000",
              },
            })}
            type="number"
            min={200}
            max={10000}
            className={inputClass}
            placeholder=""
            required
          />
          <label className={labelClass}>Rent Per Day</label>
        </div>
      </div>

      <div className="relative flex flex-col  z-0 w-full mb-5 group">
        <span className="flex items-center gap-2">
          <IoImageOutline className="text-5xl " />
          <input
            {...register("images", {
              required: "At least one Images is required",
            })}
            type="file"
            multiple
            name="images"
            className="file-input file-input-bordered h-10 w-[270px] dark:bg-slate-800 bg-white file-input-info max-w-xs"
          />
        </span>

        {errors.images && (
          <p className="text-sm mx-1 text-rose-500 ">{errors.images.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`text-white w-full btn text-lg hover:ring-2 ring-white bg-blue-700 hover:bg-blue-600 border-none  px-5
          ${isSubmitting}`}
      >
        {isSubmitting ? (
          <CircularProgress color="inherit" thickness={5} size={25} />
        ) : (
          <>
            <span className="mx-2">ADD</span>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#30c9e8"
            ></lord-icon>
          </>
        )}
      </button>
    </form>
  );
};

export default AddVehicle;
