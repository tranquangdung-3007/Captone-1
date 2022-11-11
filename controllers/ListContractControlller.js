let viewContract = async (req, res) => {
    return res.render("ContractManagement.ejs");
};

let addContract = async (req, res) => {
    return res.render("addContract.ejs");
};

module.exports = {
    viewContract: viewContract,
    addContract: addContract,
};