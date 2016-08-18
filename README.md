
# PubSpot (pubspot)

> HubSpot beer tracker

## Running the project

To start the server, which includes the backend and serving static assets (frontend):
```bash
$ npm start
```

To build the frontend automatically as changes are made:
```bash
$ npm run build-dev
```

Additional setup:
Config variables expected are located in `config.js`. You will need a MongoDB instance running locally.
Specify the URL via `MONGODB_URI` (defaults to `mongodb://localhost/local`)
A BreweryDB key is required to fetch data about the beers. Go to http://www.brewerydb.com/developers and create an account to generate a key, then specifiy it via the `BREWERYDB_KEY` environment variable.

Slack setup (optional):
To enable Slack notifications, set the `SLACK_WEBHOOK` and `SLACK_CHANNEL` variables.
