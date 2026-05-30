import { execSync } from 'node:child_process';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const electronPkgDir = dirname(require.resolve('electron/package.json'));
const pathFile = join(electronPkgDir, 'path.txt');
const distDir = join(electronPkgDir, 'dist');
const platformPath = 'Electron.app/Contents/MacOS/Electron';

if (existsSync(pathFile) && existsSync(join(distDir, platformPath))) {
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(join(electronPkgDir, 'package.json'), 'utf-8'));
const { version } = pkg;
const platform = process.platform;
const arch = process.arch;

console.log(`[ensure-electron] Installing Electron v${version} for ${platform}-${arch}`);

const binaryPath = join(distDir, platformPath);

if (!existsSync(binaryPath)) {
  const mirror = process.env.ELECTRON_MIRROR || 'https://github.com/electron/electron/releases/download/';
  const zipName = `electron-v${version}-${platform}-${arch}.zip`;
  const zipUrl = `${mirror}v${version}/${zipName}`;

  execSync(`curl -fL --progress-bar "${zipUrl}" -o /tmp/${zipName}`, { stdio: 'inherit' });
  execSync(`unzip -qo "/tmp/${zipName}" -d "${distDir}"`, { stdio: 'inherit' });
}

writeFileSync(pathFile, platformPath);
writeFileSync(join(distDir, 'version'), version);

console.log('[ensure-electron] Done.');
