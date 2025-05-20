export default function useHandleFailures() {
  // Send refreshToken message to Android
  const sendMessageToAndroid = () => {
    if (typeof window !== "undefined" && window.AndroidBridge?.handleFailures) {
      window.AndroidBridge.handleFailures(
        "Hello Android Native App from handleFailures!"
      );
    }
  };

  // Send refreshToken message to iOS
  const sendMessageToiOS = () => {
    if (
      typeof window !== "undefined" &&
      window.webkit?.messageHandlers?.handleFailures
    ) {
      window.webkit.messageHandlers.handleFailures.postMessage(
        "Hello iOS Native App from handleFailures!"
      );
    }
  };

  // Trigger refreshToken for both platforms
  const handleFailures = () => {
    sendMessageToAndroid();
    sendMessageToiOS();
  };

  return {
    handleFailures,
  };
}
