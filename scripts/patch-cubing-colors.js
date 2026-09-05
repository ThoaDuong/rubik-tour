const fs = require('fs');
const path = require('path');

console.log('Patching cubing.js to put Yellow on U (top) and White on D (bottom)...');

// 1. Patch 3D axesInfo
const file3D = path.join(__dirname, '../node_modules/cubing/dist/lib/cubing/chunks/twisty-dynamic-3d-LSRGWTXG.js');
if (fs.existsSync(file3D)) {
  let content = fs.readFileSync(file3D, 'utf8');

  // Search for axesInfo with white on U and yellow on D
  const oldAxesPattern = `var axesInfo = [
  new AxisInfo(
    new Vector3(0, 1, 0),
    new Euler(-TAU / 4, 0, 0),
    16777215,
    14540253,
    1.25
  ),
  new AxisInfo(
    new Vector3(-1, 0, 0),
    new Euler(0, -TAU / 4, 0),
    16750848,
    8934656,
    1,
    { hintDimColor: 8930304 }
  ),
  new AxisInfo(
    new Vector3(0, 0, 1),
    new Euler(0, 0, 0),
    65280,
    34816,
    1,
    { hintDimColor: 39168 }
  ),
  new AxisInfo(
    new Vector3(1, 0, 0),
    new Euler(0, TAU / 4, 0),
    16711680,
    6684672,
    1,
    { hintDimColor: 6684672 }
  ),
  new AxisInfo(
    new Vector3(0, 0, -1),
    new Euler(0, TAU / 2, 0),
    2254591,
    1127304,
    0.75,
    { hintDimColor: 6246 }
  ),
  new AxisInfo(
    new Vector3(0, -1, 0),
    new Euler(TAU / 4, 0, 0),
    16776960,
    8947712,
    1.25,
    { hintDimColor: 14540032 }
  )
];`;

  const newAxesPattern = `var axesInfo = [
  new AxisInfo(
    new Vector3(0, 1, 0),
    new Euler(-TAU / 4, 0, 0),
    16776960,
    8947712,
    1.25,
    { hintDimColor: 14540032 }
  ),
  new AxisInfo(
    new Vector3(-1, 0, 0),
    new Euler(0, -TAU / 4, 0),
    16750848,
    8934656,
    1,
    { hintDimColor: 8930304 }
  ),
  new AxisInfo(
    new Vector3(0, 0, 1),
    new Euler(0, 0, 0),
    65280,
    34816,
    1,
    { hintDimColor: 39168 }
  ),
  new AxisInfo(
    new Vector3(1, 0, 0),
    new Euler(0, TAU / 4, 0),
    16711680,
    6684672,
    1,
    { hintDimColor: 6684672 }
  ),
  new AxisInfo(
    new Vector3(0, 0, -1),
    new Euler(0, TAU / 2, 0),
    2254591,
    1127304,
    0.75,
    { hintDimColor: 6246 }
  ),
  new AxisInfo(
    new Vector3(0, -1, 0),
    new Euler(TAU / 4, 0, 0),
    16777215,
    14540253,
    1.25
  )
];`;

  if (content.includes(oldAxesPattern)) {
    content = content.replace(oldAxesPattern, newAxesPattern);
    fs.writeFileSync(file3D, content, 'utf8');
    console.log('✓ Successfully patched twisty-dynamic-3d-LSRGWTXG.js');
  } else if (content.includes(newAxesPattern)) {
    console.log('✓ twisty-dynamic-3d-LSRGWTXG.js is already patched');
  } else {
    console.warn('! Could not find exact axesInfo pattern in file3D');
  }
}

// 2. Patch 2D SVG definitions
const file2D = path.join(__dirname, '../node_modules/cubing/dist/lib/cubing/chunks/puzzles-dynamic-3x3x3-FYXD7SIU.js');
if (fs.existsSync(file2D)) {
  let content = fs.readFileSync(file2D, 'utf8');
  if (content.includes('style="fill: white"') && content.includes('style="fill: yellow"')) {
    content = content
      .replace(/style="fill: white"/g, 'style="fill: __TEMP_WHITE__"')
      .replace(/style="fill: yellow"/g, 'style="fill: white"')
      .replace(/style="fill: __TEMP_WHITE__"/g, 'style="fill: yellow"');
    fs.writeFileSync(file2D, content, 'utf8');
    console.log('✓ Successfully patched puzzles-dynamic-3x3x3-FYXD7SIU.js (2D SVG)');
  } else {
    console.log('✓ puzzles-dynamic-3x3x3-FYXD7SIU.js is already swapped or not matching');
  }
}

// 3. Patch puzzle-geometry colors
const filePG = path.join(__dirname, '../node_modules/cubing/dist/lib/cubing/puzzle-geometry/index.js');
if (fs.existsSync(filePG)) {
  let content = fs.readFileSync(filePG, 'utf8');
  const oldPG = `    6: {
      U: "#ffffff" /* White */,
      F: "#44ee00" /* Green */,
      R: "#ff0000" /* Red */,
      D: "#f4f400" /* Yellow */,
      B: "#2266ff" /* Blue */,
      L: "#ff8000" /* Orange */
    },`;
  const newPG = `    6: {
      U: "#f4f400" /* Yellow */,
      F: "#44ee00" /* Green */,
      R: "#ff0000" /* Red */,
      D: "#ffffff" /* White */,
      B: "#2266ff" /* Blue */,
      L: "#ff8000" /* Orange */
    },`;
  if (content.includes(oldPG)) {
    content = content.replace(oldPG, newPG);
    fs.writeFileSync(filePG, content, 'utf8');
    console.log('✓ Successfully patched puzzle-geometry/index.js');
  } else if (content.includes(newPG)) {
    console.log('✓ puzzle-geometry/index.js is already patched');
  }
}

console.log('Patch complete!');
