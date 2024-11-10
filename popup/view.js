import { extentionStorage } from "../module/storage.js";

// Tab switching logic
document.querySelectorAll('.tab-button').forEach(tabButton => {
  tabButton.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    tabButton.classList.add('active');
    document.getElementById(tabButton.dataset.tab).classList.add('active');
  });
});

// Initialize availability tab
(async () => {
  const availabilityStatus = await extentionStorage.getAvailability();
  console.log(availabilityStatus)

  const enableEditCheckbox = document.getElementById("enableEditAvailability");
  const publicKeyCheckbox = document.getElementById("supportPublicKeyCredential");
  const uvpaaCheckbox = document.getElementById("supportUVPAA");
  const conMedCheckbox = document.getElementById("supportConditionalMediation");

  enableEditCheckbox.checked = availabilityStatus.enableEdit;
  publicKeyCheckbox.checked = availabilityStatus.publicKeyCredential;
  uvpaaCheckbox.checked = availabilityStatus.isUserVerifyingPlatformAuthenticatorAvailable;
  conMedCheckbox.checked = availabilityStatus.isConditionalMediationAvailable;

  const editOptionsContainer = document.getElementById("edit-options");
  const pubKeyOptionsContainer = document.getElementById("public-key-options");

  editOptionsContainer.style.display = enableEditCheckbox.checked ? "flex" : "none";
  pubKeyOptionsContainer.style.display = publicKeyCheckbox.checked ? "flex" : "none";

  enableEditCheckbox.addEventListener("change", () => {
    editOptionsContainer.style.display = enableEditCheckbox.checked ? "flex" : "none";
  });
  publicKeyCheckbox.addEventListener("change", () => {
    pubKeyOptionsContainer.style.display = publicKeyCheckbox.checked ? "flex" : "none";
  });
})();
