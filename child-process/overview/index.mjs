import cp from 'node:child_process'

// spawn
cp.spawn('node', ['./test.js'],
  { stdio: 'inherit' }
);
// exec
cp.exec('node ./test.js', (err, stdout, stderr) => {
  console.log('exec:', stdout);
});
// execFile
cp.execFile('node', ['./test.js'],(err, stdout, stderr) => {
  console.log('execFile:', stdout);
});
// fork
cp.fork('./test.js',
  { silent: false }
);
