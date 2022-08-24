import React, { useEffect, useState } from "react";
import BasePageTitle from "../../../components/base/BasePageTitle";
import AdminHeader from "../../../components/views/dashboard/admin/AdminHeader";
import AdminNavigation from "../../../components/views/dashboard/admin/AdminNavigation";
import { useSelector } from "react-redux";
function Dashboard({ children }) {
  const pageDetail = {
    background: "bg-parallax1.jpg",
    title: "Welcome Back Admin!",
    breadCrumb: "Profile",
  };
  const { user } = useSelector((state) => state.user);
  const [userData, setUser] = useState(user);

  useEffect(()=>{
    // set User
    setUser(user);
  },[user]);
  
  return (
    <>
      {userData ? (
        <>
          <BasePageTitle detail={pageDetail} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                {user?.name && <AdminHeader user={userData} />}
                <div className="user-nav mt-5">
                  <AdminNavigation />
                </div>
              </div>
              <div className="col-md-10 pt-5" style={{display:'flex',flexDirection:'column','justifyContent':'center'}}>{children}</div>
            </div>
          </div>
        </>
      ) : (
        <div id="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
