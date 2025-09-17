import ContentWrapper from '@/components/ContentWrapper'
import SearchBoxProperty from '@/components/SearchBoxProperty'
import ListFeatured from '@/components/ListFeatured'
import ListPopularLocation from '@/components/ListPopularLocation'

function ListsPage() {
  return (
    <ContentWrapper>
      <SearchBoxProperty/>
      <ListFeatured/>
      <ListPopularLocation/>
    </ContentWrapper>
  )
}

export default ListsPage
