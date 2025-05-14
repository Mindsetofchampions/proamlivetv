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

  // ICE Server configuration
  private iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      {
        urls: process.env.NEXT_PUBLIC_TURN_URL || 'turn:your-turn-server.com:3478',
        username: process.env.NEXT_PUBLIC_TURN_USERNAME || 'username',
        credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL || 'credential'
      }
    ]
  };

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
      // Add ICE servers to transport parameters
      params.iceServers = this.iceServers.iceServers;
      this.producerTransport = this.device.createSendTransport(params);
      this.setupProducerTransportListeners();
    });

    this.socket.on('consumerTransportCreated', async (params) => {
      // Add ICE servers to transport parameters
      params.iceServers = this.iceServers.iceServers;
      this.consumerTransport = this.device.createRecvTransport(params);
      this.setupConsumerTransportListeners();
    });

    // Handle ICE connection state changes
    this.socket.on('iceConnectionStateChange', (state) => {
      console.log('ICE connection state:', state);
      if (state === 'failed' || state === 'disconnected') {
        this.handleIceFailure();
      }
    });
  }

  private async handleIceFailure() {
    console.log('ICE connection failed, attempting reconnection...');
    // Close existing transports
    if (this.producerTransport) {
      this.producerTransport.close();
    }
    if (this.consumerTransport) {
      this.consumerTransport.close();
    }
    
    // Request new transports
    try {
      await this.socket.emit('requestNewTransports');
    } catch (error) {
      console.error('Failed to request new transports:', error);
    }
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

    // Monitor ICE connection state
    this.producerTransport.on('connectionstatechange', (state: string) => {
      console.log('Producer transport connection state:', state);
      this.socket.emit('iceConnectionStateChange', state);
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

    // Monitor ICE connection state
    this.consumerTransport.on('connectionstatechange', (state: string) => {
      console.log('Consumer transport connection state:', state);
      this.socket.emit('iceConnectionStateChange', state);
    });
  }

  async startStream(videoElement: HTMLVideoElement) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      videoElement.srcObject = this.stream;
      
      const videoTrack = this.stream.getVideoTracks()[0];
      const audioTrack = this.stream.getAudioTracks()[0];

      // Create video producer with simulcast
      this.producer = await this.producerTransport.produce({
        track: videoTrack,
        encodings: [
          { maxBitrate: 100000, scaleResolutionDownBy: 4 },
          { maxBitrate: 300000, scaleResolutionDownBy: 2 },
          { maxBitrate: 900000, scaleResolutionDownBy: 1 }
        ],
        codecOptions: {
          videoGoogleStartBitrate: 1000
        }
      });

      // Create audio producer
      if (audioTrack) {
        await this.producerTransport.produce({
          track: audioTrack,
          codecOptions: {
            opusStereo: true,
            opusDtx: true
          }
        });
      }
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