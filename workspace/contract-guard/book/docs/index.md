---
layout: home

hero:
  name: 可验证契约手册
  text: contract-guard 契约模板库
  tagline: 23 条带「前置条件 / 后置条件 / 不变式 / 验收标准」的可验证契约 —— 给 SDD 一个从源头就成立的下限
  actions:
    - theme: brand
      text: 先读这个 · 导读
      link: /guide/intro
    - theme: alt
      text: 场景速查 Cookbook
      link: /guide/how-to-read
    - theme: alt
      text: 23 条总览
      link: /guide/overview

features:
  - icon: 🧩
    title: 通用基础 · 7 条
    details: 幂等、并发、数据一致性、边界空值、失败重试、资源生命周期、时间正确性。任何系统都绕不开的底座。
    link: /universal/idempotency
    linkText: 进入章节
  - icon: 🌐
    title: 分布式与存储 · 4 条
    details: 消息投递语义、分区容错与共识、存储持久化与缓存、可观测性。多节点协作的硬约束。
    link: /distributed/messaging-delivery
    linkText: 进入章节
  - icon: 🤖
    title: AI 训推与推荐 · 3 条
    details: 训练-服务一致性、推理服务稳定性、推荐系统服务质量。模型上线后真正会翻车的地方。
    link: /ml/training-serving-skew
    linkText: 进入章节
  - icon: 🛒
    title: 电商交易 · 2 条
    details: 资金与对账、库存与履约。钱和货，一分都不能错、不能丢、不能凭空多。
    link: /ecommerce/financial-reconciliation
    linkText: 进入章节
  - icon: 🏗️
    title: 工程与平台 · 7 条
    details: 接口兼容、配置发布、防滥用、多租户、大数据批流、实时 IoT、音视频传输。
    link: /engineering/api-compatibility
    linkText: 进入章节
  - icon: 🎯
    title: 怎么用
    details: 现场和甲方对线时，先翻「场景速查」定位该查哪几条；想系统补认知，就按章节逐条啃。
    link: /guide/how-to-read
    linkText: 使用指南
---

<div style="max-width:880px;margin:48px auto 0;padding:0 24px;text-align:center;color:var(--vp-c-text-2);line-height:1.9;">

> ⚠️ 这里收录的是**可验证的契约模板**，不是「要小心 XX」这类模糊提醒。
> 模糊提醒提不了下限，**带前置条件 / 后置条件 / 不变式 / 验收标准的契约才能**。

</div>

<div style="text-align:center;margin-top:40px;color:var(--vp-c-text-3);">
  <p>由 <a href="https://with.woa.com/" style="color: #8A2BE2;" target="_blank">With</a> 通过自然语言生成</p>
</div>
