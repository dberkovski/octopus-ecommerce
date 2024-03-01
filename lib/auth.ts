import {jwtVerify, decodeJwt} from "jose";

const getJwtSecretKey = () => {
    const secretKey = process.env.JWT_SECRET_KEY
    if (!secretKey) {
        throw  new Error('JWT Secrey key is not available!')
    }
    return new TextEncoder().encode(secretKey)
}

export async function verifyJwtToken(token: string) {
    try {
        const {payload} = await jwtVerify(token, getJwtSecretKey())
        return payload
    } catch (error) {
        // JWT tokenı biz yaratmadıgımız için hata almamak adına sadece decode edip expire date time kontrolu yaptım.
        // Normalde .env'ye yazılan secret key değişkeni ile yaratılıp verfiy edilir.
        if (token !== null) {
            try {
                const decodedToken = decodeJwt(`${token["value"]}`)
                const expiredDateTime: any = decodedToken["exp"]
                const isValidExpiredDateTime: boolean = isTokenValid(expiredDateTime)
                if (isValidExpiredDateTime) {
                    return true
                } else {
                    return null
                }
            } catch (error) {
                console.log("ero",error)
                return null
            }
        }
        return null
    }
}

function isTokenValid(expirationTimestamp: number): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp < expirationTimestamp;
}