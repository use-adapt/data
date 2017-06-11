
import * as should from 'should';

import * as data from '../data.json';
import * as master_requirements from '../requirements.json';

describe('project', function () {
  const projects = Object.keys(data.projects).reduce(((acc, category) =>
    acc.concat(data.projects[category])
  ), []);
  const requirements = master_requirements.requirements;

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
 
