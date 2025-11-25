# 🚀 DEPLOYMENT & LAUNCH GUIDE

## STEP-BY-STEP SETUP (2-3 Hours)

### Phase 1: Get the Code Running Locally (30 mins)

```bash
# 1. Create Next.js project
npx create-next-app@latest ai-headshots
# Choose: TypeScript ✓, Tailwind ✓, App Router ✓

cd ai-headshots

# 2. Install dependencies
npm install stripe @stripe/stripe-js resend
npm install -D @types/node

# 3. Copy all the component files I provided into your project
# - app/page.tsx (landing page)
# - app/upload/page.tsx (upload page)
# - app/success/page.tsx (success page)
# - components/*.tsx (all component files)
# - app/api/*/route.ts (all API routes)

# 4. Create .env.local file
```

### Phase 2: Set Up Services (45 mins)

#### A. Stripe Setup
```bash
1. Go to https://stripe.com and create account
2. Get your API keys from Dashboard → Developers → API keys
3. Add to .env.local:
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

4. Set up webhook:
   - Go to Dashboard → Developers → Webhooks
   - Add endpoint: https://your-domain.com/api/webhook
   - Select events: checkout.session.completed
   - Copy webhook secret: STRIPE_WEBHOOK_SECRET=whsec_...

5. Test locally with Stripe CLI:
   stripe listen --forward-to localhost:3000/api/webhook
```

#### B. Astria.ai Setup (or Alternative)
```bash
1. Go to https://www.astria.ai
2. Sign up and get API key
3. Add to .env.local:
   ASTRIA_API_KEY=your_key_here

# ALTERNATIVES if Astria doesn't work:
# - HeadshotPro API: https://www.headshotpro.com/api
# - Leap AI: https://tryleap.ai
# - Replicate: https://replicate.com
# All have similar APIs, easy to swap
```

#### C. Email Setup (Resend)
```bash
1. Go to https://resend.com
2. Sign up (free tier: 3000 emails/month)
3. Verify your domain or use test domain
4. Get API key
5. Add to .env.local:
   RESEND_API_KEY=re_...
```

### Phase 3: Test Locally (30 mins)

```bash
# 1. Start dev server
npm run dev

# 2. Test the full flow:
✓ Landing page loads (http://localhost:3000)
✓ Upload page works (drag & drop files)
✓ Stripe checkout redirects properly
✓ Use test card: 4242 4242 4242 4242
✓ Success page shows after payment
✓ Webhook receives payment confirmation
✓ AI generation API gets called

# 3. Check logs for any errors
```

### Phase 4: Deploy to Production (30 mins)

#### A. Deploy to Vercel
```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ai-headshots.git
git push -u origin main

# 2. Go to https://vercel.com
# 3. Import GitHub repository
# 4. Add environment variables (all from .env.local)
# 5. Deploy!

# Your site will be live at: https://your-app.vercel.app
```

#### B. Set Up Custom Domain (Optional)
```bash
# 1. Buy domain on Namecheap/GoDaddy (~$10-15/year)
# 2. Add domain in Vercel dashboard
# 3. Update DNS records as shown
# 4. Wait 10-60 minutes for DNS propagation
```

#### C. Update Stripe Webhook
```bash
# 1. Go back to Stripe Dashboard → Webhooks
# 2. Update endpoint URL to production:
#    https://yourdomain.com/api/webhook
# 3. Test with Stripe test mode first!
```

---

## TESTING CHECKLIST

### Before Launch Testing
```
□ Landing page loads and looks good on mobile
□ All component styles render correctly
□ Upload page accepts 5-10 photos
□ Email validation works
□ Stripe checkout opens
□ Test payment goes through (use 4242 4242 4242 4242)
□ Webhook receives payment event
□ Success page displays correctly
□ Confirmation email is sent
□ Photos are saved to server
□ AI generation API is called

# Test with real photos of yourself first!
```

### Beta Testing (Week 1-2)
```
□ Generate headshots for yourself (verify quality)
□ Give free access to 10 friends
□ Collect feedback on:
  - Photo upload experience
  - Payment process
  - Headshot quality
  - Email delivery speed
□ Get permission to use their before/after photos
□ Request testimonials
□ Fix any bugs or quality issues
```

---

## COST BREAKDOWN

### Per Customer Costs
```
AI Generation (Astria):        $1.50-2.50
Stripe fees (2.9% + $0.30):    $0.85 ($19) or $1.15 ($29)
Email (Resend):                $0 (within free tier)
Hosting (Vercel):              $0 (free tier works fine)
Storage:                       $0.01-0.05 (if using S3)
--------------------------------
TOTAL per sale:                $2.35-3.70

Profit per $19 sale:           $15.30-16.65 (80-87%)
Profit per $29 sale:           $25.30-26.65 (87-92%)
```

### Fixed Monthly Costs
```
Domain name:                   $1-2/month
Stripe account:                $0
Vercel hosting:                $0 (free tier sufficient)
Astria API:                    Pay per use
Resend email:                  $0 (up to 3000/month)
--------------------------------
TOTAL fixed costs:             $1-2/month

You can run this for basically FREE until you hit scale!
```

---

## OPTIMIZATION TIPS

### Week 1-2: Get It Working
- Don't worry about perfect code
- Focus on core flow working end-to-end
- Use test mode for everything
- Beta test with 10-20 people

### Week 3-4: Polish Based on Feedback
- Improve UI based on user confusion
- Add better error messages
- Speed up generation if possible
- Add more headshot style variety

### Week 5+: Scale
- Switch to production Stripe mode
- Add analytics (Google Analytics, Plausible)
- Set up proper error monitoring (Sentry)
- Consider adding admin dashboard

---

## COMMON ISSUES & FIXES

### Issue: Stripe webhook not firing
```
Fix 1: Make sure webhook endpoint is publicly accessible
Fix 2: Check Stripe webhook logs for errors
Fix 3: Verify webhook secret is correct in .env
Fix 4: Use Stripe CLI for local testing: 
       stripe listen --forward-to localhost:3000/api/webhook
```

### Issue: Photos not uploading
```
Fix 1: Check file size limits (default 4.5MB in Next.js)
Fix 2: Verify upload directory exists and has write permissions
Fix 3: Check browser console for CORS errors
Fix 4: Increase upload timeout in next.config.js
```

### Issue: AI generation failing
```
Fix 1: Verify API key is correct
Fix 2: Check API rate limits / credits
Fix 3: Ensure photos are in correct format
Fix 4: Review Astria API logs/errors
Fix 5: Test with alternative AI service
```

### Issue: Emails not sending
```
Fix 1: Verify Resend API key
Fix 2: Check sender domain is verified
Fix 3: Look in spam folder
Fix 4: Test with Resend dashboard first
Fix 5: Check email quota (free tier limits)
```

---

## LAUNCH DAY CHECKLIST

### T-1 Day (Day Before Launch)
```
□ Switch Stripe to live mode
□ Update all environment variables to production
□ Test full flow one more time in production
□ Prepare launch posts for all platforms
□ Have customer support email ready
□ Set up laptop to monitor orders
□ Get beta user testimonials formatted
□ Prepare before/after examples
□ Write FAQ responses
□ Have refund process ready
```

### Launch Day (9am EST)
```
□ Post on all platforms simultaneously:
  - Reddit (5-10 subreddits)
  - LinkedIn (personal + relevant groups)
  - Twitter/X
  - TikTok
  - Instagram
  - Facebook groups (college groups)
  - WhatsApp/text to friends/family

□ Monitor every 30 minutes for:
  - Orders coming in
  - Customer questions
  - Technical issues
  - Refund requests

□ Respond to EVERY question within 2 hours
```

### First Week
```
□ Post marketing content daily
□ Respond to all customer messages within 2 hours
□ Fix bugs immediately
□ Collect testimonials from happy customers
□ Ask satisfied customers to share
□ Track metrics:
  - Daily sales
  - Conversion rate
  - Refund rate
  - Most common questions
```

---

## ANALYTICS TO TRACK

### Key Metrics
```
Daily Sales:              Track in spreadsheet + Stripe dashboard
Conversion Rate:          Visitors → Sales (aim for 2-5%)
Average Order Value:      Mix of $19 vs $29 sales
Refund Rate:             Target <5%
Customer Satisfaction:    Survey after delivery
Email Open Rate:          Track in Resend
Traffic Sources:          Which channels drive sales?
Time to First Sale:       Should be <48 hours of launch
```

### Tools
```
Analytics:               Google Analytics or Plausible
Payments:                Stripe Dashboard
Email:                   Resend Dashboard
Errors:                  Sentry (optional)
Customer Support:        Simple email or Zendesk
```

---

## WEEK 1 ACTION ITEMS

### Monday (Launch Day)
```
8:00am - Final systems check
9:00am - Post everywhere simultaneously
10:00am - Monitor first responses
12:00pm - Lunch break (keep phone nearby)
2:00pm - Respond to all questions
4:00pm - Check first sales
6:00pm - Evening check-in
9:00pm - Final check before bed
```

### Tuesday-Sunday
```
Morning:
□ Check sales overnight
□ Respond to all messages
□ Post new marketing content

Afternoon:
□ Create content for next day
□ Engage with comments/questions
□ Monitor customer satisfaction

Evening:
□ Final check of orders
□ Plan tomorrow's marketing
□ Review what's working
```

---

## BEYOND THE MVP

### Features to Add Later (Week 3-8)
```
□ Referral program ($5 off for both)
□ Team/bulk packages
□ LinkedIn banner generator
□ Resume photo optimizer
□ Style customization (choose industries)
□ Faster processing ($10 premium for 10-min delivery)
□ Admin dashboard with analytics
□ Automated customer emails (Day 7 follow-up)
□ Before/after gallery page
```

### Marketing Improvements
```
□ SEO optimization (Week 3)
□ Paid ads (Week 4-5, once profitable)
□ Influencer partnerships
□ College campus ambassadors
□ Press outreach (PR)
□ Content marketing (blog, TikTok series)
```

---

## THE REALITY CHECK

### What Will Probably Happen
```
Week 1: Slow start, lots of learning, maybe 10-30 sales
Week 2: Momentum builds, 30-60 sales
Week 3: First viral moment, 60-100 sales
Week 4: Word of mouth kicking in, 100-150 sales
Week 5-8: Peak season, 150-300 sales/week
```

### What Could Go Wrong
```
- Technical issues on launch day (plan buffer time)
- Slower sales than expected (normal, don't quit!)
- Higher refund rate (improve quality fast)
- Competitor launches same time (differentiate on speed/support)
- AI service goes down (have backup ready)
```

### What Could Go Really Right
```
- Viral TikTok (100K+ views = 500+ sales)
- Press coverage (100+ sales in a day)
- Influencer shares it (50-200 sales)
- Multiple college campuses adopt (500+ sales/week)
```

---

## FINAL PRE-LAUNCH CHECK

```
□ All environment variables set
□ Stripe live mode active
□ Domain pointing correctly
□ Email sending works
□ Full flow tested with real payment
□ 10+ beta testimonials collected
□ Before/after examples ready
□ Launch posts written
□ Customer support email set up
□ Laptop ready to monitor
□ Calendar blocked for launch day
□ Told friends/family you're launching
□ Read through build plan one more time

READY TO LAUNCH? LET'S GO! 🚀
```

---

## SUPPORT & RESOURCES

### If You Get Stuck
```
Stripe Issues:        https://stripe.com/docs
Next.js Issues:       https://nextjs.org/docs
Astria API:           https://docs.astria.ai
Resend Email:         https://resend.com/docs
Deployment:           https://vercel.com/docs
```

### Community Help
```
Reddit:               r/SideProject, r/entrepreneur
Discord:              Indie Hackers, Startup School
Twitter:              Tweet your progress, ask for help
```

---

**Remember: Perfect is the enemy of done. Launch fast, iterate based on real feedback.**

**Good luck! 🚀**
