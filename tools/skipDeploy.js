const { execSync } = require('child_process');

(async () => {
    // Check for Dependabot PR
    if (process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN === 'dependabot[bot]') {
        process.exit(0);
    }
    // Check affected projects
    const affectedOutput = execSync('npx nx show projects --affected --json');
    const affectedProjects = JSON.parse(affectedOutput.toString());
    if (!affectedProjects.includes('kanji.sh')) {
        process.exit(0);
    }
    // Else, exit with error
    process.exit(1);
})();
