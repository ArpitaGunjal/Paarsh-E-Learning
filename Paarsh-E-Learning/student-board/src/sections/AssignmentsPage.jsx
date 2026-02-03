import React, { useState } from 'react';
import {
  Clipboard,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Filter,
  Search,
  Download,
  Upload,
  Edit,
  Eye,
  Share2,
  ChevronRight,
  ChevronDown,
  Star,
  Users,
  MessageCircle,
  Video,
  Book,
  Folder,
  X,
  Code,
  MoreVertical,
  List as ListIcon,
  Grid as GridIcon
} from 'lucide-react';

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState('todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [expandedView, setExpandedView] = useState('list');

  const tabs = [
    { id: 'todo', label: 'To Do', count: 5 },
    { id: 'in-progress', label: 'In Progress', count: 3 },
    { id: 'review', label: 'Under Review', count: 2 },
    { id: 'completed', label: 'Completed', count: 10 }
  ];

  const courses = [
    { id: 'all', label: 'All Courses' },
    { id: 'fs101', label: 'Full Stack Development' },
    { id: 'ar201', label: 'Advanced React' },
    { id: 'db601', label: 'Database Design' }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Custom Hook Implementation',
      course: 'Advanced React',
      courseCode: 'AR201',
      dueDate: 'Today, 5:00 PM',
      priority: 'high',
      status: 'todo',
      progress: 0,
      estimatedTime: '2 hours',
      type: 'coding',
      attachments: 3,
      description: 'Create custom hooks for form validation and API calls',
      requirements: [
        'Implement useForm hook with validation',
        'Create useFetch hook with error handling',
        'Write unit tests for both hooks',
        'Document usage examples'
      ],
      points: 100,
      rubric: {
        'Code Quality': 30,
        'Functionality': 40,
        'Testing': 20,
        'Documentation': 10
      }
    },
    {
      id: 2,
      title: 'E-commerce Dashboard',
      course: 'Full Stack Development',
      courseCode: 'FS101',
      dueDate: 'in 2 days',
      priority: 'high',
      status: 'todo',
      progress: 0,
      estimatedTime: '8 hours',
      type: 'project',
      attachments: 5,
      description: 'Build a full-featured e-commerce admin dashboard',
      requirements: [
        'Product management CRUD',
        'Order tracking system',
        'Sales analytics charts',
        'User management'
      ],
      points: 200,
      rubric: {
        'UI/UX': 30,
        'Functionality': 40,
        'Code Structure': 20,
        'Deployment': 10
      }
    },
    {
      id: 3,
      title: 'Redux Store Implementation',
      course: 'Advanced React',
      courseCode: 'AR201',
      dueDate: 'in 3 days',
      priority: 'medium',
      status: 'in-progress',
      progress: 60,
      estimatedTime: '4 hours',
      type: 'coding',
      attachments: 2,
      description: 'Implement Redux store with slices and middleware',
      requirements: [
        'Create auth slice',
        'Implement products slice',
        'Add Redux Toolkit',
        'Configure middleware'
      ],
      points: 150,
      rubric: {
        'Store Structure': 40,
        'Middleware': 30,
        'Testing': 20,
        'Documentation': 10
      }
    },
    {
      id: 4,
      title: 'API Integration Project',
      course: 'Full Stack Development',
      courseCode: 'FS101',
      dueDate: 'Submitted',
      priority: 'low',
      status: 'review',
      progress: 100,
      estimatedTime: '6 hours',
      type: 'project',
      attachments: 4,
      submitted: '2 days ago',
      grade: 'Pending',
      feedback: 'Under review by mentor',
      description: 'Integrate third-party APIs with error handling',
      requirements: [
        'Weather API integration',
        'Payment gateway',
        'Social media auth',
        'Error handling'
      ],
      points: 180
    },
    {
      id: 5,
      title: 'React Fundamentals Quiz',
      course: 'Advanced React',
      courseCode: 'AR201',
      dueDate: 'Jan 15, 2024',
      priority: 'low',
      status: 'completed',
      progress: 100,
      estimatedTime: '1 hour',
      type: 'quiz',
      attachments: 1,
      submitted: '1 week ago',
      grade: '92/100',
      feedback: 'Excellent understanding of React concepts',
      description: 'Multiple choice quiz on React fundamentals',
      points: 100
    }
  ];

  const peerReviews = [
    {
      id: 1,
      assignment: 'Portfolio Website',
      student: 'Aarav Patel',
      due: 'in 2 days',
      status: 'pending'
    },
    {
      id: 2,
      assignment: 'Todo App',
      student: 'Sneha Reddy',
      due: 'in 3 days',
      status: 'pending'
    }
  ];

  const ProgressBar = ({ value, className = '' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${className}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const AssignmentCard = ({ assignment, view = 'card' }) => {
    const isCardView = view === 'card';
    
    const priorityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'High' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: 'Medium' },
      low: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', label: 'Low' }
    };

    const typeConfig = {
      coding: { icon: Code, color: 'text-[#14BDEE]', bg: 'bg-[#ECFEFF]', border: 'border-[#5BD1D7]' },
      project: { icon: Folder, color: 'text-[#60A5FA]', bg: 'bg-[#EFF6FF]', border: 'border-[#60A5FA]' },
      quiz: { icon: FileText, color: 'text-[#5BD1D7]', bg: 'bg-[#ECFEFF]', border: 'border-[#5BD1D7]' },
      essay: { icon: Edit, color: 'text-[#14BDEE]', bg: 'bg-[#ECFEFF]', border: 'border-[#14BDEE]' }
    };

    const statusConfig = {
      todo: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', label: 'To Do' },
      'in-progress': { bg: 'bg-[#ECFEFF]', text: 'text-[#14BDEE]', border: 'border-[#5BD1D7]', label: 'In Progress' },
      review: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: 'Under Review' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', label: 'Completed' }
    };

    const priority = priorityConfig[assignment.priority];
    const type = typeConfig[assignment.type];
    const status = statusConfig[assignment.status];
    const TypeIcon = type.icon;

    if (isCardView) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 ${type.bg} border ${type.border} rounded-lg`}>
                    <TypeIcon className={`w-4 h-4 ${type.color}`} />
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${priority.bg} ${priority.text} border ${priority.border}`}>
                    {priority.label}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text} border ${status.border}`}>
                    {status.label}
                  </span>
                </div>
                <h3 className="font-bold text-[#384158]">{assignment.title}</h3>
                <p className="text-sm text-[#76777A]">{assignment.course} • {assignment.courseCode}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#76777A]">Due</div>
                <div className={`font-semibold ${assignment.priority === 'high' ? 'text-red-600' : 'text-[#384158]'}`}>
                  {assignment.dueDate}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-[#76777A] mb-4">{assignment.description}</p>
            
            {assignment.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#384158]">Progress</span>
                  <span className="font-medium">{assignment.progress}%</span>
                </div>
                <ProgressBar 
                  value={assignment.progress} 
                  className={assignment.status === 'completed' ? 'bg-green-600' : 'bg-[#14BDEE]'} 
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#76777A]" />
                <div>
                  <div className="text-[#76777A]">Estimated</div>
                  <div className="font-medium text-[#384158]">{assignment.estimatedTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-[#76777A]" />
                <div>
                  <div className="text-[#76777A]">Points</div>
                  <div className="font-medium text-[#384158]">{assignment.points}</div>
                </div>
              </div>
            </div>

            {assignment.requirements && (
              <div className="mb-4">
                <div className="text-sm font-medium text-[#384158] mb-2">Requirements:</div>
                <ul className="space-y-1">
                  {assignment.requirements.slice(0, 2).map((req, idx) => (
                    <li key={idx} className="text-sm text-[#76777A] flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#5BD1D7] flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                  {assignment.requirements.length > 2 && (
                    <li className="text-sm text-[#14BDEE]">
                      +{assignment.requirements.length - 2} more requirements
                    </li>
                  )}
                </ul>
              </div>
            )}

            {assignment.feedback && (
              <div className="p-3 bg-[#ECFEFF] rounded-lg border border-[#5BD1D7] mb-4">
                <div className="text-sm font-medium text-[#384158] mb-1">Feedback</div>
                <div className="text-sm text-[#76777A]">{assignment.feedback}</div>
                {assignment.grade && (
                  <div className="mt-2 text-lg font-bold text-[#14BDEE]">{assignment.grade}</div>
                )}
              </div>
            )}

            <div className="flex gap-2">
              {assignment.status === 'todo' && (
                <button className="flex-1 px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors">
                  Start Assignment
                </button>
              )}
              {assignment.status === 'in-progress' && (
                <button className="flex-1 px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors">
                  Continue ({(assignment.progress || 0)}%)
                </button>
              )}
              {assignment.status === 'review' && (
                <button className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  View Submission
                </button>
              )}
              {assignment.status === 'completed' && (
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  View Grade
                </button>
              )}
              <button 
                onClick={() => setSelectedAssignment(assignment)}
                className="px-4 py-2 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-[#EFF6FF] transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2 ${type.bg} border ${type.border} rounded-lg`}>
              <TypeIcon className={`w-4 h-4 ${type.color}`} />
            </div>
            <div>
              <div className="font-medium text-[#384158]">{assignment.title}</div>
              <div className="text-sm text-[#76777A]">{assignment.course} • Due {assignment.dueDate}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium text-[#384158]">{assignment.points} points</div>
              <div className="text-sm text-[#76777A]">{assignment.estimatedTime}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${priority.bg} ${priority.text} border ${priority.border}`}>
                {priority.label}
              </span>
              {assignment.status === 'in-progress' && assignment.progress > 0 && (
                <div className="w-24">
                  <ProgressBar value={assignment.progress} className="bg-[#14BDEE]" />
                </div>
              )}
              <button 
                onClick={() => setSelectedAssignment(assignment)}
                className="p-2 hover:bg-[#ECFEFF] rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-[#76777A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AssignmentDetails = ({ assignment, onClose }) => {
    const [activeDetailTab, setActiveDetailTab] = useState('details');
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#384158]">{assignment.title}</h3>
                <p className="text-[#76777A]">{assignment.course} • {assignment.courseCode}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#ECFEFF] rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-[#76777A]" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-[#ECFEFF] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#76777A]" />
                </button>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
              <div className="flex overflow-x-auto">
                {['details', 'requirements', 'submission', 'grades'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveDetailTab(tab)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      activeDetailTab === tab
                        ? 'text-[#14BDEE] border-b-2 border-[#14BDEE]'
                        : 'text-[#76777A] hover:text-[#384158]'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {activeDetailTab === 'details' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-[#76777A]">Due Date</div>
                        <div className="font-medium text-[#384158]">{assignment.dueDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#76777A]">Estimated Time</div>
                        <div className="font-medium text-[#384158]">{assignment.estimatedTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#76777A]">Points</div>
                        <div className="font-medium text-[#384158]">{assignment.points}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-[#76777A]">Status</div>
                        <div className="font-medium text-[#384158]">{assignment.status}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#76777A]">Type</div>
                        <div className="font-medium text-[#384158]">{assignment.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#76777A]">Priority</div>
                        <div className="font-medium text-[#384158]">{assignment.priority}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#384158] mb-2">Description</h4>
                    <p className="text-[#76777A]">{assignment.description}</p>
                  </div>

                  {assignment.rubric && (
                    <div>
                      <h4 className="font-medium text-[#384158] mb-2">Grading Rubric</h4>
                      <div className="space-y-2">
                        {Object.entries(assignment.rubric).map(([criteria, points]) => (
                          <div key={criteria} className="flex items-center justify-between p-2 bg-[#EFF6FF] rounded">
                            <span className="text-[#384158]">{criteria}</span>
                            <span className="font-medium text-[#14BDEE]">{points} points</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeDetailTab === 'requirements' && (
                <div>
                  <h4 className="font-medium text-[#384158] mb-4">Requirements</h4>
                  <ul className="space-y-3">
                    {assignment.requirements?.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-[#EFF6FF] rounded-lg">
                        <div className="w-6 h-6 bg-[#ECFEFF] text-[#14BDEE] rounded-full flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-[#384158]">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeDetailTab === 'submission' && (
                <div>
                  <h4 className="font-medium text-[#384158] mb-4">Submit Assignment</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="font-medium text-[#384158] mb-2">Drag & drop files here</div>
                    <div className="text-sm text-[#76777A] mb-4">or click to browse</div>
                    <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors">
                      Browse Files
                    </button>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-[#384158] mb-2">
                      Additional Notes
                    </label>
                    <textarea 
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14BDEE]"
                      placeholder="Add any notes for your mentor..."
                    />
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button className="px-4 py-2 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                      Save Draft
                    </button>
                    <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] transition-colors">
                      Submit Assignment
                    </button>
                  </div>
                </div>
              )}

              {activeDetailTab === 'grades' && assignment.grade && (
                <div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#ECFEFF] to-[#EFF6FF] rounded-lg border border-[#5BD1D7] mb-6">
                    <div className="text-4xl font-bold text-[#14BDEE]">{assignment.grade}</div>
                    <div className="text-lg text-[#5BD1D7]">Grade</div>
                    <div className="text-sm text-[#60A5FA] mt-2">Submitted on {assignment.submitted}</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-[#384158] mb-4">Feedback</h4>
                    <div className="p-4 bg-[#ECFEFF] rounded-lg border border-[#5BD1D7]">
                      <p className="text-[#384158]">{assignment.feedback}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab !== 'all' && assignment.status !== activeTab) return false;
    if (selectedCourse !== 'all' && assignment.courseCode !== selectedCourse) return false;
    if (searchQuery && !assignment.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Assignments</h1>
          <p className="text-[#76777A]">Track and manage all your assignments</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DAAD8] flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Submit Assignment
          </button>
          <button className="p-2 border border-gray-300 text-[#76777A] rounded-lg hover:bg-[#EFF6FF] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#384158]">
            {assignments.filter(a => a.status === 'todo').length}
          </div>
          <div className="text-sm text-[#76777A]">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#14BDEE]">
            {assignments.filter(a => a.status === 'in-progress').length}
          </div>
          <div className="text-sm text-[#76777A]">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#60A5FA]">
            {assignments.filter(a => a.status === 'review').length}
          </div>
          <div className="text-sm text-[#76777A]">Under Review</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-[#5BD1D7]">
            {assignments.filter(a => a.status === 'completed').length}
          </div>
          <div className="text-sm text-[#76777A]">Completed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-[#14BDEE] border-b-2 border-[#14BDEE]'
                        : 'text-[#76777A] hover:text-[#384158]'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-[#ECFEFF] text-[#14BDEE]'
                        : 'bg-[#EFF6FF] text-[#76777A]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex bg-[#EFF6FF] rounded-lg p-1">
                  <button
                    onClick={() => setExpandedView('list')}
                    className={`p-2 rounded transition-colors ${expandedView === 'list' ? 'bg-white shadow' : 'hover:bg-[#ECFEFF]'}`}
                  >
                    <ListIcon className={`w-4 h-4 ${expandedView === 'list' ? 'text-[#14BDEE]' : 'text-[#76777A]'}`} />
                  </button>
                  <button
                    onClick={() => setExpandedView('card')}
                    className={`p-2 rounded transition-colors ${expandedView === 'card' ? 'bg-white shadow' : 'hover:bg-[#ECFEFF]'}`}
                  >
                    <GridIcon className={`w-4 h-4 ${expandedView === 'card' ? 'text-[#14BDEE]' : 'text-[#76777A]'}`} />
                  </button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
                  <input
                    type="text"
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto">
              {courses.map(course => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                    selectedCourse === course.id
                      ? 'bg-[#14BDEE] text-white'
                      : 'bg-[#EFF6FF] text-[#76777A] hover:bg-[#ECFEFF]'
                  }`}
                >
                  {course.label}
                </button>
              ))}
            </div>
          </div>

          {expandedView === 'card' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} view="card" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} view="list" />
              ))}
            </div>
          )}

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <Clipboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#384158] mb-2">No assignments found</h3>
              <p className="text-[#76777A]">Try changing your filters or search term</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Peer Reviews</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {peerReviews.map(review => (
                  <div key={review.id} className="p-3 bg-[#EFF6FF] rounded-lg">
                    <div className="font-medium text-[#384158]">{review.assignment}</div>
                    <div className="text-sm text-[#76777A]">Review for {review.student}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-[#76777A]">Due {review.due}</span>
                      <button className="px-3 py-1 bg-[#14BDEE] text-white text-xs rounded hover:bg-[#0DAAD8] transition-colors">
                        Start Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-[#14BDEE] hover:text-[#0DAAD8] border-t border-gray-200 pt-4 transition-colors">
                View All Peer Reviews
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Upcoming Deadlines</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {assignments
                  .filter(a => a.status === 'todo' || a.status === 'in-progress')
                  .sort((a, b) => {
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                  })
                  .slice(0, 3)
                  .map(assignment => (
                    <div key={assignment.id} className="p-3 border border-gray-200 rounded-lg hover:bg-[#EFF6FF] transition-colors">
                      <div className="font-medium text-[#384158]">{assignment.title}</div>
                      <div className="text-sm text-[#76777A]">{assignment.course}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs font-medium ${
                          assignment.priority === 'high' ? 'text-red-600' : 'text-[#76777A]'
                        }`}>
                          Due {assignment.dueDate}
                        </span>
                        <span className="text-xs bg-[#EFF6FF] text-[#14BDEE] px-2 py-1 rounded">
                          {assignment.estimatedTime}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-[#EFF6FF]">
              <h3 className="font-semibold text-[#384158]">Grade Distribution</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#384158]">Current Average</span>
                    <span className="font-bold text-[#14BDEE]">87.4%</span>
                  </div>
                  <ProgressBar value={87.4} className="bg-[#14BDEE]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#384158]">Assignments Completed</span>
                    <span className="font-bold text-[#5BD1D7]">10/15</span>
                  </div>
                  <ProgressBar value={(10/15)*100} className="bg-[#5BD1D7]" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#384158]">A-</div>
                  <div className="text-sm text-[#76777A]">Current Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedAssignment && (
        <AssignmentDetails 
          assignment={selectedAssignment} 
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
};

export default AssignmentsPage;