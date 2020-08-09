var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var bodyParser = require('body-parser');


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
    var payload = {city:null};
    payload.city = document.getElementById('longUrl').value;
    req.open('POST', 'https://www.google.com/q=local+elections+in+' + apiKey, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(payload));
    var response = JSON.parse(req.responseText);
    document.getElementById('city').textContent = response.city;
    event.preventDefault();
})
}




app.engine('handlebars', exphbs());
app.set('view engine','handlebars');
app.set('port', 6140);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', (req,res)=>{
    console.log('GET! hello world!');
    var qParams = [];
    for(var p in req.query){
        qParams.push({"name":p,"value":req.query[p]})
    }   
    var context = {};
    context.dataList = qParams;
    res.render('get',context);
})

app.post('/', function(req,res){
    console.log("POST!");
    var qParams = [];
    for (var p in req.query){
        qParams.push({"name":p,"value":req.query[p]})
      }
    for (var p in req.body){
      qParams.push({"name":p,"value":req.body[p]})
    }
    console.log(qParams);
    console.log(req.query);
    console.log(req.body);
    
    var context = {};
    context.dataList = qParams;
    res.render('post', context);
  });


app.use((req,res)=>{
    res.status(404);
    res.render('404');   
});


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'),function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu'+app.get('port')+'; press Ctrl-C to terminate.')
});
    