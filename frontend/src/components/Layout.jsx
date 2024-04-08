import { AdminMenu, } from "../data/Data";
import "../styles/layout-styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successful");
    navigate("/login");
  };
  const UserMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    // {
    //   name: "Consult A Doctor",
    //   path: "/consultations",
    //   icon: "fa-solid fa-user-doctor",
    // },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list-ul",
    },
    {
      name: "Apply for Staff",
      path: "/apply-staff",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  const StaffMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/staff/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  const SideBarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isStaff
    ? StaffMenu
    : UserMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h1>cureit</h1>
              <hr />
            </div>
            <div className="menu">
              {SideBarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                  <Link to="/" className="fw-bold">
                    Hi, {user?.name}
                  </Link>
                
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: "105px", height: "80px" }}
                    alt="logo"
                    onClick={() => navigate("/")}
                  />
              
                <Badge
                  count={user && user.notification.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;
