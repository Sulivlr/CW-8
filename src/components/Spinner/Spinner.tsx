const Spinner = () => {
  return (
    <div className="text-center mt-3" style={{fontSize: '300px'}}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;