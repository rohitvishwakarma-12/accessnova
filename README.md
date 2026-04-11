# AccessNova

A modern web application built with Next.js that provides accessibility tools and services with an intelligent chat interface powered by Google's Generative AI.

## Features

- 🤖 AI-powered chat interface using Google Generative AI
- 📧 Email contact form with Nodemailer integration
- 🎨 Responsive design with Handlebars templating
- ⚙️ Accessibility guidelines and tools
- 🔧 Service offerings showcase
- 💼 Professional layout system
- 📱 Mobile-friendly responsive design

## Tech Stack

- **Frontend:** Next.js 15, React 19
- **Backend:** Node.js with Next.js API routes
- **Styling:** CSS (public/css)
- **Email:** Nodemailer
- **AI:** Google Generative AI
- **Language:** TypeScript
- **Package Manager:** npm

## Project Structure

```
accessNova/
├── components/          # React components
│   └── SiteLayout.tsx  # Main layout component
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   ├── chat.ts    # Chat API endpoint
│   │   └── contact.ts # Contact form API
│   ├── _app.tsx       # App wrapper
│   ├── index.tsx      # Home page
│   ├── contact.tsx    # Contact page
│   ├── services.tsx   # Services page
│   ├── tools.tsx      # Tools page
│   └── guidelines.tsx # Guidelines page
├── lib/               # Utility libraries
│   ├── chat-service.ts      # Chat service logic
│   ├── contact-service.ts   # Email service logic
│   └── template-loader.ts   # Template utilities
├── public/            # Static assets
│   ├── css/          # Stylesheets
│   ├── images/       # Images
│   ├── robots.txt    # SEO robots file
│   └── sitemap.xml   # Sitemap for SEO
├── views/            # Handlebars templates
├── src/              # Additional source code
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript config
└── next.config.mjs   # Next.js configuration
```

## Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Setup Steps

1. **Clone or Extract the Project**
   ```bash
   unzip accessNova.zip
   cd accessNova
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add:
   - `NEXT_PUBLIC_API_URL` - Your application URL
   - `GOOGLE_API_KEY` - Google Generative AI API key
   - `SMTP_HOST` - Email SMTP server
   - `SMTP_PORT` - SMTP port
   - `SMTP_USER` - SMTP username
   - `SMTP_PASS` - SMTP password
   - `SMTP_FROM` - Sender email address

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## API Endpoints

### Chat API
- **URL:** `/api/chat`
- **Method:** `POST`
- **Body:** `{ message: string }`
- **Returns:** AI-generated response

### Contact API
- **URL:** `/api/contact`
- **Method:** `POST`
- **Body:** `{ name, email, message }`
- **Returns:** Confirmation response

## Configuration Files

### .env.local (Required)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
GOOGLE_API_KEY=your_google_api_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@yourdomain.com
```

### next.config.mjs
- Configures Next.js build and runtime settings
- Optimizes for production deployment

### tsconfig.json
- TypeScript configuration
- Path mapping and compiler options

## Deployment

### For Hostinger
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Hostinger deployment instructions.

### Quick Deployment Steps
1. Build: `npm run build`
2. Upload to server
3. Install dependencies: `npm install`
4. Set environment variables
5. Start: `npm start` or use PM2

### For Other Platforms
- **Vercel:** Zero-config deployment for Next.js
- **Heroku:** Add Procfile and deploy
- **AWS:** Use EC2 or Amplify
- **DigitalOcean:** Use App Platform

## Security

- Environment variables are used for sensitive data
- Input validation on all form submissions
- CSRF protection enabled
- CORS configured
- SSL/HTTPS recommended for production

## Performance

- Next.js automatic code splitting
- Image optimization
- CSS minification
- Production builds are optimized
- Caching headers configured

## Troubleshooting

### Port Already in Use
```bash
kill -9 $(lsof -t -i:3000)
```

### Build Errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### API Not Responding
1. Check Google API key in `.env.local`
2. Verify SMTP credentials
3. Check API logs: `npm run dev` (with debug output)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.3.0 | React framework |
| react | ^19.1.0 | UI library |
| @google/generative-ai | ^0.24.1 | AI chat |
| nodemailer | ^8.0.4 | Email sending |
| dotenv | ^17.4.0 | Environment config |
| hbs | ^4.2.1 | Handlebars templates |
| typescript | ^5.7.3 | Type safety |

## Development Best Practices

1. **Code Style:** Follow Prettier and ESLint rules
   ```bash
   npm run format
   npm run lint
   ```

2. **TypeScript:** Use strict mode
   - Enable `strict: true` in tsconfig.json
   - Type all function parameters and returns

3. **Environment:** Never commit `.env` files
   - Always use `.env.local` for local development
   - Use `.env.example` as template

4. **Testing:** Add tests for critical functions
   ```bash
   npm run test
   ```

## Contributing

1. Create a feature branch
2. Make changes and test locally
3. Format and lint: `npm run format && npm run lint`
4. Build for production: `npm run build`
5. Commit with clear messages

## License

UNLICENSED - All rights reserved

## Support

For issues and questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
2. Review Next.js docs: https://nextjs.org/docs
3. Check Google Generative AI docs: https://ai.google.dev/

## Version Information

- **Project Version:** 0.0.1
- **Node.js Requirement:** >=18.0.0
- **npm Requirement:** >=8.0.0
- **Last Updated:** April 11, 2026

---

**Ready for Production:** ✅ Yes  
**Deployment Status:** Clean and ready for Hostinger upload
