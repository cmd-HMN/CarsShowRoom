# Car Showroom 🚗💻

Welcome to **Car Showroom**, a web application exploring modern web technologies with the MERN stack, TypeScript, and Tailwind CSS! 🎉

## 🚀 Features

- **User CRUD**: Users can create, read, update, and delete their profiles and other data.
- **Admin CRUD**: Admins have full control over managing users, inventory, and more.
- **User Dashboard**: Personalized dashboard for users to manage their activities.
- **Admin Dashboard**: Comprehensive dashboard for admins to oversee the entire platform.
- **Cart**: Add cars to your cart
- **Favorites**: Mark your favorite cars for later!
- **Sold, View & Like**: Track sold items, views, and likes for an interactive experience.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **State Management**: Context API / Redux (depending on your choice)
- **Styling**: Tailwind CSS for sleek, responsive designs

## 🏃‍♂️ How to Run

### Method 1: Dual-Terminal Action 🎯(Prefer Path)

1. Open two terminals.
2. **Server**:
   ```bash
   cd server
   npm install
   npm run HMN
   ```
3. **Client**:
   ```bash
   cd client
   npm install
   npm run HMN
   ```
4. **Localhost**: 
   - Client: `http://localhost:5173`
   - Server: `http://localhost:3000`

### Method 2: Single-Terminal Magic 🪄

1. **Install Dependencies**:
   ```bash
   cd client
   npm install
   npm run build
   cd ../server
   npm install
   npm run build
   ```
2. **Run the Server**:
   ```bash
   cd ../server
   npm run start
   ```
3. **Localhost**:
   - Host: `http://localhost:3000`

## 🔑 Environment Variables

Ensure you have the following environment variables set up:

### Client Side

Create a `.env` file in the `client` directory with the following content:

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_TINY=<your-tinymce-editor-api-key>
```

- **`VITE_API_BASE_URL`**: Base URL for the API (typically the server running on `http://localhost:3000`).
- **`VITE_TINY`**: API key for the TinyMCE editor.

### Server Side

Create a `.env` file in the `server` directory with the following content:

```bash
MONGODB_URL=<your-mongodb-url>
JWT_SECRET_KEY=<your-jwt-secret-key>
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

- **`MONGODB_URL`**: MongoDB connection string.
- **`JWT_SECRET_KEY`**: Secret key for signing JWT tokens.
- **`FRONTEND_URL`**: The URL of the frontend application, typically `http://localhost:5173`.
- **`CLOUDINARY_CLOUD_NAME`**: Cloudinary cloud name for image uploads.
- **`CLOUDINARY_API_KEY`**: Cloudinary API key.
- **`CLOUDINARY_API_SECRET`**: Cloudinary API secret key.

## 📚 Additional Notes

- **Add Data** : To add data more efficiently use admin form (There is no admin Sign up form to add the default admin run: )
   ```bash
   cd server
   ts-node src/defaultAdmin.ts
   ```
- **Development**: Tailored for learning and exploring web tech! Feel free to modify and experiment.
- **Environment**: Ensure MongoDB is running locally or update the connection string in the `.env` file.

## Unfinished features 

- There is no page for payment/Checkout.
- There is no admin-sign-in page.
- The is no report-view-details page.
- There is no reset password page.


If you encounter any issues, please [open an issue](https://github.com/cmd-HMN/CarsShowRoom/issues) on GitHub.

## 💡 Inspiration

This project is a playground for exploring full-stack development with a modern tech stack. Feel free to dive in, learn, and contribute! 
