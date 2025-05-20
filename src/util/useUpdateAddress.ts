export default function useUpdateAddress() {
  // Send refreshToken message to Android
  const sendMessageToAndroid = () => {
    if (typeof window !== 'undefined' && window.AndroidBridge?.updateAddress) {
      window.AndroidBridge.updateAddress({
        message: 'Hello Android Native App from updateAddress!',
      });
    }
  };

  // Send refreshToken message to iOS
  const sendMessageToiOS = () => {
    if (typeof window !== 'undefined' && window.webkit?.messageHandlers?.updateAddress) {
      window.webkit.messageHandlers.updateAddress.postMessage({
        message: 'Hello iOS Native App from updateAddress!',
      });
    }
  };

  // Trigger refreshToken for both platforms
  const updateAddress = () => {
    sendMessageToAndroid();
    sendMessageToiOS();
  };

  return {
    updateAddress,
  };
}
