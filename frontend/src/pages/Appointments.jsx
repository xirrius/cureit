import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import "../styles/main-styles.css";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointment", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
        title: "ID",
        dataIndex: '_id'
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => {
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>;
    //   },
    // },
    
    // {
    //   title: "Contact No.",
    //   dataIndex: "phone",
    //   render: (text, record) => {
    //     <span>{record.doctorId.phone}</span>;
    //   },
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1 className="text-center heading">Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};
export default Appointments;
