# 🚀 وبسایت مدرن فارسی

یک وبسایت مدرن و زیبا ساخته شده با React، TypeScript، Tailwind CSS و فونت Vazirmatn که کاملاً از زبان فارسی و جهت راست‌چین (RTL) پشتیبانی می‌کند.

## ✨ ویژگی‌ها

- ⚡ **سرعت بالا**: استفاده از Vite برای توسعه سریع
- 🎨 **طراحی مدرن**: Tailwind CSS برای رابط کاربری زیبا
- 🔤 **فونت فارسی**: فونت Vazirmatn برای نمایش بهتر متون
- 📱 **واکنش‌گرا**: طراحی responsive برای همه دستگاه‌ها
- 🌐 **پشتیبانی RTL**: کاملاً راست‌چین و مناسب فارسی
- 🔧 **TypeScript**: تایپ‌سیف و قابل نگهداری

## 🛠️ تکنولوژی‌های استفاده شده

### Frontend
- **React 18** - کتابخانه UI
- **TypeScript** - زبان برنامه‌نویسی
- **Vite** - ابزار build سریع
- **Tailwind CSS** - فریمورک CSS
- **Axios** - HTTP client
- **Vazirmatn Font** - فونت فارسی مدرن

### Backend
- **Node.js** - محیط اجرای JavaScript
- **Express** - فریمورک وب
- **PostgreSQL** - دیتابیس رابطه‌ای
- **Helmet** - امنیت HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - محدودیت نرخ درخواست

### Database
- **PostgreSQL 17.1** - میزبانی شده روی Liara Cloud
- **جداول**: contacts, projects, services
- **SSL Connection** - اتصال امن

## 🚀 نحوه اجرا

### نصب وابستگی‌ها
```bash
# نصب وابستگی‌های فرانت‌اند و بک‌اند
npm run install:all
```

### اجرای کامل (فرانت‌اند + بک‌اند)
```bash
npm run dev:full
```

### اجرای جداگانه

#### فرانت‌اند (پورت 5173)
```bash
npm run dev
```

#### بک‌اند (پورت 3001)
```bash
npm run server
```

### ساخت برای تولید
```bash
npm run build
```

### پیش‌نمایش نسخه تولید
```bash
npm run preview
```

## 📁 ساختار پروژه

```
my-modern-app/
├── src/
│   ├── App.tsx          # کامپوننت اصلی
│   ├── index.css        # استایل‌های اصلی + Tailwind
│   └── main.tsx         # نقطه ورود اپلیکیشن
├── public/              # فایل‌های استاتیک
├── tailwind.config.js   # تنظیمات Tailwind
├── postcss.config.js    # تنظیمات PostCSS
└── vite.config.ts       # تنظیمات Vite
```

## 🎨 سفارشی‌سازی

### تغییر فونت
فونت‌های دیگر را می‌توانید در `tailwind.config.js` اضافه کنید:

```javascript
theme: {
  extend: {
    fontFamily: {
      'custom-font': ['Font-Name', 'sans-serif'],
    },
  },
}
```

### افزودن رنگ‌های جدید
```javascript
theme: {
  extend: {
    colors: {
      'custom-blue': '#1e40af',
    },
  },
}
```

## 📝 توسعه

پروژه آماده برای توسعه است. می‌توانید:

1. کامپوننت‌های جدید در پوشه `src/components` اضافه کنید
2. صفحات جدید با React Router ایجاد کنید
3. API ها و سرویس‌ها را متصل کنید
4. دیتابیس سمت سرور اضافه کنید

## 📞 پشتیبانی

اگر سوالی دارید یا مشکلی پیش آمد، لطفاً یک issue ایجاد کنید.

---

**ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایرانی**
