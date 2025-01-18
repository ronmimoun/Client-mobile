import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSelectors } from "../../../store/user/user.selectors";
import {
  EDIT_PROFILE_FORM_CONFIG,
  EDIT_PROFILE_FORM_SCHEMA,
  EditProfileForm,
} from "../../../form/schemas/UserEditProfileSchema";
import PageLayout from "../../../layout/PageLayout/PageLayout";
import { PAGES_TITLE } from "../../../constants/page-title.constants";
import { useAppDispatch } from "../../../store";
import { userActions } from "../../../store/user/user.actions";
import { GenericResponse } from "../../../utils/api.utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { Select } from "../../../components/ui/Select/Select";
import { UserModel } from "../../../types/entities/user.type";
import { categoryManagerSelectors } from "../../../store/categoryManager/categoryManager.selectors";

export const UserEditProfile = () => {
  const currentUser = useSelector(userSelectors.currentUser()) as UserModel;
  const countries = useSelector(categoryManagerSelectors.countries);

  const formMethods = useForm<EditProfileForm>({
    defaultValues: {
      [EDIT_PROFILE_FORM_CONFIG.INPUTS.FULLNAME.KEY]:
        currentUser?.fullname || "",
      [EDIT_PROFILE_FORM_CONFIG.INPUTS.USERNAME.KEY]:
        currentUser?.username || "",
      [EDIT_PROFILE_FORM_CONFIG.INPUTS.EMAIL.KEY]: currentUser?.email || "",
      [EDIT_PROFILE_FORM_CONFIG.INPUTS.PHONE.KEY]: currentUser?.phone || "",
      [EDIT_PROFILE_FORM_CONFIG.INPUTS.COUNTRY_PREFERENCES.KEY]: currentUser
        .countryPreferences.length
        ? currentUser.countryPreferences[0].name
        : "",
    },
    resolver: zodResolver(EDIT_PROFILE_FORM_SCHEMA),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: EditProfileForm) => {
    const requestPayload = {
      ...data,
      _id: currentUser._id,
      countryPreferences: getRelevantCountry(data.countryPreferences),
    } as unknown as UserModel;
    const response = (await dispatch(
      userActions.userUpdateThunk(requestPayload)
    )) as PayloadAction<GenericResponse<UserModel>>;

    if (!response.payload.isSucceeded || !response.payload.data) return;
    toast.success(POPUP_MESSAGE.USER.USER_UPDATE.SUCCESS);
  };

  const getRelevantCountry = useCallback(
    (currCountry: string) => {
      const country = countries.find((country) => country.name === currCountry);
      if (!country) return null;
      return country;
    },
    [countries]
  );

  return (
    <PageLayout title={PAGES_TITLE.EDIT_PROFILE_PAGE.TITLE_NAME}>
      <div className="edit-profile-body">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* edit profile form */}
              <div className="edit-profile-form">
                <FormProvider {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="edit-profile-form__single-field space-mb--30">
                      <label htmlFor="fullname">Full Name</label>
                      <input
                        type="text"
                        id="fullname"
                        placeholder="Enter Full Name"
                        {...formMethods.register(
                          EDIT_PROFILE_FORM_CONFIG.INPUTS.FULLNAME.KEY
                        )}
                      />
                    </div>
                    <div className="edit-profile-form__single-field space-mb--30">
                      <label htmlFor="username">User Name</label>
                      <input
                        type="text"
                        id="username"
                        placeholder="Enter User Name"
                        {...formMethods.register(
                          EDIT_PROFILE_FORM_CONFIG.INPUTS.USERNAME.KEY
                        )}
                      />
                    </div>
                    <div className="edit-profile-form__single-field space-mb--30">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="Enter Phone Number"
                        {...formMethods.register(
                          EDIT_PROFILE_FORM_CONFIG.INPUTS.PHONE.KEY
                        )}
                      />
                    </div>
                    <div className="edit-profile-form__single-field space-mb--30">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Enter Email Address"
                        {...formMethods.register(
                          EDIT_PROFILE_FORM_CONFIG.INPUTS.EMAIL.KEY
                        )}
                      />
                    </div>
                    <div className="edit-profile-form__single-field space-mb--30">
                      <label>Country Preferences</label>
                      <Select
                        accessor="name"
                        list={countries}
                        defaultValue={formMethods.watch(
                          EDIT_PROFILE_FORM_CONFIG.INPUTS.COUNTRY_PREFERENCES
                            .KEY
                        )}
                        name={
                          EDIT_PROFILE_FORM_CONFIG.INPUTS.COUNTRY_PREFERENCES
                            .KEY
                        }
                      />
                    </div>
                    <button className="edit-profile-form__button" type="submit">
                      Update
                    </button>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
