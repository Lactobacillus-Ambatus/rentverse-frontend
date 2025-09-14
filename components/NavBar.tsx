import NavBarBottom from '@/components/NavBarBottom'
import NavBarTop from '@/components/NavBarTop'

function NavBar() {
    return (
        <div className='w-full fixed z-50'>
          <NavBarTop />
          <NavBarBottom/>
        </div>
    )
}

export default NavBar