(function(){
  var f=document.getElementById('sub');if(!f)return;
  var m=document.getElementById('msg'),b=f.querySelector('button');
  f.addEventListener('submit',function(e){
    e.preventDefault();m.className='msg';
    if(!f.email.value||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)){m.className='msg err';m.textContent='Enter a valid email address.';return;}
    if(!f.neighborhood.value){m.className='msg err';m.textContent='Pick your neighborhood so your block is right.';return;}
    b.disabled=true;b.textContent='Sending…';
    var d={email:f.email.value.trim(),neighborhood:f.neighborhood.value,own_or_rent:f.own_or_rent?f.own_or_rent.value:'',home_address:f.home_address.value.trim(),page:location.pathname,utm_source:new URLSearchParams(location.search).get('utm_source')||'website',utm_medium:new URLSearchParams(location.search).get('utm_medium')||'',utm_campaign:new URLSearchParams(location.search).get('utm_campaign')||'',utm_content:new URLSearchParams(location.search).get('utm_content')||''};
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
