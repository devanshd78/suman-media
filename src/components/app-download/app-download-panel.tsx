"use client";

import { useRef, useState } from "react";
import { AppleLogo, GooglePlayLogo, DeviceMobile, X } from "@phosphor-icons/react";
import Image from "@/components/ui/image";
import { LocalizedContent } from "@/components/localization/localized-content";
import { ABHIJAT_APP_LINKS } from "@/config/app-download";
import styles from "./app-download.module.css";

export function AppStoreLinks() {
  return <LocalizedContent><div className={styles.stores}>
    <a href={ABHIJAT_APP_LINKS.android} target="_blank" rel="noopener noreferrer" aria-label="Download Abhijat Marathi on Google Play">
      <GooglePlayLogo size={27} weight="fill" aria-hidden="true" />
      <span><small>Get it on</small><strong translate="no">Google Play</strong></span>
    </a>
    <a href={ABHIJAT_APP_LINKS.ios} target="_blank" rel="noopener noreferrer" aria-label="Download Abhijat Marathi on the App Store">
      <AppleLogo size={29} weight="fill" aria-hidden="true" />
      <span><small>Download on the</small><strong translate="no">App Store</strong></span>
    </a>
  </div></LocalizedContent>;
}

export function AppDownloadPanel() {
  const [open, setOpen] = useState(true);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  return <LocalizedContent><aside className={styles.widget} aria-label="Get the Abhijat Marathi app"
    onKeyDown={event => { if (event.key === "Escape" && open) { event.stopPropagation(); close(); } }}>
    {open && <div id="abhijat-app-download" className={styles.panel}>
      <button type="button" className={styles.close} onClick={close} aria-label="Minimize app download panel"><X size={22} aria-hidden="true" /></button>
      <a className={styles.qr} href={ABHIJAT_APP_LINKS.website} target="_blank" rel="noopener noreferrer" aria-label="Open the Abhijat Marathi website">
        <Image src="/images/app-download/abhijat-marathi-qr.png" width={220} height={216} alt="Scan to visit Abhijat Marathi" />
      </a>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>ENTERTAINMENT, ANYWHERE</p>
        <h2>Take Marathi stories with you.</h2>
        <AppStoreLinks />
      </div>
    </div>}
    <button ref={trigger} type="button" className={styles.launcher} aria-expanded={open}
      aria-controls={open ? "abhijat-app-download" : undefined} onClick={() => setOpen(value => !value)}>
      <DeviceMobile size={22} aria-hidden="true" /><span>Get the app</span>
    </button>
  </aside></LocalizedContent>;
}
