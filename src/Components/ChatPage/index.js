import {Component} from 'react'
import {BsFillPeopleFill,BsSend,BsPeople} from 'react-icons/bs'
import {MdDarkMode} from 'react-icons/md'
import {HiOutlineLightBulb} from 'react-icons/hi2'
import {PiSmileyWinkThin} from 'react-icons/pi'

import {v4} from 'uuid' 
import Picker from 'emoji-picker-react'
import Popup from 'reactjs-popup'
import Messages from '../Messages'
import './index.css'

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]
class ChatPage extends Component {

    state = {darkMode:false,messages:[],currentMsg:'',errorText:'',triggerPopup:false}

    changeText = (event) => {
        const msg = event.target.value
        const length = msg.length 
        if (msg[length-1]=== "@"){
            console.log('triggerPopup')
            this.setState({triggerPopup:true,currentMsg:msg,errorText:''})
        }
        else {
        this.setState({triggerPopup:false,currentMsg:event.target.value,errorText:''})
        }
    }

    selectedValue = (event) => {
        const {currentMsg} = this.state
        const text =currentMsg + event.target.value 
        this.setState({currentMsg:text})
    }

    updateLikeCount = (id) => {
        

        this.setState((prevState) => ({
            messages: prevState.messages.map(item => {
                if (item.id === id){
                  return {...item,likeCount:item.likeCount + 1}   
                }
                return item 
            })
        }))

    }
    selectEmoji = (event) => {
        const {currentMsg} = this.state 
        // since we are trying to put emoji in message rather than text we have to use event.emoji, not event.target.value
        const msg = currentMsg + event.emoji
        this.setState({currentMsg : msg})
    }

    updateMode = () => {
        this.setState(prevState => ({darkMode:!prevState.darkMode}))
    }

    sendMsg = (event) => {
        event.preventDefault()
        const {currentMsg} = this.state
        if (currentMsg !== ''){
            const userIndex = Math.ceil(Math.random() * user_list.length-1)
            const user = user_list[userIndex] 
            const date =  new Date()
            const hours = date.getHours()
            const minutes = date.getMinutes()
            
            const likeCount = 0
            const data = {
                message:currentMsg,
                id: v4(),
                likeCount,
                user,
                hours,minutes
            }
            
            
            this.setState(prevState => ({messages:[...prevState.messages,data],currentMsg:'',triggerPopup:false}))
            
            
            
        }else{
            this.setState({errorText:'*Enter any text to send...'})
        }
    }

    render() {
        const {darkMode,messages,currentMsg,errorText,triggerPopup} = this.state 

        const mode= darkMode ? 'dark': 'light'
        const mode2 = darkMode ? 'hr1':'hr'
        const inputCont = darkMode? 'border-white':''
        const inputmode = darkMode ? 'input-dark':''

        const users = <form className='radio-group'>
        <div className='radio-btn'><input type="radio" name="user" value="Alan" onChange={this.selectedValue} className={`radio ${inputmode}`}/><h2>Alan</h2></div>
        <div className='radio-btn'><input type="radio" name="user" value="Bob" onChange={this.selectedValue} className={`radio ${inputmode}`}/><h2>Bob</h2></div>
        <div className='radio-btn'><input type="radio" name="user" value="Carol"  onChange={this.selectedValue} className={`radio ${inputmode}`}/> <h2>Carol</h2></div>
        <div className='radio-btn'><input type ="radio" name = 'user' value = "Dean" onChange={this.selectedValue} className={`radio ${inputmode}`}/>  <h2>Dean</h2></div>
        <div className='radio-btn'><input type = "radio" name ='user' value = 'Elin' onChange={this.selectedValue} className={`radio ${inputmode}`}/>  <h2> Elin</h2></div>
      </form>

        return(<div className={`chat-page ${mode}`}>
            <div className='chat-header'>
                <div className='chat-header-content'>
                <h1>Introductions</h1>
                <p>This channel is for company wide Chatter</p>
                </div>
                <div className='icon-container'>
                    <button className='icon-button' onClick = {this.updateMode} >{darkMode ?  <HiOutlineLightBulb className='icon' color = 'white'/>:<MdDarkMode className='icon'/> }</button>
                    {darkMode ? <BsPeople className='icon'/>:<BsFillPeopleFill className='icon'/> } <p className = 'user-count'>5</p>
                </div>
            </div>
            
                <hr className= {`${mode2}`}/>
            
            <div className='chat-page-container'>
                <ul className='chat-container'>
                    
                    {messages.map(item =>  (<Messages key= {item.id} item = {item}  updateLikeCount = {this.updateLikeCount}/>))}
                    
                </ul>
                <div className={`input-container ${inputCont}`}>
                    <Popup trigger ={<button type ='button' className='emoji-btn'>{darkMode ? <PiSmileyWinkThin className='icon' color = 'whitesmoke'/> : <PiSmileyWinkThin className='icon'/>}</button>}
                    position = 'top left'>
                    <Picker onEmojiClick = {this.selectEmoji}/> 
                    </Popup>
                    {triggerPopup && <Popup trigger = {<button className='users-display-btn'>Show users</button>} position ='top left'>{users}</Popup>}
                    <form className='form-container'>
                        <input type = 'text' 
                        placeholder = 'Enter a Message'
                        className= {`${inputmode}`}
                        value = {currentMsg}
                        onChange = {this.changeText}/> 
                        <button type ='submit' onClick={this.sendMsg} className='submit-btn'>{darkMode ?<BsSend className='icon' color ='whitesmoke'/>: <BsSend className='icon'/>}</button>
                    </form>
                    
                </div>
                <p className='error-text'>{errorText}</p>
            </div>
        </div>)
    }
}

export default ChatPage