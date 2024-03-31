import StopDetail from "./StopDetail.js"
import {getNextQuote, getTripDetails} from "./EmberApiClient.js"
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

function RouteDetails() {
  const [routeDetails, setRouteDetails] = useState({ latlong: "52,-4", route: [], routeName: "" });
  const fetchData = async () => {
    let quote = await getNextQuote();
    let tripDetails = await getTripDetails(quote.id);

    setRouteDetails({
      mapUrl: "https://maps.google.com/maps?q=" + quote.zone.latitude + "," + quote.zone.longitude + "&t=&z=13&ie=UTF8&iwloc=&output=embed",
      routeName: quote.origin + " to " + quote.destination,
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

export default RouteDetails;