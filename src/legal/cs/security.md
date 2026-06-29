# Bezpečnostní politika / Security Policy

Poslední aktualizace: 27. června 2026

Tento dokument shrnuje bezpečnostní požadavky pro Trtkat. Část může být zveřejněna na `https://trtkat.cz/security`, detailní interní nastavení má zůstat neveřejné.

## 1. Bezpečnostní standard

Pro první vydání doporučuji cílit na:

- OWASP ASVS Level 2 pro backend a webovou aplikaci,
- OWASP MASVS pro iOS a Android,
- principy ISO/IEC 27001 pro řízení bezpečnosti,
- principy ISO/IEC 27701 pro privacy management.

Certifikace ISO není pro spuštění nutná, ale kontrolní body se mají používat jako interní rámec.

## 2. Komunikace

- HTTPS/TLS pro veškerou komunikaci.
- HSTS na webu.
- Žádné tokeny, hesla ani osobní údaje v URL.
- Bezpečné nastavení CORS.
- Certifikáty automaticky obnovovat.

## 3. Hesla a přihlášení

- Hesla ukládat pouze jako hash pomocí Argon2id nebo bcrypt.
- Nikdy neukládat hesla v čitelné podobě.
- Email verification povinně.
- Password reset přes jednorázový odkaz.
- Reset link expirace doporučeně 30 minut.
- Rate limiting loginu, registrace a resetu hesla.
- Detekce podezřelých loginů.
- Možnost odhlásit všechna zařízení.
- Pro administraci povinné MFA.

## 4. Session a tokeny

- Krátkodobé access tokeny.
- Refresh tokeny ukládat bezpečně a rotovat.
- Revokace tokenů při změně hesla, podezření na zneužití nebo smazání účtu.
- Tokeny v mobilní aplikaci ukládat do Keychain/Keystore.
- Neposílat tokeny do analytiky, crash logů ani URL.

## 5. API a backend

- Ověření autorizace u každého požadavku.
- Rate limiting na citlivé akce: registrace, login, reset, upload fotek, první zprávy, reporty.
- Validace vstupů na serveru.
- Ochrana proti SQL injection pomocí parametrizovaných dotazů/ORM.
- Ochrana proti XSS a HTML injection.
- CSRF ochrana u cookie-based webové relace.
- Audit log pro administrátorské zásahy.
- Oddělení administrátorských oprávnění.

## 6. Fotky a soubory

- Maximální velikost souboru a typy MIME kontrolovat serverově.
- Odstraňovat EXIF metadata.
- Neukládat soubory veřejně bez kontroly přístupu.
- Používat privátní úložiště a podepsané URL.
- Automatická kontrola fotek proti nahotě, explicitnímu obsahu a rizikovým vzorcům.
- Antivirová nebo malware kontrola u nahrávaných souborů, pokud budou podporované soubory mimo obrázky.

## 7. Chat

- Rate limiting zpráv a prvních kontaktů.
- Anti-spam pravidla.
- Report zprávy a blokace přímo z chatu.
- Nezahrnovat obsah zpráv do analytics ani běžných logů.
- Logovat jen technická metadata nutná pro bezpečnost.
- Pokud nebude end-to-end šifrování, transparentně to uvést v Privacy Policy.

## 8. Poloha

- Přesnou GPS používat jen pro funkce, které ji potřebují.
- Ostatním uživatelům nezobrazovat přesné souřadnice.
- Zobrazovat jen vzdálenost nebo přibližnou oblast.
- Neuchovávat historii polohy.
- Umožnit vypnout GPS a zadat město ručně.

## 9. Administrace

- Oddělené administrátorské účty.
- Povinné MFA.
- Role-based access control.
- Audit každého přístupu k profilu, reportu, chatu nebo fotce.
- Přístup pouze pro osoby, které ho skutečně potřebují.
- Pravidelná kontrola oprávnění.

## 10. Incident response

- Bezpečnostní email: security@trtkat.cz.
- Incident owner: Ondřej Krejčí a Marek Hlava společně, dokud nebude určen samostatný bezpečnostní odpovědný člověk.
- Kritické incidenty řešit okamžitě.
- Vyhodnotit dopad na osobní údaje a případnou oznamovací povinnost ÚOOÚ a uživatelům.
- Uchovat důkazy bezpečně a v nezbytném rozsahu.

## 11. Dodavatelé

Každý dodavatel zpracovávající osobní údaje musí mít:

- DPA nebo jiné smluvní zajištění,
- jasně popsané regiony zpracování,
- bezpečnostní opatření,
- informace o subdodavatelích,
- řešení přenosů mimo EU/EHP.

## 12. Bezpečnostní test před spuštěním

Před odesláním do obchodů:

- interní security review,
- kontrola OWASP ASVS/MASVS checklistu,
- test autentizace a autorizace,
- test rate limitů,
- test smazání účtu,
- test reportu a blokace,
- test uploadu fotek a odstranění EXIF,
- kontrola, že logy neobsahují hesla, tokeny, přesnou GPS ani obsah zpráv,
- záloha a test obnovy.
