import { defineUserConfig } from 'vitepress-export-pdf'

export default defineUserConfig({
  outFile: '可验证契约手册.pdf',
  pdfOutlines: true,
  routePatterns: ['!/'],
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
      '/guide/intro.html',
      '/guide/how-to-read.html',
      '/guide/overview.html',
      '/universal/idempotency.html',
      '/universal/concurrency.html',
      '/universal/data-consistency.html',
      '/universal/boundary-nullness.html',
      '/universal/failure-retry.html',
      '/universal/resource-lifecycle.html',
      '/universal/time-correctness.html',
      '/distributed/messaging-delivery.html',
      '/distributed/partition-tolerance.html',
      '/distributed/storage-durability.html',
      '/distributed/observability.html',
      '/ml/training-serving-skew.html',
      '/ml/inference-serving.html',
      '/ml/recommendation-serving.html',
      '/ecommerce/financial-reconciliation.html',
      '/ecommerce/inventory-fulfillment.html',
      '/engineering/api-compatibility.html',
      '/engineering/config-release-safety.html',
      '/engineering/abuse-security.html',
      '/engineering/multi-tenancy.html',
      '/engineering/data-pipeline.html',
      '/engineering/realtime-iot.html',
      '/engineering/media-streaming.html'
    ]
    const aIndex = routeOrder.findIndex(route => route === pageA.path)
    const bIndex = routeOrder.findIndex(route => route === pageB.path)
    return aIndex - bIndex
  }
})
