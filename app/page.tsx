import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ContentWrapper from '@/components/ContentWrapper'
import ModalEmailCheck from '@/components/ModalEmailCheck'
import ModalSignUp from '@/components/ModalSignUp'
import ModalLogIn from '@/components/ModalLogIn'
import SearchBoxProperty from '@/components/SearchBoxProperty'
import ListFeatured from '@/components/ListFeatured'
import ListPopularLocation from '@/components/ListPopularLocation'

export default function Home() {
  return (
    <div>
      <NavBar />
      <ContentWrapper>
        {/*<ModalEmailCheck isModal={false}/>*/}
        {/*<ModalSignUp isModal={false}/>*/}
        {/*<ModalLogIn isModal={false}/>*/}
        <SearchBoxProperty/>
        <ListFeatured/>
        <ListPopularLocation/>
      </ContentWrapper>
      <Footer/>
    </div>
  )
}
