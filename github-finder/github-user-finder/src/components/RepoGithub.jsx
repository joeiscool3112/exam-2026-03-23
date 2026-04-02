function RepoGithub({ repos }) {
  if (!repos || repos.length === 0) return null;

  const display = repos.slice(0, 5);

  return (
    <section className="repos-section">
      <h2>Repositories</h2>

      <ul className="repo-list">
        {display.map((repo) => (
          <li key={repo.id} className="repo-item">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              <div className="repo-top">
                <span className="repo-name">{repo.name}</span>
                <span className="repo-arrow">↗</span>
              </div>

              {repo.description && (
                <p className="repo-description">{repo.description}</p>
              )}

              <div className="repo-meta">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>{repo.language}</span>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RepoGithub;