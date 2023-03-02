# Browser and API load testing with Playwright and Artillery 
## Run Playwright tests locally:
1. Clone this repository
2. Go to the folder
3. Run `npm install`
4. Run `npx playwright install` 
4. Run `npx playwright test spectate.spec.js --repeat-each 1 --workers 1`

## Run Artillery tests using Docker:
1. Clone this repository
2. Go to the folder
3. Edit entrypoint.sh
3. Run `docker-compose up -d`