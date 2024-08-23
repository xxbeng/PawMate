# Use an official Node image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose port 3000 to the outside
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
