const DBConnection = require("./../configs/DBConnection");
const bcrypt = require("bcryptjs");

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`Email "${data.email}" này đã tồn tại. Vui lòng chọn một email khác`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                fullname: data.fullname,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt),
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO nguoidung set ? ', userItem,
                function (err, rows) {
                    if (err) {
                        reject(false)
                    } else {
                        resolve("Đăng ký thành công");
                    }
                }
            );
        }
    });
};

let checkExistEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `nguoidung` WHERE `email` = ?  ', email,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};