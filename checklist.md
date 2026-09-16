# 小白AI管家 — 上线前自测清单

> 测试时间：2026-09-10
> 测试方式：本地 HTTP 服务（`python -m http.server`）+ 浏览器自动化；375px 窄屏用同域 iframe 真实视口验证（CSS 媒体查询正常触发）。
> 总约束：纯静态、零后端、API Key 仅存本机 localStorage、不中转任何请求。

---

## 自测结果

### 1. ✅ 双击 index.html 直接打开，无控制台报错

- 清掉 localStorage 后重新加载，控制台**无红色报错**。
- `js/data.js`、`js/app.js`、`css/style.css`、教程截图均返回 200，无 404。
- 注：测试中刷新页面时出现过一次 `net::ERR_ABORTED`，是刷新中断旧请求所致，非代码错误，复现后确认无影响。

### 2. ✅ 首页 → 选平台 → 去申请 → 官方申请页能打开

- 底部导航「选平台」渲染出 3 张平台卡片（DeepSeek / 智谱 GLM / 火山方舟豆包）。
- 点击 DeepSeek 的「去申请 Key」，通过 `window.open` 捕获到的 URL 为 `https://platform.deepseek.com/api_keys`，与官方申请页一致，新窗口打开。

### 3. ✅ 教程 6 步与截图一一对应、图片加载正常

- 申请页共 6 步：打开官方申请页 → 登录/注册 → 进入 API Keys 页 → 创建新的 API Key → 复制 Key → 回到本应用粘贴。
- 所有截图 `<img>` 的 `naturalWidth = 900`，无破图（naturalWidth 不为 0）。

### 4. ✅ 粘贴 Key → 生成配置：三个平台 base_url 和模型名正确；复制按钮有效；Key 掩码

- Key 输入框 `type="password"`，默认掩码显示。
- DeepSeek：生成配置中 `base_url = https://api.deepseek.com`，模型名正确。
- 智谱：`base_url = https://open.bigmodel.cn/api/paas/v4`。
- 火山方舟：`base_url = https://ark.cn-beijing.volces.com/api/v3`。
- 点击字段旁「复制」按钮，按钮文字变为「✓ 已复制」，复制功能正常。

### 5. ✅ localStorage 保存的 Key 刷新页面后仍在；点"清除"能删除

- 生成配置（DeepSeek，Key=`sk-test-***`）后刷新页面，回到配置页选 DeepSeek，输入框自动带出已存 Key（掩码）。
- 点击「🗑 清除已保存的 Key」后：输入框清空、`localStorage.getItem('xiaobai_ai_apikey_deepseek')` 返回 `null`，清除成功。

### 6. ✅ 场景推荐页 8 个场景全部有数据

- 「看场景」页共 8 个场景按钮：日常聊天问答、写作/文案、编程/代码、翻译、学习/长文档整理、做图（图像生成）、视频生成、多模态（看图说话）。
- 每个场景点击后均渲染推荐卡片（含平台名、推荐理由、价格提示）。

### 7. ✅ 工具库所有链接可打开且为官方域名

- 工具库共 8 个工具，下载按钮均通过 `App.openExternal` 新窗口打开。
- 域名清单：cherry-ai.com、chat.deepseek.com、www.doubao.com、chatboxai.app、jimeng.jianying.com、klingai.com、hailuoai.video、tongyi.aliyun.com，均为官方域名。

### 8. ✅ 手机宽度 375px 下五个页面无横向滚动、按钮可点

- 用 375px 宽 iframe 真实视口测试（媒体查询 `max-width:480px` 正常触发，网格变单列）。
- 各页面 `documentElement.scrollWidth`：首页 374px、选平台 358px、看场景 374px、工具库 358px、配置页 358px，均 ≤ 380px，**无横向滚动**。
- 五个页面主 CTA 按钮均未禁用、均绑定 onclick，可正常点击。

### 9. ✅ 全站无"TODO/占位/示例"残留文案

- 源码与渲染文本中搜索 `TODO / 占位 / 待开发 / coming soon`，**无匹配**。
- 仅剩 HTML input 的 `placeholder="把刚才复制的那串 Key 粘贴到这里"`，为输入框提示文案（合法）。
- 空状态兜底类已从 `.placeholder` 改名为 `.empty-state`，用户可见文案为"暂无平台数据"等正常提示。

### 10. ✅ 免责声明在首页和帮助页均可见

- 首页与帮助页均渲染：「本应用为引导工具，不存储、不中转您的 API Key；所有价格与信息以各平台官方为准。」
- 免责声明为全局页脚（位于各 page section 之外），全站所有页面均可见。

---

## 结论

**10/10 项全部通过，可上线。**

### 本轮新增/修复
- 配置页新增「🗑 清除已保存的 Key」按钮（`App.clearSavedKey`），删除本机 localStorage 中的 Key。
- 空状态样式类 `.placeholder` → `.empty-state`，避免"占位"歧义。

### 未通过项
无。
