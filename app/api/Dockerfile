# Use an official Node.js runtime as a base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose the port your application will run on (replace 3000 with your app's port if necessary)
EXPOSE 3000

CMD ["npm", "start"]