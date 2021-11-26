import Client, { Socket } from 'socket.io-client';
import {
  onMounted, onUnmounted, ref, Ref,
} from 'vue';
import { Vehicle } from '@/components/fleet-tracking/map/use-fleet-map';

const socketIoUrl = process.env.VUE_APP_SOCKET_IO_URL;

function createClientSocket(autoConnect = false): Socket {
  if (!socketIoUrl) {
    throw Error('VUE_APP_SOCKET_IO_URL env config not set');
  }
  return Client(socketIoUrl, {
    autoConnect,
    auth: { type: 'admin' },
  });
}

type UseFleetTrackingReturn = {
  fleet: Ref<Vehicle[]>
}

function useFleetTracking(_clientSocket: Socket): UseFleetTrackingReturn {
  const fleet = ref<Vehicle[]>([]);

  let clientSocket: Socket;

  if (_clientSocket) {
    clientSocket = _clientSocket;
  } else {
    clientSocket = createClientSocket();
  }

  clientSocket.on('vehicles', (updatedFleet: Vehicle[]) => {
    fleet.value = updatedFleet;
  });

  clientSocket.on('vehicle-movement', (movedVehicle: Vehicle) => {
    fleet.value = fleet.value.map((vehicle) => {
      if (vehicle.plateNumber === movedVehicle.plateNumber) {
        return movedVehicle;
      }
      return vehicle;
    });
  });

  onMounted(() => {
    if (!clientSocket.connected) {
      clientSocket.connect();
    }
  });

  clientSocket.on('connect', () => {
    clientSocket.emit('a');
  });

  onUnmounted(() => clientSocket.close());

  return { fleet };
}

export default useFleetTracking;
