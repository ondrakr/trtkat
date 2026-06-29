# Zásady cookies / Cookie Policy

Poslední aktualizace: 27. června 2026

Tyto zásady popisují používání cookies a podobných technologií na webu `https://trtkat.cz` a ve webové aplikaci `https://app.trtkat.cz`.

## 1. Co jsou cookies

Cookies jsou malé soubory ukládané v prohlížeči. Podobné technologie mohou zahrnovat local storage, session storage, SDK identifikátory, device/app instance ID nebo push tokeny.

## 2. Doporučené nastavení pro první vydání

Pro první vydání doporučuji používat pouze:

- nezbytné cookies pro přihlášení, bezpečnost a funkčnost,
- bezpečnostní logy a ochranu proti zneužití,
- analytiku pouze po souhlasu, pokud analytický nástroj vyžaduje souhlas,
- žádné reklamní cookies,
- žádné remarketingové nebo trackingové pixely,
- žádný advertising ID.

## 3. Kategorie cookies

| Kategorie | Účel | Souhlas |
| --- | --- | --- |
| Nezbytné | přihlášení, bezpečnost, relace, ochrana proti CSRF | nevyžaduje se |
| Preferenční | jazyk, nastavení rozhraní | podle implementace |
| Analytické | měření používání a stability | ano, pokud nejsou plně nezbytné a privacy-friendly |
| Marketingové | reklama, remarketing, profily napříč službami | aktuálně nepoužívat |

## 4. Pracovní seznam cookies

Finální seznam musí odpovídat skutečné implementaci.

| Název | Účel | Poskytovatel | Doba |
| --- | --- | --- | --- |
| `trtkat_session` | přihlášení a bezpečnost účtu | Trtkat | až 30 dní nebo do odhlášení |
| `trtkat_csrf` | ochrana formulářů a požadavků | Trtkat | po dobu relace |
| `trtkat_cookie_choice` | uložení volby cookies | Trtkat | 6 měsíců |
| `trtkat_locale` | jazyk webu/aplikace | Trtkat | 12 měsíců |

Pokud budou přidány Firebase, Sentry, Google Analytics, Meta Pixel, TikTok Pixel nebo jiné SDK, musí být tento seznam před spuštěním aktualizován.

## 5. Správa cookies

Uživatel může cookies spravovat:

- v nastavení prohlížeče,
- v cookie liště nebo centru souhlasů, pokud je implementované,
- v nastavení aplikace pro analytiku a marketingové souhlasy.

Blokace nezbytných cookies může způsobit, že webová aplikace nebude správně fungovat.

## 6. Kontakt

Dotazy k cookies a souhlasům: privacy@trtkat.cz
