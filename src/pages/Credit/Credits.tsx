import { useEffect, useState } from "react";
import { creditApiService } from "../../services/http/api/credit.api.service";
import PageLayout from "../../layout/PageLayout/PageLayout";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { Credit } from "../../types/entities/credit/credit.type";
import { CreditPreview } from "../../components/feature/CreditPreview/CreditPreview";

export const Credits = () => {
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    if (!credits.length) loadCredits();
  }, []);

  const loadCredits = async () => {
    const creditsResponse = await creditApiService.query({});
    if (!creditsResponse.isSucceeded || !creditsResponse.data?.content) return;
    setCredits(creditsResponse.data.content);
  };

  return (
    <PageLayout title={PAGES_TITLE.CREDITS_CHAT_PAGE.TITLE_NAME}>
      {credits.map((credit) => {
        return <CreditPreview key={credit._id} credit={credit} />;
      })}
    </PageLayout>
  );
};
