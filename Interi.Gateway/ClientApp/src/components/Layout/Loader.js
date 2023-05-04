const Loader = () => {
  return (
    <div className="d-flex h-100 text-center text-bg-dark body-div">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto"></header>
        <main className="px-3">
          <div className="spinner-border avatar-lg text-primary" role="status"></div>
        </main>
      </div>
    </div>
  );
}
export default Loader;
