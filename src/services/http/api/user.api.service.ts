import { ApiResponse } from "../../../models/base/api-base";
import {
  AddUserFavoriteContactRequest,
  AddUserFavoriteContactResponse,
} from "../../../types/api/user/addUserFavoriteContact.type";
import {
  RemoveUserFavoriteContactRequest,
  RemoveUserFavoriteContactResponse,
} from "../../../types/api/user/removeUserFavoriteContact.type";
import {
  UpdateUserContactDisclosureRequest,
  UpdateUserContactDisclosureResponse,
  UserModel,
} from "../../../types/entities/user.type";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const userHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const updateUser = async (
  request: UserModel
): Promise<ApiResponse<UserModel>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/update",
    data: request,
  };

  const response = await userHttpInstance.managedRequest<UserModel>(options);
  return response;
};

const updateUserContactDisclosure = async (
  request: UpdateUserContactDisclosureRequest
): Promise<ApiResponse<UserModel>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/update_user_contact_disclosure",
    data: request,
  };

  const response =
    await userHttpInstance.managedRequest<UpdateUserContactDisclosureResponse>(
      options
    );
  return response;
};

const addUserFavoriteContact = async (
  request: AddUserFavoriteContactRequest
): Promise<ApiResponse<AddUserFavoriteContactResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/addUserFavoriteContact",
    data: request,
  };

  const response =
    await userHttpInstance.managedRequest<AddUserFavoriteContactResponse>(
      options
    );
  return response;
};

const removeUserFavoriteContact = async (
  request: RemoveUserFavoriteContactRequest
): Promise<ApiResponse<RemoveUserFavoriteContactResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/removeUserFavoriteContact",
    data: request,
  };

  const response =
    await userHttpInstance.managedRequest<RemoveUserFavoriteContactResponse>(
      options
    );
  return response;
};

export const userApiService = {
  updateUser,
  updateUserContactDisclosure,
  addUserFavoriteContact,
  removeUserFavoriteContact,
};
