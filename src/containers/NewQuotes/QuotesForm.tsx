import React, {useState} from 'react';
import {ApiQuote} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';



const QuotesForm = () => {
  const navigate = useNavigate();
  const [quotesForm, setQuotesForm] = useState<ApiQuote>({
    author: '',
    category: '',
    text: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    setQuotesForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      console.log(quotesForm);


      await axiosApi.post('/quotes.json', quotesForm);

      navigate('/');
    } catch (error) {
      console.error('error happened');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <form className="container-fluid" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Author</label>
        <input required type="text" onChange={onChange} value={quotesForm.author} className="form-control" name="author" id="author"
               placeholder="Author"/>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select required onChange={onChange} className="form-select" value={quotesForm.category} name="category" id="category">
          <option value="">Select Category</option>
          <option value="star-wars">Star Wars</option>
          <option value="famous-people">Famous People</option>
          <option value="saying">Saying</option>
          <option value="motivation">Motivation</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Text</label>
        <textarea required onChange={onChange} className="form-control" value={quotesForm.text} id="text" name="text"></textarea>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>Save</button>
    </form>

  );
};

export default QuotesForm;