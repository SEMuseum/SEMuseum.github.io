/* ============================================
   社企博物官网 · 资讯文章库（卡片 + 跳原文）
   数据: data/news.json  |  界面与数据解耦：更新 JSON 即自动生效
   ============================================ */
(function(){
  const PAGE_SIZE = 50;
  let ALL = [], META = {}, filtered = [], visible = PAGE_SIZE;
  let keyword = '', year = 'all', sort = 'new', loaded = false;

  const $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s==null?'':s).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function fmt(n){ return Number(n||0).toLocaleString('en-US'); }

  function apply(){
    filtered = ALL.filter(function(it){
      if(year!=='all' && it.y!==year) return false;
      if(keyword){
        var hay=(it.t+' '+it.s+' '+it.a).toLowerCase();
        if(hay.indexOf(keyword.toLowerCase())===-1) return false;
      }
      return true;
    });
    filtered.sort(function(a,b){
      return sort==='new' ? (a.d<b.d?1:a.d>b.d?-1:0) : (a.d>b.d?1:a.d<b.d?-1:0);
    });
    visible = PAGE_SIZE;
    render();
  }

  function card(it){
    var date = it.d ? it.d.replace(/-/g,'.') : '';
    var author = it.a ? '<span class="news-card-author">'+esc(t('newsBy'))+' '+esc(it.a)+'</span>' : '';
    return '<a class="news-card" href="'+esc(it.u)+'" target="_blank" rel="noopener noreferrer">'
      + '<div class="news-card-top"><span class="news-card-date">'+esc(date)+'</span>'
      + '<span class="news-card-src">'+esc(it.src||t('newsSource'))+'</span></div>'
      + '<h3 class="news-card-title">'+esc(it.t)+'</h3>'
      + '<p class="news-card-summary">'+esc(it.s||'')+'</p>'
      + '<div class="news-card-foot">'+author+'<span class="news-card-read">'+esc(t('newsRead'))+'</span></div>'
      + '</a>';
  }

  function renderYears(){
    var sel=$('news-year');
    if(!sel) return;
    var html='<option value="all">'+esc(t('newsAllYears'))+'</option>';
    (META.years||[]).forEach(function(y){
      html+='<option value="'+esc(y)+'">'+esc(y+t('newsYear'))+'</option>';
    });
    sel.innerHTML=html;
    sel.value=year;
  }

  function render(){
    var grid=$('news-grid'); if(!grid) return;
    var slice=filtered.slice(0,visible);
    grid.innerHTML=slice.map(card).join('');
    $('news-count').textContent = t('newsTotal')+' '+fmt(filtered.length)+' '+t('newsArticles');
    $('news-tip').textContent = t('newsBrowserTip');
    $('news-empty').hidden = filtered.length!==0;
    var more=$('news-more');
    more.hidden = visible>=filtered.length;
    more.textContent = t('newsLoad')+' ('+fmt(Math.max(0,filtered.length-visible))+')';
    var meta=$('news-meta');
    if(meta) meta.textContent = META.total ? fmt(META.total)+' '+t('newsMeta')+' '+(META.updated||'') : '';
    var intro=$('news-intro');
    if(intro) intro.textContent = t('newsIntro');
  }

  function init(){
    $('news-count').textContent = t('loading');
    renderYears();

    $('news-search-btn').addEventListener('click',function(){ keyword=$('news-search-input').value.trim(); apply(); });
    $('news-search-input').addEventListener('keydown',function(e){ if(e.key==='Enter'){ keyword=this.value.trim(); apply(); } });
    $('news-year').addEventListener('change',function(){ year=this.value; apply(); });
    $('news-sort').addEventListener('change',function(){ sort=this.value; apply(); });
    $('news-more').addEventListener('click',function(){ visible+=PAGE_SIZE; render(); });

    document.addEventListener('languagechange',function(){
      renderYears();
      document.querySelectorAll('#news-sort option').forEach(function(o){
        o.textContent=t(o.getAttribute('data-i18n'));
      });
      if(loaded) render();
    });

    fetch('data/news.json')
      .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(function(d){
        META=d.meta||{};
        ALL=d.items||[];
        loaded=true;
        renderYears();
        apply();
      })
      .catch(function(e){
        $('news-count').textContent='数据加载失败：'+e.message;
      });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
