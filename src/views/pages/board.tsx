import type { BoardMember } from "../../services/board";

const countryFlags: Record<string, string> = {
  Sweden: "🇸🇪",
  Norway: "🇳🇴",
  Denmark: "🇩🇰",
  Finland: "🇫🇮",
  Iceland: "🇮🇸",
  "Faroe Islands": "🇫🇴",
};

export function BoardPage({ members }: { members: BoardMember[] }) {
  return (
    <section class="page-section">
      <h1>Board Members</h1>
      <div class="board-grid">
        {members.map((member) => (
          <MemberCard member={member} />
        ))}
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: BoardMember }) {
  const flag = countryFlags[member.country] ?? "🏳️";

  return (
    <div class="member-card">
      <span class="flag">{flag}</span>
      <h3>{member.name}</h3>
      <p class="role">{member.role ?? ""}</p>
      <p class="country">{member.country}</p>
      {member.email && (
        <a href={`mailto:${member.email}`} class="email">
          {member.email}
        </a>
      )}
    </div>
  );
}
