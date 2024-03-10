import { expect } from "chai";

describe("PasswordManager", async function () {
  let passwordManager, owner, otherAccount;

  before(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const PasswordManager = await ethers.getContractFactory("PasswordManager");
    passwordManager = await PasswordManager.deploy();
    await passwordManager.deployed();
  });

  describe("Details Management", function () {
    it("Should add new details successfully", async function () {
      const addTx = await passwordManager.addDetails("App1", "user1", "pass1", "link1");
      await addTx.wait();

      const details = await passwordManager.getDetails();
      expect(details.length).to.equal(1);
      expect(details[0].appName).to.equal("App1");
      // Add more assertions as needed
    });

    it("Should update details successfully", async function () {
      const updateTx = await passwordManager.updateDetails(0, "App1Updated", "user1", "pass1", "link1");
      await updateTx.wait();

      const details = await passwordManager.getDetails();
      expect(details[0].appName).to.equal("App1Updated");
      // Add more assertions as needed
    });

    it("Should delete details successfully", async function () {
      const deleteTx = await passwordManager.deleteDetails(0);
      await deleteTx.wait();

      const details = await passwordManager.getDetails();
      expect(details.length).to.equal(0);
    });

    // You can add more tests for other functionalities as needed
  });
});
