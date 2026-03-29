

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Java: "#b07219", "C#": "#178600", "C++": "#f34b7d", Go: "#00ADD8",
  Rust: "#dea584", PHP: "#4F5D95", Ruby: "#701516", Swift: "#F05138",
  Kotlin: "#A97BFF", HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
  Vue: "#41b883", Dart: "#00B4AB",
};

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

function RepoCard({ repo, index }) {
  const langColor = LANG_COLORS[repo.language] || "#999";

  return (
    <a
      className="repo-card"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="repo-card-body">
        <div className="repo-name">{repo.name}</div>
        {repo.description && (
          <div className="repo-desc">{repo.description}</div>
        )}
        <div className="repo-meta">
          {repo.language && (
            <div className="repo-meta-item">
              <span className="lang-dot" style={{ background: langColor }} />
              {repo.language}
            </div>
          )}
          <div className="repo-meta-item">★ {fmt(repo.stargazers_count)}</div>
          <div className="repo-meta-item">⑂ {fmt(repo.forks_count)}</div>
        </div>
      </div>
    </a>
  );
}

export default function RepoList({ repos }) {
  return (
    <div className="repos-section">
      <h3>
        Repositories <span>{repos.length}</span>
      </h3>
      <div className="repo-list">
        {repos.map((repo, i) => (
          <RepoCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </div>
  );
}
