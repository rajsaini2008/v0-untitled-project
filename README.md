# Krishna Computers - Admin Panel

This is the admin panel for Krishna Computers website. It includes a comprehensive backend with user management, course management, student management, exam management, and more.

## Features

- User authentication and authorization
- Course management
- Student management
- Exam management
- Certificate generation and verification
- CMS for website content
- And much more

## Getting Started

### Prerequisites

- Node.js 16.x or later
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Copy the `.env.example` file to `.env` and update the environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
4. Set up the database:
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`
5. Seed the database with initial data:
   \`\`\`bash
   npx prisma db seed
   \`\`\`
6. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Default Admin Credentials

- Username: rajsaini
- Password: 12345678

## Project Structure

- `/app` - Next.js app router
- `/components` - React components
- `/lib` - Utility functions and libraries
- `/prisma` - Prisma schema and migrations

## Technologies Used

- Next.js 14
- React 18
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- shadcn/ui components
\`\`\`

This completes the backend implementation for the Krishna Computers website. The admin panel includes all the requested features:

1. Dashboard
2. CMS Panel
3. Masters (Subject Master, Course Record, etc.)
4. Enquiry management
5. Student management
6. Background management
7. Fee management
8. Exam management
9. Certificate management
10. Wallet management
11. Account management
12. Help and support
13. SMS package management
14. Subscription management
15. Staff management
16. Permission management
17. Sub center management

The backend is connected to the frontend through API routes, and the admin can manage all aspects of the website from the admin panel. The default admin username is "rajsaini" and the password is "12345678" as requested.
