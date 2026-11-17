# Vee/Ra Email Copy — Deep Draft

Working draft for the three Omnisend flows. Everything here is written to be pasted into the Omnisend email editor and refined. Voice notes that apply to all emails:

- **Voice:** warm, unhurried, personal. A letter from a person, not a campaign from a brand.
- **Never say:** "sale", "discount", "hurry", "don't miss out". Urgency comes from small-batch scarcity, not from pressure.
- **Always include:** one clear CTA button, an unsubscribe line (Omnisend adds this automatically), and a sign-off with a real name.
- **Personalization tags** (Omnisend "Personalization" picker): `{{ Contact.firstName }}` where natural — but don't force it; these are letter-like emails.
- **Signature placeholder:** I've used `Matthew` throughout — swap for whoever signs the brand's letters.

---

## FLOW 1 — Win-back: "The Quiet Return"

**Audience:** customers who ordered at least once, nothing in 180+ days.
**Goal:** bring them back into awareness through story, not offers. Three touches over ~11 days, spaced 4 and 7 days.
**Exit condition:** stop the flow the moment they place an order (Omnisend default behavior — confirm the "ignore" filter is on).

---

### Email 1.1 — "Where have you been, really?"

**Purpose:** own the silence. Disarms cynicism before any selling happens. No product links except one quiet CTA at the bottom.

**Subject options:**
- Where have you been, really?
- We went quiet. Here's why that changes today.

**Preview text:** A letter, not a sales email.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> We owe you a small honesty.
>
> At some point, the letters stopped. The posts slowed. And you — someone who chose Vee/Ra once, and let it into your kitchen — heard nothing from us for a long while.
>
> That's on us. Not a rebrand, not a pivot, not an algorithm excuse. We simply went quiet.
>
> What didn't go quiet is the thing you originally came for. The slow, daily practice of nourishing yourself properly. The idea we call **The Alchemy of Remembrance** — remembering how to care for yourself the way you'd care for someone you love. One cup at a time. Even when nobody is watching. Especially then.
>
> The blends are still made the same way: small batches, ingredients you can pronounce, and a brew that asks you to sit down while you drink it.
>
> We're writing again. Not because the calendar says so — because you deserved better than silence.
>
> More soon.
>
> — Matthew
>
> [See what's brewing →]

**Omnisend notes:** CTA button → `https://www.veera.co.za/store`. Delay to Email 1.2: **4 days**. Add the standard "stop if ordered" filter.

---

### Email 1.2 — "The one people keep coming back for"

**Purpose:** social proof + product reintroduction without discounting. Let the community speak.

**Subject options:**
- The one people keep coming back for
- Mood Magick, in their words

**Preview text:** Small batches, month after month.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> We don't have a marketing department. We have a community of people who reorder the same blend month after month and then tell us why.
>
> Here's the one they keep coming back for:
>
> **Mood Magick** — nourishing. Uplifting. Blissful.
>
> It's the blend people describe as "a warm day in a cup." Cacao-forward, gently stimulating, made for mornings that deserve to be marked. It's also the first thing to sell out, every single time we make it — which is our favourite kind of compliment.
>
> And because no single blend fits every season, here's the full shelf:
>
> **Moon Mylk** — soothing. Calming. Dreamy. For the wind-down.
> **Ritual Roots** — adaptogenic. Revitalising. Centering. For the ground-you-again days.
>
> If it's been a while since your last cup, the water's still warm.
>
> — Matthew
>
> [Meet the blends →]

**Omnisend notes:** CTA → `https://www.veera.co.za/store`. Optional: add product images from the Shopify catalog. Delay to Email 1.3: **7 days**.

---

### Email 1.3 — "This is us saying hello again"

**Purpose:** the door stays open, no strings. Sets the expectation of the monthly letter and hands them something useful even if they never buy again.

**Subject options:**
- This is us saying hello again
- No coupon. Just an open door.

**Preview text:** What to expect from us from now on.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> Last email of this little reunion, so let's keep it simple.
>
> We're not going to bribe you back with a coupon. Vee/Ra was never about that, and you're worth more to us than a percentage off.
>
> Here's what we're offering instead:
>
> **1. A letter, about once a month.** One story, one blend, one ritual worth trying. If it isn't worth reading, we haven't earned the send.
>
> **2. The brew guides, free.** Water temperature, steep time, and the small habits that turn a drink into a ritual. Most people rush this part.
>
> [Read the brew guides →]
>
> **3. First word when blends return.** Small batches sell out. People on this list hear before anyone else.
>
> That's it. No countdown timers, no "last chance" emails. The shop is open whenever you're ready:
>
> [Visit the shop →]
>
> — Matthew
>
> P.S. If now isn't the season for this, the unsubscribe link below is one click, no hard feelings.

**Omnisend notes:** Two CTAs is fine here. This is the last email of the flow.

---

## FLOW 2 — Welcome: "First, the ritual"

**Audience:** new subscribers from the popup/form.
**Three emails, day 0 / day 3 / day 7.**

---

### Email 2.1 — Day 0

**Subject options:**
- Welcome to the ritual
- You're in. Here's what we believe.

**Preview text:** Health isn't a hack. It's a habit you can love.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> Welcome. You just joined a fairly slow-moving corner of the internet.
>
> Vee/Ra began with a simple idea: health isn't a hack, it's a habit you can love. Everything we make is built on **The Alchemy of Remembrance** — remembering how to nourish yourself, slowly and daily, in a world that keeps telling you to optimize instead.
>
> Three blends. That's it. We don't make more than we can perfect:
>
> - **Mood Magick** — nourishing. Uplifting. Blissful.
> - **Moon Mylk** — soothing. Calming. Dreamy.
> - **Ritual Roots** — adaptogenic. Revitalising. Centering.
>
> Over the next week I'll send you two more letters: how to actually brew these properly (most people rush it), and the whole philosophy in about sixty seconds.
>
> For now — welcome to the ritual.
>
> — Matthew
>
> [Start with the blends →]

---

### Email 2.2 — Day 3

**Subject options:**
- How to brew it properly
- The part most people rush

**Preview text:** Water temperature, steep time, and one small habit.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> A blend is only as good as its brewing. The same leaves, brewed carelessly, are just a warm drink. Brewed with a little attention, they're a ritual — and the difference is about four minutes.
>
> We wrote full guides for each blend: water temperature, steep time, and the small habits that change everything (like warming the cup first).
>
> [Read the brew guides →]
>
> Not sure where to start? Match the blend to your season:
>
> - Need uplift? **Mood Magick**
> - Need wind-down? **Moon Mylk**
> - Need grounding? **Ritual Roots**
>
> — Matthew

---

### Email 2.3 — Day 7

**Subject options:**
- One cup, every day
- The whole philosophy in 60 seconds

**Preview text:** Consistency beats intensity. That's most of it.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> Here's everything Vee/Ra believes, briefly:
>
> **1. Consistency beats intensity.** One cup every day outperforms a perfect week followed by none.
>
> **2. Ingredients you can pronounce, from people we can name.** No proprietary blends hiding filler.
>
> **3. The ritual matters as much as the recipe.** Sitting down while you drink is part of the nourishment.
>
> That's the whole company. If it sounds like your kind of thing, the shop is always open — and these letters will keep arriving about once a month.
>
> [Explore the shop →]
>
> — Matthew

---

## FLOW 3 — Back in stock (automated)

**Trigger:** custom event `back_in_stock` — fired automatically the moment Shopify restocks a variant someone waited for. One email, sent immediately.

**Available event fields:**
`productTitle`, `productVariant`, `productPrice`, `productUrl`, `productImage`

---

### Email 3.1 — "You asked us to tell you"

**Subject options:**
- It's back, and it won't last long
- You asked us to tell you — so we are

**Preview text:** {{ back_in_stock.productTitle }} is back in stock.

**Body:**

> Hi {{ Contact.firstName | default: "there" }},
>
> Remember this one?
>
> **{{ back_in_stock.productTitle }}** is back in stock — and because you asked us to tell you, you're hearing it before anyone else.
>
> [Shop {{ back_in_stock.productTitle }} →] *(button → `{{ back_in_stock.productUrl }}`)*
>
> These blends are made in small batches. When a run sells out, it sells out properly — which is exactly why you asked.
>
> Variant: {{ back_in_stock.productVariant }}
>
> If you've been waiting for this one, the water's warm.
>
> — The Vee/Ra team

**Omnisend notes:**
- Use an event-property text block or insert the fields into the copy above; put `productImage` as a standalone image block (insert image by URL `{{ back_in_stock.productImage }}`).
- The button URL is an event property — use Omnisend's "link from event property" option so each recipient gets their own product link.
- Frequency setting: make sure the same contact can re-trigger the event for a *different* restock later.

---

## FLOW 4 — "From the Journal" (blog awareness)

**Purpose:** bring the latest blog posts back into customers' awareness. Runs as **Campaigns** (not automations) — one send to the full opted-in list, then a follow-up to the non-openers a week later.

**Posts featured (as of drafting):**
- [Coffee vs Cacao: Energy, Stress, Heart Health & Theobromine vs Caffeine Explained](https://www.veera.co.za/news/coffee-vs-cacao/) (Feb 2026)
- [Theobroma Cacao Explained: Benefits, Science, Preparation & Nervous System Support](https://www.veera.co.za/news/theobroma-cacao-benefits-nervous-system/) (Feb 2026)
- [The Truth About What It Takes to Create Premium Medicine](https://www.veera.co.za/news/truth-about-creating-premium-wellness-products/) (Jan 2026)

---

### Email 4.1 — "Which cup is yours?"

**Send:** to segment "Subscribed to email" (everyone opted in).

**Subject options:**
- Coffee vs Cacao: which cup is yours?
- The cup that grounds & blooms vs the cup that sparks & blasts

**Preview text:** What your morning is really doing to your body.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> Most of us don't choose our morning drink — we just inherit it. Coffee happened to us.
>
> We spent some time in the journal asking a different question: **what is each cup actually doing to your body?**
>
> **[Coffee vs Cacao: Theobromine vs Caffeine, explained](https://www.veera.co.za/news/coffee-vs-cacao/)**
> Two cups, two very different days. One sparks and blasts; the other grounds and blooms. We compared the energy, the stress response and the heart health story of both — and the differences run deeper than taste.
>
> **[Theobroma Cacao: benefits, preparation & your nervous system](https://www.veera.co.za/news/theobroma-cacao-benefits-nervous-system/)**
> What "ceremonial cacao" actually means, how to prepare it properly, and why this plant has been used for centuries as much for the mind as for the body.
>
> No position to defend, nothing to sell in this letter — just a good read before you choose your next cup.
>
> — Matthew
>
> [Read the journal →]

**Omnisend notes:**
- Campaigns → New campaign. Segment: everyone with email status "subscribed".
- Two blog-post blocks side by side (Omnisend content blocks), each with its featured image + the link above.

---

### Email 4.2 — "What premium medicine actually takes" (follow-up)

**Send:** one week later, to segment: subscribed **and** did not open Email 4.1 (build this segment after 4.1 sends: Segment → condition "Did not open campaign" → select 4.1).

**Subject options:**
- What premium medicine actually takes
- The part of wellness nobody posts about

**Preview text:** Behind every batch of Vee/Ra.

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> Here's something we don't say often enough: making things properly is slow, and mostly invisible.
>
> We wrote about **what it actually takes to create premium medicine** — the sourcing, the waiting, the small-batch compromises we refuse to make, and the ones we make gladly.
>
> [Read: The Truth About What It Takes to Create Premium Medicine](https://www.veera.co.za/news/truth-about-creating-premium-wellness-products/)
>
> If you've ever wondered why Vee/Ra is the way it is — why we'd rather sell out than dilute — this letter is the honest answer.
>
> It's also a nice window into everything on the journal, if you'd like more of these:
>
> [Browse News & Insights →]
>
> — Matthew

**Omnisend notes:** same campaign setup; the "did not open" segment keeps the follow-up respectful. If 4.1 performed well, you can skip 4.2 or re-send later.

---

### Reusable template — "Journal Digest" (for future posts)

Keep this structure for every batch of new posts — one campaign, roughly monthly or whenever 2–3 posts accumulate:

**Subject options:**
- From the journal: [hook from best post]
- New on the journal: [topic]

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> A few things worth your reading time this [month]:
>
> **[POST TITLE 1]** — [one calm sentence on why it matters]
> [Read →]
>
> **[POST TITLE 2]** — [one sentence]
> [Read →]
>
> **[POST TITLE 3]** — [one sentence]
> [Read →]
>
> That's the letter. Brew something and settle in.
>
> — Matthew
>
> [Browse the journal →]

---

**Alternative — evergreen option:** if you'd rather have new *subscribers* see the best posts, add a "Start here on the journal" block (3 post links) to Email 2.3 of the welcome flow instead of a separate flow. New-subscriber attention is the most valuable place for evergreen content; campaigns are the right tool for reaching existing customers.

---

## TEMPLATE — Monthly newsletter

One story, one blend, one ritual. Fill the [bracketed] slots each month. Keep the structure identical so it stays sustainable.

**Subject options (pick per month):**
- The [month] letter: [story hook]
- [Blend name] and the art of the slow morning

**Preview text:** [one calm sentence]

**Body:**

> Hi {{ Contact.firstName | default: "friend" }},
>
> **[STORY — 2 short paragraphs.** Something real: a farm visit, a new batch, a lesson from the month, a question a customer asked. No promotion.**]**
>
> **THIS MONTH'S BLEND: [blend name]**
> [One paragraph: what it's for, what's in it, when to drink it.]
>
> [Shop [blend] →]
>
> **RITUAL OF THE MONTH**
> [One small, concrete practice — 2–3 sentences. E.g. "Drink your first cup outside tomorrow, no phone, for the length of one song."]
>
> That's the letter. See you next month.
>
> — Matthew
>
> [Browse the full shelf →]

---

## Subject-line bank (mix and match)

Calm / story-led:
- The [month] letter
- A warm day in a cup
- What we've been brewing
- The part most people rush
- One cup, every day

Product-led (for restock/new batch):
- It's back, and it won't last long
- Back in small batches
- You asked us to tell you — so we are

Re-engagement:
- Where have you been, really?
- We went quiet. That's on us.
- No coupon. Just an open door.

**Rules of thumb:**
- Max ~6 words for calm/curiosity lines; product lines can run longer.
- Never combine urgency words with the brand name ("LAST CHANCE Vee/Ra" would undo everything above).
- Preview text should complete the subject, not repeat it.

---

## POPIA / list hygiene notes

- All flows go to opted-in contacts only — Omnisend handles suppression when someone unsubscribes.
- The win-back flow should target *engaged customers who went quiet*, never the whole list. Keep the 180-day segment definition.
- The signup form should make clear what they're signing up for (one line under the field is enough: "One letter a month. Brew guides and blend news. No spam.").

---

## Build order suggestion (do these one per session, ~30 min each)

1. Welcome flow (simplest, and it starts collecting immediately).
2. Back-in-stock automation (you already have the trigger).
3. Win-back flow (needs the 180-day segment first: Audience → Segments → "Lapsed 180+ days" — condition: Ordered product → has not → in the last 180 days).
4. Newsletter template (save as a reusable template in Omnisend → Templates).
