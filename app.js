(function(){
  var f=document.getElementById('sub');if(!f)return;
  var m=document.getElementById('msg'),b=f.querySelector('button');
  f.addEventListener('submit',function(e){
    e.preventDefault();m.className='msg';
    if(!f.email.value||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value)){m.className='msg err';m.textContent='Enter a valid email address.';return;}
    if(!f.neighborhood.value){m.className='msg err';m.textContent='Pick your neighborhood so your block is right.';return;}
    b.disabled=true;b.textContent='Sending…';
    var d={email:f.email.value.trim(),neighborhood:f.neighborhood.value,own_or_rent:f.own_or_rent.value,home_address:f.home_address.value.trim(),page:location.pathname,utm_source:new URLSearchParams(location.search).get('utm_source')||'website',utm_campaign:new URLSearchParams(location.search).get('utm_campaign')||''};
    fetch('https://adreto031212.app.n8n.cloud/webhook/bellevue-dispatch-signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
    .then(function(r){return r.json().catch(function(){return {ok:r.ok}})})
    .then(function(j){ if(j&&j.ok!==false){m.className='msg ok';m.textContent="Check your inbox. Click the confirmation link and Thursday's issue is yours.";f.reset();if(window.fbq){try{fbq('track','Lead',{content_name:'dispatch_signup'});}catch(_){}}} else {throw new Error(j&&j.error||'error')} })
    .catch(function(){m.className='msg err';m.textContent='That did not go through. Try again, or email hello@bellevuedispatch.com.';})
    .finally(function(){b.disabled=false;b.textContent="Send me Thursday's issue";});
  });
})();
