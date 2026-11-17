# Vee/Ra Email Marketing Flows

> **Full copy drafts:** see [`email-copy-deep-dive.md`](./email-copy-deep-dive.md) — complete subject lines, preview text and body copy for every email in these flows, plus a monthly newsletter template and a subject-line bank. The outlines below are the quick-reference version.

Everything in this doc is built in the **Omnisend dashboard** (Automations → New workflow) unless marked otherwise. Segments live under **Audience → Segments**.

---

## 1. Back in Stock (automated)

**Trigger:** Custom event → `back_in_stock`

**Available fields** (inserted with Omnisend's "Event properties" personalization tags):

| Field | Example |
|---|---|
| `productTitle` | Ritual Roots - Adaptogenic Blend |
| `productVariant` | Default Title |
| `productPrice` | 329.00 |
| `productUrl` | https://www.veera.co.za/store/ritual-roots-adaptogenic-blend |
| `productImage` | (product image URL) |

**Email copy:**

> **Subject:** It's back, and it won't last long
> **Preview text:** {{ back_in_stock.productTitle }} is back in stock.
>
> **Body:**
> Remember this one?
>
> {{ back_in_stock.productTitle }} is finally back in stock — and because you asked us to tell you, you're hearing it before anyone else.
>
> [Shop {{ back_in_stock.productTitle }} →] (button, links to `productUrl`)
>
> These blends are made in small batches, so when a run sells out, it sells out properly. If you've been waiting for this one, don't wait too long now.
>
> — The Vee/Ra team

**Notes:**
- Set the automation to send **immediately** after trigger.
- This event was already registered in your account (a test event was sent on setup day). If you want to clean it up: delete the contact `test-backinstock@veera.co.za` in Audience → Contacts.

---

## 2. Win-back flow (lapsed customers)

**Trigger:** Order placed / Ordered product → **filter:** no order in the last 180 days.
Build the segment first (Segment: "Lapsed 180+ days" — condition: `Ordered product` → `has not` → in last 180 days), or use the workflow trigger "Ordered Product" with the wait/skip settings if segments are easier.

**Email 1 — send immediately**

> **Subject:** Where have you been, really?
> **Preview text:** We've been quiet. That's on us.
>
> **Body:**
> We owe you honesty: we went quiet. Emails stopped, posts slowed, and you — someone who actually chose Vee/Ra once — heard nothing from us.
>
> That changes today.
>
> The blends are still here. The Alchemy of Remembrance still means the same thing it did when you first ordered: making ritual out of the everyday. One cup that asks you to slow down and actually taste your life.
>
> [See what's brewing →]

**Email 2 — send 4 days later** (only if they haven't ordered)

> **Subject:** The one people can't stop talking about
> **Preview text:** Mood Magick, in their words.
>
> **Body:**
> We don't have a marketing department. We have a community of people who reorder the same blend, month after month, and tell us why.
>
> The most-loved: **Mood Magick** — nourishing, uplifting, blissful. It's the blend people describe as "a warm day in a cup."
>
> Then there's **Moon Mylk**, for the wind-down, and **Ritual Roots** for the ground-you-again days.
>
> [Meet the blends →]

**Email 3 — send 7 days after Email 2**

> **Subject:** This is us saying hello again
> **Preview text:** No discount. Just an open door.
>
> **Body:**
> We're not going to bribe you back with a coupon. Vee/Ra was never about that.
>
> We're just opening the door again: new batches are in, the brew guides are on the site, and this letter will show up in your inbox about once a month from now — something worth reading, or nothing at all.
>
> If you're in, you know where to find us:
>
> [Visit the shop →]

---

## 3. Welcome flow (new subscribers from the popup/form)

**Trigger:** Subscribed to email (or a specific Omnisend form, once you enable one — see Section 5).

**Email 1 — immediately**

> **Subject:** Welcome to the ritual
> **Preview text:** Here's what Vee/Ra is really about.
>
> **Body:**
> Vee/Ra began with a simple idea: that health isn't a hack, it's a habit you can love. Every blend we make is built on The Alchemy of Remembrance — remembering how to nourish yourself, slowly and daily.
>
> Three blends. That's it. We don't make more than we can perfect:
> - **Mood Magick** — nourishing, uplifting, blissful
> - **Moon Mylk** — soothing, calming, dreamy
> - **Ritual Roots** — adaptogenic, revitalising, centering
>
> [Start with the blends →]

**Email 2 — 3 days later**

> **Subject:** How to brew it properly
> **Preview text:** Most people rush this part.
>
> **Body:**
> A blend is only as good as its brewing. We've written full guides — water temperature, steep time, and the little habits that turn a drink into a ritual.
>
> [Read the brew guides →]
>
> Start with whichever blend matches your season: uplift (Mood Magick), wind-down (Moon Mylk), or grounding (Ritual Roots).

**Email 3 — 7 days later**

> **Subject:** One cup, every day
> **Preview text:** The whole philosophy in 60 seconds.
>
> **Body:**
> Here's everything we believe, briefly:
>
> 1. Consistency beats intensity.
> 2. Ingredients you can pronounce, from people we can name.
> 3. The ritual matters as much as the recipe.
>
> That's the whole company. If it sounds like your kind of thing, the shop is always open.
>
> [Explore the shop →]

---

## 4. Monthly campaign rhythm

Keep it sustainable — one email per month is enough to stay present:

1. **Week 1:** Newsletter — one story, one product, one ritual (rotating focus).
2. **Restock alerts:** automatic (flow above).
3. **Optional seasonal sends:** 2–3 per year max (winter warmers, gifting season, new batch announcements).

---

## 5. Setup checklist

- [ ] **Delete test contact** `test-backinstock@veera.co.za` in Omnisend (Audience → Contacts).
- [ ] **Omnisend → Automations:** create "Back in stock" workflow (trigger: custom event `back_in_stock`, email copy from Section 1).
- [ ] **Omnisend → Automations:** create "Win-back 180" workflow (Section 2).
- [ ] **Omnisend → Automations:** create "Welcome" workflow (Section 3).
- [ ] **Omnisend → Forms:** enable a popup or landing-page form. The Omnisend snippet is already installed on veera.co.za, so forms created in the dashboard go live immediately — no code needed.
- [ ] **Netlify:** environment variables (already set via CLI during setup, listed here for reference):
  - `OMNISEND_API_KEY` (existing)
  - `SHOPIFY_ADMIN_TOKEN` — the Shopify Admin API token (used to re-fetch product truth)
  - `SHOPIFY_SHOP_DOMAIN` — e.g. `u8chnc-qf.myshopify.com`
  - `NETLIFY_BUILD_HOOK_URL` — build hook "Shopify restock" (`https://api.netlify.com/build_hooks/…`)
- [ ] **Shopify admin → Settings → Notifications → Webhooks:** webhook exists for topic **Product update** → `https://www.veera.co.za/api/shopify-restock` (JSON). Created via the Admin API (id `2103723327540`).
  - Note: the handler treats the webhook as an untrusted trigger — Shopify's delivery signing secret could not be established for this app, so the handler always re-fetches the product from the Admin API (source of truth) before acting, with rate limits on the re-fetch and on build-hook triggers. A spoofed request cannot inject fake stock data.
- [ ] **Test end-to-end:** sell a variant to zero on a test product → sign up via the product page "Notify me" button → restock it → confirm the email arrives and the site rebuilds with new stock.
