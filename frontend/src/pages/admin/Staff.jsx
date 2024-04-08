import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { message, Table } from "antd";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const getStaff = async () => {
    try {
      // dispatch(showLoading());
      const res = await axios.get("/api/v1/admin/get-all-staff", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // dispatch(hideLoading());
      if (res.data.success) {
        setStaff(res.data.data);
        message.success(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/change-status",
        { staffId: record._id, userId: record.userId, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getStaff();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Contact No.",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status !== "approved" &&
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, "approved")}
            >
              Approve
            </button>
          }
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleStatus(record, "rejected")}
            >
              Reject
            </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Staff</h1>
      <Table columns={columns} dataSource={staff} />
    </Layout>
  );
};
export default Staff;
