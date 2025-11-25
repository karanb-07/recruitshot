# 14-DAY BUILD & LAUNCH CHECKLIST

Print this out and check off items as you complete them.

---

## DAY 1: SETUP & ACCOUNTS (4 hours)

### Morning (2 hours)
- [ ] Read through README_START_HERE.md completely
- [ ] Read through BUILD_GUIDE.md 
- [ ] Download and install Node.js (v18 or v20)
- [ ] Install VS Code or your preferred editor
- [ ] Create GitHub account (if you don't have one)

### Afternoon (2 hours)
- [ ] Create Stripe account → https://stripe.com
  - [ ] Enable test mode
  - [ ] Get publishable key (pk_test_...)
  - [ ] Get secret key (sk_test_...)
  - [ ] Save keys somewhere safe
  
- [ ] Create Astria.ai account → https://www.astria.ai
  - [ ] Sign up and verify email
  - [ ] Get API key from dashboard
  - [ ] Test with $5 credit
  
- [ ] Create Resend account → https://resend.com
  - [ ] Sign up (free tier)
  - [ ] Get API key
  - [ ] Set up test domain OR verify your domain

**End of Day 1 Checkpoint:**
✓ All accounts created
✓ All API keys collected
✓ Development environment ready

---

## DAY 2: BUILD LANDING PAGE (6 hours)

### Setup Project (1 hour)
- [ ] Open terminal/command prompt
- [ ] Run: `npx create-next-app@latest ai-headshots`
  - [ ] Choose TypeScript: Yes
  - [ ] Choose Tailwind: Yes
  - [ ] Choose App Router: Yes
- [ ] Run: `cd ai-headshots`
- [ ] Run: `npm install stripe @stripe/stripe-js resend`
- [ ] Open project in VS Code

### Create Components (3 hours)
- [ ] Create `components` folder
- [ ] Create `components/Hero.tsx` (copy from BUILD_GUIDE.md)
- [ ] Create `components/HowItWorks.tsx` (copy from BUILD_GUIDE.md)
- [ ] Create `components/Pricing.tsx` (copy from BUILD_GUIDE.md)
- [ ] Create `components/FAQ.tsx` (copy from BUILD_GUIDE.md)

### Update Landing Page (1 hour)
- [ ] Replace `app/page.tsx` with landing page code
- [ ] Update styles in `app/globals.css` if needed
- [ ] Test: Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Verify all sections render correctly
- [ ] Test on mobile (browser dev tools)

### Add Your Content (1 hour)
- [ ] Replace placeholder images with your photos
- [ ] Update copy to match your voice
- [ ] Customize colors if desired
- [ ] Add your contact email

**End of Day 2 Checkpoint:**
✓ Landing page works
✓ Looks good on mobile
✓ All sections present
✓ Ready for Day 3

---

## DAY 3: BUILD UPLOAD & PAYMENT (6 hours)

### Create Upload Page (2 hours)
- [ ] Create folder: `app/upload`
- [ ] Create `app/upload/page.tsx` (copy from app_upload_page.tsx)
- [ ] Test drag & drop with sample images
- [ ] Verify file preview works
- [ ] Test email validation

### Add Environment Variables (30 mins)
- [ ] Copy `env.local.template` to `.env.local`
- [ ] Fill in your Stripe keys
- [ ] Fill in your Astria key
- [ ] Fill in your Resend key
- [ ] Set NEXT_PUBLIC_SITE_URL=http://localhost:3000
- [ ] Restart dev server

### Create Stripe Checkout (1.5 hours)
- [ ] Create folder: `app/api/create-checkout`
- [ ] Create `app/api/create-checkout/route.ts`
- [ ] Copy code from api_create_checkout_route.ts
- [ ] Update success/cancel URLs
- [ ] Test checkout flow

### Test Payment (1 hour)
- [ ] Go to http://localhost:3000/upload
- [ ] Upload 5 test photos
- [ ] Enter test email
- [ ] Click "Continue to Payment"
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Verify redirect works
- [ ] Check Stripe dashboard for payment

### Create Success Page (1 hour)
- [ ] Create folder: `app/success`
- [ ] Create `app/success/page.tsx` (copy from app_success_page.tsx)
- [ ] Test by completing a payment
- [ ] Verify success message shows

**End of Day 3 Checkpoint:**
✓ Upload page works
✓ Stripe checkout works
✓ Test payment successful
✓ Success page displays

---

## DAY 4: FILE UPLOAD & WEBHOOKS (5 hours)

### Create Upload API (1.5 hours)
- [ ] Create folder: `app/api/upload`
- [ ] Create `app/api/upload/route.ts`
- [ ] Copy code from api_upload_route.ts
- [ ] Create `uploads` folder in project root
- [ ] Test file upload
- [ ] Verify files save to uploads/{sessionId}/

### Set Up Webhook (1.5 hours)
- [ ] Create folder: `app/api/webhook`
- [ ] Create `app/api/webhook/route.ts`
- [ ] Copy code from api_webhook_route.ts
- [ ] Install Stripe CLI: https://stripe.com/docs/stripe-cli
- [ ] Run: `stripe listen --forward-to localhost:3000/api/webhook`
- [ ] Copy webhook secret (whsec_...)
- [ ] Add to .env.local
- [ ] Restart dev server

### Test Webhook (1 hour)
- [ ] Make a test payment
- [ ] Check terminal for webhook event
- [ ] Verify webhook receives checkout.session.completed
- [ ] Check console logs

### Debug Issues (1 hour)
- [ ] Fix any errors that came up
- [ ] Re-test full flow
- [ ] Verify all pieces connect

**End of Day 4 Checkpoint:**
✓ Files upload and save
✓ Webhook receives events
✓ Full payment flow works
✓ Ready for AI integration

---

## DAY 5: AI GENERATION (5 hours)

### Create Generation API (2 hours)
- [ ] Create folder: `app/api/generate`
- [ ] Create `app/api/generate/route.ts`
- [ ] Copy code from api_generate_route.ts
- [ ] Update Astria API configuration
- [ ] Add proper error handling

### Test AI Generation (2 hours)
- [ ] Upload YOUR OWN photos (5-10 clear face shots)
- [ ] Complete payment with test card
- [ ] Wait for webhook to trigger
- [ ] Check Astria dashboard for job
- [ ] Wait for generation (~30-45 minutes)
- [ ] Verify headshots are generated
- [ ] Download and review quality

### Set Up Email Delivery (1 hour)
- [ ] Update generate route with email sending
- [ ] Test confirmation email sends
- [ ] Test delivery email with download links
- [ ] Verify emails aren't in spam

**End of Day 5 Checkpoint:**
✓ AI generation works
✓ Headshots look good quality
✓ Emails send successfully
✓ Full flow works end-to-end

---

## DAY 6-7: POLISH & TEST (8 hours total)

### Day 6 Tasks (4 hours)
- [ ] Fix any bugs from testing
- [ ] Improve error messages
- [ ] Add loading states
- [ ] Test on different devices
- [ ] Test with different photo types
- [ ] Optimize mobile experience
- [ ] Add better validation

### Day 7 Tasks (4 hours)
- [ ] Generate headshots for yourself
- [ ] Generate for 2-3 friends (free)
- [ ] Get honest feedback
- [ ] Make improvements based on feedback
- [ ] Test refund process
- [ ] Write customer support templates
- [ ] Prepare FAQ answers

**End of Day 7 Checkpoint:**
✓ Product works reliably
✓ You've tested it yourself
✓ Friends have tested it
✓ Bugs fixed
✓ Ready for beta

---

## DAY 8-10: BETA TESTING (12 hours total)

### Beta Preparation (Day 8, 2 hours)
- [ ] Create list of 20 people to give free headshots
  - [ ] 10 close friends
  - [ ] 5 classmates
  - [ ] 5 online connections
- [ ] Write beta invitation message
- [ ] Prepare feedback survey
- [ ] Set up tracking for beta users

### Beta Launch (Day 8-9, 6 hours)
- [ ] Send invitations to 20 beta users
- [ ] Offer free Standard package
- [ ] Ask for:
  - [ ] Honest feedback
  - [ ] Permission to use before/after photos
  - [ ] Testimonial if happy
  - [ ] Social media post (optional)
- [ ] Monitor closely for issues
- [ ] Respond to questions immediately
- [ ] Fix any new bugs

### Collect Assets (Day 10, 4 hours)
- [ ] Get 10-15 testimonials
- [ ] Collect 20+ before/after examples
- [ ] Get permission to use in marketing
- [ ] Screenshot positive feedback
- [ ] Edit best examples for landing page
- [ ] Update landing page with real examples

**End of Day 10 Checkpoint:**
✓ 20 beta users tested product
✓ 10+ testimonials collected
✓ 20+ before/after examples
✓ Product quality validated
✓ Ready for marketing prep

---

## DAY 11-12: MARKETING PREP (8 hours total)

### Create Content (Day 11, 4 hours)
- [ ] Write 30 days of post ideas
- [ ] Create 10 social media templates in Canva
- [ ] Record 5 demo videos (screen recordings)
- [ ] Take screenshots of best results
- [ ] Write launch announcement
- [ ] Prepare Reddit posts for 10 subreddits

### Set Up Channels (Day 11, 2 hours)
- [ ] Create Twitter/X account (optional)
- [ ] Create TikTok account
- [ ] Join 10-15 relevant Facebook groups
- [ ] Join 5-10 subreddits
- [ ] Build karma on Reddit (comment helpfully)
- [ ] Prepare email list (friends/family)

### Test Marketing (Day 12, 2 hours)
- [ ] Post beta results on personal LinkedIn
- [ ] Share in close friend group chats
- [ ] Get feedback on messaging
- [ ] Refine value proposition
- [ ] A/B test different headlines

**End of Day 12 Checkpoint:**
✓ 30 days of content ready
✓ Social media accounts set up
✓ Reddit karma built
✓ Launch posts written
✓ Ready to deploy

---

## DAY 13: DEPLOY TO PRODUCTION (4 hours)

### Git Setup (30 mins)
- [ ] Run: `git init`
- [ ] Create `.gitignore` (include .env.local)
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Push code to GitHub

### Deploy to Vercel (1 hour)
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Import repository
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Wait for build to complete
- [ ] Visit your live site
- [ ] Test everything works

### Update Stripe Webhook (30 mins)
- [ ] Go to Stripe Dashboard → Webhooks
- [ ] Add new endpoint
- [ ] URL: https://your-app.vercel.app/api/webhook
- [ ] Select event: checkout.session.completed
- [ ] Copy webhook secret
- [ ] Update STRIPE_WEBHOOK_SECRET in Vercel
- [ ] Redeploy if needed

### Final Production Tests (2 hours)
- [ ] Test full flow on production
- [ ] Make real $19 payment (you'll keep the money)
- [ ] Verify webhook fires
- [ ] Verify generation works
- [ ] Verify emails send
- [ ] Test on mobile device
- [ ] Share with one friend to test

**End of Day 13 Checkpoint:**
✓ Site is live
✓ Production fully tested
✓ All systems working
✓ Ready to launch tomorrow

---

## DAY 14: LAUNCH DAY! 🚀

### Pre-Launch (8am, 1 hour)
- [ ] Switch Stripe to LIVE mode
- [ ] Update Stripe keys in Vercel
- [ ] Final production test with live payment
- [ ] Prepare launch posts
- [ ] Set up laptop to monitor orders
- [ ] Clear schedule for the day
- [ ] Get coffee ☕

### Launch (9am EST, 2 hours)
- [ ] Post on LinkedIn with founder story
- [ ] Post in 10-15 college Facebook groups
- [ ] Post on 5-10 relevant subreddits:
  - [ ] r/college
  - [ ] r/resumes
  - [ ] r/careerguidance
  - [ ] r/consulting
  - [ ] r/finance
  - [ ] etc.
- [ ] Text/email 50 friends and family
- [ ] Post on personal social media
- [ ] Post in class group chats

### Monitor (All Day)
- [ ] 10am: Check first responses
- [ ] 12pm: Respond to all questions
- [ ] 2pm: Check sales
- [ ] 4pm: Post follow-up content
- [ ] 6pm: Evening check
- [ ] 9pm: Daily recap
- [ ] Celebrate first sale! 🎉

### End of Day Tasks (9pm)
- [ ] Count total sales
- [ ] Respond to all messages
- [ ] Fix any urgent issues
- [ ] Plan tomorrow's marketing
- [ ] Update tracking spreadsheet

**End of Day 14 Checkpoint:**
✓ Successfully launched
✓ First sales received
✓ Customers happy
✓ Ready for Week 2-8

---

## WEEK 2-8: DAILY ROUTINE

### Every Morning (30 mins)
- [ ] Check sales overnight
- [ ] Respond to all customer messages
- [ ] Review any issues/refunds
- [ ] Plan daily marketing

### Every Afternoon (1-2 hours)
- [ ] Create and post marketing content
- [ ] Engage with comments
- [ ] Answer questions on Reddit/social
- [ ] Work on next viral content piece

### Every Evening (30 mins)
- [ ] Check daily sales
- [ ] Respond to remaining messages
- [ ] Update revenue tracking
- [ ] Celebrate wins

### Weekly (2 hours)
- [ ] Review what's working in marketing
- [ ] Double down on best channels
- [ ] Collect new testimonials
- [ ] Plan next week's content

---

## CRITICAL SUCCESS METRICS

Track these daily:
- [ ] Daily sales
- [ ] Total revenue
- [ ] Conversion rate
- [ ] Refund rate (should be <5%)
- [ ] Customer satisfaction
- [ ] Which marketing channels work best

---

## IF THINGS GO WRONG

### No sales in first 48 hours?
- [ ] Check if site is actually live
- [ ] Verify payment flow works
- [ ] Post in more places
- [ ] Ask friends why they didn't buy
- [ ] Consider price adjustment

### High refund rate (>10%)?
- [ ] Check AI generation quality
- [ ] Improve photo upload guidance
- [ ] Add more style variety
- [ ] Respond faster to issues

### Technical issues?
- [ ] Check Vercel logs
- [ ] Review error messages
- [ ] Test in incognito mode
- [ ] Ask for help in relevant Discord/Reddit

---

## FINAL REMINDERS

1. **Ship before perfect** - Launch on Day 14 even if not 100% ready
2. **Market every day** - Consistency matters more than perfection
3. **Respond quickly** - <2 hours for all customer questions
4. **Iterate fast** - Fix issues immediately
5. **Don't quit** - Week 2-3 will feel slow, that's normal
6. **Ask for help** - Friends, Reddit, Discord communities
7. **Celebrate wins** - Every sale is progress
8. **Stay focused** - 60 days of intense work for $15K+

---

## YOU'VE GOT THIS! 🚀

The playbook is clear. The code is ready. The market exists.

The only variable is you.

Will you do the work?

Let's find out.

**START DAY 1 RIGHT NOW.**

Good luck! 💪
