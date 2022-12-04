const connection = require("../configs/DBConnection");


let viewContract = async (req, res) => {
    var id = req.params.id;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `, function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT idHopDong, DATE_FORMAT(NgayLap, '%d-%m-%Y') NgayLap,  DATE_FORMAT(NgayKetThuc, '%d-%m-%Y') NgayKetThuc, GhiChu, TienCoc FROM hopdong";
        connection.query(sql, [id], function (err, hopdong) {
            if (err) throw err;
            res.render("ContractManagement.ejs", {nhatro: nhatro, hopdong: hopdong});
        });
    })
};

let viewContractByHouse = async (req, res) => {
    var id = req.body.houseID;
    connection.query(`SELECT idNhaTro, TenNhaTro FROM nhatro `,[req.body.allHouse], function (err, nhatro) {
        if (err) throw err;
        var sql = "SELECT distinct idHopDong, NgayLap, NgayKetThuc, GhiChu, TienCoc, TenPhong, HoTen FROM nhatro, nguoithue, phongtro, hopdong where phongtro.idPhongTro = hopdong.idPhongTro and hopdong.idNguoiThue = nguoithue.idNguoiThue and phongtro.idNhaTro = ? ";
        connection.query(sql, [id], function (err, hopdong) {
            if (err) throw err;
            res.render("ContractManagement.ejs", {nhatro: nhatro, hopdong: hopdong});
        });
    })
};

let addContract = async (req, res) => {
        connection.query(`SELECT distinct idPhongTro, TenPhong, TenNhaTro, nhatro.idNhaTro, HoTen, nguoithue.idNguoiThue FROM phongtro, nguoithue, nhatro where phongtro.idNhaTro = nhatro.idNhaTro and phongtro.idPhongTro = nguoithue.idPhong `, function (err, nhatro) {
            if (err) throw err;
            res.render("addContract.ejs", {nhatro: nhatro});
        })
};

let addContractbtn = async (req, res) => {
    connection.query(`INSERT INTO hopdong(NgayLap, NgayKetThuc, TienCoc, GhiChu, idNhaTro, idNguoiThue, idPhongTro) VALUES('${req.body.ngaylap}','${req.body.ngayketthuc}','${req.body.tiencoc}','${req.body.ghichu}','${req.body.houseID}','${req.body.personID}','${req.body.roomID}')`, function (err) {
        if (err) throw err;
        res.redirect("/ContractManagement");
    })
}

module.exports = {
    viewContract: viewContract,
    addContract: addContract,
    viewContractByHouse: viewContractByHouse,
    addContractbtn: addContractbtn,
};