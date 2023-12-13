import { useEffect, useState } from "react"


const Weather=()=>{


    const [cityName,setCityName]=useState()
    const [weatherData,setWeatherData]=useState()  
    const [error,setError]=useState()  
    const [loading,setLoading]=useState(false)  







    async function getWeatherData(){
       try {
        setLoading(true)
        let API_KEY=process.env.REACT_APP_API_KEY;
        console.log(API_KEY,'api')
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
        let result= await response.json() 
     if( result.cod == '404'){
         setError(result.message)
         setWeatherData()
     }
 
 
        if (result.cod !=="400" && result.cod !=='404'){
         setWeatherData(result)
         setError('')
        }

        if(result.cod ==400){
            setError('')
        }
        console.log(result)

        
       } catch (error) {
        setError('NETWORK ISSUE PLEASE TRY AFTER SOMETIME')
         }
        finally{setLoading(false)}   }
    useEffect(()=>{
        getWeatherData()
    },[cityName])
    


function convertToCelcious(temp){
    let new_temp=temp-273.15
    return Math.floor(new_temp)
}



    return <> <div className="weatherApp"> <div className="searchCity">
    <input type="text" placeholder="ENTERY YOUR CITY NAME" style={{color:"black"}}  value={cityName} onChange={(e)=>setCityName(e.target.value)} ></input></div>
       <h1 className="wName">seeWeather.com</h1>
        { loading && <img src="../glob2.gif" id="loadGif" ></img>}
        {error && <p id="errorRed" > ERROR : {error} </p>}

     
 {weatherData &&(<div className="temp"> <p >{convertToCelcious(weatherData?.main?.temp)}&deg;C</p> <br></br>
       <h3 style={{fontSize:'30px',position:'absolute', top:'95px'}} >{weatherData.name} {weatherData?.sys?.country}</h3>
  </div>)}

{weatherData && (<div className="tempDetail">
{weatherData?.weather && (weatherData?.weather[0].description)}{" "} <br></br><br></br>
<img src="./humidity.png" id="imgHumidity"  ></img>

HUMIDITY:{weatherData?.weather && (weatherData?.main?.humidity)} <br></br> <br></br>

<img src="./wind.png" id="imgWind"  ></img>
WIND:{weatherData?.weather && (weatherData?.wind?.speed)}{" "}

</div>)} 

          

        
        { weatherData && ( <div className="img1"> <img src={`${weatherData?.weather && weatherData?.weather[0].icon}.svg` }
         alt="img"   ></img></div>)}
          { weatherData && ( <div className="img2"> <img src={`${weatherData?.weather && weatherData?.weather[0].icon}.svg` }
         alt="img"  ></img></div>)}
       </div>
    </>
}

export default Weather