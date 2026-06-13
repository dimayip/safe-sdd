# 23 条契约总览

全库共 **23 条契约**，覆盖 **12 个领域标签**。下表是一张速览，点击标题进入对应正文。

> 列里的"前缀"是契约编号前缀（如 IDEM-1、IDEM-2），同一文件下可能有多条编号契约。

## 一 · 通用基础（universal）

| # | 契约 | 前缀 | 核心不变式（一句话） |
| --- | --- | --- | --- |
| 01 | [幂等性](/universal/idempotency) | IDEM | 同一幂等键的副作用至多发生一次 |
| 02 | [并发竞态](/universal/concurrency) | CONC | 已分配量 ≤ 容量上限，无丢更新 |
| 03 | [数据一致性](/universal/data-consistency) | DC | 跨资源写要么全生效要么可收敛一致，无永久半成品 |
| 04 | [边界与空值](/universal/boundary-nullness) | BN | 进核心层的数据已满足类型与取值域约束 |
| 05 | [失败与重试](/universal/failure-retry) | FR | 失败可见可分类，重试有界不放大故障 |
| 06 | [资源生命周期](/universal/resource-lifecycle) | RES | 获取与释放成对，异常路径也不泄漏 |
| 07 | [时间与时区正确性](/universal/time-correctness) | TIME | 时间语义明确，时长测量用单调时钟 |

## 二 · 分布式与存储（distributed）

| # | 契约 | 前缀 | 核心不变式（一句话） |
| --- | --- | --- | --- |
| 08 | [消息投递语义](/distributed/messaging-delivery) | MSG | 每条消息业务副作用至多一次，确认即不丢 |
| 09 | [分区容错与共识](/distributed/partition-tolerance) | PT | 同一资源任意时刻至多一个分区可权威写（防脑裂） |
| 10 | [存储持久化与缓存](/distributed/storage-durability) | SD | 已确认的写重启后可读，缓存不一致窗口有界 |
| 11 | [可观测性与监控](/distributed/observability) | OB | 关键请求可贯穿追踪，告警不漏报不风暴 |

## 三 · AI 训推与推荐（ml-serving / recommendation）

| # | 契约 | 前缀 | 核心不变式（一句话） |
| --- | --- | --- | --- |
| 12 | [训练-服务一致性](/ml/training-serving-skew) | TSS | 训练特征与线上特征容差内相等，无未来信息泄漏 |
| 13 | [推理服务稳定性](/ml/inference-serving) | INF | 推理耗时有上界，输出无 NaN/越界 |
| 14 | [推荐系统服务质量](/ml/recommendation-serving) | REC | 始终有非空兜底结果，曝光去重生效 |

## 四 · 电商交易（ecommerce）

| # | 契约 | 前缀 | 核心不变式（一句话） |
| --- | --- | --- | --- |
| 15 | [资金与对账](/ecommerce/financial-reconciliation) | FIN | Σ各账户变动 = 0，账实可勾稽 |
| 16 | [库存与履约](/ecommerce/inventory-fulfillment) | INV | 可用库存 ≥ 0，预占必有确认或释放 |

## 五 · 工程与平台（engineering 及专项领域）

| # | 契约 | 前缀 | 核心不变式（一句话） |
| --- | --- | --- | --- |
| 17 | [接口兼容性](/engineering/api-compatibility) | API | 旧调用方不改也能正常调同主版本接口 |
| 18 | [配置变更与发布安全](/engineering/config-release-safety) | CRS | 任意已发布变更都有可执行回滚路径 |
| 19 | [防滥用与安全边界](/engineering/abuse-security) | SEC | 已消费凭证不可二次接受，默认拒绝 |
| 20 | [多租户与资源隔离](/engineering/multi-tenancy) | MT | 数据访问作用域 ⊆ 当前租户，故障半径受限 |
| 21 | [大数据批流处理](/engineering/data-pipeline) | DP | 同一输入汇中至多体现一次，流批口径一致 |
| 22 | [实时系统与 IoT](/engineering/realtime-iot) | RT | 实时路径时延 ≤ 硬上界，下行指令幂等 |
| 23 | [音视频传输与 RTC](/engineering/media-streaming) | MS | 编解码取交集，弱网降质不崩溃，音画同步在容差内 |

---

## 领域标签维度（另一种视图）

同一条契约可属于多个领域。下面按 `domains` 标签列出哪些契约会在该领域被命中：

| 领域标签 | 命中的契约 |
| --- | --- |
| `universal` | 幂等、并发、数据一致性、边界空值、失败重试、防滥用、存储持久化、可观测性、时间正确性、资源生命周期 |
| `distributed` | 幂等、数据一致性、失败重试、消息投递、分区容错、接口兼容、防滥用、数据管道、实时IoT、多租户、媒体流、存储持久化、可观测性、时间正确性、资源生命周期 |
| `ml-serving` | 幂等、数据一致性、失败重试、训服一致、推理稳定 |
| `recommendation` | 幂等、失败重试、训服一致、推理稳定、推荐质量、防滥用 |
| `ecommerce` | 幂等、并发、数据一致性、失败重试、消息投递、资金对账、库存履约、防滥用、时间正确性 |
| `engineering` | 边界空值、接口兼容、配置发布、防滥用、多租户、可观测性、时间正确性、资源生命周期 |
| `data-pipeline` | 幂等、数据一致性、消息投递、数据管道、存储持久化、时间正确性 |
| `realtime-iot` | 幂等、失败重试、防滥用、实时IoT、时间正确性 |
| `multi-tenancy` | 失败重试、分区容错、多租户、可观测性、资源生命周期 |
| `media-streaming` | 媒体流 |
| `storage` | 存储持久化、资源生命周期 |
| `observability` | 可观测性 |

<div style="text-align:center;margin-top:48px;color:var(--vp-c-text-3);">
  <p>由 <a href="https://with.woa.com/" style="color: #8A2BE2;" target="_blank">With</a> 通过自然语言生成</p>
</div>
