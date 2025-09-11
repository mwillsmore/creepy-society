import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-2 flex justify-center items-center relative">
      <p className="text-white text-sm">© 2025 S&W™ Productions. All rights reserved.</p>
      <Image
        src="/SW-productions.png"
        alt="S&W Productions logo"
        width={48}
        height={48}
        className="absolute bottom-2 right-2"
      />
    </footer>
  )
}
