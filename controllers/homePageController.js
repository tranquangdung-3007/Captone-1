let viewHome = async (req, res) => {
   res.render("home.ejs")
};
module.exports = {
    viewHome: viewHome,
};