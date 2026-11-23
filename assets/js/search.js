/* ============================================
   社企博物官网 · 数据检索与交叉导航
   数据文件：data/meta.json + {key}-search.json + {key}-detail.json + idmap.json
   设计原则：界面与数据解耦，字段以数据驱动，后期清洗只需替换 JSON
   ============================================ */

(function(){
  'use strict';

  /* ---------- 常量与工具 ---------- */
  var DB_ICON={
    documents:'📚',events:'📅',activities:'🎤',organizations:'🏛️',people:'👥',
    vocabularies:'📖',opinions:'💬',pictures:'🖼️',objects:'🧭',products:'📦'
  };
  // 常见字段的中英对照（英文界面下仅翻译字段名，字段值保留原始数据）
  var FIELD_EN={
    '所在国家':'Country','所属国家':'Country','活动所在国家':'Country',
    '所属省份':'Province','所在省':'Province','所属省份':'Province',
    '所属城市':'City','所在市':'City','活动所在市':'City','活动所在省':'Province',
    '领域':'Field','所属行业':'Industry','行业':'Industry','类型':'Type',
    '活动类型':'Activity Type','活动形式':'Format','活动标签':'Tags',
    '认定类型':'Certification','经营状态':'Status','级别':'Level',
    'SDGs':'SDGs','成立年份':'Founded','年份':'Year','月份':'Month',
    '身份':'Role','所在机构':'Organization','所属企业':'Company',
    '产品类别':'Category','使用场景':'Use Case','资料类型':'Media Type',
    'Year-年':'Year','Type-类型':'Type','内容类型':'Content Type',
    '地域':'Region','Author-作者':'Author','Source-刊名':'Source',
    'Source-出版者':'Publisher','Editor-主编':'Editor','PageCount-页码':'Pages',
    'Period-期':'Issue','关键词':'Keywords','发表时间':'Published'
  };
  var YEAR_KEYS=['Year-年','年份','成立年份','发表时间','年度','年份-年'];

  var state={
    db:'all', q:'', filters:{}, sort:'relevance', page:1, pageSize:18,
    meta:[], dbMap:{}, cache:{}, detailCache:{}, idmap:null,
    allData:[], results:[], filterFields:[]
  };

  function esc(s){
    if(s===null||s===undefined) return '';
    return String(s).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function arr(v){
    if(v===null||v===undefined) return [];
    return Array.isArray(v)?v:[v];
  }
  function flatten(v){
    var seen={};
    return arr(v).map(function(x){return String(x).trim();}).filter(function(x){
      if(!x||seen[x]) return false;
      seen[x]=1; return true;
    });
  }
  function fLabel(name){
    if(typeof t==='function' && currentLang==='en') return FIELD_EN[name]||name;
    return name;
  }
  function dbName(key){
    var m=state.dbMap[key];
    if(!m) return key;
    return (typeof t==='function' && currentLang==='en')?m.name_en:m.name;
  }
  function icon(key){return DB_ICON[key]||'◈';}

  function getYear(rec){
    var f=rec.f||{};
    for(var i=0;i<YEAR_KEYS.length;i++){
      var v=arr(f[YEAR_KEYS[i]])[0];
      if(v){var m=String(v).match(/(19|20)\d{2}/);if(m) return parseInt(m[0],10);}
    }
    return 0;
  }

  /* ---------- 数据加载 ---------- */
  function loadJson(path){
    return fetch(path).then(function(r){
      if(!r.ok) throw new Error(path+' HTTP '+r.status);
      return r.json();
    });
  }
  function loadDb(key){
    if(state.cache[key]) return Promise.resolve(state.cache[key]);
    return loadJson('data/'+key+'-search.json').then(function(list){
      var out=(list||[]).map(function(it){it._db=key;return it;});
      state.cache[key]=out;
      return out;
    });
  }
  function loadDetailFile(key){
    if(state.detailCache[key]) return Promise.resolve(state.detailCache[key]);
    return loadJson('data/'+key+'-detail.json').then(function(obj){
      state.detailCache[key]=obj||{};
      return state.detailCache[key];
    });
  }
  function loadIdmap(){
    if(state.idmap) return Promise.resolve(state.idmap);
    return loadJson('data/idmap.json').then(function(obj){state.idmap=obj||{};return state.idmap;});
  }

  /* ---------- 初始化 ---------- */
  function init(){
    var input=document.getElementById('search-input');
    var btn=document.getElementById('search-btn');
    if(!input) return; // 仅在检索页运行

    input.addEventListener('keydown',function(e){if(e.key==='Enter') doSearch();});
    btn.addEventListener('click',doSearch);
    document.getElementById('filter-toggle').addEventListener('click',function(){
      document.getElementById('filter-panel').classList.toggle('show');
    });
    document.getElementById('sort-select').addEventListener('change',function(e){
      state.sort=e.target.value; state.page=1; renderResults();
    });
    document.getElementById('load-more-btn').addEventListener('click',function(){
      state.page++; renderResults(true);
    });
    document.getElementById('detail-overlay').addEventListener('click',function(e){
      if(e.target===this) closeDetail();
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape') closeDetail();});
    if(typeof document.addEventListener==='function'){
      document.addEventListener('languagechange',function(){
        renderDbTabs(); buildFilterPanel(); renderResults();
      });
    }

    loadJson('data/meta.json').then(function(meta){
      state.meta=meta||[];
      state.meta.forEach(function(m){state.dbMap[m.key]=m;});
      renderDbTabs();
      loadData();
    }).catch(function(err){
      setStatus('数据加载失败：'+err.message);
    });
  }

  function setStatus(msg){
    var el=document.getElementById('data-status');
    if(!el) return;
    if(msg){el.style.display='block';el.innerHTML='<div class="spinner"></div><span>'+esc(msg)+'</span>';}
    else el.style.display='none';
  }

  /* ---------- 数据库标签 ---------- */
  function renderDbTabs(){
    var wrap=document.getElementById('db-tabs');
    if(!wrap) return;
    function label(db){
      return db==='all'
        ? (currentLang==='en'?'All':t('allDb'))
        : dbName(db);
    }
    var total=state.meta.reduce(function(a,m){return a+(m.count||0);},0);
    var html='<button class="db-tab'+(state.db==='all'?' active':'')+'" onclick="window.__semSelectDb(\'all\')">'+
      label('all')+' <span class="cnt">'+total.toLocaleString()+'</span></button>';
    state.meta.forEach(function(m){
      html+='<button class="db-tab'+(state.db===m.key?' active':'')+'" onclick="window.__semSelectDb(\''+m.key+'\')">'+
        label(m.key)+' <span class="cnt">'+(m.count||0).toLocaleString()+'</span></button>';
    });
    wrap.innerHTML=html;
  }

  window.__semSelectDb=function(key){
    state.db=key; state.filters={}; state.q=''; state.page=1;
    var input=document.getElementById('search-input'); if(input) input.value='';
    renderDbTabs(); loadData();
  };

  /* ---------- 加载并合并数据 ---------- */
  function loadData(){
    setStatus(typeof t==='function'?t('loading'):'正在加载数据…');
    document.getElementById('results').innerHTML='';
    document.getElementById('load-more').style.display='none';

    var keys=state.db==='all'?state.meta.map(function(m){return m.key;}):[state.db];
    Promise.all(keys.map(loadDb)).then(function(groups){
      var merged=[];
      groups.forEach(function(g){merged=merged.concat(g);});
      state.allData=merged;
      determineFilterFields();
      buildFilterPanel();
      setStatus('');
      runSearch();
    }).catch(function(err){setStatus('数据加载失败：'+err.message);});
  }

  /* ---------- 筛选字段自动识别 ---------- */
  function determineFilterFields(){
    var counts={};
    state.allData.forEach(function(rec){
      var f=rec.f||{};
      Object.keys(f).forEach(function(k){
        var vals=flatten(f[k]); if(vals.length) counts[k]=(counts[k]||0)+1;
      });
    });
    var ranked=Object.keys(counts).sort(function(a,b){return counts[b]-counts[a];});
    var configured=state.db==='all'?[]:(state.dbMap[state.db]||{}).filters||[];
    var fields=[];
    configured.forEach(function(k){if(ranked.indexOf(k)>=0 && fields.indexOf(k)<0) fields.push(k);});
    ranked.forEach(function(k){if(fields.length<8 && fields.indexOf(k)<0) fields.push(k);});
    state.filterFields=fields;
  }

  /* ---------- 筛选面板 ---------- */
  function buildFilterPanel(){
    var panel=document.getElementById('filter-panel');
    if(!panel) return;
    if(!state.filterFields.length){panel.innerHTML='';return;}
    var html='';
    state.filterFields.forEach(function(field){
      var values={};
      state.allData.forEach(function(rec){
        flatten((rec.f||{})[field]).forEach(function(v){values[v]=(values[v]||0)+1;});
      });
      var opts=Object.keys(values).sort(function(a,b){return values[b]-values[a];}).slice(0,14);
      if(!opts.length) return;
      html+='<div class="filter-row"><div class="filter-label">'+esc(fLabel(field))+'</div><div class="filter-options">';
      opts.forEach(function(v){
        var active=!!(state.filters[field]&&state.filters[field].indexOf(v)>=0);
        html+='<span class="filter-opt'+(active?' active':'')+'" data-field="'+esc(field)+'" data-value="'+esc(v)+'">'+esc(v)+'</span>';
      });
      html+='</div></div>';
    });
    html+='<div style="text-align:right;margin-top:12px"><button class="filter-clear" id="filter-clear">'+esc(typeof t==='function'?t('clearAll'):'清除筛选')+'</button></div>';
    panel.innerHTML=html;

    panel.querySelectorAll('.filter-opt').forEach(function(el){
      el.addEventListener('click',function(){
        var field=el.getAttribute('data-field'), value=el.getAttribute('data-value');
        if(!state.filters[field]) state.filters[field]=[];
        var idx=state.filters[field].indexOf(value);
        if(idx>=0) state.filters[field].splice(idx,1); else state.filters[field].push(value);
        if(!state.filters[field].length) delete state.filters[field];
        state.page=1;
        buildFilterPanel(); renderActiveFilters(); runSearch();
      });
    });
    var clear=document.getElementById('filter-clear');
    if(clear) clear.addEventListener('click',function(){
      state.filters={}; state.page=1;
      buildFilterPanel(); renderActiveFilters(); runSearch();
    });
    renderActiveFilters();
  }

  function renderActiveFilters(){
    var wrap=document.getElementById('active-filters');
    if(!wrap) return;
    var html='';
    Object.keys(state.filters).forEach(function(field){
      state.filters[field].forEach(function(v){
        html+='<span class="active-filter">'+esc(fLabel(field))+'：'+esc(v)+' <span data-field="'+esc(field)+'" data-value="'+esc(v)+'">×</span></span>';
      });
    });
    wrap.innerHTML=html;
    wrap.querySelectorAll('span[data-field]').forEach(function(el){
      el.addEventListener('click',function(){
        var field=el.getAttribute('data-field'), value=el.getAttribute('data-value');
        var idx=state.filters[field].indexOf(value);
        if(idx>=0) state.filters[field].splice(idx,1);
        if(!state.filters[field].length) delete state.filters[field];
        state.page=1;
        buildFilterPanel(); renderActiveFilters(); runSearch();
      });
    });
  }

  /* ---------- 搜索与筛选 ---------- */
  function doSearch(){
    var input=document.getElementById('search-input');
    state.q=(input?input.value:'').trim();
    state.page=1;
    runSearch();
  }

  function runSearch(){
    var terms=state.q?state.q.toLowerCase().split(/\s+/).filter(Boolean):[];
    var out=[];
    state.allData.forEach(function(rec){
      // 关键词匹配
      if(terms.length){
        var title=String(rec.t||'').toLowerCase();
        var sum=String(rec.s||'').toLowerCase();
        var fv=Object.keys(rec.f||{}).map(function(k){return flatten(rec.f[k]).join(' ').toLowerCase();}).join(' ');
        var score=0, ok=true;
        terms.forEach(function(term){
          if(title.indexOf(term)>=0) score+=12;
          else if(sum.indexOf(term)>=0) score+=5;
          else if(fv.indexOf(term)>=0) score+=2;
          else ok=false;
        });
        if(!ok) return;
        rec._score=score;
      } else rec._score=0;

      // 字段筛选（同字段 OR，跨字段 AND）
      var pass=true;
      Object.keys(state.filters).forEach(function(field){
        var selected=state.filters[field];
        var vals=flatten((rec.f||{})[field]);
        var hit=selected.some(function(sv){return vals.indexOf(sv)>=0;});
        if(!hit) pass=false;
      });
      if(!pass) return;
      out.push(rec);
    });

    // 排序
    if(state.sort==='latest'){
      out.sort(function(a,b){return getYear(b)-getYear(a)||b._score-a._score;});
    } else {
      out.sort(function(a,b){return b._score-a._score||getYear(b)-getYear(a);});
    }
    state.results=out;
    state.page=1;
    renderResults();
  }

  /* ---------- 结果渲染 ---------- */
  function renderResults(append){
    var wrap=document.getElementById('results');
    if(!wrap) return;
    var shown=state.results.slice(0,state.page*state.pageSize);
    var html='';
    shown.forEach(function(rec){
      var metaTags='';
      var f=rec.f||{};
      var keys=Object.keys(f).slice(0,6);
      keys.forEach(function(k){
        var vals=flatten(f[k]).slice(0,2);
        if(vals.length) metaTags+='<span class="meta-tag">'+esc(fLabel(k))+'：'+esc(vals.join('、'))+'</span>';
      });
      var summary=rec.s?esc(String(rec.s).slice(0,110)):'';
      var link=rec.link?'<span class="result-link">'+esc(typeof t==='function'?t('viewOriginal'):'查看原文 →')+'</span>':'';
      html+='<div class="result-card" onclick="window.__semOpenDetail(\''+rec._db+'\',\''+rec.id+'\')">'+
        '<div class="result-thumb">'+icon(rec._db)+'</div>'+
        '<div class="result-content">'+
          '<div class="result-title">'+esc(rec.t||'(无标题)')+'</div>'+
          '<div class="result-meta"><span class="meta-tag">'+esc(dbName(rec._db))+'</span>'+metaTags+'</div>'+
          (summary?'<div class="result-summary">'+summary+'</div>':'')+
          link+
        '</div></div>';
    });

    if(append) wrap.insertAdjacentHTML('beforeend',html); else wrap.innerHTML=html;

    if(!state.results.length){
      wrap.innerHTML='<div class="no-results" style="grid-column:1/-1"><div class="big">🔍</div>'+
        '<h3>'+esc(typeof t==='function'?t('noResultTitle'):'没有找到相关数据')+'</h3>'+
        '<p>'+esc(typeof t==='function'?t('noResultText'):'试试更换关键词或清除筛选条件')+'</p></div>';
    }

    // 计数
    var cnt=document.getElementById('result-count');
    if(cnt){
      var found=typeof t==='function'?t('resultFound'):'找到';
      var unit=typeof t==='function'?t('resultUnit'):'条结果';
      cnt.innerHTML=found+' <b>'+state.results.length.toLocaleString()+'</b> '+unit;
    }
    // 加载更多
    var lm=document.getElementById('load-more');
    if(lm) lm.style.display=(state.results.length>shown.length)?'block':'none';
  }

  /* ---------- 详情弹窗与交叉导航 ---------- */
  window.__semOpenDetail=function(db,id){
    var overlay=document.getElementById('detail-overlay');
    var modal=document.getElementById('detail-modal');
    overlay.classList.add('show');
    modal.innerHTML='<div class="detail-loading">'+esc(typeof t==='function'?t('loading'):'正在加载…')+'</div>';
    Promise.all([loadDetailFile(db),loadIdmap()]).then(function(res){
      var detail=res[0], idmap=res[1];
      var rec=detail[id];
      if(!rec){modal.innerHTML='<div class="detail-loading">未找到该记录</div>';return;}
      renderDetail(db,id,rec,idmap);
      modal.scrollTop=0;
    }).catch(function(err){
      modal.innerHTML='<div class="detail-loading">加载失败：'+esc(err.message)+'</div>';
    });
  };

  function renderDetail(db,id,rec,idmap){
    var modal=document.getElementById('detail-modal');
    var html='<button class="detail-close" onclick="window.__semCloseDetail()">×</button>';
    html+='<div class="detail-header"><h2>'+esc(rec.t||'(无标题)')+'</h2>'+
      '<span class="detail-type">'+esc(dbName(db))+'</span></div>';
    html+='<div class="detail-body">';

    if(rec.s){
      html+='<div class="detail-section"><h3>📝 '+(currentLang==='en'?'Summary':'内容摘要')+'</h3>'+
        '<div class="detail-summary">'+esc(rec.s)+'</div></div>';
    }

    // 全字段（后台已按策略过滤，此处为可对外展示字段）
    var d=rec.d||{};
    var keys=Object.keys(d).filter(function(k){return d[k]!==null&&d[k]!==undefined&&d[k]!=='';});
    if(keys.length){
      html+='<div class="detail-section"><h3>ℹ️ '+esc(typeof t==='function'?t('secBasic'):'基本信息')+'</h3><div class="detail-fields">';
      keys.forEach(function(k){
        var vals=flatten(d[k]);
        html+='<div class="detail-field"><div class="k">'+esc(fLabel(k))+'</div><div class="v">'+esc(vals.join('、'))+'</div></div>';
      });
      html+='</div></div>';
    }

    // 原文 / 附件
    if(rec.link){
      html+='<div class="detail-section"><a class="detail-link-btn" href="'+esc(rec.link)+'" target="_blank" rel="noopener noreferrer">🔗 '+
        esc(typeof t==='function'?t('viewOriginal'):'查看原文 →')+'</a></div>';
    }
    if(rec.img&&rec.img.name){
      html+='<div class="detail-section"><h3>📎 '+(currentLang==='en'?'Attachment':'原始资料')+'</h3>'+
        '<div class="detail-summary">'+esc(rec.img.name)+'</div></div>';
    }

    // 交叉导航（界面与数据解耦：只依赖 rel 字段与 idmap）
    var rel=rec.rel||{};
    var relKeys=Object.keys(rel).filter(function(k){return arr(rel[k]).length;});
    if(relKeys.length){
      html+='<div class="detail-section"><h3>🔗 '+esc(typeof t==='function'?t('secRel'):'相关内容')+'</h3><div class="rel-grid">';
      relKeys.forEach(function(group){
        html+='<div class="rel-group"><h4>'+esc(fLabel(group))+'</h4>';
        arr(rel[group]).slice(0,12).forEach(function(rid){
          var target=idmap[rid];
          var title=target?target.t:rid;
          var tdb=target?target.k:null;
          if(tdb) html+='<span class="rel-link" onclick="window.__semOpenDetail(\''+tdb+'\',\''+rid+'\')">↗ '+esc(title)+'</span>';
          else html+='<span class="rel-link" style="opacity:.6">'+esc(title)+'</span>';
        });
        html+='</div>';
      });
      html+='</div></div>';
    }

    html+='</div>';
    modal.innerHTML=html;
  }

  window.__semCloseDetail=function(){
    document.getElementById('detail-overlay').classList.remove('show');
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
