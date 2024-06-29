import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ApiQuotes, Quote} from '../../types';
import Categories from '../../components/categories/categories';
import axiosApi from '../../axiosApi';

const Quotes = () => {

  const [quotes, setQuotes] = useState<Quote[]>([]);

  const {categoryId} = useParams();

  const fetchQuotes = useCallback(async () => {

    try {
      let url = '/quotes.json';
      if (categoryId) {
        url += `?orderBy="category"&equalTo="${categoryId}"`;
      }
      const quotesResponse = await axiosApi.get<ApiQuotes | null>(url);
      const quotes = quotesResponse.data;

      if (!quotes) {
        setQuotes([]);
      } else {
        setQuotes(Object.keys(quotes).map((id) => ({
          ...quotes[id],
          id,
        })))
      }
    } catch (error) {
      console.error('something went wrong')
    }
  }, [categoryId]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);


  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-4">
          <Categories/>
        </div>
        <div className="col-8">
          {quotes.map(quote => {
            return (
              <div className="card mb-3" key={quote.id}>
                <div className="card-body">
                  <p>
                    {quote.text}
                  </p>
                  <span>{quote.author}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  );
};

export default Quotes;