import { request } from 'node:https';
import { red } from 'chalk';
import ora from 'ora';

const getPersonById = async (id) => {
  const { formatPerson } = require('../options/person/getPerson');
  const spinner = ora('Fetching Populars Persons');

  const options = {
    hostname: `api.themoviedb.org`,
    path: `/3/person/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`,
    method: 'GET',
  };

  const req = await request(options, (res) => {
    spinner.start();
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Connecting ';
    }, 1000);

    spinner.color = 'green';
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
      formatPerson(body);
      spinner.succeed('All done 🥳');
      spinner.stop();
    });
  });

  req.end();
};

export default {
  getPersonById,
};