const jwt = require("jsonwebtoken")
const secretKey = "myapp"

class Utils {
    static createJWT(user) {
        return jwt.sign({ 
            userId: user.nguoi_dung_id, username: user.ten_dang_nhap 
            },
            secretKey,
            { expiresIn: '1h' });
    }

    static getDecodeTokenData(token) {
        let decoded_data = null;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return null;
            }
            decoded_data = decoded;
        });
        return decoded_data;
    }
    
    static createID(type) {
        return String(Date.now()) + type + String(Math.random());
    }
}

module.exports = Utils;