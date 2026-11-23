/* ============================================
   社企博物官网 · 双语(i18n)机制 + 公共组件
   ============================================ */

const I18N = {
  zh: {
    // 导航
    navHome:"首页", navAbout:"关于我们", navData:"数据资源", navServices:"服务项目",
    navNews:"资讯动态", navJoin:"加入我们", navCoop:"合作", navCTA:"加入我们",
    // 首页
    heroTag:"社会企业 · 可持续发展 · ESG",
    heroTitle:"让社会企业被看见",
    heroLead:"收集 · 整理 · 共享 · 传播 —— 开放的全球社会企业知识库，30 万+ 条结构化数据，覆盖 15 个国家。",
    heroBtn1:"探索数据资源", heroBtn2:"了解我们",
    heroSideTitle:"我们是社企博物",
    heroSideText:"一个由志愿者组成的去中心化公益知识项目，通过结构化梳理公开数据，让关注社会企业与可持续领域的每一个人在更短时间内获取可信信息。从文献到影像，从人物到机构，从中国到世界——我们把分散的知识汇聚成开放共享的公共资产。",
    stat1:"国内数据", stat2:"海外数据", stat3:"覆盖国家", stat4:"主理人项目",
    valuesTitle:"4S 方法论", valuesSub:"四步构建开放的社会企业知识基础设施",
    v1t:"收集", v1e:"SELECT", v1d:"汇聚公开网站、论文、书籍、视频等原始数据",
    v2t:"整理", v2e:"SORT", v2d:"结构化、目录化梳理，形成可检索的知识库",
    v3t:"共享", v3e:"SHARE", v3d:"以公益方式开放数据，降低信息获取门槛",
    v4t:"传播", v4e:"SPREAD", v4d:"通过自媒体与活动网络扩大影响力",
    bannerTitle:"12 大数据库 · 结构化知识",
    bannerText:"文献 / 活动 / 人物 / 机构 / 名词 / 观点 / 影像 / 事件 / 岗位 / 产品 / 实物 / 专题",
    bannerBtn:"查看全部资源",
    projTitle:"主理人项目", projSub:"由志愿者发起的公益性服务项目",
    newsTitle:"最新资讯", newsBtn:"查看更多",
    ctaTitle:"加入我们，一起让善意被看见",
    ctaText:"无论你擅长数据整理、内容创作还是活动组织，这里都有适合你的小 case。",
    ctaBtn:"成为志愿者",
    // 关于
    aboutEyebrow:"ABOUT US", aboutTitle:"关于社企博物",
    aboutLead:"以收集、整理、共享、传播社会企业及可持续发展相关资料为目的的公益项目",
    // 数据
    dataEyebrow:"DATA RESOURCES", dataTitle:"数据资源",
    dataLead:"开放共享的社会企业知识库，30 万+ 条结构化数据，覆盖 15 个国家",
    // 服务
    svcEyebrow:"SERVICES", svcTitle:"服务项目",
    svcLead:"基础数据运营服务与志愿者主理人项目，全部免费开放",
    // 资讯
    newsEyebrow:"INSIGHTS", newsTitle:"资讯动态",
    newsLead:"按规则采集整理的社会企业资讯，点击卡片阅读原文",
    newsIntro:"来自社企流（seinsights.asia）的文章清单，持续采集更新。卡片仅展示题录信息，正文请前往原文网站阅读。",
    newsSearch:"搜索标题、摘要或作者", newsAllYears:"全部年份", newsYear:"年",
    newsSortNew:"最新发布", newsSortOld:"最早发布",
    newsRead:"阅读原文 ↗", newsBy:"作者", newsTotal:"共", newsArticles:"篇文章",
    newsEmpty:"没有匹配的资讯", newsEmptyTip:"换个关键词或年份试试",
    newsLoad:"加载更多", newsSource:"来源", newsCollected:"采集于",
    newsBrowserTip:"外文内容可使用浏览器右键翻译阅读", newsMeta:"篇资讯 · 更新于",
    // 合作
    coopEyebrow:"COLLABORATE", coopTitle:"合作交流",
    coopLead:"与机构、媒体、研究者共建社会企业知识生态",
    // 加入
    joinEyebrow:"JOIN US", joinTitle:"加入我们",
    joinLead:"去中心化的志愿者团队，每周只需少量时间，做力所能及且感兴趣的小事",
    // 检索页
    searchPlaceholder:"搜索社会企业、ESG、可持续相关关键词……", searchBtn:"检索",
    resultFound:"找到", resultUnit:"条结果", sortBy:"排序", sortRelevance:"相关度", sortLatest:"最新",
    filters:"筛选", clearAll:"清除筛选", loadMore:"加载更多", noResultTitle:"没有找到相关数据",
    noResultText:"试试更换关键词或清除筛选条件", viewOriginal:"查看原文 →", detailTitle:"详情",
    relTitle:"相关内容", loading:"正在加载数据…", allDb:"全部",
    // 详情页字段区块
    secBasic:"基本信息", secBiz:"工商信息", secContact:"联系信息", secCert:"认定与影响", secRel:"相关内容",
    // 页脚
    footerDesc:"以收集、整理、共享、传播社会企业及可持续发展相关资料为目的的公益项目，由志愿者组成的去中心化团队建设运营。",
    footerAbout:"关于", footerData:"数据", footerJoin:"参与", footerContact:"联系我们",
    contactUs:"联系方式", mediaMatrix:"媒体矩阵",
  },
  en: {
    navHome:"Home", navAbout:"About", navData:"Data", navServices:"Services",
    navNews:"Insights", navJoin:"Join Us", navCoop:"Collaborate", navCTA:"Join Us",
    heroTag:"Social Enterprise · Sustainability · ESG",
    heroTitle:"Making Social Enterprises Visible",
    heroLead:"Select · Sort · Share · Spread — An open knowledge base of social enterprises, with 300,000+ structured records across 15 countries.",
    heroBtn1:"Explore Data", heroBtn2:"About Us",
    heroSideTitle:"We are SEMuseum",
    heroSideText:"A decentralized public-interest knowledge project run by volunteers. We structure public data so anyone interested in social enterprise and sustainability can access trustworthy information faster. From documents to images, people to organizations, China to the world — we gather scattered knowledge into an open public asset.",
    stat1:"China Records", stat2:"Global Records", stat3:"Countries", stat4:"Projects",
    valuesTitle:"The 4S Method", valuesSub:"Four steps building an open knowledge infrastructure",
    v1t:"Select", v1e:"SELECT", v1d:"Gather raw data from websites, papers, books and videos",
    v2t:"Sort", v2e:"SORT", v2d:"Structure and categorize into a searchable knowledge base",
    v3t:"Share", v3e:"SHARE", v3d:"Open data for public good, lowering information barriers",
    v4t:"Spread", v4e:"SPREAD", v4d:"Amplify impact through media and activity networks",
    bannerTitle:"12 Databases · Structured Knowledge",
    bannerText:"Documents / Events / People / Organizations / Vocabularies / Opinions / Pictures / Events / Jobs / Products / Objects / Topics",
    bannerBtn:"View All Resources",
    projTitle:"Leader Projects", projSub:"Public-interest services initiated by volunteers",
    newsTitle:"Latest Insights", newsBtn:"View More",
    ctaTitle:"Join us and make goodwill visible",
    ctaText:"Whether you excel at data curation, content creation or event organizing, there's a small case for you here.",
    ctaBtn:"Become a Volunteer",
    aboutEyebrow:"ABOUT US", aboutTitle:"About SEMuseum",
    aboutLead:"A public-interest project collecting, sorting, sharing and spreading social enterprise and sustainability resources",
    dataEyebrow:"DATA RESOURCES", dataTitle:"Data Resources",
    dataLead:"An open knowledge base with 300,000+ structured records across 15 countries",
    svcEyebrow:"SERVICES", svcTitle:"Services",
    svcLead:"Data operations and volunteer-led projects, all free to access",
    newsEyebrow:"INSIGHTS", newsTitle:"Insights",
    newsLead:"Curated social enterprise articles — click a card to read the original",
    newsIntro:"An article list from SE Insights (seinsights.asia), continuously collected. Cards show citations only; please visit the source site for full text.",
    newsSearch:"Search title, summary or author", newsAllYears:"All years", newsYear:"",
    newsSortNew:"Newest first", newsSortOld:"Oldest first",
    newsRead:"Read original ↗", newsBy:"By", newsTotal:"", newsArticles:"articles",
    newsEmpty:"No matching articles", newsEmptyTip:"Try another keyword or year",
    newsLoad:"Load more", newsSource:"Source", newsCollected:"Collected",
    newsBrowserTip:"Use your browser's right-click translate for foreign-language content", newsMeta:"articles · updated",
    coopEyebrow:"COLLABORATE", coopTitle:"Collaborate",
    coopLead:"Building the social enterprise knowledge ecosystem with institutions, media and researchers",
    joinEyebrow:"JOIN US", joinTitle:"Join Us",
    joinLead:"A decentralized volunteer team — a few hours a week doing what you care about",
    searchPlaceholder:"Search social enterprise, ESG, sustainability…", searchBtn:"Search",
    resultFound:"Found", resultUnit:"results", sortBy:"Sort", sortRelevance:"Relevance", sortLatest:"Latest",
    filters:"Filters", clearAll:"Clear all", loadMore:"Load More", noResultTitle:"No results found",
    noResultText:"Try different keywords or clear filters", viewOriginal:"View Source →", detailTitle:"Details",
    relTitle:"Related", loading:"Loading data…", allDb:"All",
    secBasic:"Basic Info", secBiz:"Business Info", secContact:"Contact", secCert:"Certification & Impact", secRel:"Related Content",
    footerDesc:"A public-interest project collecting, sorting, sharing and spreading social enterprise and sustainability resources, run by a decentralized volunteer team.",
    footerAbout:"About", footerData:"Data", footerJoin:"Participate", footerContact:"Contact Us",
    contactUs:"Contact", mediaMatrix:"Media",
  }
};

let currentLang = localStorage.getItem('sem_lang') || 'zh';

function t(key){
  var dict=I18N[currentLang]||I18N.zh;
  return Object.prototype.hasOwnProperty.call(dict,key) ? dict[key] : (I18N.zh[key]||key);
}

function applyLanguage(){
  document.documentElement.lang = currentLang==='zh'?'zh-CN':'en';
  document.body.classList.toggle('lang-en', currentLang==='en');
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    const val=t(key);
    if(el.tagName==='INPUT') el.placeholder=val;
    else el.textContent=val;
  });
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang===currentLang);
  });
  document.dispatchEvent(new CustomEvent('languagechange',{detail:{lang:currentLang}}));
}

function setLang(lang){
  currentLang=lang;
  localStorage.setItem('sem_lang',lang);
  applyLanguage();
}

/* ---------- 公共组件：语言条 + 导航 + 页脚 ---------- */
const NAV_ITEMS=[
  {key:'navHome',href:'index.html'},
  {key:'navAbout',href:'about.html'},
  {key:'navData',href:'data.html'},
  {key:'navServices',href:'services.html'},
  {key:'navNews',href:'news.html'},
  {key:'navCoop',href:'cooperate.html'},
  {key:'navJoin',href:'join.html'},
];

function renderChrome(activePage){
  // 语言条
  const langbar=document.getElementById('langbar');
  if(langbar){
    langbar.innerHTML=`<div class="container">
      <span class="brand-mini">◈ SOCIAL ENTERPRISE MUSEUM</span>
      <div class="lang-switch">
        <button data-lang="zh" onclick="setLang('zh')">中文</button>
        <button data-lang="en" onclick="setLang('en')">ENGLISH</button>
      </div>
    </div>`;
  }
  // 导航
  const header=document.getElementById('site-header');
  if(header){
    const links=NAV_ITEMS.map(it=>`<a href="${it.href}" class="${it.href===activePage?'active':''}" data-i18n="${it.key}">${t(it.key)}</a>`).join('');
    header.innerHTML=`<div class="container navbar">
      <a href="index.html" class="logo">
        <div class="logo-mark">◈</div>
        <div class="logo-text"><span class="zh">社企博物</span><span class="en">SOCIAL ENTERPRISE MUSEUM</span></div>
      </a>
      <nav class="nav-menu" id="nav-menu">${links}</nav>
      <a href="join.html" class="nav-cta" data-i18n="navCTA">${t('navCTA')}</a>
      <button class="menu-toggle" onclick="document.getElementById('nav-menu').classList.toggle('show')">☰</button>
    </div>`;
  }
  // 页脚
  const footer=document.getElementById('site-footer');
  if(footer){
    footer.innerHTML=`<div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-mark">◈</div>
            <div class="logo-text"><span class="zh">社企博物</span><span class="en">SOCIAL ENTERPRISE MUSEUM</span></div>
          </a>
          <p data-i18n="footerDesc">${t('footerDesc')}</p>
        </div>
        <div class="footer-col"><h4 data-i18n="footerAbout">${t('footerAbout')}</h4>
          <a href="about.html" data-i18n="navAbout">${t('navAbout')}</a>
          <a href="services.html" data-i18n="navServices">${t('navServices')}</a>
          <a href="news.html" data-i18n="navNews">${t('navNews')}</a>
        </div>
        <div class="footer-col"><h4 data-i18n="footerData">${t('footerData')}</h4>
          <a href="data.html" data-i18n="navData">${t('navData')}</a>
          <a href="data.html">ESG Report</a>
          <a href="data.html">Academic Access</a>
        </div>
        <div class="footer-col"><h4 data-i18n="footerContact">${t('footerContact')}</h4>
          <p>WeChat: semuseum2024</p>
          <p>Email: semuseum@163.com</p>
          <p data-i18n="mediaMatrix">${t('mediaMatrix')}</p>
          <p>公众号 · 视频号 · 小红书 · 知乎 · B站</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Social Enterprise Museum · 社企博物</span>
        <span>Made with care by volunteers · 志愿者用心共建</span>
      </div>
    </div>`;
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  renderChrome(document.body.dataset.page||'');
  applyLanguage();
});
