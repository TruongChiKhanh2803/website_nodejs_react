import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Xác thực mật khẩu không chính xác!" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
        });
        res.json({ msg: "Đăng ký thành công" })
    } catch (error) {
        console.log(error);
    }
}



export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: { email: req.body.email }
        });
        if (!user[0]) return res.status(404).json({ msg: "Email không chính xác!" });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Mật khẩu không chính xác!" });

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;

        const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Users.update({ refresh_token: refreshToken }, {
            where: { id: userId }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        const redirectUrl = role === 0 ? "/dashboard" : "/";
        res.json({ accessToken, redirectUrl });
    } catch (error) {
        res.status(500).json({ msg: "Đã xảy ra lỗi!" });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: { refresh_token: refreshToken }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: { id: userId }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

// xem chi tiết
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findByPk(id, {
            attributes: ['id', 'name', 'email', 'role']
        });
        if (!user) return res.status(404).json({ msg: 'Không tìm thấy người dùng' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Lỗi khi tải người dùng', error });
    }
};



export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userFromToken = req.user;

    try {
        if (userFromToken.role !== 0 && parseInt(userFromToken.id) !== parseInt(id)) {
            return res.status(403).json({ msg: 'Bạn không có quyền chỉnh sửa người dùng này.' });
        }

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: 'Không tìm thấy người dùng có ID này.' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ msg: 'Người dùng đã cập nhật thành công', user });
    } catch (error) {
        console.error("Lỗi cập nhật người dùng:", error);
        res.status(500).json({ msg: 'Lỗi cập nhật người dùng', error });
    }
};


// xóa
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.destroy({ where: { id } });
        if (!user) return res.status(404).json({ msg: 'Không tìm thấy người dùng' });
        res.json({ msg: 'Đã xóa người dùng thành công' });
    } catch (error) {
        res.status(500).json({ msg: 'Lỗi khi xóa người dùng', error });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const userIdFromToken = req.user.userId;

        if (parseInt(userIdFromToken) !== parseInt(id)) {
            return res.status(403).json({ msg: "Bạn chỉ có thể chỉnh sửa thông tin tài khoản của mình." });
        }

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ msg: "Không tìm thấy người dùng" });
        }

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 12);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ msg: "Cập nhật thông tin thành công", user });
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        res.status(500).json({ msg: "Có lỗi xảy ra" });
    }
};
