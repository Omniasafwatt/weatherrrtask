async function getweatherdata(cityname)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=198c0063c40f47a38f5184606242301&q=${cityname}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData;
}


let todayname = document.getElementById('today-name')
let todaynum = document.getElementById('today-num')
let todaymonth = document.getElementById('today-month')
let todaylocation = document.getElementById('location')
let todaytemp = document.getElementById('today-temp')
let todayicon = document.getElementById('today-img-icon')
let custom = document.getElementById('custom')
let todayhumidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let winddirec = document.getElementById('wind-direc')
////
let itemday =document.getElementsByClassName("item-day")
let itemicon =document.getElementsByClassName("item-icon")
let itemnum =document.getElementsByClassName("item-num")
let itemdeg =document.getElementsByClassName("item-deg")
let itemcustom =document.getElementsByClassName("item-custom")
///
let searchinput = document.getElementById("search")

///
// let date = new Date("2023-03-5")
// console.log(date.toLocaleDateString("en-US",{weekday:"long"}));

function todaydata(data){

    let todaydate = new Date()
    todayname.innerHTML= todaydate.toLocaleDateString("en-us",{weekday:"long"})
    todaynum.innerHTML= todaydate.getDate()
    todaymonth.innerHTML= todaydate.toLocaleDateString("en-us",{month:"long"})
    todaylocation.innerHTML = data.location.name
    todaytemp.innerHTML = data.current.temp_c
    todayicon.setAttribute("src",data.current.condition.icon)
    custom.innerHTML=data.current.condition.text
    todayhumidity.innerHTML=data.current.humidity + "%"
    wind.innerHTML=data.current.wind_degree + "km/h"
    winddirec.innerHTML=data.current.wind_dir

}
function nextdaydata(data){
    let nextdata = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextdate = new Date(nextdata[i+1].date)
        itemday[i].innerHTML = nextdate.toLocaleDateString("en-us",{weekday:"long"})
        itemicon[i].setAttribute("src",nextdata[i+1].day.condition.icon)
        itemnum[i].innerHTML= nextdata[i+1].day.maxtemp_c
        itemdeg[i].innerHTML=nextdata[i+1].day.mintemp_c
        itemcustom[i].innerHTML=nextdata[i+1].day.condition.text
    }
}


searchinput.addEventListener("input",function(){
    startapp(searchinput.value)
})






async function startapp(city = "london"){
    let weatherdata = await getweatherdata(city);
    if(!weatherdata.error)
    {
        todaydata(weatherdata)
        nextdaydata(weatherdata)
    }

}
startapp()