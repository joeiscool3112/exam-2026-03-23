function UserGithub({ user }) {
  const fallback =
    'https://png.pngtree.com/png-vector/20221125/ourlarge/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg';

  if (!user) return null;

  return (
    <section className="user-card">
      <img
        src={user.avatar_url !== 'N/A' ? user.avatar_url : fallback}
        alt={user.login}
      />

      <div className="user-info">
        <div className="user-header">
          <h2>{user.name || user.login}</h2>
          <span className="user-handle">@{user.login}</span>
        </div>

        <p className="user-bio">{user.bio || 'No bio available.'}</p>

        <div className="user-stats">
          <span><b>{user.public_repos}</b> Repos</span>
          <span><b>{user.followers}</b> Followers</span>
          <span><b>{user.following}</b> Following</span>
        </div>
      </div>
    </section>
  );
}

export default UserGithub;