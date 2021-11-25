// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SocketMock from 'socket.io-mock';
import { mount } from '@vue/test-utils';
import FleetTracker from '@/views/FleetTracker.vue';
import Vehicle from '@/components/fleet-tracking/Vehicle.vue';

describe('When socket-server emits `vehicles` event', () => {
  it('Displays vehicles passed with the event', (done) => {
    const socket = new SocketMock();

    const wrapper = mount(FleetTracker, {
      props: {
        socketIoClient: socket.socketClient,
      },
    });

    const vehicles = [
      { plateNumber: 'kaa123a', coordinates: { latitude: 111, longitude: 222 } },
      { plateNumber: 'kbb123a', coordinates: { latitude: 333, longitude: 444 } },
      { plateNumber: 'kcc123a', coordinates: { latitude: 1, longitude: 2 } },
    ];

    socket.on('received', () => {
      expect(wrapper.findAllComponents(Vehicle).length).toBe(3);

      const renderedText = wrapper.text();
      expect(renderedText).toContain('kaa123a');
      expect(renderedText).toContain('kbb123a');
      expect(renderedText).toContain('kcc123a');
      expect(renderedText).toContain('111');
      expect(renderedText).toContain('333');
      done();
    });

    socket.emit('vehicles', vehicles);
  });
});
