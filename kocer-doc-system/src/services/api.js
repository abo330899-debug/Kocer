import axios from 'axios'
const api = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } })
export function fetchCompanyByHash(hashCode) { return api.get(`/company/${hashCode}`) }
export function submitShipmentRequest(companyId, items) { return api.post('/document/create', { company_id: companyId, items }) }
export function regenerateDocQR(docNumber) { return api.post('/document/return-doc-qrcode', { doc_number: docNumber }) }
export function fetchCompanyDoc(docNumber) { return api.get(`/document/return-company-doc/${docNumber}`) }
export function fetchQRDocument(docNumber) { return api.get(`/document/qr/${docNumber}`) }
export function disableDocument(docNumber) { return api.post('/document/disable', { doc_number: docNumber }) }
export function fetchReadings(docNumber) { return api.get(`/document/readings/${docNumber}`) }
export function addReading(docNumber, readingData) { return api.post('/document/readings', { doc_number: docNumber, ...readingData }) }
export default api
