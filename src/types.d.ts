/// <reference types="@workspace/ui-lib/types" />

declare global {
  interface Window {
    initBreadFast?: (
      token: string,
      lng: string,
      lat: string,
      lang: string
    ) => void;
    tokenRefreshed?: (newToken: string) => void;
    AndroidBridge?: {
      updateAddress: (data: { message: string }) => void;
      refreshToken: (oldToken: string) => void;
      handleFailures?: (errorMessage: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        updateAddress?: {
          postMessage: (data: { message: string }) => void;
        };
        refreshToken?: {
          postMessage: (oldToken: string) => void;
        };
        handleFailures?: {
          postMessage: (errorMessage: string) => void;
        };
      };
    };
  }
}

export {};
