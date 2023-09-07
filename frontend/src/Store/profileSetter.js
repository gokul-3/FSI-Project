import axios from "../axios";
import store from ".";
import { profileActions } from "./profile-slice";
import { superAdminActions } from "./superAdmin-slice";
import { customerAdminActions } from "./customerAdmin-slice";
export const setProfileInfo = (profileInfo) => {
  console.log("hello");
  store.dispatch(
    profileActions.setProfileInfo({
      userRole: profileInfo.role,
      name: profileInfo.name,
      email: profileInfo.email,
      userId: profileInfo.id,
      customerId: profileInfo.customerId,
    })
  );
  const { dashboardData } = profileInfo;
  console.log(profileInfo);
  if (profileInfo.role === "superAdmin") {
    store.dispatch(
      superAdminActions.setSuperAdminDashboardData({
        customerCount: dashboardData.customerCount,
        activeStatus: dashboardData.activeStatus,
        mostUsers: dashboardData.mostUsers,
        leastUsers: dashboardData.leastUsers,
      })
    );
  } else if (profileInfo.role === "customerAdmin") {
    store.dispatch(
      customerAdminActions.setCustomerDashboardData({
        userCount: dashboardData.userCount,
        activeUsers: dashboardData.activeUsers,
        newUsers: dashboardData.newUsers,
      })
    );
  }
};
