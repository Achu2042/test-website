# Hekate Automation - Smart Home Solutions Platform

## Overview

Hekate Automation is a comprehensive smart home automation platform that combines an Express.js backend with a React frontend to deliver smart home products and services. The platform features an e-commerce system for smart home products, service information for automation and security solutions, and integrated customer management capabilities with Replit authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: TanStack Query (React Query) for server state management
- **Authentication Flow**: Conditional routing based on authentication status, with landing page for unauthenticated users and full app access for authenticated users

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Replit OIDC-based authentication with Passport.js
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **API Design**: RESTful endpoints organized by resource type (products, categories, cart, orders, blog, etc.)

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Key Entities**: 
  - Users (Replit auth integration)
  - Products and Categories (e-commerce catalog)
  - Shopping Cart and Orders (e-commerce transactions)
  - Blog Posts (content management)
  - Demo Bookings and Contact Inquiries (lead generation)
  - Sessions (authentication state)

### Authentication & Authorization
- **Provider**: Replit OIDC authentication
- **Session Storage**: PostgreSQL-backed sessions with 7-day TTL
- **Access Control**: Route-level protection with authenticated/unauthenticated user flows
- **User Management**: Automatic user creation/update on authentication

### Application Structure
- **Monorepo Layout**: Client, server, and shared code in separate directories
- **Shared Schema**: Common TypeScript types and Zod validation schemas
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Hot reloading with Vite dev server and TSX for backend development

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit OIDC service
- **Build Tools**: Vite (frontend), esbuild (backend), TypeScript compiler

### UI and Styling
- **Component Library**: Radix UI primitives with Shadcn/ui customization
- **Styling**: Tailwind CSS with CSS variables for theming
- **Icons**: Lucide React icon library
- **Fonts**: Google Fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono)

### Data Management
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for runtime type validation and schema generation
- **HTTP Client**: Native fetch API with TanStack Query for caching and synchronization

### Development and Deployment
- **Runtime Error Handling**: Replit error overlay for development
- **Code Navigation**: Replit Cartographer for development environment
- **Package Management**: npm with lockfile version 3
- **Environment**: Replit deployment platform with banner integration