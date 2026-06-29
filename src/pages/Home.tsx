import { Helmet } from 'react-helmet-async'
import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/sections/HeroSection'
import VGMSection from '@/components/sections/VGMSection'
import ShortFilmsSection from '@/components/sections/ShortFilmsSection'
import FoleySection from '@/components/sections/FoleySection'
import DiscographySection from '@/components/sections/DiscographySection'
import { useContent } from '@/context/ContentContext'

export default function Home() {
  const meta = useContent('meta')

  return (
    <PageTransition>
      <Helmet>
        <title>{meta.defaultTitle}</title>
        <meta name="description" content={meta.defaultDescription} />
        <meta property="og:title"       content={meta.defaultTitle} />
        <meta property="og:description" content={meta.defaultDescription} />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={meta.siteUrl} />
      </Helmet>

      <HeroSection />
      <VGMSection />
      <ShortFilmsSection />
      <FoleySection />
      <DiscographySection />
    </PageTransition>
  )
}
