import React from "react";
import FirstCard from './cards/CountCard';
import TierCard from './cards/ListCard';

const SuperAdminDashboard = () => {
  return (
    <>
      <h3>Hello Super Admin</h3>
      <FirstCard/>
      <TierCard title="Most"/>
      <TierCard title="Least"/>
    </>
  );
};

export default SuperAdminDashboard;
