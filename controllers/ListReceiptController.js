const connection = require("../configs/DBConnection");

let viewReceipt = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, function (err, nhatro) {
        if (err) throw err;
        var sql = "select p.Gia, idHoaDon, NgayLap, h.TrangThai, TenPhong,  p.Gia+h.TienNuoc+ FORMAT((h.ChiSoCuoi-h.ChiSoDau)*2500, 0) as Tongtien from phongtro p inner join hoadon h on p.idPhongTro = h.idPhongTro";
        connection.query(sql, [id], function (err, hoadon) {
            if (err) throw err;
            res.render("ReceiptManagement.ejs", { nhatro: nhatro, hoadon: hoadon });
        });
    })
};

let viewReceiptByHouse = async (req, res) => {
    var id = req.body.houseID;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, [req.body.allHouse], function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT distinct idHoaDon, NgayLap, TongTien, hoadon.TrangThai, TenPhong FROM nhatro, hoadon, phongtro where phongtro.idPhongTro = hoadon.idPhongTro and phongtro.idNhaTro = ?  ";
        connection.query(sql, [id], function (err, hoadon) {
            if (err) throw err;
            res.render("ReceiptManagement.ejs", { nhatro: nhatro, hoadon: hoadon });
        });
    })
};

let addReceipt = async (req, res) => {
    connection.query(`SELECT distinct p.idPhongTro, TenPhong, TenNhaTro, n.idNhaTro FROM phongtro p, nhatro n where p.idNhaTro = n.idNhaTro `, function (err, nhatro) {
        if (err) throw err;
        res.render("addReceipt.ejs", { nhatro: nhatro });
    })
};

let addReceiptbtn = async (req, res) => {
    connection.query(`INSERT INTO hoadon(NgayLap, ChiSoDau, ChiSoCuoi, idPhongTro, idNhaTro) VALUES('${req.body.ngaylap}','${req.body.chisodau}','${req.body.chisocuoi}','${req.body.roomID}','${req.body.houseID}')`, function (err) {
        if (err) throw err;
        res.redirect("/ReceiptManagement");
    })
}

let editReceipt = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT * FROM hoadon where idHoaDon = '${id}'`, function (err, data) {
        if (err) throw err;
        res.render('editReceipt.ejs', { editData: data[0] });
    })
}

let updateReceipt = async (req, res) => {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE hoadon SET ? WHERE idHoaDon = ?`;
    connection.query(sql, [updateData, id], function (err) {
        if (err) throw err;
    });
    res.redirect('/ReceiptManagement');
}

let deleteReceipt = async (req, res) => {
    var id = req.params.id;
    var sql = 'DELETE FROM hoadon WHERE idHoaDon = ?';
    connection.query(sql, [id], function (err, data) {
        if (err) throw err;
    });
    res.redirect('/ReceiptManagement');
}

module.exports = {
    viewReceipt: viewReceipt,
    viewReceiptByHouse: viewReceiptByHouse,
    addReceipt: addReceipt,
    addReceiptbtn: addReceiptbtn,
    editReceipt: editReceipt,
    updateReceipt: updateReceipt,
    deleteReceipt: deleteReceipt
};