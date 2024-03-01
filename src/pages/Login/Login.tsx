import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { FiFacebook } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { userActions } from "../../store/user/user.actions";
import { UserAuthThunkResponse } from "../../store/user/user-thunks/loginThunkBuilder";
import { ROUTES } from "../../constants/routes.constants";
import { FaGoogle } from "react-icons/fa";
import {
  LOGIN_FORM_CONFIG,
  LOGIN_SCHEMA,
  LoginForm,
} from "../../form/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputController } from "../../components/form/controllers/InputController";
import { PrimaryButton } from "../../components/ui/PrimaryButton/PrimaryButton";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<LoginForm>({
    defaultValues: {
      username: LOGIN_FORM_CONFIG.INPUTS.USERNAME.DEFAULT_VALUE,
      password: LOGIN_FORM_CONFIG.INPUTS.PASSWORD.DEFAULT_VALUE,
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

              {/* <div className="auth-form"> */}
              <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                  <InputController
                    className="mb_1"
                    label={LOGIN_FORM_CONFIG.INPUTS.USERNAME.LABEL}
                    name={LOGIN_FORM_CONFIG.INPUTS.USERNAME.KEY}
                    required={LOGIN_FORM_CONFIG.INPUTS.USERNAME.REQUIRED}
                  />
                  <InputController
                    className="mb_1"
                    label={LOGIN_FORM_CONFIG.INPUTS.PASSWORD.LABEL}
                    name={LOGIN_FORM_CONFIG.INPUTS.PASSWORD.KEY}
                    required={LOGIN_FORM_CONFIG.INPUTS.PASSWORD.REQUIRED}
                  />
                  <div className="auth-form__single-field mb_1">
                    <p className="auth-form__info-text">
                      Don't have an account?{" "}
                      <Link to={ROUTES.REGISTER_PAGE.FULL_ROUTE_NAME}>
                        Sign up Now
                      </Link>
                    </p>
                  </div>
                  <PrimaryButton type="submit">Login</PrimaryButton>
                </form>
              </FormProvider>
              {/* </div> */}
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
