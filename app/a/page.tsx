import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'


export default function Page() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzbGFtLmVneS45NDFAZ21haWwuY29tIiwiaWF0IjoxNzE3MTAzNjMyfQ.yKg6-zJxXpIBJCDF3XKQcVBWjNrDhnZzBvgUECoHQrY'
    
    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET!!) as JwtPayload
        return <p>{decoded.email}</p>
    } catch (error) {
        return <h1>hello</h1>
    }
}