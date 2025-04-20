import { useSelector } from "react-redux";
import DefaultAppLayout from "../layout/DefaultAppLayout";
import { userSelectors } from "../store/user/user.selectors";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes.constants";
import { UserApproveStatusEnum } from "../enums/User/userApproveStatus.enum";

export const ProtectedRouter = () => {
  const currentUser = useSelector(userSelectors.currentUser());

  if (
    !currentUser ||
    !currentUser.verified ||
    currentUser.approveStatus !== UserApproveStatusEnum.APPROVED
  ) {
    return <Navigate to={ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME} />;
  }

  return (
    <>
      <DefaultAppLayout />
    </>
  );
};
