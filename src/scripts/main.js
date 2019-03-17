//Set the current year at the footer element with id 'footer_year'
window.onload = function() {
  document.getElementById('footer_year').innerText = new Date().getFullYear();
}