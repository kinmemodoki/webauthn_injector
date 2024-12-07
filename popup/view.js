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

// Inject Error tab
(()=> {
  // initialize enable slider
  const enableErrorInjection = document.getElementById('enableErrorInjection');
  const errorContainer = document.getElementById('error-container');
  extentionStorage.getDomExpName().then((currentDomExpName) => {
    if (currentDomExpName) {
      enableErrorInjection.checked = true;
      errorContainer.style.display = 'flex';
    } else {
      errorContainer.style.display = 'none';
    }
  })
  enableErrorInjection.addEventListener('change', () => {
    errorContainer.style.display = enableErrorInjection.checked ? 'flex' : 'none';
  });

  // handling for only one checked
  const checkboxes = document.querySelectorAll('#inject-error .button-container input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (ev) => {
      // do nothind if checkbox is unchecked
      if (!ev.target.checked) return;
      // unchecked others
      checkboxes.forEach(cb => {
        if (cb == checkbox) return;
        cb.checked = false;
      });
    });
  });
})();

// availability tab
(async () => {
  // initialize availability sliders
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
