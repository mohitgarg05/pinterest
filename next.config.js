/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: false,
  env : {
    MONGO_URI : 
    "mongodb://monugarg:mohitgarg@cluster0-shard-00-00.nxmqg.mongodb.net:27017,cluster0-shard-00-01.nxmqg.mongodb.net:27017,cluster0-shard-00-02.nxmqg.mongodb.net:27017/?ssl=true&replicaSet=atlas-tyr9l6-shard-0&authSource=admin&retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
