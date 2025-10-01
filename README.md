# Jira KYC Rejection API

This API provides endpoints for managing KYC (Know Your Customer) applications, specifically for rejecting KYC applications with rejection reasons.

## Features

- **KYC Rejection Endpoint**: `/api/admin/kyc/:id/reject` - Reject KYC applications with specific reasons
- **User Management**: Get user details by ID
- **Admin Authentication**: Secure admin-only access using tokens

## API Endpoints

### 1. Reject KYC Application

**Endpoint**: `POST /api/admin/kyc/:id/reject`

**Headers**:
```
x-admin-token: a-super-secret-admin-token
Content-Type: application/json
```

**Request Body**:
```json
{
  "rejectionReason": "Incomplete documentation provided"
}
```

**Response** (Success - 200):
```json
{
  "message": "KYC application rejected successfully.",
  "user": {
    "id": "user123",
    "name": "Jane Doe",
    "kycStatus": "REJECTED",
    "kycRejectionReason": "Incomplete documentation provided"
  }
}
```

**Error Responses**:
- `400` - Rejection reason is required
- `403` - Forbidden: Admin access required
- `404` - User not found

### 2. Get User Details

**Endpoint**: `GET /api/users/:id`

**Response** (Success - 200):
```json
{
  "id": "user123",
  "name": "Jane Doe",
  "kycStatus": "REJECTED",
  "kycRejectionReason": "Incomplete documentation provided"
}
```

**Error Response**:
- `404` - User not found

## Sample Users

The API includes sample users for testing:

1. **User 123** - Jane Doe (KYC Status: PENDING)
2. **User 456** - John Smith (KYC Status: APPROVED)

## Authentication

Admin endpoints require the `x-admin-token` header with the value `a-super-secret-admin-token`.

## Testing with Postman

### 1. Reject KYC Application

**Method**: POST  
**URL**: `http://localhost:3000/api/admin/kyc/user123/reject`

**Headers**:
```
x-admin-token: a-super-secret-admin-token
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "rejectionReason": "Incomplete documentation provided"
}
```

### 2. Get User Details

**Method**: GET  
**URL**: `http://localhost:3000/api/users/user123`

## Running the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`

## Project Structure

```
jiraold/
├── server.js           # Main server file
├── middleware/
│   └── auth.js        # Admin authentication middleware
└── README.md          # This documentation
```

## KYC Status Values

- `PENDING` - KYC application is under review
- `APPROVED` - KYC application has been approved
- `REJECTED` - KYC application has been rejected

## Error Handling

The API includes comprehensive error handling for:
- Missing authentication tokens
- Invalid user IDs
- Missing required fields
- User not found scenarios

## Security

- Admin-only access for KYC rejection endpoint
- Token-based authentication
- Input validation for required fields

