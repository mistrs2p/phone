# Use Node.js LTS version as base image
FROM node:22.5.1-alpine3.19

# Set working directory inside the container
WORKDIR .

# Bundle app source
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript
# RUN npm run build

# Expose the port your app runs on
# EXPOSE 3000

# Command to run your app using nodemon for development
CMD ["npm", "run", "start:dev"]