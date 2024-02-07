import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  REGISTER_FORM_CONFIG,
  REGISTER_FORM_SCHEMA,
  RegisterForm,
} from "../../form/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "../../constants/routes.constants";
import { FaFacebook } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../constants/popup.constants";
import { useAppDispatch } from "../../store";
import { userActions } from "../../store/user/user.actions";
import { RegisterThunkResponse } from "../../store/user/user-thunks/registerThunkBuilder";

export const Register = () => {
  const formMethods = useForm<RegisterForm>({
    defaultValues: {
      [REGISTER_FORM_CONFIG.INPUTS.USERNAME.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.USERNAME.DEFAULT_VALUE,
      [REGISTER_FORM_CONFIG.INPUTS.NAME.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.NAME.DEFAULT_VALUE,
      [REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.DEFAULT_VALUE,
      [REGISTER_FORM_CONFIG.INPUTS.EMAIL.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.EMAIL.DEFAULT_VALUE,
      [REGISTER_FORM_CONFIG.INPUTS.PASSWORD.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.PASSWORD.DEFAULT_VALUE,
      [REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.DEFAULT_VALUE,
      [REGISTER_FORM_CONFIG.INPUTS.PHONE.KEY]:
        REGISTER_FORM_CONFIG.INPUTS.PHONE.DEFAULT_VALUE,
    },
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
  });

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword)
      return toast.error(POPUP_MESSAGE.REGISTER.CHECK_PASSWORD_MATCH);

    const request: RegisterForm = {
      ...data,
      fullname: `${data.name} ${data.lastName}`,
    };

    const response = (await dispatch(userActions.registerThunk(request)))
      .payload as RegisterThunkResponse;

    if (!response.isSucceeded) return;
    toast.success(POPUP_MESSAGE.REGISTER.SIGN_UP_SUCCESSFULLY, {
      autoClose: 10000,
    });

    nav(ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME);
  };

  return (
    <div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
      {/* auth page header */}
      <div className="auth-page-header space-mb--50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="auth-page-header__title">Welcome</h3>
              <p className="auth-page-header__text">
                Don't have account? <br /> Please sign up for creating a new
                account.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* auth page body */}
      <div className="auth-page-body">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Auth form */}
              <div className="auth-form">
                <FormProvider {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="auth-form__single-field space-mb--30">
                      <label htmlFor="username">Username</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.USERNAME.KEY
                        )}
                        type="text"
                        id="username"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.USERNAME.PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--30">
                      <label htmlFor="name">First Name</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.NAME.KEY
                        )}
                        type="text"
                        id="name"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.NAME.PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--30">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.KEY
                        )}
                        type="text"
                        id="lastName"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--30">
                      <label htmlFor="emailAddress">Email Address</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.EMAIL.KEY
                        )}
                        type="text"
                        id="emailAddress"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.EMAIL.PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--30">
                      <label>Password</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.PASSWORD.KEY
                        )}
                        type="password"
                        id="password"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.PASSWORD.PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--30">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.KEY
                        )}
                        type="password"
                        id="confirmPassword"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD
                            .PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--30">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...formMethods.register(
                          REGISTER_FORM_CONFIG.INPUTS.PHONE.KEY
                        )}
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder={
                          REGISTER_FORM_CONFIG.INPUTS.PHONE.PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="auth-form__single-field space-mb--40">
                      <p className="auth-form__info-text">
                        Already have an account?{" "}
                        <Link to={ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME}>
                          Sign in Now
                        </Link>
                      </p>
                    </div>
                    <button className="auth-form__button" type="submit">
                      Sign Up
                    </button>
                  </form>
                </FormProvider>
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
                  <FaFacebook />
                  Sign In with Facebook
                </button>
                <button>
                  <BsGoogle />
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
