
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
            it('should not be undefined (Accepts: \'github\': null or \'github\': \'VALID URL\')', function () {
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
            it('should not be undefined (Accepts: \'website\': null or \'website\': \'VALID URL\')', function () {
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
            it('should not be undefined (Accepts: \'image\': null or \'image\': \'VALID URL\')', function() {
              should.notStrictEqual(project.image, undefined);
            });
            it('should respond with 200 OK', function (done) {
              httpx_get(project.image, done);
            });
          });
        });
    });
  });
  describe('configurations', function () {
    context('when not null', function () {
      projects.filter((project) => project.configurations !== null)
        .forEach((project) => {
          context(`${project.name}`, function () {
            context('should only use allowed requirements', function() {
              project.configurations.forEach((configuration) => {
                context(`${configuration}`, function () {
                  configuration.forEach((component) => {
                    context(`${component}`, function () {
                      it('should only use allowable requirements', function () {
                        //return true;
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
});