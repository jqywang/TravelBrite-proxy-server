require('newrelic');
const express = require('express')
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const clientBundles = '/home/jqywang/Documents/HackReactor/tripadvisor/jeff-proxy/proxy/public/services';
const serverBundles = '/home/jqywang/Documents/HackReactor/tripadvisor/jeff-proxy/proxy/templates/services';
const serviceConfig = require('./service-config.json');
const services = require('../loader.js')(clientBundles, serverBundles, serviceConfig);
const loadStyles = require('../cssLoader.js');

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

loadStyles(path.join(__dirname, 'public')); //loading CSS into public folder


const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};
// app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));





// app.use('/:listing_id', express.static(path.join(__dirname, 'public')));

//bryan
// app.use('/lib', express.static(path.join(__dirname, 'public/lib')));
// app.use('/services', express.static(path.join(__dirname, 'public/services')));

app.get('/:listing_id', function(req, res) {
  let components = renderComponents(services, {id: req.params.listing_id});
  res.end(Layout(
    'FoxSteedAdvisor',
    App(...components),
    Scripts(Object.keys(services))
  ));
});


// app.use('/reviews', (req, res) => {
//   axios.get(`http://localhost:3001${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //eric
// app.use('/overview', (req, res) => {
//   axios.get(`http://overview:3002${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //kirk
// app.use('/nearby', (req, res) => {
//   axios.get(`http://nearby:3003${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //kyle
// app.use('/q-and-a', (req, res) => {
//   axios.get(`http://q-and-a:3004${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //zack
// app.use('/recommendations', (req, res) => {
//   axios.get(`http://recommendations:3005${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});