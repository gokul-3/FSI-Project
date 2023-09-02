import React from "react";
import FirstCard from "./cards/CountCard";
import TierCard from "./cards/ListCard";

const SuperAdminDashboard = () => {
  return (
    <>
      <h3 style={{marginBottom:'5vw'}}>Hello Super Admin</h3>
      <div style={{display:'flex',flexDirection:'row',justifyContent:"space-around",flexWrap:'wrap'}}>
        <FirstCard />
        <TierCard title="Most" />
        <TierCard title="Least" />
      </div>
    </>
  );
};

export default SuperAdminDashboard;
