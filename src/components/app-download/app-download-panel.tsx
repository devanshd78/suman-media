"use client";

import { useEffect, useState } from "react";
import { DeviceMobile, X } from "@phosphor-icons/react";
import Image from "@/components/ui/image";
import { LocalizedContent } from "@/components/localization/localized-content";
import { ABHIJAT_APP_LINKS } from "@/config/app-download";
import styles from "./app-download.module.css";

export function AppStoreLinks() {
  return <LocalizedContent><div className={styles.stores}>
    <a href={ABHIJAT_APP_LINKS.android} target="_blank" rel="noopener noreferrer" aria-label="Download Abhijat Marathi on Google Play">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <path d="M5.49503 6.42364L0.0498047 12.3335C0.0503161 12.3346 0.050316 12.3361 0.0508275 12.3372C0.218066 12.9789 0.79087 13.4512 1.47108 13.4512C1.74316 13.4512 1.99836 13.3759 2.21726 13.2441L2.23464 13.2336L8.36365 9.61707L5.49503 6.42364Z" fill="#EA4335" />
        <path d="M11.0045 5.41803L10.9994 5.41437L8.35321 3.8459L5.37207 6.55869L8.36395 9.61719L10.9958 8.06441C11.4571 7.80918 11.7706 7.31181 11.7706 6.73861C11.7706 6.16854 11.4617 5.67378 11.0045 5.41803Z" fill="#FBBC04" />
        <path d="M0.0501204 1.11724C0.0173887 1.24067 0 1.37037 0 1.50426V11.9475C0 12.0814 0.0173887 12.2111 0.0506318 12.334L5.68253 6.57525L0.0501204 1.11724Z" fill="#4285F4" />
        <path d="M5.53543 6.72656L8.35342 3.84537L2.23158 0.215757C2.0091 0.0792551 1.74929 0.000805855 1.47159 0.000805855C0.791382 0.000805855 0.217554 0.474119 0.0503158 1.11636C0.0503158 1.11688 0.0498047 1.11741 0.0498047 1.11793L5.53543 6.72656Z" fill="#34A853" />
      </svg>
      <span><small>Get it on</small><strong translate="no">Google Play</strong></span>
    </a>
    <a href={ABHIJAT_APP_LINKS.ios} target="_blank" rel="noopener noreferrer" aria-label="Download Abhijat Marathi on the App Store">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <path d="M9.3626 7.15291C9.36941 6.63732 9.50968 6.13178 9.77038 5.68334C10.0311 5.2349 10.4037 4.85813 10.8537 4.58807C10.5678 4.18954 10.1908 3.86157 9.75239 3.6302C9.31403 3.39882 8.82644 3.27043 8.32835 3.25522C7.26586 3.14633 6.23582 3.87593 5.69438 3.87593C5.14247 3.87593 4.30886 3.26603 3.41119 3.28406C2.83056 3.30237 2.26469 3.46722 1.76871 3.76253C1.27273 4.05784 0.863563 4.47354 0.581073 4.96914C-0.642584 7.03754 0.270156 10.0774 1.44234 11.7494C2.02881 12.5681 2.71422 13.4826 3.61108 13.4502C4.48871 13.4146 4.81649 12.9038 5.87585 12.9038C6.92539 12.9038 7.2329 13.4502 8.14796 13.4295C9.0897 13.4146 9.68303 12.6072 10.2489 11.7807C10.6703 11.1974 10.9946 10.5526 11.2097 9.87041C10.6626 9.64449 10.1957 9.26633 9.86719 8.78308C9.53873 8.29983 9.36324 7.73288 9.3626 7.15291Z" fill="black" />
        <path d="M7.63424 2.15625C8.14772 1.55446 8.40069 0.780953 8.33943 0C7.55496 0.0804402 6.83033 0.446479 6.30992 1.02518C6.05548 1.3079 5.8606 1.6368 5.73643 1.99308C5.61226 2.34937 5.56124 2.72606 5.58627 3.10161C5.97865 3.10555 6.36682 3.02252 6.72157 2.85877C7.07631 2.69502 7.38837 2.45482 7.63424 2.15625Z" fill="black" />
      </svg>
      <span><small>Download on the</small><strong translate="no">App Store</strong></span>
    </a>
  </div></LocalizedContent>;
}

export function AppDownloadPanel() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setVisible(sessionStorage.getItem("suman-app-dismissed") !== "true"); }
      catch { setVisible(true); }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const close = () => {
    setVisible(false);
    try { sessionStorage.setItem("suman-app-dismissed", "true"); } catch { /* Storage may be disabled. */ }
  };
  if (!visible) return null;
  return <LocalizedContent><aside className={styles.widget} aria-label="Get the Abhijat Marathi app"
    onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
    {open && <div id="abhijat-app-download" className={styles.panel}>
      <button type="button" className={styles.close} onClick={close} aria-label="Close app download panel"><X size={24} weight="bold" aria-hidden="true" /></button>
      <a className={styles.qr} href={ABHIJAT_APP_LINKS.website} target="_blank" rel="noopener noreferrer" aria-label="Open the Abhijat Marathi website">
        <Image src="/images/app-download/abhijat-marathi-qr.png" width={220} height={216} alt="Scan to visit Abhijat Marathi" />
      </a>
      <div className={styles.copy}>
        <h2 className={styles.heading}>5000+ APP DOWNLOADS EVERY MONTH</h2>
        <AppStoreLinks />
      </div>
    </div>}
    <button type="button" className={styles.launcher} aria-expanded={open}
      aria-controls={open ? "abhijat-app-download" : undefined} onClick={() => setOpen(value => !value)}>
      <DeviceMobile size={20} aria-hidden="true" /><span>Get App</span>
    </button>
  </aside></LocalizedContent>;
}
