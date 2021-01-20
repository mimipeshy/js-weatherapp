import generateNav from './generateNav';
import generateMain from './generateMain';
import generateFooter from './generateFooter';
const generateHome=()=>{
    const bodypage= document.querySelector('body');
    bodypage.appendChild(generateNav);
    bodypage.appendChild(generateMain);
    bodypage.appendChild(generateFooter);

}

export default generateHome();