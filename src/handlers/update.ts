import prisma from '../db'

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {  
      updates: true
    }
  })

  // this is not the best practice,
  // because we will loop (maybe thousands of data) in memory
  // on every request
  // so, maybe we have to update the schema to find the right pattern
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  res.json({ data: updates })
}

export const getOneUpdate = async (req, res) => {
  const id = req.params.id

  const update = await prisma.update.findFirst({
    where: {
      id,
      productId: req.productId
    }
  })

  res.json({ data: update })
}

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id
    }
  })

  if (!product) {
    // does not belong to user
    return res.json({ message: 'Product not found' })
  }

  const update = await prisma.update.create({
    data: req.body
  })

  res.json({ data: update })
}

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])
  
  const match = updates.find(update => update.id === req.params.id)

  if (!match) {
    return res.json({ message: 'Update not found' })
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({ data: updatedUpdate })
}

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])
  
  const match = updates.find(update => update.id === req.params.id)

  if (!match) {
    return res.json({ message: 'Update not found' })
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({ data: deletedUpdate })
}
