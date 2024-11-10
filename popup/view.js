// Tab switching logic
document.querySelectorAll('.tab-button').forEach(tabButton => {
    tabButton.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      tabButton.classList.add('active');
      document.getElementById(tabButton.dataset.tab).classList.add('active');
    });
  });
  
  // Toggle visibility of client capabilities section
  const clientCapabilitiesCheckbox = document.getElementById('supportClientCapabilities');
  const clientCapabilitiesSection = document.getElementById('client-capabilities-section');
  
  clientCapabilitiesCheckbox.addEventListener('change', () => {
    clientCapabilitiesSection.style.display = clientCapabilitiesCheckbox.checked ? 'block' : 'none';
  });
  