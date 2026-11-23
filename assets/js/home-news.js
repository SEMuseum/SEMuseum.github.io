/* 首页最新资讯：读取 news-latest.json，渲染 3 张真实卡片，点击跳原文 */
(function(){
  var data=null;
  function esc(s){
    return String(s==null?'':s).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function card(it){
    return '<a class="news-card" href="'+esc(it.u)+'" target="_blank" rel="noopener noreferrer">'
      + '<div class="news-card-top"><span class="news-card-date">'+esc((it.d||'').replace(/-/g,'.'))+'</span>'
      + '<span class="news-card-src">'+esc(it.src||'')+'</span></div>'
      + '<h3 class="news-card-title">'+esc(it.t)+'</h3>'
      + '<p class="news-card-summary">'+esc(it.s||'')+'</p>'
      + '<div class="news-card-foot"><span class="news-card-author">'+esc(t('newsBy'))+' '+esc(it.a||'')+'</span>'
      + '<span class="news-card-read">'+esc(t('newsRead'))+'</span></div></a>';
  }
  function render(){
    var box=document.getElementById('home-news');
    if(box && data) box.innerHTML=(data.items||[]).slice(0,3).map(card).join('');
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.addEventListener('languagechange',render);
    fetch('data/news-latest.json').then(function(r){return r.json();}).then(function(d){
      data=d; render();
    }).catch(function(){});
  });
})();
