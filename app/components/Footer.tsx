export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-black border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-650">
        <div>
          <span>&copy; {currentYear} RAKA.DEV. All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#home" className="hover:text-white transition-colors">Back to top</a>
          <span>//</span>
          <span>Designed with precision</span>
        </div>
      </div>
    </footer>
  );
}
