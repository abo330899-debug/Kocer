import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/company-owner', name: 'CompanyOwner', component: () => import('../views/CompanyOwnerView.vue') },
  { path: '/qr/document', name: 'QRDocument', component: () => import('../views/QRDocument.vue') },
  { path: '/qr/local', name: 'QRLocal', component: () => import('../views/QRLocal.vue') },
  { path: '/qr/imported', name: 'QRImported', component: () => import('../views/QRImported.vue') },
  { path: '/qr/health-certificate', name: 'QRHealthCertificate', component: () => import('../views/QRHealthCertificate.vue') },
  { path: '/qr/readers', name: 'QRCodeReaders', component: () => import('../views/QRCodeReaders.vue') },
  { path: '/qr/readings', name: 'QRReadings', component: () => import('../views/QRReadings.vue') },
  { path: '/qr/control-scan', name: 'QrControlScan', component: () => import('../views/QrControlScan.vue') },
  { path: '/qr/checkpoints', name: 'QRCheckpoints', component: () => import('../views/QRCheckpoints.vue') },
  { path: '/qr/disable', name: 'DisableDocument', component: () => import('../views/DisableDocument.vue') }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router
