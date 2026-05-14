import type { PropsWithChildren } from "@kitajs/html";

type NavItem = { href: string; label: string; page: string };

const navItems: NavItem[] = [
  { href: "/", label: "News", page: "home" },
  { href: "/npf", label: "About NPF", page: "npf" },
  { href: "/npf/board", label: "Board", page: "board" },
  { href: "/npf/bylaws", label: "Bylaws", page: "bylaws" },
  { href: "/results", label: "Results", page: "results" },
  { href: "/records", label: "Records", page: "records" },
];

export function Layout({
  title,
  activePage = "",
  children,
  heroContent,
}: PropsWithChildren<{ title: string; activePage?: string; heroContent?: string }>) {
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title} | NPF – Nordic Powerlifting Federation</title>
          <script src="https://unpkg.com/htmx.org@2.0.4"></script>
          <link rel="stylesheet" href="/public/css/style.css" />
        </head>
        <body>
          <header class="site-header">
            <div class="header-accent"></div>
            <div class="container">
              <a href="/" class="logo">
                <img src="/public/images/npf-logo.jpg" alt="NPF Logo" width="44" height="44" />
                <div class="logo-text">
                  <strong>NPF</strong>
                  <span>Nordic Powerlifting Federation</span>
                </div>
              </a>
              <nav class="main-nav">
                <ul>
                  {navItems.map((item) => (
                    <li>
                      <a
                        href={item.href}
                        class={activePage === item.page ? "active" : ""}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <button
                class="nav-toggle"
                aria-label="Toggle navigation"
                onclick="document.querySelector('.main-nav').classList.toggle('open')"
              >
                ☰
              </button>
            </div>
          </header>

          {heroContent ? (heroContent as "safe") : ""}

          <main class="container">{children}</main>

          <footer class="site-footer">
            <div class="footer-top">
              <div class="container">
                <div class="footer-grid">
                  <div class="footer-col">
                    <img src="/public/images/npf-logo.jpg" alt="NPF" width="56" height="56" class="footer-logo" />
                    <p class="footer-tagline">Nordic Powerlifting Federation</p>
                    <p class="footer-since">Est. 1975</p>
                  </div>
                  <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                      <li><a href="/results">Competition Results</a></li>
                      <li><a href="/records">Nordic Records</a></li>
                      <li><a href="/npf/bylaws">Bylaws</a></li>
                      <li><a href="/npf/board">Board Members</a></li>
                    </ul>
                  </div>
                  <div class="footer-col">
                    <h4>Contact</h4>
                    <p>President: Sofia Kamlund</p>
                    <p><a href="mailto:sofia.kamlund@styrkelyft.se">sofia.kamlund@styrkelyft.se</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-bottom">
              <div class="container">
                <div class="footer-bottom-inner">
                  <p>&copy; {new Date().getFullYear()} Nordic Powerlifting Federation</p>
                  <p class="footer-credit">Developed by <a href="https://github.com/MariusArhaug" target="_blank">Marius Arhaug</a></p>
                </div>
              </div>
            </div>
          </footer>

          <script>{`
            document.addEventListener('DOMContentLoaded', () => {
              const obs = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
              }, { threshold: 0.1 });
              document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
            });
          `}</script>
        </body>
      </html>
    </>
  );
}
