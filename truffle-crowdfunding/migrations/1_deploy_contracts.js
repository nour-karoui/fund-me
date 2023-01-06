const ProjectsFactory = artifacts.require("ProjectsFactory");

module.exports = (deployer) => {
    deployer.deploy(ProjectsFactory);
}