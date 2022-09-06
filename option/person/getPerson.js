import ora from 'ora';
import { blue, magenta, bold } from 'chalk';
import { getPersonById } from '../../service/uniquePerson';

const getPerson = (id) => {
  getPersonById(id);
};

const formatPerson = (data) => {
  console.log(`Person:
    ID: ${data.id}
    Name: ${blue(data.name)}
    Birthday: ${data.birthday} | ${data.place_of_birth}
    Department: ${magenta(data.known_for_department)}
    Biography: ${bold(data.biography)}
    Also known as: 
    ${data.also_known_as[0]}
    `);
};

export default {
  getPerson,
  formatPerson,
};