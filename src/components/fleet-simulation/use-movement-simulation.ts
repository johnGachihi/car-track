import { onUnmounted, reactive } from 'vue';

type Coordinate = {
  latitude: number,
  longitude: number,
}

function useMovementSimulation(startingPoint: Coordinate): Coordinate {
  const coordinates = reactive({
    latitude: startingPoint.latitude,
    longitude: startingPoint.longitude,
  });

  const intervalId = setInterval(() => {
    const latOrLongOrBoth = Math.floor(Math.random() * 3);
    const delta = Math.floor(Math.random() * 10) * 0.001;

    if (latOrLongOrBoth === 0) {
      coordinates.latitude += delta;
    } else if (latOrLongOrBoth === 1) {
      coordinates.longitude += delta;
    } else {
      coordinates.latitude += delta;
      coordinates.longitude += delta;
    }
  }, 1000);

  onUnmounted(() => clearInterval(intervalId));

  return coordinates;
}

export default useMovementSimulation;
