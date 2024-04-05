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
import { PrimaryButton } from "../../components/ui/PrimaryButton/PrimaryButton";
import { InputController } from "../../components/form/controllers/InputController";

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
              <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.USERNAME.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.USERNAME.KEY}
                    required={REGISTER_FORM_CONFIG.INPUTS.USERNAME.REQUIRED}
                  />
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.NAME.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.NAME.KEY}
                    required={REGISTER_FORM_CONFIG.INPUTS.NAME.REQUIRED}
                  />
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.KEY}
                    required={REGISTER_FORM_CONFIG.INPUTS.LAST_NAME.REQUIRED}
                  />
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.EMAIL.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.EMAIL.KEY}
                    required={REGISTER_FORM_CONFIG.INPUTS.EMAIL.REQUIRED}
                  />
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.PASSWORD.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.PASSWORD.KEY}
                    required={REGISTER_FORM_CONFIG.INPUTS.PASSWORD.REQUIRED}
                    type={REGISTER_FORM_CONFIG.INPUTS.PASSWORD.TYPE}
                  />
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.KEY}
                    required={
                      REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.REQUIRED
                    }
                    type={REGISTER_FORM_CONFIG.INPUTS.CONFIRM_PASSWORD.TYPE}
                  />
                  <InputController
                    className="mb_1"
                    label={REGISTER_FORM_CONFIG.INPUTS.PHONE.LABEL}
                    name={REGISTER_FORM_CONFIG.INPUTS.PHONE.KEY}
                    required={REGISTER_FORM_CONFIG.INPUTS.PHONE.REQUIRED}
                  />
                  <div className="auth-form__single-field space-mb--40">
                    <p className="auth-form__info-text">
                      Already have an account?{" "}
                      <Link to={ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME}>
                        Sign in Now
                      </Link>
                    </p>
                  </div>
                  <PrimaryButton type="submit">Sign Up</PrimaryButton>
                </form>
              </FormProvider>
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
