// Local-only static preview plus a real iframe viewport for responsive inspection.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const port = Number(process.argv[2] || 8099);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid preview port');
const routes = ['/', '/about', '/events', '/challenges', '/news', '/sponsors', '/register', '/join', '/ambassadors', '/contact', '/privacy', '/participation'];
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ttf':'font/ttf','.json':'application/json'};
const harness=`<!doctype html><html lang="en"><meta charset="utf-8"><title>Local responsive release inspection</title><style>body{background:#eee;color:#111;font:16px system-ui;margin:24px}label{margin-right:16px}select{padding:8px}iframe{display:block;border:1px solid #777;margin-top:20px;background:#07173f;max-width:none}</style><h1>Local responsive release inspection</h1><p>The iframe uses an actual CSS viewport. This checks layout, not a mobile device or touch engine.</p><label>Viewport width <select id="width">${[320,390,768,1024,1440].map(w=>`<option>${w}</option>`).join('')}</select></label><label>Page <select id="route">${routes.map(r=>`<option>${r}</option>`).join('')}</select></label><label>Language <select id="language"><option>en</option><option>si</option><option>ta</option></select></label><iframe id="preview" title="Application preview" width="320" height="800" src="/?lang=en"></iframe><script>const width=document.getElementById('width'),route=document.getElementById('route'),language=document.getElementById('language'),preview=document.getElementById('preview');width.addEventListener('change',()=>{preview.width=width.value});for(const control of [route,language])control.addEventListener('change',()=>{preview.src=route.value+'?lang='+language.value});</script></html>`;
const server=http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end('Invalid path');return;}
  if(pathname==='/__responsive'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}).end(harness);return;}
  let file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(pathname==='/')file=path.join(root,'index.html');
  if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404).end('Not found');return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
});
server.listen(port,'127.0.0.1',()=>console.log(`Release preview: http://127.0.0.1:${port}/__responsive`));
