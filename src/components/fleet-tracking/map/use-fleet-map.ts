import {
  FeatureCollection, Feature, GeoJsonProperties, Geometry,
} from 'geojson';
import { GeoJSONSource, Map } from 'mapbox-gl';
import { ref, Ref, watch } from 'vue';

export type Vehicle = {
  plateNumber: string,
  coordinates: {
    latitude: number
    longitude: number
  }
}

type FleetGeoJson = FeatureCollection<Geometry, GeoJsonProperties>
type VehiclePointGeoJson = Feature<Geometry, GeoJsonProperties>

function getFleetGeoJson(fleet: Vehicle[]): FleetGeoJson {
  return {
    type: 'FeatureCollection',
    features: fleet.map((vehicle): VehiclePointGeoJson => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [vehicle.coordinates.longitude, vehicle.coordinates.latitude],
      },
      properties: {},
    })),
  };
}

type UseFleetMapReturn = {
  setFleetTrackingMap: (map: Map) => void
}

function useFleetMap(fleet: Ref<Vehicle[]>): UseFleetMapReturn {
  const fleetMap = ref<Map | null>(null);
  const setFleetTrackingMap = (map: Map) => {
    fleetMap.value = map;
  };

  watch(fleetMap, (map) => {
    if (map) {
      map.on('load', () => {
        map.addSource('source', {
          type: 'geojson',
          data: getFleetGeoJson(fleet.value),
        });

        map.addLayer({
          id: 'fleet',
          type: 'symbol',
          source: 'source',
          layout: {
            'icon-image': 'rocket-15',
          },
        });
      });
    }
  });

  watch(fleet, (value) => {
    if (fleetMap.value) {
      const fleetSource = fleetMap.value.getSource('source') as GeoJSONSource;
      if (fleetSource) {
        fleetSource.setData(getFleetGeoJson(value));
      }
    }
  });

  return { setFleetTrackingMap };
}

export default useFleetMap;
