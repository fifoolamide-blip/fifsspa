import { useState, useMemo } from 'react'
import { useServices } from '../hooks/useApi'
import ServiceCard from '../components/ServiceCard'
import { FaFilter } from 'react-icons/fa'

export default function Services() {
  const { services, loading } = useServices()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('name')

  const categories = ['all', ...new Set(services.map(s => s.category))]

  const filteredServices = useMemo(() => {
    let filtered = services

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory)
    }

    filtered = filtered.filter(s => s.price >= priceRange[0] && s.price <= priceRange[1])

    if (sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [services, selectedCategory, priceRange, sortBy])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white section-padding">
        <div className="container-max">
          <h1 className="text-h1 mb-4">Our Services</h1>
          <p className="text-xl opacity-90">
            Discover our complete range of wellness and relaxation treatments
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-h4 text-primary-800 mb-6 flex items-center gap-2">
                  <FaFilter /> Filters
                </h3>

                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-primary-800 mb-4">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="capitalize text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-primary-800 mb-4">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-bold text-primary-800 mb-4">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-base"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No services found matching your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service, index) => (
                    <div key={service._id} className="slide-up" style={{ animationDelay: `${(index % 4) * 0.1}s` }}>
                      <ServiceCard service={service} />
                    </div>
                  ))}
                </div>
              )}

              {/* Results Count */}
              {!loading && (
                <p className="text-sm text-gray-600 mt-6">
                  Showing {filteredServices.length} of {services.length} services
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
