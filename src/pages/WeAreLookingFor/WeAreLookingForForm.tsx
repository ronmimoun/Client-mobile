import { useCallback, useEffect, useState } from "react";
import {
  WE_ARE_LOOKING_FOR_FORM_CONFIG,
  WE_ARE_LOOKING_FOR_FORM_SCHEMA,
  WeAreLookingForFormType,
} from "../../form/schemas/WeAreLookingForSchema";
import { FormProvider, useForm } from "react-hook-form";
import { CategoryModel } from "../../store/categoryManager/categoryManager-state";
import { UserAuthResponse } from "../../models/auth/Login/Login.response";
import { userSelectors } from "../../store/user/user.selectors";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateControlledContactApplyRequest } from "../../models/contactApplyRequest/create/createContactApplyRequest.request";
import { contactApplyRequestApiService } from "../../services/http/api/contactRequest.api.service";
import { AgentModel } from "../../types/agent.type";
import { Select } from "../../components/ui/Select/Select";
import { categoryManagerUtilService } from "../../utils/category-manager.utils";
import { Input } from "../../components/form/Input/Input";
import { PrimaryButton } from "../../components/ui/PrimaryButton/PrimaryButton";
import PageLayout from "../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ContactModel } from "../../types/contact/contact.type";
import { contactApiService } from "../../services/http/api/contact.api.service";
import { ROUTES } from "../../constants/routes.constants";
import { toast } from "react-toastify";
import { MESSAGES } from "../../constants/messages.constants";

const WeAreLookingForForm = () => {
  const { categories, jobTitles, countries } = useSelector(
    categoryManagerSelectors.categoryManager()
  );
  const currentUser = useSelector(
    userSelectors.currentUser()
  ) as UserAuthResponse;
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [selectedContact, setSelectedContact] = useState<ContactModel>();
  const { contactId } = useParams();
  const nav = useNavigate();

  const formMethods = useForm<WeAreLookingForFormType>({
    defaultValues: {
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.CATEGORIES.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.CATEGORIES.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COMPANY.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COMPANY.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COUNTRY.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COUNTRY.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.DESC.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.DESC.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.FAMILY_NAME.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.FAMILY_NAME.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.LINKED_IN_LINK.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.LINKED_IN_LINK.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.NAME.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.NAME.DEFAULT_VALUE,
      [WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.PHONE.KEY]:
        WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.PHONE.DEFAULT_VALUE,
    },
    resolver: zodResolver(WE_ARE_LOOKING_FOR_FORM_SCHEMA),
  });

  useEffect(() => {
    if (!contactId) return;

    const loadContact = async () => {
      const response = await contactApiService.getById(contactId);
      if (!response.isSucceeded || !response.data?.content) {
        nav(ROUTES.WE_ARE_LOOKING_FOR_PAGE.FULL_ROUTE_NAME);
        return;
      }

      setSelectedContact(response.data.content);
    };

    loadContact();
  }, [contactId]);

  useEffect(() => {
    if (!selectedContact) return;

    const category = categories.find(
      (category) => category.title === selectedContact.category
    );

    loadContactValues();
    setSelectedCategory(category);
  }, [categories, selectedContact]);

  const loadContactValues = useCallback(() => {
    if (!selectedContact) return;

    formMethods.setValue("category", selectedContact.category || "");
    formMethods.setValue("company", selectedContact.company || "");
    formMethods.setValue("jobTitle", selectedContact.jobTitle || "");
    formMethods.setValue("country", selectedContact.country || "");
    formMethods.setValue("name", selectedContact.name || "");
    formMethods.setValue("familyName", selectedContact.familyName || "");
    formMethods.setValue("desc", selectedContact.desc || "");
    formMethods.setValue("phone", selectedContact.phone || "");
    formMethods.setValue("linkedinLink", selectedContact.linkedinLink || "");
  }, [selectedContact]);

  const handleSubmit = useCallback(
    async (formValues: WeAreLookingForFormType) => {
      const res = window.confirm("Are you sure?");
      if (!res || !contactId) return;

      const request: CreateControlledContactApplyRequest = {
        request: { ...formValues, _id: contactId },
        agent: createAgentForRequest(),
      };

      const response =
        await contactApplyRequestApiService.controlledCreateContactRequest(
          request
        );

      if (!response.isSucceeded || !response.data?.content) return;

      nav(ROUTES.HOME_SCREEN.FULL_ROUTE_NAME);
      toast.success(MESSAGES.FORMS.WE_ARE_LOOKING_FOR_FORM.REQUEST_SENT);
    },
    []
  );

  const handleError = useCallback((error: any) => {
    console.log("error", error);
  }, []);

  const handleCategoryChange = useCallback(
    (value: string | null) => {
      const category = categories.find((category) => category.title === value);
      setSelectedCategory(category);
    },
    [categories]
  );

  const createAgentForRequest = useCallback((): AgentModel => {
    return {
      _id: currentUser._id,
      fullname: currentUser.fullname,
      imgUrl: currentUser.imgUrl?.url || "",
    };
  }, []);

  if (!selectedContact) return <></>;
  return (
    <PageLayout title="Fill the fields">
      <FormProvider {...formMethods}>
        <form
          className="mt-3"
          onSubmit={formMethods.handleSubmit(handleSubmit, handleError)}
        >
          <div className="f-space-between">
            <Select
              list={categories}
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.CATEGORIES.KEY}
              accessor={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.CATEGORIES.ACCESSOR
              }
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.CATEGORIES.LABEL}
              handleChange={handleCategoryChange}
              required={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.CATEGORIES.IS_REQUIRED
              }
            />
            <Select
              disabled={!selectedCategory}
              list={categoryManagerUtilService.getCompaniesByCategory(
                selectedCategory
              )}
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COMPANY.KEY}
              accessor={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COMPANY.ACCESSOR}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COMPANY.LABEL}
              required={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COMPANY.IS_REQUIRED
              }
            />
          </div>

          <div className="mt_1 mb_2 f-space-between">
            <Select
              list={jobTitles}
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.KEY}
              accessor={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.ACCESSOR
              }
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.LABEL}
              required={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.JOB_TITLE.IS_REQUIRED
              }
            />

            <Select
              list={countries}
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COUNTRY.KEY}
              accessor={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COUNTRY.ACCESSOR}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COUNTRY.LABEL}
              required={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.COUNTRY.IS_REQUIRED
              }
            />
          </div>

          <div className="inputs-container">
            <Input
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.NAME.KEY}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.NAME.LABEL}
              required={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.NAME.IS_REQUIRED}
            />

            <Input
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.FAMILY_NAME.KEY}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.FAMILY_NAME.LABEL}
              required={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.FAMILY_NAME.IS_REQUIRED
              }
            />

            <Input
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.DESC.KEY}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.DESC.LABEL}
              required={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.DESC.IS_REQUIRED}
            />

            <Input
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.PHONE.KEY}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.PHONE.LABEL}
              required={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.PHONE.IS_REQUIRED}
            />

            <Input
              name={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.LINKED_IN_LINK.KEY}
              label={WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.LINKED_IN_LINK.LABEL}
              required={
                WE_ARE_LOOKING_FOR_FORM_CONFIG.INPUTS.LINKED_IN_LINK.IS_REQUIRED
              }
            />
          </div>

          <PrimaryButton type="submit">Submit</PrimaryButton>
        </form>
      </FormProvider>
    </PageLayout>
  );
};

export default WeAreLookingForForm;
