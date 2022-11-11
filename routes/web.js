const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const forgotPasswordController = require("../controllers/forgotPasswordController");
const homePageController = require("../controllers/homePageController");
const listHouseController = require("../controllers/ListHouseController");
const listRoomController = require("../controllers/ListRoomController");
const listTenantsController = require("../controllers/ListTenantsController");
const listServiceController = require("../controllers/ListServiceController");
const listContractController = require("../controllers/ListContractControlller");

const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", loginController.checkLoggedIn, homePageController.viewHome);
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true,
    }));
    router.get("/forgotPassword", forgotPasswordController.handleHelloWorld);
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);

    router.get("/ServiceManagement", listServiceController.viewService);
    router.get("/ContractManagement", listContractController.viewContract);

    router.get("/home", homePageController.viewHome);

    router.get("/HouseManagement", listHouseController.viewManagerHouse);
    router.get("/HouseManagement/addhome", listHouseController.addHomebtn);
    router.post("/HouseManagement/addhome", listHouseController.addHouse);
    router.get("/HouseManagement/edithome/:id", listHouseController.edithome);
    router.post("/HouseManagement/edithome/:id", listHouseController.updatehome);
    router.get("/HouseManagement/deletehome/:id", listHouseController.deletehome);

    router.get("/RoomManagement/addRoom", listRoomController.addRoom);
    router.post("/RoomManagement/addRoom", listRoomController.addRoombtn);

    router.get("/RoomManagement", listRoomController.viewRoomByID);
    router.post("/RoomManagement", listRoomController.viewRoom);

    router.get("/TenantsManagement", listTenantsController.viewTenants);
    router.post("/TenantsManagement", listTenantsController.viewTenantsByHouse);
    router.get("/TenantsManagement/addtenants", listTenantsController.addTenants);
    router.post("/TenantsManagement/addtenants", listTenantsController.addTenantsbtn);

    router.get("/ContractManagement/addcontract", listContractController.addContract);

    router.get("/ServiceManagement/addservice", listServiceController.addService);

    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};

router.use(express.static(__dirname + '/public'));

module.exports = initWebRoutes;