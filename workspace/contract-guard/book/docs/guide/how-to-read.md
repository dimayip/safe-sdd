# 怎么用这本手册（场景速查 · Cookbook）

这本手册有两种用法，对应你的两个场景：

- **现场对线（Cookbook 模式）**：和甲方/LLM 聊技术方案时，先用下面的"场景 → 该查哪几条契约"速查表快速定位，临场就能提出有骨架的问题，不被打"不专业"标签。
- **离线补课（Handbook 模式）**：按左侧侧边栏的章节顺序逐条啃，系统性把"可验证下限"的认知补上。建议从「通用基础」开始。

---

## 场景速查表

> 用法：从左列里找到你正在谈的业务动作，右列就是这次必须摆到桌面上的契约。把它们的「不变式」当成提问骨架。

| 当你在谈… | 必查契约 | 一句话现场提问 |
| --- | --- | --- |
| 支付 / 下单提交 | [幂等 IDEM](/universal/idempotency)、[资金对账 FIN](/ecommerce/financial-reconciliation) | "重复提交/回调重复时，怎么保证只扣一次款、只建一次单？" |
| 秒杀 / 抢购 / 库存扣减 | [并发 CONC](/universal/concurrency)、[库存履约 INV](/ecommerce/inventory-fulfillment) | "高并发下靠什么保证不超卖、不出现负库存？" |
| 跨表 / 跨服务的业务操作 | [数据一致性 DC](/universal/data-consistency)、[库存履约 INV](/ecommerce/inventory-fulfillment) | "中途某一步失败，已写的那部分怎么回滚或补偿？" |
| 调第三方 / 外部依赖 | [失败重试 FR](/universal/failure-retry) | "依赖超时怎么区分可重试和不可重试？重试有没有上界和退避？" |
| 消息队列 / 事件驱动 | [消息投递 MSG](/distributed/messaging-delivery)、[幂等 IDEM](/universal/idempotency) | "消息重复投递时消费端幂等吗？确认成功的消息会不会丢？" |
| 多节点 / 集群 / 多副本 | [分区容错 PT](/distributed/partition-tolerance) | "网络分区时是 CP 还是 AP？怎么防脑裂双主？" |
| 存数据库 / 用缓存 | [存储持久化 SD](/distributed/storage-durability) | "返回成功是不是真落盘了？缓存和源的不一致窗口多大？" |
| 接外部输入 / 表单 / 回调 | [边界空值 BN](/universal/boundary-nullness) | "非法输入、空集合、边界值在进核心逻辑前拦住了吗？" |
| 模型训练 + 上线 | [训服一致 TSS](/ml/training-serving-skew)、[推理稳定 INF](/ml/inference-serving) | "线上特征和训练特征同源吗？有没有标签穿越？推理超时怎么降级？" |
| 推荐 / 信息流 / 视频流 | [推荐质量 REC](/ml/recommendation-serving) | "无候选时白屏还是兜底？曝光去重和疲劳控制怎么做？" |
| 接口升级 / schema 演进 | [接口兼容 API](/engineering/api-compatibility) | "这次变更对存量调用方兼容吗？破坏性变更升主版本了吗？" |
| 配置下发 / 灰度发布 | [配置发布 CRS](/engineering/config-release-safety) | "能灰度吗？能一键回滚吗？配置生效前校验了吗？" |
| 对外接口 / 鉴权 / 防刷 | [防滥用 SEC](/engineering/abuse-security) | "防重放、防越权、防刷量这三道分别怎么挡？" |
| SaaS / 多租户 | [多租户 MT](/engineering/multi-tenancy) | "租户数据怎么保证不串台？单租户能不能拖垮全局？" |
| 大数据 / 流批 / ETL | [数据管道 DP](/engineering/data-pipeline) | "端到端是不是精确一次？迟到乱序数据怎么处理？" |
| IoT / 实时控制 / 时序 | [实时 IoT RT](/engineering/realtime-iot) | "时延有硬上界吗？设备离线怎么办？下发指令幂等吗？" |
| 直播 / RTC / 音视频 | [媒体流 MS](/engineering/media-streaming) | "弱网丢包会不会卡死？码率自适应吗？音画同步容差多少？" |
| 任何长跑服务 / 用连接池 | [资源生命周期 RES](/universal/resource-lifecycle) | "异常路径会不会漏释放资源？停机时在途请求怎么收尾？" |
| 任何涉及时间 / 定时任务 | [时间正确性 TIME](/universal/time-correctness) | "跨时区会不会算错？用墙上时钟测时长被回拨怎么办？" |
| 任何系统的监控告警 | [可观测性 OB](/distributed/observability) | "关键路径有埋点吗？告警会漏报或风暴吗？日志脱敏了吗？" |

---

## 现场三步法

1. **定位**：用上表把当前业务动作映射到 2–4 条契约。
2. **提问**：把契约的「不变式」改成疑问句抛给对方（如不变式"已分配量 ≤ 容量上限" → "你们靠什么保证库存不被超卖？"）。
3. **验收**：让对方说出"怎么测能证明做到了"——这一步直接对应契约的「验收标准」。对方答不出验收用例，多半就是没真做。

::: tip 为什么这招有效
你不需要先知道对方用乐观锁还是分布式锁（那是 L1 实现细节），只要握住契约的**不变式和验收标准**，就能把话题钉在"可验证的下限"上。甲方答得出 → 方案靠谱；答不出 → 暴露风险点。主动权在你这边。
:::

---

## 离线补课路线

| 阶段 | 读什么 | 目标 |
| --- | --- | --- |
| 入门 | [通用基础 7 条](/universal/idempotency) | 建立"四要素 + 不变式"的读契约肌肉记忆 |
| 进阶 | 你当前在做的领域章节 | 把通用契约在该领域如何落地看明白 |
| 串联 | 留意每条里的"依赖 XXX" | 理解契约之间如何组合复用 |

<div style="text-align:center;margin-top:48px;color:var(--vp-c-text-3);">
</div>
