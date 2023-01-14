const styles = {
    //App.js
    container: 'min-h-screen bg-site-black text-white', //throughout the whole screen w,h put black
    box: 'flex h-screen justify-center items-center',//responsible for centering the items to the middle of the page
    contentCenter: 'text-center text-white',
    greenButton: 'bg-site-green md:py-4 md:px-7 md:hover:scale-125 md:text-sm font-bold tracking-xl rounded-3xl py-3 px-4 text-xxs hover:text-white hover:bg-site-grey hover:border hover:border-white',
    title: 'font-bold text-xl md:text-3xl tracking-wide leading-tightest',
    //Profile.js
    screenContainer: 'min-h-screen flex',
    navContainer: 'bg-black shadow-xl',
    //Navbar
    //size: 'md:w-12 md:h-12 h-2 w-2',
    iconSize: 'md:w-4 md:h-4 m-2 h-2',
    iconName: 'md:text-xxs md:pt-2 md:visible text-label text-center tracking-base leading-tight',
    icon: 'text-site-icon',
    iconContainer: 'grid grid-rows-3 pt-20 md:py-24 text-center',
    eachIcon: 'md:w-28 md:py-4 w-20 py-10 text-site-icon font-normal hover:bg-site-grey hover:border-l-4 hover:border-site-green w-full',
    logo: '',
    iconBorder: 'hover:border-l-4 hover:border-site-green',
    //Home
    pageContainer: 'flex flex-col justify-center',
    mainContainer: 'md:px-10 md:py-8 pt-16 w-full',
    logout: 'absolute top-0 right-0 md:mr-20 md:mt-8 mt-4 mr-4 flow-root',
    whiteButton: 'bg-transparent border border-white uppercase rounded-3xl font-semibold md:text-label text-label tracking-xl leading-wide px-3 py-2 md:px-6 md:py-2 hover:bg-white hover:text-black active:text-black active:bg-white',
    profileLetter: '',
    topSection: 'text-center',
    // backgroundLetter: 'bg-site-dull-green md:py-14 md:px-10 py-8 px-12 md:text-6xl text-5xl text-center text-black font-bold border-0 rounded-full',
    backgroundLetter: 'md:text-6xl text-5xl text-center text-black font-bold bg-site-green',
    backgroundImage: 'md:w-44 md:h-44 w-24 h-24 rounded-full m-auto',
    name: 'md:text-5xl text-3xl font-white font-bold tracking-normal pt-2 md:pt-4',
    number: 'text-xl font-semibold text-site-green',
    descriptionContainer: 'flex justify-center py-8 gap-4 md:gap-10',
    descriptionData: 'text-label md:text-sm font-normal uppercase',
    description: 'text-site-icon text-xs tracking-xl',
    //data-block
    userTitle: 'text-sideheading',
    dataSection: 'grid md:grid-cols-2 grid-cols-1 md:py-8 py-8 font-semibold',
    dataContainer: 'md:text-lg text-sm md:px-8 px-4 py-4',
    dataHeading: 'flex flex-row justify-between pb-4',
    spinner: "flex items-center w-full min-h-screen justify-center",
    boxContainer: 'flex flex-row items-center py-3 md:py-4',
    boxImage: 'h-12 border-none rounded-full',
    boxSq: 'h-12',
    labelSize: 'md:text-heading font-normal ',
    details: 'grid grid-cols-2 w-full',
    trackName: 'text-title md:text-title font-normal',
    artistName: 'text-xs md:text-subtitle font-normal text-grey text-site-icon',
    timeStamp: 'text-xs md:text-subtitle font-normal text-site-icon',
    imgOnHover: 'hover:pointer hover:bg-site-grey',
    //individual pages
    subPageContainer: 'flex justify-between',
    subPageHeading: 'text-sideheading font-semibold text-lg text-xl md:text-2xl',
    links: 'flex',
    linkButtons: 'mt-2 ml-2 mr-2 border-transparent border-b-2 text-site-icon active:border-white focus:border-white active:text-white focus:text-white',
    //top artists
    artistContainer: 'flex grid md:grid-cols-5 grid-cols-2 gap-[20px] w-full auto-cols-max',
    contentContainer: 'flex text-center items-center justify-center mt-10 md:mt-10',
    artistImages: 'md:h-[200px] md:w-[200px] h-[100px] w-[100px] object-center border-none rounded-full hover:bg-site-grey',
    contentPageContainer: 'px-5 md:py-10 md:px-10',
    individualArtistName: 'text-title mb-[2px] border-transparent border-b-2 hover:border-white',
    nameContainer: 'py-6'
}
/*
No of pages = 1+3 => (Home)+(Artists+Tracks+Recently Played)
*/
export default styles;

