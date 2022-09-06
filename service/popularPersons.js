import { request } from 'node:https';
import ora from 'ora';
import { red } from 'chalk';

const getPopularPersons = async (page) => {
  const spinner = ora('Fetching Populars Persons');

  const { formatResponse } = require('../options/person/getPersons');
  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${page}`,
    method: 'GET',
  };

  const req = await request(options, (res) => {
    spinner.start();
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Connecting ';
    }, 1000);
    spinner.color = 'green';
    spinner.text = 'Fetching Data';
    let data = '';
    res.on('data', (d) => {
      data = data + d;
    });

    res.on('end', () => {
      const body = JSON.parse(data);
      if (body.status_code) {
        console.log('\n' + red(body.status_message));
        spinner.fail(`Something went wrong 😰`);
        return;
      }
      formatResponse(body);
      setTimeout(() => {
        getPopularPersons(page);
        spinner.succeed('All done 🥳');
        spinner.stop();
      }, 1500);
    });
  });

  req.end();
};

export default {
  getPopularPersons,
};