const connection = require("../configs/DBConnection");
let viewManagerHouse = async (req, res) => {
    connection.query("SELECT idNhaTro, TenNhaTro, DiaChi FROM nhatro", function (err, nhatro) {
        if (err) throw err;
        res.render("HouseManagement.ejs", { nhatro: nhatro });
    })
};
let addHomebtn = async (req, res) => {
    return res.render("addhome.ejs");
};

let addHouse = async (req, res) => {
    connection.query(`INSERT INTO nhatro(TenNhaTro,DiaChi,Quan,Phuong,ThanhPho) VALUES('${req.body.tennhatro}','${req.body.diachi}','${req.body.quan}','${req.body.phuong}','${req.body.thanhpho}')`, function (err) {
        if (err) throw err;
        res.redirect("/HouseManagement");
    })
}

let edithome = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT * FROM nhatro where idNhaTro = '${id}'`, function (err, data) {
        if (err) throw err;
        res.render('edithome', { title: 'User List', editData: data[0] });
    })
}

let updatehome = async (req, res) => {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE nhatro SET ? WHERE idNhaTro= ?`;
    connection.query(sql, [updateData, id], function (err) {
        if (err) throw err;
    });
    res.redirect('/HouseManagement');
}

let deletehome = async (req, res) => {
    var id = req.params.id;
    var sql = 'DELETE FROM nhatro WHERE idNhaTro = ?';
    connection.query(sql, [id], function (err, data) {
        if (err) throw err;
    });
    res.redirect('/HouseManagement');
}

module.exports = {
    viewManagerHouse: viewManagerHouse,
    addHomebtn: addHomebtn,
    addHouse: addHouse,
    edithome: edithome,
    updatehome: updatehome,
    deletehome: deletehome
};