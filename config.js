
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || `mongodb://localhost/local`,
  BREWERYDB_KEY: process.env.BREWERYDB_KEY,
  SLACK_WEBHOOK: process.env.SLACK_WEBHOOK,
  SLACK_CHANNEL: process.env.SLACK_CHANNEL
}
