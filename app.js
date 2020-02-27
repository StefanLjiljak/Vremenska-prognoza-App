window.addEventListener('load', ()=> {
    let long, lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat =  position.coords.latitude;  
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api= `${proxy}https://api.darksky.net/forecast/1b46bae5463b8aafb92ca916d4342640/${lat},${long}`;
        
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                const {temperature, summary, icon} = data.currently
                // set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // formula for celsius
                let celsius = (temperature -32) * (5/9);
                 // set Icon
                setIcons(icon, document.querySelector('.icon'));

                // change to celsius
                temperatureSection.addEventListener('click', ()=>{
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })

            })
        });
        
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})