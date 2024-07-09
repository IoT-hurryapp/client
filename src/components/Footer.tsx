const Footer = () => {
  return (
    <footer className="w- h-fit flex flex-col items-center border-t p-4 gap-1">
      <p className="font-bold text-xl opacity-80">Made By Team 9</p>
      <span className="text-sm font-medium opacity-50">
        All rights reserved
        <time>{new Date().getFullYear()}©</time>
      </span>
    </footer>
  );
};

export default Footer;
