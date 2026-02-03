// src/sections/BuyCoursesPage.jsx - UPDATED WITH COMPACT DESIGN
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ShoppingCart, Star, Clock, Users, AlertCircle,
  Filter as FilterIcon, Search, Heart, Eye, Shield, Book,
  ChevronRight, Plus, Minus, X, Check, Play, FileText, Globe,
  Calendar, Award, BarChart, Tag, BookOpen
} from 'lucide-react';
import { getCourses, batchEnrollCourses } from '../services/api';

const BuyCoursesPage = ({ setCurrentPage }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCourseDetail, setShowCourseDetail] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All Courses', count: 0 }
  ]);

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      if (data && data.length > 0) {
        setCourses(data);
        setFilteredCourses(data);
        
        // Extract categories
        const categoryCounts = { 'all': data.length };
        data.forEach(course => {
          if (course.category) {
            categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
          }
        });
        
        const categoryList = Object.keys(categoryCounts).map(cat => ({
          id: cat,
          name: cat === 'all' ? 'All Courses' : cat,
          count: categoryCounts[cat]
        }));
        
        setCategories(categoryList);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      // You can add fallback data here
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort courses
  useEffect(() => {
    let result = [...courses];

    if (selectedCategory !== 'all') {
      result = result.filter(course => course.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.instructor?.name?.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled); break;
      default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredCourses(result);
  }, [selectedCategory, searchTerm, sortBy, courses]);

  // Cart functions
  const addToCart = (course) => {
    if (!cartItems.find(item => item.id === course._id)) {
      setCartItems(prev => [...prev, { 
        id: course._id, 
        title: course.title, 
        price: course.price,
        originalPrice: course.originalPrice || course.price,
        instructor: course.instructor?.name,
        thumbnail: course.thumbnail,
        quantity: 1 
      }]);
    }
  };

  const removeFromCart = (courseId) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === courseId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Course detail functions
  const openCourseDetail = (course) => {
    setShowCourseDetail(course);
  };

  const closeCourseDetail = () => {
    setShowCourseDetail(null);
  };

  const CourseCard = ({ course }) => {
    const isInCart = cartItems.some(item => item.id === course._id);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Course Image */}
        <div className="relative h-40 bg-gradient-to-br from-blue-50 to-cyan-50">
          {course.thumbnail ? (
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
          )}
          {course.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {course.discount}% OFF
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 text-sm">{course.title}</h3>
          <p className="text-xs text-gray-600 mb-2">{course.instructor?.name || 'Instructor'}</p>
          
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {course.shortDescription || 'Learn valuable skills'}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="font-medium">{course.rating?.toFixed(1) || '4.5'}</span>
              <span>({course.reviews || '100'})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{(course.studentsEnrolled || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800">{formatPrice(course.price)}</div>
              {course.originalPrice > course.price && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(course.originalPrice)}
                </div>
              )}
            </div>
            
            <div className="flex gap-1">
              {/* View Button - Small and compact */}
              <button
                onClick={() => openCourseDetail(course)}
                className="p-1.5 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors"
                title="View Details"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              
              {/* Add to Cart Button - Small and compact */}
              <button
                onClick={() => addToCart(course)}
                disabled={isInCart}
                className={`p-1.5 rounded transition-colors ${
                  isInCart
                    ? 'bg-green-100 text-green-600 cursor-default'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                title={isInCart ? "Already in Cart" : "Add to Cart"}
              >
                {isInCart ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ShoppingCart className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-gray-600 font-medium">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Compact Cart */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Buy Courses</h1>
            <p className="text-sm text-gray-500">Explore and enroll in premium courses</p>
          </div>
          
          {/* Compact Cart Icon */}
          <div className="relative">
            <button
              onClick={() => setShowCart(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Cart Summary Banner */}
      {cartItems.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 py-2 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart</span>
              <span className="text-blue-900">•</span>
              <span className="font-bold text-blue-900">{formatPrice(calculateTotal())}</span>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              View Cart
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-600 font-medium">No courses found</div>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {showCourseDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Course Details</h2>
              <button
                onClick={closeCourseDetail}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2">
                  {/* Course Image */}
                  <div className="h-48 lg:h-64 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-blue-100 to-cyan-100">
                    {showCourseDetail.thumbnail ? (
                      <img 
                        src={showCourseDetail.thumbnail} 
                        alt={showCourseDetail.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-blue-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Title and Instructor */}
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {showCourseDetail.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    By <span className="font-medium">{showCourseDetail.instructor?.name || 'Expert Instructor'}</span>
                  </p>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {showCourseDetail.description || showCourseDetail.shortDescription || 'No description available.'}
                    </p>
                  </div>
                  
                  {/* What You'll Learn */}
                  {showCourseDetail.features && showCourseDetail.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-3">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {showCourseDetail.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-5 sticky top-4">
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-800">
                          {formatPrice(showCourseDetail.price)}
                        </span>
                        {showCourseDetail.originalPrice > showCourseDetail.price && (
                          <span className="text-lg text-gray-400 line-through">
                            {formatPrice(showCourseDetail.originalPrice)}
                          </span>
                        )}
                      </div>
                      {showCourseDetail.discount > 0 && (
                        <div className="inline-block bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                          {showCourseDetail.discount}% OFF
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          addToCart(showCourseDetail);
                          closeCourseDetail();
                        }}
                        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                          cartItems.some(item => item.id === showCourseDetail._id)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {cartItems.some(item => item.id === showCourseDetail._id) ? (
                          <>
                            <Check className="w-5 h-5" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => {
                          addToCart(showCourseDetail);
                          setShowCart(true);
                          closeCourseDetail();
                        }}
                        className="w-full py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                    
                    {/* Course Details */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Duration: {showCourseDetail.duration || 'Lifetime Access'}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <BarChart className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Level: {showCourseDetail.level || 'All Levels'}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Last Updated: {new Date(showCourseDetail.updatedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Language: {showCourseDetail.language || 'English'}</span>
                      </div>
                    </div>
                    
                    {/* Guarantee Badge */}
                    <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-700">30-Day Money-Back Guarantee</span>
                      </div>
                      <p className="text-xs text-blue-600">
                        Full refund if you're not satisfied with the course quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">Shopping Cart</h3>
                <p className="text-sm text-gray-500">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <div className="text-gray-600 font-medium">Your cart is empty</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        {item.thumbnail && (
                          <div className="w-12 h-10 bg-gray-100 rounded overflow-hidden">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-800 truncate">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.instructor}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="text-right w-20">
                          <div className="font-bold text-blue-600 text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-1"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-800">Total:</div>
                    <div className="text-xl font-bold text-blue-600">{formatPrice(calculateTotal())}</div>
                  </div>
                  
                  <button 
                    onClick={async () => {
                      setCheckoutLoading(true);
                      try {
                        const courseIds = cartItems.map(item => item.id);
                        await batchEnrollCourses(courseIds);
                        alert('Successfully enrolled in courses!');
                        setCartItems([]);
                        setShowCart(false);
                      } catch (error) {
                        alert('Checkout failed: ' + error.message);
                      } finally {
                        setCheckoutLoading(false);
                      }
                    }}
                    disabled={checkoutLoading}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                  
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCoursesPage;