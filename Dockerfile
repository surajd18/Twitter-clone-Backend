# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild native modules if necessary
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 8000

# Run the app
CMD ["node","src/index.js"]
