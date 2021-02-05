import * as jwt from 'jsonwebtoken'

function getSecret(): string {
  return process.env.JWT_SECRET
}

export async function signToken(payload: Object): Promise<string> {
  return new Promise((res, rej) =>
    jwt.sign(payload, getSecret(), { expiresIn: '5y' }, (err, token) => {
      if (err) rej(err)
      res(token)
    }),
  )
}

// 검증
export async function verifyToken(token: string): Promise<any> {
  return new Promise((res, rej) =>
    jwt.verify(token, getSecret(), (err, decoded) => {
      if (err) rej(err)
      res(decoded)
    }),
  )
}

export async function makeAuthToken(id: number): Promise<string> {
  return signToken({ id })
}
