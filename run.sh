docker build -t novqigarrix/nextjs-puppeteer .

docker container create --name nextjs-puppeteer -p 3000:3000 novqigarrix/nextjs-puppeteer

docker container start nextjs-puppeteer