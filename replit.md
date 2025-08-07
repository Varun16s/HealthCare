# MindMap AR - Mental Health Navigation Platform

## Overview

MindMap AR is a specialized mental health appointment scheduling platform designed specifically for neurodivergent teens. The application combines AI-powered assistance with a comprehensive booking system to help users find appropriate mental health support tailored to their unique needs. The platform features an intelligent chat system that provides personalized recommendations, crisis support resources, and seamless appointment management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management and React Context for authentication
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Form Management**: React Hook Form with Zod schema validation
- **Component Structure**: Modular dashboard sections with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API with structured route handlers
- **Storage Strategy**: Dual approach with in-memory storage for development and Drizzle ORM ready for PostgreSQL production
- **Session Management**: Local storage for client-side session persistence
- **Middleware**: Request logging, error handling, and JSON body parsing

### Authentication & Authorization
- **Authentication**: Simple email/password authentication with user registration
- **Session Management**: Client-side session storage with automatic persistence
- **User Roles**: Single user role system focused on teen users aged 13-19
- **Security**: Password validation and email uniqueness constraints

### Data Architecture
- **Database Schema**: Three core entities - Users, Appointments, and Chat Messages
- **User Model**: Comprehensive profile including communication preferences and support areas
- **Appointment Model**: Flexible scheduling with support types, specialists, and session preferences
- **Chat Model**: Conversational AI interaction tracking with user/AI message distinction
- **Validation**: Zod schemas for runtime type checking and data validation

### AI Integration
- **Chat System**: Rule-based AI response system for mental health support
- **Specialist Matching**: AI recommendations based on user preferences and needs
- **Crisis Detection**: Keyword-based crisis intervention with immediate resource provision
- **Response Categories**: Specialized responses for anxiety, ADHD, depression, autism, and social skills

### Styling & Design System
- **Design Framework**: Custom design system extending Tailwind CSS
- **Theme**: Sage green and teal color palette optimized for neurodivergent accessibility
- **Typography**: Inter font family for clear readability
- **Component Library**: Comprehensive shadcn/ui implementation with custom theming
- **Responsive Design**: Mobile-first approach with adaptive layouts

## External Dependencies

- **Database**: Neon PostgreSQL for production data persistence
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **UI Components**: Radix UI primitives for accessible component foundations
- **Validation**: Zod for schema validation and type safety
- **HTTP Client**: Native fetch API for server communication
- **Build Tools**: Vite for frontend bundling and esbuild for server compilation
- **Development**: tsx for TypeScript execution and Replit-specific development plugins
- **Styling**: Tailwind CSS with PostCSS processing and autoprefixer