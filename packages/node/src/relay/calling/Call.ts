import logger from '../../../../common/src/util/logger'
import Calling from './Calling'
import { Execute } from '../../../../common/src/messages/Blade'
import { cleanNumber } from '../../../../common/src/util/helpers'
import { registerOnce, deRegister, trigger } from '../../../../common/src/services/Handler'
import { ICall, ICallOptions } from '../../../../common/src/util/interfaces'
import { CallState, CallType, DisconnectReason, CALL_STATES } from '../../../../common/src/util/constants/relay'

// interface DeepArray<T> extends Array<T | DeepArray<T>> { }
// type ConnectParams = string | DeepArray<string>

const _detectCallType = (to: string): string => {
  // TODO: check call type by "to"
  return CallType.Phone
}

export default class Call implements ICall {
  public id: string
  public nodeId: string
  public type: string

  private _prevState: number = 0
  private _state: number = 0
  private _cbQueues: { [state: string]: Function } = {}
  private _from_number: string = ''
  private _to_number: string = ''

  constructor(protected relayInstance: Calling, protected options: ICallOptions) {
    console.log('Creating a Call', options)
    this._attachListeners = this._attachListeners.bind(this)
    this._detachListeners = this._detachListeners.bind(this)
    const { type, to_number } = options
    this.type = type ? type : _detectCallType(to_number)
  }

  async begin() {
    const { protocol, session } = this.relayInstance
    const msg = new Execute({
      protocol,
      method: 'call.begin',
      params: {
        type: this.type,
        params: this.beginParams
      }
    })

    const response = await session.execute(msg).catch(error => error)
    const { result } = response
    if (!result) {
      logger.error('Begin call', response)
      throw 'Error creating the call'
    }
    const { call_id, code, node_id } = result
    if (code !== '200') {
      logger.error('Begin call not 200', call_id, code, node_id)
      throw 'Error creating the call'
    }
    this.id = call_id
    this.nodeId = node_id
    this._state = CallState.created
    this._attachListeners()

    trigger(this.id, null, this.state, false)
  }

  async hangup() {
    const { protocol, session } = this.relayInstance
    const msg = new Execute({
      protocol,
      method: 'call.end',
      params: {
        node_id: this.nodeId,
        call_id: this.id,
        reason: DisconnectReason.Hangup
      }
    })

    const result = await session.execute(msg).catch(error => error)
    logger.debug('Hangup call:', result)
  }

  async answer() {
    const { protocol, session } = this.relayInstance
    const msg = new Execute({
      protocol,
      method: 'call.answer',
      params: {
        node_id: this.nodeId,
        call_id: this.id
      }
    })

    const result = await session.execute(msg).catch(error => error)
    logger.debug('Answer call:', result)
  }

  async join(callsToJoin: Call | Call[]) {
    let calls = []
    if (callsToJoin instanceof Array) {
      calls = callsToJoin.map((c: Call) => c.id)
    } else if (callsToJoin instanceof Call) {
      calls = [callsToJoin.id]
    } else {
      throw `Unknow parameter type for join. ${callsToJoin}`
    }
    if (!calls.length) {
      throw `No Calls to join`
    }
    const { protocol, session } = this.relayInstance
    const msg = new Execute({
      protocol,
      method: 'call.join',
      params: {
        node_id: this.nodeId,
        call_id: this.id,
        calls
      }
    })

    const result = await session.execute(msg).catch(error => error)
    logger.debug('Join calls:', result)
  }

  async connect(...peers: any[]) { // FIXME: remove any[]
    const change = (e: any) => {
      if (e instanceof Array) {
        return e.map(change)
      }
      if (typeof e === 'string') {
        return [{ type: _detectCallType(e), params: { to_number: cleanNumber(e), timeout: 50 } }]
      }
      if (typeof e === 'object') {
        const { to_number, timeout = 50 } = e
        return [{ type: _detectCallType(to_number), params: { to_number: cleanNumber(to_number), timeout } }]
      }
    }
    const devices = peers.map(change)
    if (!devices.length) {
      throw `No peers to connect!`
    }
    const { protocol, session } = this.relayInstance
    const msg = new Execute({
      protocol,
      method: 'call.connect',
      params: {
        node_id: this.nodeId,
        call_id: this.id,
        from_number: this._from_number,
        devices
      }
    })
    logger.debug('Connect msg:', msg)

    const result = await session.execute(msg).catch(error => error)
    logger.debug('Connect to calls:', result)
  }

  get prevState() {
    return CallState[this._prevState]
  }

  get state() {
    return CallState[this._state]
  }

  get beginParams() {
    switch (this.type) {
      case CallType.Phone: {
        const { from_number, to_number } = this.options
        this._from_number = cleanNumber(from_number)
        this._to_number = cleanNumber(to_number)
        return { from_number: this._from_number, to_number: this._to_number }
      }
      case CallType.Sip: {
        // TODO: handle SIP params
        const { from_number, to_number } = this.options
        this._from_number = cleanNumber(from_number)
        this._to_number = cleanNumber(to_number)
        return { from_number: this._from_number, to_number: this._to_number }
      }
      case CallType.WebRTC: {
        // TODO: handle WebRTC params
        const { from_number, to_number } = this.options
        this._from_number = cleanNumber(from_number)
        this._to_number = cleanNumber(to_number)
        return { from_number: this._from_number, to_number: this._to_number }
      }
    }
    return {}
  }

  on(eventName: string, callback: Function) {
    const eventPermitted = CallState[eventName] && !isNaN(Number(CallState[eventName]))
    if (eventPermitted && this._state >= CallState[eventName]) {
      callback()
    } else if (eventPermitted && this.id) {
      registerOnce(this.id, callback, eventName)
    }
    this._cbQueues[eventName] = callback
    return this
  }

  off(eventName: string, callback?: Function) {
    if (this.id) {
      deRegister(this.id, callback, eventName)
    }
    delete this._cbQueues[eventName]
    return this
  }

  private _onStateChange(newState: string) {
    this._prevState = this._state
    this._state = CallState[newState]
    if (this._cbQueues.hasOwnProperty(newState)) {
      this._cbQueues[newState](this)
    }
    return this
  }

  private _attachListeners() {
    registerOnce(this.id, this._detachListeners, CALL_STATES[CALL_STATES.length - 1])
    CALL_STATES.forEach(state => registerOnce(this.id, this._onStateChange.bind(this, state), state))
  }

  private _detachListeners() {
    CALL_STATES.forEach(state => deRegister(this.id, null, state))
  }
}
