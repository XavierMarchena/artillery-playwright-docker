#!/bin/bash

# Start the friendly load test
npm run test:friendly && npm run test:report

# Start the random load test
#npm run test:random && npm run test:report

# Start the browser test
#npx playwright test spectate.spec.js --repeat-each 2 --workers 2