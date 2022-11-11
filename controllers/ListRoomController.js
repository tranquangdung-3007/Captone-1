const connection = require("../configs/DBConnection");

let addRoom = async (req, res) => {
    connection.query('SELECT idNhaTro, TenNhaTro FROM nhatro', function (err, nhatro) {
        if (err) throw err;
        res.render("addRoom.ejs", { nhatro: nhatro });
    })
};

let viewRoomByID = async (req, res) => {
    var id = req.params.id;
    connection.query('SELECT idNhaTro, TenNhaTro FROM nhatro', function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT idPhongTro, TenPhong, Gia, TrangThai FROM phongtro";
        connection.query(sql, [id], function (err, phongtro) {
            if (err) throw err;
            res.render("RoomManagement.ejs", { nhatro: nhatro, phongtro: phongtro });
        });
    })
};

let viewRoom = async (req, res) => {
    var id = req.body.houseID;
    connection.query('SELECT idNhaTro, TenNhaTro FROM nhatro', [req.body.allHouse], function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT idPhongTro, TenPhong, Gia, TrangThai FROM phongtro where phongtro.idNhaTro = ? ";
        connection.query(sql, [id], function (err, phongtro) {
            if (err) throw err;
            res.render("RoomManagement.ejs", { nhatro: nhatro, phongtro: phongtro });
        });
    })
};

let addRoombtn = async (req, res) => {
    connection.query(`INSERT INTO phongtro(TenPhong,SucChua,DienTich,Gia,idNhaTro) VALUES('${req.body.tenphong}','${req.body.succhua}','${req.body.dientich}','${req.body.gia}','${req.body.houseID}')`, function (err) {
        if (err) throw err;
        res.redirect("/RoomManagement");
    })
}

let editroom = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT * FROM phongtro, nhatro where idPhongTro = '${id}'`, function (err, data) {
        if (err) throw err;
        res.render('editroom', { editData: data[0] });
    })
}

let updateroom = async (req, res) => {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE phongtro SET ? WHERE idPhongTro= ?`;
    connection.query(sql, [updateData, id], function (err) {
        if (err) throw err;
    });
    res.redirect('/RoomManagement');
}

let deleteroom = async (req, res) => {
    var id = req.params.id;
    var sql = 'DELETE FROM phongtro WHERE idPhongTro = ?';
    connection.query(sql, [id], function (err, data) {
        if (err) throw err;
    });
    res.redirect('/RoomManagement');
}

module.exports = {
    addRoom: addRoom,
    viewRoomByID: viewRoomByID,
    viewRoom: viewRoom,
    addRoombtn: addRoombtn,
    editroom: editroom,
    updateroom: updateroom,
    deleteroom: deleteroom
};