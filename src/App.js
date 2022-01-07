import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import './App.css';


function App() {

  const url = 'https://jsonplaceholder.typicode.com/posts'
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [isPending, setIsPending] = useState(true)
  var filteredPosts = search.length === 0 ? posts : posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
  

  const [currentPage, setCurrentPage] = useState(1)
  const [PostPerPage, setPostPerPage] = useState("25")


  const handleClick = (e) => {
    setCurrentPage(Number(e.target.textContent))
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function goToNextPage() {
      setCurrentPage((page) => page + 1);
  } 


  const indexOfLastPost = currentPage * PostPerPage
  const indexOfFirstPost = indexOfLastPost - PostPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)


  const pageNumbers = [];
    for(let i=1; i<= Math.ceil(filteredPosts.length/PostPerPage); i++){
        pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
        <button
            key={number}
            onClick={handleClick}
            id = {number}
            className={`paginationItem ${currentPage === number ? 'active' : null}`}
        >
        <span>{number}</span>
        </button>
    )
  })

  useEffect(() => {
    fetch(url)
      .then(data => data.json())
      .then(json => {
          setPosts(json)
          setIsPending(false)
        }
      )
  }, [])

  const renderPosts = () => (
    currentPosts.map(post => (
        <div className='post' key={post.id}>
          <div className='id-details'>
            <div className='id'>
              Id: {post.id}
            </div>
            <div className='user-id'>
              User-Id: {post.userId}
            </div>
          </div>
          <div className="title">
            Title: {post.title}
          </div>
          <div className='description'>
            Desc: {post.body}
          </div>
        </div>
      )
    )
  )


  return (
    <div className="App">
      <input 
                        type="text" 
                        id="search"
                        placeholder="Search..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus required
      />
      {isPending && (<Loader type="ThreeDots" color="#e1e1e1" height={70} width={70}/>)}
      {!isPending && renderPosts()}
      <div className="pagination">
                <button onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                Previous
                </button>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
                
                <button onClick={goToNextPage}
                className={`next ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
                >
                Next
                </button>
        </div>
    </div>
  )
}

export default App;
