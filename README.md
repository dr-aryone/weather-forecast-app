## weather-forecast-app

Run locally

`$ yarn install && yarn start`

then go to `http://localhost:3000/`

## About

This website was built using a CRA (create-react-app) boilerplate and React Router for router handling.  
The extra dependencies added were:
 - react-router
 - classnames
 - es6-promise
 - isomorphic-fetch

 As CRA still does not offer initial support to Sass, the following dependecies were used:
  - node-sass-chokidar
  - npm-run-all

### CSS
  This project uses BEM methodology for structuring CSS classes. As the entire project follows a component based approach, the CSS rules were also implemented in that way.

  Variables were created for naming colors that should be used throughout the project. The file to be imported is available in the `styles` folder.

  A mixis were created to handle media queries for mobile devices. This can be easily extended to support more specific resolutions.

### JavaScript
In the `src` directory you'll find the files for all the components used. Each folder is associated with a component and its stylesheet.

The `utils` folder holds the `fetch` method used in all the requests. This project creates a wrapper for the `fetch` method in order to avoid having to handle returning of JSON for each request in each component.

The import of files inside components follows the order:
 - External libraries, such as `react`, `classnames`, `react-responsive`, etc;
 - Local resources and utilities, such as `fetch`, images, etc;
 - Local components either within the same folder and outside;
 - Stylesheets.

## Known Issues
 - As this projects uses React Router, there is a known issue regarding accessing URLs not via the home page. If you try to directly acess `city/teresina` for instance, you will get a 404 page. This can be fixed by using Hash Router available in React Router package, but that comes with a less intuitive URL.
