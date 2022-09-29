export interface CallOptions {
  // Required
  destinationNumber: string
  remoteCallerName: string
  remoteCallerNumber: string
  callerName: string
  callerNumber: string
  // Optional
  id?: string
  remoteSdp?: string
  localStream?: MediaStream
  remoteStream?: MediaStream
  localElement?: HTMLMediaElement | string | Function
  remoteElement?: HTMLMediaElement | string | Function
  iceServers?: RTCIceServer[]
  audio?: boolean | MediaTrackConstraints
  video?: boolean | MediaTrackConstraints
  attach?: boolean
  useStereo?: boolean
  micId?: string
  micLabel?: string
  camId?: string
  camLabel?: string
  speakerId?: string
  userVariables?: { [key: string]: any }
  screenShare?: boolean
  secondSource?: boolean
  recoverCall?: boolean
  skipNotifications?: boolean
  skipLiveArray?: boolean
  onNotification?: Function
  googleMaxBitrate?: number
  googleMinBitrate?: number
  googleStartBitrate?: number
  negotiateAudio?: boolean
  negotiateVideo?: boolean
  sfu?: boolean
  simulcast?: boolean | number[]
  msStreamsNumber?: number
  requestTimeout?: number
  shakenCheck?: string
  shakenResult?: string
  experimental?: boolean
  autoApplyMediaParams?: boolean
  rtcPeerConfig?: { [key: string]: any }
  iceGatheringTimeout?: number
  maxIceGatheringTimeout?: number
  maxConnectionStateTimeout?: number
  watchAudioPackets?: boolean
  watchAudioPacketsTimeout?: number
}

export interface ICantinaUser {
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar: string
  project: string
  jwt_token: string
  scopes: string[]
  config?: object
}

export interface VertoPvtData {
  callID: string
  nodeId?: string
  action: string
  laChannel: string
  laName: string
  role: string
  chatID: string
  conferenceMemberID: number
  canvasCount: string
  modChannel: string
  chatChannel: string
  infoChannel: string
  conferenceName: string
  conferenceDisplayName: string
  conferenceMD5: string
  conferenceUUID: string
}

export interface IVertoCanvasInfo {
  canvasID: number
  totalLayers: number
  layersUsed: number
  layoutFloorID: number
  layoutName: string
  canvasLayouts: IVertoCanvasLayout[]
  scale: number
}

export interface IVertoCanvasLayout {
  x: number
  y: number
  scale: number
  hscale: number
  zoom: number
  border: number
  floor: number
  overlap: number
  screenWidth: number
  screenHeight: number
  xPOS: number
  yPOS: number
  audioPOS: string
  memberID: number
  layerOccupied: boolean
}

export interface ICanvasInfo {
  canvasId: number
  totalLayers: number
  layersUsed: number
  layoutFloorId: number
  layoutName: string
  canvasLayouts: ICanvasLayout[]
  scale: number
  layoutOverlap: boolean
}

export interface ICanvasLayout {
  x: number
  y: number
  startX: string
  startY: string
  percentageWidth: string
  percentageHeight: string
  scale: number
  hscale: number
  zoom: number
  border: number
  floor: number
  overlap: number
  screenWidth: number
  screenHeight: number
  xPos: number
  yPos: number
  audioPos: string
  participantId: string
}

export interface IHangupParams {
  code?: string
  cause?: string
  causeCode?: number
  redirectDestination?: any
}

export interface ICallParticipant {
  id: string
  role: string
  layer: ICanvasLayout
  layerIndex: number
  isLayerBehind: boolean
}

export interface IConferenceInfoMember {
  participantId: string
  callId: string
  participantNumber: string
  participantName: string
}

interface IConferenceZone {
  id: string
  name: string
  extVol: number
}

export interface IConferenceInfo {
  uuid: string
  md5: string
  domain: string
  running: boolean
  laName: string
  laChannel: string
  infoChannel: string
  chatChannel: string
  modChannel: string
  confName: string
  numMembers: number
  isPrivate: boolean
  mohPlaying: boolean
  filePlaybackRole: string
  filesPlaying: boolean
  filesRole: string
  filesPlayingName: string
  filesPlayingVolume: number
  filesPlayingPaused: boolean
  filesSeekable: boolean
  asyncFilesPlaying: boolean
  asyncFilesRole: string
  asyncFilesPlayingName: string
  asyncFilesPlayingVolume: number
  asyncFilesPlayingPaused: boolean
  asyncFilesSeekable: boolean
  performerDelay: number
  volAudience: number
  filesFullScreen: boolean
  vidFloorRole: string
  motionQuality: number
  motionQualityInbound: number
  videoShuffle: number | string
  zones: IConferenceZone[]
  maxVisible: number
  // flags
  silentMode: boolean
  blindMode: boolean
  meetingMode: boolean
  locked: boolean
  recording: boolean
  personalCanvas: boolean
  personalCanvasTP: number
  liveMusic: boolean
  vidMuteHide: boolean
  logosVisible: boolean
  handraiseOnscreen: boolean
  // variables
  publicClipeeze: boolean
  confQuality: string
  accessPin: string
  moderatorPin: string
  speakerHighlight: boolean
  disableIntercom: boolean
  lastSnapshot: string
  lastLayoutGroup: string
  lastLayout: string
  members?: IConferenceInfoMember[]
  layouts?: any
  userRecordFile: string
  podcastMode: boolean
  publicDisableChat: boolean
  chatOneWay: boolean
  bannerDisplayOption: string
  defaultPlayVolume: number
  hasSms: boolean
  autoOpenNav: boolean
  customCanvas: string[]
  customEmpty: string[]
  customAlone: string[]
}

export interface ILayout {
  id: string
  label: string
  type: string
  reservationIds: string[]
  belongsToAGroup: boolean
}

export interface IVertoLayout {
  name: string
  displayName?: string
  type: string
  resIDS: string[]
  groupLayouts?: string[]
}

export interface IVertoConferenceListParams {
  showLayouts?: boolean
  showMembers?: boolean
  activeSession?: string
}
