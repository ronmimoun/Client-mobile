import PageLayout from "../../layout/PageLayout/PageLayout";
import { PAGES_TITLE } from "../../constants/page-title.constants";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/user/user.selectors";
import { NoInfoPlaceholder } from "../../components/feature/NoInfoPlaceholder/NoInfoPlaceholder";
import { PresentativeContact } from "../../components/feature/Contacts/PresentativeContact/PresentativeContact";

export const RevealedContacts = () => {
  const currentUser = useSelector(userSelectors.currentUser());
  const revealedContacts = currentUser?.contactDisclosure.contactsRevealed;

  if (!revealedContacts || !revealedContacts.length)
    return <NoInfoPlaceholder title="No revealed contacts" />;

  return (
    <PageLayout
      breadCrumbProps={{
        pageTitle: PAGES_TITLE.REVEALED_CONTACTS.TITLE_NAME,
      }}
    >
      {revealedContacts.map((contact) => {
        return <PresentativeContact key={contact._id} contact={contact} />;
      })}
    </PageLayout>
  );
};
