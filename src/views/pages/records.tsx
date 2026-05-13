import type { RecordCategory } from "../../services/competitions";

type Grouped = Record<string, Record<string, Record<string, RecordCategory[]>>>;

function groupRecords(records: RecordCategory[]): Grouped {
  const grouped: Grouped = {};
  for (const r of records) {
    grouped[r.discipline] ??= {};
    grouped[r.discipline][r.gender] ??= {};
    grouped[r.discipline][r.gender][r.equipment] ??= [];
    grouped[r.discipline][r.gender][r.equipment].push(r);
  }
  return grouped;
}

export function RecordsPage({ records }: { records: RecordCategory[] }) {
  const grouped = groupRecords(records);

  return (
    <section class="page-section">
      <h1>Nordic Records &amp; Standards</h1>
      <p class="subtitle">
        Records are registered according to §10 of the NPF Bylaws
      </p>

      <div class="records-tabs">
        {Object.entries(grouped).map(([discipline, genders], i) => (
          <details open={i === 0}>
            <summary>
              <h2>{discipline}</h2>
            </summary>
            {Object.entries(genders).map(([gender, equipments]) => (
              <>
                <h3>{gender}</h3>
                {Object.entries(equipments).map(([equipment, cats]) => (
                  <>
                    <h4>{equipment}</h4>
                    <div class="records-grid">
                      {cats.map((r) => (
                        <div class="record-item">
                          <span>{r.label}</span>
                          {r.pdf_url ? (
                            <a
                              href={r.pdf_url}
                              target="_blank"
                              class="btn-sm"
                            >
                              View PDF
                            </a>
                          ) : (
                            <span class="text-muted">—</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ))}
              </>
            ))}
          </details>
        ))}
      </div>

      <div class="content-block" style="margin-top: 2rem;">
        <h3>Record Rules</h3>
        <ul>
          <li>
            Nordic records are listed in squat, bench press, single bench press,
            deadlift and total.
          </li>
          <li>
            Nordic records demand ruling of international category II referees.
          </li>
          <li>
            Records can be broken at national championships with appropriate jury
            present.
          </li>
          <li>
            Record claims must be submitted within one (1) week of being broken.
          </li>
          <li>Nordic records do not require doping control.</li>
        </ul>
        <p>
          <strong>Record registrar:</strong> Timo Heiskanen –{" "}
          <a href="mailto:heiskantimo@gmail.com">heiskantimo@gmail.com</a>
        </p>
      </div>
    </section>
  );
}
