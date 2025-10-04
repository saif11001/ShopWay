# ShopWay

ShoWay is a full-stack **E-commerce application** built with **Node.js, Express, and Sql**, providing a simple yet powerful shopping experience with authentication, product management, and cart features.  

---

## Features
- User authentication & authorization (Register, Login, Logout).
- Role-based access (User, Admin, Manager).
- Product management (Add, Edit, Delete, View).
- Categories management.
- Shopping cart system (Add/Remove items, Update quantity).
- Pagination & search for products.
- Image upload support (Users & Products).
- Order handling and checkout process (future feature).

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** Sql (Sequelize)  
- **Authentication:** JWT, bcrypt  
- **File Upload:** Multer  
- **Other Tools:** dotenv, express-validator  

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/ShoWay.git
   cd ShopWay
      
2. Install dependencies:
   ```bash
   npm install

3. Create a .env file with the following variables:
  ```bash
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  STRIPE_SECRET=your_stripe_secret_key

4. Start the server:
   ```bash
  npm start

---

## API Endpoints (Examples)
### **Auth**

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### **User**

- GET /api/users/me (Get current user)
- PATCH /api/users/update (Update user info)
- DELETE /api/users/delete (Delete user)

### **Categories**

- GET /api/categories
- POST /api/categories
- PATCH /api/categories/:id
- DELETE /api/categories/:id   

### **Products**

- GET /api/products
- POST /api/products
- PATCH /api/products/:id
- DELETE /api/products/:id

### **Cart**

- GET /api/cart
- POST /api/cart/add/:productId
- DELETE /api/cart/remove/:productId

### **Orders**

- POST /api/order
- GET /api/order

---

## Future Improvements

- Add product reviews & ratings.
- Build a React/Next.js frontend.
- Integrate Stripe for checkout.
- Admin dashboard with analytics.
- Email notifications for orders



## Author

Saif Eldeen Sobhi
- [LinkedI] (https://www.linkedin.com/in/saif-eldeen-sobhy/)



