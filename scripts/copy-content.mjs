import fs from 'fs'
import path from 'path'

const src = path.join(process.cwd(), 'content')
const dest = path.join(process.cwd(), 'public')

fs.cpSync(src, dest, { recursive: true })
