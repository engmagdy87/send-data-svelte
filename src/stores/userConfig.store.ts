import type { UserConfig } from "./userConfig.types";
import { writable } from "svelte/store";

const initialState: UserConfig = {
  token: "",
  lng: "",
  lat: "",
  lang: "",
};

function createUserConfig() {
  const { subscribe, set, update } = writable<UserConfig>(initialState);

  // Log changes in DEV mode
  if (import.meta.env.DEV)
    subscribe((value) =>
      console.log(
        "User Config store updated:",
        JSON.parse(JSON.stringify(value))
      )
    );

  return {
    subscribe,

    // Set user config state
    setUserConfig: (data: UserConfig) =>
      update((userConfig) => {
        userConfig = data;
        return userConfig;
      }),
    setToken: (token: string) =>
      update((userConfig) => {
        userConfig.token = token;
        return userConfig;
      }),
    // reset User Config state
    resetUserConfig: () => set(initialState),
  };
}

export const userConfig = createUserConfig();
