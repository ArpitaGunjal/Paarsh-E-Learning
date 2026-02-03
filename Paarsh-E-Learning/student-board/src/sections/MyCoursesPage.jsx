// src/sections/MyCoursesPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Book, PlayCircle, Clock, Calendar, Users, Star, 
  ChevronRight, Filter, Search, ChevronDown, ChevronUp,
  MoreVertical, Video, Award, CheckCircle, AlertCircle,
  Plus, BarChart, Target, TrendingUp, FileText, Folder,
  Code, Database, Server, Smartphone, Palette, Zap, Lock,
  ExternalLink, Heart, MessageCircle, HelpCircle, Upload,
  Edit, Trash2, RefreshCw, Minus, X, Check, Eye
} from 'lucide-react';
import { getMyCourses } from '../services/api';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('progress');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'upcoming', label: 'Upcoming' }
  ];

  const sortOptions = [
    { id: 'progress', label: 'Progress' },
    { id: 'alphabetical', label: 'Alphabetical' },
    { id: 'recent', label: 'Recent Activity' },
    { id: 'date', label: 'Start Date' },
    { id: 'rating', label: 'Rating' }
  ];

  // Fetch enrolled courses
  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    setLoading(true);
    try {
      const data = await getMyCourses();
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      setError('Failed to load your courses. Please try again.');
      console.error('Error fetching enrolled courses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort courses
  useEffect(() => {
    let result = [...courses];

    // Filter by status
    if (activeFilter !== 'all') {
      if (activeFilter === 'active') {
        result = result.filter(course => course.progress < 100 && course.progress > 0);
      } else if (activeFilter === 'completed') {
        result = result.filter(course => course.progress === 100);
      } else if (activeFilter === 'upcoming') {
        result = result.filter(course => course.progress === 0);
      }
    }

    // Filter by search
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(term) ||
        (course.category && course.category.toLowerCase().includes(term)) ||
        (course.instructor?.name && course.instructor.name.toLowerCase().includes(term))
      );
    }

    // Sort courses
    switch (sortBy) {
      case 'progress':
        result.sort((a, b) => b.progress - a.progress);
        break;
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
        break;
      case 'date':
        result.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
    }

    setFilteredCourses(result);
  }, [activeFilter, searchQuery, sortBy, courses]);

  // Calculate stats
  const stats = React.useMemo(() => {
    const totalCourses = courses.length;
    const activeCourses = courses.filter(c => c.progress < 100 && c.progress > 0).length;
    const completedCourses = courses.filter(c => c.progress === 100).length;
    const averageProgress = courses.length > 0 
      ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length)
      : 0;
    
    return {
      totalCourses,
      activeCourses,
      completedCourses,
      averageProgress,
      upcomingLiveSessions: 0
    };
  }, [courses]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCourseIcon = (category) => {
    const iconMap = {
      'Development': Code,
      'Web Development': Code,
      'Data Science': BarChart,
      'Mobile Development': Smartphone,
      'Design': Palette,
      'UI/UX Design': Palette,
      'DevOps': Server,
      'Marketing': TrendingUp,
      'Security': Lock,
      'AI': Zap,
      'Database': Database
    };
    return iconMap[category] || Book;
  };

  const getCourseColor = (category) => {
    const colorMap = {
      'Development': 'from-[#14BDEE] to-[#60A5FA]',
      'Web Development': 'from-[#14BDEE] to-[#60A5FA]',
      'Data Science': 'from-[#5BD1D7] to-[#14BDEE]',
      'Mobile Development': 'from-[#5BD1D7] to-[#60A5FA]',
      'Design': 'from-[#60A5FA] to-[#5BD1D7]',
      'UI/UX Design': 'from-[#60A5FA] to-[#5BD1D7]',
      'DevOps': 'from-[#14BDEE] to-[#5BD1D7]',
      'Marketing': 'from-[#FFA726] to-[#FF9800]',
      'Security': 'from-[#F44336] to-[#E53935]',
      'AI': 'from-[#9C27B0] to-[#673AB7]',
      'Database': 'from-[#60A5FA] to-[#14BDEE]'
    };
    return colorMap[category] || 'from-[#14BDEE] to-[#60A5FA]';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-[#14BDEE] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-[#384158] font-medium">Loading your courses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-red-600 font-medium mb-2">{error}</div>
          <button 
            onClick={fetchMyCourses}
            className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">My Courses</h1>
          <p className="text-[#76777A]">Manage and track all your enrolled courses</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard?section=buy-courses'}
          className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Enroll New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#384158]">{stats.totalCourses}</div>
          <div className="text-sm text-[#76777A]">Total Courses</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#5BD1D7]">{stats.activeCourses}</div>
          <div className="text-sm text-[#76777A]">Active</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#60A5FA]">{stats.completedCourses}</div>
          <div className="text-sm text-[#76777A]">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#14BDEE]">{stats.averageProgress}%</div>
          <div className="text-sm text-[#76777A]">Avg Progress</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#5BD1D7]">92%</div>
          <div className="text-sm text-[#76777A]">Avg Grade</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#60A5FA]">{stats.upcomingLiveSessions}</div>
          <div className="text-sm text-[#76777A]">Live Sessions</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE]"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] appearance-none"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A] pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[#14BDEE] text-white'
                    : 'bg-[#EFF6FF] text-[#76777A] hover:bg-[#ECFEFF]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map(course => {
          const isExpanded = expandedCourse === course.enrollmentId;
          const Icon = getCourseIcon(course.category);
          const colorClass = getCourseColor(course.category);
          
          return (
            <div key={course.enrollmentId || course._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Course Header */}
              <div className={`bg-gradient-to-r ${colorClass} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.progress === 100 
                          ? 'bg-green-500 text-white' 
                          : course.progress > 0
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                      </span>
                      <h3 className="text-xl font-bold mt-2 text-white">{course.title}</h3>
                      <p className="text-sm opacity-90 text-white/90">
                        {course.category} • Enrolled: {course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setExpandedCourse(isExpanded ? null : course.enrollmentId)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2 text-white/90">
                    <span>Progress</span>
                    <span className="font-semibold">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Course Body */}
              <div className="p-6">
                <p className="text-[#76777A] mb-4">
                  {course.shortDescription || course.description || 'No description available'}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#384158]">{course.level || 'N/A'}</div>
                    <div className="text-xs text-[#76777A]">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#384158]">{course.duration || 'N/A'}</div>
                    <div className="text-xs text-[#76777A]">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#384158]">
                      {course.studentsEnrolled ? course.studentsEnrolled.toLocaleString() : '0'}
                    </div>
                    <div className="text-xs text-[#76777A]">Enrolled</div>
                  </div>
                </div>

                {/* Instructor & Rating */}
                <div className="flex items-center justify-between mb-4 p-3 bg-[#EFF6FF] rounded-lg">
                  <div>
                    <div className="text-sm text-[#76777A]">Instructor</div>
                    <div className="font-medium text-[#384158]">
                      {course.instructor?.name || 'Unknown Instructor'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-[#384158]">{course.rating?.toFixed(1) || '0.0'}</span>
                    <span className="text-[#76777A] text-sm">
                      ({course.reviews || 0})
                    </span>
                  </div>
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-[#76777A]">Enrolled On</div>
                    <div className="font-medium text-[#384158]">
                      {course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#76777A]">Price Paid</div>
                    <div className="font-medium text-[#384158]">
                      {formatPrice(course.price || 0)}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                    {/* Course Features */}
                    {course.features && course.features.length > 0 && (
                      <div>
                        <h4 className="font-medium text-[#384158] mb-2">Course Includes</h4>
                        <div className="flex flex-wrap gap-2">
                          {course.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-[#EFF6FF] text-[#14BDEE] text-sm rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Completion Status */}
                    {course.progress === 100 && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-green-600" />
                          <div className="text-sm font-medium text-green-800">Course Completed</div>
                        </div>
                        <div className="text-lg font-bold text-green-700">Congratulations!</div>
                        <div className="text-sm text-green-600">You have successfully completed this course.</div>
                      </div>
                    )}

                    {/* Course Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] text-sm">
                        View Certificate
                      </button>
                      <button className="px-4 py-2 border border-[#14BDEE] text-[#14BDEE] rounded-lg hover:bg-[#EFF6FF] text-sm">
                        Course Materials
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button 
                    className="flex-1 px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center justify-center gap-2 transition-colors"
                    onClick={() => alert(`Redirect to learning interface for ${course.title}`)}
                  >
                    <PlayCircle className="w-4 h-4" />
                    {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </button>
                  <button className="p-2 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && courses.length === 0 ? (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#384158] mb-2">No courses enrolled yet</h3>
          <p className="text-[#76777A] mb-4">Start your learning journey by enrolling in courses</p>
          <button 
            onClick={() => window.location.href = '/dashboard?section=buy-courses'}
            className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors"
          >
            Browse Courses
          </button>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#384158] mb-2">No courses found</h3>
          <p className="text-[#76777A] mb-4">Try changing your filters or search term</p>
          <button 
            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
            className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : null}

      {/* Recent Activity */}
      {courses.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
            <h3 className="font-semibold text-[#384158]">Recent Activity</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {filteredCourses.slice(0, 3).map(course => (
                <div key={course._id} className="flex items-center justify-between p-3 hover:bg-[#EFF6FF] rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getCourseColor(course.category)} rounded-lg flex items-center justify-center`}>
                      <PlayCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-[#384158]">{course.title}</div>
                      <div className="text-sm text-[#76777A]">Last accessed: {course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : 'N/A'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-[#384158]">{course.progress || 0}%</div>
                    <div className="text-sm text-[#76777A]">Progress</div>
                  </div>
                  <button className="px-3 py-1 bg-[#14BDEE] text-white text-sm rounded hover:bg-[#0DAAD8] transition-colors">
                    Resume
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;