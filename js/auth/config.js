export const config = {
  github: {
    clientID: process.env.GITHUB_CLIENT_ID_DEV || process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV || process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_DEV_GITHUB || "https://fcc-vote-app-jp.glitch.me/auth/github/callback"
  }
}
