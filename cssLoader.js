const fs = require('fs');
const axios = require('axios');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);

const loadStyles = (filepath) => {
  exists(`${filepath}/styles.css`)
  .then(()=> {
    console.log('already have the css');
  })
  .catch((e) =>{
    if(e.code === 'ENOENT') {
      console.log('loading CSS');
      axios.get('http://localhost:3001/bundledata/styles.css')
      .then(res=>res.data)
      .then(data => {
        fs.writeFile(`${filepath}/styles.css`, data, (e) => {
          console.log('loaded the CSS');
        })
      })
      .catch(e => {
        console.log(e);
      }); // GETS CSS
    } else {
      console.log('unknown error');
    }
  });
};

module.exports = loadStyles;