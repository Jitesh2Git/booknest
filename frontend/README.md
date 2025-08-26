# BookNest 📚

BookNest is website to discover, collect, and manage your favourite books online. A full-stack application built with React and Django GraphQL that allows users to browse, search, and manage their personal book collection.

## 🌐 Live Demo

- **Frontend**: [https://booknest-store.netlify.app](https://booknest-store.netlify.app)
- **Backend API**: [Your Backend URL Here]

## 🌟 Features

- **Browse & Search Books**: Discover books with a responsive search interface
- **Book Details**: View information about each book
- **Favorites Management**: Add books to your personal favorites list (persisted in localStorage)
- **Responsive Design**: Modern UI built with Tailwind CSS and ShadCN UI
- **GraphQL API**: Efficient data fetching with Django GraphQL backend
- **Pagination**: Smooth browsing experience with paginated results

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **ShadCN/ui** components
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend

- **Django**
- **Graphene-Django** for GraphQL
- **Django CORS Headers** for cross-origin requests
- **Python Decouple** for environment variables

## 🚀 Quick Start

### Backend Setup

1. **Clone the repository**

   ```bash
   cd booknest
   git clone https://github.com/Jitesh2Git/booknest .
   ```

2. **Navigate to backend directory**

   ```bash
   cd backend
   ```

3. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Setup environment variables**
   Create a `.env` file in the backend directory:

   ```env
   CORS_ALLOWED_ORIGINS=your-frontend-url
   ```

6. **Run migrations**

   ```bash
   python manage.py migrate
   ```

7. **Start the development server**

   ```bash
   python manage.py runserver
   ```

   The GraphQL endpoint will be available at: `http://localhost:8000/graphql/`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at: `http://localhost:3000/`

### Frontend Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Search & Filter**: Real-time book search functionality
- **Favorites System**: Add/remove books from favorites (localStorage)
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

### Backend Features

- **GraphQL API**: Efficient querying with GraphQL
- **CRUD Operations**: Complete book management
- **Search Functionality**: Search books by title or author
- **Pagination**: Pagination for better performance
- **CORS Support**: Configured for frontend integration

## 🐳 Production Deployment

### Environment Variables

Create production environment variables:

**Frontend (.env.local)**

```env
VITE_API_URL=your-backend-url
```

**Backend (.env)**

```env
CORS_ALLOWED_ORIGINS=your-frontend-url
```

## 🧪 Available Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend

```bash
python manage.py runserver    # Start development server
python manage.py migrate      # Run database migrations
python manage.py createsuperuser  # Create admin user
```
