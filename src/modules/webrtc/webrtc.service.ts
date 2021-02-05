import { OpenVidu, OpenViduRole } from 'openvidu-node-client'
import { BadRequestException, Injectable } from '@nestjs/common'
import { WebRTCTokenRequest, WebRTCDeleteTokenRequest } from './webrtc.dto'
import { format } from 'date-fns'

const OPENVIDU_URL = 'https://open.focusonme.ga'
const OPENVIDU_SECRET = 'MY_SECRET'

var OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET)

// 세션 MAP
var mapSessions = {}

// 해당 세션에 존재하는 토큰 리스트
var mapSessionNamesTokens = {}

@Injectable()
export class WebRTCService {
  constructor() {}

  public async getToken(data: WebRTCTokenRequest, userId: number) {
    const { session: sessionName } = data

    const serverData = JSON.stringify({
      serverData: { userId, startedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
    })

    console.log('Getting a token | {sessionName}={' + sessionName + '}')

    const connectionProperties = {
      data: serverData,
      role: OpenViduRole.PUBLISHER,
    }

    if (mapSessions[sessionName]) {
      console.log('Existing session ' + sessionName)

      const mySession = mapSessions[sessionName]

      try {
        const connection = await mySession.createConnection(connectionProperties)
        mapSessionNamesTokens[sessionName].push(connection.token)
        return { token: connection.token, tokensInSession: mapSessionNamesTokens[sessionName] }
      } catch (error) {
        // 이미 존재하는 줄 알고 개설하려하는데 에러나면 새로 세션을 만들어준다.
        const session = await OV.createSession()
        mapSessions[sessionName] = session
        mapSessionNamesTokens[sessionName] = []

        try {
          const connection = await mySession.createConnection(connectionProperties)
          mapSessionNamesTokens[sessionName].push(connection.token)
          return { token: connection.token, tokensInSession: mapSessionNamesTokens[sessionName] }
        } catch (error) {
          console.error(error)
          throw new BadRequestException()
        }
      }
    } else {
      console.log('New session ' + sessionName)

      try {
        const session = await OV.createSession()
        mapSessions[sessionName] = session
        mapSessionNamesTokens[sessionName] = []

        try {
          const connection = await session.createConnection(connectionProperties)
          mapSessionNamesTokens[sessionName].push(connection.token)

          return {
            token: connection.token,
            tokensInSession: mapSessionNamesTokens[sessionName],
          }
        } catch (error) {
          console.error(error)
          throw new BadRequestException()
        }
      } catch (error) {
        console.error(error)
        throw new BadRequestException()
      }
    }
  }

  public async deleteToken(data: WebRTCDeleteTokenRequest) {
    const { session: sessionName, token } = data

    console.log('Removing user | {sessionName, token}={' + sessionName + ', ' + token + '}')

    if (mapSessions[sessionName] && mapSessionNamesTokens[sessionName]) {
      var tokens = mapSessionNamesTokens[sessionName]
      var index = tokens.indexOf(token)

      if (index !== -1) {
        tokens.splice(index, 1)
        console.log(sessionName + ': ' + tokens.toString())
      } else {
        var msg = "Problems in the app server: the TOKEN wasn't valid"
        console.log(msg)
        throw new BadRequestException()
      }
      if (tokens.length == 0) {
        delete mapSessions[sessionName]
      }
      return 'OK'
    } else {
      console.log(msg)
      throw new BadRequestException()
    }
  }
}
