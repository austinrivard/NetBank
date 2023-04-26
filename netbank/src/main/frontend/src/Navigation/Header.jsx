export const Header= () => {
    return(
        <nav id = "header"className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-wrap item center justify-content-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                    <img src={"/"} alt="logo"/>
                    <div className="nav-menu-wrappe flex items-center justifiy-between space-x-10">
                        <div>Home</div>
                        <div>Atm</div>
                    </div>
                    <div className="flex item-center justify-center space-x-4">
                        <div>Log In</div>
                        <div>Sign Up</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}