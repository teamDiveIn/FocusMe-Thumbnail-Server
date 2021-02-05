import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { verifyToken } from './auth.jwt.util'

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  public async use(req: Request, res: Response, next: Function) {
    const userId = await this.parseUserId(req)

    const anyReq = req as any

    anyReq.user = { id: userId }

    return next()
  }

  /**
   * userId가 존재하면 반환한다.
   * @param req
   * @return null or number
   */
  private async parseUserId(req: Request): Promise<number> {
    // userId 파싱
    let userId: number = null
    try {
      const { authorization } = req.headers

      const token = authorization.replace('Bearer ', '').replace('bearer ', '')
      const decoded = await verifyToken(token)
      userId = decoded.user_idx
    } catch (e) {} /* eslint no-empty: "off" */

    return userId
  }
}
