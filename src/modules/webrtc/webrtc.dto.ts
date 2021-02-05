export class WebRTCTokenRequest {
  session: string
  userId: number
}

export class WebRTCDeleteTokenRequest {
  session: string
  token: string
}