# Prerequisites

You will need to have the lastest version of [Nodejs](https://nodejs.org/en/) installed in order to install all the required packages for this project.

## 1. Project Setup

Make a new project directory and move into it

```bash
mkdir project-name
cd project-name
```

Use npm init -y to generate a package.json file (the -y flag adds default details if you would like to add you own then run the command without -y) which will hold all of our project dependencies.

```bash
npm init -y
```

## 2. Installing Required Packages

After creating a package.json file we can now install the required packages via npm.

```bash
npm i express cors ejs mongodb
```

`npm i` is short for `npm install --save`

## 3. Connecting to Atlast

Go to your mongoDB atlast account and on your clustor click on connect, From the list of options chose 'Connect to your application'.

This will give you a long connection string copy it.

Now in server.js add the following code

```javascript
let db,
  // In your connection string replace <password> with your password and give your db a name by replacing MyFirstDataBase.
  dbConnectionStr = 'Your Connection String';
dbName = 'rap';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
});
```

## 4. Run the Server

Now we can test our connection by running the following command

```bash
node server.js
```

if everything was setup correctly we will see the string `Connected to dbName Database`.
