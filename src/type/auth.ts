export interface SignInWithPasswordRequest {
  email: string
  password: string
}

export interface SignInWithPasswordResponse {
  token: string
}
