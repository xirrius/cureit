import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [endUser, setEndUser] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const updatedValues = {
        ...values,
        userId: user._id,
      };
      console.log(updatedValues);
      const res = await axios.post(
        "/api/v1/user/update-user",
        updatedValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        // console.log(res.data.data)
        message.success("Successfully updated.");
        navigate("/");
        window.location.reload()
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const getUser = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setEndUser(res.data.data);
        // message.success("User data fetched");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <h1>Manage Profile</h1>
      {endUser && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...endUser,
            // timings: [
            //   moment(staff.timings[0], "HH:mm"),
            //   moment(staff.timings[1], "HH:mm"),
            // ],
          }}
        >
          <h4 className="">Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Name" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Contact No."
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Contact No." />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email Id"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Email Id" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website URL"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Website URL" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="address" />
              </Form.Item>
            </Col> */}
          {/* </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fee Per Consultation"
                name="fees"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Fee per Consultation" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Time Slot" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={24} lg={8}></Col>
          </Row>
          <div className="d-flex justify-content-start">
            <button className="btn btn-primary form-btn" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};
export default Profile;
