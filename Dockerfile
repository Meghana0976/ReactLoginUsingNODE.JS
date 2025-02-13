# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Set environment variable for OpenSSL legacy support
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Step 7: Expose the port React runs on
EXPOSE 3000

# Step 8: Start the React app
CMD ["npm", "start"]
