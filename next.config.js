/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: false,
  env : {
    MONGO_URI : "mongodb+srv://monugarg:mohitgarg@cluster0.nxmqg.mongodb.net/?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
