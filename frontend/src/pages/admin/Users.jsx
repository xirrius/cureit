import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      // dispatch(showLoading());
      const res = await axios.get("/api/v1/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // dispatch(hideLoading());
      if (res.data.success) {
        setUsers(res.data.data);
        message.success(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const handleBlock = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/block-user",
        { personId: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Staff",
      dataIndex: "isStaff",
      render: (text, record) => 
        <span>{record.isStaff ? "Yes" : "No"}</span>
  
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger" 
          onClick={() => handleBlock(record)}
          >Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};
export default Users;
