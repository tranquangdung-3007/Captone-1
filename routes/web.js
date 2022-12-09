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
const listReceiptController = require("../controllers/ListReceiptController");

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

    router.get("/home", homePageController.viewHome);

    router.get("/HouseManagement", listHouseController.viewManagerHouse);
    router.get("/HouseManagement/addhome", listHouseController.addHomebtn);
    router.post("/HouseManagement/addhome", listHouseController.addHouse);
    router.get("/HouseManagement/edithome/:id", listHouseController.edithome);
    router.post("/HouseManagement/edithome/:id", listHouseController.updatehome);
    router.get("/HouseManagement/deletehome/:id", listHouseController.deletehome);

    router.get("/RoomManagement/editroom/:id", listRoomController.editroom);
    router.post("/RoomManagement/editroom/:id", listRoomController.updateroom);
    router.get("/RoomManagement/deleteroom/:id", listRoomController.deleteroom);
    router.get("/RoomManagement/addRoom", listRoomController.addRoom);
    router.post("/RoomManagement/addRoom", listRoomController.addRoombtn);
    router.get("/RoomManagement", listRoomController.viewRoomByID);
    router.post("/RoomManagement", listRoomController.viewRoom);

    router.get("/TenantsManagement", listTenantsController.viewTenants);
    router.post("/TenantsManagement", listTenantsController.viewTenantsByHouse);
    router.get("/TenantsManagement/view/:id", listTenantsController.view);
    router.get("/TenantsManagement/settingPassword", listTenantsController.viewSetting);
    router.get("/TenantsManagement/viewAccount", listTenantsController.viewAccount);
    router.get("/TenantsManagement/addtenants", listTenantsController.addTenants);
    router.post("/TenantsManagement/addtenants", listTenantsController.addTenantsbtn);
    router.get("/TenantsManagement/edittenants/:id", listTenantsController.edittenants);
    router.post("/TenantsManagement/edittenants/:id", listTenantsController.updatetenants);
    router.get("/TenantsManagement/deletetenants/:id", listTenantsController.deletetenants);

    router.get("/ContractManagement", listContractController.viewContract);
    router.post("/ContractManagement", listContractController.viewContractByHouse);
    router.get("/ContractManagement/addcontract", listContractController.addContract);
    router.post("/ContractManagement/addcontract", listContractController.addContractbtn);

    router.get("/ServiceManagement", listServiceController.viewService);
    router.get("/ServiceManagement/addservice", listServiceController.addService);

    router.get("/ReceiptManagement", listReceiptController.viewReceipt);
    router.post("/ReceiptManagement", listReceiptController.viewReceiptByHouse);
    router.get("/ReceiptManagement/addreceipt", listReceiptController.addReceipt);
    router.post("/ReceiptManagement/addreceipt", listReceiptController.addReceiptbtn);
    router.get("/ReceiptManagement/editReceipt/:id", listReceiptController.editReceipt);
    router.post("/ReceiptManagement/editReceipt/:id", listReceiptController.updateReceipt);
    router.get("/ReceiptManagement/deleteReceipt/:id", listReceiptController.deleteReceipt);



    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};

router.use(express.static(__dirname + '/public'));

module.exports = initWebRoutes;