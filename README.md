# RecruitShot - AI Headshot Generator

Professional AI-generated headshots for college recruiting and professional profiles.

🔗 **Live Site:** [recruitshot.com](https://recruitshot.com)

## Overview

RecruitShot is a full-stack SaaS application that generates professional headshots using AI, specifically designed for college students preparing for recruiting season.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Payments:** Stripe API
- **Image Processing:** Cloudinary (storage & optimization)
- **AI:** Astria.ai API (model training & generation)
- **Deployment:** Vercel

## Key Features

- AI-powered professional headshot generation
- Secure payment processing with Stripe
- Optimized image storage and delivery
- Responsive UI design
- User-friendly upload flow

## Technical Challenges Solved

- **Vercel Serverless Function Limits:** Implemented chunked image uploads to handle the 15MB body size limit on Vercel serverless functions
- **Image Optimization:** Built efficient image processing pipeline using Cloudinary for fast delivery
- **Payment Integration:** Implemented secure Stripe checkout flow with webhook handling

## Metrics

- 27+ paying customers
- Active production application

## What I Learned

- Full-stack application architecture with Next.js
- Payment processing and webhook handling
- Working with third-party AI APIs
- Managing image uploads at scale
- Deploying and maintaining production applications