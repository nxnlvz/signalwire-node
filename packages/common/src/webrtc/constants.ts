import { CallOptions } from './interfaces'

export enum PeerType {
  Offer = 'offer',
  Answer = 'answer'
}

export enum Direction {
  Inbound = 'inbound',
  Outbound = 'outbound'
}

export enum VertoMethod {
  Invite = 'verto.invite',
  Attach = 'verto.attach',
  Answer = 'verto.answer',
  Info = 'verto.info',
  Display = 'verto.display',
  Media = 'verto.media',
  Event = 'verto.event',
  Bye = 'verto.bye',
  Punt = 'verto.punt',
  Broadcast = 'verto.broadcast',
  Subscribe = 'verto.subscribe',
  Unsubscribe = 'verto.unsubscribe',
  ClientReady = 'verto.clientReady',
  Modify = 'verto.modify',
  MediaParams = 'verto.mediaParams',
  Prompt = 'verto.prompt',
  JsApi = 'jsapi',
  Stats = 'verto.stats',
  Ping = 'verto.ping',
  Announce = 'verto.announce',
}

export enum Notification {
  Generic = 'event',
  ParticipantData = 'participantData',
  ConferenceUpdate = 'conferenceUpdate',
  CallUpdate = 'callUpdate',
  VertoClientReady = 'vertoClientReady',
  UserMediaError = 'userMediaError',
  RefreshToken = 'refreshToken',
  Prompt = 'prompt',
  Announce = 'announce',
  DeviceUpdated = 'deviceUpdated',
  MediaParams = 'mediaParams',
  ConferenceListBootstrap = 'conferenceListBootstrap',
  ConferenceListAdd = 'conferenceListAdd',
  ConferenceListModify = 'conferenceListModify',
  ConferenceListDelete = 'conferenceListDelete',
}

export enum RTCErrorCode {
  IncompatibleDestination = 'INCOMPATIBLE_DESTINATION',
  IceGatheringFailed = 'ICE_GATHERING_FAILED',
  DeviceError = 'DEVICE_ERROR',
}

export const DEFAULT_CALL_OPTIONS: CallOptions = {
  destinationNumber: '',
  remoteCallerName: 'Outbound Call',
  remoteCallerNumber: '',
  callerName: '',
  callerNumber: '',
  audio: true,
  video: true,
  useStereo: false,
  attach: false,
  screenShare: false,
  secondSource: false,
  userVariables: {},
  requestTimeout: 10 * 1000,
  experimental: false,
  autoApplyMediaParams: true,
  iceGatheringTimeout: 2 * 1000,
  maxIceGatheringTimeout: 5 * 1000,
  maxConnectionStateTimeout: 3 * 1000,
}

export enum State {
  New,
  Requesting,
  Trying,
  Recovering,
  Ringing,
  Answering,
  Early,
  Active,
  Held,
  Hangup,
  Destroy,
  Purge
}

export enum Role {
  Participant = 'participant',
  Moderator = 'moderator',
}

export enum ConferenceAction {
  Join = 'join',
  Leave = 'leave',
  Bootstrap = 'bootstrap',
  Add = 'add',
  Modify = 'modify',
  Delete = 'delete',
  Clear = 'clear',
  ChatMessage = 'chatMessage',
  LayerInfo = 'layerInfo',
  LogoInfo = 'logoInfo',
  LayoutInfo = 'layoutInfo',
  LayoutList = 'layoutList',
  ModCmdResponse = 'modCommandResponse',
  ConferenceInfo = 'conferenceInfo',
  CaptionInfo = 'captionInfo',
  MemberTalkState = 'memberTalkState',
  MemberMsState = 'memberMsState',
}

export enum DeviceType {
  Video = 'videoinput',
  AudioIn = 'audioinput',
  AudioOut = 'audiooutput'
}
