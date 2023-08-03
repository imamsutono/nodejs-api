import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { createProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)
router.get('/product/:id', () => {})
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400)
    res.json({ errors: errors.array() })
  }
})
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', () => {})

/**
 * Update
 */
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  () => {}
)
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  () => {}
)
router.delete('/update/:id', () => {})

/**
 * Update Point
 */
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {}
)
router.post('/updatepoint', () => {})
router.delete('/updatepoint/:id', () => {})

export default router
