# Weather Dashboard + CI Testing

A lightweight browser-based weather dashboard with automated tests and a GitHub Actions workflow.

## Scripts

- `npm test` runs the Node test suite.
- `npm start` serves the project locally at `http://localhost:4173`.

## Project Structure

- `index.html` contains the dashboard shell.
- `src/` contains styling, data, and rendering logic.
- `test/` contains the automated test suite.
- `.github/workflows/ci.yml` runs tests on pushes and pull requests.
