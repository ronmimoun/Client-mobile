type CreditCardProps = {
  card: CreditCardModel;
};

type CreditCardModel = {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const CreditCard = ({ card }: CreditCardProps) => {
  return (
    <div className="container credit-card">
      <div className="credit-card__info">
        <span>
          <card.icon />
        </span>
        <div className="credit-card__text-container">
          <h4 className="credit-card__title">{card.name}</h4>
          <p className="credit-card__password">**** **** **** 1234</p>
        </div>
      </div>

      <div></div>
    </div>
  );
};
