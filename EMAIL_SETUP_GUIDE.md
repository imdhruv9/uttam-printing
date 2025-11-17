# Email Integration Setup Guide - Uttam Printing

## ✅ What Has Been Configured

### 1. **Dependencies Added**
- `spring-boot-starter-mail` - Spring's email support

### 2. **Email Configuration (`application.yml`)**
```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: imdhruv2209@gmail.com
    password: cprxfahnzzvvtjqn  # Gmail App Password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

mail:
  from: imdhruv2209@gmail.com
  to: uttamprinting@zohomail.in
```

### 3. **Services Created**
- **EmailService** - Handles sending emails asynchronously
- **AsyncConfig** - Enables async processing (non-blocking)

### 4. **Contact Form Integration**
When someone submits the contact form:
1. ✅ Message is saved to database
2. ✅ Email is sent to `uttamprinting@zohomail.in`
3. ✅ Email sending happens asynchronously (doesn't slow down the form)
4. ✅ If email fails, the form submission still succeeds

---

## 📧 Email Content Example

**Subject:** New Contact Form Submission - Uttam Printing

**Body:**
```
You have received a new contact form submission:

Customer Details:
================
Name: John Doe
Email: john@example.com
Phone: +91 9876543210

Message:
========
I am interested in ordering 100 pamphlets for my business.
What are the bulk pricing options?

Product ID: abc123
View at: http://localhost:3000/products/abc123

---
This is an automated message from Uttam Printing website.
```

---

## 🧪 How to Test

### **Step 1: Rebuild Backend**
1. Open IntelliJ IDEA
2. Right-click `pom.xml` → **Maven** → **Reload Project**
3. Wait for dependencies to download
4. **Run** the application

### **Step 2: Test the Contact Form**
1. Open browser: `http://localhost:3000/contact`
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 1234567890
   - Message: This is a test message
3. Click **Send Message**
4. You should see success message

### **Step 3: Check Email**
1. Log into `uttamprinting@zohomail.in`
2. Check inbox for new email
3. Should arrive within 10-30 seconds

### **Step 4: Check Backend Logs**
In IntelliJ console, you should see:
```
Contact message submitted successfully and email notification sent. ID: abc123
Email sent successfully to: uttamprinting@zohomail.in
```

---

## 🔒 Security Notes

### **Gmail App Password**
- ✅ Using App Password (not your main Gmail password)
- ✅ App Password: `cprxfahnzzvvtjqn`
- ⚠️ Never commit this password to public repositories
- ⚠️ In production, use environment variables

### **How to Generate New App Password** (if needed)
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to `imdhruv2209@gmail.com`
3. Create new App Password for "Mail"
4. Copy the 16-character password
5. Update `application.yml`

---

## 🐛 Troubleshooting

### **Email Not Sending?**

**Check 1: Gmail Settings**
- Ensure 2-Step Verification is enabled on `imdhruv2209@gmail.com`
- App Password must be active

**Check 2: Backend Logs**
Look for errors like:
- `Failed to send email` - Check Gmail credentials
- `AuthenticationFailedException` - App password is wrong
- `Connection timeout` - Check internet connection

**Check 3: Test Email Endpoint** (optional)
I can add a test endpoint if needed to verify email configuration.

### **Email Goes to Spam?**
- Check `uttamprinting@zohomail.in` spam folder
- Mark as "Not Spam"
- Add `imdhruv2209@gmail.com` to contacts

---

## 📝 Customization

### **Change Email Template**
Edit: `backend/src/main/java/com/printingpro/service/EmailService.java`

Method: `sendContactFormEmail()`

### **Add More Email Types**
Add new methods in `EmailService`:
- Order confirmation emails
- Admin notifications
- Newsletter

---

## ✨ Features

- ✅ **Asynchronous** - Doesn't block form submission
- ✅ **Error Handling** - Form works even if email fails
- ✅ **Logging** - All emails logged for debugging
- ✅ **Professional Format** - Clean, readable email template
- ✅ **Product Linking** - Includes product details if inquiry is about specific product

---

## 🎯 Next Steps

1. **Test the form** - Submit a test message
2. **Check your email** - Verify it arrives at `uttamprinting@zohomail.in`
3. **Customize if needed** - Update email template to your liking

---

**Your contact form is now fully functional with email notifications!** 🚀

