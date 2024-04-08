import Layout from "../components/Layout";
import { Form, Row, Col, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import "../styles/main-styles.css";

// import moment from "moment";

const ApplyStaff = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      console.log(values);
      dispatch(showLoading());
      const startTime = values.timings[0].format("HH:mm");
      const endTime = values.timings[1].format("HH:mm");
      const res = await axios.post(
        "/api/v1/user/apply-staff",
        {
          ...values,
          userId: user._id,
          timings: [startTime, endTime],
          // timings: [
          //   moment(values.timings[0]).format("HH:mm"),
          //   moment(values.timings[1]).format("HH:mm"),
          // ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Application successful");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="text-center heading">Apply For Staff</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
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
          </Col>
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
          <Col xs={24} md={24} lg={8}>
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
          </Col>
        </Row>
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
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
        </Row>
        <div className="d-flex justify-content-start">
          <button
            className="btn text-white gradient-custom-2 form-btn"
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};
export default ApplyStaff;
