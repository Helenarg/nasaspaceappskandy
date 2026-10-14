"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRightIcon as ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { ListIcon as Menu } from "@phosphor-icons/react/dist/csr/List";
import { XIcon as X } from "@phosphor-icons/react/dist/csr/X";
import { EnvelopeIcon as Mail } from "@phosphor-icons/react/dist/csr/Envelope";
import { GlobeHemisphereEastIcon as Globe2 } from "@phosphor-icons/react/dist/csr/GlobeHemisphereEast";
import { InstagramLogoIcon as InstagramLogo } from "@phosphor-icons/react/dist/csr/InstagramLogo";
import { TiktokLogoIcon as TiktokLogo } from "@phosphor-icons/react/dist/csr/TiktokLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { navigation, site } from "@/content/site";
import { LANGUAGES, useI18n } from "@/i18n";
import { CookiePreferencesButton } from "@/components/CookieConsent";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const scrollSnapshot = () => window.scrollY > 24;
const serverSnapshot = () => false;

function subscribeYear(callback: () => void) {
  let timeoutId: number;

  const scheduleNextCheck = () => {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const maximumTimeout = 2_147_483_647;
    const delay = Math.min(nextYear.getTime() - now.getTime() + 1_000, maximumTimeout);

    timeoutId = window.setTimeout(() => {
      callback();
      scheduleNextCheck();
    }, delay);
  };

  const checkWhenVisible = () => {
    if (document.visibilityState === "visible") callback();
  };

  scheduleNextCheck();
  document.addEventListener("visibilitychange", checkWhenVisible);

  return () => {
    window.clearTimeout(timeoutId);
    document.removeEventListener("visibilitychange", checkWhenVisible);
  };
}

const currentYearSnapshot = () => new Date().getFullYear();

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="site-logo"
      aria-label="NASA Space Apps Kandy home"
    >
      <Image
        className="logo-on-dark"
        src="/logos/nasaspaceappskandy-white.png"
        alt="NASA Space Apps Kandy"
        width={178}
        height={70}
        priority
      />
    </Link>
  );
}

function LanguageChoices({
  mobile = false,
  onSelect,
}: {
  mobile?: boolean;
  onSelect?: () => void;
}) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`language-choices${mobile ? " language-choices-mobile" : " language-choices-desktop"}`}
      role="group"
      aria-label={t("nav.language")}
    >
      {mobile ? (
        <span className="language-caption">{t("nav.language")}</span>
      ) : null}
      <div className="language-options">
        {LANGUAGES.map((language) => (
          <button
            key={language.code}
            type="button"
            lang={language.code}
            aria-label={language.name}
            aria-pressed={lang === language.code}
            onClick={() => {
              setLang(language.code);
              onSelect?.();
            }}
          >
            {mobile ? language.name : language.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const currentPath = pathname.replace(/\/+$/, "") || "/";
  const isCurrent = (href: string) =>
    currentPath === (href.replace(/\/+$/, "") || "/");
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    scrollSnapshot,
    serverSnapshot,
  );
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousScrollLockGap =
      document.documentElement.style.getPropertyValue("--scroll-lock-gap");
    const scrollLockGap = window.innerWidth - document.documentElement.clientWidth;
    if (scrollLockGap > 0) {
      document.body.style.paddingRight = `${scrollLockGap}px`;
      document.documentElement.style.setProperty(
        "--scroll-lock-gap",
        `${scrollLockGap}px`,
      );
    }
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.menuOpen = "true";
    const outside = document.querySelectorAll<HTMLElement>("main, .site-footer");
    outside.forEach((element) => {
      element.inert = true;
    });

    function keyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const panelItems = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [],
        );
        const items = [buttonRef.current, ...panelItems].filter(
          (item): item is HTMLElement => !!item,
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (previousScrollLockGap) {
        document.documentElement.style.setProperty(
          "--scroll-lock-gap",
          previousScrollLockGap,
        );
      } else {
        document.documentElement.style.removeProperty("--scroll-lock-gap");
      }
      delete document.documentElement.dataset.menuOpen;
      outside.forEach((element) => {
        element.inert = false;
      });
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", keyboard);
    };
  }, [open]);

  return (
    <header
      className={`site-header${scrolled || open || pathname !== "/" ? " is-solid" : ""}`}
    >
      <div className="header-inner">
        <SiteLogo />
        <nav
          className="main-nav"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={isCurrent(item.href) ? "page" : undefined}>{t(item.key)}</Link>
          ))}
        </nav>
        <LanguageChoices />
        <Link href="/register" className="header-register">
          <span className="button-label">{t("nav.register")}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          ref={buttonRef}
          className="menu-button"
          type="button"
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="menu-icon menu-icon-open" size={24} aria-hidden="true" />
          <X className="menu-icon menu-icon-close" size={24} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              key="mobile-menu"
              className="mobile-menu-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.18 }}
            >
              <button
                type="button"
                className="mobile-menu-backdrop"
                tabIndex={-1}
                aria-label={t("nav.closeMenu")}
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              />
              <m.nav
                ref={panelRef}
                id="mobile-navigation"
                aria-label="Mobile navigation"
                className="mobile-nav-panel"
                data-lenis-prevent
                initial={{ opacity: 0, y: reduced ? 0 : -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{
                  duration: reduced ? 0 : 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {navigation.map((item, index) => (
                  <m.div
                    key={item.href}
                    initial={{ opacity: 0, y: reduced ? 0 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.24,
                      delay: reduced ? 0 : index * 0.025,
                    }}
                  >
                    <Link href={item.href} onClick={() => setOpen(false)} aria-current={isCurrent(item.href) ? "page" : undefined}>{t(item.key)}</Link>
                  </m.div>
                ))}
                <LanguageChoices
                  mobile
                  onSelect={() => {
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                />
                <Link
                  href="/register"
                  className="mobile-register white-button"
                  onClick={() => setOpen(false)}
                >
                  <span className="button-label">{t("nav.register")}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </m.nav>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function SiteFooter({ initialYear }: { initialYear: number }) {
  const { t } = useI18n();
  const currentYear = useSyncExternalStore(
    subscribeYear,
    currentYearSnapshot,
    () => initialYear,
  );

  return (
    <footer className="site-footer">
      <div className="container footer-frame">
        <div className="footer-top">
          <SiteLogo />
          <div>
            <p>{t("footer.tagline")}</p>
            <h2>{t("footer.title")}</h2>
            <Link href="/register" className="white-button">
              <span className="button-label">{t("footer.cta")}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="footer-middle">
          <nav aria-label="Footer navigation">
            <div className="footer-link-group">
              <p className="footer-group-label">{t("footer.explore")}</p>
              <Link href="/about">{t("nav.about")}</Link>
              <Link href="/event-details">{t("nav.events")}</Link>
              <Link href="/challenges">{t("nav.challenges")}</Link>
              <Link href="/news">{t("nav.news")}</Link>
              <Link href="/awards">{t("footer.awards")}</Link>
            </div>
            <div className="footer-link-group">
              <p className="footer-group-label">{t("footer.involved")}</p>
              <Link href="/join">{t("nav.join")}</Link>
              <Link href="/ambassadors">{t("nav.ambassadors")}</Link>
              <Link href="/sponsors-and-partners">{t("nav.sponsors")}</Link>
              <Link href="/contact">{t("nav.contact")}</Link>
            </div>
          </nav>
          <div className="footer-social">
            <a href={`mailto:${site.email}`} aria-label="Email the Kandy team">
              <Mail size={17} />
            </a>
            <a
              href={site.globalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NASA Space Apps global website"
            >
              <Globe2 size={17} />
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NASA Space Apps Kandy on Instagram"
            >
              <InstagramLogo size={17} aria-hidden="true" />
            </a>
            <a
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NASA Space Apps Kandy on TikTok"
            >
              <TiktokLogo size={17} aria-hidden="true" />
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NASA Space Apps Kandy on LinkedIn"
            >
              <LinkedinLogoIcon size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-credits">
            <span>© {currentYear} NASA Space Apps Kandy.</span>
            <span>
              {t("footer.craftedBy")}{" "}
              <a
                href="https://www.sequencelabs.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sequence Labs
              </a>
            </span>
          </div>
          <nav aria-label="Legal">
            <Link href="/privacy">{t("footer.privacy")}</Link>
            <Link href="/terms">{t("footer.terms")}</Link>
            <CookiePreferencesButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}
