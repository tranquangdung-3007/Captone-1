const { check } = require("express-validator");

let validateRegister = [
    check("email", "Email không hợp lệ").isEmail().trim(),

    check("password", "Mật khẩu không hợp lệ. Mật khẩu phải dài ít nhất 8 ký tự")
        .isLength({ min: 8 }),

    check("passwordConfirmation", "Mật khẩu xác thực không trùng với mật khẩu")
        .custom((value, { req }) => {
            return value === req.body.password
        })
];

let validateLogin = [
    check("email", "Email không hợp lệ").isEmail().trim(),
    check("password", "Mật khẩu không đúng")
        .not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};