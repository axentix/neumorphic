const path = require('path');
const fs = require('fs');
const glob = require('fast-glob');

const tmpl =
  '<a class="text-airforce text-dark-2 font-w600 font-s4 py-2 capitalize" target="_blank" href="/examples/{{LINK}}">{{NAME}}</a>';

glob('examples/**/*.html').then(async (files) => {
  const links = [];
  files.map((file) => {
    file = file.split('/')[1];
    let tp = tmpl.replace('{{LINK}}', file);
    tp = tp.replace('{{NAME}}', file.split('.')[0]);

    links.push(tp);
  });

  fs.readFile(path.resolve(__dirname, './index.tmpl'), 'utf-8', (err, data) => {
    if (err) throw err;

    const content = data.replace('{{LINKS}}', links.join('\n'));
    err = fs.writeFileSync(path.resolve(__dirname, '../index.html'), content, 'utf-8');
    if (err) throw err;
  });
});
