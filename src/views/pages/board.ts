import type { BoardMember } from "../../services/board";

export function boardPage(members: BoardMember[]): string {
  return `
    <section class="page-section">
      <h1>Board Members</h1>
      <div class="board-grid">
        ${members.map(memberCard).join("")}
      </div>
    </section>
  `;
}

function memberCard(member: BoardMember): string {
  const flag = countryFlag(member.country);
  return `
    <div class="member-card">
      <span class="flag">${flag}</span>
      <h3>${member.name}</h3>
      <p class="role">${member.role ?? ""}</p>
      <p class="country">${member.country}</p>
      ${member.email ? `<a href="mailto:${member.email}" class="email">${member.email}</a>` : ""}
    </div>
  `;
}

function countryFlag(country: string): string {
  const flags: Record<string, string> = {
    Sweden: "🇸🇪",
    Norway: "🇳🇴",
    Denmark: "🇩🇰",
    Finland: "🇫🇮",
    Iceland: "🇮🇸",
    "Faroe Islands": "🇫🇴",
  };
  return flags[country] ?? "🏳️";
}
