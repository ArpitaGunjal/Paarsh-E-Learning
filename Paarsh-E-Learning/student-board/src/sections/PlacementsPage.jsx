import React, { useState } from 'react';
import {
  Briefcase, Building, MapPin, Calendar, DollarSign, CheckCircle, 
  Users, TrendingUp, Target, Award, Trophy, Star, Clock, Filter,
  Search, Plus, ChevronRight, ChevronDown, Download, ExternalLink,
  Mail, Phone, Linkedin, MessageCircle, Video, FileText, Eye,
  Share2, Bookmark, ThumbsUp, Award as AwardIcon, Trophy as TrophyIcon,
  Star as StarIcon, Users as UsersIcon, Target as TargetIcon,
  Building as BuildingIcon, MapPin as MapPinIcon, Calendar as CalendarIcon,
  CheckCircle as CheckCircleIcon, TrendingUp as TrendingUpIcon,
  Download as DownloadIcon, ExternalLink as ExternalLinkIcon,
  Mail as MailIcon, Phone as PhoneIcon, Video as VideoIcon,
  MessageCircle as MessageCircleIcon, FileText as FileTextIcon
} from 'lucide-react';

const PlacementsPage = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const tabs = [
    { id: 'opportunities', label: 'Job Opportunities', count: 15 },
    { id: 'applications', label: 'My Applications', count: 3 },
    { id: 'interviews', label: 'Interviews', count: 2 },
    { id: 'offers', label: 'Offers', count: 1 },
    { id: 'companies', label: 'Companies', count: 50 },
    { id: 'preparation', label: 'Preparation' }
  ];

  const jobOpportunities = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹10-15 LPA',
      experience: '1-3 years',
      posted: '2 days ago',
      skills: ['React', 'JavaScript', 'CSS', 'Redux'],
      status: 'active',
      description: 'Looking for a passionate Frontend Developer to join our team and build amazing user experiences.',
      deadline: 'Feb 15, 2024'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹12-18 LPA',
      experience: '2-4 years',
      posted: '1 week ago',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      status: 'active',
      description: 'Join our dynamic team as a Full Stack Developer and work on cutting-edge projects.',
      deadline: 'Feb 20, 2024'
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'DigitalCraft',
      location: 'Hyderabad, India',
      type: 'Full-time',
      salary: '₹8-12 LPA',
      experience: '0-2 years',
      posted: '3 days ago',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      status: 'active',
      description: 'Exciting opportunity for a React Developer to work on enterprise-level applications.',
      deadline: 'Feb 18, 2024'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'DesignHub',
      location: 'Mumbai, India',
      type: 'Contract',
      salary: '₹6-10 LPA',
      experience: '1-3 years',
      posted: '5 days ago',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
      status: 'active',
      description: 'Join our design team to create beautiful and functional user interfaces.',
      deadline: 'Feb 25, 2024'
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'DataSystems',
      location: 'Pune, India',
      type: 'Full-time',
      salary: '₹15-20 LPA',
      experience: '3-5 years',
      posted: '1 day ago',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Microservices'],
      status: 'active',
      description: 'Looking for experienced Backend Developer to build scalable systems.',
      deadline: 'Feb 28, 2024'
    }
  ];

  const myApplications = [
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      company: 'TechCorp Solutions',
      appliedDate: 'Jan 20, 2024',
      status: 'Under Review',
      nextStep: 'Technical Assessment',
      timeline: 'Assessment due in 3 days'
    },
    {
      id: 2,
      jobTitle: 'React Developer',
      company: 'DigitalCraft',
      appliedDate: 'Jan 18, 2024',
      status: 'Interview Scheduled',
      nextStep: 'Technical Interview',
      timeline: 'Interview on Feb 5, 2024'
    },
    {
      id: 3,
      jobTitle: 'UI/UX Designer',
      company: 'DesignHub',
      appliedDate: 'Jan 15, 2024',
      status: 'Offer Received',
      nextStep: 'Documentation',
      timeline: 'Offer valid until Feb 10, 2024'
    }
  ];

  const interviews = [
    {
      id: 1,
      company: 'DigitalCraft',
      role: 'React Developer',
      type: 'Technical Interview',
      date: 'Feb 5, 2024',
      time: '10:00 AM - 11:00 AM',
      mode: 'Video Call',
      interviewer: 'Rahul Sharma (Tech Lead)',
      status: 'scheduled',
      preparation: 'Review React concepts, system design'
    },
    {
      id: 2,
      company: 'TechCorp Solutions',
      role: 'Frontend Developer',
      type: 'HR Interview',
      date: 'Feb 8, 2024',
      time: '2:00 PM - 3:00 PM',
      mode: 'Phone Call',
      interviewer: 'Priya Patel (HR Manager)',
      status: 'scheduled',
      preparation: 'Prepare behavioral questions'
    }
  ];

  const offers = [
    {
      id: 1,
      company: 'DesignHub',
      role: 'UI/UX Designer',
      salary: '₹9,00,000',
      joiningDate: 'Mar 1, 2024',
      status: 'accepted',
      benefits: ['Health Insurance', 'WFH Options', 'Learning Budget']
    }
  ];

  const topCompanies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      openings: 12,
      rating: 4.5,
      logo: 'TC'
    },
    {
      id: 2,
      name: 'InnovateTech',
      industry: 'SaaS',
      openings: 8,
      rating: 4.7,
      logo: 'IT'
    },
    {
      id: 3,
      name: 'DigitalCraft',
      industry: 'Digital Agency',
      openings: 6,
      rating: 4.3,
      logo: 'DC'
    },
    {
      id: 4,
      name: 'DataSystems',
      industry: 'Data & Analytics',
      openings: 10,
      rating: 4.6,
      logo: 'DS'
    }
  ];

  const placementStats = [
    { label: 'Placement Rate', value: '92%', icon: TrendingUp, color: 'text-[#14BDEE]', bg: 'bg-[#ECFEFF]' },
    { label: 'Average Salary', value: '₹12 LPA', icon: DollarSign, color: 'text-[#5BD1D7]', bg: 'bg-[#ECFEFF]' },
    { label: 'Companies Visited', value: '50+', icon: Building, color: 'text-[#14BDEE]', bg: 'bg-[#ECFEFF]' },
    { label: 'Students Placed', value: '240+', icon: Users, color: 'text-[#5BD1D7]', bg: 'bg-[#ECFEFF]' }
  ];

  const preparationResources = [
    { title: 'Resume Building Workshop', type: 'Workshop', date: 'Feb 10, 2024', status: 'upcoming' },
    { title: 'Technical Interview Prep', type: 'Course', duration: '10 hours', status: 'available' },
    { title: 'Mock Interview Slots', type: 'Session', slots: '15 available', status: 'available' },
    { title: 'Company Research Guide', type: 'Resource', pages: '45 pages', status: 'available' }
  ];

  const StatusBadge = ({ status }) => {
    const config = {
      active: { bg: 'bg-[#ECFEFF]', text: 'text-[#14BDEE]', label: 'Active' },
      'under review': { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Under Review' },
      'interview scheduled': { bg: 'bg-[#EFF6FF]', text: 'text-[#14BDEE]', label: 'Interview Scheduled' },
      'offer received': { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Offer Received' },
      accepted: { bg: 'bg-[#ECFEFF]', text: 'text-[#5BD1D7]', label: 'Accepted' },
      scheduled: { bg: 'bg-[#EFF6FF]', text: 'text-[#14BDEE]', label: 'Scheduled' }
    };
    const { bg, text, label } = config[status.toLowerCase()] || config.active;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const SkillTag = ({ skill }) => (
    <span className="px-2 py-1 bg-[#EFF6FF] text-[#384158] text-xs rounded">
      {skill}
    </span>
  );

  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow hover:border-[#14BDEE]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={job.status} />
            <span className="text-sm text-[#76777A]">{job.posted}</span>
          </div>
          <h3 className="text-lg font-bold text-[#384158] mb-1">{job.title}</h3>
          <div className="flex items-center gap-3 text-sm text-[#76777A] mb-3">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {job.company}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.type}
            </div>
          </div>
          <p className="text-sm text-[#76777A] mb-4">{job.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map((skill, idx) => (
              <SkillTag key={idx} skill={skill} />
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="font-bold text-[#384158]">{job.salary}</div>
              <div className="text-sm text-[#76777A]">Exp: {job.experience}</div>
              <div className="text-sm text-[#76777A]">Apply by: {job.deadline}</div>
            </div>
            <button 
              onClick={() => {
                setSelectedJob(job);
                setShowApplicationForm(true);
              }}
              className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ApplicationCard = ({ application }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#14BDEE] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={application.status} />
            <span className="text-sm text-[#76777A]">Applied: {application.appliedDate}</span>
          </div>
          <h4 className="font-bold text-[#384158] text-lg">{application.jobTitle}</h4>
          <div className="text-sm text-[#76777A] mb-3">{application.company}</div>
          <div className="text-sm text-[#384158] mb-2">
            <span className="font-medium">Next Step:</span> {application.nextStep}
          </div>
          <div className="text-sm text-[#14BDEE]">{application.timeline}</div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
            View Details
          </button>
          {application.status === 'Interview Scheduled' && (
            <button className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
              Join Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const InterviewCard = ({ interview }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#14BDEE] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={interview.status} />
            <span className="text-sm font-medium text-[#384158]">{interview.type}</span>
          </div>
          <h4 className="font-bold text-[#384158] text-lg">{interview.role}</h4>
          <div className="text-sm text-[#76777A] mb-3">{interview.company}</div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-xs text-[#76777A]">Date & Time</div>
              <div className="text-sm font-medium text-[#384158]">
                {interview.date}, {interview.time}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#76777A]">Mode</div>
              <div className="text-sm font-medium text-[#384158]">{interview.mode}</div>
            </div>
            <div>
              <div className="text-xs text-[#76777A]">Interviewer</div>
              <div className="text-sm font-medium text-[#384158]">{interview.interviewer}</div>
            </div>
            <div>
              <div className="text-xs text-[#76777A]">Preparation</div>
              <div className="text-sm font-medium text-[#384158]">{interview.preparation}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
              Join Interview
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const filteredJobs = jobOpportunities.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6 bg-[#EFF6FF] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#384158]">Placements</h1>
          <p className="text-[#76777A]">Job opportunities, interviews, and placement support</p>
        </div>
        <button className="px-4 py-2 bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Upload Resume
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {placementStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-[#ECFEFF]">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${stat.bg} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#384158]">{stat.value}</div>
                  <div className="text-sm text-[#76777A]">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-[#14BDEE] border-b-2 border-[#14BDEE]'
                    : 'text-[#76777A] hover:text-[#384158]'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-[#ECFEFF] text-[#14BDEE]'
                      : 'bg-[#EFF6FF] text-[#76777A]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#76777A]" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#14BDEE] focus:border-transparent"
                />
              </div>
              <button className="px-3 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Jobs
              </button>
              <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Profile
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#384158]">Latest Job Opportunities</h3>
                <div className="text-sm text-[#76777A]">
                  Showing {filteredJobs.length} of {jobOpportunities.length} jobs
                </div>
              </div>
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">My Applications</h3>
              <div className="space-y-4">
                {myApplications.map(application => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#384158]">Upcoming Interviews</h3>
                <button className="px-3 py-1 text-sm bg-[#5BD1D7] text-white rounded-lg hover:bg-[#4ABCC2] transition-colors">
                  Schedule Mock Interview
                </button>
              </div>
              <div className="space-y-4">
                {interviews.map(interview => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">Job Offers</h3>
              <div className="space-y-4">
                {offers.map(offer => (
                  <div key={offer.id} className="bg-gradient-to-r from-[#ECFEFF] to-[#EFF6FF] border border-[#5BD1D7] rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-5 h-5 text-[#5BD1D7]" />
                          <StatusBadge status={offer.status} />
                        </div>
                        <h4 className="text-xl font-bold text-[#384158] mb-2">{offer.role}</h4>
                        <div className="text-lg text-[#76777A] mb-4">{offer.company}</div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-[#76777A]">Annual Salary</div>
                            <div className="text-2xl font-bold text-[#384158]">{offer.salary}</div>
                          </div>
                          <div>
                            <div className="text-sm text-[#76777A]">Joining Date</div>
                            <div className="text-lg font-medium text-[#384158]">{offer.joiningDate}</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          {offer.benefits.map((benefit, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-[#5BD1D7] text-sm rounded-full border border-[#5BD1D7]">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-4 py-2 bg-[#5BD1D7] text-white rounded-lg hover:bg-[#4ABCC2] transition-colors">
                          Accept Offer
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                          Negotiate Terms
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">Top Hiring Companies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topCompanies.map(company => (
                  <div key={company.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#14BDEE] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#ECFEFF] rounded-lg flex items-center justify-center text-[#14BDEE] font-bold">
                          {company.logo}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#384158]">{company.name}</h4>
                          <div className="text-sm text-[#76777A] mb-2">{company.industry}</div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4 text-[#76777A]" />
                              <span className="text-sm text-[#384158]">{company.openings} openings</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-[#384158]">{company.rating}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-[#384158] rounded-lg hover:bg-[#EFF6FF] transition-colors">
                        View Jobs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preparation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#384158]">Placement Preparation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-[#384158]">Resources</h4>
                  <div className="space-y-3">
                    {preparationResources.map((resource, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#14BDEE] transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium text-[#384158]">{resource.title}</div>
                            <div className="text-sm text-[#76777A] mt-1">{resource.type}</div>
                            <div className="text-sm text-[#76777A] mt-2">
                              {resource.date || resource.duration || resource.pages}
                            </div>
                          </div>
                          <button className="px-3 py-1 text-sm bg-[#14BDEE] text-white rounded-lg hover:bg-[#0DA8D4] transition-colors">
                            {resource.status === 'available' ? 'Access' : 'Register'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-[#384158]">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#14BDEE]" />
                      <div>
                        <div className="font-medium text-[#384158]">Update Resume</div>
                        <div className="text-sm text-[#76777A]">Upload latest version</div>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors flex items-center gap-3">
                      <Video className="w-5 h-5 text-[#5BD1D7]" />
                      <div>
                        <div className="font-medium text-[#384158]">Mock Interview</div>
                        <div className="text-sm text-[#76777A]">Practice with expert</div>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors flex items-center gap-3">
                      <Target className="w-5 h-5 text-[#60A5FA]" />
                      <div>
                        <div className="font-medium text-[#384158]">Skill Assessment</div>
                        <div className="text-sm text-[#76777A]">Test your knowledge</div>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left hover:bg-[#EFF6FF] hover:border-[#14BDEE] transition-colors flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#14BDEE]" />
                      <div>
                        <div className="font-medium text-[#384158]">Network with Alumni</div>
                        <div className="text-sm text-[#76777A]">Connect with placed seniors</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-[#ECFEFF] rounded-xl p-6 border border-[#EFF6FF]">
        <h3 className="font-semibold text-[#384158] mb-4">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] to-[#14BDEE] rounded-full flex items-center justify-center text-white font-bold">
                RS
              </div>
              <div>
                <div className="font-medium text-[#384158]">Rahul Sharma</div>
                <div className="text-sm text-[#76777A]">Google, ₹25 LPA</div>
              </div>
            </div>
            <p className="text-sm text-[#76777A] italic">
              "The placement assistance was exceptional. Mock interviews helped me ace the real ones!"
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] to-[#5BD1D7] rounded-full flex items-center justify-center text-white font-bold">
                PM
              </div>
              <div>
                <div className="font-medium text-[#384158]">Priya Mehta</div>
                <div className="text-sm text-[#76777A]">Amazon, ₹22 LPA</div>
              </div>
            </div>
            <p className="text-sm text-[#76777A] italic">
              "Resume building workshops and technical prep sessions were game-changers for me."
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 hover:border-[#14BDEE] border border-gray-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#60A5FA] to-[#14BDEE] rounded-full flex items-center justify-center text-white font-bold">
                AS
              </div>
              <div>
                <div className="font-medium text-[#384158]">Amit Singh</div>
                <div className="text-sm text-[#76777A]">Microsoft, ₹28 LPA</div>
              </div>
            </div>
            <p className="text-sm text-[#76777A] italic">
              "The personalized mentorship and company-specific preparation made all the difference."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementsPage;