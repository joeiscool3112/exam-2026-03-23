

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

function StatItem({ value, label }) {
  return (
    <div className="stat-item">
      <div className="val">{fmt(value)}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export default function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt={user.login} />
      <div className="profile-info">
        <h2>{user.name || user.login}</h2>
        <div className="login">@{user.login}</div>
        {user.bio && <div className="bio">{user.bio}</div>}
        <div className="profile-stats">
          <StatItem value={user.public_repos} label="Repos" />
          <StatItem value={user.followers}    label="Followers" />
          <StatItem value={user.following}    label="Following" />
        </div>
      </div>
    </div>
  );
}
