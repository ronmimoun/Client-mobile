import ContactList from "../../components/feature/Contacts/ContactList/ContactList";
import UserContacts from "../../components/feature/Contacts/UserContacts/UserContacts";
import { WalletCard } from "../../components/feature/WalletCard/WalletCard";

export const Home = () => {
  return (
    <div>
      <WalletCard />
      <div className="backgrounds__white-top">
        <ContactList
          title={"New Contacts"}
          filters={{ recentAdded: 1 }}
          count={5}
        />
        <UserContacts title="My Orders" />
      </div>
    </div>
  );
};
