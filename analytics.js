(() => {
  const MEASUREMENT_ID = "G-RSN9PNE840";
  const STORAGE_KEY = "fikolasai-analytics-consent";
  const VERSION = "2026-06-19";
  let analyticsLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (_) {
      // The current page still respects the choice when storage is unavailable.
    }
  }

  function clearAnalyticsCookies() {
    const host = window.location.hostname;
    document.cookie.split(";").forEach((entry) => {
      const name = entry.trim().split("=")[0];
      if (!name.startsWith("_ga")) return;
      const expiration = "expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
      document.cookie = `${name}=;${expiration}`;
      document.cookie = `${name}=;${expiration};domain=.${host}`;
    });
  }

  function loadAnalytics() {
    if (analyticsLoaded || document.querySelector(`script[data-ga4="${MEASUREMENT_ID}"]`)) return;
    analyticsLoaded = true;
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement("script");
    script.async = true;
    script.dataset.ga4 = MEASUREMENT_ID;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  function updateConsent(value) {
    const granted = value === "granted";
    saveConsent(value);
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: granted ? "granted" : "denied"
    });
    if (granted) loadAnalytics();
    else clearAnalyticsCookies();
    renderConsentUi(false);
  }

  function track(eventName, parameters = {}) {
    if (getConsent() !== "granted") return;
    window.gtag("event", eventName, {
      page_location: window.location.href,
      page_title: document.title,
      ...parameters
    });
  }

  function addTrackingParameters(anchor) {
    if (!anchor.href.includes("tally.so")) return;
    const url = new URL(anchor.href);
    url.searchParams.set("utm_source", "fikolasai");
    url.searchParams.set("utm_medium", "website");
    url.searchParams.set("utm_campaign", "agent_ia");
    anchor.href = url.toString();
  }

  function trackClick(anchor) {
    const href = anchor.href;
    const label = anchor.textContent.trim().replace(/\s+/g, " ").slice(0, 100);

    if (href.includes("tally.so")) {
      track("click_tally", { link_url: href, link_text: label });
      track("generate_lead", { method: "tally", link_text: label });
    } else if (href.includes("calendly.com")) {
      track("click_calendly", { link_url: href, link_text: label });
      track("generate_lead", { method: "calendly", link_text: label });
    } else if (href.includes("linkedin.com")) {
      track("click_linkedin", { link_url: href, link_text: label });
    } else if (/\/agent-ia-|\/sales-b2b-agent-ia\//.test(anchor.pathname)) {
      track("view_industry_case", { link_url: href, industry_page: anchor.pathname });
    }
  }

  function installEventTracking() {
    document.querySelectorAll('a[href*="tally.so"]').forEach(addTrackingParameters);

    document.addEventListener("click", (event) => {
      const anchor = event.target.closest("a[href]");
      if (anchor) trackClick(anchor);

      const languageButton = event.target.closest("#language-toggle, #lang-btn");
      if (languageButton) {
        const selectedLanguage = document.documentElement.lang === "fr" ? "en" : "fr";
        track("select_language", { language: selectedLanguage });
      }
    });
  }

  function labels() {
    const english = document.documentElement.lang === "en";
    return english
      ? {
          title: "Audience measurement",
          text: "With your permission, Google Analytics helps us understand which pages and services are useful. No advertising cookies are enabled.",
          accept: "Accept analytics",
          refuse: "Refuse",
          manage: "Manage cookies"
        }
      : {
          title: "Mesure d’audience",
          text: "Avec votre accord, Google Analytics nous aide à comprendre quelles pages et offres sont utiles. Aucun cookie publicitaire n’est activé.",
          accept: "Accepter Analytics",
          refuse: "Refuser",
          manage: "Gérer les cookies"
        };
  }

  function ensureStyles() {
    if (document.getElementById("fikolasai-consent-styles")) return;
    const style = document.createElement("style");
    style.id = "fikolasai-consent-styles";
    style.textContent = `
      #fikolasai-consent{position:fixed;z-index:9999;right:18px;bottom:18px;left:18px;max-width:620px;margin:auto;padding:20px;border:1px solid rgba(244,199,107,.38);border-radius:18px;background:#080d1d;color:#f8fafc;box-shadow:0 24px 80px rgba(0,0,0,.5);font-family:Inter,ui-sans-serif,system-ui,sans-serif}
      #fikolasai-consent h2{margin:0 0 8px;font-size:18px;line-height:1.25}
      #fikolasai-consent p{margin:0;color:#cbd5e1;font-size:14px;line-height:1.55}
      #fikolasai-consent div{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
      #fikolasai-consent button,#fikolasai-consent-manage{min-height:42px;padding:0 16px;border-radius:9px;border:1px solid rgba(255,255,255,.16);font-weight:700;cursor:pointer}
      #fikolasai-consent-accept{border-color:#f4c76b!important;background:#f4c76b;color:#07111f}
      #fikolasai-consent-refuse{background:rgba(255,255,255,.06);color:#f8fafc}
      #fikolasai-consent-manage{position:fixed;z-index:9998;right:14px;bottom:14px;display:none;background:#080d1d;color:#e2e8f0;font-size:12px}
      @media(max-width:520px){#fikolasai-consent{right:10px;bottom:10px;left:10px;padding:17px}#fikolasai-consent button{flex:1}}
    `;
    document.head.appendChild(style);
  }

  function renderConsentUi(showBanner) {
    ensureStyles();
    document.getElementById("fikolasai-consent")?.remove();
    document.getElementById("fikolasai-consent-manage")?.remove();
    const copy = labels();

    if (showBanner) {
      const banner = document.createElement("section");
      banner.id = "fikolasai-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-modal", "true");
      banner.setAttribute("aria-labelledby", "fikolasai-consent-title");
      banner.innerHTML = `
        <h2 id="fikolasai-consent-title">${copy.title}</h2>
        <p>${copy.text}</p>
        <div>
          <button type="button" id="fikolasai-consent-accept">${copy.accept}</button>
          <button type="button" id="fikolasai-consent-refuse">${copy.refuse}</button>
        </div>
      `;
      document.body.appendChild(banner);
      banner.querySelector("#fikolasai-consent-accept").addEventListener("click", () => updateConsent("granted"));
      banner.querySelector("#fikolasai-consent-refuse").addEventListener("click", () => updateConsent("denied"));
      return;
    }

    const manage = document.createElement("button");
    manage.type = "button";
    manage.id = "fikolasai-consent-manage";
    manage.textContent = copy.manage;
    manage.style.display = "block";
    manage.addEventListener("click", () => renderConsentUi(true));
    document.body.appendChild(manage);
  }

  function initialize() {
    installEventTracking();
    const consent = getConsent();
    if (consent === "granted") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
      loadAnalytics();
      renderConsentUi(false);
    } else if (consent === "denied") {
      renderConsentUi(false);
    } else {
      renderConsentUi(true);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.fikolasaiAnalytics = {
    version: VERSION,
    getConsent,
    track,
    openPreferences: () => renderConsentUi(true)
  };
})();
