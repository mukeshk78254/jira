const express = require('express');
const app = express();
const PORT = 3000;

// Import the authentication middleware.const { requireAdmin } = require('./middleware/auth');


app.use(express.json());


const users = [
    {
        id: 'user123',
        name: 'Jane Doe',
        kycStatus: 'PENDING',
        kycRejectionReason: null
    },
    {
        id: 'user456',
        name: 'John Smith',
        kycStatus: 'APPROVED',
        kycRejectionReason: null
    }
];


app.post('/api/admin/kyc/:id/reject', requireAdmin, (req, res) => {

    const userId = req.params.id;
   
    const { rejectionReason } = req.body;


    if (!rejectionReason) {
        return res.status(400).json({ message: 'Rejection reason is required.' });
    }

 
    const user = users.find(u => u.id === userId);

  
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

  
    user.kycStatus = 'REJECTED';
    user.kycRejectionReason = rejectionReason;


    return res.status(200).json({
        message: 'KYC application rejected successfully.',
        user: {
            id: user.id,
            name: user.name,
            kycStatus: user.kycStatus,
            kycRejectionReason: user.kycRejectionReason
        }
    });
});


app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});