const truffleAssert = require('truffle-assertions');
const ProjectsFactory = artifacts.require("ProjectsFactory")
const RVLToken = artifacts.require("RVLToken")
const ProjectFunding = artifacts.require("ProjectFunding")
contract("RVLToken", () => {
    it('Should fetch the deployed contract and token', async () => {
        const RVL = await RVLToken.deployed();
        const projectsFactory = await ProjectsFactory.deployed();
        assert.notEqual(RVL.address, null);
        assert.notEqual(projectsFactory.address, null)
    })
})

contract('ProjectFunding', () => {
    let RVL;
    let projectsFactory;
    let accounts;
    let project;
    before(async () => {
        RVL = await RVLToken.deployed();
        projectsFactory = await ProjectsFactory.deployed();
        accounts = await web3.eth.getAccounts();
    });

    it('Should create a new project and assign a budget for it', async () => {
        await projectsFactory.createNewProject('webipie', web3.utils.toWei('10', 'ether'), RVL.address);
        const projectsAddress = await projectsFactory.getProjectAddress('webipie');
        project = await ProjectFunding.at(projectsAddress);
        const projectBudget = await project.getBudget();
        assert.equal(web3.utils.fromWei(projectBudget), '10');
    });

    it('Should allow participants to fund project', async () => {
        await RVL.approve(project.address, web3.utils.toWei('5','ether'));
        await project.fundProject(web3.utils.toWei('5', 'ether'));
        const remainingBudget = await project.getRemainingBudget();
        assert.equal(web3.utils.fromWei(remainingBudget), '5');
    })
    it('Should allow participants to get refunds as long as the budget is not reached', async () => {
        await project.refund(web3.utils.toWei('5', 'ether'));
        const accountBalance = await RVL.balanceOf(accounts[0]);
        assert.equal(web3.utils.fromWei(accountBalance), '1000');
        const remainingBudget = await project.getRemainingBudget();
        assert.equal(web3.utils.fromWei(remainingBudget), '10');
    })
    it('Should not allow participants to get refunds if the budget is reached', async () => {
        await RVL.approve(project.address, web3.utils.toWei('10','ether'));
        await project.fundProject(web3.utils.toWei('10', 'ether'));
        const remainingBudget = await project.getRemainingBudget();
        assert.equal(web3.utils.fromWei(remainingBudget), '0');
        await truffleAssert.fails(project.refund(web3.utils.toWei('5', 'ether')), truffleAssert.ErrorType.REVERT);
    })
    it('Should not allow participants to give donations higher than current remaining budget', async () => {
        const remainingBudget = await project.getRemainingBudget();
        assert.equal(web3.utils.fromWei(remainingBudget), '0');
        await RVL.approve(project.address, web3.utils.toWei('10', 'ether'));
        await truffleAssert.fails(project.fundProject(web3.utils.toWei('5', 'ether')), truffleAssert.ErrorType.REVERT);
    })
})