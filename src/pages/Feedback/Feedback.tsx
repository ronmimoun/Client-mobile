import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLayout from "../../layout/PageLayout/PageLayout";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { LoadingButton } from "../../components/ui/LoadingButton/LoadingButton";
import { userSelectors } from "../../store/user/user.selectors";
import { Star } from "../../components/ui/Star/Star";
import { feedbackApiService } from "../../services/http/api/feedback.api.service";
import { FeedbackModel } from "../../types/entities/feedback/feedback.type";
import {
  FEEDBACK_FORM_CONFIG,
  FeedbackForm,
} from "../../form/schemas/FeedbackSchema";
import { CreateFeedbackRequest } from "../../models/feedback/create/createFeedback.request";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../constants/popup.constants";
import { UserModel } from "../../types/entities/user.type";

export const Feedback = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const [feedback, setFeedback] = useState<FeedbackModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id: contactId } = useParams();

  const { register, handleSubmit, setValue } = useForm<FeedbackForm>({
    defaultValues: {
      [FEEDBACK_FORM_CONFIG.INPUTS.RATING.KEY]:
        FEEDBACK_FORM_CONFIG.INPUTS.RATING.DEFAULT_VALUE,
      [FEEDBACK_FORM_CONFIG.INPUTS.RATING.KEY]:
        FEEDBACK_FORM_CONFIG.INPUTS.COMMENT.DEFAULT_VALUE,
    },
  });

  useEffect(() => {
    loadUserFeedback();
  }, []);

  const loadUserFeedback = async () => {
    setIsLoading(true);
    if (!contactId) return;

    const response = await feedbackApiService.query({
      contactId,
      userId: currentUser._id,
    });

    setIsLoading(false);
    if (!response.isSucceeded || !response.data?.content) return;

    setFeedback(response.data.content as unknown as FeedbackModel);
  };

  const onRate = (ratingValue: number) => {
    setValue(FEEDBACK_FORM_CONFIG.INPUTS.RATING.KEY, `${ratingValue}`);
  };

  const onSubmit = async (data: FeedbackForm) => {
    setIsLoading(true);
    const request = {
      ...data,
      contactId,
    } as CreateFeedbackRequest;

    const response = await feedbackApiService.create(request);

    if (!response.isSucceeded || !response.data?.content) return;

    setFeedback(response.data.content);
    toast(POPUP_MESSAGE.FEEDBACK.THANKS_FOR_YOUR_FEEDBACK);
    setIsLoading(false);
  };

  return (
    <PageLayout title={PAGES_TITLE.FEEDBACK_PAGE.TITLE_NAME}>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="text-al__center space-y--30">
          How would you rate your experience with the contact?
        </h6>
        <div className="flex justify-center space-mb--30">
          <Star onRate={onRate} initialRating={feedback?.rating} />
        </div>

        <div className="input-container">
          <label htmlFor="message" className="input-container__label">
            Add Text
          </label>
          <textarea
            id="message"
            className="input"
            rows={4}
            cols={50}
            defaultValue={feedback?.comment}
            disabled={feedback ? true : false}
            required={true}
            {...register(FEEDBACK_FORM_CONFIG.INPUTS.COMMENT.KEY)}
          ></textarea>
        </div>

        {!feedback && (
          <LoadingButton
            className={"button space-mt--30 __h-50"}
            isLoading={isLoading}
          >
            Send
          </LoadingButton>
        )}
      </form>
    </PageLayout>
  );
};
