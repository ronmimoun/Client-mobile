import { useEffect } from "react";
import ContactList from "../../components/feature/Contacts/ContactList/ContactList";
import UserContacts from "../../components/feature/Contacts/UserContacts/UserContacts";
import { WalletCard } from "../../components/feature/WalletCard/WalletCard";
import { socketService } from "../../services/socket/socket.service";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/user/user.selectors";

export const Home = () => {
  const currentUser = useSelector(userSelectors.currentUser());

  useEffect(() => {
    if (!currentUser) return;
    socketService.initialSocketConnection();
  }, []);

  return (
    <>
      <div className="space-pb--50">
        <WalletCard />
        <div className="backgrounds__white-top">
          <ContactList
            title={"New Contacts"}
            filters={{ recentAdded: 1 }}
            count={5}
          />
          <UserContacts />
        </div>
      </div>
    </>
  );
};
