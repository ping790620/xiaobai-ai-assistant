/* ===== 小白AI管家 - 公共函数 =====
   功能：页面切换、数据读取、localStorage 读写
   说明：本应用为纯静态网页，所有数据仅在浏览器本地处理，不发送到任何服务器。
*/

(function (global) {
  'use strict';

  /* ---------- 数据读取 ---------- */

  // 获取 MVP 阶段主推的平台列表（平台选择页使用）
  function getMvpPlatforms() {
    return (global.APP_DATA && global.APP_DATA.platforms && global.APP_DATA.platforms.phase1_mvp) || [];
  }

  // 获取全部平台（含未来扩展，场景推荐等页面使用）
  function getPlatforms() {
    return (global.APP_DATA && global.APP_DATA.platforms && global.APP_DATA.platforms.all) || [];
  }

  // 根据 id 获取单个平台（优先在 phase1_mvp 中查找，再到 all 中查找）
  function getPlatformById(id) {
    var mvp = getMvpPlatforms().find(function (p) { return p.id === id; });
    if (mvp) return mvp;
    return getPlatforms().find(function (p) { return p.id === id; }) || null;
  }

  // 获取所有场景（场景推荐页使用）
  function getScenes() {
    return (global.APP_DATA && global.APP_DATA.scene_mapping) || [];
  }

  // 根据 id 获取单个场景
  function getSceneById(id) {
    return getScenes().find(function (s) { return s.id === id; }) || null;
  }

  // 获取所有工具
  function getTools() {
    return (global.APP_DATA && global.APP_DATA.tools) || [];
  }

  // 按分类获取工具（chat / multimodal）
  function getToolsByCategory(category) {
    return getTools().filter(function (t) { return t.category === category; });
  }

  // 获取全部智能体（场景推荐页使用）
  function getAgents() {
    return (global.APP_DATA && global.APP_DATA.agents) || [];
  }

  // 根据 id 获取单个智能体
  function getAgentById(id) {
    return getAgents().find(function (a) { return a.id === id; }) || null;
  }

  // 渲染工具库两个分类区域
  function renderTools() {
    var chatContainer = document.getElementById('chat-tools');
    var multiContainer = document.getElementById('multimodal-tools');
    if (chatContainer) chatContainer.innerHTML = renderToolCards(getToolsByCategory('chat'));
    if (multiContainer) multiContainer.innerHTML = renderToolCards(getToolsByCategory('multimodal'));
  }

  // 渲染一组工具卡片
  function renderToolCards(tools) {
    if (!tools.length) return '<div class="ph-desc">暂无工具</div>';
    var html = '<div class="tool-grid">';
    tools.forEach(function (t) {
      html +=
        '<div class="tool-card">' +
          '<div class="tool-name">' + t.name + '</div>' +
          '<div class="tool-desc">' + t.desc + '</div>' +
          '<button class="tool-download-btn" onclick="App.openExternal(\'' + t.download_url + '\')">去官方下载</button>' +
          '<div class="tool-note">本应用仅提供官方下载入口，安装请认准官网，勿下载第三方修改版</div>' +
        '</div>';
    });
    html += '</div>';
    return html;
  }

  // 获取某个平台的申请教程
  function getTutorial(platformId) {
    return (global.APP_DATA && global.APP_DATA.tutorials && global.APP_DATA.tutorials[platformId]) || null;
  }

  // 获取常见问题列表
  function getFaq() {
    return (global.APP_DATA && global.APP_DATA.faq) || [];
  }

  // 获取某个平台的模型配置（base_url、服务商名、模型列表）
  function getModelConfig(platformId) {
    return (global.APP_DATA && global.APP_DATA.model_config && global.APP_DATA.model_config[platformId]) || null;
  }

  // 复制文本到剪贴板（兼容老浏览器）
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---------- localStorage 读写（API Key 仅存本地） ---------- */

  var STORAGE_PREFIX = 'xiaobai_ai_';

  // 保存数据到 localStorage
  function saveLocal(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('保存失败：', e);
      return false;
    }
  }

  // 从 localStorage 读取数据
  function readLocal(key, defaultValue) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('读取失败：', e);
      return defaultValue;
    }
  }

  // 删除 localStorage 中的数据
  function removeLocal(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (e) {
      return false;
    }
  }

  // 保存某个平台的 API Key
  function saveApiKey(platformId, apiKey) {
    return saveLocal('apikey_' + platformId, apiKey);
  }

  // 读取某个平台的 API Key
  function getApiKey(platformId) {
    return readLocal('apikey_' + platformId, '');
  }

  // 删除某个平台的 API Key
  function removeApiKey(platformId) {
    return removeLocal('apikey_' + platformId);
  }

  /* ---------- 页面切换 ---------- */

  // 切换到指定页面（pageId 对应 .page 元素的 id）
  // 页面切换历史栈（用于"返回上一页"）
  var pageHistory = [];

  function switchPage(pageId) {
    var pages = document.querySelectorAll('.page');
    var current = null;
    pages.forEach(function (p) {
      if (p.classList.contains('active')) current = p.id;
    });
    if (current === pageId) return;
    if (current) pageHistory.push(current);

    pages.forEach(function (p) {
      p.classList.toggle('active', p.id === pageId);
    });

    // 同步底部导航高亮
    var navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(function (item) {
      item.classList.toggle('active', item.dataset.page === pageId);
    });

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 进入案例页时重置列表
    if (pageId === 'page-cases') { hideCaseDetail(); }
  }

  // 返回上一页
  function goBack() {
    if (pageHistory.length === 0) {
      switchPage('page-home');
      return;
    }
    var prev = pageHistory.pop();
    var pages = document.querySelectorAll('.page');
    pages.forEach(function (p) {
      p.classList.toggle('active', p.id === prev);
    });
    var navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(function (item) {
      item.classList.toggle('active', item.dataset.page === prev);
    });
    window.scrollTo(0, 0);
  }

  // 绑定底部导航点击事件
  function bindNav() {
    var navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var pageId = item.dataset.page;
        if (pageId) switchPage(pageId);
      });
    });
  }

  /* ---------- 工具函数 ---------- */

  // 安全跳转外部链接（新标签页）
  function openExternal(url) {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // 显示简单提示（替换 alert，更友好）
  function toast(message, duration) {
    duration = duration || 2000;
    var el = document.createElement('div');
    el.textContent = message;
    el.style.cssText = [
      'position:fixed',
      'left:50%',
      'top:30%',
      'transform:translateX(-50%)',
      'background:rgba(0,0,0,0.8)',
      'color:#fff',
      'padding:12px 20px',
      'border-radius:8px',
      'font-size:16px',
      'z-index:9999',
      'max-width:80%',
      'text-align:center'
    ].join(';');
    document.body.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration);
  }

  /* ---------- 页面渲染 ---------- */

  // 渲染平台选择页的卡片列表（数据来自 data.js 的 platforms.phase1_mvp，不写死）
  function renderPlatforms(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var platforms = getMvpPlatforms();
    if (!platforms.length) {
      container.innerHTML = '<div class="empty-state"><div class="ph-desc">暂无平台数据</div></div>';
      return;
    }

    var html = '';
    platforms.forEach(function (p) {
      var pricesHtml = '';
      if (p.verified_prices && p.verified_prices.length) {
        pricesHtml = '<div class="platform-prices">';
        p.verified_prices.forEach(function (price) {
          pricesHtml += '<div class="price-item">' +
            (price.model ? '<span class="price-model">' + price.model + '</span>' : '') +
            '<span class="price-note">' + price.note + '</span>' +
            '</div>';
        });
        pricesHtml += '</div>';
      }

      html +=
        '<div class="platform-card">' +
          '<div class="platform-name">' + p.name + '</div>' +
          '<div class="platform-desc">' + p.desc + '</div>' +
          pricesHtml +
          '<button class="apply-btn" onclick="App.goApply(\'' + p.id + '\')">去申请 Key</button>' +
          '<div class="config-link">' +
            '<a href="#" onclick="App.switchPage(\'page-config\');return false;">已有 Key？→ 去配置</a>' +
          '</div>' +
        '</div>';
    });

    container.innerHTML = html;
  }

  /* ---------- 场景推荐页 ---------- */

  // 术语大白话替换：把技术词换成普通人能懂的说法
  function replaceTechTerms(text) {
    if (!text) return '';
    return text
      .replace(/tokens?/gi, '字数（token）')
      .replace(/输入/g, '它读的内容')
      .replace(/输出/g, '它写的内容');
  }

  // 获取某个平台的价格提示文字（有已核验价格则显示，否则提示以官方为准）
  function getPlatformPriceText(platformId) {
    var p = getPlatformById(platformId);
    if (!p || !p.verified_prices || !p.verified_prices.length) {
      return '以官方实时价格为准';
    }
    // 只显示带有具体金额（¥）的价格项；全是"送额度"之类的也归为官方为准
    var priced = p.verified_prices.filter(function (price) {
      return price.note && price.note.indexOf('¥') >= 0;
    });
    if (!priced.length) return '以官方实时价格为准';

    return priced.map(function (price) {
      return replaceTechTerms(price.note);
    }).join('<br>');
  }

  // 渲染场景按钮（两列网格）
  function renderSceneButtons(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var scenes = getScenes();
    if (!scenes.length) {
      container.innerHTML = '<div class="empty-state"><div class="ph-desc">暂无场景数据</div></div>';
      return;
    }

    var html = '<div class="scene-grid">';
    scenes.forEach(function (s) {
      html += '<button class="scene-btn" data-scene-id="' + s.id + '" onclick="App.showSceneRecommendation(\'' + s.id + '\', \'scene-result\')">' +
        s.name +
        '</button>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  /* ---------- 场景推荐：3 个性价比模型 + 智能体 + 一键设置 ---------- */

  // 当前场景选择状态：场景 id、选中的模型下标、选中的智能体 id、设置面板是否已打开
  var sceneState = { sceneId: null, activePlatformId: null, activeModelIdx: null, activeAgentId: null, setupOpen: false, showKey: false, installConfirm: null, deployConfirm: false, _bat: null, _env: null };

  // 配置页（粘贴 Key → 生成配置）选中智能体后的部署状态，结构与 sceneState 对齐：
  // context 即 pick（{platform_id, model, ...}），供 build*Setup 等共用函数读取
  var cfgDeploy = { agentId: null, installConfirm: null, deployConfirm: false, _bat: null, _env: null, context: null };

  // ===== 统一的「当前部署上下文」：场景面板与配置页共用一套 build*Setup / 交互函数 =====
  function inConfigDeploy() {
    return !sceneState.setupOpen && !!cfgDeploy.agentId;
  }
  function activeDeployPick() {
    if (sceneState.setupOpen) return getCurrentPick();
    return cfgDeploy.context;
  }
  function activeDeployAgent() {
    var id = sceneState.setupOpen ? sceneState.activeAgentId : cfgDeploy.agentId;
    return id ? getAgentById(id) : null;
  }
  function activeInstallConfirm() {
    return sceneState.setupOpen ? sceneState.installConfirm : cfgDeploy.installConfirm;
  }
  function setActiveInstallConfirm(v) {
    if (sceneState.setupOpen) sceneState.installConfirm = v;
    else cfgDeploy.installConfirm = v;
  }
  function activeDeployConfirm() {
    return sceneState.setupOpen ? sceneState.deployConfirm : cfgDeploy.deployConfirm;
  }
  function setActiveDeployConfirm(v) {
    if (sceneState.setupOpen) sceneState.deployConfirm = v;
    else cfgDeploy.deployConfirm = v;
  }
  function activeBat(v) {
    if (v !== undefined) {
      if (sceneState.setupOpen) sceneState._bat = v;
      else cfgDeploy._bat = v;
    }
    return sceneState.setupOpen ? sceneState._bat : cfgDeploy._bat;
  }
  // 重新渲染当前处于活动状态的部署面板（场景面板或配置页详情）
  function refreshActiveDeploy() {
    if (sceneState.setupOpen) renderDeployPanel();
    else renderConfigDeployDetail();
  }

  // ===== 桌面版原生桥接（pywebview）：有桥接就用原生能力，没有就退回网页流程 =====
  var nativeApi = null;
  var installedMap = {};

  function bindNativeBridge() {
    if (window.pywebview && window.pywebview.api) {
      nativeApi = window.pywebview.api;
      refreshInstalledBadges();
    }
  }
  if (window.pywebview) { bindNativeBridge(); }
  window.addEventListener('pywebviewready', bindNativeBridge);

  function isNative() { return !!nativeApi; }

  // 原生下载进度浮条（Python 侧实时推送百分比）
  function onNativeDlProgress(pct, name) {
    var bar = document.getElementById('native-dl-float');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'native-dl-float';
      document.body.appendChild(bar);
    }
    if (pct >= 100) {
      bar.innerHTML = '✅ 下载完成：' + escapeHtml(name || '') + '，正在拉起安装器…';
      setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 5000);
    } else {
      bar.innerHTML = '⬇️ 正在从官方服务器下载 ' + escapeHtml(name || '安装包') + ' … ' + pct + '%' +
        '<span class="native-dl-bar"><span style="width:' + pct + '%"></span></span>';
    }
  }

  // 检测本机已安装的智能体，给对应卡片加「已安装」徽标
  function refreshInstalledBadges() {
    if (!nativeApi) return;
    var scene = getSceneById(sceneState.sceneId);
    if (!scene || !scene.agents) return;
    try {
      Promise.resolve(nativeApi.detect_installed(JSON.stringify(scene.agents))).then(function (map) {
        if (map && typeof map === 'string') { try { map = JSON.parse(map); } catch (e) { map = {}; } }
        installedMap = map || {};
        document.querySelectorAll('.agent-chip[data-agent-id]').forEach(function (chip) {
          var id = chip.getAttribute('data-agent-id');
          var info = chip.querySelector('.agent-info');
          if (!info) return;
          var badge = chip.querySelector('.agent-installed');
          if (installedMap[id]) {
            if (!badge) {
              badge = document.createElement('span');
              badge.className = 'agent-installed';
              badge.textContent = '✓ 已安装';
              info.appendChild(badge);
            }
          } else if (badge && badge.parentNode) {
            badge.parentNode.removeChild(badge);
          }
        });
      }).catch(function () {});
    } catch (e) {}
  }

  // 点击场景后，展示 3 个推荐模型、智能体列表和设置入口
  function showSceneRecommendation(sceneId, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var scene = getSceneById(sceneId);
    if (!scene || !scene.platform_models) {
      container.innerHTML = '<div class="empty-state"><div class="ph-desc">未找到该场景</div></div>';
      return;
    }

    var btns = document.querySelectorAll('.scene-btn');
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.sceneId === sceneId);
    });

    sceneState.sceneId = sceneId;
    sceneState.activePlatformId = null;
    sceneState.activeModelIdx = null;
    sceneState.activeAgentId = (scene.agents && scene.agents[0]) || null;
    sceneState.setupOpen = false;
    sceneState.showKey = false;
    sceneState.installConfirm = null;
    sceneState.deployConfirm = false;

    var html = '';

    // ① 智能体列表
    var agents = (scene.agents || []).map(getAgentById).filter(Boolean);
    if (agents.length) {
      html += '<div class="scene-step">能做这件事的智能体（AI 工具）——点击可直接安装</div>';
      html += '<div class="agent-list">';
      agents.forEach(function (agent) {
        var installBtn = '';
        if (isNative()) {
          var installed = installedMap[agent.id];
          if (installed) {
            installBtn = '<span class="installed-badge">✓ 已安装</span>';
          } else if (agent.kind === 'web') {
            installBtn = '<a class="setup-btn as-link small-btn" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">打开网页</a>';
          } else if (agent.openclaw) {
            installBtn = '<button type="button" class="setup-btn small-btn" onclick="App.nativeInstallOpenclaw()">⚡ 一键安装</button>';
          } else if (agent.installer || agent.id === 'workbuddy') {
            installBtn = '<button type="button" class="setup-btn small-btn" onclick="App.nativeInstall(\'' + agent.id + '\')">⚡ 一键安装</button>';
          } else if (agent.npm) {
            installBtn = '<button type="button" class="setup-btn small-btn" onclick="App.nativeInstall(\'' + agent.id + '\')">⚡ 一键安装</button>';
          } else {
            installBtn = '<a class="setup-btn as-link small-btn" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">打开官方下载页</a>';
          }
        } else {
          if (agent.kind === 'web') {
            installBtn = '<a class="setup-btn as-link small-btn" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">打开网页</a>';
          } else {
            installBtn = '<a class="setup-btn as-link small-btn" href="' + (agent.installer || agent.url) + '" target="_blank" rel="noopener noreferrer">下载安装包</a>';
          }
        }
        html +=
          '<div class="agent-card">' +
            '<div class="agent-card-top">' +
              '<div class="agent-info">' +
                '<span class="agent-name">' + agent.name + '</span>' +
                '<span class="agent-tag">' + agent.tag + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="agent-desc">' + agent.desc + '</div>' +
            installBtn +
          '</div>';
      });
      html += '</div>';
    }

    // ② 按平台分组的模型推荐
    var pm = scene.platform_models;
    html += '<div class="scene-step">各平台性价比模型推荐（点「部署」直接配到智能体里）</div>';

    Object.keys(pm).forEach(function (platformId) {
      var platform = getPlatformById(platformId);
      var platformName = platform ? platform.name : platformId;
      var models = pm[platformId];

      html += '<div class="platform-group">';
      html += '<div class="platform-group-header"><span class="platform-badge">' + platformName + '</span></div>';
      html += '<div class="pick-list">';

      models.forEach(function (model, idx) {
        var deployId = 'deploy-' + platformId + '-' + idx;
        html +=
          '<div class="pick-card-wrapper">' +
            '<div class="pick-card">' +
              '<span class="pick-badge">' + model.badge + '</span>' +
              '<span class="pick-model" title="调用时填写的模型代号（model）">' + model.model + '（模型代号）</span>' +
              (model.context ? '<span class="pick-context">一次能读：' + model.context + '</span>' : '') +
              '<span class="pick-price">💰 ' + model.price + '</span>' +
              '<span class="pick-reason">' + model.reason + '</span>' +
              '<button type="button" class="setup-btn deploy-btn" onclick="App.deploySceneModel(\'' + platformId + '\',' + idx + ')">⚡ 部署这个模型</button>' +
            '</div>' +
            '<div id="' + deployId + '" class="deploy-panel"></div>' +
          '</div>';
      });

      html += '</div>';
      html += '</div>';
    });

    html += '<p class="scene-price-note">价格为 2026 年 9 月整理的调用参考价（文字模型按每百万字计费，做图按张、做视频按秒/条），最终以各平台官方页面为准。</p>';

    container.innerHTML = html;

    if (isNative()) refreshInstalledBadges();

    setTimeout(function () {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // 点击模型卡的「部署」按钮，内联展开设置面板
  function deploySceneModel(platformId, modelIdx) {
    var scene = getSceneById(sceneState.sceneId);
    if (!scene || !scene.platform_models || !scene.platform_models[platformId]) return;

    var model = scene.platform_models[platformId][modelIdx];
    if (!model) return;

    var deployId = 'deploy-' + platformId + '-' + modelIdx;

    if (sceneState.activePlatformId === platformId && sceneState.activeModelIdx === modelIdx && sceneState.setupOpen) {
      sceneState.setupOpen = false;
      var p = document.getElementById(deployId);
      if (p) p.innerHTML = '';
      return;
    }

    sceneState.activePlatformId = platformId;
    sceneState.activeModelIdx = modelIdx;
    sceneState.setupOpen = true;
    sceneState.showKey = false;
    sceneState.installConfirm = null;
    sceneState.deployConfirm = false;

    var sceneAgents = (scene.agents || []).map(getAgentById).filter(Boolean);
    sceneState.activeAgentId = (sceneAgents[0] && sceneAgents[0].id) || null;

    document.querySelectorAll('.deploy-panel').forEach(function (p) { p.innerHTML = ''; });

    renderDeployPanel();

    setTimeout(function () {
      var panel = document.getElementById(deployId);
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  // 切换智能体（在部署面板内）
  function selectSceneAgent(agentId) {
    sceneState.activeAgentId = agentId;
    sceneState.installConfirm = null;
    sceneState.deployConfirm = false;
    if (sceneState.setupOpen) renderDeployPanel();
  }

  // 从场景推荐跳转申请页
  function goApplyScenePick() {
    var pick = getCurrentPick();
    if (!pick) return;
    goApply(pick.platform_id);
  }

  // 获取当前选中模型（兼容新 platform_models）
  function getCurrentPick() {
    var scene = getSceneById(sceneState.sceneId);
    if (!scene) return null;
    if (scene.platform_models && sceneState.activePlatformId != null) {
      var pm = scene.platform_models[sceneState.activePlatformId];
      if (!pm) return null;
      var model = pm[sceneState.activeModelIdx];
      if (!model) return null;
      return {
        platform_id: sceneState.activePlatformId,
        model: model.model,
        badge: model.badge,
        context: model.context,
        price: model.price,
        reason: model.reason
      };
    }
    if (scene.picks) return scene.picks[sceneState.pickIdx] || scene.picks[0];
    return null;
  }

  // 渲染内联部署面板
  function renderDeployPanel() {
    var deployId = 'deploy-' + sceneState.activePlatformId + '-' + sceneState.activeModelIdx;
    var panel = document.getElementById(deployId);
    if (!panel || !sceneState.setupOpen) return;

    var scene = getSceneById(sceneState.sceneId);
    var pick = getCurrentPick();
    var agent = getAgentById(sceneState.activeAgentId);
    if (!scene || !pick || !agent) { panel.innerHTML = ''; return; }

    var platform = getPlatformById(pick.platform_id);
    var platformName = platform ? platform.name : pick.platform_id;

    var html = '<div class="setup-panel">';
    if (agent.kind === 'app' && agent.config === 'builtin') {
      html += '<div class="setup-summary">一键安装 <strong>' + agent.name + '</strong>（自带官方模型，登录即用）</div>';
    } else if (agent.kind === 'app') {
      html += '<div class="setup-summary">一键安装 <strong>' + agent.name + '</strong>，再配上你选的模型</div>';
    } else {
      html += '<div class="setup-summary">把 <strong>' + pick.model + '</strong>（' + platformName + '）一键装进 <strong>' + agent.name + '</strong></div>';
    }

    // 智能体选择器
    var sceneAgents = (scene.agents || []).map(getAgentById).filter(Boolean);
    if (sceneAgents.length > 1) {
      html += '<div class="deploy-agent-select">选择智能体：';
      sceneAgents.forEach(function (a) {
        var on = a.id === sceneState.activeAgentId;
        html += '<button type="button" class="agent-chip' + (on ? ' selected' : '') + '" onclick="App.selectSceneAgent(\'' + a.id + '\')">' + a.name + '</button>';
      });
      html += '</div>';
    }

    if (agent.kind === 'web') {
      panel.innerHTML = html + buildWebSetup(agent) + '</div>';
      return;
    }

    var needKey = agent.kind === 'gui' || agent.kind === 'cli' ||
      (agent.kind === 'app' && (agent.config === 'custom' || agent.config === 'advanced'));

    if (needKey) {
      var savedKey = getApiKey(pick.platform_id) || '';
      html +=
        '<div class="setup-key-box">' +
          '<label class="setup-key-label" for="scene-setup-key">API Key（钥匙）——只存在你自己电脑的浏览器里</label>' +
          '<div class="key-input-wrap">' +
            '<input id="scene-setup-key" type="' + (sceneState.showKey ? 'text' : 'password') + '" class="key-input" value="' + escapeHtml(savedKey) + '" placeholder="把申请到的 sk 开头那串字符粘到这里" oninput="App.onSceneKeyInput()">' +
            '<button type="button" class="paste-btn" onclick="App.pasteSceneKey()">📋 粘贴</button>' +
            '<button type="button" class="eye-btn" onclick="App.sceneToggleKey()">' + (sceneState.showKey ? '🙈 隐藏' : '👁 显示') + '</button>' +
          '</div>' +
          '<div class="setup-key-hint">没有 Key？<a href="#" onclick="App.goApplyScenePick();return false;">点这里去「' + platformName + '」官方申请（约 3 分钟）</a></div>' +
        '</div>';
    }

    if (agent.kind === 'app') {
      html += buildAppSetup(agent, pick, platformName);
    } else if (agent.kind === 'gui') {
      html += buildGuiSetup(agent, pick, platformName);
    } else if (agent.kind === 'cli') {
      if (agent.openclaw) {
        html += buildOpenclawSetup(agent, pick);
      } else {
        html += buildCliSetup(agent, pick);
      }
    }

    if (needKey) {
      html +=
        '<div class="setup-security">🔒 命令和配置文件里包含你的 Key，请不要截图发给别人；本应用不会读取或上传它。</div>';
    }
    html += '</div>';
    panel.innerHTML = html;
  }

  // 官方App类智能体：一键授权下载安装 + 按需配置模型
  function buildAppSetup(agent, pick, platformName) {
    var html = '<p class="setup-note">' + agent.setup_note + '</p>';
    html += buildInstallAuth(agent);

    if (agent.config === 'builtin') {
      html += '<div class="builtin-note">✅ 这款智能体自带官方模型：装好 → 登录账号 → 直接开工，不用 API Key，也不用再选模型。上面选的 API 模型对它不生效，想用 API 模型请切回 DeepSeek 官网等工具。</div>';
    } else if (agent.config === 'custom') {
      html += buildHermesConfig(agent);
    } else if (agent.config === 'advanced') {
      var key = getSetupKey();
      html +=
        '<div class="config-card">' +
          '<div class="config-card-title">第二步：一键部署模型（开发者预览版）</div>' +
          '<p class="config-card-desc">点下面按钮，自动把 Key 写入电脑环境变量、把模型和接口地址写入 Harness 的 settings.yaml；第一步安装完成后启动即自动选好模型。</p>' +
          '<div class="json-actions">';
      if (isNative()) {
        html += '<button type="button" class="setup-btn" onclick="App.nativeDeployHarness()">⚡ 一键部署 ' + escapeHtml(pick.model) + '（写 Key + 配置文件）</button>';
      } else {
        html += '<button type="button" class="setup-btn" onclick="App.downloadHarnessConfig()">⬇️ 下载一键部署文件（setx 命令 + settings.yaml）</button>';
      }
      html +=
            '<a href="https://deepseek.com/harness/" target="_blank" rel="noopener noreferrer" class="copy-btn as-link">官方主页</a>' +
            '<a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener noreferrer" class="copy-btn as-link">GitHub 文档</a>' +
          '</div>' +
        '</div>';
      if (pick.platform_id === 'doubao') {
        html += '<div class="setup-extra-tip">⚠️ 火山方舟需先在控制台「开通管理」开通模型，模型名可能要用控制台里的 Model ID。</div>';
      }
    }
    return html;
  }

  // 授权安装区（两步确认：第一次点=知情授权，第二次点=开始下载）
  function buildInstallAuth(agent) {
    // 桌面版：下载进度条 + 自动拉起安装器，用户只需在系统弹窗点「是」
    if (isNative()) {
      var installed = installedMap[agent.id];
      var autoCapable = !!(agent.installer) || agent.id === 'workbuddy' || agent.id === 'openclaw';
      var btnText = autoCapable ? '⚡ 授权后一键下载并安装' : '🔗 打开官方下载页（厂商安全策略）';
      var htmlN = '<div class="install-auth">';
      if (installed) {
        htmlN +=
          '<div class="install-auth-title">✅ 已检测到「' + escapeHtml(agent.name) + '」装在这台电脑</div>' +
          '<p class="install-auth-desc">不用重装，直接打开就能用。想重装也可以点下面的按钮。</p>' +
          '<button type="button" class="setup-btn" onclick="App.nativeInstall(\'' + agent.id + '\')">' + btnText + '</button>';
      } else {
        htmlN +=
          '<div class="install-auth-title">⚡ 一键下载并自动安装</div>' +
          '<p class="install-auth-desc">点击后先请你<b>看一眼授权说明并确认</b>，然后自动从官方渠道取最新版、下载并拉起安装程序：你只需在系统弹窗点一下「是」。本应用不中转、不收集任何信息。</p>' +
          '<button type="button" class="setup-btn" onclick="App.nativeInstall(\'' + agent.id + '\')">' + btnText + '</button>';
      }
      htmlN += '</div>';
      return htmlN;
    }

    var confirmed = activeInstallConfirm() === agent.id;
    var html = '<div class="install-auth">';
    if (!confirmed) {
      html +=
        '<div class="install-auth-title">⚡ 一键下载安装（点击 = 授权）</div>' +
        '<p class="install-auth-desc">下面按钮会直接从<b>官方服务器</b>拉起安装包下载：本应用不中转、不收集你的任何信息。</p>' +
        '<button type="button" class="setup-btn" onclick="App.oneClickInstall(\'' + agent.id + '\')">授权并开始下载安装包</button>' +
        '<a class="setup-btn as-link" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">备用入口：打开官方下载页</a>';
    } else {
      html +=
        '<div class="install-auth-title">✅ 已授权，正在拉起官方安装包…</div>' +
        '<p class="install-auth-desc">如果浏览器没有自动开始下载，点下面的按钮重试。</p>' +
        '<a class="setup-btn as-link" href="' + (agent.installer || agent.url) + '" target="_blank" rel="noopener noreferrer">下载安装包（官方直链）</a>' +
        '<a class="setup-btn as-link" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">打开官方下载页</a>';
    }
    html += buildInstallSteps();
    html += '</div>';
    return html;
  }

  // 安装三步指引
  function buildInstallSteps() {
    return '<div class="install-steps">' +
      '<div class="install-steps-title">下载完成后，装起来只要三步：</div>' +
      '<div class="install-step"><span class="step-num">1</span>打开浏览器右上角「下载」列表，双击刚下载的安装包</div>' +
      '<div class="install-step"><span class="step-num">2</span>一路点「下一步」完成安装（约 1 分钟）</div>' +
      '<div class="install-step"><span class="step-num">3</span>打开软件，登录账号就能用</div>' +
      '<div class="install-tip">若 Windows 弹出「已保护你的电脑」，点「更多信息 → 仍要运行」（官方软件的正常提示）。</div>' +
    '</div>';
  }

  // 一键安装：第一次点击=授权确认，第二次点击=拉起官方安装包下载
  function oneClickInstall(agentId) {
    var agent = getAgentById(agentId);
    if (!agent) return;
    if (activeInstallConfirm() !== agentId) {
      setActiveInstallConfirm(agentId);
      refreshActiveDeploy();
      toast('已授权，再点一次按钮即开始下载');
      return;
    }
    window.open(agent.installer || agent.url, '_blank', 'noopener');
    setActiveInstallConfirm(null);
    refreshActiveDeploy();
    toast('已开始下载，去浏览器「下载」列表查看');
  }

  // 桌面版：统一的「客户授权确认」弹窗
  function closeAuthModal() {
    var m = document.getElementById('auth-modal');
    if (m && m.parentNode) m.parentNode.removeChild(m);
  }

  function showAuthModal(opts) {
    closeAuthModal();
    var box = document.createElement('div');
    box.id = 'auth-modal';
    box.className = 'auth-modal-mask';
    box.innerHTML =
      '<div class="auth-modal" role="dialog" aria-modal="true">' +
        '<div class="auth-modal-title">' + escapeHtml(opts.title) + '</div>' +
        '<div class="auth-modal-body">' + (opts.bodyHtml || '') + '</div>' +
        '<div class="auth-modal-actions">' +
          '<button type="button" class="auth-btn cancel" id="auth-cancel">取消</button>' +
          '<button type="button" class="auth-btn ok" id="auth-ok">' + escapeHtml(opts.confirmText || '确认授权') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(box);
    box.querySelector('#auth-cancel').onclick = function () {
      closeAuthModal();
      if (opts.onCancel) opts.onCancel();
    };
    box.querySelector('#auth-ok').onclick = function () {
      if (opts.onConfirm) opts.onConfirm(box);
    };
  }

  // 让弹窗进入「处理中」状态（换文案、禁用按钮）
  function setAuthModalBusy(box, text) {
    if (!box) return;
    var body = box.querySelector('.auth-modal-body');
    if (body) body.innerHTML = '<div class="auth-busy"><span class="auth-spinner"></span>' + escapeHtml(text) + '</div>';
    box.querySelectorAll('.auth-btn').forEach(function (b) { b.disabled = true; });
  }

  // 桌面版：下载官方安装包（带进度条）并自动拉起安装器
  async function nativeInstall(agentId) {
    if (guardTrialFeature()) return;
    var agent = getAgentById(agentId);
    if (!agent || !nativeApi || sceneState._natInstBusy) return;

    // DeepSeek Harness：官方分发方式是 npm 命令，自动在可见终端里执行
    if (agent.npm) {
      var nodeRes = await nativeApi.check_command('node');
      if (nodeRes && typeof nodeRes === 'string') { try { nodeRes = JSON.parse(nodeRes); } catch (e) {} }
      var hasNode = nodeRes && nodeRes.path;
      if (!hasNode) {
        showAuthModal({
          title: '授权安装「' + agent.name + '」',
          bodyHtml:
            '<p>它是 DeepSeek 官方的开发者工具，需要先装免费的 <b>Node.js</b>（官方运行环境，约 30MB）。</p>' +
            '<p>点「确认授权」后，自动打开 Node.js 官网下载页——下载页上点一下 <b>LTS 大按钮</b>，装好后回到本页面再点一次安装即可。</p>' +
            '<p class="auth-tip">全程只连官方网站：nodejs.org</p>',
          confirmText: '确认，去装 Node.js',
          onConfirm: function (box) {
            setAuthModalBusy(box, '正在打开 Node.js 官网…');
            nativeApi.open_url('https://nodejs.org/zh-cn/download');
            setTimeout(closeAuthModal, 1500);
          }
        });
        return;
      }
      showAuthModal({
        title: '授权安装「' + agent.name + '」',
        bodyHtml:
          '<p>已检测到电脑装有 Node.js。点「确认授权」后，会弹出一个<b>黑色终端窗口</b>，自动执行官方命令：</p>' +
          '<div class="auth-cmd">npx -y ' + escapeHtml(agent.npm) + ' web</div>' +
          '<p>首次运行会自动从官方 npm 源下载（约 1~3 分钟），窗口里能看到全部过程；出现 Harness 界面即安装成功。</p>' +
          '<p class="auth-tip">只执行 DeepSeek 官方包：' + escapeHtml(agent.npm) + '</p>',
        confirmText: '确认授权并执行',
        onConfirm: function (box) {
          setAuthModalBusy(box, '正在启动官方安装命令…');
          nativeApi.open_terminal_run('npx -y ' + agent.npm + ' web');
          setTimeout(closeAuthModal, 1500);
          toast('已在终端窗口开始安装，请看弹出的黑窗口');
        }
      });
      return;
    }

    // 普通安装包类：弹窗确认 → 解析官方最新版 → 下载 → 拉起安装器
    var autoCapable = !!(agent.installer) || agentId === 'workbuddy' || agentId === 'openclaw';
    var bodyHtml =
      '<p>点「确认授权」后，本应用会自动完成：</p>' +
      '<ol class="auth-steps">' +
        '<li>从<b>官方渠道</b>获取最新版安装包</li>' +
        '<li>下载到电脑「下载」文件夹（页面上显示下载进度）</li>' +
        '<li>自动打开安装程序，你只需在系统弹窗点一下「是」，再一路「下一步」</li>' +
      '</ol>' +
      '<p class="auth-tip">只连官方服务器，不中转、不收集任何信息；你可以随时取消。</p>';
    if (!autoCapable) {
      bodyHtml =
        '<p>这款软件的官方下载页必须本人访问（官方安全策略），暂时无法在应用内直接取包。</p>' +
        '<p>点「确认授权」后，自动打开<b>官方下载页</b>，在页面上点一下下载按钮即可——这是该厂商目前唯一的官方下载方式。</p>' +
        '<p class="auth-tip">只打开官方网站，不经过任何第三方。</p>';
    }

    showAuthModal({
      title: '授权安装「' + agent.name + '」',
      bodyHtml: bodyHtml,
      confirmText: autoCapable ? '确认授权，一键安装' : '确认，打开官方下载页',
      onConfirm: async function (box) {
        sceneState._natInstBusy = true;
        try {
          if (!autoCapable) {
            await nativeApi.open_url(agent.url);
            closeAuthModal();
            toast('已打开官方下载页，请在页面里点下载按钮');
            return;
          }
          setAuthModalBusy(box, '正在从官方渠道获取最新版安装包…');
          var res = await nativeApi.resolve_installer(agentId, agent.installer || '', agent.url || '');
          if (res && typeof res === 'string') { try { res = JSON.parse(res); } catch (e) {} }
          if (!res || !res.ok) {
            if (res && res.open_page) {
              await nativeApi.open_url(res.open_page);
              closeAuthModal();
              toast('官方直链暂不可用，已打开官网下载页');
              return;
            }
            closeAuthModal();
            toast((res && res.error) || '获取下载地址失败');
            return;
          }
          setAuthModalBusy(box, '正在从官方服务器下载，进度请看页面下方…');
          var dl = await nativeApi.download_installer(res.url, agent.name);
          if (dl && typeof dl === 'string') { try { dl = JSON.parse(dl); } catch (e) {} }
          if (!dl || !dl.ok) {
            closeAuthModal();
            toast((dl && dl.error) || '下载失败');
            return;
          }
          closeAuthModal();
          var r2 = await nativeApi.run_installer(dl.path);
          if (r2 && r2.ok) {
            toast('安装器已启动：请在系统弹窗点「是」，然后一路「下一步」');
          } else {
            toast((r2 && r2.error) || '请到「下载」文件夹双击安装包');
          }
        } finally {
          sceneState._natInstBusy = false;
        }
      }
    });
  }

  // Hermes：官方桌面版四格信息（OpenAI 兼容接入）
  function buildHermesConfig(agent) {
    var pick = activeDeployPick();
    if (!pick) return '';
    var config = getModelConfig(pick.platform_id);
    var baseUrl = config ? config.base_url : '';
    var key = getSetupKey();

    var html = '<div class="config-card"><div class="config-card-title">第二步：一键部署模型到 Hermes</div>';
    html += '<p class="config-card-desc">点下面按钮，自动把 Key 写进 Hermes 的 .env、模型和提供商写进 config.yaml，不用手动填。</p>';
    html += '<div class="json-actions">';
    if (isNative()) {
      html += '<button type="button" class="setup-btn" onclick="App.nativeDeployHermes()">⚡ 一键部署 ' + escapeHtml(pick.model) + ' 到 Hermes（全自动）</button>';
    } else {
      html += '<button type="button" class="setup-btn" onclick="App.downloadHermesConfig()">⬇️ 下载一键部署文件（内含 .env / config.yaml 和放置路径）</button>';
    }
    html += '</div></div>';

    var fields = [
      { label: '服务商类型', value: 'OpenAI 兼容（Custom / OpenAI Compatible）' },
      { label: 'API 地址（base_url，接口网址）', value: baseUrl },
      { label: 'API Key（钥匙）', value: key || '先在上面粘好 Key，再点复制' },
      { label: '模型名（模型代号）', value: pick.model }
    ];
    html += '<div class="config-card"><div class="config-card-title">备选：手动照着填进 Hermes 设置</div>';
    fields.forEach(function (f) {
      html +=
        '<div class="field-row">' +
          '<div class="field-label">' + f.label + '</div>' +
          '<div class="field-value-wrap">' +
            '<span class="field-value">' + escapeHtml(f.value) + '</span>' +
            '<button type="button" class="copy-btn" onclick="App.copySibling(this)">复制</button>' +
          '</div>' +
        '</div>';
    });
    html += '</div>';
    html += '<div class="setup-extra-tip">不想折腾？Hermes 里也可以直接选内置服务商（Nous / OpenRouter），那是账号订阅计费，和这里的 API 计费互相独立。</div>';
    return html;
  }

  // Hermes 各平台对应的官方提供商与环境变量名
  function getHermesSpec(pick) {
    var cfg = getModelConfig(pick.platform_id);
    var map = {
      deepseek: { env: 'DEEPSEEK_API_KEY', provider: 'deepseek' },
      zhipu: { env: 'GLM_API_KEY', provider: 'zai' },
      aliyun: { env: 'DASHSCOPE_API_KEY', provider: 'alibaba' },
      tencent: { env: 'TOKENHUB_API_KEY', provider: 'tencent-tokenhub' }
    };
    var m = map[pick.platform_id] || { env: 'OPENAI_API_KEY', provider: 'custom' };
    return {
      env_name: m.env,
      provider: m.provider,
      base_url: cfg ? cfg.base_url : '',
      model: pick.model
    };
  }

  // 桌面版：Hermes 一键部署
  async function nativeDeployHermes() {
    if (guardTrialFeature()) return;
    var pick = activeDeployPick();
    if (!pick) return;
    var key = getSetupKey();
    if (!key) { toast('先在上面粘好 API Key，再点一键部署'); return; }
    var spec = getHermesSpec(pick);
    spec.key = key;
    var res = await nativeApi.deploy_hermes(JSON.stringify(spec));
    if (res && res.ok) {
      toast('✓ 已写入 Hermes 配置，打开 Hermes 即可用该模型');
      if (res.conflict) toast('检测到你之前配过模型，请在 Hermes 设置里确认当前模型');
    } else {
      toast((res && res.error) || '部署失败，请重试');
    }
  }

  // 桌面版：DeepSeek Harness 一键部署（Key 进环境变量，提供商进 settings.yaml）
  async function nativeDeployHarness() {
    if (guardTrialFeature()) return;
    var pick = activeDeployPick();
    if (!pick) return;
    var key = getSetupKey();
    if (!key) { toast('先在上面粘好 API Key，再点一键部署'); return; }
    var cfg = getModelConfig(pick.platform_id);
    var spec = { key: key, base_url: cfg ? cfg.base_url : '', model: pick.model };
    var res = await nativeApi.deploy_dsh(JSON.stringify(spec));
    if (res && res.ok) {
      toast('✓ Key 和模型配置已写入，点上面的「一键安装并启动」即可打开');
    } else {
      toast((res && res.error) || '部署失败，请重试');
    }
  }

  // 网页版：下载 Hermes 部署说明（.env + config.yaml 内容与路径）
  function downloadHermesConfig() {
    var pick = activeDeployPick();
    if (!pick) return;
    var key = getSetupKey();
    if (!key) { toast('先在上面填好 API Key'); return; }
    var spec = getHermesSpec(pick);
    var yaml =
      'model:\n' +
      '  provider: "' + spec.provider + '"\n' +
      (spec.provider === 'custom' ? '  base_url: "' + spec.base_url + '"\n' : '') +
      '  default: "' + spec.model + '"';
    var txt =
      '小白AI管家 · Hermes 一键部署说明\n' +
      '============================================\n' +
      '在电脑用户文件夹（C:\\Users\\你的用户名\\）下新建 .hermes 文件夹，把下面两段分别存成文件：\n\n' +
      '【文件 1，文件名：.env】\n' +
      spec.env_name + '=' + key + '\n\n' +
      '【文件 2，文件名：config.yaml】\n' +
      yaml + '\n\n' +
      '存好后打开 Hermes 即可；已有这两个文件就把对应内容替换进去（保留其它行）。\n';
    downloadTextFile(txt, 'Hermes一键部署说明.txt');
  }

  // 网页版：下载 Harness 部署说明（setx 命令 + settings.yaml）
  function downloadHarnessConfig() {
    var pick = activeDeployPick();
    if (!pick) return;
    var key = getSetupKey();
    if (!key) { toast('先在上面填好 API Key'); return; }
    var cfg = getModelConfig(pick.platform_id);
    var yaml =
      'agent-default-model:\n' +
      '  provider: xiaobai\n' +
      '  model: "' + pick.model + '"\n' +
      'llm-pi-ai:\n' +
      '  providers:\n' +
      '    xiaobai:\n' +
      '      api: openai-completions\n' +
      '      baseURL: "' + cfg.base_url + '"\n' +
      '      apiKeyEnv: "XIAOBAI_API_KEY"\n' +
      '      models:\n' +
      '        - id: "' + pick.model + '"\n';
    var txt =
      '小白AI管家 · DeepSeek Harness 一键部署说明\n' +
      '============================================\n' +
      '第一步：在 PowerShell 里粘贴执行（把 Key 写入用户环境变量）：\n' +
      'setx XIAOBAI_API_KEY "' + key + '"\n\n' +
      '第二步：在电脑用户文件夹（C:\\Users\\你的用户名\\）下新建 .dsh 文件夹，\n' +
      '把下面内容存成文件 settings.yaml 放进去：\n\n' +
      yaml + '\n' +
      '第三步：执行 npx @deepseek-ai/dsh web 启动，浏览器打开 http://127.0.0.1:3080\n';
    downloadTextFile(txt, 'Harness一键部署说明.txt');
  }

  // OpenClaw：官方 Hub 应用安装 + 授权一键写入模型配置
  function buildOpenclawSetup(agent, pick) {
    var html = '<p class="setup-note">' + agent.setup_note + '</p>';

    // ① 安装
    if (isNative()) {
      html +=
        '<div class="os-block">' +
          '<div class="os-title">① 安装 OpenClaw（官方脚本，国内可快速下载）</div>' +
          '<p class="config-card-desc">点击后弹出<b>蓝色 PowerShell 窗口</b>，自动执行官方安装脚本：它会从 openclaw.ai / nodejs.org 下载便携版运行环境并装好 OpenClaw，全程可见、约 3~8 分钟，<b>期间不要关那个窗口</b>。</p>' +
          '<button type="button" class="setup-btn" onclick="App.nativeInstallOpenclaw()">⚡ 授权后一键安装（官方脚本）</button>' +
          '<div class="setup-sub">手动备选（GitHub 的 121MB 安装包国内下载很慢，可能要一个多小时，不推荐）：</div>' +
          '<a class="copy-btn as-link" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">打开官方 Windows 安装指南</a>' +
          cmdBlock('或自己在 PowerShell 粘贴这一条（和按钮执行的完全一样）', 'iwr -useb https://openclaw.ai/install.ps1 | iex') +
        '</div>';
    } else {
      html +=
        '<div class="os-block">' +
          '<div class="os-title">① 安装 OpenClaw（官方推荐：Windows Hub 桌面应用，不用碰终端）</div>' +
          '<a class="setup-btn as-link" href="' + agent.url + '" target="_blank" rel="noopener noreferrer">打开官方 Windows 安装指南</a>' +
          '<div class="setup-sub">习惯终端的话，也可以在 PowerShell 里粘贴这一条（可选）：</div>' +
          cmdBlock('PowerShell 一键安装（可选）', 'iwr -useb https://openclaw.ai/install.ps1 | iex') +
        '</div>';
    }

    // ② 模型一键部署
    var key = getSetupKey();
    html += '<div class="os-block"><div class="os-title">② 一键部署模型（写入官方配置文件 openclaw.json）</div>';
    if (pick.platform_id === 'doubao') {
      html += '<div class="setup-extra-tip">⚠️ 火山方舟需先在控制台「开通管理」开通模型，模型名可能要用控制台里的 Model ID。</div>';
    }
    if (!key) {
      html += '<div class="setup-extra-tip">先在上面粘好 API Key，再点下面的按钮。</div>';
      html += '<button type="button" class="setup-btn" disabled>⚡ 一键部署 ' + escapeHtml(pick.model) + '</button>';
    } else if (isNative()) {
      // 桌面版：不需要选文件夹，直接写入配置文件
      html +=
        '<p class="install-auth-desc">点击 = 授权本应用把模型配置<b>直接写入</b> OpenClaw 的配置文件（若已有同名文件会被覆盖）。</p>' +
        '<button type="button" class="setup-btn" onclick="App.nativeDeployOpenclaw()">⚡ 一键部署 ' + escapeHtml(pick.model) + '（全自动）</button>';
    } else if (!activeDeployConfirm()) {
      html +=
        '<p class="install-auth-desc">点击 = 授权本应用把模型配置写进 OpenClaw 的配置文件：弹窗里选中电脑里的 <code>.openclaw</code> 文件夹即可（若已有同名配置会被覆盖）。</p>' +
        '<button type="button" class="setup-btn" onclick="App.deployOpenclawConfig()">⚡ 授权并一键部署 ' + escapeHtml(pick.model) + '</button>';
    } else {
      html +=
        '<p class="install-auth-desc">在弹出的窗口里选中 <code>.openclaw</code> 文件夹（一般在 C:\\Users\\你的用户名\\.openclaw），点「选择文件夹」即可写入。</p>' +
        '<button type="button" class="setup-btn" onclick="App.deployOpenclawConfig()">📂 打开文件夹选择窗口</button>';
    }
    if (!isNative()) {
      html +=
        '<div class="setup-sub">浏览器不支持直接写入？改为下载配置文件，手动放进 .openclaw 文件夹也一样：</div>' +
        '<button type="button" class="copy-btn as-link" onclick="App.deployOpenclawConfig(true)">⬇️ 下载 openclaw.json</button>';
    }
    html +=
      '<div class="setup-sub">写好后重启 OpenClaw（终端执行 openclaw gateway restart，或在 Hub 应用里重启），即可用上 ' + escapeHtml(pick.model) + '。</div>';
    html += '</div>';
    return html;
  }

  // 桌面版：一键执行 OpenClaw 官方 install.ps1（openclaw.ai 国内可快速下载）
  function nativeInstallOpenclaw() {
    if (!nativeApi) return;
    if (guardTrialFeature()) return;
    showAuthModal({
      title: '授权安装「OpenClaw（开源智能体）」',
      bodyHtml:
        '<p>点「确认授权」后，会自动弹出一个<b>蓝色 PowerShell 窗口</b>，执行 OpenClaw 官方安装命令：</p>' +
        '<div class="auth-cmd">iwr -useb https://openclaw.ai/install.ps1 | iex</div>' +
        '<ol class="auth-steps">' +
          '<li>脚本从 openclaw.ai、nodejs.org 等<b>官方地址</b>下载便携运行环境（国内速度快）</li>' +
          '<li>自动完成安装，蓝窗口里能看到每一步</li>' +
          '<li>看到绿色成功提示后，回到本页面继续第②步「一键部署模型」</li>' +
        '</ol>' +
        '<p class="auth-tip">这就是你手动能用的那条官方命令；若窗口中途询问 Y/N，按一下 Y 再回车即可。全程不经过任何第三方。</p>',
      confirmText: '确认授权并执行',
      onConfirm: async function (box) {
        setAuthModalBusy(box, '正在启动官方安装脚本（请看弹出的蓝色窗口）…');
        var res = await nativeApi.install_openclaw();
        if (res && typeof res === 'string') { try { res = JSON.parse(res); } catch (e) {} }
        closeAuthModal();
        if (res && res.ok) {
          toast('官方安装已在蓝色窗口开始，装完别关窗口，回这里做第②步');
        } else {
          toast((res && res.error) || '启动失败，可复制下面的命令手动执行');
        }
      }
    });
  }

  // 桌面版：直接把模型配置写进 ~/.openclaw/openclaw.json（不用选文件夹）
  async function nativeDeployOpenclaw() {
    if (guardTrialFeature()) return;
    var pick = activeDeployPick();
    if (!pick || !nativeApi) return;
    var key = getSetupKey();
    if (!key) {
      toast('请先把 Key 粘到上面的输入框');
      return;
    }
    var res = await nativeApi.save_config('openclaw', 'openclaw.json', buildOpenclawConfig(pick, key));
    if (res && res.ok) {
      toast('✅ 已写入 ' + res.path + '，重启 OpenClaw 生效');
    } else {
      toast((res && res.error) || '写入失败');
    }
  }

  // 生成 OpenClaw 官方格式的模型配置（schema 见 docs.openclaw.ai 配置指南）
  function buildOpenclawConfig(pick, key) {
    var config = getModelConfig(pick.platform_id);
    var baseUrl = config ? config.base_url : '';
    if (pick.platform_id === 'deepseek') {
      baseUrl = 'https://api.deepseek.com/v1'; // OpenClaw 走 OpenAI 兼容协议
    }
    var num = parseFloat(String(pick.context || '').replace(/[^\d.]/g, ''));
    var modelEntry = { id: pick.model, name: pick.model, maxTokens: 8192 };
    if (!isNaN(num) && num > 0) {
      modelEntry.contextWindow = Math.round(num * 10000); // “12.8万字”→128000
    }
    var obj = {
      models: { mode: 'merge', providers: {} },
      agents: { defaults: { model: { primary: pick.platform_id + '/' + pick.model } } }
    };
    obj.models.providers[pick.platform_id] = {
      baseUrl: baseUrl,
      apiKey: key,
      api: 'openai-completions',
      models: [modelEntry]
    };
    return JSON.stringify(obj, null, 2);
  }

  // OpenClaw 模型一键部署：授权后直接写入 .openclaw 文件夹（不支持时退化为下载）
  async function deployOpenclawConfig(forceDownload) {
    var pick = activeDeployPick();
    if (!pick) return;
    var key = getSetupKey();
    if (!key) {
      toast('请先把 Key 粘到上面的输入框');
      return;
    }
    var jsonStr = buildOpenclawConfig(pick, key);

    if (forceDownload) {
      downloadTextFile(jsonStr, 'openclaw.json', 'application/json');
      toast('已下载，把它放进 .openclaw 文件夹（覆盖同名文件）');
      return;
    }

    // 两步授权：第一次点击=知情确认
    if (!activeDeployConfirm()) {
      setActiveDeployConfirm(true);
      refreshActiveDeploy();
      return;
    }

    if (typeof window.showDirectoryPicker === 'function') {
      try {
        var dir = await window.showDirectoryPicker({ mode: 'readwrite' });
        var fileHandle = await dir.getFileHandle('openclaw.json', { create: true });
        var writable = await fileHandle.createWritable();
        await writable.write(jsonStr);
        await writable.close();
        toast('✅ 已写入 openclaw.json，重启 OpenClaw 生效');
      } catch (e) {
        if (e && e.name === 'AbortError') return; // 用户取消，不提示
        downloadTextFile(jsonStr, 'openclaw.json', 'application/json');
        toast('写入失败，已改为下载配置文件');
      }
    } else {
      downloadTextFile(jsonStr, 'openclaw.json', 'application/json');
      toast('当前浏览器不支持直接写入，已改为下载');
    }
    setActiveDeployConfirm(false);
    refreshActiveDeploy();
  }

  // 图形界面智能体：四格信息复制
  function buildGuiSetup(agent, pick, platformName) {
    var config = getModelConfig(pick.platform_id);
    var baseUrl = config ? config.base_url : '';
    var providerName = config ? config.provider_name : platformName;
    var key = getSetupKey();

    var html = '<p class="setup-note">' + agent.setup_note + '</p>';

    if (pick.platform_id === 'doubao') {
      html += '<div class="setup-extra-tip">⚠️ 火山方舟要先在控制台「开通管理」里开通对应模型；如果客户端提示找不到模型，请把控制台里该模型的 Model ID（模型代号）复制到「模型名」这一格。</div>';
    }

    var fields = [
      { label: '服务商名称', value: providerName },
      { label: 'API 地址（base_url，接口网址）', value: baseUrl },
      { label: 'API Key（钥匙）', value: key || '先在上面粘好 Key，再点复制' },
      { label: '模型名（模型代号）', value: pick.model }
    ];
    html += '<div class="config-card">';
    fields.forEach(function (f) {
      html +=
        '<div class="field-row">' +
          '<div class="field-label">' + f.label + '</div>' +
          '<div class="field-value-wrap">' +
            '<span class="field-value">' + escapeHtml(f.value) + '</span>' +
            '<button type="button" class="copy-btn" onclick="App.copySibling(this)">复制</button>' +
          '</div>' +
        '</div>';
    });
    html += '</div>';

    // Cherry Studio 支持导入配置：直接下载一键配置文件，免手动填四格
    if (agent.id === 'cherry-studio') {
      html +=
        '<div class="json-actions">' +
          '<button type="button" class="copy-btn primary" onclick="App.downloadSceneConfig(\'cherry\')">⬇️ 下载一键导入配置文件（Cherry Studio 模型服务页直接导入）</button>' +
        '</div>';
    }

    html += '<div class="config-card"><a href="' + agent.url + '" target="_blank" rel="noopener noreferrer" class="download-link">还没装 ' + agent.name + '？去官方下载 →</a></div>';
    return html;
  }

  // 终端智能体（aider）：给出 Windows / Mac 的 Key 设置命令、启动命令和一键脚本
  function buildCliSetup(agent, pick) {
    var spec = getAiderSpec(pick);
    var key = getSetupKey() || '把你的Key粘到这里';

    var winSet = 'setx ' + spec.env + ' "' + key + '"';
    var winLaunch = spec.launch;
    var macSet = 'echo \'export ' + spec.env + '="' + key + '"\' >> ~/.zshrc  &&  source ~/.zshrc';
    var macLaunch = spec.launch;

    var bat =
      '@echo off\r\n' +
      'chcp 65001 >nul\r\n' +
      'echo ============================================\r\n' +
      'echo   小白AI管家 一键设置 ' + agent.name + '\r\n' +
      'echo ============================================\r\n' +
      'setx ' + spec.env + ' "' + key + '" >nul\r\n' +
      'set ' + spec.env + '=' + key + '\r\n' +
      'echo Key 已写入这台电脑，正在启动智能体并自动选好模型...\r\n' +
      winLaunch + '\r\n' +
      'pause\r\n';

    var html = '<p class="setup-note">' + agent.setup_note + '</p>';

    // 桌面版：一键写环境变量，替代 setx 命令和 bat 脚本
    if (isNative()) {
      html +=
        '<div class="install-auth">' +
          '<div class="install-auth-title">⚡ 一键把 Key 写进电脑（不用终端）</div>' +
          '<p class="install-auth-desc">点下面的按钮 = 授权本应用把 Key 存成这台电脑的用户环境变量（相当于自动执行 setx），之后打开 aider 就能直接用。</p>' +
          '<button type="button" class="setup-btn" onclick="App.nativeSetAiderKey()">把 Key 写入电脑（' + escapeHtml(spec.env) + '）</button>' +
        '</div>';
    }

    html += cmdBlock('① 先装一次（已装过请跳过）', 'python -m pip install aider-install && aider-install');

    html += '<div class="os-block">';
    html += '<div class="os-title">🪟 Windows 电脑（推荐：下载一键脚本，双击就行）</div>';
    html +=
      '<div class="json-actions">' +
        '<button type="button" class="copy-btn primary" onclick="App.downloadSceneConfig(\'bat\')">⬇️ 下载一键设置脚本（双击运行）</button>' +
      '</div>';
    html += '<div class="setup-sub">或者自己在终端（PowerShell / 命令提示符）里分两步粘贴：</div>';
    html += cmdBlock('第 1 步：把 Key 写进电脑（只需做一次，新窗口生效）', winSet);
    html += cmdBlock('第 2 步：打开智能体（已自动选好模型，以后每次也是这一条）', winLaunch);
    html += '</div>';

    html += '<div class="os-block">';
    html += '<div class="os-title">🍎 Mac 电脑（打开「终端」App，整段粘贴后回车）</div>';
    html += cmdBlock('第 1 步：把 Key 写进电脑（只需做一次）', macSet);
    html += cmdBlock('第 2 步：打开智能体（已自动选好模型）', macLaunch);
    html += '</div>';

    html +=
      '<div class="config-card"><p class="config-card-desc">脚本和命令做了两件事：①把 Key 存成这台电脑的环境变量（就像把门钥匙放进玄关抽屉）；②用 <code>' + escapeHtml(spec.launch) + '</code> 启动智能体并指定模型，所以你打开就能直接用，不用再手动选模型。</p></div>';

    // 暂存本次命令文本，供复制与下载使用（场景面板 / 配置页各存各的）
    activeBat(bat);
    if (sceneState.setupOpen) sceneState._env = spec.env;
    else cfgDeploy._env = spec.env;
    return html;
  }

  // aider 不同平台的环境变量名与启动参数
  function getAiderSpec(pick) {
    if (pick.platform_id === 'deepseek') {
      return { env: 'DEEPSEEK_API_KEY', launch: 'aider --model deepseek/' + pick.model };
    }
    if (pick.platform_id === 'zhipu') {
      return { env: 'ZHIPUAI_API_KEY', launch: 'aider --model zhipu/' + pick.model };
    }
    // 火山方舟 / 阿里 / 百度 / 腾讯等均走 OpenAI 兼容接口，用各平台自己的 base_url
    var config = getModelConfig(pick.platform_id);
    return {
      env: 'OPENAI_API_KEY',
      launch: 'aider --model openai/' + pick.model + ' --openai-api-base ' + (config ? config.base_url : '')
    };
  }

  // 桌面版：一键把 Key 写成用户环境变量（替代 setx / bat 脚本）
  async function nativeSetAiderKey() {
    if (guardTrialFeature()) return;
    if (!nativeApi) return;
    var pick = activeDeployPick();
    if (!pick) return;
    var spec = getAiderSpec(pick);
    var key = getSetupKey();
    if (!key) {
      toast('请先把 Key 粘到上面的输入框');
      return;
    }
    var res = await nativeApi.set_env(spec.env, key);
    if (res && res.ok) {
      toast('✅ Key 已写入电脑：重新打开的 aider 就能读到');
    } else {
      toast((res && res.error) || '写入失败');
    }
  }

  // 网页版智能体：不用 Key，登录即用
  function buildWebSetup(agent) {
    return '<p class="setup-note">' + agent.setup_note + '</p>' +
      '<a href="' + agent.url + '" target="_blank" rel="noopener noreferrer" class="setup-btn as-link">🔗 打开「' + agent.name + '」（新窗口）</a>' +
      '<div class="setup-extra-tip">网页版按账号里的免费点数或网页充值计费，和 API Key 是两套独立的费用，互不影响。</div>';
  }

  // 构建一条「标题 + 命令 + 复制按钮」的命令块
  function cmdBlock(title, command) {
    return '<div class="cmd-block">' +
      '<div class="cmd-title">' + title + '</div>' +
      '<div class="cmd-row">' +
        '<code class="cmd-code">' + escapeHtml(command) + '</code>' +
        '<button type="button" class="copy-btn" onclick="App.copySibling(this)">复制</button>' +
      '</div>' +
    '</div>';
  }

  // 读取当前部署面板里输入的 Key（场景面板读 scene-setup-key，配置页读 config-key）
  function getSetupKey() {
    var id = sceneState.setupOpen ? 'scene-setup-key' : 'config-key';
    var input = document.getElementById(id);
    return input ? input.value.trim() : '';
  }

  // Key 输入时实时刷新设置面板里的命令/配置
  function onSceneKeyInput() {
    var pick = getCurrentPick();
    if (!pick) return;
    saveApiKey(pick.platform_id, getSetupKey());
    renderDeployPanel();
    // 重新渲染后输入框会失焦，把焦点放回末尾
    var input = document.getElementById('scene-setup-key');
    if (input) {
      input.focus();
      var len = input.value.length;
      try { input.setSelectionRange(len, len); } catch (e) {}
    }
  }

  // 设置面板里 Key 的显示/隐藏
  function sceneToggleKey() {
    sceneState.showKey = !sceneState.showKey;
    renderDeployPanel();
    var input = document.getElementById('scene-setup-key');
    if (input) {
      input.focus();
      var len = input.value.length;
      try { input.setSelectionRange(len, len); } catch (e) {}
    }
  }

  // 复制同级的文本（命令块 / 四格信息通用）
  function copySibling(btnEl) {
    var target = btnEl.parentNode.querySelector('.cmd-code') || btnEl.parentNode.querySelector('.field-value');
    if (!target) {
      toast('没有可复制的内容');
      return;
    }
    copyText(target.textContent).then(function (ok) {
      if (ok) {
        var original = btnEl.textContent;
        btnEl.textContent = '✓ 已复制';
        setTimeout(function () { btnEl.textContent = original; }, 1500);
      } else {
        toast('复制失败，请手动选中复制');
      }
    });
  }

  // 设置面板的文件下载（Cherry 配置 JSON / Windows 一键 bat 脚本）
  function downloadSceneConfig(kind) {
    var pick = activeDeployPick();
    var agent = activeDeployAgent();
    if (!pick || !agent) return;

    if (kind === 'bat') {
      var bat = activeBat() || '';
      if (bat.indexOf('把你的Key粘到这里') >= 0) {
        toast('请先把 Key 粘到上面的输入框');
        return;
      }
      downloadTextFile(bat, 'setup-aider-' + pick.platform_id + '.bat', 'text/plain;charset=utf-8');
      toast('脚本已下载，双击运行即可');
      return;
    }

    var config = getModelConfig(pick.platform_id);
    var key = getSetupKey();
    if (!key) {
      toast('请先把 Key 粘到上面的输入框');
      return;
    }
    var importJson = {
      providers: [{
        id: pick.platform_id,
        name: config ? config.provider_name : pick.platform_id,
        type: pick.platform_id,
        apiKey: key,
        baseURL: config ? config.base_url : '',
        models: [{ id: pick.model, name: pick.model }]
      }]
    };
    downloadTextFile(JSON.stringify(importJson, null, 2), 'cherry-studio-config.json', 'application/json');
    toast('配置文件已下载，去 Cherry Studio 里导入');
  }

  // 下载任意文本文件（JSON / bat 等）
  function downloadTextFile(content, filename, mime) {
    try {
      var blob = new Blob([content], { type: mime || 'text/plain' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast('下载失败，请改用复制');
    }
  }

  /* ---------- 申请 Key 引导页 ---------- */

  var currentApplyPlatform = null; // 当前正在申请的平台 id

  // 从平台页/场景页点击「去申请 Key」进入引导页
  function goApply(platformId) {
    currentApplyPlatform = platformId;
    switchPage('page-apply');
    renderApplyGuide(platformId);
  }

  // 渲染申请引导页（标题 + 打开官方页按钮 + 图文教程 + 下一步 + FAQ）
  function renderApplyGuide(platformId) {
    var platform = getPlatformById(platformId);
    var tutorial = getTutorial(platformId);
    if (!platform || !tutorial) {
      var err = document.getElementById('apply-content');
      if (err) err.innerHTML = '<div class="empty-state"><div class="ph-desc">未找到该平台的申请教程</div></div>';
      return;
    }

    // 标题
    var titleEl = document.getElementById('apply-title');
    if (titleEl) titleEl.textContent = '申请 ' + platform.name + ' 的 Key，跟着做就行';

    // 打开官方申请页按钮
    var applyBtn = document.getElementById('open-apply-btn');
    if (applyBtn) {
      applyBtn.setAttribute('onclick', 'App.openExternal(\'' + tutorial.apply_url + '\')');
    }

    // 教程步骤
    var stepsContainer = document.getElementById('tutorial-steps');
    if (stepsContainer) stepsContainer.innerHTML = buildTutorialStepsHtml(platformId);

    // FAQ
    renderFaq('faq-list');
  }

  // 构建某个平台的 6 步教程 HTML（可复用：申请页、帮助页都用它）
  function buildTutorialStepsHtml(platformId) {
    var tutorial = getTutorial(platformId);
    if (!tutorial) return '<div class="ph-desc">未找到该平台的申请教程</div>';
    var html = '';
    if (tutorial.apply_url) {
      html += '<button class="open-apply-btn" onclick="App.openExternal(\'' + tutorial.apply_url + '\')">🔗 打开官方申请页</button>';
    }
    tutorial.steps.forEach(function (step) {
      var imgHtml = '';
      if (step.image) {
        imgHtml =
          '<figure class="step-figure">' +
            '<img src="' + step.image + '" alt="' + step.title + '" loading="lazy">' +
            (step.caption ? '<figcaption>' + step.caption + '</figcaption>' : '') +
          '</figure>';
      }
      html +=
        '<div class="tutorial-step">' +
          '<h3 class="step-title">' + step.title + '</h3>' +
          '<p class="step-text">' + step.text.replace(/\n/g, '<br>') + '</p>' +
          imgHtml +
        '</div>';
    });
    return html;
  }

  // 渲染常见问题折叠区（问题 → 一句话答案 → 详细步骤）
  function renderFaq(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var faq = getFaq();
    var html = '';
    faq.forEach(function (item, idx) {
      html +=
        '<div class="faq-item">' +
          '<button class="faq-q" onclick="App.toggleFaq(' + idx + ')">' +
            '<span class="faq-q-text">Q：' + item.q + '</span>' +
            '<span class="faq-arrow">▼</span>' +
          '</button>' +
          '<div class="faq-a" id="faq-a-' + idx + '">' +
            '<div class="faq-short">' + item.short_a + '</div>' +
            '<div class="faq-details">' + item.details.replace(/\n/g, '<br>') + '</div>' +
          '</div>' +
        '</div>';
    });
    container.innerHTML = html;
  }

  // 切换 FAQ 展开/收起
  function toggleFaq(idx) {
    var answer = document.getElementById('faq-a-' + idx);
    var arrow = document.querySelector('.faq-item:nth-child(' + (idx + 1) + ') .faq-arrow');
    if (!answer) return;
    var isOpen = answer.classList.toggle('open');
    if (arrow) arrow.textContent = isOpen ? '▲' : '▼';
  }

  /* ---------- 帮助页 ---------- */

  // 渲染帮助页：图文教程 + 常见问题 + 联系我们
  function renderHelpPage() {
    // 教程平台选择器
    var sel = document.getElementById('help-platform');
    if (sel) {
      var current = sel.value || 'deepseek';
      sel.innerHTML = '';
      getMvpPlatforms().forEach(function (p) {
        var opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        if (p.id === current) opt.selected = true;
        sel.appendChild(opt);
      });
    }
    // 默认渲染 DeepSeek 教程
    renderHelpTutorial('deepseek');
    // FAQ
    renderFaq('help-faq-list');
  }

  // 切换帮助页教程平台
  function switchHelpPlatform(platformId) {
    renderHelpTutorial(platformId);
  }

  // 渲染帮助页的图文教程
  function renderHelpTutorial(platformId) {
    var container = document.getElementById('help-tutorial');
    if (!container) return;
    container.innerHTML = buildTutorialStepsHtml(platformId);
  }

  /* ---------- 粘贴 Key → 生成配置页 ---------- */

  // ===== 一键粘贴：EXE 走 Python 原生剪贴板（绕开 WebView2 权限限制），网页走 Clipboard API =====
  async function readClipboardText() {
    // 桌面版：Python 侧读系统剪贴板，最可靠
    try {
      if (window.pywebview && window.pywebview.api && typeof window.pywebview.api.read_clipboard === 'function') {
        var res = await window.pywebview.api.read_clipboard();
        if (typeof res === 'string') { try { res = JSON.parse(res); } catch (e) {} }
        if (res && res.ok) return { ok: true, text: res.text || '' };
      }
    } catch (e) {}
    // 网页版：浏览器剪贴板 API（需 HTTPS/localhost 或用户授权）
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        var t = await navigator.clipboard.readText();
        return { ok: true, text: t || '' };
      }
    } catch (e) {}
    return { ok: false };
  }

  // 把剪贴板文字写入指定输入框，并触发 input 事件让既有联动逻辑刷新
  function pasteIntoInput(inputId) {
    return readClipboardText().then(function (r) {
      if (!r.ok) {
        toast('读不到剪贴板，请用鼠标点一下输入框，再按 Ctrl+V 粘贴');
        return false;
      }
      var t = (r.text || '').trim();
      if (!t) {
        toast('剪贴板里没有文字，请先去复制 Key');
        return false;
      }
      var el = document.getElementById(inputId);
      if (!el) return false;
      el.value = t;
      try { el.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
      el.focus();
      return true;
    });
  }

  // 配置页的「📋 粘贴」按钮
  function pasteApiKey() {
    pasteIntoInput('config-key').then(function (ok) {
      if (!ok) return;
      toast('✓ 已粘贴，确认无误后点「生成配置」');
      // 内容变了，清掉旧的生成结果与已展开的部署详情
      var result = document.getElementById('config-result');
      if (result) result.innerHTML = '';
      cfgDeploy.agentId = null;
    });
  }

  // 场景部署面板的「📋 粘贴」按钮（input 事件会自动触发 onSceneKeyInput 刷新命令）
  function pasteSceneKey() {
    pasteIntoInput('scene-setup-key').then(function (ok) {
      if (ok) toast('✓ 已粘贴');
    });
  }

  // 配置页 Key 手动输入时：若已展开智能体部署详情，同步刷新里面的命令/配置
  function onConfigKeyInput() {
    saveApiKey(document.getElementById('config-platform').value,
      (document.getElementById('config-key').value || '').trim());
    if (cfgDeploy.agentId) renderConfigDeployDetail();
  }

  // ===== 配置页：按平台列出可部署的智能体，每个一张「部署模型」按钮 =====

  // 聚合所有场景中与该平台搭配出现过的智能体（去重保序），
  // 并统一补齐：免Key官方客户端（每个平台都推荐）、GUI/CLI 通用客户端（兜底）
  function getAgentsForPlatform(platformId) {
    var ids = [];
    function add(id) {
      if (id && getAgentById(id) && ids.indexOf(id) < 0) ids.push(id);
    }

    getScenes().forEach(function (s) {
      var hasModel = s.platform_models && s.platform_models[platformId];
      var legacyPick = s.picks && s.picks.some(function (p) { return p.platform_id === platformId; });
      if ((hasModel || legacyPick) && s.agents) s.agents.forEach(add);
    });

    // 平台官方网页版入口（免 Key）
    var WEB_ENTRY = { deepseek: 'deepseek-web', aliyun: 'tongyi-web' };
    add(WEB_ENTRY[platformId]);

    // 免 Key 官方客户端：与平台无关，每个平台页都能推荐（登录即用）
    ['doubao-app', 'qwenwork', 'workbuddy', 'dumate'].forEach(add);

    // 用 Key 部署：保证每个平台都有图形客户端和终端工具可用
    var current = ids.map(getAgentById);
    if (!current.some(function (a) { return a.kind === 'gui'; })) {
      add('cherry-studio');
      add('chatbox');
    }
    add('aider');

    return ids.map(getAgentById);
  }

  // 智能体是否需要填 API Key（web 和自带模型的官方 App 不需要）
  function agentNeedsKey(agent) {
    return agent.kind === 'gui' || agent.kind === 'cli' ||
      (agent.kind === 'app' && (agent.config === 'custom' || agent.config === 'advanced'));
  }

  // 点击某智能体的「部署模型」按钮：设置上下文并展开该智能体的部署步骤
  function deployToAgent(agentId) {
    var agent = getAgentById(agentId);
    if (!agent) return;
    var platformId = document.getElementById('config-platform').value;
    var config = getModelConfig(platformId);
    if (!config) { toast('该平台暂不支持 API 部署'); return; }

    var keyInput = document.getElementById('config-key');
    var key = keyInput ? keyInput.value.trim() : '';
    if (agentNeedsKey(agent) && !key) {
      toast('先把 Key 粘到上面的输入框，再点「部署模型」');
      keyInput && keyInput.focus();
      return;
    }

    var checked = document.querySelector('.model-check:checked');
    var model = checked ? checked.value : config.models[0];

    cfgDeploy.agentId = agentId;
    cfgDeploy.installConfirm = null;
    cfgDeploy.deployConfirm = false;
    cfgDeploy.context = { platform_id: platformId, model: model };
    renderConfigDeployDetail();
    setTimeout(function () {
      var box = document.getElementById('config-deploy-detail');
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  // 渲染配置页某个智能体的部署详情（与场景面板共用 build*Setup 系列函数）
  function renderConfigDeployDetail() {
    var box = document.getElementById('config-deploy-detail');
    if (!box) return;
    var agent = activeDeployAgent();
    var pick = activeDeployPick();
    if (!agent || !pick) { box.innerHTML = ''; return; }

    var platform = getPlatformById(pick.platform_id);
    var platformName = platform ? platform.name : pick.platform_id;

    var body = '';
    if (agent.kind === 'web') {
      body = buildWebSetup(agent);
    } else if (agent.kind === 'app') {
      body = buildAppSetup(agent, pick, platformName);
    } else if (agent.kind === 'gui') {
      body = buildGuiSetup(agent, pick, platformName);
    } else {
      body = agent.openclaw ? buildOpenclawSetup(agent, pick) : buildCliSetup(agent, pick);
    }

    var summary = agentNeedsKey(agent)
      ? '正在把 <strong>' + escapeHtml(pick.model) + '</strong>（' + escapeHtml(platformName) + '）部署到 <strong>' + escapeHtml(agent.name) + '</strong>'
      : '准备使用 <strong>' + escapeHtml(agent.name) + '</strong>（自带官方模型，登录就能用，不需要你刚申请的 Key）';

    box.innerHTML =
      '<div class="setup-panel cfg-deploy-panel">' +
        '<div class="setup-summary">' + summary + '</div>' +
        body +
        '<div class="setup-security">🔒 命令和配置文件里包含你的 Key，请不要截图发给别人；本应用不会读取或上传它。</div>' +
      '</div>';
  }

  // 渲染配置页的智能体部署按钮区（生成配置成功后调用）
  function renderConfigAgentGrid(platformId) {
    var agents = getAgentsForPlatform(platformId);
    if (!agents.length) {
      return '<div class="config-card"><div class="config-card-title">第三步：部署到智能体</div>' +
        '<p class="config-card-desc">该平台暂时没有一键部署的智能体，可按下面「备选」卡片里的四格信息，' +
        '在 Cherry Studio 等支持自定义 OpenAI 接口的软件里手动新建服务商；也可以直接用该平台官方网页版。</p></div>';
    }

    // 分两组：不需要 Key 的（官方网页 / 自带模型 App），和需要 Key 部署的
    var easy = [], pro = [];
    agents.forEach(function (a) { (agentNeedsKey(a) ? pro : easy).push(a); });

    function card(a) {
      var active = cfgDeploy.agentId === a.id;
      var badge = agentNeedsKey(a)
        ? '<span class="cfg-agent-badge pro">用 Key 部署</span>'
        : '<span class="cfg-agent-badge easy">免 Key</span>';
      return '<button type="button" class="cfg-agent-card' + (active ? ' selected' : '') + '" onclick="App.deployToAgent(\'' + a.id + '\')">' +
          '<span class="cfg-agent-name">' + escapeHtml(a.name) + '</span>' +
          badge +
          '<span class="cfg-agent-tag">' + escapeHtml(a.tag || '') + '</span>' +
        '</button>';
    }

    var html = '<div class="config-card"><div class="config-card-title">第三步：选一个智能体（软件），点「部署模型」</div>';
    html += '<p class="config-card-desc">同一把 Key 可以部署到多个智能体。点下面任一按钮，自动给出该软件要填的网址、模型名、Key 和一键操作。</p>';
    if (easy.length) {
      html += '<div class="cfg-agent-group-title">新手推荐（装好登录就能用）</div><div class="cfg-agent-grid">' +
        easy.map(card).join('') + '</div>';
    }
    if (pro.length) {
      html += '<div class="cfg-agent-group-title">用你刚申请的 Key 部署</div><div class="cfg-agent-grid">' +
        pro.map(card).join('') + '</div>';
    }
    html += '<div id="config-deploy-detail"></div></div>';
    return html;
  }

  // 确定当前应展示的平台：优先用申请页传来的，其次 localStorage 记录的，最后默认 deepseek
  function getCurrentConfigPlatform() {
    if (currentApplyPlatform) return currentApplyPlatform;
    var saved = readLocal('last_platform', '');
    if (saved && getModelConfig(saved)) return saved;
    return 'deepseek';
  }

  // 渲染配置页（平台选择、Key 输入框、模型勾选）
  function renderConfigPage() {
    var platformId = getCurrentConfigPlatform();
    var platform = getPlatformById(platformId);
    var config = getModelConfig(platformId);
    if (!platform || !config) return;

    // 平台选择器
    var sel = document.getElementById('config-platform');
    if (sel) {
      sel.innerHTML = '';
      getMvpPlatforms().forEach(function (p) {
        var opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        if (p.id === platformId) opt.selected = true;
        sel.appendChild(opt);
      });
    }

    // 自动带出已保存的 Key
    var keyInput = document.getElementById('config-key');
    if (keyInput) {
      var savedKey = getApiKey(platformId);
      keyInput.value = savedKey || '';
      keyInput.type = 'password'; // 默认掩码
    }

    // 模型勾选列表
    renderModelList(platformId);

    // 清空上一次的生成结果
    var result = document.getElementById('config-result');
    if (result) result.innerHTML = '';
    cfgDeploy.agentId = null;
  }

  // 渲染某个平台的模型勾选列表
  function renderModelList(platformId) {
    var config = getModelConfig(platformId);
    var container = document.getElementById('model-list');
    if (!container || !config) return;

    var savedModels = readLocal('models_' + platformId, []);
    var html = '<p class="model-tip">常用模型如下（以官方最新模型为准），可勾选一个或多个：</p>';
    config.models.forEach(function (m) {
      var checked = (savedModels.indexOf(m) >= 0) ? 'checked' : '';
      html +=
        '<label class="model-item">' +
          '<input type="checkbox" class="model-check" value="' + m + '" ' + checked + '>' +
          '<span class="model-name">' + m + '</span>' +
        '</label>';
    });
    container.innerHTML = html;
  }

  // 用户手动切换平台时，重新渲染模型并带出该平台已存的 Key
  function switchConfigPlatform(platformId) {
    currentApplyPlatform = null; // 手动切换后不再锁定来源平台
    saveLocal('last_platform', platformId);
    var config = getModelConfig(platformId);
    if (!config) return;

    var keyInput = document.getElementById('config-key');
    if (keyInput) {
      keyInput.value = getApiKey(platformId) || '';
      keyInput.type = 'password';
    }
    renderModelList(platformId);
    var result = document.getElementById('config-result');
    if (result) result.innerHTML = '';
    cfgDeploy.agentId = null; // 切平台后收起旧的智能体部署详情
  }

  // 切换 Key 明文/掩码
  function toggleKeyVisibility() {
    var input = document.getElementById('config-key');
    var eye = document.getElementById('key-eye');
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (eye) eye.textContent = '🙈 隐藏';
    } else {
      input.type = 'password';
      if (eye) eye.textContent = '👁 显示';
    }
  }

  // 清除当前平台已保存的 Key（仅本机 localStorage）
  function clearSavedKey() {
    var platformId = document.getElementById('config-platform').value;
    if (!platformId) {
      toast('请先选择平台');
      return;
    }
    removeApiKey(platformId);
    var keyInput = document.getElementById('config-key');
    if (keyInput) {
      keyInput.value = '';
      keyInput.type = 'password';
    }
    var eye = document.getElementById('key-eye');
    if (eye) eye.textContent = '👁 显示';
    var result = document.getElementById('config-result');
    if (result) result.innerHTML = '';
    cfgDeploy.agentId = null;
    toast('已清除 ' + (getPlatformById(platformId) || {}).name + ' 的 Key');
  }

  // 复制单个字段并给出反馈
  function copyField(text, btnEl) {
    copyText(text).then(function (ok) {
      if (ok) {
        var original = btnEl.textContent;
        btnEl.textContent = '✓ 已复制';
        setTimeout(function () { btnEl.textContent = original; }, 1500);
      } else {
        toast('复制失败，请手动选中复制');
      }
    });
  }

  // 生成配置：保存 Key 和模型到 localStorage，展示方式 A + 方式 B
  function generateConfig() {
    var platformId = document.getElementById('config-platform').value;
    var config = getModelConfig(platformId);
    var platform = getPlatformById(platformId);
    var keyInput = document.getElementById('config-key');
    var apiKey = keyInput ? keyInput.value.trim() : '';

    if (!apiKey) {
      toast('请先把 Key 粘贴到输入框里');
      keyInput && keyInput.focus();
      return;
    }
    if (!config) {
      toast('该平台暂无配置数据');
      return;
    }

    // 收集勾选的模型
    var checks = document.querySelectorAll('.model-check:checked');
    var models = [];
    checks.forEach(function (c) { models.push(c.value); });
    if (!models.length) {
      toast('请至少勾选一个模型');
      return;
    }

    // 保存到 localStorage（仅本机）
    saveApiKey(platformId, apiKey);
    saveLocal('models_' + platformId, models);
    saveLocal('last_platform', platformId);

    // 渲染结果
    var result = document.getElementById('config-result');
    if (!result) return;

    var modelListText = models.join('、');

    // 方式 A：照着填表卡片
    var fields = [
      { label: '服务商名称', value: config.provider_name, hint: '在第三方客户端里新建服务商时填这个名字' },
      { label: 'API 地址（base_url，接口网址）', value: config.base_url, hint: '接口地址，照抄即可' },
      { label: 'API Key（钥匙）', value: apiKey, hint: '就是你刚才粘贴的那串钥匙' },
      { label: '模型名', value: models[0], hint: '先填一个，用的时候再切换；你勾了：' + modelListText }
    ];

    var methodA = '<div class="config-card"><div class="config-card-title">备选：手动照着填表（不用一键部署时）</div>';
    fields.forEach(function (f, i) {
      methodA +=
        '<div class="field-row">' +
          '<div class="field-label">' + f.label + '</div>' +
          '<div class="field-value-wrap">' +
            '<span class="field-value">' + f.value + '</span>' +
            '<button class="copy-btn" onclick="App.copyField(\'' + f.value.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + '\', this)">复制</button>' +
          '</div>' +
          '<div class="field-hint">' + f.hint + '</div>' +
        '</div>';
    });
    methodA += '</div>';

    // 主推：不同智能体的「部署模型」按钮区（同一把 Key 可选多个软件）
    var agentGrid = renderConfigAgentGrid(platformId);

    result.innerHTML =
      '<div class="config-saved-tip">✓ Key 和模型已保存到本机，下面选一个智能体（软件）一键部署：</div>' +
      agentGrid + methodA +
      '<div class="config-footer">' +
        '<p>不想配 Key？豆包工作、千问办公等官方软件装好登录就能用，也在上面的列表里。</p>' +
      '</div>';

    // 若之前已选过智能体（改了勾选模型后重新生成），保持该智能体的部署详情展开
    if (cfgDeploy.agentId) {
      var checked0 = document.querySelector('.model-check:checked');
      cfgDeploy.context = {
        platform_id: platformId,
        model: checked0 ? checked0.value : models[0]
      };
      renderConfigDeployDetail();
    }
  }

  // 下载 JSON 文件
  function downloadJson(content, filename) {
    try {
      var blob = new Blob([content], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast('下载失败，请改用复制');
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ---------- 暴露到全局 ---------- */
  global.App = {
    getPlatforms: getPlatforms,
    getMvpPlatforms: getMvpPlatforms,
    getPlatformById: getPlatformById,
    renderPlatforms: renderPlatforms,
    getScenes: getScenes,
    getSceneById: getSceneById,
    renderSceneButtons: renderSceneButtons,
    showSceneRecommendation: showSceneRecommendation,
    deploySceneModel: deploySceneModel,
    selectSceneAgent: selectSceneAgent,
    goApplyScenePick: goApplyScenePick,
    onSceneKeyInput: onSceneKeyInput,
    sceneToggleKey: sceneToggleKey,
    copySibling: copySibling,
    downloadSceneConfig: downloadSceneConfig,
    oneClickInstall: oneClickInstall,
    deployOpenclawConfig: deployOpenclawConfig,
    nativeInstall: nativeInstall,
    nativeInstallOpenclaw: nativeInstallOpenclaw,
    nativeDeployOpenclaw: nativeDeployOpenclaw,
    nativeSetAiderKey: nativeSetAiderKey,
    onNativeDlProgress: onNativeDlProgress,
    getTools: getTools,
    getToolsByCategory: getToolsByCategory,
    getAgents: getAgents,
    getAgentById: getAgentById,
    renderTools: renderTools,
    getTutorial: getTutorial,
    getFaq: getFaq,
    goApply: goApply,
    renderApplyGuide: renderApplyGuide,
    renderFaq: renderFaq,
    toggleFaq: toggleFaq,
    renderHelpPage: renderHelpPage,
    switchHelpPlatform: switchHelpPlatform,
    renderHelpTutorial: renderHelpTutorial,
    getModelConfig: getModelConfig,
    renderConfigPage: renderConfigPage,
    switchConfigPlatform: switchConfigPlatform,
    toggleKeyVisibility: toggleKeyVisibility,
    pasteApiKey: pasteApiKey,
    pasteSceneKey: pasteSceneKey,
    onConfigKeyInput: onConfigKeyInput,
    deployToAgent: deployToAgent,
    nativeDeployHermes: nativeDeployHermes,
    nativeDeployHarness: nativeDeployHarness,
    downloadHermesConfig: downloadHermesConfig,
    downloadHarnessConfig: downloadHarnessConfig,
    generateConfig: generateConfig,
    copyField: copyField,
    copyText: copyText,
    downloadJson: downloadJson,
    saveLocal: saveLocal,
    readLocal: readLocal,
    removeLocal: removeLocal,
    saveApiKey: saveApiKey,
    getApiKey: getApiKey,
    removeApiKey: removeApiKey,
    clearSavedKey: clearSavedKey,
    switchPage: switchPage,
    goBack: goBack,
    bindNav: bindNav,
    openExternal: openExternal,
    toast: toast,
    renderCaseStudies: renderCaseStudies,
    showCaseDetail: showCaseDetail,
    hideCaseDetail: hideCaseDetail,
    openFeedbackModal: openFeedbackModal,
    closeFeedbackModal: closeFeedbackModal,
    openTrialDownload: openTrialDownload,
    openImgLightbox: openImgLightbox,
    closeImgLightbox: closeImgLightbox
  };

  /* ---------- 实际案例 ---------- */
  function renderCaseStudies(containerId) {
    var list = window.APP_DATA.case_studies || [];
    var html = '';
    list.forEach(function (cs) {
      var scene = getSceneById(cs.scene_id);
      var sceneName = scene ? scene.name : '';
      html += '<div class="case-card" onclick="App.showCaseDetail(\'' + cs.id + '\')">' +
        (cs.cover ? '<img class="case-card-img" src="' + cs.cover + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
        '<div class="case-card-body">' +
        '<div class="case-card-header">' +
          '<span class="case-card-tag">' + escapeHtml(sceneName) + '</span>' +
          '<span class="case-card-level">' + escapeHtml(cs.difficulty) + '</span>' +
        '</div>' +
        '<h3 class="case-card-title">' + escapeHtml(cs.title) + '</h3>' +
        '<p class="case-card-summary">' + escapeHtml(cs.summary) + '</p>' +
        '<div class="case-card-tools">🔧 ' + escapeHtml(cs.tools) + '</div>' +
        '<div class="case-card-arrow">查看步骤 →</div>' +
        '</div>' +
      '</div>';
    });
    var el = document.getElementById(containerId);
    if (el) el.innerHTML = html;
  }

  function showCaseDetail(caseId) {
    var list = window.APP_DATA.case_studies || [];
    var cs = null;
    for (var i = 0; i < list.length; i++) { if (list[i].id === caseId) { cs = list[i]; break; } }
    if (!cs) return;
    var scene = getSceneById(cs.scene_id);
    var sceneName = scene ? scene.name : '';
    var stepsHtml = '';
    cs.steps.forEach(function (s, idx) {
      stepsHtml += '<div class="case-step">' +
        '<div class="case-step-num">' + (idx + 1) + '</div>' +
        '<div class="case-step-body">' +
          '<h4 class="case-step-title">' + escapeHtml(s.title) + '</h4>' +
          '<p class="case-step-text">' + escapeHtml(s.text) + '</p>' +
          (s.tip ? '<div class="case-step-tip">💡 ' + escapeHtml(s.tip) + '</div>' : '') +
          (s.image ? '<img class="case-step-img" src="' + s.image + '" alt="" loading="lazy" onclick="openImgLightbox(this.src)" onerror="this.style.display=\'none\'">' : '') +
        '</div>' +
      '</div>';
    });
    var html = '<div class="case-detail">' +
      '<button class="back-btn" onclick="App.hideCaseDetail()">← 返回案例列表</button>' +
      (cs.cover ? '<img class="case-detail-cover" src="' + cs.cover + '" alt="" onclick="openImgLightbox(this.src)" onerror="this.style.display=\'none\'">' : '') +
      '<span class="case-card-tag">' + escapeHtml(sceneName) + '</span>' +
      '<span class="case-card-level">' + escapeHtml(cs.difficulty) + '</span>' +
      '<h2 class="case-detail-title">' + escapeHtml(cs.title) + '</h2>' +
      '<p class="case-detail-summary">' + escapeHtml(cs.summary) + '</p>' +
      '<div class="case-detail-tools">🔧 用到的工具：' + escapeHtml(cs.tools) + '</div>' +
      '<div class="case-steps">' + stepsHtml + '</div>' +
      (cs.example ?
        '<div class="case-example">' +
          '<div class="case-example-title">📄 示例：AI 实际给出的内容</div>' +
          '<pre class="case-example-body">' + escapeHtml(cs.example) + '</pre>' +
        '</div>' : '') +
      '<button class="generate-btn case-detail-cta" onclick="App.switchPage(\'page-scene\')">去找适合我的模型 →</button>' +
    '</div>';
    var listEl = document.getElementById('case-list');
    var detailEl = document.getElementById('case-detail');
    if (listEl) listEl.style.display = 'none';
    if (detailEl) { detailEl.innerHTML = html; detailEl.style.display = 'block'; }
    window.scrollTo(0, 0);
  }

  function hideCaseDetail() {
    var listEl = document.getElementById('case-list');
    var detailEl = document.getElementById('case-detail');
    if (listEl) listEl.style.display = '';
    if (detailEl) { detailEl.innerHTML = ''; detailEl.style.display = 'none'; }
  }

  function getSceneById(id) {
    var list = window.APP_DATA.scene_mapping || [];
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }

  /* ---------- 案例图片点击放大（lightbox） ---------- */
  var imgLightbox = null;
  function ensureImgLightbox() {
    if (imgLightbox) return imgLightbox;
    var lb = document.createElement('div');
    lb.id = 'img-lightbox';
    lb.innerHTML =
      '<div class="lb-mask"></div>' +
      '<div class="lb-stage">' +
        '<button class="lb-close" aria-label="关闭">✕</button>' +
        '<img class="lb-img" alt="">' +
      '</div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-mask') || e.target.classList.contains('lb-close')) {
        closeImgLightbox();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeImgLightbox();
    });
    imgLightbox = lb;
    return lb;
  }
  function openImgLightbox(src) {
    if (!src) return;
    var lb = ensureImgLightbox();
    lb.querySelector('.lb-img').src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeImgLightbox() {
    if (imgLightbox) imgLightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
  window.openImgLightbox = openImgLightbox;
  window.closeImgLightbox = closeImgLightbox;

  /* ---------- 客户体验反馈（mailto 提交 + 正文自动复制兜底） ---------- */

  var FB_HISTORY_KEY = 'feedback_history';
  var FB_MAX_LEN = 500;
  var feedbackState = { typeId: 'suggest' };

  function getFeedbackConfig() {
    return (window.APP_DATA && window.APP_DATA.feedback) || { email: '', types: [] };
  }

  function getFeedbackHistory() {
    var arr = readLocal(FB_HISTORY_KEY, []);
    return Array.isArray(arr) ? arr : [];
  }

  function addFeedbackHistory(typeName, content) {
    var list = getFeedbackHistory();
    list.unshift({
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      type: typeName,
      summary: (content || '').slice(0, 40)
    });
    saveLocal(FB_HISTORY_KEY, list.slice(0, 20));
  }

  function closeFeedbackModal() {
    var m = document.getElementById('feedback-modal');
    if (m && m.parentNode) m.parentNode.removeChild(m);
  }

  // Windows 7 天试用版下载入口。
  // 统一走 VicroCode 国内托管详情页（国内直连、免备案）；GitHub raw 在国内访问不稳定，不作为默认入口。
  var TRIAL_DOWNLOAD_URL = 'https://www.vicoco.cn/p431.html';
  function openTrialDownload() {
    openExternal(TRIAL_DOWNLOAD_URL);
  }

  function openFeedbackModal() {
    closeFeedbackModal();
    var cfg = getFeedbackConfig();
    var history = getFeedbackHistory();

    var typeBtns = (cfg.types || []).map(function (t) {
      return '<button type="button" class="fb-type-btn" data-type-id="' + t.id + '" data-type-name="' + escapeHtml(t.name) + '"' +
        (t.id === feedbackState.typeId ? ' data-active="1"' : '') + '>' +
        t.icon + ' ' + escapeHtml(t.name) + '</button>';
    }).join('');

    var historyHtml = '';
    if (history.length) {
      historyHtml = '<details class="fb-history"><summary>我提交过的反馈（' + history.length + '）</summary>' +
        history.slice(0, 5).map(function (h) {
          return '<div class="fb-history-item"><span class="fb-history-meta">' + escapeHtml(h.time) + ' · ' + escapeHtml(h.type) + '</span>' +
            '<div class="fb-history-text">' + escapeHtml(h.summary) + '</div></div>';
        }).join('') + '</details>';
    }

    var box = document.createElement('div');
    box.id = 'feedback-modal';
    box.className = 'auth-modal-mask';
    box.innerHTML =
      '<div class="auth-modal fb-modal" role="dialog" aria-modal="true">' +
        '<div class="auth-modal-title">💌 意见反馈</div>' +
        '<div class="auth-modal-body">' +
          '<div class="fb-label">反馈类型</div>' +
          '<div class="fb-type-row">' + typeBtns + '</div>' +
          '<div class="fb-label">具体内容 <span class="fb-required">*</span></div>' +
          '<textarea id="fb-content" class="fb-textarea" maxlength="' + FB_MAX_LEN + '" rows="5" placeholder="遇到了什么问题，或希望增加什么功能？写得越具体，我们越能帮你解决（至少 5 个字）"></textarea>' +
          '<div class="fb-counter"><span id="fb-count">0</span>/' + FB_MAX_LEN + '</div>' +
          '<div class="fb-label">联系方式（选填）</div>' +
          '<input id="fb-contact" class="fb-input" type="text" maxlength="80" placeholder="微信号 / QQ / 手机号，方便我们回复你">' +
          '<div class="fb-tip">点提交后会自动打开你的邮件客户端，内容已自动填好，点「发送」即可；我们不会在本应用里保存你的邮箱密码。</div>' +
          historyHtml +
        '</div>' +
        '<div class="auth-modal-actions">' +
          '<button type="button" class="auth-btn cancel" id="fb-cancel">取消</button>' +
          '<button type="button" class="auth-btn ok" id="fb-submit">📧 写邮件提交</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(box);

    box.querySelectorAll('.fb-type-btn').forEach(function (btn) {
      btn.onclick = function () {
        feedbackState.typeId = btn.getAttribute('data-type-id');
        box.querySelectorAll('.fb-type-btn').forEach(function (b) { b.removeAttribute('data-active'); });
        btn.setAttribute('data-active', '1');
      };
    });
    var ta = box.querySelector('#fb-content');
    ta.oninput = function () {
      box.querySelector('#fb-count').textContent = ta.value.length;
    };
    box.querySelector('#fb-cancel').onclick = closeFeedbackModal;
    box.querySelector('#fb-submit').onclick = submitFeedback;
    box.onclick = function (e) { if (e.target === box) closeFeedbackModal(); };
    setTimeout(function () { ta.focus(); }, 50);
  }

  function submitFeedback() {
    var box = document.getElementById('feedback-modal');
    if (!box) return;
    var cfg = getFeedbackConfig();
    var activeBtn = box.querySelector('.fb-type-btn[data-active="1"]');
    var typeName = activeBtn ? activeBtn.getAttribute('data-type-name') : '其他';
    var content = box.querySelector('#fb-content').value.trim();
    var contact = box.querySelector('#fb-contact').value.trim();

    if (content.length < 5) {
      toast('请把反馈内容写具体一些（至少 5 个字）');
      box.querySelector('#fb-content').focus();
      return;
    }

    var now = new Date().toLocaleString('zh-CN', { hour12: false });
    var os = /Windows/i.test(navigator.userAgent) ? 'Windows' :
             (/Mac/i.test(navigator.userAgent) ? 'macOS' : navigator.platform || '未知系统');
    var body =
      '反馈类型：' + typeName + '\n\n' +
      '反馈内容：\n' + content + '\n\n' +
      '联系方式（选填）：' + (contact || '未填写') + '\n\n' +
      '——————————\n' +
      '提交时间：' + now + '\n' +
      '应用：小白AI管家' + (isNative() ? '（桌面版）' : '（网页版）') + '\n' +
      '系统：' + os + '\n';
    var subject = '【小白AI管家·' + typeName + '】' + content.slice(0, 20).replace(/\s+/g, ' ');

    // 正文先复制到剪贴板：邮件客户端没弹出来时，用户可手动粘贴
    copyText(body);
    addFeedbackHistory(typeName, content);

    var mailto = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent(subject) +
                 '&body=' + encodeURIComponent(body);
    if (isNative() && nativeApi && nativeApi.open_url) {
      Promise.resolve(nativeApi.open_url(mailto)).catch(function () {
        window.location.href = mailto;
      });
    } else {
      window.location.href = mailto;
    }
    renderFeedbackSuccess(cfg.email);
  }

  // 提交后的成功态：诚实告知「内容已复制+邮件窗口已尝试打开」，并给手动发信兜底
  function renderFeedbackSuccess(email) {
    var box = document.getElementById('feedback-modal');
    if (!box) return;
    var modal = box.querySelector('.fb-modal');
    modal.innerHTML =
      '<div class="auth-modal-title">✅ 反馈已准备好</div>' +
      '<div class="auth-modal-body fb-success-body">' +
        '<div class="fb-success-icon">📮</div>' +
        '<p>反馈内容<b>已自动复制</b>，邮件窗口正在打开——在邮件里直接点「发送」就完成了。</p>' +
        '<p class="fb-warn">如果没有弹出邮件窗口（电脑没装邮件软件）：<br>1. 登录你的 QQ 邮箱点「写信」<br>2. 收件人填：<b id="fb-email">' + escapeHtml(email) + '</b> ' +
          '<button type="button" class="fb-copy-email" id="fb-copy-email">复制邮箱</button><br>3. 正文处按 Ctrl+V 粘贴，发送即可</p>' +
        '<p class="fb-tip">我们收到邮件后会尽快处理，感谢你的反馈！</p>' +
      '</div>' +
      '<div class="auth-modal-actions">' +
        '<button type="button" class="auth-btn ok" id="fb-done">我知道了</button>' +
      '</div>';
    var copyBtn = modal.querySelector('#fb-copy-email');
    copyBtn.onclick = function () {
      copyText(email);
      copyBtn.textContent = '✓ 已复制';
      setTimeout(function () { copyBtn.textContent = '复制邮箱'; }, 1500);
    };
    modal.querySelector('#fb-done').onclick = closeFeedbackModal;
    box.onclick = function (e) { if (e.target === box) closeFeedbackModal(); };
  }

  /* ---------- 7 天试用版：顶部横幅 + 到期锁定高级功能 ----------
     正式版原生接口 trial_status 返回 trial=false，以下逻辑自动跳过。 */
  var trialInfo = null;

  async function initTrial() {
    if (!isNative() || !nativeApi || !nativeApi.trial_status) return;
    try {
      var st = await nativeApi.trial_status();
      if (!st || !st.ok || !st.trial) return;
      trialInfo = st;
      renderTrialBanner();
    } catch (e) {}
  }

  function isTrialExpired() {
    return !!(trialInfo && trialInfo.expired);
  }

  // 高级动作入口调用：到期则弹窗拦截并返回 true
  function guardTrialFeature() {
    if (!isTrialExpired()) return false;
    showTrialLockModal();
    return true;
  }

  function renderTrialBanner() {
    var bar = document.createElement('div');
    var expired = trialInfo.expired;
    bar.style.cssText =
      'position:fixed;top:0;left:0;right:0;z-index:99999;font-size:13px;' +
      'padding:7px 14px;text-align:center;color:#fff;line-height:1.5;' +
      'background:' + (expired ? '#b4382c' : '#2f6fed') + ';';
    if (expired) {
      bar.innerHTML =
        '🔒 7 天试用期已结束，一键部署 / 自动安装等高级功能已锁定。' +
        '<a href="#" id="trial-more-link" style="color:#fff;text-decoration:underline;margin-left:6px;">如何升级正式版</a>';
    } else {
      bar.textContent = '⏳ 试用版 · 7 天免费试用（' + trialInfo.remaining_text +
        '），到期后一键部署等高级功能将锁定';
    }
    document.body.appendChild(bar);
    document.body.style.paddingTop = '34px';
    if (expired) {
      bar.querySelector('#trial-more-link').onclick = function (e) {
        e.preventDefault();
        showTrialLockModal();
      };
    }
  }

  function showTrialLockModal() {
    var old = document.getElementById('trial-lock-modal');
    if (old) old.remove();
    var box = document.createElement('div');
    box.id = 'trial-lock-modal';
    box.style.cssText =
      'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.45);' +
      'display:flex;align-items:center;justify-content:center;padding:20px;';
    var d = document.createElement('div');
    d.style.cssText =
      'background:#fff;border-radius:12px;max-width:420px;width:100%;' +
      'padding:24px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.2);';
    d.innerHTML =
      '<div style="font-size:34px;">🔒</div>' +
      '<h3 style="margin:10px 0 8px;font-size:18px;">高级功能已锁定</h3>' +
      '<p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 14px;">' +
      '7 天试用期已结束。正式版小白AI管家可继续使用：' +
      '一键部署模型、自动下载安装智能体、自动写配置等全部高级功能。</p>' +
      '<p style="color:#888;font-size:13px;margin:0 0 16px;">购买与咨询邮箱：<b>511647426@qq.com</b></p>';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = '复制邮箱去咨询';
    copyBtn.onclick = function () {
      copyText('511647426@qq.com');
      copyBtn.textContent = '✓ 已复制';
      setTimeout(function () { copyBtn.textContent = '复制邮箱去咨询'; }, 1500);
    };
    var closeBtn = document.createElement('button');
    closeBtn.className = 'copy-btn';
    closeBtn.style.marginLeft = '8px';
    closeBtn.textContent = '我知道了';
    closeBtn.onclick = function () { box.remove(); };
    d.appendChild(copyBtn);
    d.appendChild(closeBtn);
    box.appendChild(d);
    box.onclick = function (e) { if (e.target === box) box.remove(); };
    document.body.appendChild(box);
  }

  /* ---------- 页面加载完成后自动绑定导航 & 渲染页面 ---------- */
  function init() {
    bindNav();
    renderPlatforms('platform-list');
    renderSceneButtons('scene-buttons');
    renderConfigPage();
    renderTools();
    renderHelpPage();
    renderCaseStudies('case-list');
    initTrial();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
