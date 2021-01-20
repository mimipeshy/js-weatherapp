const generateNav= ()=>{
      const navi= document.createElement('nav');
    navi.innerHTML= `     
     <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">Weather App</a>
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search City/Country" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </nav>
    `;
    return navi;
}

export default generateNav();