# Next.js Book Management App

A modern web application for managing your book collection, built with Next.js. This application features authentication via Kinde Auth, a polished UI using shadcn components, book data from the Google Books API, and persistent storage with Upstash Redis.

## Features

- 📚 Search and browse books using Google Books API
- 🔐 Secure authentication with Kinde
- 💾 Save and manage your personal book collection
- 🎨 Simple responsive UI with shadcn components
- ⚡ Fast and reliable data storage with Upstash Redis

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

You'll also need accounts and API keys for the following services:
- [Kinde](https://kinde.com/) for authentication
- [Google Books API](https://developers.google.com/books)
- [Upstash](https://upstash.com/) for Redis database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/book-management-app.git
cd book-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables: (Temporarily added for easy observation)
```env
# Kinde Auth Configuration
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your_domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# Google Books API
GOOGLE_BOOKS_API_KEY=your_google_books_api_key

# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables Setup

### Kinde Auth Setup
1. Create a Kinde account at [kinde.com](https://kinde.com)
2. Create a new application in Kinde dashboard
3. Set the following redirect URLs in your Kinde application settings:
   - Login: `http://localhost:3000/api/auth/kinde/callback`
   - Logout: `http://localhost:3000`
4. Copy the Client ID and Client Secret to your `.env.local` file

### Google Books API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Books API
4. Create credentials and copy the API key to your `.env.local` file

### Upstash Setup
1. Create an account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and REST Token to your `.env.local` file





