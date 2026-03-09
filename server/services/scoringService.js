export const computeHealthScore = ({ repoInfo, languages, commits, readme }) => {
  let scores = { documentation: 0, activity: 0, structure: 0, diversity: 0, popularity: 0 };
  const strengths = [], warnings = [];

  // Documentation (25%)
  if (readme) {
    const content = Buffer.from(readme.content, 'base64').toString('utf-8').toLowerCase();
    let docScore = 2;
    if (content.length > 500)  docScore += 1;
    if (content.length > 2000) docScore += 1;
    if (content.includes('installation') || content.includes('install')) docScore += 2;
    if (content.includes('usage') || content.includes('how to use')) docScore += 2;
    if (content.includes('license')) docScore += 1;
    if (content.includes('contributing')) docScore += 1;
    scores.documentation = Math.min(docScore, 10);
    if (docScore >= 7) strengths.push('Well-written README with key sections');
    else if (docScore >= 4) strengths.push('README file present');
    if (!content.includes('installation')) warnings.push('README missing installation instructions');
    if (!content.includes('license')) warnings.push('No license information found');
    if (!content.includes('usage')) warnings.push('README missing usage instructions');
  } else {
    scores.documentation = 0;
    warnings.push('No README file found');
  }

  // Commit Activity (25%)
  if (commits.length > 0) {
    const lastCommit = new Date(commits[0].commit.author.date);
    const daysSince = (Date.now() - lastCommit) / (1000 * 60 * 60 * 24);
    if (daysSince <= 30)       { scores.activity = 10; strengths.push('Actively maintained — commits within last 30 days'); }
    else if (daysSince <= 90)  { scores.activity = 7;  strengths.push('Moderately active — commits within last 90 days'); }
    else if (daysSince <= 180) { scores.activity = 4;  warnings.push('No commits in the last 3 months'); }
    else                       { scores.activity = 1;  warnings.push('Repository appears inactive (no commits in 6+ months)'); }
    if (commits.length >= 50)  strengths.push(`Rich commit history — ${commits.length}+ commits`);
    else if (commits.length < 5) warnings.push('Very few commits — project may be early stage');
  } else {
    scores.activity = 0;
    warnings.push('No commit history found');
  }

  // Code Structure (20%)
  const size = repoInfo?.size || 0;
  if (size === 0)               { scores.structure = 1; warnings.push('Repository appears empty'); }
  else if (size < 100)          { scores.structure = 3; warnings.push('Repository is very small — may be incomplete'); }
  else if (size <= 50000)       { scores.structure = 8; strengths.push('Well-sized, manageable repository'); }
  else if (size <= 500000)      { scores.structure = 6; }
  else                          { scores.structure = 4; warnings.push('Very large repository size may affect performance'); }

  if (repoInfo?.open_issues_count > 50) warnings.push('High number of open issues');
  if (repoInfo?.topics?.length > 0)     strengths.push('Repository has descriptive topics/tags');

  // Language Diversity (15%)
  const langCount = Object.keys(languages).length;
  if (langCount >= 4)       { scores.diversity = 10; strengths.push('Diverse technology stack'); }
  else if (langCount === 3) { scores.diversity = 8; }
  else if (langCount === 2) { scores.diversity = 6; }
  else if (langCount === 1) { scores.diversity = 4; }
  else                      { scores.diversity = 0; warnings.push('No language data available'); }

  // Popularity (15%)
  const stars = repoInfo?.stargazers_count || 0;
  const forks = repoInfo?.forks_count || 0;
  if (stars >= 100)      { scores.popularity = 10; strengths.push(`${stars} stars — strong community interest`); }
  else if (stars >= 10)  { scores.popularity = 7;  strengths.push(`${stars} stars — growing community interest`); }
  else if (stars >= 1)   { scores.popularity = 4; }
  else                   { scores.popularity = 1; }
  if (forks >= 10)       strengths.push(`${forks} forks — others are building on this`);

  // Final weighted score
  const weights = { documentation: 0.25, activity: 0.25, structure: 0.20, diversity: 0.15, popularity: 0.15 };
  const total = Object.keys(weights).reduce((sum, key) => sum + scores[key] * weights[key], 0);

  return {
    score: parseFloat(total.toFixed(1)),
    breakdown: scores,
    strengths,
    warnings,
  };
};