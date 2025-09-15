import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ContentWrapper from '@/components/ContentWrapper'
import ModalEmailCheck from '@/components/ModalEmailCheck'

export default function Home() {
  return (
    <div>
      <NavBar />
      <ContentWrapper>
        <ModalEmailCheck isModal={false}/>
      </ContentWrapper>
      <Footer/>
    </div>
  )
}
