import react, {useState} from 'react'
import axios from 'axios'
import {Button} from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material'


import Select from 'react-select'

const App = () => {

  //config for dropdown
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "blue" : "white",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "blue" : "white"
      }
    }),
    option: (styles, {isFocused, isSelected}) => ({
      ...styles, 
      background: isFocused
          ? 'grey'
          : isSelected
              ? 'black'
              : undefined,
      zIndex: 1
  }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      backgroundColor: 'black',
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
      zIndex: 100,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };
  



  const [content,setContent] = useState('')
  const [toggleState, setToggleState] = useState(false)
  const [emailID,setEmailID] = useState('')
  const [days, setDays] = useState({value: '0', label: 'Today'})
  
  const handleDayChange = (obj) => {
    setDays(obj)
  }

  const sendEmail = (event) => {

      const sendObject = {
        emailID: emailID,
        content: content,
        days: days.value,
      }

      console.log('Obejct to be sent is', sendObject)
      axios.post('/sendEmail', sendObject).then(response => {
          console.log(`Response has been sent!!!`)
      })

      setEmailID('')
      setContent('')
      setDays(days.value = '0', days.label = 'Today')

  }
  //dayselect logic

  const options = [
    { value: '0', label: 'Today' },
    { value: '1', label: 'Tomorrow' },
    { value: '7', label: 'Next week' }
  ]


  return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "linear-gradient(#e66465, #9198e5)"
      }}>
        <h1 style = {{color: "#fff"}}>recaller.</h1>
        <form 
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: '#f5f4f2',
          }}
          onSubmit={(e) => e.preventDefault()}>
          <h3>write your thoughts out</h3>
          <div>
            <Input
              sx={{
                width: "80vw",
                marginTop: "10px",
                marginBottom: "20px",
                background: "transparent",
                outline: "none",
                overflow: "auto",
                fontSize: "1em",
                color: "white"

              }} 
              
              multiline='True'
              placeholder='What do you want to recall later' value={content} onChange={(e) => setContent(e.target.value)}

            />
            
          </div>
          <div>
          {
            toggleState === false
            ?<div>
                <Button 
                  style = {{
                    marginRight: '20px'
                  }}
                  size = 'medium' variant = 'outlined' onClick={() => {setToggleState(true)} }>Send to Email
                </Button>
                <Button 
                  disabled = 'true' size = 'medium' variant = 'outlined' onClick={() => {setToggleState(false)} }>Send to Notion
                </Button>
              </div>
            :null
          }
          </div>
          {
            toggleState === true
            ?
              (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField 
                    sx={{
                      width: "300px",
                      "& .MuiInputLabel-root": {color: 'white'},//styles the label
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "default" },
                      },
                    }}
                  
                    inputProps={{ style: 
                      { 
                        color: "white",
                        
                      } 
                    }}
                    id="outlined-basic" label="Email" variant="outlined" value={emailID} onChange={(event) => setEmailID(event.target.value)} />
                  {/* <Input 
                    style={{
                      width: "40vw",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }} 
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    variant='outlined' 
                    color='secondary'
                    size='small'
                    placeholder="Email to send to" value={emailID} onChange={(event) => setEmailID(event.target.value)}/> */}
                  <p>When do you want to schedule?</p>
            
                  <Select
                    styles = {customStyles}
                    value={days}
                    options={options}
                    onChange={handleDayChange}
                    getOptionLabel={x => x.label}
                    getOptionValue={x => x.value} />
                    
                  <Button 
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }} 
                    size = 'medium' variant = 'outlined' onClick={sendEmail}>Recall</Button>
                  
                </div>
              )
            : 
              (
                null
              )
          }
        
          

        </form>
      </div>
  )
}

export default App