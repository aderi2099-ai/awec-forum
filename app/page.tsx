"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search, TrendingUp, Bookmark, Share2, MessageCircle, Clock, Eye, FileText, Zap, Building, Sparkles, ChevronRight, DollarSign, BarChart3, ScrollText, Bot, GraduationCap, Newspaper, Landmark, Building2, BookOpen, MapPin, Rocket } from "lucide-react"

const bannerSlides = [
  {
    id: 1,
    title: "2026全球AI峰会",
    subtitle: "汇聚行业领袖，共话AI未来",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    tag: "重磅活动",
    link: "/events/1",
  },
  {
    id: 2,
    title: "大模型创业扶持计划",
    subtitle: "最高1000万算力补贴，助力AI创业",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    tag: "政策利好",
    link: "/policy",
  },
  {
    id: 3,
    title: "AI Nexus会员招募",
    subtitle: "加入顶级创业者俱乐部，拓展人脉资源",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    tag: "会员专属",
    link: "/community",
  },
  {
    id: 4,
    title: "具身智能投资报告",
    subtitle: "2026年最值得关注的赛道深度解读",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    tag: "研报首发",
    link: "/reports",
  },
]

const categories = [
  { id: "recommend", label: "推荐" },
  { id: "trends", label: "产业动态" },
  { id: "reports", label: "深度研报" },
  { id: "policy", label: "政策解读" },
  { id: "interviews", label: "人物专访", link: "/interviews" },
  { id: "tech", label: "技术前沿" },
]

const dataDashboard = [
  { label: "本周融资", value: "28.6亿", change: "+12%", icon: DollarSign, color: "text-green-400" },
  { label: "活跃项目", value: "1,256", change: "+8%", icon: Building, color: "text-blue-400" },
  { label: "新增政策", value: "23", change: "+5", icon: ScrollText, color: "text-orange-400" },
  { label: "招投标数", value: "186", change: "+15%", icon: BarChart3, color: "text-purple-400" },
]

const featuredNews = [
  {
    id: 1,
    title: "OpenAI发布GPT-5，多模态能力全面升级",
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    category: "产业动态",
    source: "AI科技评论",
    time: "2小时前",
    views: "12.5万",
    hasAISummary: true,
  },
  {
    id: 2,
    title: "2026年中国大模型产业白皮书发布",
    cover: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=200&fit=crop",
    category: "深度研报",
    source: "艾瑞咨询",
    time: "5小时前",
    views: "8.3万",
    hasAISummary: true,
  },
]

const newsItems = [
  {
    id: 1,
    title: "具身智能赛道再获融资，优必选完成10亿美元D轮",
    summary: "本轮融资由红杉中国领投，腾讯、工商银行等跟投...",
    category: "融资快讯",
    source: "36氪",
    sourceAvatar: "36",
    time: "30分钟前",
    views: "5.2万",
    comments: 128,
    tags: ["具身智能", "融资"],
    hasAISummary: true,
    aiSummary: "优必选完成10亿美元D轮融资，红杉中国领投。资金将用于人形机器人研发和商业化落地，估值达80亿美元。",
  },
  {
    id: 2,
    title: "北京发布AI产业新政：最高补贴1亿元",
    summary: "政策覆盖算力、数据、场景等多个维度，重点支持大模型企业...",
    category: "政策解读",
    source: "政策研究院",
    sourceAvatar: "政",
    time: "1小时前",
    views: "3.8万",
    comments: 86,
    tags: ["政策", "北京"],
    hasAISummary: true,
    aiSummary: "北京市发布AI产业支持政策，算力补贴最高1亿元，数据服务最高5000万元，重点支持大模型和具身智能企业。",
  },
  {
    id: 3,
    title: "专访月之暗面CEO杨植麟：长文本是大模型的核心能力",
    summary: "从200万Token到无限上下文，Kimi的技术演进路线图...",
    category: "人物专访",
    source: "极客公园",
    sourceAvatar: "极",
    time: "3小时前",
    views: "6.7万",
    comments: 234,
    tags: ["Kimi", "大模型"],
    hasAISummary: false,
  },
  {
    id: 4,
    title: "Transformer之后：Mamba架构能否颠覆大模型",
    summary: "状态空间模型SSM在长序列处理上展现出惊人效率...",
    category: "技术前沿",
    source: "机器之心",
    sourceAvatar: "机",
    time: "4小时前",
    views: "4.1万",
    comments: 167,
    tags: ["Mamba", "架构"],
    hasAISummary: true,
    aiSummary: "Mamba架构基于状态空间模型，在长序列处理上比Transformer更高效，推理速度提升5倍，内存占用降低60%。",
  },
  {
    id: 5,
    title: "AI+医疗：智谱健康获批首张大模型医疗器械注册证",
    summary: "这标志着AI大模型在医疗领域的商业化应用迈出关键一步...",
    category: "产业动态",
    source: "动脉网",
    sourceAvatar: "动",
    time: "6小时前",
    views: "2.9万",
    comments: 92,
    tags: ["AI医疗", "智谱"],
    hasAISummary: false,
  },
]

const ecosystemItems = [
  {
    id: "companies",
    icon: Building2,
    label: "AI企业",
    desc: "2,680+家企业入驻",
    color: "bg-blue-500/10 text-blue-500",
    link: "/ecosystem?tab=companies",
    previewItems: [
      { name: "月之暗面", tag: "大模型", stage: "B轮", logo: "月" },
      { name: "智谱AI", tag: "大模型", stage: "C轮", logo: "智" },
      { name: "百川智能", tag: "大模型", stage: "A轮", logo: "百" },
    ]
  },
  {
    id: "investors",
    icon: Landmark,
    label: "投资机构",
    desc: "520+家机构认证",
    color: "bg-purple-500/10 text-purple-500",
    link: "/ecosystem?tab=investors",
    previewItems: [
      { name: "红杉中国", tag: "VC", stage: "大模型", logo: "红" },
      { name: "高瓴资本", tag: "PE", stage: "AI基础设施", logo: "高" },
      { name: "经纬创投", tag: "VC", stage: "AI应用", logo: "经" },
    ]
  },
  {
    id: "incubators",
    icon: Rocket,
    label: "孵化器",
    desc: "150+家孵化加速",
    color: "bg-orange-500/10 text-orange-500",
    link: "/ecosystem?tab=incubators",
    previewItems: [
      { name: "创新工场", tag: "孵化器", stage: "Pre-A到A轮", logo: "创" },
      { name: "YC中国", tag: "加速器", stage: "种子轮", logo: "YC" },
      { name: "启迪之星", tag: "孵化器", stage: "天使轮", logo: "启" },
    ]
  },
  {
    id: "parks",
    icon: MapPin,
    label: "产业园区",
    desc: "86个园区政策",
    color: "bg-teal-500/10 text-teal-500",
    link: "/ecosystem?tab=parks",
    previewItems: [
      { name: "中关村AI产业园", tag: "北京", stage: "算力补贴", logo: "中" },
      { name: "张江人工智能岛", tag: "上海", stage: "研发支持", logo: "张" },
      { name: "前海AI创新中心", tag: "深圳", stage: "出海支持", logo: "前" },
    ]
  },
]

const hotTopics = [
  { id: 1, title: "大模型价格战", heat: 9823 },
  { id: 2, title: "具身智能元年", heat: 8456 },
  { id: 3, title: "AI出海指南", heat: 7234 },
  { id: 4, title: "算力瓶颈", heat: 6891 },
  { id: 5, title: "多模态突破", heat: 5672 },
]

const categoryArticles: Record<string, Array<{id: number; title: string; summary: string; source: string; time: string; views: string; cover?: string}>> = {
  trends: [
    { id: 101, title: "OpenAI发布GPT-5：多模态能力全面升级，推理速度提升3倍", summary: "GPT-5在代码、数学、多语言等基准测试中全面领先，支持100万token上下文窗口...", source: "AI科技评论", time: "2小时前", views: "25.6万", cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop" },
    { id: 102, title: "字节跳动豆包大模型日活突破1亿，成为国内最大AI应用", summary: "豆包凭借免费策略和产品矩阵快速崛起，月活用户已超过ChatGPT在中国的峰值...", source: "36氪", time: "5小时前", views: "18.3万" },
    { id: 103, title: "具身智能赛道再获融资，宇树科技完成10亿美元D轮", summary: "本轮融资由红杉中国领投，资金将用于人形机器人的量产和海外市场拓展...", source: "投资界", time: "8小时前", views: "12.7万" },
    { id: 104, title: "阿里云降价97%：大模型价格战进入白热化阶段", summary: "通义千问API价格大幅下调，百万token仅需0.5元，行业竞争格局或将改写...", source: "极客公园", time: "1天前", views: "15.2万" },
    { id: 105, title: "英伟达市值突破4万亿美元，成为全球最具价值公司", summary: "AI算力需求持续爆发，黄仁勋预计数据中心市场规模将达万亿美元...", source: "华尔街见闻", time: "1天前", views: "21.8万" },
  ],
  reports: [
    { id: 201, title: "2026年中国大模型产业白皮书：市场规模将突破500亿元", summary: "艾瑞咨询发布年度报告，深度分析大模型技术演进路线、商业化进展和投资趋势...", source: "艾瑞咨询", time: "1天前", views: "32.5万", cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop" },
    { id: 202, title: "具身智能产业链全景图：从芯片到整机的投资机会", summary: "本报告梳理了具身智能产业链上中下游100+家核心企业，分析各环节的技术壁垒和商业模式...", source: "华创证券", time: "3天前", views: "18.6万" },
    { id: 203, title: "AI+医疗深度报告：大模型如何重塑医疗健康产业", summary: "从诊断辅助到新药研发，AI正在加速渗透医疗各环节，预计2030年市场规模超2000亿...", source: "中金研究", time: "5天前", views: "14.2万" },
    { id: 204, title: "AIGC商业化落地报告：从概念验证到规模变现", summary: "调研200+企业案例，总结AIGC在营销、客服、教育、金融等场景的最佳实践...", source: "麦肯锡", time: "1周前", views: "22.1万" },
    { id: 205, title: "全球AI芯片竞争格局分析：英伟达的护城河有多深", summary: "深入分析CUDA生态、客户粘性、供应链布局等因素，评估各玩家的竞争实力...", source: "国盛证券", time: "1周前", views: "16.8万" },
  ],
  policy: [
    { id: 301, title: "北京发布AI产业新政：算力补贴最高1亿元", summary: "政策覆盖算力基础设施、数据要素、应用场景等多个维度，重点支持大模型企业...", source: "北京市经信局", time: "6小时前", views: "28.3万", cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop" },
    { id: 302, title: "上海出台AI人才政策：顶尖人才可直接落户", summary: "对AI领域的高层次人才给予住房、子女教育等全方位支持，加速人才集聚...", source: "上海市人社局", time: "1天前", views: "19.6万" },
    { id: 303, title: "深圳设立100亿AI产业基金，重点投资具身智能", summary: "基金将聚焦人形机器人、自动驾驶等领域，单个项目最高投资5亿元...", source: "深圳特区报", time: "2天前", views: "15.4万" },
    { id: 304, title: "工信部发布AI大模型标准体系建设指南", summary: "明确大模型的评测标准、安全规范和应用指南，推动行业健康有序发展...", source: "工信部", time: "3天前", views: "12.8万" },
    { id: 305, title: "杭州AI产业园区优惠政策汇总：最全入驻指南", summary: "梳理余杭、滨江、萧山等区的扶持政策，涵盖租金减免、人才补贴、融资支持...", source: "杭州日报", time: "5天前", views: "9.7万" },
  ],
  tech: [
    { id: 401, title: "Transformer之后：Mamba架构能否颠覆大模型", summary: "状态空间模型SSM在长序列处理上展现惊人效率，推理速度提升5倍，内存占用降低60%...", source: "机器之心", time: "3小时前", views: "24.1万", cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop" },
    { id: 402, title: "Sora技术解析：视频生成模型的突破性进展", summary: "深入分析Sora的技术架构、训练方法和生成效果，解读其对行业的影响...", source: "量子位", time: "1天前", views: "31.5万" },
    { id: 403, title: "RAG vs Fine-tuning：大模型应用的两条路线之争", summary: "从成本、效果、可控性等维度对比两种方案，给出不同场景下的最佳实践建议...", source: "CSDN", time: "2天前", views: "18.9万" },
    { id: 404, title: "多模态大模型技术路线对比：GPT-4V、Gemini、Claude 3", summary: "横向对比各家多模态能力，分析图像理解、视频处理、跨模态推理等关键指标...", source: "新智元", time: "4天前", views: "22.3万" },
    { id: 405, title: "大模型推理优化技术全解析：从量化到投机解码", summary: "系统介绍INT8/INT4量化、KV Cache优化、投机解码等前沿推理加速技术...", source: "InfoQ", time: "1周前", views: "15.6万" },
  ],
}

const deepArticles = [
  {
    category: "新闻深度",
    articles: [
      { id: 1, title: "OpenAI董事会风波始末：AI安全与商业化的博弈", views: "15.2万", time: "2天前" },
      { id: 2, title: "英伟达市值破3万亿：AI芯片霸主的护城河在哪", views: "12.8万", time: "3天前" },
    ]
  },
  {
    category: "技术前沿",
    articles: [
      { id: 3, title: "Sora技术解析：视频生成模型的突破性进展", views: "18.6万", time: "1天前" },
      { id: 4, title: "RAG vs Fine-tuning：大模型应用的两条路线之争", views: "9.3万", time: "4天前" },
    ]
  },
  {
    category: "人物专访",
    articles: [
      { id: 5, title: "对话杨植麟：Kimi如何在长文本赛道弯道超车", views: "21.5万", time: "5天前" },
      { id: 6, title: "李开复万字长文：AI 2.0时代的创业机会", views: "16.7万", time: "1周前" },
    ]
  },
  {
    category: "行业洞察",
    articles: [
      { id: 7, title: "2026年AI投资趋势：从大模型到垂直应用", views: "11.2万", time: "3天前" },
      { id: 8, title: "具身智能产业链全景图：谁在布局机器人赛道", views: "8.9万", time: "5天前" },
    ]
  },
]

export default function DiscoverPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("recommend")
  const [searchFocused, setSearchFocused] = useState(false)
  const [expandedSummary, setExpandedSummary] = useState<number | null>(null)
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <PageHeader title="AI Nexus" showNotification />

      {/* Banner Carousel */}
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative cursor-pointer"
              onClick={() => router.push(slide.link)}
            >
              <div className="relative h-36 mx-4 rounded-xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground text-[10px]">
                    {slide.tag}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-white font-bold text-lg leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-xs mt-1">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-3 pb-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                currentBanner === index 
                  ? "w-4 bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="px-4 py-3 bg-background sticky top-14 z-30">
        <div className={cn(
          "relative transition-all duration-200",
          searchFocused && "scale-[1.02]"
        )}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="搜索资讯、企业、活动、人脉..."
            className="pl-10 bg-secondary border-0 h-10"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Data Dashboard */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-sm">数据看板</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs h-7">
            更多数据
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {dataDashboard.map((item) => (
            <Card key={item.label} className="p-2 bg-card border-border/50">
              <div className="flex items-center justify-center mb-1">
                <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              <p className="text-sm font-bold text-center">{item.value}</p>
              <p className="text-[10px] text-muted-foreground text-center">{item.label}</p>
              <p className={cn(
                "text-[10px] text-center",
                item.change.startsWith("+") ? "text-green-400" : "text-red-400"
              )}>
                {item.change}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 overflow-x-auto scrollbar-hide">
        <Tabs value={activeCategory} onValueChange={(value) => {
            const selectedCat = categories.find(c => c.id === value)
            if (selectedCat?.link) {
              router.push(selectedCat.link)
            } else {
              setActiveCategory(value)
            }
          }}>
          <TabsList className="bg-transparent h-10 p-0 gap-1 w-max">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 h-8 rounded-full text-sm"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Featured Banner Carousel */}
      <div className="px-4 py-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {featuredNews.map((news) => (
            <Card
              key={news.id}
              className="relative flex-shrink-0 w-[85%] snap-start overflow-hidden border-0"
            >
              <div className="relative h-40">
                <img
                  src={news.cover}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge className="bg-primary/90">
                    {news.category}
                  </Badge>
                  {news.hasAISummary && (
                    <Badge className="bg-accent/90 gap-1">
                      <Bot className="w-3 h-3" />
                      AI摘要
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-white/70 text-xs">
                    <span>{news.source}</span>
                    <span>-</span>
                    <span>{news.time}</span>
                    <span>-</span>
                    <Eye className="w-3 h-3" />
                    <span>{news.views}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Hot Topics */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-destructive" />
          <span className="text-sm font-semibold">热门话题</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {hotTopics.map((topic, index) => (
            <Badge
              key={topic.id}
              variant="secondary"
              className="flex-shrink-0 gap-1.5 px-3 py-1.5 cursor-pointer hover:bg-secondary/80"
            >
              <span className={cn(
                "text-xs font-bold",
                index === 0 && "text-destructive",
                index === 1 && "text-orange-500",
                index === 2 && "text-yellow-500"
              )}>
                {index + 1}
              </span>
              <span>{topic.title}</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Articles */}
      {activeCategory !== "recommend" && categoryArticles[activeCategory] && (
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">{categories.find(c => c.id === activeCategory)?.label}</h2>
            <Badge variant="outline" className="text-[10px]">
              {categoryArticles[activeCategory].length}篇文章
            </Badge>
          </div>
          {categoryArticles[activeCategory].map((article, idx) => (
            <Card
              key={article.id}
              className="bg-card border-border/50 hover:bg-card/80 transition-colors cursor-pointer overflow-hidden"
            >
              {article.cover && idx === 0 && (
                <div className="relative h-40">
                  <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-white/70 text-xs">
                      <span>{article.source}</span>
                      <span>-</span>
                      <span>{article.time}</span>
                    </div>
                  </div>
                </div>
              )}
              {(!article.cover || idx !== 0) && (
                <div className="p-4">
                  <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{article.summary}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground/80">{article.source}</span>
                      <span>-</span>
                      <span>{article.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Deep Articles Section */}
      {activeCategory === "recommend" && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">深度热文</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs h-7">
              更多深度
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </Button>
          </div>
          <div className="space-y-4">
            {deepArticles.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-medium">
                    {section.category}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {section.articles.map((article) => (
                    <Card
                      key={article.id}
                      className="p-3 bg-card border-border/50 hover:bg-card/80 transition-colors cursor-pointer"
                    >
                      <h4 className="text-sm font-medium leading-snug line-clamp-2 mb-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.time}</span>
                        </div>
                        <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 bg-primary/10 text-primary">
                          深度阅读
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ecosystem Section */}
      <div className="px-4 py-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">生态服务</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs h-7" onClick={() => router.push('/ecosystem')}>
            查看全部
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </Button>
        </div>
        <div className="space-y-4">
          {ecosystemItems.map((section) => (
            <Card key={section.id} className="bg-card border-border/50 overflow-hidden">
              <div
                onClick={() => router.push(section.link)}
                className="p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", section.color)}>
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{section.label}</h3>
                  <p className="text-xs text-muted-foreground">{section.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
              <div className="px-3 pb-3">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {section.previewItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {item.logo}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {item.tag} {item.stage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
