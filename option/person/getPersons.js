import { getLatestPerson } from '../../services/latestPerson';
import { getPopularPersons } from '../../services/popularPersons';
import ora from 'ora';
import { white, bold, blue, magenta } from 'chalk';

const getPersons = async (page, personType) => {
  if (personType == 'popular') {
    //Call to get popular people with the page

    const spinner = ora('Fetching Populars Persons');

    // spinner.start();

    // Update
    // setTimeout(() => {
    //   spinner.color = 'yellow';
    //   spinner.text = 'Connecting ';
    // }, 1000);
    // setTimeout(() => {
    getPopularPersons(page);
    //   spinner.succeed('All done 🥳');
    //   spinner.stop();
    // }, 1500);
  } else if (personType == 'latest') {
    //Call to get lastest person with the page

    getLatestPerson(page);
  } else {
    //We must show the help information because some option was wrong
    console.log('something went wrong');
  }
};

const formatResponse = (data) => {
  const formated = data.results.map((person) => {
    return {
      id: person.id,
      name: person.name,
      department: person.known_for_department,
      movies: formatMoviesPersons(person.known_for),
    };
  });
  formated.page = data.page;
  formated.total_pages = data.total_pages;

  displayPopularPersons(formated);
};

const displayLatestPerson = (data) => {
  console.log(`\n`);
  console.log(`Person: `);
  console.log(`Person Id: ${data.id}`);
  console.log(`Person Name: ${data.name}`);
  console.log(`Person Department: ${data.known_for_department || `Acting`} `);

  console.log('--------------------------------------');
};

const formatMoviesPersons = (movies) => {
  return movies.map((movie) => {
    return {
      ID: movie.id,
      release_date: movie.release_date,
      title: movie.title,
    };
  });
};

const displayPopularPersons = (data) => {
  data.map((person) => {
    console.log(`\n`);
    console.log('Person: ');
    console.log(white(`Person Id: ${person.id}`));
    console.log(bold(`Person Name: ${blue(person.name)}`));
    console.log(
      white(`Person Department: ${magenta(person.department)}`)
    );
    console.log('\n');
    console.log('Person Movies: ');
    if (person.movies.length > 0) {
      person.movies.map((movie) => {
        console.log('Movie: ');
        console.log(`\tID: ${white(movie.ID)}`);
        console.log(`\tRelease date: ${white(movie.release_date)}`);
        console.log(`\tTitle: ${white(movie.title)}`);
      });
    } else {
      console.log('No movies are founded');
    }
    console.log('--------------------------------------');
  });

  console.log(`Page: ${data.page} of: ${data.total_pages}`);
};

export default { getPersons, formatResponse, displayLatestPerson };