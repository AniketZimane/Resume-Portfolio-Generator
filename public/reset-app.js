// Script to reset the application state
function resetAppState() {
  // Clear localStorage
  localStorage.clear();
  
  // Reload the page
  window.location.href = '/';
  
  return false;
}

// Add a reset button to the page
document.addEventListener('DOMContentLoaded', function() {
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset App';
  resetButton.style.position = 'fixed';
  resetButton.style.bottom = '10px';
  resetButton.style.right = '10px';
  resetButton.style.zIndex = '9999';
  resetButton.style.padding = '8px 12px';
  resetButton.style.backgroundColor = '#f44336';
  resetButton.style.color = 'white';
  resetButton.style.border = 'none';
  resetButton.style.borderRadius = '4px';
  resetButton.style.cursor = 'pointer';
  resetButton.onclick = resetAppState;
  
  document.body.appendChild(resetButton);
});