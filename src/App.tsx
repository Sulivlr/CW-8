import Appbar from './components/Appbar/Appbar';
import {Route, Routes} from 'react-router-dom';
import Quotes from './containers/Qoutes/Quotes';
import QuotesForm from './containers/NewQuotes/QuotesForm';

const App = () => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Quotes/>} />
          <Route path="/quotes/:categoryId" element={<Quotes/>} />
          <Route path="/new-quote" element={<QuotesForm/>} />
          <Route path="*" element={<h1>This Page Doesn't exist</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
