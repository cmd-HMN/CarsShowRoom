import { Link } from "react-router-dom";

const Footer = () => {
    const day = new Date();
    const year = day.getFullYear();
    return (
        <div className="flex flex-warp sm:flex-row justify-between items-center bg-Dark p-2 sm:p-4 -mb-8">
            <div className="text-white text-[3px] sm:text-sm p-1 sm:p-2">
                <p>© {year} CARZ ALL RIGHTS</p>
                <p>
                    Made by HMN (Link 👉
                    <Link to={'https://github.com/cmd-HMN'}>
                        <i className="fa fa-github" />
                    </Link>)
                </p>
            </div>
            
            <div className="text-[8px] sm:text-2xl text-white font-cute my-2 sm:my-0 uppercase">
                www.carz.com
            </div>
            
            <div className="text-[3px] sm:text-base text-white">
                <p>Online payment</p>
                <div className="mt-1 space-x-1 sm:space-x-2">
                    <i className="fa fa-cc-mastercard text-[3px] sm:text-xl"></i>
                    <i className="fa fa-cc-visa text-[3px] sm:text-xl"></i>
                    <i className="fa fa-cc-paypal text-[3px] sm:text-xl"></i>
                    <i className="fa fa-cc-amex text-[3px] sm:text-xl"></i>
                    <i className="fa fa-cc-stripe text-[3px] sm:text-xl"></i>
                </div>
            </div>
        </div>
    );
}

export default Footer;