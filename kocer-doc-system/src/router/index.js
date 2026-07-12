import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/company-owner', name: 'CompanyOwner', component: () => import('../views/CompanyOwnerView.vue') },
  { path: '/qr/document', name: 'QRDocument', component: () => import('../views/QRDocument.vue') }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router
