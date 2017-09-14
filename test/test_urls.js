
import * as http from 'http';
import * as https from 'https';

import * as should from 'should';

import * as data from '../data.json';


function httpx_get(url, done) {
  function callback(res) {
    res.resume();
    if (res.statusCode < 400) {
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
  this.timeout(10000);
  const projects = Object.keys(data.projects).reduce(((acc, category) =>
    acc.concat(data.projects[category])
  ), []);
  
  describe('github URLs', function () {
    context('when defined', function () {
      projects.filter((project) => project.github !== undefined)
        .forEach((project) => {
          context(`${project.name} (${project.website})`, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.github, done);
            });
          });
        });
    });
  });

  describe('website URLs', function () {
    context('when defined', function () {
      projects.filter((project) => project.website !== undefined)
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
    context('when defined', function () {
      projects.filter((project) => project.image !== undefined)
        .forEach((project) => {
          context(`${project.name} (${project.image})`, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.image, done);
            });
          });
        });
    });
  });

  describe('store URLs', function () {
    context('when defined', function () {
      projects.filter((project) => project.store !== undefined)
        .forEach((project) => {
          context(`${project.name} (${project.store})`, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.store, done);
            });
          });
        });
    });
  });

  describe('image_source URLs', function () {
    context('when image is defined', function () {
      projects.filter((project) => project.image !== undefined)
        .forEach((project) => {
          context(`${project.name} (${project.image_source})`, function () {
            it('should be defined', function () {
              should.notStrictEqual(project.image_source, undefined);
            });
            it('should respond with 200 OK', function (done) {
              httpx_get(project.image_source, done);
            });
          });
        });
    });
  });
});
