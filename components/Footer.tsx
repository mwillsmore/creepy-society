import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[144px] px-2 flex justify-between items-end">
      <p className="text-white text-sm">© 2025 S&W™ Productions. All rights reserved.</p>
      <Image
        src="/SW-productions.png"
        alt="S&W Productions logo"
        width={144}
        height={144}
      />
    </footer>
  )
}
