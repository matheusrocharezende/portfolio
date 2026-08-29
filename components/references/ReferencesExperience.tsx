"use client";

import { useEffect } from "react";
import "@/app/references/references.css";

const BREAKPOINT = 768;
const SHEET_ID = "1-6Gniw0j4sw9cgXFQjuROVIASf5VCjAAgRAnd-UHQ7E";

type LinkEntry = {
  category: string;
  date: string;
  name: string;
  url: string;
  description: string;
};

/* Used as instant fallback if the sheet fetch fails */
const FALLBACK_DATA: LinkEntry[] = [
  { category: "agency", date: "03/2025", name: "wearetwoo", url: "https://wearetwoo.com/menu/", description: "" },
  { category: "agency", date: "03/2025", name: "work & co", url: "https://work.co/", description: "" },
  { category: "agency", date: "03/2025", name: "r/ga", url: "https://rga.com/", description: "" },
  { category: "agency", date: "03/2025", name: "the first the last", url: "https://thefirstthelast.agency", description: "" },
  { category: "studio", date: "03/2025", name: "porto rocha", url: "https://portorocha.com/", description: "" },
  { category: "studio", date: "03/2025", name: "doc", url: "https://www.doc.cc/", description: "" },
  { category: "studio", date: "03/2025", name: "concepcion studios", url: "https://www.concepcionstudios.com/design", description: "" },
  { category: "studio", date: "03/2025", name: "lovesong", url: "https://lovesong.tv/contact", description: "" },
  { category: "gallery", date: "03/2025", name: "deck", url: "https://www.deck.gallery/", description: "" },
  { category: "gallery", date: "03/2025", name: "brandsite", url: "https://www.brandsite.design/index.html", description: "" },
  { category: "gallery", date: "03/2025", name: "rebrand", url: "https://www.rebrand.gallery/", description: "" },
  { category: "gallery", date: "03/2025", name: "craftwork", url: "https://craftwork.design/curated/websites", description: "" },
  { category: "gallery", date: "03/2025", name: "footer", url: "https://www.footer.design/", description: "" },
  { category: "gallery", date: "03/2025", name: "dark", url: "https://www.dark.design/", description: "" },
  { category: "gallery", date: "03/2025", name: "landing", url: "https://www.landing.gallery/", description: "" },
  { category: "gallery", date: "03/2025", name: "minimal", url: "https://minimal.gallery/templates/", description: "" },
  { category: "gallery", date: "03/2025", name: "httpster", url: "https://httpster.net", description: "" },
  { category: "gallery", date: "03/2025", name: "saaspo", url: "https://saaspo.com", description: "" },
  { category: "gallery", date: "03/2025", name: "refero", url: "https://refero.design", description: "" },
  { category: "brand", date: "03/2025", name: "herman miller", url: "https://brandstandards.hermanmiller.com/who-we-are", description: "" },
  { category: "brand", date: "05/2026", name: "logo system", url: "https://logosystem.co", description: "" },
  { category: "tools", date: "03/2025", name: "design systems", url: "https://www.designsystems.com/", description: "" },
  { category: "tools", date: "03/2025", name: "saman icons", url: "https://icons.saman.design/#content", description: "" },
  { category: "strategy", date: "03/2025", name: "svpg", url: "https://www.svpg.com/", description: "" },
  { category: "portfolio", date: "03/2025", name: "nick barclay", url: "https://www.nickbarclaydesigns.com/new-page-2", description: "" },
  { category: "portfolio", date: "03/2025", name: "edkf", url: "https://www.edkf.fyi/portfolio-tips", description: "" },
  { category: "editorial", date: "03/2025", name: "devouring details", url: "https://devouringdetails.com/", description: "" },
  { category: "editorial", date: "03/2025", name: "ux design", url: "https://start.uxdesign.cc/", description: "" },
  { category: "editorial", date: "05/2026", name: "typographic posters", url: "https://www.typographicposters.com", description: "" },
];

/* Auto-categorise new entries added to the sheet by matching hostname */
const CATEGORY_MAP: Record<string, string> = {
  "wearetwoo.com": "agency", "work.co": "agency", "rga.com": "agency", "thefirstthelast.agency": "agency",
  "portorocha.com": "studio", "doc.cc": "studio", "concepcionstudios.com": "studio", "lovesong.tv": "studio",
  "deck.gallery": "gallery", "brandsite.design": "gallery", "rebrand.gallery": "gallery",
  "craftwork.design": "gallery", "footer.design": "gallery", "dark.design": "gallery",
  "landing.gallery": "gallery", "minimal.gallery": "gallery", "httpster.net": "gallery",
  "saaspo.com": "gallery", "refero.design": "gallery",
  "hermanmiller.com": "brand", "logosystem.co": "brand",
  "designsystems.com": "tools", "saman.design": "tools",
  "svpg.com": "strategy",
  "nickbarclaydesigns.com": "portfolio", "edkf.fyi": "portfolio",
  "devouringdetails.com": "editorial", "uxdesign.cc": "editorial", "typographicposters.com": "editorial",
};

function categoryFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const parts = host.split(".");
    return CATEGORY_MAP[host] || CATEGORY_MAP[parts.slice(-2).join(".")] || "";
  } catch {
    return "";
  }
}

function nameFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const parts = host.split(".");
    const core = parts.length >= 3 ? parts[parts.length - 2] : parts[0];
    return core.replace(/-/g, " ");
  } catch {
    return url;
  }
}

async function fetchSheetData(): Promise<LinkEntry[]> {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();

  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].toLowerCase().split(",").map((h) => h.trim());

  const col = {
    date: headers.findIndex((h) => /^data$|^date$/i.test(h)),
    url: headers.findIndex((h) => /^link$|^url$/i.test(h)),
    name: headers.findIndex((h) => /^nome$|^name$/i.test(h)),
    cat: headers.findIndex((h) => /categ/i.test(h)),
    desc: headers.findIndex((h) => /desc/i.test(h)),
  };

  if (col.url < 0) throw new Error('Sheet has no "Link" column');

  const seen = new Set<string>();
  const result: LinkEntry[] = [];

  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const cols = line.split(",");
    const url = (cols[col.url] ?? "").trim();
    const date = col.date >= 0 ? (cols[col.date] ?? "").trim() : "";
    const name = col.name >= 0 ? (cols[col.name] ?? "").trim() : "";
    const cat = col.cat >= 0 ? (cols[col.cat] ?? "").trim() : "";
    const desc = col.desc >= 0 ? (cols[col.desc] ?? "").trim() : "";

    if (!url) continue;

    const norm = url.split("?")[0].split("#")[0].replace(/\/$/, "");
    if (seen.has(norm)) continue;
    seen.add(norm);

    result.push({
      category: cat || categoryFromUrl(url),
      date,
      name: name || nameFromUrl(url),
      url,
      description: desc,
    });
  }

  return result;
}

function screenshotSrc(url: string): string {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

export function ReferencesExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const prevHtmlBg = root.style.background;
    const prevBodyBg = document.body.style.background;
    const prevOverscroll = document.body.style.overscrollBehaviorY;
    root.style.background = "#141414";
    document.body.style.background = "#141414";
    document.body.style.overscrollBehaviorY = "none";

    const cleanups: Array<() => void> = [];
    let cancelled = false;

    let DATA: LinkEntry[] = [];

    const _preloaded = new Set<string>();
    function preloadScreenshot(url: string) {
      const src = screenshotSrc(url);
      if (_preloaded.has(src)) return;
      _preloaded.add(src);
      const img = new Image();
      img.src = src;
    }

    function preloadAhead(currentIdx: number, ahead = 3) {
      const run = () => {
        for (let i = 1; i <= ahead; i++) {
          const entry = DATA[currentIdx + i];
          if (entry) preloadScreenshot(entry.url);
        }
      };
      "requestIdleCallback" in window
        ? requestIdleCallback(run, { timeout: 2000 })
        : setTimeout(run, 200);
    }

    function filterLinks(query: string): LinkEntry[] {
      if (!query) return DATA;
      const q = query.toLowerCase();
      return DATA.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.date.includes(q)
      );
    }

    function initMobile() {
      if (window.innerWidth >= BREAKPOINT) return;

      const hero = document.getElementById("hero");
      const stickyTop = document.getElementById("sticky-top");
      const previewWrap = document.getElementById("preview-wrap");
      const previewFrame = document.getElementById("preview-frame");
      const previewLabel = document.getElementById("preview-label");
      const imgA = document.getElementById("img-a") as HTMLImageElement | null;
      const imgB = document.getElementById("img-b") as HTMLImageElement | null;
      const searchBtn = document.getElementById("search-btn");
      const rowsWrap = document.getElementById("rows-wrap");
      const spacerEl = document.getElementById("spacer");
      const searchOverlay = document.getElementById("search-overlay");
      const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
      const searchResults = document.getElementById("search-results");
      const searchClose = document.getElementById("search-close");

      if (
        !hero || !stickyTop || !previewWrap || !previewFrame || !previewLabel ||
        !imgA || !imgB || !searchBtn || !rowsWrap || !spacerEl ||
        !searchOverlay || !searchInput || !searchResults || !searchClose
      ) {
        return;
      }

      DATA.forEach((link, i) => {
        const div = document.createElement("div");
        div.className = "row";
        div.dataset.index = String(i);
        div.innerHTML =
          `<span class="m-col-t">${link.category}</span>` +
          `<span class="m-col-n">${link.name}</span>`;
        div.addEventListener("click", () => window.open(link.url, "_blank", "noopener"));
        rowsWrap.appendChild(div);
      });

      const rows = Array.from(rowsWrap.querySelectorAll<HTMLDivElement>(".row"));

      let previewIdx = -1;
      let frontIsA = true;
      let shimmerTimer: ReturnType<typeof setTimeout>;

      function swap(front: HTMLImageElement, back: HTMLImageElement) {
        back.classList.replace("off", "on");
        front.classList.replace("on", "off");
        frontIsA = !frontIsA;
      }

      function showPreview(idx: number) {
        if (idx === previewIdx) return;
        previewIdx = idx;

        const link = DATA[idx];
        const front = frontIsA ? imgA! : imgB!;
        const back = frontIsA ? imgB! : imgA!;
        const src = screenshotSrc(link.url);

        previewLabel!.textContent = link.url.replace(/^https?:\/\//, "");

        if (back.dataset.loaded === src) {
          swap(front, back);
          return;
        }

        clearTimeout(shimmerTimer);
        shimmerTimer = setTimeout(() => previewFrame!.classList.add("loading"), 100);

        back.dataset.loaded = src;
        back.src = src;
        back.onload = back.onerror = () => {
          clearTimeout(shimmerTimer);
          previewFrame!.classList.remove("loading");
          swap(front, back);
        };
      }

      let lastRowIdx = -1;

      function activateRow(idx: number) {
        if (idx !== lastRowIdx) {
          lastRowIdx = idx;
          rows.forEach((r, i) => r.classList.toggle("active", i === idx));
          preloadAhead(idx);
        }
        showPreview(idx);
      }

      function getFirstVisibleRow() {
        const boundary = stickyTop!.getBoundingClientRect().bottom - 2;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].getBoundingClientRect().top >= boundary) return i;
        }
        return rows.length - 1;
      }

      function updateSpacer() {
        const rowH = rows[0]?.offsetHeight || 44;
        spacerEl!.style.height = Math.max(0, window.innerHeight - stickyTop!.offsetHeight + rowH) + "px";
      }

      let snapEnabled = false;

      function enableSnap() {
        if (snapEnabled) return;
        snapEnabled = true;

        const y = hero!.offsetHeight;
        if (window.scrollY > y + 1) window.scrollTo({ top: y, behavior: "instant" });

        document.documentElement.style.scrollPaddingTop = stickyTop!.offsetHeight + "px";
        updateSpacer();

        requestAnimationFrame(() => {
          document.documentElement.classList.add("refs-list-mode");
          lastRowIdx = previewIdx = -1;
          activateRow(getFirstVisibleRow());
        });
      }

      function disableSnap() {
        if (!snapEnabled) return;
        snapEnabled = false;
        document.documentElement.classList.remove("refs-list-mode");
        lastRowIdx = previewIdx = -1;
        rows.forEach((r) => r.classList.remove("active"));
        spacerEl!.style.height = "100dvh";
      }

      let previewOpen = false;
      let targetPreviewH = 0;
      let raf: number | null = null;

      function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
      function easeOut(t: number) { return 1 - (1 - t) * (1 - t); }

      function computePreviewTargetH() {
        return 14 + (window.innerWidth - 32) * (9.8 / 16) + 8 + 20;
      }

      function tick() {
        raf = null;

        const scrollY = window.scrollY;
        const heroH = hero!.offsetHeight;
        const progress = Math.min(scrollY / heroH, 1);
        const eased = easeInOut(progress);

        hero!.style.opacity = String(Math.max(0, 1 - eased * 1.5));
        hero!.style.transform = `translateY(${-eased * 20}px)`;

        if (progress > 0.2) {
          if (!previewOpen) {
            previewOpen = true;
            targetPreviewH = computePreviewTargetH();
            searchBtn!.classList.add("show");
          }
          const pProg = Math.min((progress - 0.2) / 0.8, 1);
          previewWrap!.style.height = easeOut(pProg) * targetPreviewH + "px";

          if (pProg >= 0.99) enableSnap();
          if (snapEnabled) activateRow(getFirstVisibleRow());
        } else {
          if (previewOpen) {
            previewOpen = false;
            searchBtn!.classList.remove("show");
          }
          previewWrap!.style.height = "0px";
        }
      }

      const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));

      function onScrollEnd() {
        if (snapEnabled && window.scrollY < hero!.offsetHeight * 0.05) disableSnap();
      }
      window.addEventListener("scrollend", onScrollEnd, { passive: true });
      cleanups.push(() => window.removeEventListener("scrollend", onScrollEnd));

      let scrollEndTimer: ReturnType<typeof setTimeout>;
      const scrollEndFallback = () => {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(onScrollEnd, 200);
      };
      const supportsScrollEnd = "onscrollend" in window;
      if (!supportsScrollEnd) {
        window.addEventListener("scroll", scrollEndFallback, { passive: true });
        cleanups.push(() => window.removeEventListener("scroll", scrollEndFallback));
      }

      const onResize = () => {
        targetPreviewH = computePreviewTargetH();
        if (snapEnabled) {
          document.documentElement.style.scrollPaddingTop = stickyTop!.offsetHeight + "px";
          updateSpacer();
        }
      };
      window.addEventListener("resize", onResize, { passive: true });
      cleanups.push(() => window.removeEventListener("resize", onResize));

      const onSearchOpen = () => {
        searchOverlay!.classList.add("open");
        searchInput!.value = "";
        renderSearch("");
        setTimeout(() => searchInput!.focus(), 40);
      };
      searchBtn.addEventListener("click", onSearchOpen);
      cleanups.push(() => searchBtn.removeEventListener("click", onSearchOpen));

      const onSearchClose = () => {
        searchOverlay!.classList.remove("open");
        searchInput!.blur();
      };
      searchClose.addEventListener("click", onSearchClose);
      cleanups.push(() => searchClose.removeEventListener("click", onSearchClose));

      const onSearchInput = () => renderSearch(searchInput!.value);
      searchInput.addEventListener("input", onSearchInput);
      cleanups.push(() => searchInput.removeEventListener("input", onSearchInput));

      const onSearchKeydown = (e: KeyboardEvent) => { if (e.key === "Escape") onSearchClose(); };
      searchInput.addEventListener("keydown", onSearchKeydown);
      cleanups.push(() => searchInput.removeEventListener("keydown", onSearchKeydown));

      function renderSearch(q: string) {
        const list = filterLinks(q.trim());
        searchResults!.innerHTML = "";

        if (!list.length) {
          const d = document.createElement("div");
          d.className = "no-results";
          d.textContent = "no results.";
          searchResults!.appendChild(d);
          return;
        }

        const term = q.trim().toLowerCase();
        list.forEach((link) => {
          const div = document.createElement("div");
          div.className = "s-row";
          const hl = term
            ? link.name.replace(new RegExp(`(${term})`, "gi"), "<mark>$1</mark>")
            : link.name;
          div.innerHTML =
            `<span class="m-col-t">${link.category}</span>` +
            `<span class="m-col-n">${hl}</span>`;
          div.addEventListener("click", () => {
            window.open(link.url, "_blank", "noopener");
            onSearchClose();
          });
          searchResults!.appendChild(div);
        });
      }

      const onLoad = () => {
        updateSpacer();
        preloadAhead(-1, 4);

        const src = screenshotSrc(DATA[0].url);
        imgA.dataset.loaded = src;
        imgA.src = src;
        imgA.onload = imgA.onerror = () => {
          clearTimeout(shimmerTimer);
          previewFrame!.classList.remove("loading");
          imgA.classList.replace("off", "on");
          frontIsA = false;
          previewLabel!.textContent = DATA[0].url.replace(/^https?:\/\//, "");
        };
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad, { once: true });
        cleanups.push(() => window.removeEventListener("load", onLoad));
      }
    }

    function initDesktop() {
      if (window.innerWidth < BREAKPOINT) return;

      const tableBody = document.getElementById("d-tableBody");
      const preview = document.getElementById("d-preview");
      const previewImg = document.getElementById("d-previewImg") as HTMLImageElement | null;
      const searchToggle = document.getElementById("d-searchToggle");
      const searchBar = document.getElementById("d-searchBar");
      const searchInput = document.getElementById("d-searchInput") as HTMLInputElement | null;
      const sortBtns = document.querySelectorAll<HTMLButtonElement>("#desktop-app .d-sort-btn");

      if (!tableBody || !preview || !previewImg || !searchToggle || !searchBar || !searchInput) {
        return;
      }

      let sortField = "type";
      let sortDir = "asc";
      let query = "";
      let mouseX = 0;
      let mouseY = 0;
      let previewVisible = false;

      function getSorted(items: LinkEntry[]) {
        return [...items].sort((a, b) => {
          const catCmp = (a.category || "").localeCompare(b.category || "");
          if (catCmp !== 0) return sortField === "type" && sortDir === "desc" ? -catCmp : catCmp;
          if (sortField === "name") {
            const cmp = a.name.localeCompare(b.name);
            return sortDir === "asc" ? cmp : -cmp;
          }
          return 0;
        });
      }

      function render() {
        const rows = getSorted(filterLinks(query));
        tableBody!.innerHTML = "";
        let lastCategory: string | null = null;

        const warmCount = Math.min(8, rows.length);
        const warmEntries = rows.slice(0, warmCount);
        const warmFn = () => warmEntries.forEach((l) => preloadScreenshot(l.url));
        "requestIdleCallback" in window
          ? requestIdleCallback(warmFn, { timeout: 3000 })
          : setTimeout(warmFn, 500);

        rows.forEach((link, i) => {
          const tr = document.createElement("tr");
          if (i === rows.length - 1 || rows[i + 1].category !== link.category) {
            tr.classList.add("group-end");
          }

          const tdCat = document.createElement("td");
          tdCat.className = "col-category";
          if (link.category !== lastCategory) {
            tdCat.textContent = link.category;
            lastCategory = link.category;
          }

          const tdDate = document.createElement("td");
          tdDate.className = "col-date";
          tdDate.textContent = link.date;

          const tdName = document.createElement("td");
          tdName.className = "col-name";
          tdName.textContent = link.name;

          const tdDesc = document.createElement("td");
          tdDesc.className = "col-description";
          tdDesc.textContent = link.description || "";

          tr.append(tdCat, tdDate, tdName, tdDesc);
          tr.dataset.url = link.url || "";

          tr.addEventListener("mouseenter", () => showPreviewD(link));
          tr.addEventListener("mouseleave", hidePreviewD);
          tr.addEventListener("click", () => { if (link.url) window.open(link.url, "_blank"); });

          tableBody!.appendChild(tr);
        });
      }

      function showPreviewD(link: LinkEntry) {
        const src = link.url ? screenshotSrc(link.url) : "";
        if (src) {
          if (previewImg!.dataset.src !== src) {
            previewImg!.dataset.src = src;
            previewImg!.src = src;
          }
          preview!.classList.remove("no-image");
        } else {
          preview!.classList.add("no-image");
        }
        preview!.classList.add("visible");
        previewVisible = true;
        positionPreview();
      }

      function hidePreviewD() {
        preview!.classList.remove("visible");
        previewVisible = false;
      }

      function positionPreview() {
        const margin = 20;
        const ph = 200;
        const vh = window.innerHeight;
        let y = mouseY - ph / 2;
        if (y < margin) y = margin;
        if (y + ph > vh - margin) y = vh - ph - margin;
        preview!.style.left = mouseX + margin + "px";
        preview!.style.top = y + "px";
      }

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (previewVisible) positionPreview();
      };
      document.addEventListener("mousemove", onMouseMove);
      cleanups.push(() => document.removeEventListener("mousemove", onMouseMove));

      function updateSortUI() {
        sortBtns.forEach((b) => {
          b.classList.remove("active", "asc", "desc");
          b.querySelector(".arrow")?.remove();
        });
        const active = document.querySelector<HTMLButtonElement>(
          `#desktop-app .d-sort-btn[data-sort="${sortField}"]`
        );
        if (active) {
          active.classList.add("active", sortDir);
          const arrow = document.createElement("span");
          arrow.className = "arrow";
          arrow.textContent = sortDir === "asc" ? " ↑" : " ↓";
          active.appendChild(arrow);
        }
      }

      sortBtns.forEach((btn) => {
        const onClick = () => {
          const field = btn.dataset.sort!;
          sortDir = sortField === field && sortDir === "asc" ? "desc" : "asc";
          sortField = field;
          updateSortUI();
          render();
        };
        btn.addEventListener("click", onClick);
        cleanups.push(() => btn.removeEventListener("click", onClick));
      });

      const onSearchToggle = () => {
        searchBar!.classList.toggle("open");
        if (searchBar!.classList.contains("open")) {
          searchInput!.focus();
        } else {
          searchInput!.value = "";
          query = "";
          render();
        }
      };
      searchToggle.addEventListener("click", onSearchToggle);
      cleanups.push(() => searchToggle.removeEventListener("click", onSearchToggle));

      const onSearchInput = (e: Event) => {
        query = (e.target as HTMLInputElement).value.trim();
        render();
      };
      searchInput.addEventListener("input", onSearchInput);
      cleanups.push(() => searchInput.removeEventListener("input", onSearchInput));

      updateSortUI();
      render();
    }

    (async function main() {
      try {
        DATA = await fetchSheetData();
      } catch (err) {
        console.warn("Sheet unavailable, using built-in data.", err);
        DATA = FALLBACK_DATA;
      }
      if (cancelled) return;

      if (window.innerWidth < BREAKPOINT) initMobile();
      else initDesktop();
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      root.style.background = prevHtmlBg;
      document.body.style.background = prevBodyBg;
      document.body.style.overscrollBehaviorY = prevOverscroll;
      root.classList.remove("refs-list-mode");
      root.style.scrollPaddingTop = "";
      const rowsWrap = document.getElementById("rows-wrap");
      if (rowsWrap) rowsWrap.innerHTML = "";
      const tableBody = document.getElementById("d-tableBody");
      if (tableBody) tableBody.innerHTML = "";
    };
  }, []);

  return (
    <div className="refs-root">
      {/* MOBILE */}
      <div id="mobile-app">
        <div id="hero">
          <h1>
            A CURATED
            <br />
            REPOSITORY
            <br />
            OF DESIGN&nbsp;&amp;
            <br />
            RESOURCES
          </h1>
          <p className="byline">
            SELECTED REFERENCES BY <span className="red">MATHEUS ROCHA.</span>
          </p>
        </div>

        <div id="sticky-top">
          <div id="preview-wrap">
            <div id="preview-inner">
              <div id="preview-frame" className="loading">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pimg off" id="img-a" src="" alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pimg off" id="img-b" src="" alt="" />
              </div>
              <div id="preview-label" />
            </div>
          </div>
          <div id="table-head">
            <span className="m-col-t">type</span>
            <span className="m-col-n">name</span>
            <span id="search-btn">search</span>
          </div>
        </div>

        <div id="rows-wrap" />
        <div id="spacer" />

        <div id="search-overlay">
          <div id="search-bar">
            <input
              id="search-input"
              type="search"
              placeholder="search references…"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <span id="search-close">close</span>
          </div>
          <div id="search-results" />
        </div>
      </div>

      {/* DESKTOP */}
      <div id="desktop-app">
        <section className="d-hero">
          <h1 className="d-hero-title">
            A CURATED REPOSITORY OF
            <br />
            DESIGN &amp; RESOURCES
          </h1>
          <p className="d-hero-sub">
            SELECTED REFERENCES BY <span className="d-hero-accent">MATHEUS ROCHA.</span>
          </p>
        </section>

        <div className="d-container">
          <header className="d-topbar">
            <button className="d-sort-btn version" data-sort="type">type</button>
            <nav className="d-sort-controls">
              <button className="d-sort-btn" data-sort="name">name</button>
            </nav>
            <button className="d-search-btn" id="d-searchToggle">search</button>
          </header>

          <div className="d-search-bar" id="d-searchBar">
            <input type="text" id="d-searchInput" placeholder="search links…" autoComplete="off" />
          </div>

          <main className="d-table-wrapper">
            <table>
              <tbody id="d-tableBody" />
            </table>
          </main>
        </div>

        <div className="d-preview" id="d-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="d-previewImg" src="" alt="preview" />
        </div>
      </div>
    </div>
  );
}
