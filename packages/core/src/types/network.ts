/** UUID v4 peer identifier — assigned on connection */
export type PeerId = string;

/** Room identifier — formatted as `appId:collectionName` */
export type RoomId = string;

/** Information about a connected peer in the mesh network. */
export interface PeerInfo {
  /** Unique identifier for this peer */
  peerId: PeerId;
  /** W3C DID Key identifier of the peer */
  did: string;
  /** Base58-encoded Ed25519 public key of the peer */
  publicKey: string;
  /** Connection established timestamp in Unix milliseconds */
  connectedAt: number;
}

/** A message exchanged between peers over the WebRTC data channel. */
export interface NetworkMessage {
  /** Discriminator for the message kind */
  type: "sync-update" | "awareness" | "ping" | "pong";
  /** Peer ID of the sender */
  from: PeerId;
  /** Binary (Yjs update) or string (signaling metadata) payload */
  payload: Uint8Array | string;
  /** Optional Ed25519 signature for authenticity verification */
  signature?: string;
}

export interface MediaStreamTrackMetadata {
  trackId: string;
  kind: "audio" | "video";
  label: string;
  enabled: boolean;
  muted: boolean;
  readyState: MediaStreamTrackState;
}

export interface MediaStreamMetadata {
  streamId: string;
  peerId: PeerId;
  kind: "camera" | "screen" | "custom";
  audioMuted: boolean;
  videoMuted: boolean;
  tracks: MediaStreamTrackMetadata[];
  updatedAt: number;
}

export interface MediaStreamMetadataInput {
  kind?: "camera" | "screen" | "custom";
  label?: string;
  [key: string]: unknown;
}

export interface ActiveSpeakerState {
  peerId: string;
  updatedAt: number;
  audioLevel?: number;
  [key: string]: unknown;
}

export interface VideoParticipantState {
  peerId: string;
  muted: { audio: boolean; video: boolean };
  streams: Record<string, MediaStreamMetadata>;
  updatedAt: number;
  activeSpeaker?: ActiveSpeakerState;
  [key: string]: unknown;
}

