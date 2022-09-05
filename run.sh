docker build -t novqigarrix/nextjs-puppeteer .

# Run in the container
# docker container create --name nextjs-puppeteer -p 3000:3000 novqigarrix/nextjs-puppeteer

# Expose to 3000
# docker container create --name nextjs-puppeteer -p 3000:3000 novqigarrix/nextjs-puppeteer

docker container start nextjs-puppeteer