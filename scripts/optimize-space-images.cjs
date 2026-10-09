// Re-encode the credited source image for delivery; retain the original artwork.
const path = require('node:path');
const fs = require('node:fs');
const Jimp = require('jimp-compact');
(async () => {
  const root = path.resolve(__dirname, '..');
  const source = path.join(root, 'assets/space/cosmic-cliffs.png');
  const output = path.join(root, 'assets/space/cosmic-cliffs.jpg');
  const photo = await Jimp.read(source);
  if (photo.bitmap.width > 1600) photo.resize(1600, Jimp.AUTO);
  await photo.quality(84).writeAsync(output);
  console.log(JSON.stringify({sourceBytes: fs.statSync(source).size, outputBytes: fs.statSync(output).size}));
})();
