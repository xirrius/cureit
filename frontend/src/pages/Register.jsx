import { Form, Input, message } from "antd";
import "../styles/register-styles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values)
      dispatch(hideLoading());
      if(res.data.success) {
        message.success('Registered successfully.')
        navigate('/login')
      } else {
        message.error(res.data.message)
      }
    } catch(err) {
      dispatch(hideLoading());
      console.log(err)
      message.error(`Something went wrong.`)
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
          </Form.Item>
          <Link to="/login" className="m-2">Have an account? Login here.</Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};
export default Register;
