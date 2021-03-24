const QuizCoin = artifacts.require("QuizCoin");

module.exports = function (deployer) {
  deployer.deploy(QuizCoin);
};
