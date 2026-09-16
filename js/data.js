/* 小白AI管家 - 内置数据
   从 assets/platform_scene_mapping.json 复制而来，作为纯静态网页的内置数据源。
   如需更新数据，请同步修改此文件与 assets/platform_scene_mapping.json。
*/
window.APP_DATA = {
  "platforms": {
    "phase1_mvp": [
      {
        "id": "deepseek",
        "name": "DeepSeek",
        "desc": "便宜好用，写代码、长文章首选",
        "apply_url": "https://platform.deepseek.com/api_keys",
        "verified_prices": [
          { "model": "deepseek-v4-flash", "note": "输入 1.5 元/百万字（忙时3元），输出 4.5 元/百万字（忙时9元），能读 100 万字长文" },
          { "model": "deepseek-v4-pro", "note": "输入 4.5 元/百万字（忙时9元），输出 13.5 元/百万字（忙时27元），难题更强" }
        ]
      },
      {
        "id": "zhipu",
        "name": "智谱GLM",
        "desc": "有完全免费的模型，新手零成本入门",
        "apply_url": "https://open.bigmodel.cn",
        "verified_prices": [
          { "model": "glm-4-flash", "note": "完全免费，日常聊天写作够用" },
          { "model": "glm-4-flashx", "note": "0.1 元/百万字，速度更快" }
        ]
      },
      {
        "id": "doubao",
        "name": "火山方舟豆包",
        "desc": "字节出品，响应快，能看图、做图、做视频",
        "apply_url": "https://console.volcengine.com/ark/region:cn-beijing/apiKey",
        "verified_prices": [
          { "model": "doubao-seed-1.6-flash", "note": "输入 0.15 元/百万字，输出 1.5 元/百万字，能看图，响应极快" },
          { "model": "doubao-seedream-5.0", "note": "AI 做图 0.22 元/张" }
        ]
      },
      {
        "id": "aliyun",
        "name": "阿里云通义千问",
        "desc": "阿里出品，写代码、做办公都行，有免费额度",
        "apply_url": "https://bailian.console.aliyun.com/apiKey",
        "verified_prices": [
          { "model": "qwen-turbo", "note": "输入 0.3 元/百万字，输出 0.6 元/百万字，日常够用" },
          { "model": "qwen-plus", "note": "输入 0.8 元/百万字，输出 2 元/百万字，效果更好" },
          { "model": "qwen-max", "note": "输入 2 元/百万字，输出 6 元/百万字，旗舰模型" }
        ]
      },
      {
        "id": "baidu",
        "name": "百度文心一言",
        "desc": "百度出品，中文理解强，有免费体验额度",
        "apply_url": "https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application",
        "verified_prices": [
          { "model": "ernie-tiny-8k", "note": "免费体验额度，日常聊天够用" },
          { "model": "ernie-lite-8k", "note": "输入 0.3 元/百万字，输出 0.6 元/百万字，轻量低价" },
          { "model": "ernie-4.0-turbo-8k", "note": "输入 3 元/百万字，输出 9 元/百万字，旗舰模型" }
        ]
      },
      {
        "id": "tencent",
        "name": "腾讯混元",
        "desc": "腾讯出品，中文创作强，新用户有免费额度",
        "apply_url": "https://console.cloud.tencent.com/cam/api",
        "verified_prices": [
          { "model": "hunyuan-lite", "note": "免费体验额度，日常聊天够用" },
          { "model": "hunyuan-pro", "note": "输入 4 元/百万字，输出 12 元/百万字，旗舰模型" }
        ]
      }
    ],
    "all": [
      { "id": "deepseek", "name": "DeepSeek" },
      { "id": "zhipu", "name": "智谱GLM" },
      { "id": "doubao", "name": "火山方舟豆包" },
      { "id": "aliyun", "name": "阿里云通义千问" },
      { "id": "baidu", "name": "百度文心一言" },
      { "id": "xunfei", "name": "讯飞星火" },
      { "id": "minimax", "name": "MiniMax海螺" },
      { "id": "moonshot", "name": "Kimi（月之暗面）" },
      { "id": "tencent", "name": "腾讯混元" }
    ]
  },
  "scene_mapping": [
    {
      "id": "chat",
      "name": "日常聊天问答",
      "desc": "问问题、出主意、陪聊解闷",
      "kind": "text",
      "agents": ["doubao-app", "workbuddy", "qwenwork", "cherry-studio", "chatbox", "aider"],
      "platform_models": {
        "zhipu": [
          { "model": "glm-4-flash", "badge": "完全免费", "context": "12.8万字", "price": "完全免费，注册就能用", "reason": "不收一分钱，日常问答完全够用，新手零成本首选。" },
          { "model": "glm-4-flashx", "badge": "极速", "context": "12.8万字", "price": "0.1 元 / 百万字（读写同价）", "reason": "速度更快，1 毛钱处理 100 万字，几乎等于免费。" },
          { "model": "glm-4-air", "badge": "轻量低价", "context": "12.8万字", "price": "约 0.5 元 / 百万字", "reason": "比 Flash 更轻，适合纯聊天，价格极低。" }
        ],
        "doubao": [
          { "model": "doubao-seed-1.6-flash", "badge": "响应最快", "context": "25.6万字", "price": "读入 0.15 元 / 写出 1.5 元（每百万字）", "reason": "回答几乎秒出，说话最像真人，还能直接发图片让它看。" },
          { "model": "doubao-seed-2.0-mini", "badge": "低价均衡", "context": "3.2万字", "price": "读入 0.2 元 / 写出 2 元（每百万字）", "reason": "新一代小模型，日常聊天质量不错、费用极低。" },
          { "model": "doubao-seed-1.6", "badge": "深度思考", "context": "25.6万字", "price": "读入 0.8 元 / 写出 2 元起（每百万字）", "reason": "会带着思考回答，复杂问题答得更严谨。" }
        ],
        "deepseek": [
          { "model": "deepseek-v4-flash", "badge": "最聪明", "context": "100万字", "price": "读入 1.5 元 / 写出 4.5 元（每百万字，忙时翻倍）", "reason": "答得更深入有条理，一次记住 100 万字聊天内容，价格依然便宜。" },
          { "model": "deepseek-v4-pro", "badge": "难题旗舰", "context": "100万字", "price": "读入 4.5 元 / 写出 13.5 元（每百万字，忙时翻倍）", "reason": "最难的问题也能答好，适合深度讨论、专业咨询。" }
        ],
        "aliyun": [
          { "model": "qwen-turbo", "badge": "阿里低价", "context": "100万字", "price": "读入 0.3 元 / 写出 0.6 元（每百万字）", "reason": "阿里出品，日常聊天质量不错，有免费额度。" },
          { "model": "qwen-plus", "badge": "效果更好", "context": "100万字", "price": "读入 0.8 元 / 写出 2 元（每百万字）", "reason": "回答更全面，适合复杂问题。" }
        ],
        "tencent": [
          { "model": "hunyuan-lite", "badge": "腾讯免费", "context": "4万字", "price": "免费体验额度，日常够用", "reason": "腾讯混元轻量版，有免费额度，中文聊天自然。" },
          { "model": "hunyuan-pro", "badge": "腾讯旗舰", "context": "4万字", "price": "读入 4 元 / 写出 12 元（每百万字）", "reason": "腾讯旗舰模型，中文理解和创作很强。" }
        ]
      }
    },
    {
      "id": "write",
      "name": "写作/文案",
      "desc": "写文章、发言稿、公众号文案",
      "kind": "text",
      "agents": ["workbuddy", "qwenwork", "cherry-studio", "chatbox", "aider"],
      "platform_models": {
        "zhipu": [
          { "model": "glm-4-flash", "badge": "完全免费", "context": "12.8万字", "price": "完全免费，注册就能用", "reason": "中文文笔通顺，写公众号、发言稿、朋友圈文案都能打，练手不花钱。" },
          { "model": "glm-4-flashx", "badge": "极速", "context": "12.8万字", "price": "0.1 元 / 百万字（读写同价）", "reason": "出稿速度更快，大量写文案时 1 毛钱处理 100 万字。" },
          { "model": "glm-4-plus", "badge": "文笔旗舰", "context": "12.8万字", "price": "约 5 元 / 百万字", "reason": "智谱旗舰模型，文笔最出彩，重要场合的发言稿首选。" }
        ],
        "doubao": [
          { "model": "doubao-seed-2.0-mini", "badge": "低价均衡", "context": "3.2万字", "price": "读入 0.2 元 / 写出 2 元（每百万字）", "reason": "文风自然、交稿快，日常大量写文案时成本几乎可以忽略。" },
          { "model": "doubao-seed-1.6", "badge": "深度写作", "context": "25.6万字", "price": "读入 0.8 元 / 写出 2 元起（每百万字）", "reason": "会带着思考写，长文章、报告结构更清晰。" },
          { "model": "doubao-seed-1.6-flash", "badge": "快速出稿", "context": "25.6万字", "price": "读入 0.15 元 / 写出 1.5 元（每百万字）", "reason": "出稿速度最快，短文案、朋友圈批量写时成本最低。" }
        ],
        "deepseek": [
          { "model": "deepseek-v4-flash", "badge": "长文首选", "context": "100万字", "price": "读入 1.5 元 / 写出 4.5 元（每百万字，忙时翻倍）", "reason": "写长文章、方案、报告时结构更清晰，还能开启「深度思考」。" },
          { "model": "deepseek-v4-pro", "badge": "文笔最强", "context": "100万字", "price": "读入 4.5 元 / 写出 13.5 元（每百万字，忙时翻倍）", "reason": "复杂报告、商业方案写得最好，重要场合值得。" }
        ],
        "aliyun": [
          { "model": "qwen-plus", "badge": "阿里写作好", "context": "100万字", "price": "读入 0.8 元 / 写出 2 元（每百万字）", "reason": "通义千问中文写作强，公众号、文案质量高，有免费额度。" },
          { "model": "qwen-max", "badge": "阿里旗舰", "context": "100万字", "price": "读入 2 元 / 写出 6 元（每百万字）", "reason": "通义旗舰模型，重要场合的发言稿、商业方案写得最好。" }
        ],
        "tencent": [
          { "model": "hunyuan-pro", "badge": "腾讯创作强", "context": "4万字", "price": "读入 4 元 / 写出 12 元（每百万字）", "reason": "混元 Pro 中文创作能力强，文案、文章质量高。" }
        ]
      }
    },
    {
      "id": "code",
      "name": "编程/代码",
      "desc": "写程序、找 bug、解释代码",
      "kind": "code",
      "agents": ["aider", "deepseek-harness", "openclaw", "hermes", "cherry-studio"],
      "platform_models": {
        "deepseek": [
          { "model": "deepseek-v4-flash", "badge": "编程性价比之王", "context": "100万字", "price": "读入 1.5 元 / 写出 4.5 元（每百万字，忙时翻倍）", "reason": "写代码、改 bug 又快又准，配合 aider 一条命令开工。" },
          { "model": "deepseek-v4-pro", "badge": "难题旗舰", "context": "100万字", "price": "读入 4.5 元 / 写出 13.5 元（每百万字，忙时翻倍）", "reason": "最难的重构、架构设计也能搞定，大项目首选。" }
        ],
        "doubao": [
          { "model": "doubao-seed-2.0-code", "badge": "编程专用模型", "context": "3.2万字", "price": "读入 3.2 元 / 写出 16 元（每百万字）", "reason": "豆包专为写代码训练的版本，大段重构、写工程代码时表现稳定。" },
          { "model": "doubao-seed-1.6-flash", "badge": "快速查语法", "context": "25.6万字", "price": "读入 0.15 元 / 写出 1.5 元（每百万字）", "reason": "出回答最快，适合快速查语法、问小问题。" },
          { "model": "doubao-seed-1.6", "badge": "深度分析", "context": "25.6万字", "price": "读入 0.8 元 / 写出 2 元起（每百万字）", "reason": "会带着思考分析代码，复杂逻辑理解更准。" }
        ],
        "zhipu": [
          { "model": "glm-4-flashx", "badge": "极速低价", "context": "12.8万字", "price": "0.1 元 / 百万字（读写同价）", "reason": "每百万字只要 1 毛钱，高频查语法、问小问题一天花不了几分钱。" },
          { "model": "glm-4-flash", "badge": "完全免费", "context": "12.8万字", "price": "完全免费，注册就能用", "reason": "零成本问编程问题，新手练手完全不花钱。" },
          { "model": "glm-4-air", "badge": "轻量低价", "context": "12.8万字", "price": "约 0.5 元 / 百万字", "reason": "比 Flash 更轻，纯查 API 文档、问语法时够用。" }
        ]
      }
    },
    {
      "id": "translate",
      "name": "翻译",
      "desc": "中英文互译、日常翻译",
      "kind": "text",
      "agents": ["workbuddy", "qwenwork", "doubao-app", "cherry-studio", "chatbox"],
      "platform_models": {
        "zhipu": [
          { "model": "glm-4-flash", "badge": "完全免费", "context": "12.8万字", "price": "完全免费，注册就能用", "reason": "GLM 官方推荐翻译场景，能处理俚语、语气和中英混杂，完全免费。" },
          { "model": "glm-4-flashx", "badge": "极速", "context": "12.8万字", "price": "0.1 元 / 百万字（读写同价）", "reason": "速度更快，批量翻译大量短文本时几乎不花钱。" },
          { "model": "glm-4-air", "badge": "轻量低价", "context": "12.8万字", "price": "约 0.5 元 / 百万字", "reason": "日常短句翻译够用，价格极低。" }
        ],
        "deepseek": [
          { "model": "deepseek-v4-flash", "badge": "长文翻译稳", "context": "100万字", "price": "读入 1.5 元 / 写出 4.5 元（每百万字，忙时翻倍）", "reason": "整份合同、论文一次性丢进去也不怕超长，专业术语翻得准。" },
          { "model": "deepseek-v4-pro", "badge": "专业翻译", "context": "100万字", "price": "读入 4.5 元 / 写出 13.5 元（每百万字，忙时翻倍）", "reason": "最难的专业文档、法律合同翻得最准。" }
        ],
        "doubao": [
          { "model": "doubao-seed-2.0-mini", "badge": "低价均衡", "context": "3.2万字", "price": "读入 0.2 元 / 写出 2 元（每百万字）", "reason": "短句、邮件、字幕翻译响应快，量大时费用极低。" },
          { "model": "doubao-seed-1.6-flash", "badge": "快速翻译", "context": "25.6万字", "price": "读入 0.15 元 / 写出 1.5 元（每百万字）", "reason": "出回答最快，日常翻译量不大时成本几乎为零。" },
          { "model": "doubao-seed-1.6", "badge": "深度翻译", "context": "25.6万字", "price": "读入 0.8 元 / 写出 2 元起（每百万字）", "reason": "会带着思考翻译，复杂语境、文化差异处理更好。" }
        ]
      }
    },
    {
      "id": "study",
      "name": "学习/长文档整理",
      "desc": "读长文章、做总结、整理资料",
      "kind": "text",
      "agents": ["workbuddy", "qwenwork", "doubao-app", "cherry-studio", "chatbox"],
      "platform_models": {
        "deepseek": [
          { "model": "deepseek-v4-flash", "badge": "读长文首选", "context": "100万字", "price": "读入 1.5 元 / 写出 4.5 元（每百万字，重复内容低至 0.05 元）", "reason": "一次能读 100 万字（约一整本书），反复问同一资料时重复部分只收几分钱。" },
          { "model": "deepseek-v4-pro", "badge": "深度理解", "context": "100万字", "price": "读入 4.5 元 / 写出 13.5 元（每百万字，忙时翻倍）", "reason": "最难的理解得最透，学术论文、法律条文分析最准。" }
        ],
        "zhipu": [
          { "model": "glm-4-long", "badge": "超长文本低价", "context": "100万字", "price": "1 元 / 百万字（读写同价）", "reason": "同样支持 100 万字长文，价格统一好算，适合大批量资料整理。" },
          { "model": "glm-4-flash", "badge": "完全免费", "context": "12.8万字", "price": "完全免费，注册就能用", "reason": "短文章、网页内容做总结不花钱，新手入门首选。" },
          { "model": "glm-4-flashx", "badge": "极速", "context": "12.8万字", "price": "0.1 元 / 百万字（读写同价）", "reason": "速度更快，批量处理中等长度文章时 1 毛钱 100 万字。" }
        ],
        "doubao": [
          { "model": "doubao-seed-1.6", "badge": "边读边思考", "context": "25.6万字", "price": "读入 0.8 元 / 写出 2 元起（每百万字）", "reason": "会带着思考做总结归纳，还能把资料里的图表截图一起丢给它看。" },
          { "model": "doubao-seed-1.6-flash", "badge": "快速总结", "context": "25.6万字", "price": "读入 0.15 元 / 写出 1.5 元（每百万字）", "reason": "出总结最快，日常短文、网页内容快速提取要点。" },
          { "model": "doubao-seed-2.0-mini", "badge": "低价均衡", "context": "3.2万字", "price": "读入 0.2 元 / 写出 2 元（每百万字）", "reason": "适合中等长度资料整理，量大时费用极低。" }
        ]
      }
    },
    {
      "id": "image",
      "name": "做图（图像生成）",
      "desc": "根据描述生成图片、做设计",
      "kind": "image",
      "agents": ["doubao-app", "zhipu-web", "jimeng", "ark-web"],
      "platform_models": {
        "zhipu": [
          { "model": "cogview-4", "badge": "做图最便宜", "context": "", "price": "0.06 元 / 张", "reason": "6 分钱一张图，特别擅长在画面里写正确的中文汉字，做海报、菜单、电商图首选。" }
        ],
        "doubao": [
          { "model": "doubao-seedream-5.0", "badge": "效果最新最好", "context": "", "price": "0.22 元 / 张", "reason": "字节最新做图模型，画面精致、真实感强，即梦 App 用的就是同系列技术。" },
          { "model": "doubao-seedream-4.5", "badge": "成熟稳定", "context": "", "price": "0.25 元 / 张", "reason": "上一代成熟版本，风格稳定不翻车，商用出图量大时可靠。" }
        ]
      }
    },
    {
      "id": "video",
      "name": "视频生成",
      "desc": "根据描述生成短视频",
      "kind": "video",
      "agents": ["jimeng", "doubao-app", "zhipu-web", "kling", "ark-web"],
      "platform_models": {
        "zhipu": [
          { "model": "cogvideox-3", "badge": "试错成本最低", "context": "", "price": "约 1.4 元 / 条（官方活动价更低）", "reason": "支持给首尾两张图让它生成中间画面，画面稳、价格低，先花小钱验证创意最合适。" }
        ],
        "doubao": [
          { "model": "doubao-seedance-2.0-mini", "badge": "低价短视频", "context": "", "price": "0.462 元 / 秒（480P，5 秒约 2.3 元）", "reason": "豆包轻量视频模型，价格便宜、出片快，适合批量做口播背景、转场素材。" },
          { "model": "doubao-seedance-2.5", "badge": "画质旗舰", "context": "", "price": "约 2 元 / 秒（720P，5 秒约 10 元）", "reason": "2026 年最新旗舰，能生成 30 秒长镜头，人物动作和真实场景效果最好。" }
        ]
      }
    },
    {
      "id": "multimodal",
      "name": "多模态（看图说话）",
      "desc": "上传图片，让 AI 看图回答问题",
      "kind": "vision",
      "agents": ["doubao-app", "workbuddy", "cherry-studio", "chatbox", "qwenwork"],
      "platform_models": {
        "zhipu": [
          { "model": "glm-4v-flash", "badge": "完全免费", "context": "20万字", "price": "完全免费，注册就能用", "reason": "看图说话完全免费，识别截图、拍题讲解、读表格零成本。" }
        ],
        "doubao": [
          { "model": "doubao-seed-1.6-flash", "badge": "极速识图", "context": "25.6万字", "price": "读入 0.15 元 / 写出 1.5 元（每百万字）", "reason": "图片发过去几乎秒回，能看清图片里的文字和细节，日常查资料、验货、识图都顺手。" },
          { "model": "doubao-seed-1.6", "badge": "深度理解", "context": "25.6万字", "price": "读入 0.8 元 / 写出 2 元起（每百万字）", "reason": "会对着图深度思考，能分析图纸、票据、复杂图表，回答更严谨。" }
        ]
      }
    }
  ],
  /* 实际案例：8个场景各一个实战教程，图文并茂讲解怎么用AI */
  "case_studies": [
    {
      "id": "case-chat",
      "scene_id": "chat",
      "title": "用 AI 帮你写一封感谢信",
      "summary": "过年收了长辈红包，想写封像样的感谢信，但不知道怎么措辞？用 AI 三分钟搞定。",
      "difficulty": "零基础",
      "tools": "豆包工作（字节官方电脑软件，自带模型不用配Key）",
      "cover": "assets/cases/case-chat-cover.png",
      "example": "把上面那句话发给豆包后，几秒钟它就会写出这样一封感谢信（真实样例）：\n\n亲爱的姑姑：\n\n您好！过年收到您给的红包，心里特别温暖。这500块钱不只是心意，更是您对我的疼爱和牵挂。\n\n这一年您总是想着法子给孩子们做好吃的，家里有您在就热热闹闹的。新的一年，祝您身体健康、笑口常开，也欢迎您常来我家坐坐，让我也能好好招待您。\n\n谢谢您一直以来的疼爱！\n\n晚辈：小明\n2026年2月\n\n你只需要把「姑姑」「500块」「小明」换成自己的实际情况，就能直接发微信了。",
      "steps": [
        { "title": "第一步：打开豆包工作（电脑软件）", "text": "在电脑上打开已装好的「豆包工作」，用抖音账号扫码登录就能用——模型已经内置，不用填 Key、不用选模型。", "tip": "还没装？在首页「我不知道选哪个」→ 日常聊天里找到豆包工作，点「一键安装」。", "image": "assets/cases/case-chat-step1.png" },
        { "title": "第二步：告诉 AI 你要写什么", "text": "在聊天框里打字（就像发微信一样）：「帮我写一封感谢信给姑姑，感谢她过年给了500块红包，语气要真诚但不夸张，200字左右。」", "tip": "说清楚：写给谁、感谢什么、语气要求、字数，AI 才能写得准。", "image": "assets/cases/case-chat-step2.png" },
        { "title": "第三步：看 AI 写的结果", "text": "按回车后等几秒，AI 会直接给你一封完整的感谢信。如果觉得不够好，可以接着说「语气再活泼一点」让它改。", "tip": "不满意就说哪里不好，AI 会重写，不用从头再来。", "image": "assets/cases/case-chat-step3.png" },
        { "title": "第四步：复制使用", "text": "鼠标选中 AI 写好的文字，右键→复制（或按 Ctrl+C），粘贴到微信、QQ 里发出去就行。", "tip": "AI 写的是草稿，你过一眼、改个别词，就是自己的了。", "image": "assets/cases/case-chat-step4.png" }
      ]
    },
    {
      "id": "case-write",
      "scene_id": "write",
      "title": "用 AI 写一篇公众号文章",
      "summary": "开了一家小店，想在公众号发篇文章吸引顾客，但不会写文案？用 AI 五分钟出初稿。",
      "difficulty": "零基础",
      "tools": "千问办公（阿里官方电脑软件，自带通义千问）",
      "cover": "assets/cases/case-write-cover.png",
      "example": "按上面的要求发给千问，它会写出这样的文章（真实样例节选）：\n\n标题：《在暖阳咖啡，用一杯手冲唤醒你的下午》\n\n上班族的你，是不是每天下午都要靠咖啡「续命」？\n\n在xx路xx号，有一家叫「暖阳咖啡」的社区小店。这里的咖啡不玩花样，只做一件事：把每一杯手冲做到最好。埃塞俄比亚的果酸、云南的醇厚、曼特宁的浓苦——15到30元，就能喝到精品咖啡馆的品质。\n\n店主每天现烘现磨，豆子的新鲜度看得见。不赶时间的话，坐在窗边晒着太阳喝一杯，比任何提神饮料都治愈。\n\n📍地址：xx路xx号　🕐 营业：9:00-19:00\n🎁 到店报「公众号」，首次立减5元\n\n接着你可以说「把标题再起3个备选」「语气再亲切一点」，AI 会继续改到满意。",
      "steps": [
        { "title": "第一步：打开千问办公（电脑软件）", "text": "在电脑上打开已装好的「千问办公」，用淘宝或支付宝扫码登录就能用——自带通义千问模型，中文写作强，不用填 Key。", "tip": "还没装？在「我不知道选哪个」→ 写作/文案场景里找到千问办公，点「一键安装」。", "image": "assets/cases/case-write-step1.png" },
        { "title": "第二步：把背景说清楚", "text": "在聊天框输入：「我开了一家社区咖啡店，叫'暖阳咖啡'，主打手冲精品咖啡，价格15-30元，地址在xx路xx号。帮我写一篇公众号文章，500字左右，要吸引附近上班族来尝鲜。」", "tip": "店名、卖点、价格、地址、目标客人——这五个要素说全了，AI 写得更对味。", "image": "assets/cases/case-write-step2.png" },
        { "title": "第三步：让 AI 改到满意", "text": "看完第一版后，可以说「开头加一句问候语」「结尾加个到店引导」「中间加一段手冲咖啡的介绍」，AI 会逐步修改。", "tip": "像跟编辑提修改意见一样，一条一条说，AI 一条一条改。", "image": "assets/cases/case-write-step3.png" },
        { "title": "第四步：排版发布", "text": "复制 AI 写好的文字，打开微信公众号后台→新建图文→粘贴进去，配张图就能发了。", "tip": "AI 写的是文字，配图可以用「做图」案例里的即梦画一张。", "image": "assets/cases/case-write-step4.png" }
      ]
    },
    {
      "id": "case-code",
      "scene_id": "code",
      "title": "用 AI 帮你写一个 Excel 宏（自动整理表格）",
      "summary": "每天要把多个表格合并成一个，手动复制粘贴太累？让 AI 帮你写个宏，一键搞定。",
      "difficulty": "会用 Excel",
      "tools": "aider（终端编程智能体）+ DeepSeek 模型（国产）",
      "cover": "assets/cases/case-code-cover.png",
      "example": "把需求发给 aider，它会自动写出这样的宏代码并保存成文件（真实样例节选）：\n\nSub 合并所有表格()\n    Dim wb As Workbook, f As String, first As Boolean\n    first = True\n    f = Dir(ThisWorkbook.path & \"\\*.xlsx\")\n    Do While f <> \"\"\n        If f <> ThisWorkbook.Name Then\n            Set wb = Workbooks.Open(ThisWorkbook.path & \"\\\" & f)\n            If first Then\n                wb.Sheets(1).UsedRange.Copy 目标表.Range(\"A1\")   ' 第一个文件连表头\n                first = False\n            Else\n                wb.Sheets(1).UsedRange.Offset(1).Copy 目标表末尾   ' 后面的跳过表头\n            End If\n            wb.Close False\n        End If\n        f = Dir\n    Loop\n    MsgBox \"合并完成！\"\nEnd Sub\n\n在 Excel 里按 Alt+F11 粘贴进去，按 F5 运行，几秒钟就把几十个表合成一个。有报错就把红字复制给 aider，它自己会修。",
      "steps": [
        { "title": "第一步：装好 aider 并配好 Key", "text": "在「AI 工具库」里安装 aider，然后在场景推荐里选 DeepSeek 的模型，点「部署」把 Key 填进去。aider 会自动配好。", "tip": "aider 是终端工具，看起来像黑窗口，但其实就是打字跟它说需求。", "image": "assets/cases/case-code-step1.png" },
        { "title": "第二步：用大白话描述需求", "text": "打开终端输入 aider 启动后，直接打字：「帮我写一个 Excel VBA 宏，把当前文件夹里所有 .xlsx 文件的第一个工作表合并到一个新文件里，表头只保留一次。」", "tip": "不用会编程，像跟同事说需求一样描述就行。", "image": "assets/cases/case-code-step2.png" },
        { "title": "第三步：看 AI 写代码并测试", "text": "aider 会自动写出 VBA 代码并保存成文件。你打开 Excel→按 Alt+F11→导入代码→运行，看结果对不对。", "tip": "第一次跑可能有小问题，把报错信息复制给 aider，它会自己改。", "image": "assets/cases/case-code-step3.png" },
        { "title": "第四步：保存以后重复用", "text": "测试没问题后，这个宏文件保存好，以后每天只需在 Excel 里点一下运行，几秒就合并完。", "tip": "一次写好，永久受益——这就是 AI 编程的价值。", "image": "assets/cases/case-code-step4.png" }
      ]
    },
    {
      "id": "case-translate",
      "scene_id": "translate",
      "title": "用 AI 翻译一份英文合同",
      "summary": "收到一份英文合作合同，看不懂？用 AI 翻译成中文，还帮你标出关键条款。",
      "difficulty": "零基础",
      "tools": "DeepSeek v4-flash + DeepSeek 官网",
      "cover": "assets/cases/case-translate-cover.png",
      "example": "把合同条款发给 DeepSeek 后，它会这样回复（真实样例）：\n\n【原文】Either party may terminate this Agreement upon thirty (30) days' prior written notice if the other party materially breaches this Agreement and fails to cure such breach within the cure period.\n\n【译文】任何一方如发现对方【重要】存在重大违约行为，且在补救期内未能纠正，可提前三十（30）天书面通知对方终止本协议。\n\n【这句对您意味着什么】这一条是说：对方违约后要先给机会改正，改不好才能解约。对您有利——不会因为一次小失误就被直接终止合作。\n\n翻译+解释+风险提示一次到位，看完再签合同心里有底。",
      "steps": [
        { "title": "第一步：打开 DeepSeek 官网选模型", "text": "浏览器打开 chat.deepseek.com，登录后选「深度思考」模式（用 v4-flash 模型，便宜且翻译质量好）。", "tip": "DeepSeek 翻译比传统翻译软件更通顺，因为它理解上下文。", "image": "assets/cases/case-translate-step1.png" },
        { "title": "第二步：粘贴合同全文", "text": "把英文合同全文复制（Ctrl+A 全选，Ctrl+C 复制），粘贴到聊天框，前面加一句：「请把以下英文合同翻译成中文，并在关键条款（付款、违约、终止）后面加【重要】标记：」", "tip": "先说要求，再贴内容，AI 才知道你要它干什么。", "image": "assets/cases/case-translate-step2.png" },
        { "title": "第三步：追问不理解的条款", "text": "看完翻译后，可以对 AI 说「第5条的'不可抗力'是什么意思，对我不利吗？」「如果对方延迟交货，我能要求赔偿吗？」", "tip": "AI 不光翻译，还能解释法律术语，帮你判断风险。", "image": "assets/cases/case-translate-step3.png" },
        { "title": "第四步：保存翻译结果", "text": "把中文翻译复制到 Word 文档保存，中英文对照着看，签合同心里有底。", "tip": "重要合同建议再请人工律师过一遍，AI 是辅助不是替代。", "image": "assets/cases/case-translate-step4.png" }
      ]
    },
    {
      "id": "case-study",
      "scene_id": "study",
      "title": "用 AI 读一篇 50 页的学术论文",
      "summary": "老板发了一篇50页的英文论文让看完写总结？用 AI 三分钟提取要点。",
      "difficulty": "零基础",
      "tools": "智谱 GLM-4-Flash（免费）+ 智谱网页版",
      "cover": "assets/cases/case-study-cover.png",
      "example": "按上面的模板发给智谱，它会这样总结（真实样例格式）：\n\n1. 研究什么问题：本文研究大语言模型在中文医疗问答中的准确性，重点测试模型对药品剂量、禁忌症等专业问题的回答质量。\n\n2. 用了什么方法：团队构建了包含 5000 道题的中文医疗测试集，对比了 5 个主流模型的答题准确率，并请 20 位医生人工评分。\n\n3. 主要结论：国产模型在常见病问答上准确率超过 90%，但在复杂用药建议上仍需医生把关。\n\n4. 有什么局限：测试题以常见病为主，缺少罕见病例；人工评分样本量偏小。\n\n最后再让它「整理成300字汇报」，直接就能交给老板。",
      "steps": [
        { "title": "第一步：选免费长文本模型", "text": "浏览器打开 open.bigmodel.cn（智谱网页版），登录后选「glm-4-flash」，完全免费，一次能读很长的文章。", "tip": "如果论文特别长（超过50页），可以选「glm-4-long」，专门读长文用。", "image": "assets/cases/case-study-step1.png" },
        { "title": "第二步：粘贴论文并提要求", "text": "把论文全文复制粘贴到聊天框，前面加：「请帮我总结这篇论文：1.研究什么问题 2.用了什么方法 3.主要结论是什么 4.有什么局限。每点用3-5句话。」", "tip": "给 AI 一个结构化模板（1234），它总结出来就有条理。", "image": "assets/cases/case-study-step2.png" },
        { "title": "第三步：深入追问细节", "text": "看完总结后，可以追问「第3节的实验是怎么做的？」「这个方法跟xx方法比哪个好？」AI 会从全文里找答案回答你。", "tip": "把 AI 当成一个读过这篇论文的助手，随便问。", "image": "assets/cases/case-study-step3.png" },
        { "title": "第四步：生成汇报文档", "text": "最后说「把上面的总结整理成一份300字的汇报，适合发给非专业人士看」，AI 会重新组织语言，简洁好懂。", "tip": "让 AI 换个受众写，就是把学术语言翻译成人话。", "image": "assets/cases/case-study-step4.png" }
      ]
    },
    {
      "id": "case-image",
      "scene_id": "image",
      "title": "用 AI 给咖啡店画一张海报图",
      "summary": "公众号文章要配图，找设计师太贵？用 AI 画一张，成本几毛钱。",
      "difficulty": "零基础",
      "tools": "智谱 CogView-4（0.06元/张）+ 即梦网页版",
      "cover": "assets/cases/case-image-cover.png",
      "example": "把上面那段描述发给即梦，10 秒后它会一次给你 4 张图：木质桌面上摆着一只白瓷杯，深棕色咖啡液冒着袅袅热气，几片金黄落叶散在旁边，暖阳光从左侧斜照进来，影调像专业美食摄影。\n\n挑图 3 看：①热气是不是自然飘起来（僵硬的直线说明穿帮）②杯口椭圆是不是居中（歪了显得手抖）③影子方向是否统一（左光右影才对）。\n\n不满意就改描述再生成，例如杯子歪了就加一句「杯子居中，构图平稳」；背景太乱就加「背景干净，浅景深」。多试两轮，几分钱就能出一张能直接当海报的图。",
      "steps": [
        { "title": "第一步：打开即梦网页版", "text": "在浏览器打开即梦（jimeng.jianying.com），登录抖音账号即可使用，不需要 API Key。", "tip": "即梦是字节官方做图工具，新用户有免费体验次数。", "image": "assets/cases/case-image-step1.png" },
        { "title": "第二步：描述你想要的画面", "text": "在输入框打字：「一杯冒着热气的手冲咖啡，放在木质桌面上，旁边有几片落叶，暖色调，阳光从左侧照进来，摄影风格，高清。」", "tip": "描述公式：主体+环境+光线+色调+风格，越具体出图越好。", "image": "assets/cases/case-image-step2.png" },
        { "title": "第三步：选尺寸并生成", "text": "选竖版（适合手机看）或横版（适合文章配图），点「生成」等10秒，AI 会出4张图供你选。", "tip": "不满意就改描述词再生成，每张只要几分钱。", "image": "assets/cases/case-image-step3.png" },
        { "title": "第四步：下载并使用", "text": "选一张最满意的，点下载，保存到电脑，就可以用在公众号文章、朋友圈海报里了。", "tip": "商用的话，用智谱 CogView-4 更划算，0.06 元一张，通过 API 调用。", "image": "assets/cases/case-image-step4.png" }
      ]
    },
    {
      "id": "case-video",
      "scene_id": "video",
      "title": "用 AI 给产品做一段 5 秒宣传视频",
      "summary": "想在抖音发个产品展示视频，但不会拍不会剪？用 AI 直接生成。",
      "difficulty": "零基础",
      "tools": "即梦视频（Seedance 2.0）+ 即梦网页版",
      "cover": "assets/cases/case-video-cover.png",
      "example": "把上面那段描述发给即梦视频，等 1-2 分钟它会生成一段 5 秒视频：镜头从上方特写开始，深棕色咖啡液缓缓注入白色瓷杯，液面泛起细腻的泡沫涟漪，杯口蒸汽袅袅上升，背景咖啡店虚化成暖黄色的光斑，电影感十足。\n\n拿到视频后两步加工：①加字幕「手冲精品 · 15元起」和店名；②配一段舒缓的背景音乐（即梦或剪映里都有一键配乐）。\n\n发抖音记得选竖版 9:16。第一次生成不满意，重点检查「动作是否流畅」——把「缓缓倒入」改成「快速倒入，溅起水花」就是完全不同的动感效果。",
      "steps": [
        { "title": "第一步：打开即梦视频", "text": "浏览器打开 jimeng.jianying.com，选「视频生成」功能，登录抖音账号。", "tip": "即梦视频新用户有免费体验额度，先免费试。", "image": "assets/cases/case-video-step1.png" },
        { "title": "第二步：描述视频画面", "text": "输入描述：「一杯咖啡从上方缓缓倒入白色杯中，咖啡液呈深棕色，杯中蒸汽袅袅升起，背景是模糊的咖啡店，画面温暖，特写镜头。」", "tip": "视频描述要写动作（倒入、升起），不要只写静态画面。", "image": "assets/cases/case-video-step2.png" },
        { "title": "第三步：选参数并生成", "text": "选 5 秒时长、竖版比例（适合抖音），点「生成视频」。等1-2分钟，AI 会做好一段短视频。", "tip": "视频生成比做图慢，每段约0.5-1元，先小量试。", "image": "assets/cases/case-video-step3.png" },
        { "title": "第四步：下载发布", "text": "预览满意后点下载，保存到手机或电脑，发到抖音、视频号就行。可以加文字、音乐做后期。", "tip": "AI 生成的视频是素材，配上音乐和文字效果更好。", "image": "assets/cases/case-video-step4.png" }
      ]
    },
    {
      "id": "case-multimodal",
      "scene_id": "multimodal",
      "title": "用 AI 看懂一张药品说明书照片",
      "summary": "老人拍了一张英文药品说明书照片，看不懂？用 AI 看图回答你的问题。",
      "difficulty": "零基础",
      "tools": "豆包工作（电脑软件，自带能看图的模型）",
      "cover": "assets/cases/case-multimodal-cover.png",
      "example": "上传说明书照片并提问后，豆包会这样回答（真实样例）：\n\n根据您上传的说明书照片，回答如下：\n\n【用法用量】成人每次 1 片（0.5g），每日 3 次，饭后用温水送服。\n\n【禁忌】对本品成分过敏者禁用；肝肾功能不全者慎用；服药期间禁止饮酒。\n\n【保存条件】密封，置阴凉干燥处（不超过25℃）保存，请放于儿童不能接触的地方。\n\n以上内容摘自您上传的照片原文翻译。追问「跟感冒药能一起吃吗」，它会结合图中成分表继续回答。提醒：AI 看图很准，但用药决定请遵医嘱。",
      "steps": [
        { "title": "第一步：打开豆包工作（电脑软件）", "text": "在电脑上打开「豆包工作」并登录抖音账号——它自带的模型能看懂图片，不用单独选模型、不用填 Key。", "tip": "网页版也行：浏览器打开 www.doubao.com 登录即可；手机上装豆包 App 拍照更方便。", "image": "assets/cases/case-multimodal-step1.png" },
        { "title": "第二步：上传图片", "text": "点聊天框旁边的📎按钮（或图片图标），选中药品说明书的照片上传。", "tip": "照片拍正、拍清楚，AI 才能认准上面的字。", "image": "assets/cases/case-multimodal-step2.png" },
        { "title": "第三步：提问让它看图回答", "text": "图片上传后，在聊天框打字：「这张药片说明书上写的用法用量是什么？有什么禁忌？用中文回答。」", "tip": "先说看什么（用法用量、禁忌），再说用中文答，AI 就会从图里找信息。", "image": "assets/cases/case-multimodal-step3.png" },
        { "title": "第四步：追问并保存", "text": "看完回答后可以追问「这个药饭前还是饭后吃？」「跟感冒药能一起吃吗？」AI 会根据图片内容回答。重要信息截图保存。", "tip": "AI 能看图但不是医生，用药建议仅供参考，具体遵医嘱。", "image": "assets/cases/case-multimodal-step4.png" }
      ]
    }
  ],
  /* 智能体（AI 工具）：gui=电脑图形界面软件，cli=终端命令行工具，web=网页版（登录即用） */
  "agents": [
    {
      "id": "cherry-studio",
      "name": "Cherry Studio（樱桃助手）",
      "kind": "gui",
      "tag": "图形界面 · 新手首选",
      "desc": "最流行的免费 AI 图形客户端：一个软件里同时管理 DeepSeek、智谱、豆包、通义等多家模型，鼠标点几下就能用，支持导入配置文件，完全不用碰命令行。",
      "url": "https://cherry-ai.com/download",
      "setup_note": "安装后打开：左下角「设置」→「模型服务」→ 右上角「添加」→ 选「OpenAI」或「自定义提供商」，把下面四格信息照抄进去，点「检查」显示成功后，回首页顶部选择模型就能聊天。也可以直接点下面的「下载一键导入配置文件」，在模型服务页导入即可。"
    },
    {
      "id": "chatbox",
      "name": "Chatbox（聊天盒子）",
      "kind": "gui",
      "tag": "图形界面 · 简单清爽",
      "desc": "跨平台的免费 AI 桌面客户端，界面清爽、上手最简单，支持自定义接口地址，填入 API 地址和 Key 就能对接各家大模型。",
      "url": "https://chatboxai.app/zh",
      "setup_note": "安装后打开：左下角「设置」→「AI 提供方」选择「OpenAI API Key」（或「自定义提供方 / Custom Provider」），把下面四格信息照抄：API 域名填接口地址、API Key 填钥匙、模型名手动填进去，保存后回主界面即可聊天。"
    },
    {
      "id": "aider",
      "name": "aider（终端编程智能体）",
      "kind": "cli",
      "tag": "终端工具 · 编程专用",
      "desc": "在黑窗口（终端）里运行的 AI 编程搭子，设置一次环境变量，以后打开就自动带好模型，直接帮你改项目代码。",
      "url": "https://aider.chat/docs/install.html",
      "setup_note": "需要先装一次 Python，然后运行安装命令：python -m pip install aider-install ，再运行 aider-install。"
    },
    {
      "id": "jimeng",
      "name": "即梦（网页版）",
      "kind": "web",
      "tag": "网页 · 不用 API Key",
      "desc": "字节出品的做图/做视频网页，豆包 Seedream、Seedance 模型在背后撑腰。",
      "url": "https://jimeng.jianying.com/",
      "setup_note": "用抖音或手机号登录就能直接做图、做视频，每天有免费点数，不需要申请 API Key。"
    },
    {
      "id": "zhipu-web",
      "name": "智谱开放平台 · 体验中心",
      "kind": "web",
      "tag": "网页 · 不用 API Key",
      "desc": "智谱官方在线体验页，CogView 做图、CogVideoX 做视频都能在这里直接试。",
      "url": "https://www.bigmodel.cn/trialcenter",
      "setup_note": "注册登录后在「体验中心」找到对应模型直接用，消耗账号里的免费体验额度，不需要申请 API Key。"
    },
    {
      "id": "ark-web",
      "name": "火山方舟 · 在线体验",
      "kind": "web",
      "tag": "网页 · 不用 API Key",
      "desc": "豆包模型官方在线体验入口，做图、做视频、对话都能试。",
      "url": "https://www.volcengine.com/experience/ark",
      "setup_note": "登录火山引擎账号后直接在线体验，新人有免费体验额度，不需要申请 API Key。"
    },
    {
      "id": "kling",
      "name": "可灵（网页版）",
      "kind": "web",
      "tag": "网页 · 不用 API Key",
      "desc": "快手出品的 AI 视频工具，人物动作和镜头运动表现好。",
      "url": "https://klingai.com/",
      "setup_note": "手机号注册登录即用，每天有免费灵感值，不需要申请 API Key。"
    },
    {
      "id": "doubao-app",
      "name": "豆包工作（电脑版）",
      "kind": "app",
      "config": "builtin",
      "tag": "字节官方 · 最省心",
      "desc": "字节官方全能助手，自带豆包全系模型和「工作模式」：写文档、做表格、画PPT、生成图片视频都能干，装好登录就能用。",
      "url": "https://www.doubao.com/download/desktop",
      "setup_note": "官方安装包装好后，用手机号或抖音扫码登录即用，模型不用配、Key 不用填。"
    },
    {
      "id": "qwenwork",
      "name": "千问办公（电脑版）",
      "kind": "app",
      "config": "builtin",
      "tag": "阿里官方 · 办公搭子",
      "desc": "阿里官方 AI 办公客户端，自带 Qwen 最新模型：描述任务后自动拆解执行，直接交付 Word/PPT/Excel 成品文件。",
      "url": "https://qwenwork.cn/download",
      "installer": "https://assets.qwenwork.cn/release/latest/qwenworkcn-setup-x64.exe",
      "setup_note": "安装后登录账号即可，模型不用配、Key 不用填。"
    },
    {
      "id": "dumate",
      "name": "百度搭子 DuMate",
      "kind": "app",
      "config": "builtin",
      "tag": "百度官方 · 企业级 OpenClaw",
      "desc": "百度智能云出品的桌面 AI 办公智能体：直接操作软件、处理文件、做 Excel/PPT、跑数据，内置百度搜索与网盘技能，百度账号登录即用，数据在本地沙箱运行。",
      "url": "https://www.dumate.cn/",
      "setup_note": "安装后用手机号或百度账号登录即用，模型不用配、Key 不用填；首次使用给它指定一个工作文件夹即可。"
    },
    {
      "id": "workbuddy",
      "name": "WorkBuddy（腾讯）",
      "kind": "app",
      "config": "builtin",
      "tag": "腾讯官方 · 专家团模式",
      "desc": "腾讯出品的全场景 AI 办公工作台，100+ 领域专家智能体协作，能打通微信、腾讯文档、腾讯会议等生态，微信扫码登录即用。",
      "url": "https://workbuddy.tencent.com",
      "setup_note": "官方安装包装好后微信扫码登录即用，模型不用配、Key 不用填。"
    },
    {
      "id": "hermes",
      "name": "Hermes（开源智能体）",
      "kind": "app",
      "config": "custom",
      "tag": "Nous 出品 · 开源免费",
      "desc": "Nous Research 开源的个人 AI 智能体，有记忆、能定时干活、可接入微信/飞书/Telegram。支持 DeepSeek、智谱、阿里、腾讯等内置提供商，也支持自定义 OpenAI 兼容接口。",
      "url": "https://hermes-agent.nousresearch.com/",
      "installer": "https://hermes-assets.nousresearch.com/Hermes-Setup.exe",
      "setup_note": "官方桌面版安装后，点下面的「一键部署」会自动把 Key 写进 ~/.hermes/.env、模型写进 config.yaml；也可以在软件里用 hermes model 命令或设置页自己选内置服务商（Nous / OpenRouter 等，订阅计费）。"
    },
    {
      "id": "openclaw",
      "name": "OpenClaw（开源智能体）",
      "kind": "cli",
      "openclaw": true,
      "tag": "开源 · 全网最火",
      "desc": "开源个人 AI 智能体，跑在自己电脑上，能接微信、Telegram、Discord 等 20+ 聊天软件，还能控制浏览器、整理文件。Windows 推荐官方 Hub 桌面应用。",
      "url": "https://docs.openclaw.ai/zh-CN/platforms/windows",
      "installer": "https://github.com/openclaw/openclaw-windows-node/releases/latest/download/OpenClawCompanion-Setup-x64.exe",
      "setup_note": "先装 OpenClaw（推荐官方 Hub 桌面应用），再点「一键部署模型配置」把模型写进它的配置文件，打开就能用。"
    },
    {
      "id": "deepseek-harness",
      "name": "DeepSeek Harness",
      "kind": "app",
      "config": "advanced",
      "npm": "@deepseek-ai/dsh",
      "tag": "DeepSeek 官方 · 进阶",
      "desc": "DeepSeek 官方开源的智能体运行框架（一切皆插件）：模型负责思考、Harness 负责执行，兼容 DeepSeek/OpenAI 等模型。目前为开发者预览版，适合爱折腾的用户。",
      "url": "https://deepseek.com/harness/",
      "setup_note": "开发者预览版：桌面版点「一键安装」会用官方命令 npx @deepseek-ai/dsh web 自动执行（需要免费的 Node.js 环境，没有会引导你装）；启动后在设置里选择模型并粘贴 Key。"
    },
    {
      "id": "deepseek-web",
      "name": "DeepSeek 官网（网页版）",
      "kind": "web",
      "tag": "DeepSeek 官方 · 免 Key",
      "desc": "DeepSeek 官方网页版，浏览器打开、手机号登录就能聊天，不用装软件、不用 API Key。",
      "url": "https://chat.deepseek.com/",
      "setup_note": "浏览器打开官网，手机号登录即可使用，无需 API Key。"
    },
    {
      "id": "tongyi-web",
      "name": "通义千问（网页版）",
      "kind": "web",
      "tag": "阿里官方 · 免 Key",
      "desc": "阿里官方网页版，浏览器打开就能聊天写文章，淘宝或支付宝扫码登录即用，不用装软件、不用 API Key。",
      "url": "https://tongyi.aliyun.com/",
      "setup_note": "浏览器打开官网，用淘宝或支付宝扫码登录即可使用，无需 API Key。"
    }
  ],
  "tools": [
    {
      "id": "cherry-studio",
      "name": "Cherry Studio（樱桃助手）",
      "category": "chat",
      "desc": "最流行的免费 AI 图形客户端，一个软件管理多家大模型，支持 Windows/Mac",
      "download_url": "https://cherry-ai.com/download",
      "platform_support": ["windows", "mac"]
    },
    {
      "id": "chatbox",
      "name": "Chatbox（聊天盒子）",
      "category": "chat",
      "desc": "简单清爽的免费 AI 桌面客户端，填接口地址和 Key 就能用，支持 Windows/Mac/手机",
      "download_url": "https://chatboxai.app/zh",
      "platform_support": ["windows", "mac", "android", "ios"]
    },
    {
      "id": "deepseek-web",
      "name": "DeepSeek 官网（网页版）",
      "category": "chat",
      "desc": "DeepSeek 官方网页版，浏览器打开登录就能直接聊天，不用 Key",
      "download_url": "https://chat.deepseek.com/",
      "platform_support": ["web"]
    },
    {
      "id": "tongyi-web",
      "name": "通义千问（网页版）",
      "category": "chat",
      "desc": "阿里官方网页版，扫码登录即可聊天写文章，不用 Key",
      "download_url": "https://tongyi.aliyun.com/",
      "platform_support": ["web"]
    },
    {
      "id": "doubao-app",
      "name": "豆包 App",
      "category": "chat",
      "desc": "字节出品的 AI 助手，聊天、画图都能用",
      "download_url": "https://www.doubao.com/",
      "platform_support": ["android", "ios", "web"]
    },
    {
      "id": "dumate",
      "name": "百度搭子 DuMate",
      "category": "chat",
      "desc": "百度桌面 AI 办公智能体，能操作软件、处理文件、做 Excel/PPT，登录即用",
      "download_url": "https://www.dumate.cn/",
      "platform_support": ["windows", "mac", "android", "ios"]
    },
    {
      "id": "jimeng",
      "name": "即梦",
      "category": "multimodal",
      "desc": "字节出品，AI 画图和生成视频",
      "download_url": "https://jimeng.jianying.com/",
      "platform_support": ["web"]
    },
    {
      "id": "kling",
      "name": "可灵",
      "category": "multimodal",
      "desc": "快手出品，AI 视频生成效果好",
      "download_url": "https://klingai.com/",
      "platform_support": ["web"]
    },
    {
      "id": "hailuo",
      "name": "海螺",
      "category": "multimodal",
      "desc": "MiniMax 出品，AI 视频生成",
      "download_url": "https://hailuoai.video/",
      "platform_support": ["web"]
    },
    {
      "id": "tongyi-wanxiang",
      "name": "通义万相",
      "category": "multimodal",
      "desc": "阿里出品，AI 画图和设计",
      "download_url": "https://tongyi.aliyun.com/wanxiang/",
      "platform_support": ["web"]
    }
  ],
  "tutorials": {
    "deepseek": {
      "apply_url": "https://platform.deepseek.com/api_keys",
      "steps": [
        { "title": "第一步：打开官方申请页", "text": "点击页面上的「打开官方申请页」按钮，会在新窗口打开 DeepSeek 平台。如果没有登录，会自动跳到登录页。", "image": "assets/deepseek-signin-2026.png", "caption": "这是登录页，输入手机号收验证码" },
        { "title": "第二步：登录或注册账号", "text": "输入手机号，点击获取验证码，把收到的短信验证码填进去。第一次使用会自动注册，不用单独填资料。", "image": "", "caption": "" },
        { "title": "第三步：进入 API Keys 页面", "text": "登录成功后，页面左侧菜单找到「API Keys」点进去。如果已经在申请页，直接能看到创建按钮。", "image": "", "caption": "" },
        { "title": "第四步：创建新的 API Key", "text": "点击「Create new API Key」（创建新的密钥）按钮。给这个 Key 起个名字，比如「我的AI钥匙」，然后确认。", "image": "", "caption": "" },
        { "title": "第五步：复制生成的 Key", "text": "页面会弹出一串以「sk-」开头的字符，这就是你的 Key。\n⚠️ 注意：这串字符只显示一次！一定要立刻复制保存好。点「Copy」按钮复制。", "image": "", "caption": "" },
        { "title": "第六步：回到本应用粘贴 Key", "text": "复制好之后，回到小白AI管家，点击「我已经拿到 Key 了，下一步」，把 Key 粘贴进去就行。", "image": "", "caption": "" }
      ]
    },
    "zhipu": {
      "apply_url": "https://open.bigmodel.cn",
      "steps": [
        { "title": "第一步：打开官方申请页", "text": "点击页面上的「打开官方申请页」按钮，新窗口打开智谱AI官网。", "image": "assets/zhipu-home.png", "caption": "这是智谱AI首页，右上角点登录" },
        { "title": "第二步：登录或注册", "text": "点击右上角「登录」，弹出登录框。用手机号收验证码登录，第一次会自动注册。", "image": "assets/zhipu-login-popup.png", "caption": "用手机号收验证码登录" },
        { "title": "第三步：进入控制台", "text": "登录后，右上角点头像，选择「控制台」进入。控制台里能看到你账号的各种功能。", "image": "", "caption": "" },
        { "title": "第四步：找到 API Key 管理", "text": "在控制台左侧菜单找到「API Key 管理」点进去。这里可以看到你已有的 Key，也能创建新的。", "image": "", "caption": "" },
        { "title": "第五步：创建并复制 API Key", "text": "点击「添加 API Key」，起个名字，确认后会生成一串字符。\n⚠️ 这串字符只显示一次，立刻点复制保存好。", "image": "", "caption": "" },
        { "title": "第六步：回到本应用粘贴 Key", "text": "复制好之后，回到小白AI管家，点击「我已经拿到 Key 了，下一步」，把 Key 粘贴进去就行。", "image": "", "caption": "" }
      ]
    },
    "doubao": {
      "apply_url": "https://console.volcengine.com/ark/region:cn-beijing/apiKey",
      "steps": [
        { "title": "第一步：打开官方申请页", "text": "点击页面上的「打开官方申请页」按钮，新窗口打开火山方舟控制台。", "image": "assets/volcark-home.png", "caption": "这是火山方舟首页，右上角点登录" },
        { "title": "第二步：登录火山引擎账号", "text": "点击右上角「登录」，弹出登录框。用手机号收验证码登录。", "image": "assets/volcark-login-popup.png", "caption": "用手机号收验证码登录" },
        { "title": "第三步：进入 API Key 页面", "text": "登录后会自动进入方舟控制台的 API Key 管理页。", "image": "assets/volcark-apikey.png", "caption": "这里能看到 API Key 列表和创建按钮" },
        { "title": "第四步：创建 API Key", "text": "点击「创建 API Key」按钮，起个名字，确认创建。", "image": "", "caption": "" },
        { "title": "第五步：复制 Key", "text": "创建成功后会显示一串字符，⚠️ 只显示一次，立刻点复制保存好。", "image": "", "caption": "" },
        { "title": "第六步：回到本应用粘贴 Key", "text": "复制好之后，回到小白AI管家，点击「我已经拿到 Key 了，下一步」，把 Key 粘贴进去就行。", "image": "", "caption": "" }
      ]
    },
    "aliyun": {
      "apply_url": "https://bailian.console.aliyun.com/apiKey",
      "steps": [
        { "title": "第一步：打开阿里云百炼平台", "text": "点击「打开官方申请页」按钮，新窗口打开阿里云百炼控制台。", "image": "", "caption": "" },
        { "title": "第二步：登录阿里云账号", "text": "用支付宝扫码或手机号收验证码登录。没有账号会自动注册。", "image": "", "caption": "" },
        { "title": "第三步：进入 API Key 管理", "text": "登录后左侧菜单找到「API-KEY 管理」点进去。", "image": "", "caption": "" },
        { "title": "第四步：创建新的 API Key", "text": "点击「创建新的 API-KEY」，选好默认模型，确认创建。", "image": "", "caption": "" },
        { "title": "第五步：复制 Key", "text": "创建成功后会显示一串字符，⚠️ 只显示一次，立刻点复制保存好。", "image": "", "caption": "" },
        { "title": "第六步：回到本应用粘贴 Key", "text": "复制好之后，回到小白AI管家，把 Key 粘贴进去就行。", "image": "", "caption": "" }
      ]
    },
    "baidu": {
      "apply_url": "https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application",
      "steps": [
        { "title": "第一步：打开百度千帆平台", "text": "点击「打开官方申请页」按钮，新窗口打开百度千帆控制台。", "image": "", "caption": "" },
        { "title": "第二步：登录百度账号", "text": "用百度账号或手机号收验证码登录。没有账号会自动注册。", "image": "", "caption": "" },
        { "title": "第三步：创建应用", "text": "在「应用管理」页面点击「创建应用」，填好应用名称确认。", "image": "", "caption": "" },
        { "title": "第四步：获取 API Key", "text": "创建应用后会显示 API Key 和 Secret Key，⚠️ 只显示一次，立刻复制保存好。", "image": "", "caption": "" },
        { "title": "第五步：回到本应用粘贴 Key", "text": "复制好之后，回到小白AI管家，把 API Key 粘贴进去就行。", "image": "", "caption": "" }
      ]
    },
    "tencent": {
      "apply_url": "https://console.cloud.tencent.com/cam/capi",
      "steps": [
        { "title": "第一步：打开腾讯云控制台", "text": "点击「打开官方申请页」按钮，新窗口打开腾讯云 API 密钥管理页。", "image": "", "caption": "" },
        { "title": "第二步：登录腾讯云账号", "text": "用微信扫码或手机号收验证码登录。没有账号会自动注册。", "image": "", "caption": "" },
        { "title": "第三步：进入 API 密钥管理", "text": "登录后左侧菜单找到「访问管理 → API 密钥管理」。", "image": "", "caption": "" },
        { "title": "第四步：创建新的密钥", "text": "点击「新建密钥」按钮，确认后会生成 SecretId 和 SecretKey。", "image": "", "caption": "" },
        { "title": "第五步：复制 Key", "text": "⚠️ SecretKey 只显示一次，立刻点复制保存好。", "image": "", "caption": "" },
        { "title": "第六步：回到本应用粘贴 Key", "text": "复制好之后，回到小白AI管家，把 SecretKey 粘贴进去就行。", "image": "", "caption": "" }
      ]
    }
  },
  /* 客户体验反馈：提交方式为打开用户本机默认邮件客户端（mailto），正文自动复制兜底 */
  "feedback": {
    "email": "511647426@qq.com",
    "types": [
      { "id": "suggest", "icon": "💡", "name": "功能建议", "subject": "功能建议" },
      { "id": "bug", "icon": "🐛", "name": "问题报错", "subject": "问题报错" },
      { "id": "other", "icon": "💬", "name": "其他", "subject": "其他反馈" }
    ]
  },
  "faq": [
    {
      "q": "收不到验证码怎么办？",
      "short_a": "先查手机信号和短信拦截，等 60 秒后重新获取，还不行就换号或稍后再试。",
      "details": "1. 看手机有没有信号，能不能正常收到别的短信。\n2. 检查手机的「骚扰拦截」或「垃圾短信」文件夹，验证码可能被拦在那里。\n3. 点了「获取验证码」后等 60 秒再重新点，不要连续狂点。\n4. 如果还是收不到，换一个手机号试试，或者过几分钟再试。"
    },
    {
      "q": "实名认证是什么、要多久？",
      "short_a": "实名认证是用身份证号或刷脸验证身份，国家规定正规平台都要，一般几分钟到半天通过。",
      "details": "1. 部分平台在创建 Key 或使用服务前，会要求实名认证。\n2. 实名认证就是验证你是真人，一般用身份证号，或者对着手机刷一下脸。\n3. 这是国家规定，所有正规的 AI 平台都会要求，不是平台故意为难你。\n4. 一般几分钟就能通过，人多的时候最多半天。"
    },
    {
      "q": "Key 是什么样子的？",
      "short_a": "Key 是一串以「sk-」开头的长字符，就像一把钥匙，有了它才能调用 AI。",
      "details": "1. Key 的样子大概是：sk-xxxxxxxxxxxxxxxxxxxxxxxx（一长串字符）。\n2. 它就像一把钥匙，把它填进 AI 工具里，工具才能帮你调用 AI。\n3. 每个平台生成的 Key 格式可能略有不同，但都是一串字符。\n4. 注意：Key 生成后只显示一次，一定要立刻复制保存好。"
    },
    {
      "q": "怕 Key 泄露怎么办？",
      "short_a": "Key 只存在你自己浏览器里不上传，别发给别人；泄露了就去平台后台删掉旧的、重新生成。",
      "details": "1. 在本应用里，Key 只保存在你自己电脑的浏览器 localStorage 中，不会上传到任何服务器。\n2. 不要把 Key 发给别人，也不要贴到微信群、朋友圈、公开论坛等地方。\n3. 如果不小心泄露了，去对应平台的 API Key 管理页面，把旧的 Key 删除，再重新生成一个新的。\n4. 建议定期更换 Key，就像定期换密码一样。"
    },
    {
      "q": "有免费额度吗？够用多久？",
      "short_a": "大部分新用户注册都送免费额度，日常聊天够用一阵子，重度使用可能需要充值。",
      "details": "1. DeepSeek、智谱、火山方舟等平台，新用户注册通常都会送一些免费额度。\n2. 免费额度够日常聊天、写点东西用一阵子，具体能用到什么程度因人而异。\n3. 免费额度用完后，需要充值才能继续用。\n4. 各平台的免费额度和有效期不同，以平台官方页面显示的为准。"
    },
    {
      "q": "充值与扣费是怎么算的？会不会乱扣钱？",
      "short_a": "按用量（字数）扣费，用多少扣多少，平台都有账单可查，不放心可以设消费上限。",
      "details": "1. AI 平台一般按「字数」计费，你用 AI 生成的内容越多，扣的费用越多。\n2. 充值后费用存在你的平台账户里，用多少扣多少，不用不扣。\n3. 每个平台都有「账单」或「消费记录」页面，可以随时查看花了多少钱。\n4. 如果不放心，可以在平台后台设置「消费上限」，超过就自动停。"
    },
    {
      "q": "DeepSeek 官网导入配置失败怎么办？",
      "short_a": "直接用手机号登录官网即可，不需要导入配置文件。",
      "details": "1. DeepSeek 官网（chat.deepseek.com）打开后用手机号收验证码登录就行，不需要 API Key 或配置文件。\n2. 如果想用 API Key 方式接入第三方工具，参考「我要选AI」里的申请教程。\n3. 网页版功能已经够日常使用，以官方最新版说明为准。"
    },
    {
      "q": "官方页面打不开怎么办？",
      "short_a": "先检查网络，再换个浏览器试试；还不行可能是平台临时维护，过一会再试。",
      "details": "1. 先确认电脑能上网，打开别的网站试试。\n2. 换一个浏览器试试（比如 Chrome、Edge、火狐），有时候是浏览器缓存问题。\n3. 清理浏览器缓存，或者按 Ctrl+F5 强制刷新页面。\n4. 如果还是打不开，可能是平台在临时维护，过半小时再试。"
    },
    {
      "q": "手机上能不能用？",
      "short_a": "可以，本应用在手机浏览器上也能用；申请 Key 和配置在手机上操作完全没问题。",
      "details": "1. 本应用是网页，手机浏览器打开就能用，界面已经适配手机屏幕。\n2. 申请 Key、粘贴 Key、生成配置这些步骤，在手机上都能完成。\n3. 手机上想用 AI 可以直接用各平台的官方网页版（如豆包、通义千问），浏览器打开即可。\n4. 建议在电脑上完成配置，体验更好。"
    },
    {
      "q": "这个应用会不会骗钱、安全吗？",
      "short_a": "本应用纯静态、无后端，不收钱、不中转；Key 只存你自己浏览器，所有操作直连平台官方。",
      "details": "1. 本应用是纯静态网页，没有后端服务器，不会收取任何费用，也不中转任何 AI 服务。\n2. 你粘贴的 API Key 只保存在你自己电脑的浏览器里，不会发送到任何服务器。\n3. 点击「去申请」「去官方下载」都是直接跳转到平台官方页面，不在本应用内处理。\n4. 所有 AI 工具都只提供官方下载链接，不做二次打包分发。\n5. 如果还是不放心，可以用完后在浏览器里清除本应用的 localStorage，Key 就彻底删掉了。"
    }
  ],
  "model_config": {
    "deepseek": {
      "provider_name": "DeepSeek",
      "base_url": "https://api.deepseek.com",
      "models": ["deepseek-v4-flash", "deepseek-v4-pro"]
    },
    "zhipu": {
      "provider_name": "智谱AI",
      "base_url": "https://open.bigmodel.cn/api/paas/v4",
      "models": ["glm-4-flash", "glm-4-flashx", "glm-4-air", "glm-4-plus", "glm-4-long", "glm-4v-flash"]
    },
    "doubao": {
      "provider_name": "火山方舟",
      "base_url": "https://ark.cn-beijing.volces.com/api/v3",
      "models": ["doubao-seed-1.6-flash", "doubao-seed-2.0-mini", "doubao-seed-1.6", "doubao-seed-2.0-code"]
    },
    "aliyun": {
      "provider_name": "阿里云通义千问",
      "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
      "models": ["qwen-turbo", "qwen-plus", "qwen-max"]
    },
    "baidu": {
      "provider_name": "百度文心一言",
      "base_url": "https://qianfan.baidubce.com/v2",
      "models": ["ernie-tiny-8k", "ernie-lite-8k", "ernie-4.0-turbo-8k"]
    },
    "tencent": {
      "provider_name": "腾讯混元",
      "base_url": "https://api.hunyuan.cloud.tencent.com/v1",
      "models": ["hunyuan-lite", "hunyuan-pro"]
    }
  }
};
