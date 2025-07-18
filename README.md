Video Platform - Frontend
This is the frontend for the Scalable Video Platform, built with Next.js and React. It provides a responsive and interactive user interface for browsing, watching, and uploading videos.

Features
Responsive UI: The user interface is fully responsive and works across different devices, built with Tailwind CSS without external UI libraries.

HLS Video Playback: Smooth HLS video playback using the HLS.js library.

Client-Side Authentication: Securely manages user sessions and protects routes.

Video Upload Interface: A user-friendly form for uploading new videos.

Interactive Commenting: Users can post comments on videos and see updates in real-time.

Optimistic UI Updates: Features like commenting provide instant feedback to the user.

Loading States: Uses skeleton loaders to improve perceived performance while data is being fetched.

Technology Stack
Framework: Next.js

Language: TypeScript

UI Library: React

Styling: Tailwind CSS

Video Playback: HLS.js

State Management: React Context

Setup and Running
The frontend is a standard Next.js application.

1. Configure Environment
   In the /frontend directory, create a .env.local file.

Add the following line, pointing to your backend's URL:

NEXT_PUBLIC_API_URL=http://localhost:3000

2. Install Dependencies
   Navigate to the /frontend directory and run:

npm install

3. Run the Development Server
   Once the dependencies are installed, run the development server:

npm run dev

The frontend application will be available at http://localhost:3001.
