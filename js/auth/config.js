export const config = {
  github: {
    clientID: process.env.GITHUB_CLIENT_ID_DEV || process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV || process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_DEV_GITHUB || "https://vote-on-it.now.sh/auth/github/callback"
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY_DEV || process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET_DEV || process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_DEV_TWITTER || "https://vote-on-it.now.sh/auth/twitter/callback"
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID_DEV || process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV || process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_DEV_GOOGLE || "https://vote-on-it.now.sh/auth/google/callback"
  }
}
