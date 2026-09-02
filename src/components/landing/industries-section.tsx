"use client";

import Link from "next/link";
import { plusJakartaSans as bodyFont, plusJakartaSans as headingFont } from "@/lib/fonts";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { CmsCta } from "@/types/cms";

/* ============================================================
   FONTS
   ============================================================ */

/* ============================================================
   TYPES
   ============================================================ */

type IndustryKey =
  | "entertainment"
  | "enterprises"
  | "brands"
  | "investors"
  | "public-sector"
  | "creators"
  | "government";

type IndustryItem = {
  key: IndustryKey;
  number: string;
  title: string;
  slug: string;
  background: string;
  artwork: ReactNode;
};

type IndustriesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;

};

/* ============================================================
   CONFIG
   ============================================================ */

const CARD_GAP_PX = 24;

const SCROLL_SPRING = {
  stiffness: 120,
  damping: 30,
  mass: 0.55,
  restDelta: 0.001,
} as const;

/* ============================================================
   ARROW
   ============================================================ */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   01 — ENTERTAINMENT
   ============================================================ */

const ENTERTAINMENT_BOX_SIZES = [
  100,
  87.5,
  75,
  62.5,
  50,
  37.5,
  25,
  12.5,
] as const;

function EntertainmentArtwork() {
  return (
    <div className="relative h-full w-full">
      {ENTERTAINMENT_BOX_SIZES.map((size) => (
        <span
          key={size}
          className="absolute left-1/2 top-1/2 block box-border -translate-x-1/2 -translate-y-1/2 border-[5px] border-white"
          style={{
            width: `${size}%`,
            height: `${size}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   02 — ENTERPRISES
   ============================================================ */

function EnterprisesArtwork() {
  return (
    <svg
      viewBox="0 0 276.365 321.6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(0 321.6) rotate(-90)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M321.6 140.673L241.19 276.365L90.4102 276.365L5.48828e-05 140.75L80.4287 -1.05419e-05L241.216 -3.51372e-06L321.6 140.673ZM157.298 4.93509L235.532 4.93509L204.511 59.2211L125.308 59.2211L157.298 4.93509ZM151.569 4.93509L83.2926 4.93508L52.272 59.2211L119.579 59.2211L151.569 4.93509ZM116.671 64.1562L49.452 64.1562L7.15121 138.183L73.0486 138.183L116.671 64.1562ZM73.0747 143.118L7.50982 143.118L55.2157 214.677L116.805 214.677L73.0747 143.118ZM122.589 214.677L78.8584 143.118L159.416 143.118L201.599 214.301L201.373 214.677L122.589 214.677ZM119.821 219.612L58.5058 219.612L93.0514 271.43L151.488 271.43L119.821 219.612ZM157.272 271.43L125.605 219.612L204.168 219.612L204.459 219.127L235.453 271.43L157.272 271.43ZM78.7768 138.183L122.4 64.1562L201.691 64.1562L159.39 138.183L78.7768 138.183ZM205.591 67.2791L163.677 140.628L204.485 209.491L246.674 139.175L205.591 67.2791ZM249.482 144.088L207.345 214.317L239.784 269.058L281.075 199.378L249.482 144.088ZM283.969 194.495L252.393 139.236L284.509 85.7098L315.89 140.628L283.969 194.495ZM281.701 80.7968L249.585 134.323L208.433 62.3056L239.784 7.44105L281.701 80.7968Z"
          fill="url(#industry-enterprises-fill)"
        />
      </g>

      <defs>
        <linearGradient
          id="industry-enterprises-fill"
          x1="13.5735"
          y1="219.612"
          x2="162.222"
          y2="345.006"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ============================================================
   03 — BRANDS
   ============================================================ */

const BRAND_RING_PATHS = [
  "M170 129.531L197.74 139.632L212.5 165.21L207.374 194.296L184.76 213.281H155.24L132.626 194.296L127.5 165.21L142.26 139.632L170 129.531ZM145.95 144.032L170 135.274L194.05 144.032L206.847 166.208L202.402 191.424L182.797 207.884H157.203L137.598 191.424L133.153 166.208L145.95 144.032Z",
  "M211.61 123.095L170 107.942L128.39 123.095L106.25 161.461L113.939 205.09L147.86 233.567H192.14L226.061 205.09L233.75 161.461L211.61 123.095ZM170 113.686L132.08 127.494L111.903 162.459L118.911 202.219L149.823 228.17H190.177L221.089 202.219L228.097 162.459L207.92 127.494L170 113.686Z",
  "M170 86.3539L225.48 106.557L255 157.713L244.748 215.885L199.52 253.854H140.48L95.2523 215.885L85 157.713L114.52 106.557L170 86.3539ZM118.21 110.957L170 92.0974L221.79 110.957L249.347 158.71L239.776 213.013L197.557 248.457H142.443L100.224 213.013L90.6534 158.71L118.21 110.957Z",
  "M239.35 90.0191L170 64.7654L100.65 90.0191L63.75 153.964L76.5653 226.679L133.1 274.14H206.9L263.435 226.679L276.25 153.964L239.35 90.0191ZM170 70.5089L104.34 94.4189L69.4034 154.961L81.5369 223.807L135.063 268.743H204.937L258.463 223.807L270.597 154.961L235.66 94.4189L170 70.5089Z",
  "M170 43.1769L253.22 73.4814L297.5 150.215L282.122 237.473L214.28 294.427H125.72L57.8784 237.473L42.5 150.215L86.7803 73.4814L170 43.1769ZM90.4703 77.8812L170 48.9204L249.53 77.8812L291.847 151.212L277.15 234.601L212.317 289.03H127.683L62.8499 234.601L48.1534 151.212L90.4703 77.8812Z",
  "M267.09 56.9437L170 21.5885L72.9103 56.9437L21.25 146.466L39.1914 248.267L118.34 314.713H221.66L300.809 248.267L318.75 146.466L267.09 56.9437ZM170 27.332L76.6004 61.3434L26.9034 147.464L44.163 245.396L120.303 309.316H219.697L295.837 245.396L313.097 147.464L263.4 61.3435L170 27.332Z",
  "M280.96 40.4059L170 0L59.0404 40.4059L0 142.717L20.5045 259.062L110.96 335H229.04L319.496 259.062L340 142.717L280.96 40.4059ZM170 5.74349L62.7304 44.8057L5.65344 143.715L25.4761 256.19L112.923 329.603H227.077L314.524 256.19L334.347 143.715L277.27 44.8057L170 5.74349Z",
] as const;

function BrandsArtwork() {
  return (
    <svg
      viewBox="0 0 340 335"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {BRAND_RING_PATHS.map((path) => (
        <path
          key={path}
          fillRule="evenodd"
          clipRule="evenodd"
          d={path}
          fill="url(#industry-brands-fill)"
        />
      ))}

      <defs>
        <linearGradient
          id="industry-brands-fill"
          x1="208"
          y1="313.5"
          x2="371.041"
          y2="172.285"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ============================================================
   04 — INVESTORS
   ============================================================ */

function InvestorsArtwork() {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <svg
        viewBox="0 0 282.435 154.055"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full shrink-0"
        style={{ height: "48.1422%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-2.91301e-06 133.284C-1.30486e-06 59.7032 62.1669 1.3587e-06 141.217 3.0864e-06C220.268 4.8141e-06 282.435 59.7032 282.435 133.284C282.435 144.755 219.209 154.055 141.217 154.055C63.2251 154.055 -3.16373e-06 144.755 -2.91301e-06 133.284ZM19.8735 71.8093C42.8572 31.11 88.1425 3.46192 141.217 3.46192C194.292 3.46192 239.577 31.11 262.561 71.8094C238.061 37.0457 193.225 13.8477 141.217 13.8477C89.2092 13.8477 44.3734 37.0456 19.8735 71.8093ZM141.217 17.3096C86.8166 17.3096 40.7547 43.2116 18.3298 80.8983C42.4982 49.0276 88.2171 27.6953 141.217 27.6953C194.217 27.6953 239.936 49.0277 264.105 80.8984C241.68 43.2117 195.618 17.3096 141.217 17.3096ZM16.6736 89.7182C38.3922 55.2127 85.3056 31.1572 141.217 31.1572C197.129 31.1572 244.042 55.2128 265.761 89.7183C259.207 81.7542 250.908 74.5155 241.206 68.2171C215.763 51.6996 180.54 41.543 141.217 41.543C101.894 41.543 66.6716 51.6996 41.2283 68.2171C31.5262 74.5155 23.2278 81.7542 16.6736 89.7182ZM43.353 71.0573C31.3977 78.8185 21.7415 87.9722 14.9539 98.0838C21.7909 90.5533 30.7468 83.7606 41.3468 77.9379C66.774 63.9705 101.953 55.3906 141.217 55.3906C180.481 55.3906 215.661 63.9705 241.088 77.9379C251.688 83.7606 260.644 90.5534 267.481 98.0839C260.693 87.9722 251.037 78.8185 239.081 71.0573C214.343 54.9977 179.887 45.0049 141.217 45.0049C102.548 45.0049 68.0912 54.9977 43.353 71.0573ZM13.3001 105.82C20.0931 96.4877 30.2923 88.0293 43.2344 80.92C67.9888 67.3221 102.489 58.8526 141.217 58.8526C179.945 58.8526 214.446 67.3221 239.2 80.92C252.142 88.0293 262.341 96.4878 269.134 105.82C262.062 98.956 252.444 92.8268 240.951 87.6617C215.555 76.2475 180.426 69.2383 141.217 69.2383C102.009 69.2383 66.8799 76.2475 41.4832 87.6617C29.9909 92.8268 20.3724 98.9559 13.3001 105.82ZM43.098 90.7797C29.0603 97.0888 18.337 104.65 11.6508 112.943C18.844 107.027 29.0992 101.775 41.6378 97.3919C66.9888 88.5302 102.061 83.086 141.217 83.086C180.374 83.086 215.446 88.5302 240.797 97.3919C253.335 101.775 263.591 107.027 270.784 112.943C264.098 104.65 253.374 97.0888 239.336 90.7797C214.552 79.6405 180.001 72.7002 141.217 72.7002C102.434 72.7002 67.8829 79.6405 43.098 90.7797ZM10.0002 119.384C11.1466 118.145 12.448 116.919 13.9028 115.709C20.6429 110.104 30.5215 104.975 42.9434 100.633C67.774 91.9533 102.382 86.5479 141.217 86.5479C180.053 86.5479 214.66 91.9533 239.491 100.633C251.913 104.975 261.792 110.104 268.532 115.709C269.986 116.919 271.288 118.145 272.434 119.384C271.896 119.034 271.34 118.689 270.768 118.349C263.569 114.072 253.256 110.286 240.625 107.132C215.335 100.818 180.325 96.9336 141.217 96.9336C102.109 96.9336 67.0997 100.818 41.8096 107.132C29.1781 110.286 18.8651 114.072 11.6662 118.349C11.094 118.689 10.5383 119.034 10.0002 119.384ZM13.6644 121.268C10.3795 123.219 7.9532 125.181 6.31945 127.121C24.1697 118.658 77.8139 112.512 141.217 112.512C204.621 112.512 258.265 118.658 276.115 127.121C274.481 125.181 272.055 123.219 268.77 121.268C262.025 117.261 252.122 113.587 239.663 110.476C214.771 104.261 180.102 100.396 141.217 100.396C102.333 100.396 67.6631 104.261 42.7717 110.476C30.3124 113.587 20.4091 117.261 13.6644 121.268ZM277.295 134.729C278.455 133.896 278.674 133.403 278.712 133.284C278.674 133.164 278.455 132.672 277.295 131.838C275.839 130.792 273.459 129.632 270.037 128.442C263.235 126.076 253.178 123.881 240.493 122.016C215.183 118.293 180.081 115.974 141.217 115.974C102.353 115.974 67.2519 118.293 41.9412 122.016C29.2565 123.881 19.1999 126.076 12.3972 128.442C8.97514 129.632 6.59547 130.792 5.13926 131.838C3.97993 132.672 3.76062 133.164 3.7223 133.284C3.76062 133.403 3.97993 133.896 5.13926 134.729C6.59547 135.776 8.97514 136.936 12.3972 138.126C19.1999 140.491 29.2565 142.686 41.9412 144.552C67.2519 148.275 102.353 150.593 141.217 150.593C180.081 150.593 215.183 148.275 240.493 144.552C253.178 142.686 263.235 140.491 270.037 138.126C273.459 136.936 275.839 135.776 277.295 134.729Z"
          fill="url(#industry-investors-upper-fill)"
        />

        <defs>
          <linearGradient
            id="industry-investors-upper-fill"
            x1="224.435"
            y1="147.553"
            x2="266.11"
            y2="42.1545"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.8" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        viewBox="0 0 282.435 154.055"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full shrink-0"
        style={{ height: "48.1422%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.91301e-06 20.7715C1.30486e-06 94.3519 62.1669 154.055 141.217 154.055C220.268 154.055 282.435 94.3519 282.435 20.7715C282.435 9.29967 219.209 -2.57266e-05 141.217 -2.74312e-05C63.2251 -2.91357e-05 3.16373e-06 9.29967 2.91301e-06 20.7715ZM19.8735 82.2458C42.8572 122.945 88.1425 150.593 141.217 150.593C194.292 150.593 239.577 122.945 262.561 82.2458C238.061 117.009 193.225 140.208 141.217 140.208C89.2092 140.208 44.3734 117.01 19.8735 82.2458ZM141.217 136.746C86.8166 136.746 40.7547 110.844 18.3298 73.1569C42.4982 105.028 88.2171 126.36 141.217 126.36C194.217 126.36 239.936 105.027 264.105 73.1568C241.68 110.844 195.618 136.746 141.217 136.746ZM16.6736 64.3369C38.3922 98.8424 85.3056 122.898 141.217 122.898C197.129 122.898 244.042 98.8424 265.761 64.3369C259.207 72.301 250.908 79.5397 241.206 85.8381C215.763 102.356 180.54 112.512 141.217 112.512C101.894 112.512 66.6716 102.356 41.2283 85.8381C31.5262 79.5396 23.2278 72.301 16.6736 64.3369ZM43.353 82.9978C31.3977 75.2367 21.7415 66.083 14.9539 55.9713C21.7909 63.5019 30.7468 70.2945 41.3468 76.1172C66.774 90.0847 101.953 98.6645 141.217 98.6645C180.481 98.6645 215.661 90.0847 241.088 76.1173C251.688 70.2946 260.644 63.5018 267.481 55.9713C260.693 66.083 251.037 75.2367 239.081 82.9979C214.343 99.0575 179.887 109.05 141.217 109.05C102.548 109.05 68.0912 99.0575 43.353 82.9978ZM13.3001 48.2355C20.0931 57.5674 30.2923 66.0259 43.2344 73.1352C67.9888 86.733 102.489 95.2026 141.217 95.2026C179.945 95.2026 214.446 86.733 239.2 73.1352C252.142 66.0259 262.341 57.5674 269.134 48.2355C262.062 55.0992 252.444 61.2284 240.951 66.3934C215.555 77.8077 180.426 84.8169 141.217 84.8169C102.009 84.8169 66.8799 77.8076 41.4832 66.3934C29.9909 61.2284 20.3724 55.0992 13.3001 48.2355ZM43.098 63.2754C29.0603 56.9664 18.337 49.4054 11.6508 41.1125C18.844 47.0284 29.0992 52.2802 41.6378 56.6633C66.9888 65.525 102.061 70.9692 141.217 70.9692C180.374 70.9692 215.446 65.525 240.797 56.6633C253.335 52.2803 263.591 47.0285 270.784 41.1125C264.098 49.4054 253.374 56.9664 239.336 63.2754C214.552 74.4146 180.001 81.355 141.217 81.355C102.434 81.355 67.8829 74.4146 43.098 63.2754ZM10.0002 34.6712C11.1466 35.91 12.448 37.1357 13.9028 38.3457C20.6429 43.9515 30.5215 49.0798 42.9434 53.422C67.774 62.1019 102.382 67.5073 141.217 67.5073C180.053 67.5073 214.66 62.1019 239.491 53.422C251.913 49.0798 261.792 43.9515 268.532 38.3457C269.986 37.1357 271.288 35.91 272.434 34.6712C271.896 35.0212 271.341 35.3663 270.768 35.7062C263.569 39.9829 253.256 43.7689 240.625 46.9228C215.335 53.2374 180.325 57.1216 141.217 57.1216C102.109 57.1216 67.0997 53.2374 41.8096 46.9228C29.1781 43.7689 18.8652 39.9829 11.6663 35.7062C11.094 35.3663 10.5383 35.0212 10.0002 34.6712ZM13.6644 32.7873C10.3795 30.8359 7.95321 28.8741 6.31945 26.9343C24.1697 35.3969 77.8139 41.5429 141.217 41.5429C204.621 41.543 258.265 35.3969 276.115 26.9343C274.481 28.8741 272.055 30.8359 268.77 32.7874C262.025 36.7942 252.122 40.468 239.663 43.579C214.771 49.794 180.102 53.6596 141.217 53.6596C102.333 53.6596 67.6631 49.794 42.7717 43.5789C30.3125 40.468 20.4091 36.7942 13.6644 32.7873ZM277.295 19.3261C278.455 20.1595 278.674 20.6518 278.712 20.7715C278.674 20.8911 278.455 21.3835 277.295 22.2168C275.839 23.2635 273.459 24.4233 270.037 25.6134C263.235 27.979 253.178 30.1738 240.493 32.0396C215.183 35.7625 180.081 38.081 141.217 38.081C102.353 38.081 67.2519 35.7625 41.9412 32.0396C29.2565 30.1738 19.1999 27.979 12.3972 25.6134C8.97515 24.4233 6.59548 23.2635 5.13927 22.2168C3.97993 21.3835 3.76063 20.8911 3.72231 20.7715C3.76063 20.6518 3.97993 20.1595 5.13927 19.3261C6.59548 18.2794 8.97515 17.1196 12.3972 15.9296C19.1999 13.5639 29.2565 11.3691 41.9412 9.50334C67.2519 5.78041 102.353 3.46189 141.217 3.46189C180.081 3.46189 215.183 5.78042 240.493 9.50335C253.178 11.3691 263.235 13.5639 270.037 15.9296C273.459 17.1196 275.839 18.2794 277.295 19.3261Z"
          fill="url(#industry-investors-lower-fill)"
        />

        <defs>
          <linearGradient
            id="industry-investors-lower-fill"
            x1="224.435"
            y1="6.50201"
            x2="266.11"
            y2="111.901"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.10611" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ============================================================
   05 — PUBLIC SECTOR
   ============================================================ */

function PublicSectorArtwork() {
  return (
    <svg
      viewBox="0 0 320 304"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.5573 58.0588L110.557 0H209.443L289.443 58.0588L320 152L289.443 245.941L209.443 304H110.557L30.5573 245.941L0 152L30.5573 58.0588ZM160 16.047L122.868 3.99556L197.132 3.99556L160 16.047ZM153.528 18.1476L112.085 4.69706L86.4722 39.9111L153.528 18.1476ZM88.2923 43.5216L155.654 21.6586L129.683 57.4842L88.2923 43.5216ZM81.227 47.1225L38.0136 106.535L81.0474 92.7623L81.227 47.1225ZM81.0308 96.9632L37.2503 110.974L64.0779 147.981L80.9215 124.747L81.0308 96.9632ZM84.9434 119.199L85.0359 95.6814L107.114 88.6156L84.9434 119.199ZM80.8945 131.596L66.5472 151.387L80.7396 170.965L80.8945 131.596ZM84.718 176.452L84.9164 126.048L113.545 86.5576L159.638 71.8064L208.483 88.2839L237.047 127.685L237.441 177.469L190.663 240.257L112.941 215.383L84.718 176.452ZM80.713 177.74L64.0778 154.793L37.6269 191.28L80.6055 205.035L80.713 177.74ZM84.6005 206.313L84.6914 183.228L106.51 213.325L84.6005 206.313ZM80.5891 209.225L36.2448 195.034L80.406 255.749L80.5891 209.225ZM84.3923 259.213L84.584 210.504L110.47 218.788L156.816 282.719L84.3923 259.213ZM215.02 90.4892L236.992 120.797L236.81 97.8399L215.02 90.4892ZM236.777 93.6113L210.973 84.9068L193.597 60.9381L236.41 47.2367L236.777 93.6113ZM240.821 99.1929L241.036 126.376L258.036 149.825L284.724 114.003L240.821 99.1929ZM284.23 109.619L240.788 94.9643L240.427 49.3966L284.23 109.619ZM204.436 82.7015L166.053 69.7533L189.589 62.221L204.436 82.7015ZM159.67 67.6003L187.12 58.8155L160.388 21.9411L133.651 58.8229L159.67 67.6003ZM127.226 60.8728L111.075 83.1525L85.0524 91.4805L85.2287 46.7053L127.226 60.8728ZM131.195 62.2114L153.255 69.6534L117.505 81.0945L131.195 62.2114ZM194.689 241.545L237.493 184.091L238.058 255.425L194.689 241.545ZM241.451 178.778L242.034 252.394L284.964 193.372L284.768 193.513L257.992 156.577L241.451 178.778ZM241.091 133.264L241.399 172.156L255.533 153.185L241.091 133.264ZM165.361 21.9882L233.297 44.0374L191.129 57.5326L165.361 21.9882ZM34.5571 114.072V188.702L61.6085 151.387L34.5571 114.072ZM164.279 282.363L236.192 259.023L192.165 244.933L164.279 282.363ZM188.139 243.645L160.41 280.864L116.901 220.846L188.139 243.645ZM260.495 153.217L285.443 187.631V119.73L260.495 153.217ZM80 42.0117L102.949 10.4605L42.8681 54.0632L80 42.0117ZM42.8681 249.937L102.949 293.54L80 261.988L42.8681 249.937ZM76 256.489L34.5571 199.511V243.038L76 256.489ZM30.5571 194.012V233.011L7.60845 162.461L30.5571 194.012ZM30.5571 116.786L4.94427 152L30.5571 187.214V116.786ZM30.5571 109.988L7.60845 141.539L30.5571 70.9892V109.988ZM34.5571 104.489V60.9618L76 47.5111L34.5571 104.489ZM86.4722 264.089L112.085 299.303L153.528 285.852L86.4722 264.089ZM160 287.953L122.868 300.004H197.132L160 287.953ZM217.051 293.54L277.132 249.937L240 261.988L217.051 293.54ZM233.528 264.089L166.472 285.852L207.915 299.303L233.528 264.089ZM244 256.489L285.443 243.038V199.511L244 256.489ZM289.443 194.012V233.011L312.392 162.46L289.443 194.012ZM312.392 141.54L289.443 70.9888V109.988L312.392 141.54ZM289.443 187.214L315.056 152L289.443 116.786V187.214ZM285.443 104.489V60.9618L244 47.5111L285.443 104.489ZM240 42.0117L277.132 54.0633L217.051 10.4603L240 42.0117ZM233.528 39.9111L166.472 18.1476L207.915 4.69706L233.528 39.9111Z"
        fill="url(#industry-public-sector-fill)"
      />

      <defs>
        <linearGradient
          id="industry-public-sector-fill"
          x1="259.5"
          y1="628.343"
          x2="144.5"
          y2="-7.34272"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.602057"
            stopColor="white"
            stopOpacity="0.05"
          />
          <stop offset="0.874734" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ============================================================
   06 — CREATORS
   ============================================================ */

function CreatorSquarePaths() {
  return (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.66 65.66H164.15V164.15H65.66V65.66ZM69.7638 69.7638H160.046V160.046H69.7638V69.7638Z"
        fill="url(#industry-creators-fill)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.245 49.245V180.565H180.565V49.245H49.245ZM176.461 53.3488H53.3488V176.461H176.461V53.3488Z"
        fill="url(#industry-creators-fill)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.83 32.83H196.98V196.98H32.83V32.83ZM36.9338 36.9338H192.876V192.876H36.9338V36.9338Z"
        fill="url(#industry-creators-fill)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.415 16.415V213.395H213.395V16.415H16.415ZM209.291 20.5188H20.5188V209.291H209.291V20.5188Z"
        fill="url(#industry-creators-fill)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0V229.81H229.81V0H0ZM225.706 4.10375H4.10375V225.706H225.706V4.10375Z"
        fill="url(#industry-creators-fill)"
      />
    </>
  );
}

function CreatorsArtwork() {
  return (
    <svg
      viewBox="0 0 325 325"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="rotate(45 162.5 162.5)">
        <g transform="translate(47.595 47.595)">
          <CreatorSquarePaths />
        </g>
      </g>

      <g transform="translate(47.595 47.595)">
        <CreatorSquarePaths />
      </g>

      <defs>
        <linearGradient
          id="industry-creators-fill"
          x1="182.617"
          y1="220.111"
          x2="269.012"
          y2="100.93"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.745281" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ============================================================
   07 — GOVERNMENT
   ============================================================ */

const GOVERNMENT_ELLIPSE_ANGLES = [0, 45, 90, 135] as const;

function GovernmentArtwork() {
  return (
    <svg
      viewBox="0 0 321 321"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {GOVERNMENT_ELLIPSE_ANGLES.map((angle) => (
        <g
          key={angle}
          transform={`rotate(${angle} 160.5 160.5)`}
        >
          <g transform="translate(100.3125 0)">
            <path
              d="M60.1875 2.50781C67.5228 2.50785 74.811 6.46319 81.7383 14.2764C88.663 22.0868 95.0143 33.5318 100.398 47.8896C111.16 76.5868 117.867 116.4 117.867 160.5C117.867 204.599 111.16 244.412 100.398 273.109C95.0142 287.467 88.663 298.912 81.7383 306.723C74.811 314.536 67.5229 318.491 60.1875 318.491C52.8521 318.491 45.564 314.536 38.6367 306.723C31.712 298.912 25.3608 287.467 19.9766 273.109C9.21519 244.412 2.50784 204.599 2.50781 160.5C2.50781 116.4 9.21512 76.5868 19.9766 47.8896C25.3607 33.5319 31.712 22.0868 38.6367 14.2764C45.564 6.46323 52.8522 2.50781 60.1875 2.50781Z"
              stroke="url(#industry-government-orbit-stroke)"
              strokeWidth="5.01562"
            />
          </g>
        </g>
      ))}

      <g transform="translate(160.5 160.5) rotate(-44.569) scale(0.77697) translate(-8.2342 -21.95595)">
        <path
          d="M0.00151277 21.8942C-0.0896416 34.0201 3.52269 43.8777 8.06988 43.9119C12.6171 43.9461 16.3772 34.1438 16.4684 22.018C16.5595 9.89215 12.9472 0.0345013 8.39999 0.000318302C3.85279 -0.0338657 0.0926686 9.76836 0.00151277 21.8942Z"
          fill="url(#industry-government-core-fill)"
        />
      </g>

      <defs>
        <linearGradient
          id="industry-government-orbit-stroke"
          x1="95.655"
          y1="307.451"
          x2="199.292"
          y2="253.839"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.05" />
          <stop offset="0.745281" stopColor="white" />
        </linearGradient>

        <linearGradient
          id="industry-government-core-fill"
          x1="8.40002"
          y1="0.000295713"
          x2="8.06992"
          y2="43.9119"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.206085" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ============================================================
   CODE-CONTROLLED INDUSTRIES
   ============================================================ */

const INDUSTRIES: IndustryItem[] = [
  {
    key: "entertainment",
    number: "01",
    title: "Entertainment",
    slug: "entertainment",
    background:
      "radial-gradient(circle at 93% 7%, rgba(49,211,239,0.95) 0%, rgba(49,211,239,0) 41%), radial-gradient(circle at 1% 95%, rgba(255,183,67,0.98) 0%, rgba(255,183,67,0) 43%), linear-gradient(137deg,#877BDD 0%,#F58EBB 54%,#54CAE6 100%)",
    artwork: <EntertainmentArtwork />,
  },
  {
    key: "enterprises",
    number: "02",
    title: "Enterprises",
    slug: "enterprises",
    background:
      "radial-gradient(circle at 89% 92%, rgba(251,184,128,0.98) 0%, rgba(251,184,128,0) 45%), radial-gradient(circle at 2% 2%, rgba(108,105,208,0.72) 0%, rgba(108,105,208,0) 47%), linear-gradient(139deg,#7971C7 0%,#EC86C1 50%,#F7AE82 100%)",
    artwork: <EnterprisesArtwork />,
  },
  {
    key: "brands",
    number: "03",
    title: "Brands",
    slug: "brands",
    background:
      "radial-gradient(circle at 3% 96%, rgba(251,197,87,1) 0%, rgba(251,197,87,0) 42%), radial-gradient(circle at 98% 100%, rgba(124,151,239,0.9) 0%, rgba(124,151,239,0) 41%), linear-gradient(139deg,#FF476A 3%,#FF6C82 45%,#FDB14B 100%)",
    artwork: <BrandsArtwork />,
  },
  {
    key: "investors",
    number: "04",
    title: "Investors",
    slug: "investors",
    background:
      "radial-gradient(circle at 7% 96%, rgba(255,249,226,0.98) 0%, rgba(255,249,226,0) 40%), radial-gradient(circle at 97% 94%, rgba(64,162,246,0.9) 0%, rgba(64,162,246,0) 42%), linear-gradient(134deg,#171640 0%,#40345E 42%,#E88E7A 74%,#61B5F0 100%)",
    artwork: <InvestorsArtwork />,
  },
  {
    key: "public-sector",
    number: "05",
    title: "Public Sector",
    slug: "public-sector",
    background:
      "radial-gradient(circle at 2% 8%, rgba(255,110,64,0.98) 0%, rgba(255,110,64,0) 47%), radial-gradient(circle at 98% 90%, rgba(99,151,216,0.9) 0%, rgba(99,151,216,0) 47%), linear-gradient(125deg,#FF7952 0%,#E7A276 48%,#789FD1 100%)",
    artwork: <PublicSectorArtwork />,
  },
  {
    key: "creators",
    number: "06",
    title: "Creators",
    slug: "creators",
    background:
      "radial-gradient(circle at 4% 4%, rgba(226,244,247,0.96) 0%, rgba(226,244,247,0) 44%), radial-gradient(circle at 97% 98%, rgba(255,100,60,0.97) 0%, rgba(255,100,60,0) 43%), linear-gradient(135deg,#D9EFF3 0%,#E36ECE 48%,#FF6943 100%)",
    artwork: <CreatorsArtwork />,
  },
  {
    key: "government",
    number: "07",
    title: "Government",
    slug: "government",
    background:
      "radial-gradient(circle at 7% 90%, rgba(105,197,231,0.85) 0%, rgba(105,197,231,0) 41%), radial-gradient(circle at 93% 9%, rgba(224,164,215,0.92) 0%, rgba(224,164,215,0) 43%), linear-gradient(134deg,#84CBE6 0%,#DCBEE9 51%,#CA88D2 100%)",
    artwork: <GovernmentArtwork />,
  },
];

/* ============================================================
   INDUSTRY CARD
   ============================================================ */

function IndustryCard({
  industry,
}: {
  industry: IndustryItem;
}) {
  return (
    <Link
      href={`/services?industry=${encodeURIComponent(
        industry.slug,
      )}`}
      data-industry-card
      className="
        group
        block
        snap-start
        w-[17.5rem]
        shrink-0
        bg-white
        text-black

        sm:w-[20rem]
        lg:w-[22rem]
        xl:w-[23.5rem]

        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#8F6C1A]
      "
    >
      <div
        className="
          relative
          flex
          aspect-square
          w-full
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          background: industry.background,
        }}
      >
        <span
          className={`
            ${bodyFont.className}

            absolute
            left-5
            top-5
            z-30

            text-[0.75rem]
            font-medium
            leading-4
            text-black/25
          `}
        >
          {industry.number}
        </span>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[12%]
            rounded-full
            bg-white/20
            blur-[3.7rem]
          "
        />

        <div
          aria-hidden="true"
          className="
            industry-noise
            pointer-events-none
            absolute
            inset-0
            z-[1]
            opacity-[0.075]
            mix-blend-soft-light
          "
        />

        <div
          aria-hidden="true"
          data-industry-artwork={industry.key}
          className="industry-artwork-frame relative z-10 origin-center transform-gpu"
        >
          {industry.artwork}
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-[linear-gradient(145deg,rgba(255,255,255,0.16),transparent_34%,transparent_70%,rgba(0,0,0,0.06))]
          "
        />
      </div>

      <div
        className="
          flex
          min-h-[3.75rem]
          items-center
          bg-white
          pt-3
        "
      >
        <h3
          className={`
            ${bodyFont.className}

            text-[1rem]
            font-semibold
            leading-[1.5rem]
            text-black
          `}
        >
          {industry.title}
        </h3>
      </div>
    </Link>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

export function IndustriesSection({
  eyebrow,
  heading,
  description,
  cta,
}: IndustriesSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const stickyContentRef =
    useRef<HTMLDivElement>(null);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const [metrics, setMetrics] = useState({
    horizontalDistance: 0,
    stickyHeight: 0,
    sectionStart: 0,
  });

  const {
    horizontalDistance,
    stickyHeight,
    sectionStart,
  } = metrics;

  /* ==========================================================
     CONTENT
     ========================================================== */

  const resolvedEyebrow =
    eyebrow?.trim() ||
    "Industries we work with";

  const resolvedHeading =
    heading?.trim() ||
    "The Industries we work with?";

  const resolvedDescription =
    description?.trim() ||
    "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

  const ctaLabel =
    cta?.label?.trim() ||
    "Explore Capabilities";

  const ctaHref =
    cta?.href?.trim() ||
    "/services";

  /* ==========================================================
     MEASURE ACTUAL CONTENT + ACTUAL HORIZONTAL TRAVEL

     No 100svh.
     No artificial hold.
     No +24 px.
     ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyContentRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !sticky || !viewport || !track) {
      return;
    }

    let frame = 0;
    let cancelled = false;

    const commitMeasurement = () => {
      if (cancelled) return;

      const next = {
        horizontalDistance: Math.max(
          0,
          track.scrollWidth - viewport.clientWidth,
        ),
        stickyHeight: sticky.scrollHeight,
        sectionStart: section.getBoundingClientRect().top + window.scrollY,
      };

      setMetrics((current) =>
        current.horizontalDistance === next.horizontalDistance &&
        current.stickyHeight === next.stickyHeight &&
        Math.abs(current.sectionStart - next.sectionStart) < 0.5
          ? current
          : next,
      );
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(commitMeasurement);
    };

    scheduleMeasure();

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(sticky);
    observer.observe(viewport);
    observer.observe(track);

    window.addEventListener("resize", scheduleMeasure, { passive: true });

    // Font metrics can settle after hydration. Re-measure once the loaded font
    // set is ready so the sticky release point stays exact without observing
    // the section's own computed height and creating a resize feedback loop.
    void document.fonts?.ready.then(scheduleMeasure);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  /* ==========================================================
     SCROLL

     Vertical pixels map directly to horizontal pixels.
     ========================================================== */

  const { scrollY } = useScroll();

  const smoothScrollY =
    useSpring(
      scrollY,
      SCROLL_SPRING,
    );

  const x = useTransform(
    smoothScrollY,
    (latestScrollY) => {
      if (
        horizontalDistance <= 0
      ) {
        return 0;
      }

      const rawProgress =
        (latestScrollY -
          sectionStart) /
        horizontalDistance;

      const progress = Math.min(
        1,
        Math.max(0, rawProgress),
      );

      return (
        -horizontalDistance *
        progress
      );
    },
  );

  /*
   * Section height:
   *
   * actual visible content
   * +
   * exact horizontal travel
   *
   * Nothing else.
   */
  const calculatedSectionHeight =
    shouldReduceMotion
      ? undefined
      : Math.max(
          0,
          stickyHeight +
            horizontalDistance,
        );

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-heading"
      className="
        landing-section-transition
        relative
        w-full
        bg-white
      "
      style={
        calculatedSectionHeight
          ? {
              height: `${calculatedSectionHeight}px`,
            }
          : undefined
      }
    >
      {/* =====================================================
          STICKY CONTENT

          IMPORTANT:
          NO h-[100svh]
          ===================================================== */}

      <div
        ref={stickyContentRef}
        className={`
          industries-sticky
          w-full
          bg-white

          ${
            shouldReduceMotion
              ? "relative"
              : "sticky top-0 overflow-hidden"
          }
        `}
      >
        {/* ===================================================
            HEADER
            =================================================== */}

        <div
          className="
            flex
            w-full
            flex-col
            items-start
            justify-between
            gap-8

            px-5
            pt-14

            sm:px-8
            sm:pt-16

            lg:flex-row
            lg:items-start
            lg:gap-16
            lg:px-[3.5rem]
            lg:pt-[4.5rem]

            xl:px-[4rem]
          "
        >
          {/* =================================================
              LEFT
              ================================================= */}

          <div
            className="
              flex
              w-full
              flex-col
              gap-5

              lg:w-[19rem]
              lg:shrink-0
            "
          >
            {/* ===============================================
                EYEBROW

                14 / 20
                600
                #B8B8B8
                =============================================== */}

            <p
              className={`
                ${headingFont.className}

                text-[0.875rem]
                font-semibold
                leading-[1.25rem]
                text-[#B8B8B8]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {resolvedEyebrow}
            </p>

            {/* ===============================================
                HEADING

                32 / 40
                400
                #000
                =============================================== */}

            <h2
              id="industries-heading"
              className={`
                ${headingFont.className}

                text-[2rem]
                font-normal
                leading-[2.5rem]
                text-black
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {resolvedHeading}
            </h2>
          </div>

          {/* =================================================
              RIGHT
              ================================================= */}

          <div
            className="
              flex
              w-full
              flex-col
              items-start

              lg:w-[31.5rem]
              lg:shrink-0
            "
          >
            {/* ===============================================
                DESCRIPTION

                16 / 24
                400
                #B8B8B8
                =============================================== */}

            <p
              className={`
                ${bodyFont.className}

                text-[1rem]
                font-normal
                leading-[1.5rem]
                text-[#B8B8B8]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {resolvedDescription}
            </p>

            <Link
              href={ctaHref}
              className={`
                ${bodyFont.className}

                group
                mt-4
                inline-flex
                items-center
                gap-1.5
                py-2

                text-[0.875rem]
                font-semibold
                leading-[1.25rem]
                text-[#8F6C1A]

                transition-opacity
                duration-200

                hover:opacity-60
              `}
            >
              <span>
                {ctaLabel}
              </span>

              <span
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              >
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* ===================================================
            HORIZONTAL CARDS
            =================================================== */}

        <div
          ref={viewportRef}
          className="
            industries-viewport
            mt-10
            w-full
            overflow-hidden
            pb-10

            sm:mt-12
            sm:pb-12

            lg:mt-[4rem]
            lg:pb-[3.5rem]
          "
        >
          <motion.div
            ref={trackRef}
            className="
              industries-horizontal-track
              flex
              w-max
              items-start

              pl-5
              pr-5

              sm:pl-8
              sm:pr-8

              lg:pl-[3.5rem]
              lg:pr-[3.5rem]

              xl:pl-[4rem]
              xl:pr-[4rem]
            "
            style={{
              x:
                shouldReduceMotion
                  ? 0
                  : x,

              gap: CARD_GAP_PX,
            }}
          >
            {INDUSTRIES.map(
              (industry) => (
                <IndustryCard
                  key={industry.key}
                  industry={industry}
                />
              ),
            )}
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          STYLES
          ===================================================== */}

      <style>{`
        /* ==================================================
           EXACT ARTWORK SIZING + INTERACTION
           ================================================== */

        .industry-artwork-frame {
          --industry-artwork-width: 18rem;
          --industry-artwork-ratio: 1 / 1;
          --industry-artwork-rest-angle: 0deg;

          display: flex;
          flex: none;
          align-items: center;
          justify-content: center;

          width: min(
            var(--industry-artwork-width),
            100%
          );
          aspect-ratio:
            var(--industry-artwork-ratio);

          transform: rotate(var(--industry-artwork-rest-angle));
          transform-origin: 50% 50%;
          will-change: transform;

          transition:
            transform 900ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }

        [data-industry-artwork="entertainment"] {
          --industry-artwork-width: 18.8125rem;
          --industry-artwork-ratio:
            18.8125 / 18.8125;
        }

        [data-industry-artwork="enterprises"] {
          /* Exact Figma box: 17.27281rem × 20.1rem, then 90deg. */
          --industry-artwork-width: 17.27281rem;
          --industry-artwork-ratio:
            17.27281 / 20.1;
          --industry-artwork-rest-angle: 90deg;
        }

        [data-industry-artwork="brands"] {
          --industry-artwork-width: 21.25rem;
          --industry-artwork-ratio:
            21.25 / 20.9375;
        }

        [data-industry-artwork="investors"] {
          --industry-artwork-width: 17.65219rem;
          --industry-artwork-ratio:
            17.65219 / 20;
        }

        [data-industry-artwork="public-sector"] {
          --industry-artwork-width: 20rem;
          --industry-artwork-ratio:
            20 / 19;
        }

        [data-industry-artwork="creators"] {
          /* 14.36313rem square + the same square at 45deg. */
          --industry-artwork-width: 20.31253rem;
          --industry-artwork-ratio: 1 / 1;
        }

        [data-industry-artwork="government"] {
          --industry-artwork-width: 20.06244rem;
          --industry-artwork-ratio: 1 / 1;
        }

        @media (max-width: 639px) {
          .industry-artwork-frame {
            will-change: auto;
            width: min(
              var(--industry-artwork-width),
              calc(100% - 1.5rem)
            );
          }

          [data-industry-artwork="enterprises"] {
            /* Its 90deg rest rotation swaps the visible width/height. */
            width: min(
              var(--industry-artwork-width),
              calc(100% - 4rem)
            );
          }
        }

        @media (hover: hover) and (pointer: fine) {
          [data-industry-card]:hover
            .industry-artwork-frame {
            transform: rotate(calc(var(--industry-artwork-rest-angle) - 90deg));
          }
        }

        [data-industry-card]:focus-visible
          .industry-artwork-frame {
          transform: rotate(calc(var(--industry-artwork-rest-angle) - 90deg));
        }

        /* ==================================================
           SUBTLE TEXTURE
           ================================================== */

        .industry-noise {
          background-image:
            repeating-radial-gradient(
              circle at 24% 31%,
              rgba(
                  255,
                  255,
                  255,
                  0.18
                )
                0,
              rgba(
                  255,
                  255,
                  255,
                  0.18
                )
                0.6px,
              transparent 0.8px,
              transparent 3px
            );
        }

        /* ==================================================
           MOBILE / TABLET

           Normal horizontal touch scrolling.
           No sticky vertical-scroll conversion.
           ================================================== */

        @media (max-width: 1023px) {
          .industry-artwork-frame {
            will-change: auto;
          }

          #industries {
            height: auto !important;
          }

          .industries-sticky {
            position: relative !important;
            top: auto !important;
            overflow: visible !important;
          }

          .industries-viewport {
            scroll-snap-type: x mandatory;
            scroll-padding-inline: 1.25rem;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            overscroll-behavior-x:
              contain;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .industries-viewport::-webkit-scrollbar {
            display: none;
          }

          .industries-horizontal-track {
            transform: none !important;
          }
        }

        /* ==================================================
           REDUCED MOTION
           ================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {
          #industries {
            height: auto !important;
          }

          .industries-sticky {
            position: relative !important;
            top: auto !important;
            overflow: visible !important;
          }

          .industries-viewport {
            scroll-snap-type: x mandatory;
            scroll-padding-inline: 1.25rem;
            overflow-x: auto !important;
            scrollbar-width: none;
          }

          .industries-viewport::-webkit-scrollbar {
            display: none;
          }

          .industries-horizontal-track {
            transform: none !important;
          }

          .industry-artwork-frame {
            transition: none !important;
          }

          [data-industry-card]:hover
            .industry-artwork-frame,
          [data-industry-card]:focus-visible
            .industry-artwork-frame {
            transform: rotate(var(--industry-artwork-rest-angle)) !important;
          }
        }
      `}</style>
    </section>
  );
}