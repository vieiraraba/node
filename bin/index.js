#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const apiKey = process.env.REACT_APP_API_KEY;

const options = yargs
  .usage("Usage: -n <name>")
  .option("n", {
    alias: "name",
    describe: "Your name",
    type: "string",
    demandOption: true,
  }).argv;

const greeting = `Hello, ${options.name}!`;
console.log(greeting);

fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`)
  .then(res => console.log(res))