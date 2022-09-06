require('dotenv').config();
import { program } from 'commander';
import ora from 'ora';
import { bold } from 'chalk';

import { getPersons } from './option/person/getPersons.js';
import { getPerson } from './options/person/getPerson.js';

program
  .name('moviedb-cli')
  .description('CLI to make requests to themoviedb.org')
  .version('0.1.0');

program
  .command('getPersons')
  .option('getPersons --page')
  .option('--type')
  .description(`Get persons data`);
program
  .command('getPerson')
  .option('getPerson ')
  .option('--id')
  .description(`Get data of specific person`);
program
  .command(`getMovies`)
  .option('getMovies --page')
  .option('--type')
  .description(`Get data of differents types of movies`);
program
  .command(`getMovie`)
  .option('getMovie')
  .option('--id')
  .description(`Get data of specific movie`);
// program.option('--help');

program.parse();

function start() {
  const input = program.args;
  switch (input[0]) {
    case 'getPersons':
      if (
        Number(input[2]) > 0 &&
        (input[4] === 'latest' || input[4] === 'popular')
      ) {
        getPersons(input[2], input[4]);
      } else {
        console.log(
          `${bold(
            `Something unexpected happened, check the parameters of the entered command.`
          )}`
        );
      }
      break;
    case 'getPerson':
      if (!isNaN(Number(input[2]))) {
        getPerson(input[2]);
      } else {
        console.log(input);
        console.log(
          `${bold(
            `Something unexpected happened, check the id parameter of the command.`
          )}`
        );
      }
      break;
    case 'getMovies':
      console.log(`tu quieres ver movies`);
      break;
    case 'getMovie':
      console.log(`tu quieres ver una pelicula`);
      break;
    case 'help':
      console.log('tu quieres ayuda');
      break;
    default:
      console.log('ayuda');
  }
}

start();