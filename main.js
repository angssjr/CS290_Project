var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var apiKey = '-AIzaSyCvzehL_dI46W4uEUTHYboVFC3XY_0m_9I'



document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
document.getElementById('urlSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = {longUrl:null};
    payload.longUrl = document.getElementById('longUrl').value;
    req.open('POST', 'https://www.google.com/q=local+elections+in+' + apiKey, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(payload));
    var response = JSON.parse(req.responseText);
    document.getElementById('originalUrl').textContent = response.longUrl;
    document.getElementById('shortUrl').textContent = response.id;
    event.preventDefault();
})
}