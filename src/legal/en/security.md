# Security Policy

Last updated: 27 June 2026

This document summarizes security requirements for Trtkat. Part may be published publicly; detailed internal settings remain private.

## 1. Security standard

For first release we target:

- OWASP ASVS Level 2 for backend and web app,
- OWASP MASVS for iOS and Android,
- ISO/IEC 27001 principles for security management,
- ISO/IEC 27701 principles for privacy management.

ISO certification is not required for launch but control points serve as an internal framework.

## 2. Communication

- HTTPS/TLS for all communication.
- HSTS on the website.
- No tokens, passwords or personal data in URLs.
- Secure CORS configuration.
- Automatic certificate renewal.

## 3. Passwords and login

- Passwords stored only as hashes using Argon2id or bcrypt.
- Never store passwords in readable form.
- Email verification required.
- Password reset via one-time link.
- Reset link expiry recommended 30 minutes.
- Rate limiting on login, registration and password reset.
- Suspicious login detection.
- Ability to sign out all devices.
- MFA required for administration.

## 4. Sessions and tokens

- Short-lived access tokens.
- Refresh tokens stored securely and rotated.
- Token revocation on password change, suspected abuse or account deletion.
- Tokens stored in Keychain/Keystore on mobile.
- Do not send tokens to analytics, crash logs or URLs.

## 5. API and backend

- Authorization verification on every request.
- Rate limiting on sensitive actions: registration, login, reset, photo upload, first messages, reports.
- Server-side input validation.
- Protection against SQL injection via parameterized queries/ORM.
- Protection against XSS and HTML injection.
- CSRF protection for cookie-based web sessions.
- Audit log for admin actions.
- Separation of admin permissions.

## 6. Photos and files

- Maximum file size and MIME types validated server-side.
- EXIF metadata removal.
- Files not stored publicly without access control.
- Private storage and signed URLs.
- Automatic photo review against nudity, explicit content and risky patterns.
- Antivirus or malware scan for uploaded files if non-image files are supported.

## 7. Chat

- Message and first-contact rate limiting.
- Anti-spam rules.
- Report and block directly from chat.
- Do not include message content in analytics or regular logs.
- Log only technical metadata necessary for security.
- If end-to-end encryption is not used, state this transparently in the Privacy Policy.

## 8. Location

- Use precise GPS only for features that need it.
- Do not show exact coordinates to other users.
- Show only distance or approximate area.
- Do not store location history.
- Allow disabling GPS and entering city manually.

## 9. Administration

- Separate admin accounts.
- MFA required.
- Role-based access control.
- Audit every access to profile, report, chat or photo.
- Access only for people who genuinely need it.
- Regular permission review.

## 10. Incident response

- Security email: security@trtkat.cz.
- Incident owners: Ondřej Krejčí and Marek Hlava jointly until a dedicated security lead is appointed.
- Critical incidents handled immediately.
- Assess impact on personal data and notification obligations to authorities and users.
- Preserve evidence securely and to necessary extent.

## 11. Vendors

Every vendor processing personal data must have DPA or equivalent contractual safeguards, clearly described processing regions, security measures, subprocessor information, and solutions for transfers outside EU/EEA.

## 12. Security testing before launch

Before store submission:

- internal security review,
- OWASP ASVS/MASVS checklist review,
- authentication and authorization testing,
- rate limit testing,
- account deletion testing,
- report and block testing,
- photo upload and EXIF removal testing,
- verify logs do not contain passwords, tokens, precise GPS or message content,
- backup and restore testing.

Security vulnerability reports: security@trtkat.cz.
