export const REGEX = {
  LINKED_IN:
    /^(?:http(?:s)?:\/\/)?(?:www\.|\w\w\.)?linkedin\.com\/((?:in)\/(?:[a-zA-Z0-9-]{5,30}(?:\/)?)|(?:profile\/)(?:view\?id=[0-9]+))?$/gm,
  PHONE: {
    REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    MESSAGE: "Not a valid phone number",
  },
  FIRST_LETTER_CAPITAL: {
    REGEX: /^[A-Z][a-z0-9_-]{1,10}$/,
    MESSAGE: "First letter most be capital",
  },
};
