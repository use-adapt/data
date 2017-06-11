
import * as http from 'http';
import * as https from 'https';

import * as should from 'should';

import * as data from '../data.json';
import * as master_requirements from '../requirements.json';


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
  const projects = Object.keys(data.projects).reduce(((acc, category) =>
    acc.concat(data.projects[category])
  ), []);
  const requirements = master_requirements.requirements;
  
  describe('github URLs', function () {
    context('when not null', function () {
      projects.filter((project) => project.github !== null)
        .forEach((project) => {
          context(`${project.name} (${project.website})`, function () {
            it('should be a valid URL or null', function () {
              should.notStrictEqual(project.github, undefined);
            });
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
          context(`${project.name} (${project.website})`, function () {
            it('should be a valid URL or null', function () {
              should.notStrictEqual(project.website, undefined);
            });
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
          context(`${project.name} (${project.image})`, function () {
            it('should be a valid URL or null', function () {
              should.notStrictEqual(project.image, undefined);
            });
            it('should respond with 200 OK', function (done) {
              httpx_get(project.image, done);
            });
          });
        });
    });
  });

  describe('store URLs', function () {
    context('when not undefined', function () {
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
    context('when image is not null', function () {
      projects.filter((project) => project.image !== null)
        .forEach((project) => {
          context(`${project.name} (${project.image_source})`, function () {
            it('should respond with 200 OK', function (done) {
              httpx_get(project.image_source, done);
            });
          });
        });
    });
  });

  describe('configurations', function () {
    context('when not null', function () {
      projects.forEach((project) => {
          context(`${project.name}`, function () {
              project.configurations.forEach((configuration) => {
                context(`${configuration.join(', ')}`, function () {
                  configuration.forEach((component) => {
                    context(`${component}`, function () {
                      it('is an allowable component', function () {
                        component.should.be.oneOf(requirements);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
