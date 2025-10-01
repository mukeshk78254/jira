
const ADMIN_TOKEN = 'a-super-secret-admin-token';

exports.requireAdmin = (req, res, next) => {
   
    const token = req.headers['x-admin-token'];
    
   
    if (!token || token !== ADMIN_TOKEN) {

        return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }
    

    next();
};