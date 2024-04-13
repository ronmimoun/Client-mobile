import { useCallback } from "react";
import { ContactModel } from "../../../../../types/contact/contact.type";
import { contactApiService } from "../../../../../services/http/api/contact.api.service";
import { MESSAGES } from "../../../../../constants/messages.constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../../constants/routes.constants";

type InStockAndOwnerContactButtonProps = {
  contact: ContactModel;
};

export const InStockAndOwnerContactButton = ({
  contact,
}: InStockAndOwnerContactButtonProps) => {
  const navigate = useNavigate();

  const onDownload = useCallback(async () => {
    const response = await contactApiService.sendContactDetailsEmail({
      contactId: contact._id,
    });

    if (!response.isSucceeded) return;

    toast.success(MESSAGES.EMAILS.EMAIL_SENT);
  }, [contact]);

  const onCommunicateWithAgent = () => {
    navigate(ROUTES.AGENT_MESSAGE_DETAILS_PAGE.FULL_ROUTE_NAME + contact._id);
  };

  return (
    <div className="shop-product-button">
      <button className="button __h-50" onClick={onDownload}>
        Download
      </button>
      {contact.agent && (
        <button
          className="button __h-50 secondary-button"
          onClick={onCommunicateWithAgent}
        >
          Communicate with agent
        </button>
      )}
    </div>
  );
};
