<script lang="ts">
  import { onMount } from "svelte";

  import { userConfig } from "./stores/userConfig.store";
  import useInitBreadfast from "./util/useInitBreadfast";
  import useRefreshToken from "./util/useRefreshToken";
  import useUpdateAddress from "./util/useUpdateAddress";
  import useHandleFailures from "./util/useHandleFailures";

  import "./app.css";

  const { refreshToken } = useRefreshToken();
  const { updateAddress } = useUpdateAddress();
  const { handleFailures } = useHandleFailures();

  useInitBreadfast();
</script>

<main>
  <h3>Test Data Transmission Between WebView and iOS App</h3>
  <div class="card-border">
    <h3>Received Data from Native App <br />(IOS + Android)</h3>
    <div>
      <div style="margin-bottom: 4px;">
        <strong>Token:</strong>
        {$userConfig.token || "No token yet"}
      </div>
      <div style="margin-bottom: 4px;">
        <strong>Longitude:</strong>
        {$userConfig.lng || "No longitude yet"}
      </div>
      <div style="margin-bottom: 4px;">
        <strong>Latitude:</strong>
        {$userConfig.lat || "No latitude yet"}
      </div>
      <div>
        <strong>Language:</strong>
        {$userConfig.lang || "No language yet"}
      </div>
      <br />
      <h5>Click on the button to request refreshing the token</h5>
      <button onclick={refreshToken}>Get Refresh Token</button>
    </div>
  </div>
  <div class="card-border">
    <h3>Call Update Address function</h3>
    <button onclick={updateAddress}>Update Address</button>
  </div>
  <div class="card-border">
    <h3>Call Handle Failures function</h3>
    <button onclick={handleFailures}>Handle Failures</button>
  </div>
</main>
