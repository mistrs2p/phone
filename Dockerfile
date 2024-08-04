# Use Node.js LTS version as base image
FROM node

# Set working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using nodemon for development
CMD ["npm", "run", "start:dev", "--", "-eng", "mysql"]