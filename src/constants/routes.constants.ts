/* eslint-disable @typescript-eslint/no-namespace */
export namespace ROUTES {
  export const BASE = "/";
  export const ASTERISK = "*";
  export const ASTERISK_BASE = `${BASE}${ASTERISK}`;

  export namespace HOME_PAGE {
    export const FULL_ROUTE_NAME = `${BASE}`;
    export const ASTERISK_ROUTE_NAME_PATH = `${FULL_ROUTE_NAME}/${ASTERISK}`;
  }

  export namespace WELCOME_PAGE {
    export const ROUTE_NAME = "welcome";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace LOGIN_PAGE {
    export const ROUTE_NAME = "login";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace REGISTER_PAGE {
    export const ROUTE_NAME = "register";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace HOME_SCREEN {
    export const ROUTE_NAME = "home";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace PROFILE_PAGE {
    export const ROUTE_NAME = "profile";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace USER_CREDIT_HISTORY_PAGE {
    export const ROUTE_NAME = "user-credits-history";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CREDIT_PAGE {
    export const ROUTE_NAME = "credit";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace PAYMENT_METHODS_PAGE {
    export const ROUTE_NAME = "payment-methods";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace MY_ORDERS_PAGE {
    export const ROUTE_NAME = "my-orders";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CART_PAGE {
    export const ROUTE_NAME = "cart";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace WISHLIST_PAGE {
    export const ROUTE_NAME = "wishlist";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace USER_EDIT_PROFILE_PAGE {
    export const ROUTE_NAME = "edit-profile";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACT_PAGE {
    export const ROUTE_NAME = "contact";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACTS_PAGE {
    export const ROUTE_NAME = "contacts";
    export const CATEGORY_CONTACT = "/:category";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
    export const CONTACT_CATEGORY_FULL_ROUTE_NAME = `${FULL_ROUTE_NAME}${CATEGORY_CONTACT}`;
  }

  export namespace AGENT_MESSAGES_PAGE {
    export const ROUTE_NAME = "agent-messages";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACTS_INCOME_PAGE {
    export const ROUTE_NAME = "contacts/income";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACTS_RECOMMANDED_PAGE {
    export const ROUTE_NAME = "contacts/recommanded";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace FAVORITES_CONTACTS_PAGE {
    export const ROUTE_NAME = "contacts/favorites";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CREDITS_PAGE {
    export const ROUTE_NAME = "credit";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace USER_PROFILE_PAGE {
    export const ROUTE_NAME = "profile";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace NOTIFICATION_PAGE {
    export const ROUTE_NAME = "notification";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CATEGORIES_PAGE {
    export const ROUTE_NAME = "categories";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace ADD_PAYMENT_CARD_PAGE {
    export const ROUTE_NAME = "payment/add";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACT_US_PAGE {
    export const ROUTE_NAME = "contact-us";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CONTACT_DETAILS_PAGE {
    export const ROUTE_NAME = "contact";
    export const PATH_NAME = `${BASE}${ROUTE_NAME}/:id`;
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}/`;
  }

  export namespace AGENT_MESSAGE_DETAILS_PAGE {
    export const ROUTE_NAME = "agent-messages/";
    export const PATH_NAME = "agent-messages/:id";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace FEEDBACK_PAGE {
    export const ROUTE_NAME = "feedback/";
    export const PATH_NAME = "feedback/:id";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace CHAT_PAGE {
    export const ROUTE_NAME = "support-chat";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace ALL_CONTACTS_PAGE {
    export const ROUTE_NAME = "all-contacts";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }

  export namespace WE_ARE_LOOKING_FOR_PAGE {
    export const ROUTE_NAME = "we-are-looking-for";
    export const PATH_NAME = "we-are-looking-for/:contactId";
    export const FULL_ROUTE_NAME = `${BASE}${ROUTE_NAME}`;
  }
}
