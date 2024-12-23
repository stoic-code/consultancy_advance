import SideNavContent from './content'

const SideNav = () => {
  return (
    <>
      <div className="sticky left-0 top-0 hidden h-screen w-[250px] flex-col items-start bg-secondary px-2 pb-8 pt-6 md:min-w-[250px] lg:flex 2xl:bg-white  print:hidden">
        <SideNavContent />
      </div>
    </>
  )
}

export default SideNav
