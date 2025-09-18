import ContentWrapper from '@/components/ContentWrapper'

async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = await params
  return (
    <ContentWrapper>
      <div>Detail Page {slug.slug}</div>
    </ContentWrapper>
  )
}

export default DetailPage