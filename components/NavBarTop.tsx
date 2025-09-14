import Image from 'next/image'
import TextAction from '@/components/TextAction'
import LanguageSelector from '@/components/LanguageSelector'
import SignUpButton from '@/components/SignUpButton'

function NavBarTop() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white top-0 list-none border-b border-slate-200">
      <Image
        src='/logo-nav.png'
        alt='Logo Rentverse'
        className='w-auto h-12'
        width={150}
        height={48} />

      <nav className="hidden md:flex items-center space-x-8">
        <li>
          <TextAction href={'/'} text={'List your property'} />
        </li>

        <li>
          <LanguageSelector />
        </li>

        <li>
          <SignUpButton />
        </li>
      </nav>
    </div>
  )
}

export default NavBarTop