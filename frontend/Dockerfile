# frontend/Dockerfile

# Define the base image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .


CMD ["npm", "run", "dev"]
