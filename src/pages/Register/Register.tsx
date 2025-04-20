import { useCallback, useState } from "react";
import { RenderByBooleanWrapper } from "../../components/utils/RenderByBooleanWrapper/RenderByBooleanWrapper";
import { RegisterStep } from "./RegisterStep/RegisterStep";
import { OTPStep } from "./OTPStep/OTPStep";

enum RegisterStepEnum {
  REGISTRATION_FORM = "REGISTRATION_FORM",
  OTP_FORM = "OTP_FORM",
}

export type RegisterSharedData = {
  userId: string;
};

export const Register = () => {
  const [registerSharedData, setRegisterSharedData] =
    useState<RegisterSharedData>({
      userId: "",
    });
  const [registerStep, setRegisterStep] = useState<RegisterStepEnum>(
    RegisterStepEnum.REGISTRATION_FORM
  );

  const onNextStep = useCallback(() => {
    setRegisterStep(RegisterStepEnum.OTP_FORM);
  }, []);

  const updateRegisterSharedData = useCallback((data: RegisterSharedData) => {
    setRegisterSharedData(data);
  }, []);

  return (
    <>
      <RenderByBooleanWrapper
        shouldRender={registerStep === RegisterStepEnum.REGISTRATION_FORM}
      >
        <RegisterStep
          onNextStep={onNextStep}
          updateRegisterSharedData={updateRegisterSharedData}
        />
      </RenderByBooleanWrapper>
      <RenderByBooleanWrapper
        shouldRender={registerStep === RegisterStepEnum.OTP_FORM}
      >
        <OTPStep registerSharedData={registerSharedData} />
      </RenderByBooleanWrapper>
    </>
  );
};
