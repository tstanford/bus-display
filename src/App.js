import './App.css';
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const getNextQuote = async () => {
  const startDate = new Date();
  const endDate = new Date(new Date().setHours(new Date().getHours() + 3))

  let response = await fetch("https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from="+startDate.toISOString()+"&departure_date_to="+endDate.toISOString())
  let data = await response.json();

  var trips = data.quotes.map(x => {
    return {
      id: x.legs[0].trip_uid, 
      origin: x.legs[0].origin.region_name, 
      destination: x.legs[0].destination.region_name, 
      departure: x.legs[0].departure, 
      arrival: x.legs[0].arrival,
      zone: x.legs[0].origin.zone[0]
    };
  });

  return trips[0];
}

const getTripDetails = async (id) => {
  var response = await fetch("https://api.ember.to/v1/trips/"+id);
  return await response.json();
}

function StopDetail({time,name}) {
  return (
    <div class="stop">
      <div class="time">{time}</div>              
      <div class="name">{name}</div>        
    </div>
  )
}

function RouteDetails() {
  const [routeDetails, setRouteDetails] = useState({latlong:"52,-4", route: [], routeName: ""});
  const fetchData = async () => {
    let quote = await getNextQuote();
    let tripDetails = await getTripDetails(quote.id);

    setRouteDetails({
      mapUrl: "https://maps.google.com/maps?q="+quote.zone.latitude+","+quote.zone.longitude+"&t=&z=13&ie=UTF8&iwloc=&output=embed",
      routeName: quote.origin+" to "+quote.destination,
      route: tripDetails.route
    });
  }

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);    
  }, [])
  
  return (
    <div>

      <div class="split timetable">
          <h1>Next Bus: {routeDetails.routeName}</h1>
          
          {routeDetails.route.length > 0 && (

            <div class="stoplist">
              {routeDetails.route.map(stop => (
                <StopDetail
                  time={dayjs(new Date(stop.arrival.actual || stop.arrival.scheduled)).format("HH:mm")}
                  name={stop.location.name}>
                </StopDetail>
              ))}        
            </div>

          )}
      </div>

      <div class="split map">
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe width="100%" height="500" id="gmap_canvas" src={routeDetails.mapUrl} frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>        
          </div>
        </div>
      </div>

    </div>
  );
}


function App() {
  return (
    <div className="App">
           <RouteDetails/>
    </div>
  );
}

export default App;
