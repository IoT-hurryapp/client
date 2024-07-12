const Footer = () => {
  return (
    <footer className="w- h-fit flex flex-col items-center border-t p-4 gap-1 mt-auto">
      <p className="font-bold text-xl opacity-80">صنع بحب بواسطة فريق 9</p>
      <span className="text-sm font-medium opacity-50">
        كل الحقوق محفوظة <time>{new Date().getFullYear()}©</time>
      </span>
    </footer>
  );
};

export default Footer;
