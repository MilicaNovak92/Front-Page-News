
function getnews() {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apikey=231e935be0e142a1878e8f26f6be7298')
    .then(a=>a.json())
    .then(response => {
        for(var i=0; i<response.articles.length; i++)
        {       
            
             document.getElementById("output").innerHTML += 
            "<div class='card mb-3' style='max-width: 940px;'><div class='row g-0'><div class='col-md-4'><img src='"
            +response.articles[i].urlToImage+ "' class='img-fluid rounded-start' alt='No Photo Available'></div><div class='col-md-8'><div class='card-body'><h5 class='card-title'>"
            +response.articles[i].title+"</h5><p class='card-text'>"+response.articles[i].description+"</p><p class='card-text'><small id='date' class='text-muted'>"+ response.articles[i].publishedAt +"</small></p><a href='"+response.articles[i].url+"'target='_blank'>"
            +response.articles[i].url+"</a></div></div></div></div>"
        }
       
       
       
    })   
 }



 



 //window.onload = (e) => getnews()
