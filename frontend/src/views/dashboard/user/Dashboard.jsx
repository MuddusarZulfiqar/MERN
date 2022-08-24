import React, { useEffect, useState } from "react";
import BasePageTitle from "../../../components/base/BasePageTitle";
import UserHeader from "../../../components/views/dashboard/user/UserHeader";
import UserNavigation from "../../../components/views/dashboard/user/UserNavigation";
import { useSelector } from "react-redux";
function Dashboard({ children }) {
  const pageDetail = {
    background: "bg-parallax1.jpg",
    title: "Welcome Back!",
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
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-4">
                {user?.name && <UserHeader user={userData} />}
                <div className="user-nav mt-5">
                  <UserNavigation />
                </div>
              </div>
              <div className="col-md-8 pt-5" style={{display:'flex',flexDirection:'column','justifyContent':'center'}}>{children}</div>
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
