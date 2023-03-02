const Faker = require('faker');

module.exports = {
  generateRandomData, formatPendingRoomId, statusReady
}

function generateRandomData (userContext, events, done) {
  // Generate a random number between 1 and 100
  userContext.vars.randomCharacterTokenId1 = Faker.datatype.number({min: 1, max: 100});

  // Keep generating a new random number until it is different from the first one
  do {
    userContext.vars.randomCharacterTokenId2 = Faker.datatype.number({min: 1, max: 100});
  } while (userContext.vars.randomCharacterTokenId1 === userContext.vars.randomCharacterTokenId2);

  return done();
}

function formatPendingRoomId(requestSpec, response, userContext, ee, next) {
  
  userContext.vars.pendingRoomID = userContext.vars.pendingRoomID.replaceAll('\\','');
  userContext.vars.pendingRoomID = userContext.vars.pendingRoomID.replaceAll('"','');
    
  return next();
}

function statusReady(context, next) {
  const continueLooping = context.vars.status < 2;
  // While `continueLooping` is true, the `next` function will
  // continue the loop in the test scenario.
  console.log('continueLooping: ', continueLooping, 'status: ', context.vars.status, 'Count: ', context.vars.$loopCount, 'Room:', context.vars.pendingRoomID)
  return next(continueLooping);
}