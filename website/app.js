// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseUrl ="https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey =",us&appid=9a08be94856c4905810ed11a37c76de9&units=metric";

// Event listener to add function to existing HTML DOM element
(document.getElementById('generate')).addEventListener('click', generateInfo);

/* Function called by event listener */
function generateInfo(){
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getData(zipCode,baseUrl,apiKey)

        .then((data)=> {
            postData('/postforcast',{date:d, temp:data.main.temp,description:data.weather[0].description,feeling:feeling})
            updateUi();
        })
       
}
/* Function to GET Web API Data*/
let getData = async (zip,baseUrl,apiKey) => {
    const response = await fetch(baseUrl+zip+apiKey);

    try {
        const data = await response.json();
        return data;
    }
    catch (Error){
        console.log("Error",Error);
    }
}
/* Function to POST data */
const postData = async(url='', data={}) => {
    const res = await fetch(url, {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try {
        const newDate = await res.json();
        console.log(newDate)
        return newDate;
    }catch(Error) {
        console.log("Error", Error);
    }
}

/* Function to GET Project Data */
const updateUi= async() => {
    const request = await fetch('getforcast');
    try {
        const content = await request.json();
        document.getElementById('date').innerHTML = `Date: ${content.date}`;
        document.getElementById('temp').innerHTML = `Temperatuer: ${content.temp}`;
        document.getElementById('descripe').innerHTML=`Description: ${content.description}`
        document.getElementById('content').innerHTML = `I feel: ${content.feeling}`;
    }
    catch (Error) {
        console.log("Error", Error);
    }
}