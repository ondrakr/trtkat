# Cookie Policy

Last updated: 27 June 2026

This policy describes use of cookies and similar technologies on https://trtkat.cz and the web app https://app.trtkat.cz.

## 1. What cookies are

Cookies are small files stored in the browser. Similar technologies may include local storage, session storage, SDK identifiers, device/app instance ID or push tokens.

## 2. Recommended setup for first release

For first release we recommend using only:

- essential cookies for login, security and functionality,
- security logs and abuse protection,
- analytics only with consent if the analytics tool requires consent,
- no advertising cookies,
- no remarketing or tracking pixels,
- no advertising ID.

## 3. Cookie categories

| Category | Purpose | Consent |
| --- | --- | --- |
| Essential | login, security, session, CSRF protection | not required |
| Preference | language, interface settings | depends on implementation |
| Analytics | usage and stability measurement | yes if not fully essential and privacy-friendly |
| Marketing | advertising, remarketing, cross-service profiles | not used currently |

## 4. Cookie list

The final list must match actual implementation.

| Name | Purpose | Provider | Duration |
| --- | --- | --- | --- |
| `trtkat_session` | login and account security | Trtkat | up to 30 days or until logout |
| `trtkat_csrf` | form and request protection | Trtkat | session |
| `trtkat_cookie_choice` | cookie consent choice storage | Trtkat | 6 months |
| `trtkat_locale` | website/app language | Trtkat | 12 months |

If Firebase, Sentry, Google Analytics, Meta Pixel, TikTok Pixel or other SDKs are added, this list must be updated before launch.

## 5. Managing cookies

Users can manage cookies:

- in browser settings,
- in the cookie banner or consent center if implemented,
- in app settings for analytics and marketing consents.

Blocking essential cookies may prevent the web app from working correctly.

## 6. Contact

Cookie and consent questions: privacy@trtkat.cz
