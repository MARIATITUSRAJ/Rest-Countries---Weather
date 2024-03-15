//country details in card 
const rest_countryAPI = 'https://restcountries.com/v3.1/all' 
async function fetchingFunc(apiURL){
    v1 = await fetch(apiURL) 
    checkv1 = await v1.json()
    return checkv1
}

async function countryAPI(){
    try{
        c1 = await fetchingFunc(rest_countryAPI)
       
        var wholeParent = document.querySelector('.row')

        for (let i of c1){
            [lat,lon] = i.latlng;
            try{ 

                var col = document.createElement('div')
                col.classList.add('col')
                col.classList.add('col-sm-6')
                col.classList.add('col-md-4')
                col.classList.add('col-lg-4')
                col.classList.add('col-xl-4')

                var parentContainer = document.createElement('div')           
                parentContainer.classList.add('card')
                parentContainer.classList.add('h-100') 
                parentContainer.setAttribute('lat',lat)
                parentContainer.setAttribute('lon',lon) 

                var cardHeader = document.createElement('div')           
                cardHeader.classList.add('card-header') 
                cardHeader.innerHTML = `<h5>${i.name.official}</h5>`

                var cardBody = document.createElement('div')           
                cardBody.classList.add('card-body') 
                cardBody.innerHTML = `<h6><u>Latlng : ${i.latlng}</u></h6>`;

   
                var cardtext = document.createElement('div')           
                cardtext.classList.add('card-text') 
                cardtext.innerHTML = `<p> <label>Common Name :</label> ${i.name.common}, <br> <label>Capital :</label> ${i.capital},<br> <label>Region :</label> ${i.region}, <br> <label>Country code :</label> ${i.cca3}</p> 
                
                <p class="weather"></p>`

                var img = document.createElement('img') 
                img.classList.add('card-img-top')
                img.setAttribute('src', i.flags.png)    
                img.setAttribute('alt', i.flags.alt)    
                
                var btn = document.createElement("button") 
                btn.setAttribute('id','weather-btn');
                btn.setAttribute('onclick','weatherdataAPI(this)')
                btn.innerText = "Click for weather" ;
                
                parentContainer.append(img);
                parentContainer.append(cardHeader);
                cardBody.append(cardtext);
                parentContainer.append(cardBody);
                parentContainer.append(btn);
                
                col.append(parentContainer);
                wholeParent.append(col);
                 
            }
            catch(err){
                console.log('no data in country',i.name,lat,lon,err);
            }
            
        }
    }
    catch(err){
        console.log('error occured',err);
    }
}
countryAPI();

async function weatherdataAPI(e){
   
    var card = e.parentElement; 
    var lat = card.getAttribute('lat')
    var lon = card.getAttribute('lon')
    
    const API_key = '0f0b3728b2a46914478802e9cf3a7261'
    var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
                
    var  c2 = await fetchingFunc(weatherAPI)        
    var w = card.querySelector('.weather') 
    w.innerText = `Today's report : 
      ${c2.weather[0].description}. `;




    
}