
# Quizzer v2.0  

https://github.com/user-attachments/assets/36a23226-dd01-4ea8-9135-1f5d379a84aa



🚀 **Quizzer** is an AI-Enhanced Real-Time Leaderboard Quiz Application designed to make learning engaging, interactive, and efficient. With tailored features for teachers and students, Quizzer empowers educators to create quizzes effortlessly and enables students to compete in real-time.  

## 🌟 **Features**  

### Teacher Dashboard  
- View and manage past quizzes.  
- Create quizzes manually or generate them instantly using AI.  
- Track real-time progress with dynamic leaderboards.  
- Secure and role-based access for educators.  

### Student Dashboard  
- Join new quiz rooms or revisit past quiz records.  
- View quiz descriptions before starting.  
- Compete with peers on real-time leaderboards.  

### General Highlights  
- **AI-Powered Quiz Creation**: Generate MCQs based on topics effortlessly.  
- **Real-Time Leaderboards**: Boost engagement and competition during quizzes.  
- **Secure Authentication**: Powered by Supabase for login/signup.  
- Built with:  
  - **Frontend**: Next.js, TypeScript, TailwindCSS  
  - **Backend**: Node.js, Prisma, PostgreSQL, Socket.io  

## 🛠️ **Tech Stack**  
- **Frontend**: Next.js, TypeScript, TailwindCSS  
- **Backend**: Node.js, Prisma  
- **Database**: PostgreSQL  
- **Real-Time Updates**: Socket.io  
- **Authentication**: Supabase  

## 🚀 **Future Enhancements**  
- Automatic feedback and areas of improvement sent via email.  
- Pre-quiz group chat option for better interaction before the quiz begins.  

## ⚙️ **Setup Instructions**  

### Prerequisites  
- Node.js (v16 or higher)  
- PostgreSQL  
- Supabase account (for authentication)  

### Steps to Run Locally  

#### 1. Clone the Repository:  
   ```bash  
   git clone https://github.com/your-username/quizzer.git  
   cd quizzer  
   ```  

#### 2. Set Up the Backend  

1. Navigate to the backend folder:  
   ```bash  
   cd backend  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables for the backend:  
   Create a `.env` file in the `backend` directory with the following:  
   ```env  
   DATABASE_URL=your_postgresql_connection_string  
   JWT_SECRET=your_jwt_secret  
   ```  

4. Run database migrations:  
   ```bash  
   npx prisma migrate dev  
   ```  

5. Start the backend server:  
   ```bash  
   npm run dev  
   ```  

#### 3. Set Up the Frontend  

1. Navigate to the frontend folder:  
   ```bash  
   cd ../frontend  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables for the frontend:  
   Create a `.env.local` file in the `frontend` directory with the following:  
   ```env  
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key  
   BACKEND_API_URL=http://localhost:5000 # Adjust to match your backend's local URL  
   ```  

4. Start the frontend development server:  
   ```bash  
   npm run dev  
   ```  

   The app will be available at `http://localhost:3000`.  

### Deployment  

1. Deploy the **backend** on a platform like Railway, AWS, or Heroku.  
2. Deploy the **frontend** on platforms like Vercel or Netlify.  
3. Ensure that the environment variables are set correctly on the respective platforms.  

## 🙌 **Contributing**  
Contributions are welcome! Open an issue or submit a pull request to suggest features or report bugs.  

--- 

This version provides clear instructions for both frontend and backend setup while keeping it concise.
