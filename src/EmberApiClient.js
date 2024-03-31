const getNextQuote = async () => {
  const startDate = new Date();
  const endDate = new Date(new Date().setHours(new Date().getHours() + 3))

  let response = await fetch("https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=" + startDate.toISOString() + "&departure_date_to=" + endDate.toISOString())
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
  var response = await fetch("https://api.ember.to/v1/trips/" + id);
  return await response.json();
}

export { getNextQuote, getTripDetails };
