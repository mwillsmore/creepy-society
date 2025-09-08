import fs from 'fs'
import path from 'path'

const src = path.join(process.cwd(), 'content', 'stories')
const dest = path.join(process.cwd(), 'public', 'stories')

fs.cpSync(src, dest, { recursive: true })
