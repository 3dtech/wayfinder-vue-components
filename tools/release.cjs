const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const releaseType = process.argv[2];

if (releaseType !== 'minor' && releaseType !== 'patch') {
  console.error('Usage: node tools/release.js <minor|patch>');
  process.exit(1);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function runNpm(args) {
  if (process.env.npm_execpath) {
    run(process.execPath, [process.env.npm_execpath].concat(args));
    return;
  }

  run(process.platform === 'win32' ? 'npm.cmd' : 'npm', args);
}

const packagePath = path.join(projectRoot, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const versionMatch = /^(\d+)\.(\d+)\.(\d+)$/.exec(packageData.version);

if (!versionMatch) {
  console.error(`Unsupported package version: ${packageData.version}`);
  process.exit(1);
}

const major = Number(versionMatch[1]);
const minor = Number(versionMatch[2]);
const patch = Number(versionMatch[3]);
const nextVersion = releaseType === 'minor'
  ? `${major}.${minor + 1}.0`
  : `${major}.${minor}.${patch + 1}`;
const tag = `v${nextVersion}`;

const existingTag = spawnSync('git', ['rev-parse', '--verify', '--quiet', `refs/tags/${tag}`], {
  cwd: projectRoot,
  stdio: 'ignore',
});

if (existingTag.status === 0) {
  console.error(`Git tag ${tag} already exists.`);
  process.exit(1);
}

runNpm(['run', 'build']);
runNpm(['version', nextVersion, '--no-git-tag-version']);
run('git', ['add', '-A']);
run('git', ['commit', '-m', nextVersion]);
run('git', ['tag', tag]);

console.log(`Created release ${nextVersion} with tag ${tag}.`);
