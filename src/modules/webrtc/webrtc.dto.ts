export class WebRTCTokenRequest {
  session: string
  userId: string
}

export class WebRTCDeleteTokenRequest {
  session: string
  token: string
}