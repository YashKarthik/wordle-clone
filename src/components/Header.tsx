const Header = () => {

  return (
    <header className="text-4xl font-bold flex justify-center p-2">
      Wordle
      <div className="text-xs">
        (clone)
      </div>

      <a href="https://github.com/yashkarthik" target="_blank"
        className="absolute top-5 right-5 text-sm font-normal">
        GitHub 🔗
      </a>
    </header>
  )
}

export default Header;
