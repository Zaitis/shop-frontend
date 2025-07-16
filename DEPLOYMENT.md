# Deployment Guide

## GitHub Actions Deployment Setup

This project uses GitHub Actions for automatic deployment to your server when code is pushed to the `main` branch.

### Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add these secrets:

| Secret Name | Description | Value |
|-------------|-------------|-------|
| `SERVER_HOST` | Server IP address | `91.99.187.62` |
| `SERVER_USER` | SSH username for server access | `deploy` |
| `SERVER_PASSWORD` | SSH password for server access | `[your-password]` |

### Server Configuration

**Server Details:**
- **IP:** 91.99.187.62
- **User:** deploy
- **Deployment Path:** /var/www/shop-demo
- **Backend:** https://shop-backend.zaitis.dev
- **API Documentation:** https://shop-backend.zaitis.dev/swagger-ui/index.html
- **Admin Credentials:** admin/zaitis123

#### Nginx Configuration Example

Create `/etc/nginx/sites-available/shop-demo`:

```nginx
server {
    listen 80;
    server_name 91.99.187.62;  # or your domain name
    
    root /var/www/shop-demo;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy to backend
    location /api/ {
        proxy_pass https://shop-backend.zaitis.dev/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Handle CORS
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/shop-demo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Apache Configuration Example

Create `/etc/apache2/sites-available/shop-demo.conf`:

```apache
<VirtualHost *:80>
    ServerName 91.99.187.62
    DocumentRoot /var/www/shop-demo
    
    <Directory /var/www/shop-demo>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Angular routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # API proxy to backend
    ProxyRequests Off
    ProxyPreserveHost On
    ProxyPass /api/ https://shop-backend.zaitis.dev/api/
    ProxyPassReverse /api/ https://shop-backend.zaitis.dev/api/
    
    # Enable compression
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \
            \.(?:gif|jpe?g|png)$ no-gzip dont-vary
        SetEnvIfNoCase Request_URI \
            \.(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
    </Location>
    
    # CORS Headers
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header always set Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"
</VirtualHost>
```

Enable the site:
```bash
sudo a2ensite shop-demo
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl reload apache2
```

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build:prod

# Copy files to server (using scp with password)
scp -r dist/* deploy@91.99.187.62:/var/www/shop-demo/

# Or use rsync
rsync -avz --delete dist/ deploy@91.99.187.62:/var/www/shop-demo/

# Set proper permissions
ssh deploy@91.99.187.62 "sudo chown -R www-data:www-data /var/www/shop-demo/ && sudo chmod -R 755 /var/www/shop-demo/"
```

### Deployment Process

1. **Automatic**: Push to `main` branch triggers deployment
2. **Manual**: Go to Actions tab → Deploy Shop Frontend → Run workflow

### Backend Integration

The frontend is configured to connect to:
- **API Base URL**: https://shop-backend.zaitis.dev
- **Swagger Documentation**: https://shop-backend.zaitis.dev/swagger-ui/index.html
- **Admin Panel**: Access with admin/zaitis123

### Testing the Deployment

After deployment, you can test:

```bash
# Test frontend
curl -I http://91.99.187.62

# Test backend API
curl -I https://shop-backend.zaitis.dev/api/categories

# Test admin API
curl -X POST https://shop-backend.zaitis.dev/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "zaitis123"}'
```

### Environment Configuration

- **Development**: Uses proxy to backend (localhost:4200 → backend)
- **Production**: Direct API calls to https://shop-backend.zaitis.dev

The production build includes:
- Optimized Angular bundles
- Minified CSS/JS
- Tree-shaking for smaller bundle size
- Production environment variables

### Troubleshooting

- **Build fails**: Check Node.js version and dependencies
- **SSH connection fails**: Verify password and server access
- **File permissions**: Ensure www-data has proper permissions
- **Nginx/Apache**: Check configuration and restart services
- **API connection**: Verify backend is accessible
- **CORS issues**: Check server configuration for proper headers

### Security Considerations

- Server uses password authentication (consider SSH keys for production)
- Backend API handles authentication and authorization
- Frontend serves static files only
- All sensitive operations go through backend API
- Admin access is controlled by backend authentication

### Monitoring

Check deployment logs in GitHub Actions for:
- Build success/failure
- File transfer completion
- Permission setting results
- Health check status
- Backend API connectivity 