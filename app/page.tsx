import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ContentWrapper from '@/components/ContentWrapper'

export default function Home() {
  return (
    <div>
      <NavBar />
      <ContentWrapper>
        <h1 className="text-lg">
          Explore thousands of apartments, condominiums, and houses for rent across the country.
        </h1>
      </ContentWrapper>
      <Footer/>
    </div>
  )
}
