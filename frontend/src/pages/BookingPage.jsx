import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import "../styles/main-styles.css";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/get-doctor",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/check-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center heading">Booking Page</h1>
      <div className="container">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h6>Fee: {doctor.fees}</h6>
            <h6>
              Time Slot: {doctor.timings && doctor.timings[0]} -{" "}
              {doctor.timings && doctor.timings[1]}{" "}
            </h6>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  // setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  // setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-outline-danger mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              {/* {!isAvailable && ( */}
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
              {/* )} */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default BookingPage;
