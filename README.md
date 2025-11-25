# AI Headshot Generator - Boilerplate Code

This is the complete boilerplate code for the AI Headshot Generator project.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the template
cp .env.local.template .env.local

# Edit .env.local and add your API keys:
# - Stripe keys (from https://stripe.com)
# - Astria API key (from https://astria.ai)
# - Resend API key (from https://resend.com)
```

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── upload/
│   │   └── page.tsx          # Photo upload page
│   ├── success/
│   │   └── page.tsx          # Payment success page
│   └── api/
│       ├── create-checkout/  # Stripe checkout
│       ├── webhook/          # Stripe webhook
│       ├── upload/           # File upload
│       └── generate/         # AI generation
├── components/
│   ├── Hero.tsx              # Hero section
│   ├── HowItWorks.tsx        # How it works
│   ├── Pricing.tsx           # Pricing cards
│   └── FAQ.tsx               # FAQ accordion
├── public/                   # Static assets
├── .env.local.template       # Environment variables template
└── package.json              # Dependencies
```

## 🔑 Required API Keys

You need accounts and API keys for:
1. **Stripe** - Payment processing
2. **Astria.ai** - AI headshot generation
3. **Resend** - Email notifications

## 📚 Documentation

See the included markdown files for:
- `BUILD_GUIDE.md` - Detailed build instructions
- `DEPLOYMENT_GUIDE.md` - How to deploy to Vercel
- `14_DAY_CHECKLIST.md` - Day-by-day action plan

## 💡 Next Steps

1. Set up your API keys in `.env.local`
2. Test locally with `npm run dev`
3. Follow the 14-day checklist to launch

## 🐛 Troubleshooting

- **Module not found errors**: Run `npm install`
- **Stripe errors**: Check your API keys in `.env.local`
- **Upload not working**: Create an `uploads` folder in the root
- **Email not sending**: Verify your Resend API key

## 📖 Full Documentation

Check the `_DOCUMENTATION` folder for:
- Complete build guide
- Revenue projections
- Marketing playbook
- Launch checklist

## 🎯 Goal

Launch this in 14 days and make $15K+ in 60 days!

Good luck! 🚀
