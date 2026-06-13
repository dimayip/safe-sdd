import { defineUserConfig } from 'vitepress-export-pdf'

export default defineUserConfig({
  outFile: '可验证契约手册.pdf',
  pdfOutlines: true,
  routePatterns: ['!/safe-sdd/'],
  pdfOptions: {
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size:9px;text-align:center;width:100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    printBackground: true
  },
  sorter: (pageA, pageB) => {
    const routeOrder = [
      '/safe-sdd/guide/intro',
      '/safe-sdd/guide/how-to-read',
      '/safe-sdd/guide/overview',
      '/safe-sdd/universal/idempotency',
      '/safe-sdd/universal/concurrency',
      '/safe-sdd/universal/data-consistency',
      '/safe-sdd/universal/boundary-nullness',
      '/safe-sdd/universal/failure-retry',
      '/safe-sdd/universal/resource-lifecycle',
      '/safe-sdd/universal/time-correctness',
      '/safe-sdd/distributed/messaging-delivery',
      '/safe-sdd/distributed/partition-tolerance',
      '/safe-sdd/distributed/storage-durability',
      '/safe-sdd/distributed/observability',
      '/safe-sdd/ml/training-serving-skew',
      '/safe-sdd/ml/inference-serving',
      '/safe-sdd/ml/recommendation-serving',
      '/safe-sdd/ecommerce/financial-reconciliation',
      '/safe-sdd/ecommerce/inventory-fulfillment',
      '/safe-sdd/engineering/api-compatibility',
      '/safe-sdd/engineering/config-release-safety',
      '/safe-sdd/engineering/abuse-security',
      '/safe-sdd/engineering/multi-tenancy',
      '/safe-sdd/engineering/data-pipeline',
      '/safe-sdd/engineering/realtime-iot',
      '/safe-sdd/engineering/media-streaming'
    ]
    const aIndex = routeOrder.findIndex(route => route === pageA.path)
    const bIndex = routeOrder.findIndex(route => route === pageB.path)
    return aIndex - bIndex
  }
})
