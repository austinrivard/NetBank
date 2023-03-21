# NetBank
CS160 Team Project

# How to run
from the folder where you want to clone the repo, run the command
`git clone <repo-url>`

then open a terminal in the app's root folder `netbank/` (where the pom.xml is kept)
create a new file called `env.properties` if it doesn't already exist
add a single line to the env.properties file:
`DB_CONNECT_URL=jdbc:sqlserver://{your_db_url_here};database=UserInfo;user=group2@cs160sql;password={your_password_here};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;`

this is the connect string that spring boot will need to connect to the Azure SQL database on startup, but it is currently disabled because we commented out the line in `/src/main/resources/application.properties` which sets the spring datasource url, meaning that spring boot uses the default in-memory database instead.
this is easier for development purposes but once we figure out the database schema and get some test data or something else in it then it should be fine to use the Azure SQL db

then run the command
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
