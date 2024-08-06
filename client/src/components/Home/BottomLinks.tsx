    import { Link } from "react-router-dom"

    type Props = {
        hoverWidth: string
        to: string
        text: string
    }
    const BottomLinks = () => {

        const LinkItem = ({ to, text }: Omit<Props, 'hoverWidth'>) => {
            return (
                <li className="sm:py-1">
                    <Link 
                        to={to} 
                        className="relative text-[10px] transition-all duration-300 hover:text-orange-400 group sm:text-sm"
                    >
                        {text}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </li>
            );
        };
        
        return (
            <div className="relative min-h-[70vh] bg-offWhite">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('./src/assets/HL.jpg')", backgroundPosition: "center 60%" }} />
                <div className="relative flex flex-col sm:flex-row flex-wrap justify-between items-start px-4 sm:px-[5%] py-8 sm:py-[10%] h-full gap-8 sm:gap-4">
                    <div className="text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/5 mb-6 sm:mb-0">
                        <h3 className="font-semibold text-sm mb-3">WHY US?</h3>
                        <hr className="border-t-2 border-Dark my-4"/>
                        <ul>
                            <LinkItem to="/about-us" text="RELIABLE" />
                            <LinkItem to="/about-us" text="COST EFFECTIVE"  />
                            <LinkItem to="/about-us" text="FRIENDLY" />
                            <LinkItem to="/about-us" text="ECONOMICAL"  />
                        </ul>
                    </div>

                    <div className="text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/5 mb-6 sm:mb-0">
                        <h3 className="font-semibold text-sm  mb-3">SHOPPING OFFERS</h3>
                        <hr className="border-t-2 border-Dark my-4"/>
                        <ul>
                            <LinkItem to="/shop" text="SHOP OFFERS"  />
                            <LinkItem to="/shop" text="LATEST PRODUCT" />
                            <LinkItem to="/shop" text="FEATURED PRODUCT"  />
                            <LinkItem to="/search" text="MODELS AND SPECS" />
                            <LinkItem to="/shop" text="BEST SELLING PRODUCT" />
                        </ul>
                    </div>

                    <div className="text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/5 mb-6 sm:mb-0">
                        <h3 className="font-semibold text-sm  mb-3">WHO WE ARE?</h3>
                        <hr className="border-t-2 border-Dark my-4"/>
                        <ul>
                            <LinkItem to="/contact-us" text="CONTACT US" />
                            <LinkItem to="/about-us" text="ABOUT US" />
                        </ul>
                    </div>

                    <div className="text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/5 mb-6 sm:mb-0">
                        <h3 className="font-semibold text-sm  mb-3">INVESTORS</h3>
                        <hr className="border-t-2 border-Dark my-4"/>
                        <ul>
                            <LinkItem to="https://github.com/cmd-HMN" text="HMN"  />
                        </ul>
                    </div>

                    <div className="text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/5 mb-6 sm:mb-0">
                        <h3 className="font-semibold text-sm mb-3">BE ONE OF US</h3>
                        <hr className="border-t-2 border-Dark my-4"/>
                        <ul>
                            <LinkItem to="/admin-guide" text="BE A WORKER" />
                            <LinkItem to="/investor-guide" text="BE A INVESTOR" />
                            <LinkItem to="/supporter-guide" text="BE A SUPPORTER" />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


    export default BottomLinks