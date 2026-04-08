"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, MapPin, Users, Clock, ChevronDown, Check, Sparkles, Globe, Building2, Star, ArrowRight, Play, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Hong Kong cityscape and luxury conference images
const heroImages = {
  main: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1920&h=1080&fit=crop", // Hong Kong night skyline
  conference1: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", // Luxury conference
  conference2: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop", // Conference hall
  hongkong1: "https://images.unsplash.com/photo-1506970845246-98f62a10b3a8?w=800&h=600&fit=crop", // Victoria Harbour
  hongkong2: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=600&fit=crop", // Hong Kong cityscape
  hongkong3: "https://images.unsplash.com/photo-1594973782943-3b23f0c1d5e4?w=800&h=600&fit=crop", // HK night view
  dinner: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop", // Luxury dinner
  networking: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop", // Networking event
}

const highlights = [
  { icon: Users, title: "精准圈层", en: "Elite Network", desc: "500+ 严格筛选的高端精英社群", descEn: "500+ curated top-tier executives & founders", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop" },
  { icon: Star, title: "顶级阵容", en: "World-Class Speakers", desc: "亚洲最具影响力的行业领袖登台", descEn: "Asia's most influential Web3 & AI leaders", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop" },
  { icon: Globe, title: "亚洲视野", en: "Pan-Asian Reach", desc: "辐射香港、新加坡、首尔、东京", descEn: "Spanning HK, Singapore, Seoul & Tokyo", img: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&h=400&fit=crop" },
  { icon: Building2, title: "专业背书", en: "Premium Credibility", desc: "权威媒体与行业领袖双重背书", descEn: "Endorsed by top media & industry icons", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop" },
  { icon: Sparkles, title: "AI+Web3前沿", en: "AI × Web3 Frontier", desc: "探讨AI与区块链融合最新趋势", descEn: "Latest trends at the AI & blockchain frontier", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&h=400&fit=crop" },
  { icon: ChevronDown, title: "资本对接", en: "Capital Matching", desc: "200+ 顶尖投资机构定向对接", descEn: "200+ top VC & PE institutions", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" },
  { icon: Star, title: "高端晚宴", en: "Gala Dinner", desc: "维多利亚港景五星级私享晚宴", descEn: "5-star private gala by Victoria Harbour", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
  { icon: Users, title: "闭门圆桌", en: "Closed Roundtable", desc: "顶级嘉宾深度对话，仅限受邀", descEn: "Deep-dive sessions — by invitation only", img: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop" },
  { icon: Globe, title: "全球传播", en: "Global Media Coverage", desc: "百万量级品牌曝光全渠道覆盖", descEn: "Million-scale brand reach across all channels", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop" },
  { icon: Building2, title: "俱乐部成立", en: "Club Inauguration", desc: "亚洲WEB3精英俱乐部正式揭牌", descEn: "Official inauguration of Asia WEB3 Elite Club", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop" },
]

const morningAgenda = [
  { time: "09:00 – 09:30", title: "嘉宾签到", topic: "签到与入场" },
  { time: "09:30 – 09:50", title: "领导致辞", topic: "领导致辞讲话" },
  { time: "09:50 – 10:20", title: "主题演讲", topic: "新的文明，新的未来" },
  { time: "10:20 – 10:40", title: "嘉宾演讲", topic: "大语言模型：从通用智能到垂直产业的深度重塑" },
  { time: "10:40 – 11:00", title: "嘉宾演讲", topic: "算力即权力：AI芯片竞争与亚洲供应链机遇" },
  { time: "11:00 – 11:20", title: "嘉宾演讲", topic: "企业级AI落地：从效率工具到决策核心" },
  { time: "11:20 – 11:40", title: "嘉宾演讲", topic: "AI Agent与Web3的融合：自主经济体的崛起" },
  { time: "11:40 – 12:00", title: "Q&A", topic: "现场互动问答" },
]

const afternoonAgenda = [
  { time: "13:30 – 13:50", title: "嘉宾演讲", topic: "ZK驱动的隐私与扩容：Web3的信任新范式" },
  { time: "13:50 – 14:10", title: "嘉宾演讲", topic: "万亿资产上链：RWA的合规路径与规模落地" },
  { time: "14:10 – 14:30", title: "嘉宾演讲", topic: "DePIN：重塑物理世界的Web3基础设施" },
  { time: "14:30 – 14:50", title: "嘉宾演讲", topic: "从漏洞到保险：构建Web3全生命周期安全体系" },
  { time: "14:50 – 15:10", title: "嘉宾演讲", topic: "自主权身份：Web3入口的信任基石" },
  { time: "15:10 – 15:30", title: "嘉宾演讲", topic: "社交图谱与价值回归：SocialFi的破局之路" },
  { time: "15:30 – 16:30", title: "圆桌论坛", topic: "资本对话——Web3赛道的投资逻辑与退出路径" },
  { time: "16:30 – 17:50", title: "嘉宾演讲", topic: "预言机、多链未来、链上数据+AI、DeFi下一站" },
  { time: "17:50 – 18:10", title: "嘉宾演讲", topic: "去中心化AI推理：打破算力垄断，重塑智能边界" },
]

const eveningAgenda = [
  { time: "18:10 – 18:20", title: "俱乐部成立仪式", topic: "揭牌 + 颁发证书 + 年度计划发布" },
  { time: "18:30 – 18:45", title: "全体大合影", topic: "主会议厅舞台分批合影" },
  { time: "19:00 – 21:00", title: "高端晚宴", topic: "邀请制" },
  { time: "21:30 – 24:00", title: "私享酒会", topic: "邀请制" },
]

export default function AsiaWeb3SummitPage() {
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeNav, setActiveNav] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "agenda", "highlights", "sponsor", "register"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveNav(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowRegister(false)
      setShowSuccess(true)
    }, 1500)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-sm tracking-wider">ASIA WEB3 ELITE</p>
                <p className="text-[10px] text-amber-400/80 tracking-widest">CLUB</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              {[
                { id: "overview", label: "活动概述", en: "Overview" },
                { id: "agenda", label: "会议流程", en: "Agenda" },
                { id: "highlights", label: "十大亮点", en: "Highlights" },
                { id: "sponsor", label: "赞助合作", en: "Sponsor" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "text-sm transition-colors flex flex-col items-center gap-0.5",
                    activeNav === item.id ? "text-amber-400" : "text-white/70 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  <span className={cn("text-[10px]", activeNav === item.id ? "text-amber-400/70" : "text-amber-400/40")}>{item.en}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => scrollTo("register")}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold px-6 rounded-full"
              >
                报名参会 Register
              </Button>
              <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5 py-4">
            {["overview", "agenda", "highlights", "sponsor", "register"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left px-6 py-3 text-white/70 hover:text-amber-400 hover:bg-white/5"
              >
                {id === "overview" ? "活动概述" : id === "agenda" ? "会议流程" : id === "highlights" ? "十大亮点" : id === "sponsor" ? "赞助合作" : "立即报名"}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={heroImages.main} alt="Hong Kong Skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/50 to-[#0a0a0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs tracking-widest text-amber-400/80">2026年6月25日 | 中国·香港</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">亚洲数字经济论坛</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">暨亚洲WEB3精英俱乐部成立仪式</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-amber-400/80 mb-2 max-w-2xl mx-auto leading-relaxed font-medium">
            连接数字亚洲 · 重构产业新局
          </p>
          <p className="text-sm text-amber-400/50 mb-8 max-w-2xl mx-auto">
            Connecting Digital Asia · Reshaping the Industrial New Order
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => scrollTo("register")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-10 py-6 rounded-full text-lg shadow-lg shadow-amber-500/25"
            >
              立即报名参会 Register Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("agenda")}
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-10 py-6 rounded-full text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              查看议程 Agenda
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-amber-400/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>2026年6月25日 · Thu, Jun 25</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>香港·维多利亚港 · Victoria Harbour, HK</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>300–500人规模 · 300–500 Attendees</span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/40 tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-amber-400" />
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">Overview · 活动概述</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">活动概述</h2>
            <p className="text-amber-400/50 text-base mb-3">Event Overview</p>
            <p className="text-amber-400/70 max-w-2xl mx-auto">汇聚亚洲及全球数字经济与Web3领域的核心决策者、投资人、技术领袖与政策制定者</p>
            <p className="text-amber-400/40 text-sm max-w-2xl mx-auto mt-1">Bringing together key decision-makers, investors, tech leaders and policymakers in Asia's digital economy and Web3 space</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl">
              <h3 className="text-xl font-bold mb-1 text-amber-400">核心目标</h3>
              <p className="text-amber-400/50 text-xs mb-5">Core Objectives</p>
              <p className="text-amber-400/80 leading-relaxed mb-6">
                正式宣告【亚洲WEB3精英俱乐部】成立，搭建一个集政策解读、产业研判、资本对接、项目孵化于一体的高端交流平台，建立高价值圈层连接。
              </p>
              <p className="text-amber-400/40 text-sm leading-relaxed mb-6">Officially inaugurating the Asia WEB3 Elite Club — a premier platform integrating policy insights, industry foresight, capital matchmaking and project incubation.</p>
              <div className="flex flex-wrap gap-2">
                {[["政策解读","Policy Insights"],["产业研判","Industry Foresight"],["资本对接","Capital Matching"],["项目孵化","Project Incubation"]].map(([zh, en]) => (
                  <Badge key={zh} variant="secondary" className="bg-amber-500/10 text-amber-400 border-0">{zh} · {en}</Badge>
                ))}
              </div>
            </Card>
            
            <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl">
              <h3 className="text-xl font-bold mb-1 text-amber-400">关于俱乐部</h3>
              <p className="text-amber-400/50 text-xs mb-5">About the Club</p>
              <p className="text-amber-400/80 leading-relaxed mb-4">
                亚洲WEB3精英俱乐部由香港、新加坡、日本、韩国等多位加密亿万富翁和多家上市公司主席联合创立，旨在共建亚洲数字经济与加密行业——一个集资本对接、项目孵化、产业交流、全球资源整合于一体的全球高端圈层平台。
              </p>
              <p className="text-amber-400/40 text-sm leading-relaxed">Co-founded by crypto billionaires and listed company chairmen from Hong Kong, Singapore, Japan and Korea — a global elite network for capital, incubation, and cross-border collaboration.</p>
            </Card>
          </div>

          {/* Club Details Section */}
          <div className="mb-16">
            {/* Club Header */}
            <div className="text-center mb-10 p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-amber-500/10 border border-amber-500/20">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">亚洲WEB3精英俱乐部</h3>
              <p className="text-amber-400 text-lg font-medium mb-3">Asia WEB3 Elite Club（AWEC）</p>
              <p className="text-white text-base mb-1">链接未来，共塑亚洲Web3新秩序</p>
              <p className="text-amber-400/60 text-sm">Connect the Future, Shape the New Order of Web3 in Asia</p>
            </div>

            {/* Brand Positioning - with background image */}
            <div className="relative rounded-3xl overflow-hidden mb-6">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop" alt="Elite Network" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">品牌定位</h4>
                    <p className="text-xs text-amber-400">Brand Positioning</p>
                  </div>
                </div>
                <p className="text-white leading-relaxed mb-3">
                  亚洲首个专注于Web3领域的高端精英圈层组织，汇聚行业领袖、顶尖投资机构、技术先驱与政策智囊，致力于推动亚洲Web3生态的深度协作、知识共享与全球影响力输出。
                </p>
                <p className="text-amber-400/70 text-sm leading-relaxed">
                  Asia&apos;s first elite network dedicated to Web3 — uniting industry leaders, top investors, tech pioneers and policy advisors to drive deep collaboration, knowledge sharing and global influence across Asia&apos;s Web3 ecosystem.
                </p>
              </div>
            </div>

            {/* Core Value Proposition - with colorful gradients */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-1 text-center">核心价值主张</h4>
              <p className="text-amber-400/60 text-sm mb-6 text-center">Core Value Proposition</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { zh: "圈层信任", en: "Trust Network", desc: "严格邀请/审核制，确保成员质量与互信基础", descEn: "Invitation-only with rigorous vetting", color: "from-amber-500/30 to-amber-600/10", border: "border-amber-500/40", icon: Users, iconBg: "from-amber-400 to-amber-600" },
                  { zh: "资源直通", en: "Direct Access", desc: "资本、项目、技术、监管信息的高效匹配", descEn: "Efficient matching of capital & projects", color: "from-purple-500/30 to-purple-600/10", border: "border-purple-500/40", icon: Sparkles, iconBg: "from-purple-400 to-purple-600" },
                  { zh: "前沿洞见", en: "Frontier Insights", desc: "抢先获取未公开的行业趋势与政策动态", descEn: "Early access to unreleased trends", color: "from-sky-500/30 to-sky-600/10", border: "border-sky-500/40", icon: Star, iconBg: "from-sky-400 to-sky-600" },
                  { zh: "全球视野", en: "Global Vision", desc: "立足亚洲，连接迪拜、新加坡、硅谷等全球Web3枢纽", descEn: "Connected to global Web3 hubs", color: "from-rose-500/30 to-rose-600/10", border: "border-rose-500/40", icon: Globe, iconBg: "from-rose-400 to-rose-600" },
                ].map((item, i) => (
                  <div key={i} className={`p-5 rounded-2xl bg-gradient-to-b ${item.color} border ${item.border} hover:scale-[1.02] transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center mb-4`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-bold text-white text-base mb-0.5">{item.zh}</h5>
                    <p className="text-[10px] text-amber-400 mb-3">{item.en}</p>
                    <p className="text-xs text-white/90 leading-relaxed">{item.desc}</p>
                    <p className="text-[10px] text-white/50 mt-2">{item.descEn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Types - Card Grid with icons */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-1 text-center">会员类型</h4>
              <p className="text-amber-400/60 text-sm mb-6 text-center">Membership Categories</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { type: "Web3创业者", en: "Web3 Founders", zh: "已获得至少一轮融资的项目创始人/联合创始人", enDesc: "Founders with at least one funding round", icon: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=120&fit=crop", color: "amber" },
                  { type: "投资机构", en: "Investors", zh: "管理规模≥5000万美元的加密基金或家族办公室代表", enDesc: "Crypto funds/family offices, AUM ≥ $50M", icon: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=120&fit=crop", color: "purple" },
                  { type: "技术领袖", en: "Tech Leaders", zh: "知名公链/协议的核心开发者、研究科学家", enDesc: "Core devs at leading chains/protocols", icon: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop", color: "sky" },
                  { type: "企业高管", en: "Executives", zh: "传统金融机构、科技公司中负责Web3战略的副总裁级以上", enDesc: "VP+ leading Web3 at TradFi or tech firms", icon: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop", color: "rose" },
                  { type: "政策专家", en: "Policy Experts", zh: "监管机构顾问、合规领域顶级律师或前政府官员", enDesc: "Regulatory advisors & compliance lawyers", icon: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=120&h=120&fit=crop", color: "emerald" },
                  { type: "意见领袖", en: "KOLs", zh: "全网粉丝≥10万的Web3内容创作者、分析师", enDesc: "Web3 creators/analysts with 100K+ followers", icon: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&h=120&fit=crop", color: "orange" },
                ].map((item, i) => {
                  const colorMap: Record<string, string> = { amber: "from-amber-500/30 border-amber-500/40", purple: "from-purple-500/30 border-purple-500/40", sky: "from-sky-500/30 border-sky-500/40", rose: "from-rose-500/30 border-rose-500/40", emerald: "from-emerald-500/30 border-emerald-500/40", orange: "from-orange-500/30 border-orange-500/40" }
                  const textMap: Record<string, string> = { amber: "text-amber-400", purple: "text-purple-400", sky: "text-sky-400", rose: "text-rose-400", emerald: "text-emerald-400", orange: "text-orange-400" }
                  return (
                    <div key={i} className={`p-4 rounded-2xl bg-gradient-to-b ${colorMap[item.color]} to-transparent border hover:scale-[1.02] transition-all duration-300`}>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={item.icon} alt={item.type} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className={`font-bold text-white text-sm`}>{item.type}</p>
                          <p className={`text-[10px] ${textMap[item.color]}`}>{item.en}</p>
                        </div>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">{item.zh}</p>
                      <p className="text-[10px] text-white/40 mt-1">{item.enDesc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Member Activities - with background images */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-1 text-center">会员活动</h4>
              <p className="text-amber-400/60 text-sm mb-6 text-center">Exclusive Member Activities</p>
              <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Quarterly Workshop */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=500&fit=crop" alt="Workshop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                  <div className="relative p-5 sm:p-6 min-h-[280px] flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm">闭门研讨会（季度）</h5>
                        <p className="text-[10px] text-amber-400">Quarterly Closed-Door Workshop</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-white/90"><span className="text-amber-400 font-semibold">形式：</span>半天闭门会议，邀请制</p>
                      <p className="text-white/90"><span className="text-amber-400 font-semibold">议题：</span>RWA合规、稳定币牌照、AI+Web3等前沿话题</p>
                      <p className="text-white/90"><span className="text-amber-400 font-semibold">产出：</span>《内部洞察报告》仅限会员共享</p>
                    </div>
                  </div>
                </div>

                {/* Social Dinner */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop" alt="Gala Dinner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                  <div className="relative p-5 sm:p-6 min-h-[280px] flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm">会员专属社交晚宴</h5>
                        <p className="text-[10px] text-purple-400">Bi-Annual Exclusive Dinner</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-white/90"><span className="text-purple-400 font-semibold">地点：</span>香港、新加坡、首尔等顶级私人会所</p>
                      <p className="text-white/90"><span className="text-purple-400 font-semibold">形式：</span>晚宴+主题分享+自由交流</p>
                      <p className="text-white/90"><span className="text-purple-400 font-semibold">着装：</span>商务休闲或黑领结</p>
                    </div>
                  </div>
                </div>

                {/* Overseas Tour */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=500&fit=crop" alt="Dubai Tour" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                  <div className="relative p-5 sm:p-6 min-h-[280px] flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm">海外考察团（年度）</h5>
                        <p className="text-[10px] text-sky-400">Annual Global Study Tour</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-white/90"><span className="text-sky-400 font-semibold">目的地：</span>迪拜、瑞士加密谷、新加坡等</p>
                      <p className="text-white/90"><span className="text-sky-400 font-semibold">行程：</span>参访监管机构、头部交易所、家办</p>
                      <p className="text-white/90"><span className="text-sky-400 font-semibold">时长：</span>4天3晚，仅限15人（理事优先）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Process - with gradient steps */}
            <div className="relative rounded-3xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-sky-500/10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="relative p-6 sm:p-8 border border-white/10 rounded-3xl">
                <h4 className="text-lg font-bold text-white mb-1 text-center">入会流程</h4>
                <p className="text-amber-400/60 text-sm mb-6 text-center">Membership Process</p>
                
                {/* Process Steps - visual flow */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-1 mb-8">
                  {[
                    { step: "提交意向", en: "Apply", num: 1 },
                    { step: "会员推荐", en: "Referral", num: 2 },
                    { step: "组委会初审", en: "Review", num: 3 },
                    { step: "背景尽调", en: "Due Diligence", num: 4 },
                    { step: "面试", en: "Interview", num: 5 },
                    { step: "缴纳年费", en: "Payment", num: 6 },
                    { step: "正式入会", en: "Welcome", num: 7 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1 sm:gap-2">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black text-xs sm:text-sm font-bold mb-1">
                          {item.num}
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-white font-medium text-center whitespace-nowrap">{item.step}</p>
                        <p className="text-[8px] text-amber-400/60 text-center">{item.en}</p>
                      </div>
                      {i < 6 && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400/40 mx-0.5 sm:mx-1" />}
                    </div>
                  ))}
                </div>
                
                {/* Membership Levels */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { level: "观察会员", en: "Observer", desc: "无需推荐，由组委会主动邀请，试用期6个月", color: "from-white/10 to-white/5 border-white/20", badge: "bg-white/20 text-white" },
                    { level: "菁英会员", en: "Elite", desc: "需至少1位现有菁英及以上会员推荐，通过组委会审核", color: "from-amber-500/20 to-amber-500/5 border-amber-500/30", badge: "bg-amber-500 text-black" },
                    { level: "理事会员", en: "Council", desc: "需2位理事会员或1位创始理事推荐，经理事会投票（2/3通过）", color: "from-purple-500/20 to-purple-500/5 border-purple-500/30", badge: "bg-purple-500 text-white" },
                  ].map((item, i) => (
                    <div key={i} className={`p-5 rounded-2xl bg-gradient-to-b ${item.color} border text-center hover:scale-[1.02] transition-all duration-300`}>
                      <Badge className={`${item.badge} font-bold mb-3`}>{item.level}</Badge>
                      <p className="text-xs text-amber-400 mb-2">{item.en} Member</p>
                      <p className="text-xs text-white/80 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Partners - with images */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* Diamond Partner */}
              <div className="relative rounded-3xl overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=400&fit=crop" alt="Diamond Partner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
                <div className="relative p-6 sm:p-8 text-center">
                  <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold mb-3 text-sm px-4 py-1">钻石伙伴 Diamond Partner</Badge>
                  <p className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">$100,000 <span className="text-base font-normal text-amber-400/60">USD</span></p>
                  <p className="text-sm text-white/80 mb-4">2席/年 · 年度顶级战略合作伙伴</p>
                  <p className="text-xs text-amber-400/60">Exclusive annual strategic partner with maximum visibility</p>
                </div>
              </div>
              
              {/* Platinum Partner */}
              <div className="relative rounded-3xl overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=400&fit=crop" alt="Platinum Partner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
                <div className="relative p-6 sm:p-8 text-center">
                  <Badge className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold mb-3 text-sm px-4 py-1">白金伙伴 Platinum Partner</Badge>
                  <p className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">$20,000 <span className="text-base font-normal text-purple-400/60">USD</span></p>
                  <p className="text-sm text-white/80 mb-4">4席/年 · 年度高端战略合作伙伴</p>
                  <p className="text-xs text-purple-400/60">Premium annual partner with high-value networking access</p>
                </div>
              </div>
            </div>

            {/* Quote - with decorative background */}
            <div className="relative rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=300&fit=crop" alt="Elite Network" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/80" />
              <div className="absolute top-4 left-4 text-6xl text-amber-500/20 font-serif">&ldquo;</div>
              <div className="absolute bottom-4 right-4 text-6xl text-amber-500/20 font-serif">&rdquo;</div>
              <div className="relative text-center p-8 sm:p-12">
                <p className="text-lg sm:text-xl text-white font-medium italic leading-relaxed mb-4">
                  不是所有Web3社群，都配得上&apos;精英&apos;二字。<br />我们只邀请真正在创造历史的人。
                </p>
                <p className="text-sm text-amber-400 italic mb-4">
                  &ldquo;Not every Web3 community deserves to be called &apos;elite&apos;.<br />We only invite those who are truly making history.&rdquo;
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
                <p className="text-xs text-white/60">亚洲WEB3精英俱乐部 创始理事会</p>
                <p className="text-[10px] text-amber-400/40">Asia WEB3 Elite Club Founding Council</p>
              </div>
            </div>
          </div>
          
          {/* Hong Kong & Conference Images Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { url: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=600&fit=crop", label: "Victoria Harbour · 维多利亚港" },
              { url: "https://images.unsplash.com/photo-1535540878298-a155c6d065ef?w=800&h=600&fit=crop", label: "Hong Kong Skyline · 香港夜景" },
              { url: heroImages.conference1, label: "Grand Conference Hall · 主会议厅" },
              { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop", label: "Luxury Hotel · 五星级酒店" },
            ].map((item, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src={item.url} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-2 left-3 right-3 text-[10px] text-amber-400/80 font-medium leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-24 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">Agenda · 会议流程</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">会议流程</h2>
            <p className="text-amber-400/50 text-base mb-3">Full-Day Conference Agenda</p>
            <p className="text-amber-400/70">全天精彩议程，深度探讨AI与Web3的融合发展</p>
            <p className="text-amber-400/40 text-sm mt-1">A full-day program exploring the convergence of AI and Web3 technologies</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Morning */}
            <Card className="p-4 sm:p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">上午场 · Morning</h3>
                  <p className="text-xs sm:text-sm text-amber-400">AI 新前沿 · AI New Frontier</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {morningAgenda.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-amber-500/5 hover:border hover:border-amber-500/20 border border-transparent transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] text-amber-400 font-mono font-semibold">{item.time}</span>
                      <Badge className="text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20 shrink-0">{item.title}</Badge>
                    </div>
                    <p className="text-xs text-amber-400/80 leading-relaxed">{item.topic}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Afternoon */}
            <Card className="p-4 sm:p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">下午场 · Afternoon</h3>
                  <p className="text-xs sm:text-sm text-purple-400">Web3 基础设施与应用 · Infrastructure & Applications</p>
                </div>
              </div>
              <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                {afternoonAgenda.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-purple-500/5 hover:border hover:border-purple-500/20 border border-transparent transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] text-purple-400 font-mono font-semibold shrink-0">{item.time}</span>
                      <Badge className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/20 shrink-0">{item.title}</Badge>
                    </div>
                    <p className="text-xs text-amber-400/80 leading-relaxed">{item.topic}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Evening */}
            <Card className="p-4 sm:p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">晚间流程 · Evening</h3>
                  <p className="text-xs sm:text-sm text-rose-400">俱乐部成立 & 高端晚宴 · Club Launch & Gala Dinner</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {eveningAgenda.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/5 hover:border hover:border-rose-500/20 border border-transparent transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] text-rose-400 font-mono font-semibold shrink-0">{item.time}</span>
                      <Badge className="text-[10px] bg-rose-500/10 text-rose-400 border-rose-500/20 shrink-0">{item.title}</Badge>
                    </div>
                    <p className="text-xs text-amber-400/80 leading-relaxed">{item.topic}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-400 text-center">高端晚宴与私享酒会仅限邀请制<br /><span className="text-amber-400/60">Gala Dinner & VIP Reception — By Invitation Only</span></p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">Highlights · 活动亮点</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">十大必看亮点</h2>
            <p className="text-amber-400/50 text-base mb-3">10 Reasons to Attend</p>
            <p className="text-amber-400/70">为什么选择参加亚洲WEB3精英俱乐部论坛</p>
            <p className="text-amber-400/40 text-sm mt-1">Why you should be at the Asia WEB3 Elite Club Forum</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-16">
            {highlights.map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/5] sm:aspect-[3/4]">
                {/* Background Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-all duration-300" />
                {/* Number badge */}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-amber-500/80 flex items-center justify-center">
                  <span className="text-black text-xs font-bold">{i + 1}</span>
                </div>
                {/* Icon */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <item.icon className="w-3.5 h-3.5 text-amber-400" />
                </div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="font-bold text-white text-sm sm:text-base leading-tight mb-0.5">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-amber-400 font-medium mb-1">{item.en}</p>
                  <p className="text-[10px] sm:text-xs text-white/80 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Large Feature Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9]">
            <img src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=1600&h=700&fit=crop" alt="Business Forum Keynote" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 via-[#0a0a0f]/50 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 lg:p-16">
              <div className="max-w-xl">
                <h3 className="text-2xl lg:text-4xl font-bold mb-2">
                  不止于曝光
                  <br />
                  <span className="text-amber-400">更关注商业合作实效</span>
                </h3>
                <p className="text-amber-400/50 text-base mb-3">Beyond Exposure — Real Business Impact</p>
                <p className="text-amber-400/70 mb-2">主论坛+闭门会+路演+晚宴+展区，全天候多触点品牌触达，转化导向的高端商务活动</p>
                <p className="text-amber-400/40 text-sm mb-6">Forum · Private Roundtable · Roadshow · Gala · Exhibition — Multi-touchpoint brand exposure and conversion-driven business events</p>
                <div className="flex flex-wrap gap-3">
                  {[["资源直通","Direct Access"],["深度曝光","Deep Exposure"],["前沿洞察","Cutting-edge Insights"],["场景多元","Multi-format"],["长期权益","Long-term Benefits"]].map(([zh, en]) => (
                    <Badge key={zh} className="bg-amber-500/20 text-amber-400 border-0">{zh} · {en}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section id="sponsor" className="py-24 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">Sponsorship & Partnership</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">赞助合作</h2>
            <p className="text-lg text-white/40 mb-4">Sponsorship Packages</p>
            <p className="text-white/60 max-w-3xl mx-auto">
              诚邀行业伙伴，共筑Web3新生态。我们提供四大赞助层级，满足不同合作需求。
              <br />
              <span className="text-white/40 text-sm">We invite industry partners to co-build the Web3 ecosystem with four sponsorship tiers.</span>
            </p>
          </div>

          {/* Sponsorship Image Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop", zh: "五星豪华会议厅", en: "5-Star Grand Ballroom" },
              { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop", zh: "嘉宾圆桌论坛", en: "VIP Roundtable Forum" },
              { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", zh: "主论坛演讲台", en: "Keynote Stage" },
              { url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop", zh: "精英社交酒会", en: "Elite Cocktail Reception" },
            ].map((item, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src={item.url} alt={item.en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-semibold text-white leading-tight">{item.zh}</p>
                  <p className="text-xs text-amber-400/80">{item.en}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sponsorship Tiers */}
          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {/* Title Sponsor */}
            <Card className="p-6 bg-gradient-to-b from-amber-500/20 to-amber-500/5 border-amber-500/30 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <Badge className="bg-amber-500 text-black mb-4">Exclusive</Badge>
                <h3 className="text-xl font-bold mb-1">冠名赞助商</h3>
                <p className="text-xs text-white/50 mb-4">Title Sponsor</p>
                <p className="text-3xl font-bold text-amber-400 mb-4">$100,000</p>
                <div className="space-y-2.5 mb-6">
                  {[
                    ["论坛全称冠名","Full naming rights of the forum"],
                    ["30分钟主论坛演讲","30-min keynote on main stage"],
                    ["主视觉最大LOGO展示","Prime logo across all visuals"],
                    ["VIP闭门午宴席位 ×6","6 exclusive VIP lunch seats"],
                    ["俱乐部创始理事身份","Founding Council Member status"],
                    ["媒体专访 ×2","2 exclusive media interviews"],
                    ["俱乐部会员名额 ×8","8 club membership slots"],
                  ].map(([zh, en], i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-400/90 font-medium">{zh}</p>
                        <p className="text-xs text-amber-400/40">{en}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl">
                  咨询合作 · Inquire Now
                </Button>
              </div>
            </Card>

            {/* Co-host */}
            <Card className="p-6 bg-gradient-to-b from-purple-500/20 to-purple-500/5 border-purple-500/30 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <Badge className="bg-purple-500 text-white mb-4">3 Seats</Badge>
                <h3 className="text-xl font-bold mb-1">联合举办方</h3>
                <p className="text-xs text-white/50 mb-4">Co-host Partner</p>
                <p className="text-3xl font-bold text-purple-400 mb-4">$50,000</p>
                <div className="space-y-2.5 mb-6">
                  {[
                    ["联合举办方品牌身份","Co-host branding across all materials"],
                    ["20分钟专题演讲","20-min panel/forum speech"],
                    ["主通道优选展位 ×1","Premium booth at main entrance"],
                    ["VIP闭门午宴席位 ×3","3 exclusive VIP lunch seats"],
                    ["圆桌论坛主持权","Roundtable moderator privilege"],
                    ["媒体专访 ×1","1 exclusive media interview"],
                    ["俱乐部会员名额 ×4","4 club membership slots"],
                  ].map(([zh, en], i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-400/90 font-medium">{zh}</p>
                        <p className="text-xs text-amber-400/40">{en}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-xl">
                  咨询合作 · Inquire Now
                </Button>
              </div>
            </Card>

            {/* Platinum */}
            <Card className="p-6 bg-gradient-to-b from-sky-500/20 to-sky-500/5 border-sky-500/30 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl" />
              <div className="relative">
                <Badge className="bg-sky-500 text-white mb-4">5 Seats</Badge>
                <h3 className="text-xl font-bold mb-1">白金赞助商</h3>
                <p className="text-xs text-white/50 mb-4">Platinum Sponsor</p>
                <p className="text-3xl font-bold text-sky-400 mb-4">$20,000</p>
                <div className="space-y-2.5 mb-6">
                  {[
                    ["官网白金席位展示","Platinum feature on official website"],
                    ["15分钟分论坛演讲","15-min sub-forum speaking slot"],
                    ["标准品牌展位 ×1","Standard exhibition booth"],
                    ["VIP闭门午宴席位 ×2","2 exclusive VIP lunch seats"],
                    ["会刊整版广告","Full-page ad in event journal"],
                    ["品牌宣传视频播放","Brand video display at venue"],
                    ["俱乐部会员名额 ×2","2 club membership slots"],
                  ].map(([zh, en], i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-400/90 font-medium">{zh}</p>
                        <p className="text-xs text-amber-400/40">{en}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-sky-500/50 text-sky-400 hover:bg-sky-500/10 rounded-xl">
                  咨询合作 · Inquire Now
                </Button>
              </div>
            </Card>

            {/* Gold */}
            <Card className="p-6 bg-gradient-to-b from-white/10 to-white/5 border-white/20 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
              <div className="relative">
                <Badge variant="outline" className="border-white/30 text-white/70 mb-4">10 Seats</Badge>
                <h3 className="text-xl font-bold mb-1">黄金赞助商</h3>
                <p className="text-xs text-white/50 mb-4">Gold Sponsor</p>
                <p className="text-3xl font-bold text-white/80 mb-4">$10,000</p>
                <div className="space-y-2.5 mb-6">
                  {[
                    ["官网黄金席位展示","Gold listing on official website"],
                    ["茶歇区标准品牌展位","Tea break area brand booth"],
                    ["VIP闭门午宴席位 ×1","1 exclusive VIP lunch seat"],
                    ["会刊半版广告","Half-page ad in event journal"],
                    ["全场LOGO滚动播放","Logo rotation across venue screens"],
                    ["社交媒体官方致谢","Official social media acknowledgment"],
                    ["俱乐部会员名额 ×1","1 club membership slot"],
                  ].map(([zh, en], i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-400/90 font-medium">{zh}</p>
                        <p className="text-xs text-amber-400/40">{en}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-amber-500/30 text-amber-400/70 hover:bg-amber-500/10 rounded-xl">
                  咨询合作 · Inquire Now
                </Button>
              </div>
            </Card>
          </div>

          {/* Benefits Summary */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 bg-white/5 border-white/10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-black" />
                </div>
                核心权益一览 Core Benefits
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { zh: "品牌冠名曝光", en: "Brand Naming" },
                  { zh: "演讲/圆桌机会", en: "Speaking Slot" },
                  { zh: "展位展示权益", en: "Exhibition Booth" },
                  { zh: "VIP闭门资源", en: "VIP Access" },
                  { zh: "媒体传播矩阵", en: "Media Coverage" },
                  { zh: "长期生态权益", en: "Long-term Benefits" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
                    <Check className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{item.zh}</p>
                      <p className="text-xs text-amber-400/50">{item.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-white/5 border-white/10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                高端资源对接 Networking
              </h3>
              <div className="space-y-4">
                {[
                  { zh: "VIP闭门午宴专属席位", en: "Exclusive VIP Lunch Seats" },
                  { zh: "定向安排1对1商务对接", en: "1-on-1 Business Matching" },
                  { zh: "获得参会嘉宾名录", en: "Access to Guest Directory" },
                  { zh: "优先推荐项目路演", en: "Priority Pitch Opportunity" },
                  { zh: "高端晚宴私享酒会", en: "Gala Dinner & VIP Reception" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.zh}</p>
                      <p className="text-xs text-amber-400/50">{item.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Luxurious Event Images */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group lg:col-span-2">
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop" alt="Luxury Gala" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-xl font-bold mb-2">高端晚宴 Gala Dinner</h4>
                <p className="text-amber-400/70 text-sm">维多利亚港景五星级酒店，邀请制精英社交晚宴<br /><span className="text-amber-400/40">5-star hotel with Victoria Harbour view — invitation-only elite dinner</span></p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=400&fit=crop" alt="Cocktail Party" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-bold">私享酒会 VIP Reception</h4>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop" alt="Business Meeting" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-bold">闭门对接 Private Meeting</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border-amber-500/20 rounded-3xl text-center mb-16">
            <h3 className="text-2xl font-bold mb-2 text-white">商务合作咨询 Business Inquiry</h3>
            <p className="text-amber-400/70 mb-6">诚邀行业伙伴，共筑亚洲Web3精英生态</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-sm text-amber-400/60 mb-1">招商热线 Contact</p>
                <p className="text-2xl font-bold text-amber-400">+852 6583 3104</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-sm text-amber-400/60 mb-1">商务邮箱 Email</p>
                <p className="text-2xl font-bold text-purple-400">sponsor@asiaweb3.club</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-12 rounded-full">
              立即咨询 Contact Us
            </Button>
          </Card>

          {/* Ticket Types */}
          <div className="mb-4 text-center">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">Tickets · 门票</Badge>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">峰会门票</h3>
            <p className="text-amber-400/50 text-base mb-2">Summit Ticket Packages</p>
            <p className="text-amber-400/70 mb-12">四种票种满足不同参会需求，席位有限请尽早选购</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* 基础票 */}
            <Card className="p-6 bg-white/5 border-white/10 hover:border-amber-500/30 transition-all rounded-3xl flex flex-col">
              <div className="mb-4">
                <Badge className="bg-white/10 text-white border-0 mb-3">Basic · 基础票</Badge>
                <p className="text-3xl font-bold text-white mb-1">$120 <span className="text-base font-normal text-amber-400/60">USD</span></p>
                <p className="text-xs text-amber-400/50">标准参会资格 Standard Access</p>
              </div>
              <div className="flex-1 space-y-2.5 mb-6">
                {[
                  ["全程参加主论坛、分论坛、展览区", "Full access to all forums & exhibition"],
                  ["官方电子资料包", "Official digital materials pack"],
                  ["茶歇及自助水果点心", "Tea break & refreshments"],
                  ["加入大���官方社群", "Join official community group"],
                  ["3场演讲视频回放（精选）", "3 selected session replays"],
                ].map(([zh, en], i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400/60 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/90">{zh}</p>
                      <p className="text-[10px] text-amber-400/40">{en}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-white/30 pt-2 border-t border-white/10">不含纸质会刊 · 闭门午宴 · 商务对接<br /><span className="text-[10px] text-amber-400/30">Excludes printed journal, private lunch, business matching</span></p>
              </div>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl" onClick={() => document.getElementById("register")?.scrollIntoView({behavior:"smooth"})}>
                立即报名 Register
              </Button>
            </Card>

            {/* 标准票 */}
            <Card className="p-6 bg-white/5 border-white/10 hover:border-amber-500/30 transition-all rounded-3xl flex flex-col">
              <div className="mb-4">
                <Badge className="bg-amber-500/20 text-amber-400 border-0 mb-3">Standard · 标准票</Badge>
                <p className="text-3xl font-bold text-amber-400 mb-1">$300 <span className="text-base font-normal text-amber-400/60">USD</span></p>
                <p className="text-xs text-amber-400/50">完整参会体验 Full Experience</p>
              </div>
              <div className="flex-1 space-y-2.5 mb-6">
                {[
                  ["全程参加主论坛及展览区", "Full access to main forum & exhibition"],
                  ["纸质会刊1本", "1 printed event journal"],
                  ["论坛定制礼品袋", "Customized gift bag"],
                  ["茶歇及自助午餐", "Tea break & buffet lunch"],
                  ["官方社群精华摘要推送", "Daily forum highlights in community"],
                  ["演讲提纲会前获取", "Speaker outlines pre-event"],
                  ["全部演讲视频回放（1个月）", "All session replays (1-month access)"],
                  ["参会者交流社群", "Attendee networking community"],
                ].map(([zh, en], i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/90">{zh}</p>
                      <p className="text-[10px] text-amber-400/40">{en}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-xl" onClick={() => document.getElementById("register")?.scrollIntoView({behavior:"smooth"})}>
                立即报名 Register
              </Button>
            </Card>

            {/* VIP票 */}
            <Card className="p-6 bg-gradient-to-b from-amber-500/20 to-amber-500/5 border-amber-500/40 hover:border-amber-400 transition-all rounded-3xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-amber-500 text-black font-bold border-0">VIP · 限量100张</Badge>
                </div>
                <p className="text-3xl font-bold text-amber-400 mb-1">$998 <span className="text-base font-normal text-amber-400/60">USD</span></p>
                <p className="text-xs text-amber-400/50">尊贵体验 Premium Experience</p>
              </div>
              <div className="flex-1 space-y-2.5 mb-6">
                {[
                  ["VIP专属签到通道及休息室", "VIP check-in & lounge (full day)"],
                  ["VIP闭门晚宴（限80人）", "VIP private dinner (max 80 guests)"],
                  ["论坛酒会入场资格", "Forum cocktail reception access"],
                  ["主论坛前3排预留座位", "Reserved front-row seating"],
                  ["完整参会嘉宾名录（授权）", "Full guest directory (authorized)"],
                  ["1对1商务对接服务", "1-on-1 business matching service"],
                  ["VIP核心社群 + 闭门问答", "VIP core community + closed Q&A"],
                  ["线上预热研讨会1场", "1 pre-event online workshop"],
                  ["全部演讲视频永久回看", "All session replays — lifetime access"],
                  ["高端品牌定制礼品", "Premium branded gift set"],
                ].map(([zh, en], i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/90">{zh}</p>
                      <p className="text-[10px] text-amber-400/40">{en}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl" onClick={() => document.getElementById("register")?.scrollIntoView({behavior:"smooth"})}>
                立即报名 Register
              </Button>
            </Card>

            {/* 尊享通票 */}
            <Card className="p-6 bg-gradient-to-b from-purple-500/20 to-purple-500/5 border-purple-500/40 hover:border-purple-400 transition-all rounded-3xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-amber-400" />
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold border-0">尊享通票 · 限量30张</Badge>
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent mb-1">$1,998 <span className="text-base font-normal text-amber-400/60">USD</span></p>
                <p className="text-xs text-purple-400/70">年度圈层通行证 Annual Elite Pass</p>
              </div>
              <div className="flex-1 space-y-2.5 mb-6">
                <p className="text-xs text-amber-400/60 font-semibold uppercase tracking-wide mb-3">包含VIP全部权益，并额外增加 · All VIP benefits plus:</p>
                {[
                  ["与主旨演讲嘉宾单独合影交流", "Private photo & chat with keynote speakers"],
                  ["闭门圆桌会议入场资格", "Access to closed-door roundtable"],
                  ["全程专属贵宾管家服务", "Dedicated VIP concierge all day"],
                  ["主论坛午宴/晚宴主桌席位", "Host table at main forum dinner"],
                  ["亚洲WEB3俱乐部季度闭门研讨（价值$2,000）", "Quarterly closed-door workshop ($2,000 value)"],
                  ["官方白皮书首页列名鸣谢", "Named acknowledgment on whitepaper"],
                  ["下届论坛VIP票免费赠送1张", "1 complimentary VIP ticket for next forum"],
                  ["奢侈品牌联名定制礼盒", "Luxury brand co-branded gift box"],
                  ["加入创始人级大会社群", "Founding members community access"],
                ].map(([zh, en], i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/90">{zh}</p>
                      <p className="text-[10px] text-amber-400/40">{en}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white font-bold rounded-xl" onClick={() => document.getElementById("register")?.scrollIntoView({behavior:"smooth"})}>
                立即报名 Register
              </Button>
            </Card>
          </div>

          {/* Ticket CTA note */}
          <p className="text-center text-amber-400/50 text-sm mt-8">
            如需团体购票或定制服务，请联系我们 · For group bookings or custom packages, please contact us
            <span className="text-amber-400 font-semibold ml-2">+852 6583 3104</span>
          </p>
        </div>
      </section>

      {/* Register Section */}
      <section id="register" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">Register · 立即报名</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">立即报名</h2>
            <p className="text-amber-400/50 text-base mb-2">Secure Your Seat Today</p>
            <p className="text-amber-400/70">席位有限，预约从速</p>
            <p className="text-amber-400/40 text-sm mt-1">Limited seats available — register now before they&apos;re gone</p>
          </div>
          
          <Card className="p-8 lg:p-12 bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400/90">姓名 · Full Name <span className="text-amber-400">*</span></label>
                  <Input
                    placeholder="请输入您的姓名 / Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400/90">公司/机构 · Company / Organization</label>
                <Input
                  placeholder="请输入您的公司名称 / Your company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400/90">邮箱 · Email Address</label>
                <Input
                  type="email"
                  placeholder="请输入您的邮箱 / Your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-400/90">手机号 · Phone Number <span className="text-amber-400">*</span></label>
                <Input
                  placeholder="请输入您的手机号 / Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!formData.name || !formData.phone || isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-lg rounded-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    提交中...
                  </div>
                ) : (
                  "提交报名 · Submit Registration"
                )}
              </Button>
              <p className="text-xs text-center text-amber-400/40">
                提交即表示您同意我们的服务条款和隐私政策
                <br />By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-bold text-sm">ASIA WEB3 ELITE CLUB</p>
                <p className="text-xs text-white/40">亚洲WEB3精英���乐部</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-amber-400/50">
              <span>2026年6月25日 · Jun 25, 2026</span>
              <span>香港 · Hong Kong</span>
              <span>+852 6583 3104</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-[#0a0a0f] border-white/10 rounded-3xl max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-black" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-1 text-white">报名成功</DialogTitle>
            <p className="text-amber-400/50 text-sm mb-3">Registration Successful</p>
            <p className="text-amber-400/70 mb-1">感谢您的报名，我们会尽快与您联系确认参会信息</p>
            <p className="text-amber-400/40 text-sm mb-6">Thank you for registering. We will contact you shortly to confirm your attendance.</p>
            <div className="p-4 rounded-2xl bg-white/5 mb-6 text-left">
              <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                  <span className="text-amber-400/50">姓名 · Name</span>
                  <span className="text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-400/50">联系方式 · Contact</span>
                  <span className="text-white">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-400/50">活动日期 · Date</span>
                  <span className="text-amber-400">2026年6月25日 · Jun 25</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
