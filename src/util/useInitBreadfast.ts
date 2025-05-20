import { onDestroy, onMount } from "svelte";
import type { UserConfig } from "../stores/userConfig.types";
import { userConfig } from "../stores/userConfig.store";

export default function useInitBreadfast() {
  function initBreadFast(
    token: string,
    lng: string,
    lat: string,
    lang: string
  ) {
    try {
      const data: UserConfig = {
        token,
        lng,
        lat,
        lang,
      };

      userConfig.setUserConfig(data);
    } catch (error) {
      console.error(`initBreadFast error: ${error}`);
    }
  }

  // Register and cleanup
  onMount(() => {
    if (typeof window !== "undefined") {
      window.initBreadFast = initBreadFast;
    }
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      delete window.initBreadFast;
    }
  });

  // Return functions for use in components
  return {
    initBreadFast,
  };
}
