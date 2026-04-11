# AccessNova - Deployment Guide for Hostinger

## Pre-Deployment Checklist

- [x] Removed `.next` cache directory
- [x] Removed `dist` build artifacts
- [x] Removed `node_modules` directory
- [x] Removed Mac OS system files (.DS_Store)
- [x] Removed test and tmp directories
- [x] Added proper .gitignore

## Steps to Deploy on Hostinger

### 1. Upload Project
1. Log in to Hostinger cPanel
2. Go to **File Manager** or use **FTP/SFTP**
3. Navigate to your **public_html** folder
4. Upload the cleaned `accessNova.zip` file
5. Extract it in the root directory

### 2. Install Dependencies
1. Open **Terminal** in cPanel
2. Navigate to your project folder:
   ```bash
   cd public_html/accessNova
   ```
3. Install npm dependencies:
   ```bash
   npm install
   ```

### 3. Environment Configuration
1. Check the `.env.example` file for required variables
2. Create a `.env.local` file with your configuration:
   ```
   NEXT_PUBLIC_API_URL=https://yourdomain.com
   # Add any other environment variables from .env.example
   ```

### 4. Build the Project
```bash
npm run build
```

### 5. Start the Application
For development:
```bash
npm run dev
```

For production (recommended):
```bash
npm start
```

### 6. Configure cPanel
1. Go to **Setup Node.js App** in cPanel
2. Create new Node.js application
3. Select your Node version (recommended: 18+)
4. Set Application root to your project folder
5. Set Application URL to your domain
6. Set Startup file to `server.js` or `next.config.mjs`

### 7. Setup Reverse Proxy
If using cPanel's Node.js manager:
1. Your app will be automatically proxied through Apache
2. Ensure SSL certificate is installed (Let's Encrypt)

## Important Notes

### Port Configuration
- Development: `http://localhost:3000`
- Production: Node.js app will run on assigned port (usually 3000-4000)
- cPanel automatically proxies traffic to your domain

### Environment Variables
Make sure to set these variables in `.env.local`:
- Database URLs (if applicable)
- API keys (Google Generative AI, Nodemailer)
- Domain URLs
- SMTP credentials for email

### File Permissions
Ensure proper permissions:
```bash
chmod 755 public_html/accessNova
chmod 644 public_html/accessNova/**/*
```

### Database (if applicable)
If you use a database:
1. Create database in cPanel > MySQL Databases
2. Add connection string to `.env.local`
3. Run migrations: `npm run migrate` (if applicable)

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

### Port Already in Use
```bash
# Kill the process on port 3000
kill -9 $(lsof -t -i:3000)
```

### Email Not Sending
- Check SMTP credentials in `.env.local`
- Verify Nodemailer configuration in `lib/contact-service.ts`
- Check cPanel firewall settings for port 587/465

### Performance Issues
- Enable gzip compression in cPanel
- Set up caching headers
- Use CDN for static assets in `public/` folder

## PM2 (Optional - For Better Process Management)

If Hostinger allows PM2:

1. Install PM2:
```bash
npm install -g pm2
```

2. Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'accessnova',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

3. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Security Recommendations

1. ✅ Set `NODE_ENV=production`
2. ✅ Use strong environment variables
3. ✅ Enable HTTPS (Let's Encrypt)
4. ✅ Keep dependencies updated: `npm audit fix`
5. ✅ Restrict sensitive file access in `.env`
6. ✅ Enable CORS protection
7. ✅ Validate all user inputs

## Useful Commands

```bash
# Check version
npm --version
node --version

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Check for security vulnerabilities
npm audit
npm audit fix
```

## Support Resources

- Hostinger Support: https://support.hostinger.com
- Next.js Docs: https://nextjs.org/docs
- Node.js Docs: https://nodejs.org/docs
- npm Docs: https://docs.npmjs.com

---

**Project Version:** 0.0.1  
**Last Updated:** April 11, 2026  
**Node.js Requirement:** 18.0.0 or higher
