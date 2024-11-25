export type Credentials = {
  email: string
  password: string
}

export type JWTPayload = {
  email: string
  sub: number
}

export type JWT = {
  token: string
}