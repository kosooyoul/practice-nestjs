export interface IHanulseSignInResult {
  /** 접근 토큰 */
  accessToken: string;

  /** 갱신 토큰 */
  refreshToken: string;

  /** 접근 토큰 만료 일시 */
  accessTokenExpiresIn: Date;

  /** 갱신 토큰 만료 일시 */
  refreshTokenExpiresIn: Date;
}
