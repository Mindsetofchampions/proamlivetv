import { createServer } from 'http';
import { Server } from 'socket.io';
import * as mediasoup from 'mediasoup';
import { Worker, Router, WebRtcTransport, Producer, Consumer } from 'mediasoup/node/lib/types';

const config = {
  listenIp: '127.0.0.1',
  listenPort: 3001,
  mediasoup: {
    worker: {
      rtcMinPort: 10000,
      rtcMaxPort: 10100,
      logLevel: 'warn',
      logTags: ['info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp']
    },
    router: {
      mediaCodecs: [
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'video',
          mimeType: 'video/VP9',
          clockRate: 90000,
          parameters: {
            'profile-id': 2,
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'video',
          mimeType: 'video/h264',
          clockRate: 90000,
          parameters: {
            'packetization-mode': 1,
            'profile-level-id': '4d0032',
            'level-asymmetry-allowed': 1,
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2
        }
      ]
    },
    webRtcTransport: {
      listenIps: [
        {
          ip: '0.0.0.0',
          announcedIp: process.env.ANNOUNCED_IP || '127.0.0.1'
        }
      ],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      initialAvailableOutgoingBitrate: 1000000,
      minimumAvailableOutgoingBitrate: 600000,
      maxIncomingBitrate: 1500000
    }
  }
};

class MediaServer {
  private worker: Worker | null = null;
  private router: Router | null = null;
  private producers: Map<string, Producer> = new Map();
  private consumers: Map<string, Consumer> = new Map();
  private transports: Map<string, WebRtcTransport> = new Map();

  async init() {
    this.worker = await mediasoup.createWorker({
      logLevel: config.mediasoup.worker.logLevel as any,
      logTags: config.mediasoup.worker.logTags as any,
      rtcMinPort: config.mediasoup.worker.rtcMinPort,
      rtcMaxPort: config.mediasoup.worker.rtcMaxPort
    });

    this.router = await this.worker.createRouter({
      mediaCodecs: config.mediasoup.router.mediaCodecs
    });

    const httpServer = createServer();
    const io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => this.handleConnection(socket));

    httpServer.listen(config.listenPort, config.listenIp, () => {
      console.log(`MediaSoup server listening on port ${config.listenPort}`);
    });
  }

  private async handleConnection(socket: any) {
    socket.emit('routerRtpCapabilities', this.router?.rtpCapabilities);

    socket.on('createProducerTransport', async (callback: Function) => {
      try {
        const transport = await this.createWebRtcTransport();
        this.transports.set(transport.id, transport);
        
        callback({
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
          sctpParameters: transport.sctpParameters
        });

        // Monitor transport ICE state
        transport.on('icestatechange', (state) => {
          socket.emit('iceConnectionStateChange', state);
        });
      } catch (error) {
        console.error('createProducerTransport error:', error);
        callback({ error: error.message });
      }
    });

    socket.on('connectProducerTransport', async ({ dtlsParameters, transportId }, callback: Function) => {
      const transport = this.transports.get(transportId);
      if (!transport) {
        return callback({ error: 'Transport not found' });
      }

      await transport.connect({ dtlsParameters });
      callback();
    });

    socket.on('produce', async ({ kind, rtpParameters, transportId }, callback: Function) => {
      const transport = this.transports.get(transportId);
      if (!transport) {
        return callback({ error: 'Transport not found' });
      }

      const producer = await transport.produce({ kind, rtpParameters });
      this.producers.set(producer.id, producer);

      producer.on('transportclose', () => {
        producer.close();
        this.producers.delete(producer.id);
      });

      // Monitor producer score
      producer.on('score', (score) => {
        socket.emit('producerScore', { producerId: producer.id, score });
      });

      callback({ id: producer.id });
    });

    socket.on('createConsumerTransport', async (callback: Function) => {
      try {
        const transport = await this.createWebRtcTransport();
        this.transports.set(transport.id, transport);
        
        callback({
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
          sctpParameters: transport.sctpParameters
        });

        // Monitor transport ICE state
        transport.on('icestatechange', (state) => {
          socket.emit('iceConnectionStateChange', state);
        });
      } catch (error) {
        console.error('createConsumerTransport error:', error);
        callback({ error: error.message });
      }
    });

    socket.on('connectConsumerTransport', async ({ dtlsParameters, transportId }, callback: Function) => {
      const transport = this.transports.get(transportId);
      if (!transport) {
        return callback({ error: 'Transport not found' });
      }

      await transport.connect({ dtlsParameters });
      callback();
    });

    socket.on('consume', async ({ producerId, rtpCapabilities }, callback: Function) => {
      try {
        const producer = this.producers.get(producerId);
        if (!producer) {
          throw new Error(`Producer not found: ${producerId}`);
        }

        if (!this.router?.canConsume({
          producerId: producer.id,
          rtpCapabilities,
        })) {
          throw new Error('Cannot consume');
        }

        const transport = Array.from(this.transports.values()).find(t => t.appData.consumerId === socket.id);
        if (!transport) {
          throw new Error('Consumer transport not found');
        }

        const consumer = await transport.consume({
          producerId: producer.id,
          rtpCapabilities,
          paused: true,
        });

        this.consumers.set(consumer.id, consumer);

        consumer.on('transportclose', () => {
          consumer.close();
          this.consumers.delete(consumer.id);
        });

        // Monitor consumer score
        consumer.on('score', (score) => {
          socket.emit('consumerScore', { consumerId: consumer.id, score });
        });

        callback({
          id: consumer.id,
          producerId: producer.id,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        });
      } catch (error) {
        console.error('consume error:', error);
        callback({ error: error.message });
      }
    });

    socket.on('requestNewTransports', async () => {
      try {
        // Close existing transports
        const oldTransports = Array.from(this.transports.values())
          .filter(t => t.appData.socketId === socket.id);
        
        for (const transport of oldTransports) {
          transport.close();
          this.transports.delete(transport.id);
        }

        // Create new transports
        const producerTransport = await this.createWebRtcTransport();
        const consumerTransport = await this.createWebRtcTransport();

        this.transports.set(producerTransport.id, producerTransport);
        this.transports.set(consumerTransport.id, consumerTransport);

        socket.emit('newTransportsCreated', {
          producerTransport: {
            id: producerTransport.id,
            iceParameters: producerTransport.iceParameters,
            iceCandidates: producerTransport.iceCandidates,
            dtlsParameters: producerTransport.dtlsParameters,
            sctpParameters: producerTransport.sctpParameters
          },
          consumerTransport: {
            id: consumerTransport.id,
            iceParameters: consumerTransport.iceParameters,
            iceCandidates: consumerTransport.iceCandidates,
            dtlsParameters: consumerTransport.dtlsParameters,
            sctpParameters: consumerTransport.sctpParameters
          }
        });
      } catch (error) {
        console.error('Error creating new transports:', error);
        socket.emit('newTransportsError', { error: error.message });
      }
    });

    socket.on('disconnect', () => {
      // Cleanup transports, producers, and consumers
      for (const [id, transport] of this.transports) {
        if (transport.appData.socketId === socket.id) {
          transport.close();
          this.transports.delete(id);
        }
      }
    });
  }

  private async createWebRtcTransport(): Promise<WebRtcTransport> {
    const transport = await this.router!.createWebRtcTransport({
      ...config.mediasoup.webRtcTransport,
      enableSctp: true,
      numSctpStreams: { OS: 1024, MIS: 1024 }
    });

    await transport.setMaxIncomingBitrate(config.mediasoup.webRtcTransport.maxIncomingBitrate);

    return transport;
  }
}

const mediaServer = new MediaServer();
mediaServer.init().catch(error => {
  console.error('Failed to initialize media server:', error);
  process.exit(1);
});