import { GiFrisbee } from "react-icons/gi";

const Header = () => {
  return (
    <header className='w-full fixed top-0 left-0 flex items-center justify-center gap-4 mb-8 bg-white'>
      <GiFrisbee size={50} className='text-blue-500' />
      <h1 className="text-4xl font-bold text-blue-500">DiscScore</h1>
    </header>
  );
};

export default Header;
