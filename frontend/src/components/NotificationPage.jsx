import Layout from "./Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main-styles.css"

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong.");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong.");
    }
  };
  return (
    <Layout>
      <h1 className="p-3 text-center heading">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-warning rounded-3 me-3"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark All Read
            </button>
          </div>
          {user?.notification.map((notificationMsg) => (
            // eslint-disable-next-line react/jsx-key
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger rounded-3 me-3" 
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </button>
          </div>
          {user?.seenNotification.map((notificationMsg) => (
            // eslint-disable-next-line react/jsx-key
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};
export default NotificationPage;
