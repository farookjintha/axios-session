import { useEffect, useState } from 'react';
import axios from 'axios';


const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const getQuotes = () => {
        axios.get("http://localhost:4000/api/quotes").then(response => {
            setQuotes(response.data);
            console.log('Quotes: ', response.data)
        }).catch(err => {
            setError(err);
        })
    }
    const postQuotes = () => {
        axios.post("http://localhost:4000/api/add-quotes", {
            quote: "You are never too old to set another goal or to dream a new dream.",
            // quote: message,
            created_at: "07/07/2022"
        }).then(response => {
            console.log('Post Quote: ', response)
            getQuotes();
        }).catch(err => {
            setError(err);
        })
    }

    const putQuotes = () => {
        axios.put("http://localhost:4000/api/update-quotes/62dd2da6be44ed70374b6abc", {
            quote: "You can be everything. You can be the infinite amount of things that people are.",
            // quote: message,
            created_at: "07/07/2022"
        }).then(response => {
            console.log('Update Quote: ', response)
            getQuotes();
        }).catch(err => {
            setError(err);
        })
    }
    const deleteQuote = () => {
        axios.delete("http://localhost:4000/api/delete-quote/62dd2da6be44ed70374b6abc").then(response => {
            console.log('Delete Quote: ', response)
            getQuotes();
        }).catch(err => {
            setError(err);
        })
    }

    useEffect(() => {
        getQuotes();
    }, [])

    return(
        <>
        <h5>Quotes: </h5>
        {
            quotes.map((q, index) => (
                <div>
                    <div><span style={{fontWeight: 600}}>Message : </span> {q.quote}</div>
                </div>
            ))
        }

        <div>
            {/* <input onChange={setMessage} /> */}
            <button onClick={postQuotes}>Post quote</button>
            <button onClick={putQuotes}>Update quote</button>
            <button onClick={deleteQuote}>Delete quote</button>
        </div>

        </>
    )
}


export default Quotes;