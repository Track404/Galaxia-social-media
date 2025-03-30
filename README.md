
# **Galaxia** 🌌  
*A modern social media platform designed to showcase my web development skills.*  

## **Table of Contents**  
- [Features](#features)  
- [Demo](#demo)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  
- [License](#license)  

## **Features**  
✅ User authentication (Sign Up, Login, Logout with JWT & GitHub OAuth2)  
✅ Create and edit posts  
✅ Like and comment on posts  
✅ Follow/unfollow users  
✅ Secure REST API for data management  
✅ Responsive design with TailwindCSS  

## **Demo**  
🔗 **Live Demo:** [Galaxia](https://galaxiasocial.netlify.app/login)  
🔗 **Backend Repo:** [Galaxia-backend]([https://yourprojectlink.com](https://github.com/Track404/Galaxia-social-media-backend))  
📸 **Screenshots:**  
![Galaxia Home Page](screenshot.png)  

## **Installation**  
Clone the repository and install dependencies:  

```sh
git clone https://github.com/yourusername/galaxia.git  
cd galaxia  
npm install  
npm start  
```

### **Backend Setup**  
1. Create a `.env` file in the root directory and configure the following:  
   ```env
   DATABASE_URL=your_postgresql_database_url  
   JWT_SECRET=your_jwt_secret  
   GITHUB_CLIENT_ID=your_github_client_id  
   GITHUB_CLIENT_SECRET=your_github_client_secret  
   ```

2. Run database migrations (if applicable).  

```sh
npm run migrate
```

3. Start the backend server:  

```sh
npm run server
```

## **Usage**  
1. Create an account or log in using **GitHub OAuth2**.  
2. Create and edit posts.  
3. Like and comment on posts.  
4. Follow users to see their content in your feed.  

## **Technologies**  
🛠 **Frontend:** React, TailwindCSS  
🚀 **Backend:** Node.js, Express.js  
🛢 **Database:** PostgreSQL  
🔐 **Authentication:** JWT, OAuth2 (GitHub)  
📡 **API Type:** REST API  

## **Contributing**  
Contributions are welcome! Feel free to open an issue or submit a pull request.  

## **License**  
📜 MIT License - See the [LICENSE](LICENSE) file for details.  
