const connection = require("../configs/DBConnection");

let viewTenants = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT idNguoiThue, HoTen, NamSinh, DiaChi, CMND, SoDienThoai, GioiTinh, TenPhong FROM nguoithue, phongtro where nguoithue.idPhong = phongtro.idPhongTro";
        connection.query(sql, [id], function (err, nguoithue) {
            if (err) throw err;
            res.render("TenantsManagement.ejs", { nhatro: nhatro, nguoithue: nguoithue });
        });
    })
};

let viewTenantsByHouse = async (req, res) => {
    var id = req.body.houseID;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, [req.body.allHouse], function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT distinct idNguoiThue, HoTen, NamSinh, nguoithue.DiaChi, CMND, SoDienThoai, GioiTinh, TenPhong FROM nhatro, nguoithue, phongtro where phongtro.idPhongTro = nguoithue.idPhong and phongtro.idNhaTro = ?  ";
        connection.query(sql, [id], function (err, nguoithue) {
            if (err) throw err;
            res.render("TenantsManagement.ejs", { nhatro: nhatro, nguoithue: nguoithue });
        });
    })
};

let addTenants = async (req, res) => {
    connection.query(`SELECT distinct idPhongTro, TenPhong, TenNhaTro, nhatro.idNhaTro FROM phongtro, nhatro where phongtro.idNhaTro = nhatro.idNhaTro `, function (err, nhatro) {
        if (err) throw err;
        res.render("addTenants.ejs", { nhatro: nhatro });
    })
};

let addTenantsbtn = async (req, res) => {
    connection.query(`INSERT INTO nguoithue(HoTen, NamSinh, DiaChi, CMND, SoDienThoai, GioiTinh, idNhaTro, idPhong) VALUES('${req.body.hoten}','${req.body.namsinh}','${req.body.diachi}','${req.body.cmnd}','${req.body.sdt}','${req.body.gioitinh}','${req.body.houseID}','${req.body.roomID}')`, function (err) {
        if (err) throw err;
        res.redirect("/TenantsManagement");
    })
}

let edittenants = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT * FROM nguoithue where idNguoiThue = '${id}'`, function (err, data) {
        if (err) throw err;
        res.render('edittenants.ejs', { editData: data[0] });
    })
}

let updatetenants = async (req, res) => {
    var id = req.params.id;
    var updateData = req.body;
    var sql = 'UPDATE nguoithue SET ? WHERE idNguoiThue = ?';
    connection.query(sql, [updateData, id], function (err) {
        if (err) throw err;
    });
    res.redirect('/TenantsManagement');
}

let deletetenants = async (req, res) => {
    var id = req.params.id;
    var sql = 'DELETE FROM nguoithue WHERE idNguoiThue = ?';
    connection.query(sql, [id], function (err, data) {
        if (err) throw err;
    });
    res.redirect('/TenantsManagement');
}
module.exports = {
    viewTenantsByHouse: viewTenantsByHouse,
    addTenants: addTenants,
    viewTenants: viewTenants,
    addTenantsbtn: addTenantsbtn,
    edittenants: edittenants,
    updatetenants: updatetenants,
    deletetenants: deletetenants


};