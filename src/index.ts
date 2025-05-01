console.log("Hello, World!");

// If I had more time, this is where an Express.js server would be implemented
//
// I would use index.ts as the entrypoint and the service would be Dockerized via a multi-stage build to reduce image size.
// The image would run as a non-root user, e.g. node.
