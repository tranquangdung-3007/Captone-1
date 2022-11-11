let viewService = async (req, res) => {
    return res.render("ServiceManagement.ejs");
};

let addService = async (req, res) => {
    return res.render("addService.ejs");
};

module.exports = {
    viewService: viewService,
    addService: addService,
};