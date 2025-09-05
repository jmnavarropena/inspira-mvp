# 🚀 Inspira - Deployment Guide

## 📋 Netlify Deployment

### Quick Deploy

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy!

### Environment Variables

No environment variables required for the MVP version.

### Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18+

### Features Included in MVP

✅ **Complete Idea Management System**
- Create, edit, delete ideas
- State workflow management
- File attachments support
- Draft auto-save functionality

✅ **Campaign Management**
- Campaign creation and management
- Idea participation in campaigns
- Campaign filtering and search

✅ **Kanban Board**
- Drag & drop functionality
- State management
- Role-based permissions

✅ **Survey System**
- Survey builder with multiple question types
- User response interface
- Survey management dashboard

✅ **Voting System (CoDir)**
- Idea evaluation and voting
- Approval/rejection workflow
- Comment system

✅ **Role-based Authentication**
- User, Responsible, CoDir roles
- Adaptive navigation
- Permission-based features

✅ **Gamification**
- Badge system
- Points and achievements
- Personal analytics

✅ **Responsive Design**
- Mobile-optimized interface
- Modern UI/UX
- Accessibility features

## 🎯 Demo Credentials

Use the role selector in the "Inicio" page to test different user experiences:

- **Usuario**: Basic user experience
- **Responsable**: Can manage ideas and create campaigns/surveys  
- **CoDir**: Can vote on ideas + all Responsable features

## 📱 Test URLs

After deployment, test these key flows:

1. **Ideas Flow**: `/mis-ideas` → Create → Edit → Submit
2. **Campaign Flow**: `/campanas` → Participate → Submit idea
3. **Management Flow**: `/gestion` → Switch between tabs
4. **Survey Flow**: `/encuestas` → Respond to surveys
5. **Role Testing**: `/` → Change roles → Test permissions

## 🔧 Performance Notes

- Bundle size optimized with code splitting
- Images optimized for web
- Lazy loading implemented
- Caching headers configured

## 📞 Support

Contact development team for any deployment issues or feature requests.

---

**Live Demo**: [URL will be available after Netlify deployment]

*Ready to showcase the future of corporate innovation! 🚀*
