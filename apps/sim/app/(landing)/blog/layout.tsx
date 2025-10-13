import ModernNav from '@/app/(landing)/components/nav/modern-nav'
import ModernFooter from '@/app/(landing)/components/footer/modern-footer'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModernNav />
      <main className='relative pt-16'>{children}</main>
      <ModernFooter />
    </>
  )
}
