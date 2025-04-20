import { FormProvider } from "react-hook-form";
import { PrimaryButton } from "../../../components/ui/PrimaryButton/PrimaryButton";
import { InputController } from "../../../components/form/controllers/InputController";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.constants";
import { useForm } from "react-hook-form";
import {
  REGISTRATION_OTP_FORM_SCHEMA,
  RegistrationOTPForm,
} from "../../../form/schemas/RegistrationOTPSchema";
import { REGISTRATION_OTP_FORM_CONFIG } from "../../../form/schemas/RegistrationOTPSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useAppDispatch } from "../../../store";
import { userThunkActions } from "../../../store/user/user.thunk-builder";
import { RegisterSharedData } from "../Register";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";

type OTPStepProps = {
  registerSharedData: RegisterSharedData;
};

export const OTPStep = ({ registerSharedData }: OTPStepProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<RegistrationOTPForm>({
    defaultValues: {
      [REGISTRATION_OTP_FORM_CONFIG.INPUTS.OTP.KEY]: "",
    },
    resolver: zodResolver(REGISTRATION_OTP_FORM_SCHEMA),
  });

  const onSubmit = useCallback(
    async (data: RegistrationOTPForm) => {
      const { otp } = data;
      await dispatch(
        userThunkActions.otpVerificationThunk({
          userId: registerSharedData.userId,
          otp: otp,
        })
      );

      toast.success(POPUP_MESSAGE.REGISTER.SIGN_UP_SUCCESSFULLY, {
        autoClose: 10000,
      });

      navigate(ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME);
    },
    [registerSharedData.userId, navigate]
  );

  return (
    <div className="body-wrapper bg-color--gradient space-pt--70 space-pb--120">
      <div className="auth-page-header space-mb--50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="auth-page-header__title">OTP Verification</h3>
              <p className="auth-page-header__text">
                Please enter the OTP sent to your email.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-page-body">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Auth form */}
              <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                  <InputController
                    className="mb_1"
                    label={REGISTRATION_OTP_FORM_CONFIG.INPUTS.OTP.LABEL}
                    name={REGISTRATION_OTP_FORM_CONFIG.INPUTS.OTP.KEY}
                    required={REGISTRATION_OTP_FORM_CONFIG.INPUTS.OTP.REQUIRED}
                  />
                  <div className="auth-form__single-field space-mb--40">
                    <p className="auth-form__info-text">
                      Already have an account?{" "}
                      <Link to={ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME}>
                        Sign in Now
                      </Link>
                    </p>
                  </div>
                  <PrimaryButton type="submit">Verify</PrimaryButton>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
