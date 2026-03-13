# 🐳 Docker Deployment Guide for Vlagalabs

This guide provides comprehensive instructions for deploying the Vlagalabs application using Docker and Docker Compose.

## 📋 Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose V2
- At least 2GB of available RAM
- 10GB of free disk space

## 🚀 Quick Start

### 1. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` and configure the following essential variables:

```env
# Database Configuration
POSTGRES_USER=vlagalabs
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=vlagalabs

# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-minimum-32-characters

# Application
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=production

# AWS S3 (if using S3 for media storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name
```

### 2. Build and Run

Start all services with a single command:

```bash
docker-compose up -d
```

This will:
- Pull the PostgreSQL 16 Alpine image
- Build the Next.js application
- Run database migrations
- Start the application on port 3000

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Payload Admin**: http://localhost:3000/admin
- **Database**: localhost:5432

## 🔧 Docker Services

### Application Service (`app`)

- **Image**: Custom Node.js 20-alpine multi-stage build
- **Port**: 3000
- **Dependencies**: PostgreSQL database
- **Volumes**: 
  - `media_uploads:/app/media` - Persists uploaded media files

### Database Service (`postgres`)

- **Image**: postgres:16-alpine
- **Port**: 5432
- **Volumes**: 
  - `postgres_data:/var/lib/postgresql/data` - Persists database data

## 📝 Common Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Volumes (⚠️ This will delete all data)

```bash
docker-compose down -v
```

### Rebuild Application

```bash
docker-compose up -d --build app
```

### Access Application Shell

```bash
docker-compose exec app sh
```

### Run Database Migrations Manually

```bash
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npm run payload migrate
```

### Database Backup

```bash
docker-compose exec postgres pg_dump -U vlagalabs vlagalabs > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Database Restore

```bash
docker-compose exec -T postgres psql -U vlagalabs vlagalabs < backup_file.sql
```

## 🔒 Production Deployment

### Security Checklist

- [ ] Change default database passwords
- [ ] Generate strong PAYLOAD_SECRET (minimum 32 characters)
- [ ] Use environment-specific .env files
- [ ] Enable HTTPS/SSL
- [ ] Configure proper CORS settings
- [ ] Set up database backups
- [ ] Implement monitoring and logging
- [ ] Use secrets management (Docker secrets, Vault, etc.)

### Production docker-compose.override.yml

Create a `docker-compose.prod.yml` for production settings:

```yaml
version: '3.8'

services:
  app:
    restart: always
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G

  postgres:
    restart: always
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

Run with:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Verify database connection
docker-compose exec postgres psql -U vlagalabs -d vlagalabs -c "SELECT 1"
```

### Application Won't Start

```bash
# Check application logs
docker-compose logs app

# Verify environment variables
docker-compose exec app printenv

# Rebuild without cache
docker-compose build --no-cache app
```

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Or change the port in docker-compose.yml
ports:
  - "3001:3000"  # Maps host port 3001 to container port 3000
```

### Out of Disk Space

```bash
# Remove unused Docker resources
docker system prune -a --volumes

# Check Docker disk usage
docker system df
```

## 📊 Monitoring

### Health Checks

The docker-compose.yml includes health checks for the database:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U vlagalabs"]
  interval: 10s
  timeout: 5s
  retries: 5
```

### Resource Usage

```bash
# Monitor resource usage
docker stats

# Check specific container
docker stats vlagalabs-app
```

## 🔄 Updates and Maintenance

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build app
```

### Update Dependencies

```bash
# Update npm packages
docker-compose exec app npm update

# Rebuild the image
docker-compose up -d --build app
```

## 📦 Multi-Stage Build Explanation

The Dockerfile uses a multi-stage build for optimization:

1. **deps**: Installs dependencies
2. **builder**: Builds the application
3. **runner**: Minimal production image with only necessary files

Benefits:
- Smaller final image size
- Better layer caching
- Improved security (no build tools in production)
- Faster deployments

## 🌐 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `POSTGRES_USER` | Database username | Yes | vlagalabs |
| `POSTGRES_PASSWORD` | Database password | Yes | vlagalabs_password |
| `POSTGRES_DB` | Database name | Yes | vlagalabs |
| `DATABASE_URL` | Full database connection string | Auto-generated | - |
| `PAYLOAD_SECRET` | Secret key for Payload CMS | Yes | - |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the application | Yes | http://localhost:3000 |
| `NODE_ENV` | Node environment | Yes | production |
| `AWS_ACCESS_KEY_ID` | AWS access key (if using S3) | No | - |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key (if using S3) | No | - |
| `AWS_REGION` | AWS region | No | us-east-1 |
| `AWS_BUCKET_NAME` | S3 bucket name | No | - |

## 🎯 Best Practices

1. **Use .env files**: Never commit sensitive data
2. **Regular backups**: Automate database backups
3. **Monitor logs**: Set up log aggregation
4. **Health checks**: Implement application health endpoints
5. **Resource limits**: Set appropriate CPU and memory limits
6. **Network security**: Use Docker networks for service isolation
7. **Image versioning**: Tag images with version numbers
8. **Volume backups**: Regularly backup Docker volumes

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)

## 🤝 Support

For issues and questions:
- Check the [DOCKER.md](./DOCKER.md) file
- Review [PAYLOAD_CMS_INTEGRATION.md](./PAYLOAD_CMS_INTEGRATION.md)
- Open an issue on GitHub

---

**Last Updated**: March 2026
**Docker Version**: 20.10+
**Docker Compose Version**: V2
