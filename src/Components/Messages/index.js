import {AiTwotoneLike} from 'react-icons/ai'
import './index.css'

const Messages = (props) => {
    const {item,updateLikeCount} = props 
    const {message,hours,minutes,user,id,likeCount} = item
    const initial = user[0]

    const modifyLikeCount = () => {
        updateLikeCount(id);
    }
    let initialClassName = ''

    switch(initial){
        case 'A': initialClassName  = 'grey'
        break
        case'B': initialClassName = 'green'
        break
        case 'C': initialClassName = 'blue'
        break 
        case 'D':initialClassName = 'purple'
        break
        case 'E':initialClassName = 'orange'
        break 
        default: break
    }
    
    return(<li className="message-container">
            <div ><h2 className={`initial ${initialClassName}`}>{initial}</h2></div>
            <div className='details-container'>
            <div className='username-time-container'>
            <h2 className='username'>{user}</h2>
            <p className='time'>{hours}:{minutes}</p>
            </div>
            <div className='message-like-container'>
            <div className='message-item'><p>{message}</p></div>
            <div className='like-container'>
            <button onClick={modifyLikeCount} className='like-btn'><AiTwotoneLike color ='#007BFF'  className='like-icon'/> </button>
            {(likeCount > 0)  && <p className='like-count'>{likeCount}</p>}
            </div>
            </div>
            </div>

    </li>)

}

export default Messages