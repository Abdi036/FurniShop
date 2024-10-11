
</head>
<body>
    <h1>Furnishop E-Commerce</h1>
    <p><strong>Furnishop</strong> is a modern and fully functional e-commerce platform focused on selling furniture online. It provides a comprehensive user experience for both customers and admins with a range of features including user authentication, product management, order processing, and payment integration.</p>

  <h2>Features</h2>
    <h3>User Authentication</h3>
    <ul>
        <li><strong>Signup</strong>: New users can create an account.</li>
        <li><strong>Login</strong>: Existing users can log in to their account.</li>
        <li><strong>Logout</strong>: Users can securely log out of their account.</li>
        <li><strong>Forgot Password</strong>: Users can reset their password via email if they forget it.</li>
        <li><strong>Reset Password</strong>: Users can create a new password after receiving the reset link.</li>
        <li><strong>Delete Account</strong>: Users can permanently delete their account.</li>
        <li><strong>Update Account</strong>: Users can update their account details like name, email, or password.</li>
    </ul>

   <h3>Shopping Features</h3>
    <ul>
        <li><strong>Add to Cart</strong>: Users can add products to their cart for purchasing later.</li>
        <li><strong>Increase and decrease Quantity</strong>:users can increase and decrease the amount of product</li>
        <li><strong>Remove</strong>:Users can remove products from cart.</li>
        <li><strong>Checkout</strong>: Secure checkout process using Stripe payment gateway.</li>
    </ul>


  <h3>Admin Features</h3>
    <ul>
        <li><strong>Admin Dashboard</strong>: A dashboard for managing the platform, view important statistics.</li>
        <li><strong>Product Management</strong>:
            <ul>
                <li><strong>Add Products</strong>: Admin can add new products to the store.</li>
                <li><strong>Edit Products</strong>: Admin can edit product details (name, price, description, etc.).</li>
                <li><strong>Delete Products</strong>: Admin can delete products from the store.</li>
            </ul>
        </li>
        <li><strong>User Management</strong>:
            <ul>
                <li><strong>View Users</strong>: Admin can view a list of registered users.</li>
                <li><strong>Delete Users</strong>: Admin can delete users from the platform.</li>
            </ul>
            
   </ul>
        </li>
        <li><strong>Order Management</strong>:
            <ul>
                <li><strong>View Orders</strong>: Admin can view customer orders and update their statuses.</li>
            </ul>
        </li>
        <li><strong>Search</strong>:
            <ul>
                <li><strong>Search Products</strong>: Admin can search for specific products by name or category.</li>
                <li><strong>Search Users</strong>: Admin can search for users by name or email.</li>
   </li>
   </ul>
  <h2>Technologies Used</h2>
  <ul>
        <li><strong>Frontend</strong>:ReactJS and RTK(Redux for state management)</li>
        <li><strong>Backend</strong>: Node.js, Express</li>
        <li><strong>Database</strong>: MongoDB</li>
        <li><strong>Authentication</strong>: JWT</li>
        <li><strong>Payments</strong>: Stripe integration for secure payments</li>
    </ul>

 <h2>Installation</h2>
    <ol>
        <li>Clone the repository:</li>
        <pre><code>git clone https://github.com/your-username/furnishop.git</code></pre>
        <li>Navigate to the project directory:</li>
        <pre><code>cd furnishop</code></pre>
        <li>Install dependencies:</li>
        <pre><code>npm install</code></pre>
        <li>Set up environment variables (e.g., database URI, Stripe keys, etc.).</li>
        <li>Start the development server:</li>
        <pre><code>npm run app</code></pre>
    </ol>

 <h2>Usage</h2>
    <p>Once the server is running, you can visit the application in your browser. Regular users can sign up, log in, browse products, add items to the cart, and complete purchases via Stripe. Admins have access to the admin dashboard to manage users, products, and orders.</p>
  <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
