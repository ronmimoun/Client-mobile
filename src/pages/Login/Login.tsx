import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { FiFacebook } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { userActions } from "../../store/user/user.actions";
import { UserAuthThunkResponse } from "../../store/user/user-thunks/loginThunkBuilder";
import { ROUTES } from "../../constants/routes.constants";
import { FaGoogle } from "react-icons/fa";
import { LOGIN_SCHEMA, LoginForm } from "../../form/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LOGIN_SCHEMA),
  });

  const onSubmit = useCallback(async (data: LoginForm) => {
    const response = (await dispatch(userActions.loginThunk(data)))
      .payload as UserAuthThunkResponse;
    if (!response.isSucceeded) return;

    navigate(ROUTES.HOME_SCREEN.FULL_ROUTE_NAME);
  }, []);

  return (
    <div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
      {/* auth page header */}
      <div className="auth-page-header space-mb--30">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="auth-page-header__title">Welcome Back</h3>
              <p className="auth-page-header__text">Log in for best info</p>
            </div>
          </div>
        </div>
      </div>

      {/* {error.isError && <ErrorMessage errorMessage={error.errorText} />} */}

      {/* auth page body */}
      <div className="auth-page-body">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Auth form */}
              <div className="auth-form">
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                  <div className="auth-form__single-field space-mb--30">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      {...formMethods.register("username", { required: true })}
                    />
                  </div>
                  <div className="auth-form__single-field space-mb--30">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      {...formMethods.register("password", { required: true })}
                    />
                  </div>
                  <div className="auth-form__single-field space-mb--40">
                    <p className="auth-form__info-text">
                      Don't have an account?{" "}
                      <Link to={ROUTES.REGISTER_PAGE.FULL_ROUTE_NAME}>
                        Sign up Now
                      </Link>
                    </p>
                  </div>
                  <button className="auth-form__button">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* auth page footer */}
      <div className="auth-page-footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span className="auth-page-separator text-center space-mt--20 space-mb--20">
                - OR -
              </span>
              <div className="auth-page-social-login">
                <button>
                  <FiFacebook />
                  Sign In with Facebook
                </button>
                <button>
                  <FaGoogle />
                  Sign In with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
