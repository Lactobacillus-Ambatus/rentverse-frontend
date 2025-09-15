import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ContentWrapper from '@/components/ContentWrapper'
import ModalEmailCheck from '@/components/ModalEmailCheck'
import ModalSignUp from '@/components/ModalSignUp'

export default function Home() {
  return (
    <div>
      <NavBar />
      <ContentWrapper>
        {/*<ModalEmailCheck isModal={false}/>*/}
        <ModalSignUp isModal={false}/>
      </ContentWrapper>
      <Footer/>
    </div>
  )
}
