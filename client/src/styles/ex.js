const styles = {
    // App.js
    container: "justify-center min-h-screen px-6 lg:px-32 lg:py-5 py-6 bg-site-black",
    innerContainer: "items-center flex-col",
    header: "flex flex-row justify-between items-center sm:py-5 py-10",
    navbar: "flex justify-between",
    listItems: "flex space-x-3 lg:space-x-7 lg:items-center",
    contentContainer: "grid",
    section: "grid my-10 lg:my-24 grid-cols-2",
    textSection: "cols-span-8",
    images: "rounded:1xl lg:rounded-3xl flex lg:content-center",
    imageSection: "grid place-items-end lg:place-items-end",
    exchangeContainer: "flex-1 flex justify-start items-center flex-col w-full",
    headTitle: "text-white font-poppins font-black text-lg lg:text-6xl tracking-wide",
    subTitle: "text-dim-white font-poppins font-small mt-3 text-sm lg:text-md",
    exchangeBoxWrapper: "mt-10 w-full flex justify-center",
    exchangeBox: "relative lg:max-w-[700px] lg:min-w-[500px] min-w-full max-w-full gradient-border p-[2px] rounded-3xl",
    exchange: "w-full min-h-[400px] bg-site-black backdrop-blur-[4px] rounded-3xl shadow-card flex justify-center p-10",

    // AmountIn & AmountOut
    amountContainer:
        "flex justify-between items-center flex-row w-full min-w-full bg-site-dim border-[1px] border-transparent hover:border-site-dim2 min-h-[96px] sm:p-8 p-4 rounded-[20px]",
    amountInput:
        "w-full flex-1 bg-transparent outline-none font-poppins font-black text-2xl text-white",
    currencyButton:
        "flex flex-row items-center bg-site-dim2 py-2 px-4 rounded-xl font-poppins font-bold text-white",
    currencyList:
        "absolute z-10 right-0 bg-site-black border-[1px] border-site-dim2 w-full mt-2 rounded-lg min-w-[170px] overflow-hidden",
    currencyListItem:
        "font-poppins font-medium text-base text-white hover:text-dim-white px-5 py-3 hover:bg-site-dim2 cursor-pointer",

    // Exchange
    actionButton:
        "border-none outline-none px-6 py-2 font-poppins font-bold text-lg rounded-2xl leading-[24px] transition-all min-h-[56px]",
    message: "font-poppins font-lg text-white font-bold mt-7",

    // WalletButton
    walletButton:
        "bg-site-pink border-none outline-none px-1.5 py-0.05 lg:px-4 lg:py-2 font-poppins font-bold text-xs lg:text-base text-white rounded-3xl leading-[24px] hover:bg-pink-400 transition-all",

    // loader
    loader: "flex justify-center items-center flex-col w-full min-h-full",
    loaderImg: "w-56 h-56 object-contain",
    loaderText:
        "font-poppins font-normal text-dim-white text-lg text-center mt-10",

    // balance
    balance: "w-full text-left mt-2 ml-2",
    balanceText: "font-poppins font-normal text-dim-white",
    balanceBold: "font-semibold text-white",

    //footer
    footer: "text-white font-poppins text-sm lg:text-base font-normal text-center p-16 flex justify-center"
};

export default styles;
