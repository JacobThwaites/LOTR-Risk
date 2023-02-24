# Lord of the Rings Risk 

A web based implementation of the board game 'Lord of the Rings Risk', built using TypeScript and React.js. 

<img src='./public/gameplay-example.png' alt='gameplay image' width='375' height='450'>

### Running Locally
This project requires TypeScript and React to run. It can be run locally using the following commands:

```
npm install
npm start
```
The app will then be viewable at [http://localhost:3000](http://localhost:3000) 


### Running Tests
The project uses mocha and chai for unit testing. To run these locally, amend the tsconfig.json file 'module' parameter from "esnext" to "commonjs". Then inside the
terminal run:
```
npm run testts
```
