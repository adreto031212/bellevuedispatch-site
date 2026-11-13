(function(){
  var f=document.getElementById('sub');if(!f)return;
  var m=document.getElementById('msg'),b=f.querySelector('button'),t0=Date.now();
  // A mistyped address ("gmail.con") is a lost reader: offer the fix as a one-tap hint, never a blocked form (2026-11-12).
  var known=['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','aol.com','comcast.net','msn.com','live.com','me.com','att.net','mail.com','ymail.com','gmx.com','proton.me','protonmail.com','hotmail.co.uk','yahoo.co.uk'];
  function dist(a,c){var d=[],i,j;for(i=0;i<=a.length;i++){d[i]=[i];}for(j=0;j<=c.length;j++){d[0][j]=j;}for(i=1;i<=a.length;i++){for(j=1;j<=c.length;j++){d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===c[j-1]?0:1));}}return d[a.length][c.length];}
  function suggest(v){var p=v.trim().toLowerCase().split('@');if(p.length!==2||!p[1]||known.indexOf(p[1])>=0)return '';var best='',bd=9;known.forEach(function(k){var x=dist(p[1],k);if(x<bd){bd=x;best=k;}});return (bd>0&&bd<=(p[1].length<6?1:2))?p[0]+'@'+best:'';}
  f.email.addEventListener('blur',function(){var s=suggest(f.email.value);if(!s)return;m.className='msg';m.textContent='';var a=document.createElement('a');a.href='#';a.textContent='Did you mean '+s+'?';a.addEventListener('click',function(ev){ev.preventDefault();f.email.value=s;m.textContent='';});m.appendChild(a);});
  f.addEventListener('submit',function(e){
    e.preventDefault();m.className='msg';
    if(!f.email.value||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)){m.className='msg err';m.textContent='Enter a valid email address.';return;}
    if(!f.neighborhood.value){m.className='msg err';m.textContent='Pick your neighborhood so your block is right.';return;}
    b.disabled=true;b.textContent='Sending…';
    var d={email:f.email.value.trim(),neighborhood:f.neighborhood.value,own_or_rent:f.own_or_rent?f.own_or_rent.value:'',home_address:f.home_address.value.trim(),page:location.pathname,utm_source:new URLSearchParams(location.search).get('utm_source')||'website',utm_medium:new URLSearchParams(location.search).get('utm_medium')||'',utm_campaign:new URLSearchParams(location.search).get('utm_campaign')||'',utm_content:new URLSearchParams(location.search).get('utm_content')||'',x_hp:f.x_hp?f.x_hp.value:'',elapsed_ms:Date.now()-t0};
    fetch('https://adreto031212.app.n8n.cloud/webhook/bellevue-dispatch-signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
    .then(function(r){return r.json().catch(function(){return {ok:r.ok}})})
    .then(function(j){ if(j&&j.ok!==false){m.className='msg ok';m.textContent="You're in. Thursday's issue lands at 6:00 AM. Add hello@bellevuedispatch.com to your contacts so it reaches your inbox, not the promotions tab.";f.reset();if(window.fbq){try{fbq('track','Lead',{content_name:'dispatch_signup'});}catch(_){}}} else {throw new Error(j&&j.error||'error')} })
    .catch(function(){m.className='msg err';m.textContent='That did not go through. Try again, or email hello@bellevuedispatch.com.';})
    .finally(function(){b.disabled=false;b.textContent="Send me Thursday's issue";});
  });
})();
(function(){
  var f=document.getElementById('adv');if(!f)return;
  var m=document.getElementById('adv_msg'),b=f.querySelector('button');
  f.addEventListener('submit',function(e){
    e.preventDefault();m.className='msg';
    if(!f.business.value.trim()){m.className='msg err';m.textContent='Add the name of your business.';return;}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)){m.className='msg err';m.textContent='Enter a valid email address.';return;}
    b.disabled=true;b.textContent='Sending…';
    var d={};['city','company_site','business','contact_name','email','website','category','slot','start_date','message'].forEach(function(k){d[k]=(f[k]&&f[k].value||'').trim();});d.page=location.pathname;
    fetch('https://adreto031212.app.n8n.cloud/webhook/dispatch-sponsor-request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
    .then(function(r){return r.json().catch(function(){return {ok:r.ok}})})
    .then(function(j){ if(j&&j.ok!==false){m.className='msg ok';m.textContent="Your request is in. Victoria Muller answers by email within minutes, from hello@bellevuedispatch.com.";f.reset();} else {throw new Error(j&&j.error||'error')} })
    .catch(function(){m.className='msg err';m.textContent='That did not go through. Try again, or email hello@bellevuedispatch.com.';})
    .finally(function(){b.disabled=false;b.textContent='Request a Thursday';});
  });
})();
