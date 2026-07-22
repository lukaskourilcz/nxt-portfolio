# Stack, costs, and scaling

Pricing checked on 22 July 2026. Vendor prices and included quotas can change, so verify the linked pricing pages before making a plan or billing decision. Currency conversions, VAT, the domain renewal, and any paid GitHub account are excluded because those depend on the actual accounts.

## Current production architecture

| Layer | Current implementation | Cost driver |
| --- | --- | --- |
| Hosting and CDN | Vercel deployment from `main` | Plan, requests, data transfer, image optimization, and function use |
| Application | Next.js 15 static locale and case-study routes | Mostly build time and CDN delivery |
| Content | English and Czech JSON committed to Git | No database or CMS charge |
| Images | Local assets served through `next/image` | Image transformations plus cache reads and writes |
| Analytics | Optional consent-gated PostHog EU project | Product analytics events only when configured and accepted |
| CI | Two GitHub Actions jobs for validation and browser testing in a public repository | Cache storage, artifacts, or non-standard runners; standard hosted-runner minutes are free while public |
| Domain | `lukaskouril.dev` | Annual registrar renewal, amount depends on the registrar |

There is currently no production database, object-storage account, remote CMS, authentication provider, email service, queue, cron service, or public editor backend.

## Current monthly cost

The exact bill cannot be read from the repository, but the architecture supports two realistic baselines.

| Service | Eligible personal baseline | Professional baseline | Notes |
| --- | ---: | ---: | --- |
| Vercel | $0 on Hobby | $20/month on Pro | Hobby is for personal, non-commercial use. Pro includes $20 of usage credit. |
| PostHog | $0 | $0 at current portfolio scale | It is currently $0 when unconfigured. Product Analytics includes 1 million events per month before usage charges. |
| GitHub Actions | $0 for the current public repository | $0 for the current public repository | Standard GitHub-hosted runners are free for public repositories. The workflow uses standard Linux runners and uploads no artifacts. |
| Domain | Registrar-specific | Registrar-specific | Paid annually and not inferable from the repository. |
| **Estimated platform total** | **$0/month plus domain** | **$20/month plus domain** | Assumes included quotas are not exceeded. |

The Vercel plan decision is based on use, not traffic alone. If the portfolio supports paid freelance or business activity, budget for Pro even when Hobby limits would be technically sufficient.

## Included quotas that matter

### Vercel

The current official pricing page lists these allowances:

| Resource | Hobby | Pro |
| --- | ---: | ---: |
| Edge requests | 1 million/month | 10 million/month, then from $2 per million |
| Fast data transfer | 100 GB/month | 1 TB/month, then from $0.15 per GB |
| Image transformations | 5,000/month | Usage overage from $0.05 per 1,000 |
| Image cache reads | 300,000/month | Usage overage from $0.40 per million |
| Image cache writes | 100,000/month | Usage overage from $4 per million |

Vercel documents regional on-demand image prices from $0.05 to $0.0812 per 1,000 transformations, $0.40 to $0.64 per million cache reads, and $4 to $6.40 per million cache writes. The exact rate depends on execution region. Hobby cannot buy overages for Image Optimization, so new optimization requests can fail after the plan limit until the usage window resets.

### PostHog

The current Product Analytics allowance is 1 million events per month, followed by usage pricing starting at $0.00005 per event and decreasing with volume. This portfolio records a page-view event and a small set of deliberate navigation actions only after consent. Autocapture and session recording are disabled, which keeps both privacy exposure and event volume low.

Examples using the published first paid rate:

| Monthly analytics events | Estimated analytics charge |
| ---: | ---: |
| Up to 1,000,000 | $0 |
| 1,250,000 | About $12.50 for the 250,000 events above the free tier |
| 2,000,000 | About $50 for the 1,000,000 events above the free tier |

These are simple estimates before volume discounts and exclude other PostHog products. Session Replay should remain disabled unless the privacy design is reviewed again.

### GitHub Actions

This repository is public. GitHub documents standard GitHub-hosted runners as
free for public repositories, so the current validation and accessibility jobs
do not consume a paid minute allowance. The workflow uploads no artifacts;
`actions/setup-node` provides the npm cache, which remains subject to GitHub's
separate cache-storage policy.

Both jobs run for every pull-request update, then run again after the merge
reaches `main`. Their duration still matters for feedback speed and resource
efficiency even though standard public-repository runner minutes are free.

If the repository becomes private, GitHub Free currently includes 2,000 Actions
minutes per month and 500 MB of artifact storage, while cache storage has a
separate 10 GB per-repository allowance. The private-repository planning formula
would then be:

```text
monthly CI minutes = workflow runs x total minutes across both jobs
Linux overage cost = max(0, monthly minutes - included minutes) x $0.006
```

GitHub currently lists a standard two-core Linux runner at $0.006 per minute
after a private repository's included allowance. Larger runners remain billable
even for public repositories.

## How this portfolio scales

Most public routes are statically generated. More visitors primarily increase CDN requests, transferred bytes, image-cache reads, and optional analytics events. They do not create one server-rendering operation or one database query per page view.

The useful planning variables are:

```text
edge requests ~= visits x pages per visit x requested documents and assets
data transfer ~= visits x pages per visit x average transferred page weight
analytics events ~= consenting page views + consenting tracked actions
image transformations ~= unique source, width, quality and format combinations not already cached
```

Do not estimate image transformations as one per image view. A transformation is generated for a unique variant and can then be served through cache reads. New source images, responsive widths, quality values, formats, and cache churn create new variants.

## Growth scenarios

These bands are planning guidance, not traffic guarantees. Real usage must be checked in the Vercel, GitHub, and PostHog dashboards.

| Stage | Likely cost | What to watch |
| --- | --- | --- |
| Personal portfolio traffic | $0/month plus domain on eligible Hobby | Custom-domain status, image transformations, and CI minutes |
| Active professional portfolio | $20/month plus domain on Vercel Pro | Included usage credit, transfer, edge requests, and deployment frequency |
| Tens of thousands of visits/month | Usually Pro base price if pages remain lean | Average transfer per visit, image variants, bots, and analytics consent rate |
| Hundreds of thousands of visits/month | Pro plus possible usage overages | 10 million edge-request allowance, 1 TB transfer allowance, image operations, and PostHog events |
| Product features added | Provider-specific recurring cost | Database, auth, storage, email, abuse prevention, backups, and operational support |

The first architectural cost jump would probably come from adding dynamic product features, not from the current static content. A remote CMS, visitor accounts, comments, personalized content, contact-form storage, or frequently uploaded media would introduce new services and security responsibilities. Add those only when there is a concrete product need.

## Upgrade triggers

Move to or remain on Vercel Pro when any of these is true:

- the site is used for commercial or paid professional activity;
- Hobby usage limits are consistently approached;
- paid overages, team collaboration, or stronger usage controls are needed;
- image optimization starts failing because Hobby limits were reached.

Review PostHog billing when product analytics approaches 800,000 events in a month. This gives time to remove accidental high-volume events, verify consent behavior, and set a billing limit before crossing the free tier.

Review GitHub Actions billing if the repository becomes private, larger runners
are introduced, or artifact/cache storage grows. Independently of billing, keep
the current split jobs focused and consider path filters or safe browser caching
only when measured CI duration justifies the added complexity.

## Cost controls

- Keep portfolio pages static and content in the repository.
- Keep PostHog autocapture and session recording disabled.
- Track only decisions that answer a real portfolio question.
- Keep responsive image widths and quality values intentional to limit variant count.
- Compress source images before committing very large originals.
- Use Vercel spend alerts and review usage monthly after traffic changes.
- Keep CI focused on release risk and avoid adding overlapping test jobs.
- Check the registrar renewal separately because it is not part of the Vercel estimate.

## Official pricing references

- [Vercel plans and included usage](https://vercel.com/pricing)
- [Vercel pricing documentation](https://vercel.com/docs/pricing)
- [Vercel Image Optimization limits and pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)
- [PostHog usage-based pricing](https://posthog.com/)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [GitHub included usage by plan](https://docs.github.com/en/billing/reference/product-usage-included)
