# 网站商品收集计划 - bothhappy.com

## 目标
分析并收集 https://www.bothhappy.com/home 网站上的所有商品信息，包括商品类型、商品名称、商品价格、商品图片，并以 Markdown 格式整理输出。

## 网站分析
- 网站名称: BossPlayers
- 网站类型: 游戏充值/游戏代充平台
- 初始可见商品: 21个（Just Added 6个 + Top-Up Favorites 15个）
- 有"Load More"按钮，可能还有更多商品

## 执行阶段

### Stage 1: 首页数据爬取
- 使用浏览器工具点击"Load More"加载所有商品
- 使用 Python 爬虫 (requests + BeautifulSoup) 爬取完整商品列表
- 收集商品名称、原价、现价、折扣、图片URL

### Stage 2: 商品详情收集
- 访问每个商品的详情页
- 收集更详细的商品信息（商品类型、具体充值选项等）

### Stage 3: 图片下载
- 并行下载所有商品图片到 /mnt/agents/output/img/ 文件夹
- 文件名与商品名称对应

### Stage 4: Markdown整合
- 将所有数据整合为结构化的 Markdown 文档
- 包含商品类型、名称、价格、图片引用
