const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
}; 

const generateUrl = (userContext, events, done) => {
  const randomNum = getRandom(1, 12);
  let range = 0;
  if(randomNum % 3 === 0) {
    range = 10000;
  } else if (randomNum % 3 === 1) {
    range = 1000000;
  } else {
    range = 10000000;
  }
  userContext.vars.listing = getRandom(1, range);
  return done();
};
module.exports = {
  generateUrl
};
