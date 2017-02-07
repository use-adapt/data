
import * as data from '../data.json';
import * as http from 'http';
import * as https from 'https';

describe('project', function () {
  const projects = Object.keys(data.projects).reduce(((acc, category) =>
    acc.concat(data.projects[category])
  ), []);

  describe('github URLs', function () {
    context('when not null', function () {
      projects.forEach((project) => {
        it('should respond with 200 OK', function (done) {
          if (project.github === null) {
            done();
          }
          else if (project.github.startsWith('https')) {
            https.get(project.github, (res) => {
              res.resume();
              if (res.statusCode === 200) {
                done();
              } else {
                const err = new Error(`Request failed with status code ${res.statusCode}`);
                done(err);
              }
            });
          }
          else {
            http.get(project.github, done);
          }
        });
      })
    });
  });
  
  describe('website URLs', function () {
    context('when not null', function () {
      projects.forEach((project) => {
        it('should respond with 200 OK', function (done) {
          if (project.website === null) {
            done();
          }
          else if (project.website.startsWith('https')) {
            https.get(project.website, (res) => {
              res.resume();
              if (res.statusCode === 200) {
                done();
              } else {
                const err = new Error(`Request failed with status code ${res.statusCode}`);
                done(err);
              }
            });
          }
          else {
            http.get(project.website, done);
          }
        });
      })
    });
  });
});
