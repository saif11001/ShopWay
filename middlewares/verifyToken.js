const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {

    const accessToken = req.cookies.accessToken;
    try{
        if(accessToken) {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            return  next();
        }
    }catch (error) {
        if(error.name !== 'TokenExpiredError') {
            return next(error);
        }
    }

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) {
        return res.status(401).json({ status: httpStatusText.FAIL, message: "Access token expired and no refresh token available." })
    }
    try{
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);


        const user = await User.findOne({ where: { id: decodedRefreshToken.id } });
        if(!user || user.refreshToken != refreshToken){
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(403).json({ status: httpStatusText.FAIL, message: "Invalid refresh token. Please login again." });
        }

        const newAccessToken = jwt.sign({ id: user.id, email: user.email, userRole: user.userRole }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' } );
        const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '10d' });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        })
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            // secure: true,
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        req.user = jwt.verify(newAccessToken, process.env.JWT_SECRET_KEY);
        next();

    } catch (error) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        next(error);
    }
}

module.exports = verifyToken;