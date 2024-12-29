export async function getGithubRepos(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 }
    });
    return res.json();
  }