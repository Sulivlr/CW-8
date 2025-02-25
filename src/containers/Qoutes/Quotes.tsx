import { useCallback, useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import { ApiQuotes, Quote } from '../../types';
import Categories from '../../components/categories/categories';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();

  const fetchQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = '/quotes.json';
      if (categoryId) {
        url += `?orderBy="category"&equalTo="${categoryId}"`;
      }
      const quotesResponse = await axiosApi.get<ApiQuotes | null>(url);
      const quotesData = quotesResponse.data;

      if (!quotesData) {
        setQuotes([]);
      } else {
        const quotesArray = Object.keys(quotesData).map((id) => ({
          ...quotesData[id],
          id,
        }));
        setQuotes(quotesArray);
      }
    } catch (error) {
      console.error('something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const deletePost = useCallback(async (id: string) => {

      setIsLoading(true);
      try {
        await axiosApi.delete('/quotes/' + id + '.json');
      } catch (error) {
        console.error('Error deleting quotes', error);
      } finally {
        setIsLoading(false);
        void fetchQuotes();
      }
  }, [fetchQuotes]);



  let quotesArea = <Spinner />;

  if (!isLoading && quotes) {
    quotesArea = (
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-4">
            <Categories />
          </div>
          <div className="col-8">
            {quotes.map((quote) => (
              <div className="card mb-3" key={quote.id}>
                <div className="card-body">
                  <p>{quote.text}</p>
                  <span>{quote.author}</span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => deletePost(quote.id)}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (!isLoading && !quotes) {
    quotesArea = <h1>Not Found!</h1>;
  }

  return quotesArea;
};

export default Quotes;
