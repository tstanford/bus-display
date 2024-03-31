# Ember take home test
## Tim Stanford

## Wireframe
https://miro.com/app/board/uXjVKapIkcs=/

![image](https://github.com/tstanford/bus-display/assets/9977699/a64c75c9-b640-405a-a9d0-1b0a730655e4)


## curl to get data
* https://api.ember.to/v1/quotes/?origin=13&destination=42&departure_date_from=2024-03-29T15:00:00Z&departure_date_to=2024-03-29T18:00:00Z
* https://api.ember.to/v1/trips/{trip_id}

## Acceptance criteria

```
GIVEN a passenger wishes to travel from Dundee to Edinburgh
WHEN they are at the bus station
AND they wish to know when the next bus is
THEN they view the public display screen
AND it displays the departure time
AND the route and scheduled arrival time at the destination
```

## Out of scope
There is detail available from the trip endpoint that will indicate if the bus is runnning late, the actual departure time can be retrieved from previous stops. This could be used to show on the board to highlight that the bus is late. Perhaps with an alert icon.

Details are available in quote object that indicate the available seats. This could be used to determine how busy the bus is so that people waiting for the bus can see if will get on or not.

Currently the screen only shows the next departing bus from Dundee to Edinburgh, this is hard coded. This could be public display screen at bus stops on the way and could omit previous stop details and only show next stop details. 

The wireframe was initially designed for a 16:9 public display screen in a bus station. I later change this so that it wasn't split screen and can be viewed on a phone. on landscape display screen.

I didn't have time to add any automation testing, but in a system that was to be used in production this would be mandatory.






