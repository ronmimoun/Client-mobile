import { useForm } from "react-hook-form";

import { PAGES_TITLE } from "../../constants/page-title.constants";
import PageLayout from "../../layout/PageLayout";
import {
  CalendarIcon,
  CreditCardIcon,
  LockIcon,
  UserProfileIcon,
} from "../../components/ui/Icons";

export const AddPaymentCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <PageLayout title={PAGES_TITLE.ADD_PAYMENT_CARD_PAGE.TITLE_NAME}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap--15 f-dir-col mx-4">
          <div className="input-container">
            <span className="input__icon">
              <UserProfileIcon />
            </span>
            <input
              className="input"
              type="text"
              placeholder="Card holder name"
              {...register("cardHolderName")}
            />
          </div>

          <div
            className={`input-container ${
              errors?.creditNumber ? "input-error" : ""
            }`}
          >
            <span className="input__icon">
              <CreditCardIcon />
            </span>
            <input
              className="input"
              type="password"
              placeholder="Card Number"
              {...register("creditNumber", {
                pattern: /^(?:[0-9]{4}-){3}[0-9]{4}$|^[0-9]{16}$/,
              })}
            />
          </div>

          <div className="flex gap--10">
            <div className="input-container">
              <span className="input__icon">
                <CalendarIcon />
              </span>
              <input
                className="input"
                type="date"
                placeholder="Card holder name"
                {...register("cardExpirationDate")}
              />
            </div>

            <div className="input-container">
              <span className="input__icon">
                <LockIcon />
              </span>
              <input
                className="input"
                type="number"
                placeholder="CVV"
                {...register("cardCvv")}
              />
            </div>
          </div>
        </div>

        <div className="singel-button--container">
          <button className="button button__h-60">Add new card</button>
        </div>
      </form>
    </PageLayout>
  );
};
