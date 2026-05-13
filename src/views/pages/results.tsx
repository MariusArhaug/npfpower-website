import type { Competition } from "../../services/competitions";

export function ResultsPage({ competitions }: { competitions: Competition[] }) {
  return (
    <section class="page-section">
      <h1>Competition Results</h1>
      <p class="subtitle">Nordic Championship results archive</p>

      <div class="results-filter">
        <input
          type="search"
          name="q"
          placeholder="Filter by year or location..."
          hx-get="/results/search"
          hx-trigger="input changed delay:300ms"
          hx-target="#results-list"
          hx-swap="innerHTML"
        />
      </div>

      <div id="results-list">
        <CompetitionsList competitions={competitions} />
      </div>
    </section>
  );
}

export function CompetitionsList({
  competitions,
}: {
  competitions: Competition[];
}) {
  if (competitions.length === 0) {
    return <p class="empty">No results found.</p>;
  }

  return (
    <>
      {competitions.map((c) => (
        <div class="competition-card">
          <span class="year">{c.year}</span>
          <div>
            <h3>{c.name}</h3>
            <p class="location">
              {c.location ?? ""}
              {c.country ? `, ${c.country}` : ""}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
