const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const axios = require('axios');
const https = require('https');

const { Pool } = require('pg');
const smsController = require('./smsController');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('خطا در اتصال به دیتابیس:', err.stack);
  } else {
    console.log('✅ اتصال به دیتابیس PostgreSQL برقرار شد');
    release();
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
    process.env.CORS_ORIGIN
  ].filter(Boolean),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'بیش از حد مجاز درخواست ارسال کرده‌اید. لطفاً کمی صبر کنید.'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', smsController);

// Initialize database tables
async function initializeDatabase() {
  try {
    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        technology VARCHAR(255),
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create services table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ جداول دیتابیس با موفقیت ایجاد شدند');
    
    // Insert sample data
    await insertSampleData();
    
  } catch (error) {
    console.error('❌ خطا در ایجاد جداول:', error);
  }
}

// Insert sample data
async function insertSampleData() {
  try {
    // Check if data already exists
    const projectCount = await pool.query('SELECT COUNT(*) FROM projects');
    if (parseInt(projectCount.rows[0].count) === 0) {
      // Insert sample projects
      await pool.query(`
        INSERT INTO projects (title, description, technology, status) VALUES
        ('وبسایت فروشگاهی', 'طراحی و توسعه یک فروشگاه آنلاین کامل با پنل مدیریت', 'React, Node.js, PostgreSQL', 'completed'),
        ('اپلیکیشن موبایل', 'توسعه اپلیکیشن موبایل برای سفارش غذا', 'React Native, Express', 'active'),
        ('سیستم مدیریت انبار', 'ایجاد سیستم جامع مدیریت انبار برای شرکت بزرگ', 'Vue.js, Python, MySQL', 'completed'),
        ('پلتفرم آموزشی', 'سامانه آموزش آنلاین با قابلیت برگزاری کلاس مجازی', 'Next.js, Socket.io', 'active')
      `);
    }

    const serviceCount = await pool.query('SELECT COUNT(*) FROM services');
    if (parseInt(serviceCount.rows[0].count) === 0) {
      // Insert sample services
      await pool.query(`
        INSERT INTO services (title, description, icon, category) VALUES
        ('توسعه وب', 'ایجاد وبسایت‌های مدرن و واکنش‌گرا با جدیدترین تکنولوژی‌ها', '💻', 'development'),
        ('اپلیکیشن موبایل', 'طراحی و توسعه اپلیکیشن‌های موبایل بومی و کراس پلتفرم', '📱', 'mobile'),
        ('خدمات ابری', 'مایگریشن و مدیریت زیرساخت‌های ابری مقیاس‌پذیر', '☁️', 'cloud'),
        ('طراحی UI/UX', 'ایجاد تجربه کاربری بهینه و رابط‌های کاربری زیبا', '🎨', 'design'),
        ('امنیت سایبری', 'محافظت از داده‌ها و سیستم‌های شما در برابر تهدیدات', '🔒', 'security'),
        ('تحلیل داده', 'تبدیل داده‌های خام به بینش‌های قابل اجرا', '📊', 'analytics')
      `);
    }

    console.log('✅ داده‌های نمونه با موفقیت اضافه شدند');
  } catch (error) {
    console.error('❌ خطا در اضافه کردن داده‌های نمونه:', error);
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'سرور به درستی کار می‌کند',
    timestamp: new Date().toISOString()
  });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('خطا در دریافت پروژه‌ها:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت پروژه‌ها'
    });
  }
});

// Get project count
app.get('/api/projects/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM projects WHERE status = $1', ['completed']);
    res.json({
      success: true,
      count: parseInt(result.rows[0].count)
    });
  } catch (error) {
    console.error('خطا در دریافت تعداد پروژه‌ها:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت تعداد پروژه‌ها'
    });
  }
});

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('خطا در دریافت خدمات:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت خدمات'
    });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً تمام فیلدها را پر کنید'
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'فرمت ایمیل صحیح نیست'
      });
    }

    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: 'پیام شما با موفقیت ارسال شد',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('خطا در ثبت پیام تماس:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید'
    });
  }
});

// Get all contacts (admin only)
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('خطا در دریافت پیام‌ها:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت پیام‌ها'
    });
  }
});

// Add new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, technology, status = 'active' } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'عنوان و توضیحات الزامی است'
      });
    }

    const result = await pool.query(
      'INSERT INTO projects (title, description, technology, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, technology, status]
    );

    res.status(201).json({
      success: true,
      message: 'پروژه با موفقیت اضافه شد',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('خطا در اضافه کردن پروژه:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در اضافه کردن پروژه'
    });
  }
});

// Endpoint to send OTP
app.post('/api/send-otp', (req, res) => {
    console.log('OTP endpoint called with data:', req.body);
    const { to } = req.body;

    if (!to) {
        console.log('Missing phone number');
        return res.status(400).json({ message: 'شماره موبایل الزامی است' });
    }

    console.log('Sending OTP to:', to);
    
    // Generate a random 6-digit OTP
    const mockOTP = Math.floor(100000 + Math.random() * 900000);
    
    // For development, we'll use a mock OTP system
    console.log('================================');
    console.log('🔐 کد تأیید برای شماره:', to);
    console.log('📱 کد OTP:', mockOTP);
    console.log('⏰ زمان ارسال:', new Date().toLocaleString('fa-IR'));
    console.log('================================');
    
    // Simulate API delay
    setTimeout(() => {
        res.json({ 
            success: true,
            message: 'کد تأیید با موفقیت ارسال شد', 
            code: mockOTP.toString(),
            note: 'این کد آزمایشی است و در کنسول سرور نمایش داده شده'
        });
    }, 1500); // 1.5 second delay to simulate real API
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'مسیر مورد نظر یافت نشد'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('خطای سرور:', error);
  res.status(500).json({
    success: false,
    message: 'خطای داخلی سرور'
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 سرور روی پورت ${PORT} راه‌اندازی شد`);
  console.log(`🔗 آدرس: http://localhost:${PORT}`);
  
  // Initialize database
  await initializeDatabase();
});

module.exports = app;
