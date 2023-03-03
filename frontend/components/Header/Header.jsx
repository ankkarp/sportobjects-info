const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <h1>СпортИнфо</h1>
        {/* <nav>
          <button onClick={() => setMode("stats")}>Статистика</button>
          <button onClick={() => setMode("map")}>Карта</button>
        </nav> */}
      </div>
      <div className="search"></div>
    </div>
  );
};

export default Header;
