import React from "react";
import ListCard from "../Cards/ListCard";
import CountCard from "../Cards/CountCard";
const CustomerAdminDashboard = () => {
  return (
    <>
      <h3>Hello CustomerAdmin</h3>
      <div style={{ display: "flex",justifyContent:'space-evenly' }}>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center',minWidth: 450 }}>          
            <CountCard />
        </div>
        <div style={{ minWidth: 450 }}>
          <ListCard />
        </div>
      </div>
    </>
  );
};

export default CustomerAdminDashboard;
