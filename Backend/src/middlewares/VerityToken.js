import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: "Không được phép thực hiện!" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Bị cấm!" });

        req.user = decoded;
        next();
    });
};



// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) return res.sendStatus(403);
//         req.email = decoded.email;
//         next();
//     });
// }

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.status(401).json({ msg: "Unauthorized: Token is required" });

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) return res.status(403).json({ msg: "Forbidden: Invalid token" });

//         req.email = decoded.email;
//         req.role = decoded.role;
//         next();
//     });
// };








