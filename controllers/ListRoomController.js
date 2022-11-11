const connection = require("../configs/DBConnection");

let addRoom = async (req, res) => {
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, function (err, nhatro) {
        if (err) throw err;
        res.render("addRoom.ejs", {nhatro: nhatro});
    })
};

let viewRoomByID = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT idPhongTro, TenPhong, Gia, TrangThai FROM phongtro";
        connection.query(sql, [id], function (err, phongtro) {
            if (err) throw err;
            res.render("RoomManagement.ejs", {nhatro: nhatro, phongtro: phongtro});
        });
    })
};

let viewRoom = async (req, res) => {
    var id = req.body.houseID;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `,[req.body.allHouse], function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT idPhongTro, TenPhong, Gia, TrangThai FROM phongtro where phongtro.idNhaTro = ? ";
        connection.query(sql, [id], function (err, phongtro) {
            if (err) throw err;
            res.render("RoomManagement.ejs", {nhatro: nhatro, phongtro: phongtro});
        });
    })
};

let addRoombtn = async (req, res) => {
    connection.query(`INSERT INTO phongtro(TenPhong,SucChua,DienTich,Gia,TrangThai,idNhaTro) VALUES('${req.body.tenphong}','${req.body.succhua}','${req.body.dientich}','${req.body.gia}','${req.body.trangthai}','${req.body.houseID}')`, function (err) {
        if (err) throw err;
        res.redirect("/RoomManagement");
    })
}

module.exports = {
    addRoom: addRoom,
    viewRoomByID: viewRoomByID,
    viewRoom: viewRoom,
    addRoombtn: addRoombtn,
};