import classes from "./ContactLLMInfoSearch.module.scss";

type ContactLLMInfoSearchProps = {
  llmInfoText: string;
};

export const ContactLLMInfoSearch = ({
  llmInfoText,
}: ContactLLMInfoSearchProps) => {
  return (
    <div className={classes.container}>
      <h4>Contact information by AI:</h4>
      <p>{llmInfoText}</p>
    </div>
  );
};
