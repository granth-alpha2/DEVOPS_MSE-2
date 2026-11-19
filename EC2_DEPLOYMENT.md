# EC2 Deployment

## 1. AWS instance setup

Create an Ubuntu 22.04 or 24.04 EC2 instance with at least 2 CPU cores and 4 GB RAM.

Open these inbound security-group rules:

| Port | Source | Purpose |
|---|---|---|
| 22 | Your IP | SSH administration |
| 80 | 0.0.0.0/0 | Public HTTP application |
| 443 | 0.0.0.0/0 | HTTPS, after a domain and certificate are configured |

Do not open ports 3000, 8000, 5432, or 6379 publicly. Docker Compose keeps these services on the internal bridge network.

## 2. Install Docker on EC2

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git openssl
sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu
```

Log out and reconnect before running Docker commands.

## 3. Clone and deploy

```bash
git clone <YOUR_REPOSITORY_URL> AgriProfit
cd AgriProfit
chmod +x scripts/ec2_deploy.sh

PUBLIC_IP="$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)" scripts/ec2_deploy.sh
```

The first deployment:

- Generates PostgreSQL and JWT secrets in `.env`
- Builds Next.js and FastAPI containers
- Starts PostgreSQL/PostGIS, Redis, Next.js, FastAPI, and Nginx
- Waits for `/api/health`
- Initializes PostgreSQL only when its persistent volume is first created

Open:

```text
http://<EC2_PUBLIC_IP>/
http://<EC2_PUBLIC_IP>/backend
http://<EC2_PUBLIC_IP>/api/health
http://<EC2_PUBLIC_IP>/ml/docs
http://<EC2_PUBLIC_IP>/ml/health
```

## 4. Verify containers

```bash
docker compose ps
docker compose logs --tail=100 nginx app ml postgres redis
curl -fsS http://127.0.0.1/api/health
curl -fsS http://127.0.0.1/ml/health
```

## 5. Update or redeploy

```bash
cd AgriProfit
git pull
PUBLIC_IP="$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)" ./scripts/ec2_deploy.sh
```

## 6. Back up and restore PostgreSQL

Create a backup:

```bash
docker compose exec -T postgres pg_dump -U agriprofit_admin agriprofit | gzip > agriprofit-backup.sql.gz
```

Restore into a running database:

```bash
gunzip -c agriprofit-backup.sql.gz | docker compose exec -T postgres psql -U agriprofit_admin -d agriprofit
```

## 7. HTTPS

For HTTPS, attach an Elastic IP, create a DNS A record for a domain, install Certbot, and add a 443 server block or use an AWS Application Load Balancer. The current deployment is HTTP and is ready for HTTP demonstration or a follow-up TLS setup.
