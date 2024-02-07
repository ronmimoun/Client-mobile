import { useEffect, useState } from "react";
import { CreditModel } from "../../types/credit/credit.type";
import { creditApiService } from "../../services/http/api/credit.api.service";
import Credit from "../../components/feature/Credit/Credit";
import PageLayout from "../../layout/PageLayout";
import { PAGES_TITLE } from "../../constants/page-title.constants";

export const Credits = () => {
  const [credits, setCredits] = useState<CreditModel[]>([]);

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
        return <Credit key={credit._id} credit={credit} />;
      })}
    </PageLayout>
  );
};
