# Step 1: Build the React app using Node.js
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire source code into the container
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the built React app using Nginx
FROM nginx:alpine

# Copy the build folder from the previous build stage to Nginx’s default folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Run Nginx in the foreground (this is the default for Nginx)
CMD ["nginx", "-g", "daemon off;"]