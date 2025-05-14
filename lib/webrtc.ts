import { Device } from 'mediasoup-client';
import { io, Socket } from 'socket.io-client';
import 'webrtc-adapter';

export class WebRTCClient {
  private device: Device;
  private socket: Socket;
  private producerTransport: any;
  private consumerTransport: any;
  private producer: any;
  private consumer: any;
  private stream: MediaStream | null = null;

  constructor() {
    this.device = new Device();
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to signaling server');
    });

    this.socket.on('routerRtpCapabilities', async (routerRtpCapabilities) => {
      await this.device.load({ routerRtpCapabilities });
    });

    this.socket.on('producerTransportCreated', async (params) => {
      this.producerTransport = this.device.createSendTransport(params);
      this.setupProducerTransportListeners();
    });

    this.socket.on('consumerTransportCreated', async (params) => {
      this.consumerTransport = this.device.createRecvTransport(params);
      this.setupConsumerTransportListeners();
    });
  }

  private setupProducerTransportListeners() {
    this.producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        await this.socket.emit('connectProducerTransport', { dtlsParameters });
        callback();
      } catch (error) {
        errback(error);
      }
    });

    this.producerTransport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
      try {
        const { id } = await this.socket.emit('produce', {
          transportId: this.producerTransport.id,
          kind,
          rtpParameters,
        });
        callback({ id });
      } catch (error) {
        errback(error);
      }
    });
  }

  private setupConsumerTransportListeners() {
    this.consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        await this.socket.emit('connectConsumerTransport', { dtlsParameters });
        callback();
      } catch (error) {
        errback(error);
      }
    });
  }

  async startStream(videoElement: HTMLVideoElement) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      videoElement.srcObject = this.stream;
      
      const track = this.stream.getVideoTracks()[0];
      this.producer = await this.producerTransport.produce({
        track,
        encodings: [
          { maxBitrate: 100000 },
          { maxBitrate: 300000 },
          { maxBitrate: 900000 }
        ],
        codecOptions: {
          videoGoogleStartBitrate: 1000
        }
      });
    } catch (error) {
      console.error('Error starting stream:', error);
      throw error;
    }
  }

  async watchStream(streamId: string, videoElement: HTMLVideoElement) {
    try {
      const { producerId } = await this.socket.emit('consume', {
        rtpCapabilities: this.device.rtpCapabilities,
        streamId
      });

      this.consumer = await this.consumerTransport.consume({
        id: producerId,
        producerId,
        kind: 'video',
        rtpParameters: {}
      });

      videoElement.srcObject = new MediaStream([this.consumer.track]);
    } catch (error) {
      console.error('Error watching stream:', error);
      throw error;
    }
  }

  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.producer) {
      this.producer.close();
    }
    if (this.consumer) {
      this.consumer.close();
    }
  }

  disconnect() {
    this.stopStream();
    if (this.producerTransport) {
      this.producerTransport.close();
    }
    if (this.consumerTransport) {
      this.consumerTransport.close();
    }
    this.socket.disconnect();
  }
}