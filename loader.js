const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);

const loadBundle = (cache, item, filename) => {
  setTimeout(() => {
    console.log(`loading: ${filename}`);
    cache[item] = require(filename).default;    
  }, 2000);
};

const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach(item => {
    const filename = `${path}/${item}${suffix}.js`;
    exists(filename)
      .then(() => {
        require ? loadBundle(services, item, filename) : null;
      })
      .catch(err => {
        if(err.code === 'ENOENT') {
          const url = `${services[item]}${suffix}.js`;
          console.log('fetching: ', url);
          fetch(url)
            .then(res => {
              const dest = fs.createWriteStream(filename);
              res.body.pipe(dest);
              console.log(res.body._events.end);
              console.log(filename);
              res.body.on('end', () => {
                require ? loadBundle(services, item, filename) : null;
              });
            });
        } else {
          console.log('warning: unknown fs error');
        }
      });
  });
};

module.exports = (clientPath, serverPath, services) => {
  fetchBundles(clientPath, services, '/app');
  fetchBundles(serverPath, services, '/app-server', true);
  console.log(services);
  return services;
};
