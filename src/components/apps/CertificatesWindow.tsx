"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CERTIFICATES, CERTIFICATE_CATEGORIES } from "@/data/certificates";
import { Certificate } from "@/types";

type SortOption = "newest" | "oldest" | "alphabetical" | "organization";

const ALL_CATEGORY_ID = "all";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats only as precisely as the certificate states it: "2025-08-17" reads
 * "17 Aug 2025", "2025-07" reads "Jul 2025". Parsed by hand so a month-only
 * value never shifts a day backwards through the local timezone.
 */
function formatDate(iso: string | undefined, style: "long" | "short" = "long") {
  if (!iso) return "Not dated";
  const [y, m, d] = iso.split("-");
  const month = m ? MONTHS[Number(m) - 1] : undefined;
  if (!month) return y;
  if (!d || style === "short") return `${month} ${y}`;
  return `${Number(d)} ${month} ${y}`;
}

function categoryLabel(id: string) {
  if (id === ALL_CATEGORY_ID) return "All Certificates";
  return CERTIFICATE_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

/** File extension of the real certificate file, shown as an Explorer-style type tag. */
function fileTag(cert: Certificate) {
  const ext = cert.file.split(".").pop();
  return ext ? ext.toUpperCase() : cert.fileType.toUpperCase();
}

/** Undated certificates always sort last, whichever direction is picked. */
function byDate(a: Certificate, b: Certificate, direction: 1 | -1) {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return direction * b.date.localeCompare(a.date);
}

export default function CertificatesWindow() {
  const [category, setCategory] = useState<string>(ALL_CATEGORY_ID);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selected, setSelected] = useState<Certificate | null>(null);

  const sidebarItems = useMemo(
    () => [{ id: ALL_CATEGORY_ID, label: "All Certificates" }, ...CERTIFICATE_CATEGORIES],
    []
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { [ALL_CATEGORY_ID]: CERTIFICATES.length };
    for (const cat of CERTIFICATE_CATEGORIES) {
      map[cat.id] = CERTIFICATES.filter((c) => c.category === cat.id).length;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list = CERTIFICATES;

    if (category !== ALL_CATEGORY_ID) {
      list = list.filter((c) => c.category === category);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((c) =>
        [
          c.title,
          c.titleArabic,
          c.organization,
          c.provider,
          c.partner,
          c.instructor,
          c.credentialId,
          categoryLabel(c.category),
        ]
          .filter(Boolean)
          .some((field) => (field as string).toLowerCase().includes(q))
      );
    }

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return byDate(a, b, 1);
        case "oldest":
          return byDate(a, b, -1);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "organization":
          return a.organization.localeCompare(b.organization);
        default:
          return 0;
      }
    });
  }, [category, query, sortBy]);

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8] relative">
      {/* Explorer-style menu bar */}
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400 shrink-0">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-400 text-xs shrink-0">
        <span className="text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-blue-700 font-mono truncate">
          C:\Users\Portfolio\Certificates
        </div>
      </div>

      {/* Search + sort toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-2 py-1.5 border-b border-gray-400 bg-[#ECE9D8] shrink-0">
        <div className="flex-1 min-w-[160px] flex items-center gap-1.5 bg-white border border-gray-400 rounded-sm px-2 py-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/SearchIcon.svg" className="w-3.5 h-3.5 shrink-0" alt="" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, issuer, or instructor..."
            aria-label="Search certificates"
            className="flex-1 min-w-0 text-xs outline-none bg-transparent"
          />
        </div>
        <label className="flex items-center gap-1.5 text-xs text-gray-700 shrink-0">
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort certificates"
            className="xp-btn text-xs py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="organization">Organization</option>
          </select>
        </label>
      </div>

      {/* Sidebar + content */}
      <div className="flex-1 flex overflow-hidden @container">
        {/* Category sidebar — column layout on wide windows */}
        <nav
          aria-label="Certificate categories"
          className="hidden @2xl:flex w-40 shrink-0 flex-col bg-[#D6E8F7] border-r border-gray-400 py-2 overflow-y-auto"
        >
          {sidebarItems.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                aria-current={active ? "true" : undefined}
                className={`flex items-center justify-between gap-2 px-3 py-2 text-xs text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-blue-900 hover:bg-blue-100"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${active ? "opacity-80" : "opacity-60"}`}>
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Category chips — replaces the sidebar on narrow windows */}
          <div
            className="@2xl:hidden flex items-center gap-1.5 overflow-x-auto px-2 py-1.5 border-b border-gray-400 bg-[#D6E8F7] shrink-0"
            role="tablist"
            aria-label="Certificate categories"
          >
            {sidebarItems.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 whitespace-nowrap text-xs px-2.5 py-1 rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? "bg-blue-600 border-blue-700 text-white"
                      : "bg-white border-gray-300 text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  {cat.label} ({counts[cat.id] ?? 0})
                </button>
              );
            })}
          </div>

          {/* Certificate grid */}
          <div className="flex-1 overflow-y-auto p-3 @container">
            {filtered.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-2 text-center text-gray-500 px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/CertificateIcon.svg" className="w-10 h-10 opacity-60" alt="" />
                <p className="text-sm font-semibold text-gray-600">
                  No certificates found
                </p>
                <p className="text-xs max-w-xs">
                  Try a different search term, or pick another category from the
                  list.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-3">
                {filtered.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    onOpen={() => setSelected(cert)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600 shrink-0">
            {filtered.length} of {CERTIFICATES.length} certificate(s)
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <CertificateViewer cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CertificateCard({
  cert,
  onOpen,
}: {
  cert: Certificate;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      aria-label={`Open certificate: ${cert.title} from ${cert.organization}`}
      className="group flex flex-col text-left bg-white border border-gray-300 rounded shadow-sm hover:shadow-md hover:border-blue-400 transition-all overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative w-full aspect-[4/3] bg-[#ECE9D8] border-b border-gray-300 overflow-hidden">
        {cert.fileType === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cert.file}
            alt={`${cert.title} certificate`}
            loading="lazy"
            className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          /* PDF certificates show the XP certificate icon in the list view, and
             the real document itself in the viewer. */
          <span className="w-full h-full flex flex-col items-center justify-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/CertificateIcon.svg"
              alt=""
              className="w-14 h-14 group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-[10px] text-gray-500">
              Click to view document
            </span>
          </span>
        )}
        <span className="absolute top-1 right-1 text-[9px] font-bold bg-white/85 border border-gray-300 text-gray-600 rounded px-1 leading-4">
          {fileTag(cert)}
        </span>
      </div>
      <div className="p-2.5 flex flex-col gap-1">
        <p className="text-xs font-bold text-gray-800 leading-tight line-clamp-2">
          {cert.title}
        </p>
        <p className="text-[11px] text-blue-700 truncate">{cert.organization}</p>
        <div className="flex items-center justify-between mt-1 gap-1">
          <span className="text-[10px] text-gray-500 shrink-0">
            {formatDate(cert.date, "short")}
          </span>
          <span className="text-[10px] bg-blue-100 text-blue-700 border border-blue-300 rounded px-1.5 py-0.5 truncate">
            {categoryLabel(cert.category)}
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 text-gray-500">{label}</dt>
      <dd className="min-w-0 text-gray-800 break-words">{value}</dd>
    </div>
  );
}

function CertificateViewer({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-3"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate preview`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="xp-window w-full max-w-2xl max-h-full flex flex-col bg-white"
      >
        <div className="xp-titlebar flex items-center gap-2 px-2 py-1 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CertificateIcon.svg" className="w-4 h-4 shrink-0" alt="" />
          <span className="flex-1 min-w-0 text-white text-xs font-bold truncate drop-shadow-sm">
            {cert.title}
          </span>
          <button
            onClick={onClose}
            className="xp-btn-close w-[18px] h-[18px] flex items-center justify-center text-white text-xs font-bold rounded-sm leading-none shrink-0"
            aria-label="Close certificate preview"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cert.fileType === "image" ? (
            <div
              className={`relative w-full bg-[#ECE9D8] border border-gray-300 rounded overflow-hidden ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomed((z) => !z)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.file}
                alt={`${cert.title} certificate`}
                className={`w-full h-auto transition-transform duration-200 ${
                  zoomed ? "scale-150" : "scale-100"
                }`}
              />
            </div>
          ) : (
            /* The viewer params drop the PDF reader chrome, and every
               certificate PDF here is landscape (~1.45:1), so the page fills the
               frame instead of floating in dark space. */
            <object
              data={`${cert.file}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              aria-label={`${cert.title} certificate document`}
              className="w-full aspect-[1.45/1] max-h-[70vh] bg-[#ECE9D8] border border-gray-300 rounded"
            >
              <div className="h-full flex flex-col items-center justify-center gap-2 p-4 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/CertificateIcon.svg" className="w-12 h-12" alt="" />
                <p className="text-xs text-gray-600">
                  This browser cannot display the PDF inline.
                </p>
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-btn-primary text-xs px-3 py-1.5"
                >
                  Open the certificate
                </a>
              </div>
            </object>
          )}

          <div>
            <h2 className="text-base font-bold text-gray-800">{cert.title}</h2>
            {cert.titleArabic && (
              <p className="text-sm text-gray-600" dir="rtl" lang="ar">
                {cert.titleArabic}
              </p>
            )}
            <p className="text-sm text-blue-700">{cert.organization}</p>
          </div>

          <dl className="text-xs space-y-1">
            <DetailRow label="Issued by" value={cert.organization} />
            {cert.provider && (
              <DetailRow label="Offered through" value={cert.provider} />
            )}
            {cert.partner && (
              <DetailRow label="In partnership with" value={cert.partner} />
            )}
            {cert.instructor && (
              <DetailRow label="Signed by" value={cert.instructor} />
            )}
            <DetailRow label="Completed" value={formatDate(cert.date)} />
            <DetailRow label="Category" value={categoryLabel(cert.category)} />
            {cert.credentialId && (
              <DetailRow label="Certificate ID" value={cert.credentialId} />
            )}
            <DetailRow label="File" value={`${fileTag(cert)} — ${cert.file}`} />
          </dl>

          <p className="text-sm text-gray-700 leading-relaxed">
            {cert.description}
          </p>

          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="xp-btn-primary inline-flex items-center gap-1.5 text-xs px-3 py-1.5"
          >
            Open original certificate <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
