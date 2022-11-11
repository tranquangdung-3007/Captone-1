let handleHelloWorld = async (req, res) => {
    return res.render("forgotPassword.ejs",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};