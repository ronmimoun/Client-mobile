import { MastercardIcon } from "../../ui/Icons";
import { CreditCard } from "./CreditCard";

export const CreditCards = () => {
  const cards = [
    { name: "Israel Israeli", icon: MastercardIcon },
    { name: "Israel Israeli", icon: MastercardIcon },
    { name: "Israel Israeli", icon: MastercardIcon },
  ];

  return (
    <>
      {cards.map((card, idx) => {
        return <CreditCard key={idx} card={card} />;
      })}
    </>
  );
};
