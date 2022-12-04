const Header = () => {
  return (
    <div className="px-5 flex justify-between items-center my-4">
      <div className="flex items-center space-x-5">
        <img
          src="https://seeklogo.com/images/M/medium-logo-33836F45D2-seeklogo.com.png"
          alt=""
          className="w-44 object-contain"
        />
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3 className="cursor-pointer">Home</h3>
          <h3 className="cursor-pointer">About</h3>
          <h3 className="bg-green-600 text-white px-4 py-1 rounded-full cursor-pointer">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="border rounded-full border-green-600 px-4 py-1">
          Get Started
        </h3>
      </div>
    </div>
  );
};

export default Header;
