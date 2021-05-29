export default {
    port: process.env.PORT,
    host: process.env.HOST,
    dbUri:  process.env.DB_URI,
    saltWorkFactor: process.env.SALT_WORK_FACTOR,
    privateKey: process.env.HASH_PRIVATE_KEY,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL
}