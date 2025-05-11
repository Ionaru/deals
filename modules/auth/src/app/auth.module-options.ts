export interface AuthModuleOptions {
  /**
   * Secret key used for signing tokens and encrypting sensitive data
   */
  secret: string;

  /**
   * MongoDB connection URL for authentication database
   */
  databaseUrl: string;

  /**
   * Name of the authentication database
   */
  databaseName: string;

  /**
   * Name of the cookie used to store authentication token
   */
  cookieName: string;

  /**
   * Cookie expiration time in minutes
   */
  cookieExpiry: number;

  /**
   * Flag indicating whether the application is running in production mode
   * Affects security settings like secure cookies and CORS
   */
  isProduction: boolean;
}
