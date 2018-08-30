FROM node:10

# Create a directory for hosting the app
RUN mkdir /app
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Copy the app itself
COPY . /app

# Build CSS assets
RUN npm run build-css

# Run the entrypoint by default, starting the npm server
CMD [ "npm", "start" ]
