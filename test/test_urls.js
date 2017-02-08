
import * as http from 'http';
import * as https from 'https';

import * as should from 'should';

import * as data from '../data.json';

function httpx_get(url, done) {
  function callback(res) {
    res.resume();
    if (res.statusCode === 200) {
      done();
    } else {
      const err = new Error(`Request for ${url} failed with status code ${res.statusCode}`);
      done(err);
    }
  }

  if (url.startsWith('https'))
    https.get(url, callback);
  else
    http.get(url, callback);
}

describe('project', function () {
  const projects = Object.keys(data.projects).reduce(((acc, category) =>
    acc.concat(data.projects[category])
  ), []);

  describe('github URLs', function () {
    context('when not null', function () {
      projects.filter((project) => project.github !== null)
        .forEach((project) => {
          context(project.github, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.github, done);
            });
          });
        });
    });
  });

  describe('website URLs', function () {
    context('when not null', function () {
      projects.filter((project) => project.website !== null)
        .forEach((project) => {
          context(`${project.name}`, function () {
            it('should not be undefined', function () {
              project.website.should.not.be.undefined();
            });
          });
        });

      projects.filter((project) => project.website !== null)
        .forEach((project) => {
          context(`${project.name} (${project.website})`, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.website, done);
            });
          });
        });
    });
  });

  describe('image URLs', function () {
    context('when not null', function () {
      projects.filter((project) => project.image !== null)
        .forEach((project) => {
          context(`${project.name}`, function () {
            it('should not be undefined', function() {
              project.image.should.not.be.undefined();
            });
          });
        });

      projects.filter((project) => project.image !== null)
        .forEach((project) => {
          context(`${project.name} (${project.image})`, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.image, done);
            });
          });
        });
    });
  });
});
