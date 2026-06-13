import { defineConfig } from 'vitepress'

// VitePress 站点配置：contract-guard 可验证契约手册
export default defineConfig({
  title: '可验证契约手册',
  description: 'contract-guard 契约模板库 · Handbook + Cookbook · 23 条可验证契约',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  cleanUrls: true,

  // 预览环境域名白名单
  vite: {
    server: {
      allowedHosts: ['.preview.with.woa.com', '.devnet-preview.with.woa.com']
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '导读', link: '/guide/intro' },
      { text: '场景速查 (Cookbook)', link: '/guide/how-to-read' },
      { text: '契约总览', link: '/guide/overview' }
    ],

    sidebar: [
      {
        text: '开始',
        collapsed: false,
        items: [
          { text: '导读：什么是可验证契约', link: '/guide/intro' },
          { text: '怎么用这本手册', link: '/guide/how-to-read' },
          { text: '23 条契约总览', link: '/guide/overview' }
        ]
      },
      {
        text: '一 · 通用基础（universal）',
        collapsed: false,
        items: [
          { text: '01 幂等性 IDEM', link: '/universal/idempotency' },
          { text: '02 并发竞态 CONC', link: '/universal/concurrency' },
          { text: '03 数据一致性 DC', link: '/universal/data-consistency' },
          { text: '04 边界与空值 BN', link: '/universal/boundary-nullness' },
          { text: '05 失败与重试 FR', link: '/universal/failure-retry' },
          { text: '06 资源生命周期 RES', link: '/universal/resource-lifecycle' },
          { text: '07 时间与时区正确性 TIME', link: '/universal/time-correctness' }
        ]
      },
      {
        text: '二 · 分布式与存储（distributed）',
        collapsed: false,
        items: [
          { text: '08 消息投递语义 MSG', link: '/distributed/messaging-delivery' },
          { text: '09 分区容错与共识 PT', link: '/distributed/partition-tolerance' },
          { text: '10 存储持久化与缓存 SD', link: '/distributed/storage-durability' },
          { text: '11 可观测性与监控 OB', link: '/distributed/observability' }
        ]
      },
      {
        text: '三 · AI 训推与推荐（ml-serving）',
        collapsed: false,
        items: [
          { text: '12 训练-服务一致性 TSS', link: '/ml/training-serving-skew' },
          { text: '13 推理服务稳定性 INF', link: '/ml/inference-serving' },
          { text: '14 推荐系统服务质量 REC', link: '/ml/recommendation-serving' }
        ]
      },
      {
        text: '四 · 电商交易（ecommerce）',
        collapsed: false,
        items: [
          { text: '15 资金与对账 FIN', link: '/ecommerce/financial-reconciliation' },
          { text: '16 库存与履约 INV', link: '/ecommerce/inventory-fulfillment' }
        ]
      },
      {
        text: '五 · 工程与平台（engineering）',
        collapsed: false,
        items: [
          { text: '17 接口兼容性 API', link: '/engineering/api-compatibility' },
          { text: '18 配置变更与发布安全 CRS', link: '/engineering/config-release-safety' },
          { text: '19 防滥用与安全边界 SEC', link: '/engineering/abuse-security' },
          { text: '20 多租户与资源隔离 MT', link: '/engineering/multi-tenancy' },
          { text: '21 大数据批流处理 DP', link: '/engineering/data-pipeline' },
          { text: '22 实时系统与 IoT RT', link: '/engineering/realtime-iot' },
          { text: '23 音视频传输与 RTC MS', link: '/engineering/media-streaming' }
        ]
      }
    ],

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索契约', buttonAriaLabel: '搜索契约' },
          modal: {
            noResultsText: '没有找到相关契约',
            resetButtonTitle: '清除',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    footer: {
      message: '可验证契约 · 不是模糊提醒，而是带前置/后置/不变式/验收的可验证下限',
      copyright: 'contract-guard 契约模板库 · template_lib_version 2026.06.12.2'
    }
  }
})
