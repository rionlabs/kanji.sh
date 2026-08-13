import { execSync } from 'child_process';
import console from 'node:console';
import process from 'node:process';

(async () => {
    // Check for Dependabot PR
    if (process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN === 'dependabot[bot]') {
        process.exit(0);
    }
    // Check affected projects
    try {
        execSync('git remote add origin https://github.com/rionlabs/kanji.sh.git');
        execSync('git fetch origin main:refs/remotes/origin/main --depth=1');
    } catch (error) {
        console.error('Error fetching origin/main:', error);
        process.exit(1);
    }
    try {
        const affectedOutput = execSync(
            'npx nx show projects --affected --base=origin/main --head=HEAD --json'
        );
        const affectedProjects = JSON.parse(affectedOutput.toString());
        if (!affectedProjects.includes('kanji.sh')) {
            console.log('No changes detected in kanji.sh, skipping deployment.');
            process.exit(0);
        }
    } catch (error) {
        console.error('Error checking affected projects:', error);
        process.exit(1);
    }

    // Else, exit with error
    process.exit(1);
})();
