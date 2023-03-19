# NetBank
CS160 Team Project

# How to run
from the folder where you want to clone the repo, run the command
`git clone <repo-url>`

then from the app's root folder (where the pom.xml is kept)
`mvn clean install`

then
`mvn spring-boot:run`

you should see it output a successful startup message.
to test, navigate in your browser to `localhost:8080`
you should see the basic react app page

# How to set up React app live reload
from the src/main/frontend folder, run the command
`npm start`

for interacting with the API, run spring boot app at the same time

recommended to install [React Developer Tools](https://react.dev/learn/react-developer-tools)
this adds a React Components tab to the dev tools in your browser and allows state viewing/editing
