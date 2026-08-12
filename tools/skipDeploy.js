import { execSync } from 'child_process';
import process from 'node:process';

(async () => {
    // Check for Dependabot PR
    if (process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN === 'dependabot[bot]') {
        process.exit(0);
    }
    // Check affected projects
    execSync('git fetch origin main:refs/remotes/origin/main --depth=1');
    const affectedOutput = execSync(
        'npx nx show projects --affected --base=origin/main --head=HEAD --json'
    );
    const affectedProjects = JSON.parse(affectedOutput.toString());
    if (!affectedProjects.includes('kanji.sh')) {
        process.exit(0);
    }
    // Else, exit with error
    process.exit(1);
})();
