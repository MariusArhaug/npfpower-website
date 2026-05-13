export function layout(title: string, content: string, activePage = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | NPF – Nordic Powerlifting Federation</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
  <link rel="stylesheet" href="/public/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="/" class="logo">
        <strong>NPF</strong>
        <span>Nordic Powerlifting Federation</span>
      </a>
      <nav class="main-nav">
        <ul>
          <li><a href="/" class="${activePage === "home" ? "active" : ""}">News</a></li>
          <li><a href="/npf" class="${activePage === "npf" ? "active" : ""}">About NPF</a></li>
          <li><a href="/npf/board" class="${activePage === "board" ? "active" : ""}">Board</a></li>
          <li><a href="/npf/bylaws" class="${activePage === "bylaws" ? "active" : ""}">Bylaws</a></li>
          <li><a href="/results" class="${activePage === "results" ? "active" : ""}">Results</a></li>
          <li><a href="/records" class="${activePage === "records" ? "active" : ""}">Records</a></li>
        </ul>
      </nav>
      <button class="nav-toggle" aria-label="Toggle navigation" onclick="document.querySelector('.main-nav').classList.toggle('open')">☰</button>
    </div>
  </header>

  <main class="container">
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} Nordic Powerlifting Federation. Founded 1975.</p>
    </div>
  </footer>
</body>
</html>`;
}
