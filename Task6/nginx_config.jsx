http {
    # Настройка upstream для балансировки нагрузки
    upstream backend_servers {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    limit_req_zone $binary_remote_addr zone=ins-partner-limit:1m rate=10r/m;
 
    server {
        listen 80;
 
        location / {
            limit_req zone=ins-partner-limit nodelay
            limit_req_status 429;
            proxy_pass http://backend_servers;
        }
 
    }
 }
  