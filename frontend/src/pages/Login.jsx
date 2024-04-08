import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/register-styles.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/login-styles.css";
import { useState } from "react";

const Login = () => {
  // TEST STYLE CODE HERE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // TEST STYLE CODE HERE

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async () => {
    if( !email || !password) {
      message.error("Please fill in all details.")
      return
    }
    const values = { email, password };
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successful.");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error(`Something went wrong.`);
      navigate("/login")
    }
  };
  return (
    // /* <div className="form-container">
    //   <Form
    //     layout="vertical"
    //     onFinish={onFinishHandler}
    //     className="register-form"
    //   >
    //     <h1 className="text-center">Login Form</h1>
    //     <Form.Item label="Email" name="email">
    //       <Input type="email" required></Input>
    //     </Form.Item>
    //     <Form.Item label="Password" name="password">
    //       <Input type="password" required></Input>
    //     </Form.Item>
    //     <Link to="/register" className="m-2">
    //       New to cureit? Signup here.
    //     </Link>
    //     <button className="btn btn-primary" type="submit">
    //       Login
    //     </button>
    //   </Form>
    // </div> */

    // TEST STYLE CODE HERE

    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "white" }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The CUREIT Team</h4>
                    </div>
                    <form>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Phone number or email address"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1 d-grid">
                        <Button
                          className=" gradient-custom-2"
                          style={{ color: "white" }}
                          type="button"
                          onClick={onFinishHandler}
                        >
                          LOG IN
                        </Button>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/register" className="btn btn-outline-danger">
                          Create new
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    // TEST STYLE CODE HERE
  );
};
export default Login;
