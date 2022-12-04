const { check } = require("express-validator");

let validateRegister = [
    check("email", "Email không hợp lệ").isEmail().trim(),

    check("password", "Mật khẩu không hợp lệ. Mật khẩu phải dài ít nhất 8 ký tự")
        .isLength({ min: 8 }),

    check("passwordConfirmation", "Mật khẩu xác thực không trùng với mật khẩu")
        .custom((value, { req }) => {
            return value === req.body.password
        }),
    check('fullName', 'Tên đăng nhập phải có ít nhất 3 ký tự').isLength({ min: 3 }),
    check('fullName', 'Tên đăng nhập Không được quá 10 ký tự').isLength({ max: 10 }),
    check('fullName', 'Tên đăng nhập không được có ký tự đặc biệt').isAlphanumeric(),
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