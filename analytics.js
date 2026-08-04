(() => {
  const MEASUREMENT_ID = "G-RSN9PNE840";
  const CLARITY_PROJECT_ID = "xtet4qw9zj";
  const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "1e20c4110b9447e7ac616a3e47664a05";
  const STORAGE_KEY = "fikolasai-analytics-consent";
  const VERSION = "2026-08-04";
  let analyticsLoaded = false;
  let consentTrigger = null;

  function loadCloudflareWebAnalytics() {
    if (document.querySelector("script[data-cf-beacon]")) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token: CLOUDFLARE_WEB_ANALYTICS_TOKEN }));
    document.head.appendChild(script);
  }

  loadCloudflareWebAnalytics();

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
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
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  }

  function saveConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
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

  function loadClarity() {
    if (window.clarity || document.querySelector(`script[data-clarity="${CLARITY_PROJECT_ID}"]`)) return;
    window.clarity = function clarity() { (window.clarity.q = window.clarity.q || []).push(arguments); };
    const script = document.createElement("script");
    script.async = true;
    script.dataset.clarity = CLARITY_PROJECT_ID;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
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
    if (granted) {
      loadAnalytics();
      loadClarity();
    } else {
      clearAnalyticsCookies();
    }
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
    if (!url.searchParams.has("utm_campaign")) url.searchParams.set("utm_campaign", "agent_ia");
    anchor.href = url.toString();
  }

  function trackClick(anchor) {
    const href = anchor.href;
    const label = anchor.textContent.trim().replace(/\s+/g, " ").slice(0, 100);
    if (href.includes("tally.so")) {
      track("click_tally", { link_url: href, link_text: label });
      track("generate_lead", { method: "tally", link_text: label });
    } else if (anchor.pathname === "/audit-ai-act-express/") {
      track("view_ai_act_offer", { link_url: href, link_text: label });
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

  function injectAiActOffer() {
    if (window.location.pathname !== "/" || document.getElementById("ai-act-home-offer")) return;
    const anchorSection = document.getElementById("offers") || document.getElementById("fonctionnement");
    if (!anchorSection) return;

    const section = document.createElement("section");
    section.id = "ai-act-home-offer";
    section.className = "max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10";
    section.innerHTML = `
      <div class="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-7 md:p-10">
        <div class="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p class="text-emerald-200 font-semibold mb-3">Nouvelle offre · AI Act</p>
            <h2 class="text-3xl md:text-5xl font-semibold mb-4">Audit AI Act Express</h2>
            <p class="text-lg text-slate-200 leading-relaxed mb-4">Un diagnostic opérationnel de vos chatbots, agents IA, contenus générés et procédures internes, avec un plan d’action priorisé.</p>
            <p class="text-sm text-slate-300">Audit de diagnostic à partir de 490 € HT. Il ne constitue pas une consultation juridique et ne garantit pas, à lui seul, la conformité réglementaire.</p>
          </div>
          <div class="lg:text-right">
            <p class="text-3xl font-semibold mb-5">À partir de 490 € HT</p>
            <a href="/audit-ai-act-express/" class="inline-flex px-6 py-3 bg-gold text-slate-950 rounded-lg font-bold hover:bg-amber-200 transition">Découvrir l’Audit AI Act Express</a>
          </div>
        </div>
      </div>`;
    anchorSection.parentNode.insertBefore(section, anchorSection);

    const navList = document.querySelector("nav ul");
    if (navList && !navList.querySelector('a[href="/audit-ai-act-express/"]')) {
      const item = document.createElement("li");
      item.innerHTML = '<a href="/audit-ai-act-express/" class="hover:text-white">AI Act</a>';
      navList.appendChild(item);
    }
  }

  function labels() {
    const english = document.documentElement.lang === "en";
    return english ? {
      title: "Audience measurement",
      text: "With your permission, Google Analytics helps us understand which pages and services are useful. No advertising cookies are enabled.",
      accept: "Accept analytics",
      refuse: "Refuse",
      manage: "Manage cookies"
    } : {
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
      consentTrigger = document.activeElement;
      const banner = document.createElement("section");
      banner.id = "fikolasai-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-modal", "false");
      banner.setAttribute("aria-labelledby", "fikolasai-consent-title");
      banner.innerHTML = `<h2 id="fikolasai-consent-title">${copy.title}</h2><p>${copy.text}</p><div><button type="button" id="fikolasai-consent-accept">${copy.accept}</button><button type="button" id="fikolasai-consent-refuse">${copy.refuse}</button></div>`;
      document.body.appendChild(banner);
      banner.querySelector("#fikolasai-consent-accept").addEventListener("click", () => updateConsent("granted"));
      banner.querySelector("#fikolasai-consent-refuse").addEventListener("click", () => updateConsent("denied"));
      banner.querySelector("#fikolasai-consent-accept").focus();
      return;
    }

    const manage = document.createElement("button");
    manage.type = "button";
    manage.id = "fikolasai-consent-manage";
    manage.textContent = copy.manage;
    manage.style.display = "block";
    manage.addEventListener("click", () => renderConsentUi(true));
    document.body.appendChild(manage);
    if (consentTrigger instanceof HTMLElement && consentTrigger !== document.body) {
      consentTrigger.focus();
      consentTrigger = null;
    }
  }

  function initialize() {
    injectAiActOffer();
    installEventTracking();
    const consent = getConsent();
    if (consent === "granted") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
      loadAnalytics();
      loadClarity();
      renderConsentUi(false);
    } else if (consent === "denied") {
      renderConsentUi(false);
    } else {
      renderConsentUi(true);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();

  window.fikolasaiAnalytics = {
    version: VERSION,
    getConsent,
    track,
    openPreferences: () => renderConsentUi(true)
  };
})();
