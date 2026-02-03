// server/routes/courses.js - Updated with proper enrollment
const express = require('express');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all courses (public)
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/courses - Fetching all courses');
    
    const { category, search, minPrice, maxPrice, level } = req.query;
    
    let filter = { status: 'active' };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { 'instructor.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (level) {
      filter.level = level;
    }
    
    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');
    
    console.log(`Found ${courses.length} courses`);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// POST batch enroll multiple courses (FIXED VERSION)
router.post('/enroll/batch', auth, async (req, res) => {
  try {
    const { courseIds } = req.body;
    const studentId = req.student.id;
    
    console.log(`🛒 Student ${studentId} batch enrolling in ${courseIds?.length || 0} courses:`, courseIds);
    
    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({ message: 'No courses provided' });
    }
    
    const enrollments = [];
    const errors = [];
    const successfulEnrollments = [];
    
    for (const courseId of courseIds) {
      try {
        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
          errors.push(`Course ${courseId} not found`);
          continue;
        }
        
        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
          student: studentId,
          course: courseId
        });
        
        if (existingEnrollment) {
          errors.push(`Already enrolled in "${course.title}"`);
          continue;
        }
        
        // Create enrollment
        const enrollment = new Enrollment({
          student: studentId,
          course: courseId,
          status: 'active',
          enrolledAt: new Date(),
          lastAccessed: new Date(),
          progress: 0
        });
        
        await enrollment.save();
        
        // Update course enrollment count
        course.studentsEnrolled = (course.studentsEnrolled || 0) + 1;
        await course.save();
        
        // Update student's enrolled courses
        await Student.findByIdAndUpdate(studentId, {
          $push: {
            enrolledCourses: {
              courseId: courseId,
              enrolledAt: new Date(),
              progress: 0
            }
          }
        });
        
        enrollments.push(enrollment);
        successfulEnrollments.push({
          courseId: courseId,
          courseTitle: course.title,
          enrollmentId: enrollment._id,
          enrolledAt: enrollment.enrolledAt
        });
        
        console.log(`✅ Enrolled student ${studentId} in course: ${course.title}`);
        
      } catch (error) {
        console.error(`❌ Error enrolling in course ${courseId}:`, error.message);
        errors.push(`Failed to enroll in course: ${error.message}`);
      }
    }
    
    res.json({
      success: true,
      message: `Batch enrollment completed. Successfully enrolled in ${successfulEnrollments.length} courses.`,
      successful: successfulEnrollments,
      totalEnrolled: successfulEnrollments.length,
      errors: errors.length > 0 ? errors : undefined
    });
    
  } catch (error) {
    console.error('❌ Error in batch enrollment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during enrollment', 
      error: error.message 
    });
  }
});

// GET my enrolled courses (FIXED VERSION)
router.get('/enrolled/my-courses', auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    console.log(`📚 Fetching enrolled courses for student: ${studentId}`);
    
    const enrollments = await Enrollment.find({ 
      student: studentId,
      status: { $in: ['active', 'completed'] }
    })
    .populate({
      path: 'course',
      select: 'title shortDescription price originalPrice discount duration level category instructor features studentsEnrolled rating reviews bestSeller thumbnail status'
    })
    .sort({ enrolledAt: -1 });
    
    console.log(`📊 Found ${enrollments.length} enrollments for student ${studentId}`);
    
    if (enrollments.length === 0) {
      return res.json([]);
    }
    
    // Format the response
    const enrolledCourses = enrollments.map(enrollment => {
      const course = enrollment.course;
      if (!course) {
        return null;
      }
      
      return {
        _id: course._id,
        title: course.title,
        shortDescription: course.shortDescription,
        description: course.fullDescription || course.shortDescription,
        price: course.price,
        originalPrice: course.originalPrice,
        discount: course.discount,
        duration: course.duration,
        level: course.level,
        category: course.category,
        instructor: course.instructor,
        features: course.features || [],
        studentsEnrolled: course.studentsEnrolled || 0,
        rating: course.rating || 0,
        reviews: course.reviews || 0,
        bestSeller: course.bestSeller || false,
        thumbnail: course.thumbnail,
        enrollmentId: enrollment._id,
        enrolledAt: enrollment.enrolledAt,
        progress: enrollment.progress || 0,
        status: enrollment.status || 'active',
        lastAccessed: enrollment.lastAccessed
      };
    }).filter(course => course !== null);
    
    console.log(`✅ Returning ${enrolledCourses.length} enrolled courses`);
    res.json(enrolledCourses);
    
  } catch (error) {
    console.error('❌ Error fetching enrolled courses:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// GET single enrollment status
router.get('/check-enrollment/:courseId', auth, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.student.id,
      course: req.params.courseId
    });
    
    res.json({
      isEnrolled: !!enrollment,
      enrollment: enrollment
    });
  } catch (error) {
    console.error('Error checking enrollment:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Test endpoint to verify enrollment
router.get('/debug/enrollments', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.student.id })
      .populate('course', 'title')
      .populate('student', 'name email');
    
    res.json({
      studentId: req.student.id,
      totalEnrollments: enrollments.length,
      enrollments: enrollments
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;