import store from ".";
import { profileActions } from "./profile-slice";
import { superAdminActions } from "./superAdmin-slice";
import { customerAdminActions } from "./customerAdmin-slice";
export const setProfileInfo = (profileInfo) => {
  store.dispatch(
    profileActions.setProfileInfo({
      userRole: profileInfo.role,
      name: profileInfo.name,
      email: profileInfo.email,
      userId: profileInfo.id,
      customerId: profileInfo.customerId,
    })
  );
};
