import Service from '../models/Service.js'

export async function getAllServices(req, res, next) {
  try {
    const { category, minPrice, maxPrice, sort } = req.query

    let query = { active: true }

    if (category) {
      query.category = category
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice)
    }

    let services = await Service.find(query)

    if (sort === 'price_asc') {
      services = services.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
      services = services.sort((a, b) => b.price - a.price)
    } else if (sort === 'popular') {
      services = services.sort((a, b) => b.featured - a.featured)
    }

    res.json({ success: true, data: services })
  } catch (error) {
    next(error)
  }
}

export async function getServiceById(req, res, next) {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' })
    }

    res.json({ success: true, data: service })
  } catch (error) {
    next(error)
  }
}

export async function createService(req, res, next) {
  try {
    const { name, category, description, duration, price, image } = req.body

    if (!name || !category || !description || !duration || price === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      })
    }

    const service = new Service(req.body)
    await service.save()

    res.status(201).json({ success: true, data: service })
  } catch (error) {
    next(error)
  }
}

export async function updateService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' })
    }

    res.json({ success: true, data: service })
  } catch (error) {
    next(error)
  }
}

export async function deleteService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    )

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' })
    }

    res.json({ success: true, message: 'Service deleted successfully' })
  } catch (error) {
    next(error)
  }
}
