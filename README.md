# word-problems

A site intended to:

1. Programmatically generate word problem worksheets for children to practice their math with, and
2. Provide a front-end UI for easily customizing these worksheets

## Development Setup

### Client

To build the webpack bundle (and watch for new changes) run `npm run watch`.

### Server

To run the developer server, first make sure you have [Poetry](https://python-poetry.org/) installed.

Now, in another terminal, run `poetry run python3 -m server.app`.

You should now be able to preview the site at `localhost:5000`.