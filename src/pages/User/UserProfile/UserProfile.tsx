import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../store/user/user.selectors";
import { DUMMY_USER_URL } from "../../../constants/image.constants";
import { ROUTES } from "../../../constants/routes.constants";
import { FaEdit } from "react-icons/fa";
import { userUtilService } from "../../../utils/user.utils";
import { UserModel } from "../../../types/entities/user.type";

export const UserProfile = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;

  return (
    <div className="body-wrapper space-pb--120">
      {/* profile header */}
      <div className="profile-header-area space-pt--30 space-mb--40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="profile-header">
                <div className="profile-header__image">
                  <img
                    src={currentUser?.imgUrl?.url || DUMMY_USER_URL}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="profile-header__content space-mt--10">
                  <h3 className="name space-mb--15">{currentUser.fullname}</h3>
                  <div className="profile-info space-mb--10">
                    <div className="profile-info-block">
                      <div className="profile-info-block__value">
                        {currentUser.username}
                      </div>
                      <div className="profile-info-block__title">Username</div>
                    </div>
                    <div className="profile-info-block">
                      <div className="profile-info-block__value">
                        {`${currentUser.credits}`}
                      </div>
                      <div className="profile-info-block__title">Credits</div>
                    </div>
                  </div>
                  <div className="profile-level">
                    <div className="profile-level__title">{`Level 30`}</div>
                    <div className="profile-level__progress progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${50}%`,
                        }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* profile body */}
      <div className="profile-body-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="profile-body">
                <div className="profile-info-table space-mb--40">
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">Full Name</div>
                    <div className="profile-info-block__value">
                      {currentUser.fullname}
                    </div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">User Name</div>
                    <div className="profile-info-block__value">
                      {currentUser.username}
                    </div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">Phone</div>
                    <div className="profile-info-block__value">
                      {currentUser.phone || "No Phone number"}
                    </div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">
                      E-mail Address
                    </div>
                    <div className="profile-info-block__value">
                      {currentUser.email}
                    </div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">Total Order</div>
                    <div className="profile-info-block__value">
                      {
                        userUtilService.getContactPurchaseType(currentUser)
                          .length
                      }
                    </div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">
                      Edit Profile
                    </div>
                    <div className="profile-info-block__value">
                      <Link to={ROUTES.USER_EDIT_PROFILE_PAGE.FULL_ROUTE_NAME}>
                        <FaEdit />
                      </Link>
                    </div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">
                      Country Preferences
                    </div>
                    <div className="profile-info-block__value">Israel</div>
                  </div>
                </div>
                <div className="profile-info-table">
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">Help Center</div>
                    <div className="profile-info-block__value">62256</div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">
                      To be Shiped
                    </div>
                    <div className="profile-info-block__value">5</div>
                  </div>
                  <div className="profile-info-block">
                    <div className="profile-info-block__title">Review</div>
                    <div className="profile-info-block__value">10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
