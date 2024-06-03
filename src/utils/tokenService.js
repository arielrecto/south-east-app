import * as SecureStore from "expo-secure-store";

let token = null;

export const setToken = async (newToken) => {
  token = newToken;

  console.log("token service", token);

  if (token !== null) {
    await SecureStore.setItemAsync("token", token);
    return;
  }

  await SecureStore.deleteItemAsync("token");
};

export const getToken = async () => {
  if (token !== null) {
    return token;
  }

  token = await SecureStore.getItemAsync("token");
};

export const deleteToken = async () => {
  token = null;

  await SecureStore.deleteItemAsync("token");
};
