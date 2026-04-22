// Mock In-Memory Database for Development/Testing
// This provides a simple alternative when MongoDB is not available

const mockData = {
  services: [],
  bookings: [],
  admins: [],
}

let idCounter = {
  services: 1,
  bookings: 1,
  admins: 1,
}

class MockDB {
  static async connect() {
    console.log('✅ Using Mock In-Memory Database (Development Mode)')
    
    // Initialize default admin
    if (mockData.admins.length === 0) {
      mockData.admins.push({
        _id: 'admin-1',
        email: 'admin@olaspa.com',
        passwordHash: '$2a$10$abcdefghijklmnopqrstuvwxyz', // bcrypt hash placeholder
        name: 'Admin',
        role: 'admin',
        permissions: ['manage_bookings', 'manage_services', 'manage_availability', 'view_reports'],
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    
    // Initialize sample services
    if (mockData.services.length === 0) {
      mockData.services.push(
        {
          _id: '1',
          name: 'Swedish Massage',
          category: 'massage',
          description: 'Classic Swedish massage for relaxation',
          duration: 60,
          price: 80,
          image: 'https://via.placeholder.com/400x300?text=Swedish+Massage',
          featured: true,
          active: true,
          createdAt: new Date(),
        },
        {
          _id: '2',
          name: 'Facial Treatment',
          category: 'skincare',
          description: 'Premium facial with organic products',
          duration: 45,
          price: 75,
          image: 'https://via.placeholder.com/400x300?text=Facial+Treatment',
          featured: true,
          active: true,
          createdAt: new Date(),
        }
      )
    }
  }

  static async disconnect() {
    console.log('Mock database disconnected')
  }

  static getData(collection) {
    return mockData[collection] || []
  }

  static async findOne(collection, query) {
    const items = mockData[collection] || []
    return items.find(item => {
      return Object.keys(query).every(key => item[key] === query[key])
    })
  }

  static async findById(collection, id) {
    const items = mockData[collection] || []
    return items.find(item => item._id === id || item._id.toString() === id)
  }

  static async create(collection, data) {
    const items = mockData[collection] || []
    const id = String(idCounter[collection] || 1)
    idCounter[collection] = (idCounter[collection] || 0) + 1
    
    const newItem = {
      _id: id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    items.push(newItem)
    return newItem
  }

  static async update(collection, id, data) {
    const items = mockData[collection] || []
    const item = items.find(i => i._id === id || i._id.toString() === id)
    if (item) {
      Object.assign(item, data, { updatedAt: new Date() })
    }
    return item
  }

  static async delete(collection, id) {
    const items = mockData[collection] || []
    const index = items.findIndex(i => i._id === id || i._id.toString() === id)
    if (index > -1) {
      items.splice(index, 1)
      return true
    }
    return false
  }

  static async findMany(collection, query = {}) {
    const items = mockData[collection] || []
    return items.filter(item => {
      return Object.keys(query).every(key => {
        if (typeof query[key] === 'object' && query[key].$in) {
          return query[key].$in.includes(item[key])
        }
        if (typeof query[key] === 'object' && query[key].$gte) {
          return item[key] >= query[key].$gte
        }
        return item[key] === query[key]
      })
    })
  }
}

export default MockDB
