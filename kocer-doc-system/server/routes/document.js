import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()

function readDB() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/db.json'), 'utf-8'))
}
function writeDB(data) {
  fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(data, null, 2), 'utf-8')
}

function generateFakeQR(data) {
  const r = Math.random()
  if (r < 0.25) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  if (r < 0.5) return `https://customs-uboor.ur.gov.iq/robot?url=${encodeURIComponent(data)}`
  if (r < 0.75) return `https://quickchart.io/qr?text=${encodeURIComponent(data)}&size=200`
  const b64 = Buffer.from(data).toString('base64')
  return b64 + '='.repeat(Math.max(0, 80 - b64.length))
}

router.get('/company/:hash', (req, res) => {
  const db = readDB()
  const searchHash = String(req.params.hash || '').trim().toLowerCase()
  const company = db.companies.find(c => String(c.hash || '').trim().toLowerCase() === searchHash)

  if (!company) return res.status(404).json({ error: 'Company not found' })

  res.json({
    company: { id: company.id, name: company.name, code: company.code, hash: company.hash },
    items: company.items || []
  })
})

router.post('/document/create', (req, res) => {
  const { company_id, items } = req.body
  const db = readDB()
  const company = db.companies.find(c => c.id === company_id)
  if (!company) return res.status(404).json({ error: 'Company not found' })
  if (!items || !items.length) return res.status(400).json({ error: 'No items provided' })
  const docNumber = Date.now()
  const docData = JSON.stringify({ company: company.name, items, doc_number: docNumber })
  const newDoc = {
    doc_number: docNumber, company_name: company.name,
    driver_name: 'سائق افتراضي', vehicle_number: `بغداد ${Math.floor(Math.random() * 99999)}`,
    load_type: 'بضائع عامة', load_weight: items.reduce((sum, item) => sum + (item.quantity || 0), 0),
    destination: 'بغداد', created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30*24*60*60*1000).toISOString(),
    license_approval_number: `LIC-${Math.floor(Math.random() * 100000)}`,
    reference: `REF-${docNumber}`,
    items: items.map(item => ({ item_name: item.item_name, production_capacity: item.production_capacity || item.quantity, unit: item.unit, quantity: item.quantity || 0 })),
    qr_code: generateFakeQR(docData),
    response: { qr_code: generateFakeQR(docData + '-response') }
  }
  db.documents.push(newDoc)
  writeDB(db)
  res.json({ doc: newDoc })
})

router.post('/document/return-doc-qrcode', (req, res) => {
  const { doc_number } = req.body
  const db = readDB()
  const doc = db.documents.find(d => d.doc_number === doc_number)
  if (!doc) return res.status(404).json({ error: 'Document not found' })
  const docData = JSON.stringify({ doc_number, company: doc.company_name })
  doc.qr_code = generateFakeQR(docData + '-regenerated-' + Date.now())
  doc.response.qr_code = generateFakeQR(docData + '-response-' + Date.now())
  writeDB(db)
  res.json({ doc: { number: doc_number, qr_code: doc.qr_code }, raw: { doc_number, response: doc } })
})

router.get('/document/return-company-doc/:id', (req, res) => {
  const db = readDB()
  const doc = db.documents.find(d => d.doc_number === parseInt(req.params.id))
  if (!doc) return res.status(404).json({ error: 'Document not found' })
  res.json({ doc })
})

router.get('/document/qr/:id', (req, res) => {
  const db = readDB()
  const doc = db.documents.find(d => d.doc_number === parseInt(req.params.id))
  if (!doc) return res.status(404).json({ error: 'Document not found' })
  res.json({ doc_number: doc.doc_number, company_name: doc.company_name, driver_name: doc.driver_name, vehicle_number: doc.vehicle_number, items: doc.items, qr_code: doc.qr_code })
})

router.post('/document/disable', (req, res) => {
  const { doc_number } = req.body
  const db = readDB()
  const doc = db.documents.find(d => d.doc_number === doc_number)
  if (!doc) return res.status(404).json({ error: 'Document not found' })
  doc.disabled = true
  doc.disabled_at = new Date().toISOString()
  writeDB(db)
  res.json({ success: true, doc_number, status: 'disabled' })
})

router.get('/document/readings/:id', (req, res) => {
  const docNumber = parseInt(req.params.id)
  const readings = [
    { id: 1, doc_number: docNumber, reader: 'نقطة تفتيش الكرخ', read_at: new Date(Date.now()-86400000).toISOString(), status: 'مسموح' },
    { id: 2, doc_number: docNumber, reader: 'نقطة تفتيش الرصافة', read_at: new Date(Date.now()-43200000).toISOString(), status: 'مسموح' }
  ]
  res.json({ readings })
})

router.post('/document/readings', (req, res) => {
  const { doc_number, reader, status, notes } = req.body
  const newReading = { id: Date.now(), doc_number, reader: reader || 'نقطة تفتيش', read_at: new Date().toISOString(), status: status || 'مسموح', notes: notes || '' }
  res.json({ success: true, reading: newReading })
})

export default router
