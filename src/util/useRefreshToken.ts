import { onMount } from "svelte";
import { userConfig } from "../stores/userConfig.store";

export default function useRefreshToken() {
  // Send refreshToken message to Android
  const sendMessageToAndroid = (oldToken: string) => {
    if (typeof window !== "undefined" && window.AndroidBridge?.refreshToken) {
      window.AndroidBridge.refreshToken(oldToken);
    }
  };

  // Send refreshToken message to iOS
  const sendMessageToiOS = (oldToken: string) => {
    if (
      typeof window !== "undefined" &&
      window.webkit?.messageHandlers?.refreshToken
    ) {
      window.webkit.messageHandlers.refreshToken.postMessage(oldToken);
    }
  };

  // Trigger refreshToken for both platforms
  const refreshToken = () => {
    let token: string | null = "";
    userConfig.subscribe((config) => {
      token = config.token;
    })();
    sendMessageToAndroid(token);
    sendMessageToiOS(token);
  };

  // Update token in userConfig store
  const tokenRefreshed = (newToken: string) => {
    try {
      userConfig.setToken(newToken);
    } catch (error) {
      console.error(`tokenRefreshed error: ${error}`);
    }
  };

  onMount(() => {
    // Assign tokenRefreshed to window
    if (typeof window !== "undefined" && !window?.tokenRefreshed) {
      window.tokenRefreshed = tokenRefreshed;
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        delete window.tokenRefreshed;
      }
    };
  });

  return {
    refreshToken,
  };
}
