import React from 'react';
import './Main.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


let arrNotes = [
  {id: 0, note: "Note N1"},
  {id: 1, note: "Note N2"},
  {id: 2, note: "Note N3"}
  ];

  
function Main() {
  const [color, setColor] = React.useState("white")

  const switchMode = color => {
    setColor(color) }

  React.useEffect(() => {
    document.body.style.backgroundColor = color
      }, [color])


  const [list, setList] = React.useState(arrNotes);

  const [open, setOpen] = React.useState(false);
 
  let arrayDataItems = list.map((note) => <li key={note.id} style={{ width: '400px', textAlign: 'start', position: 'relative'}} className={ color === "white" ? "note; blackTxt" : "note; whiteTxt"}> <input type="checkbox" className="checkboxinput" />{note.note}
   <IconButton style={{ position: 'absolute', right: '35px'}}> 
  <EditIcon style={{ 
            color: color === "white" ? "gray" :"white",
            }}/>
   </IconButton>
   <IconButton style={{ position: 'absolute', right: '0'}} onClick={() => RemoveNote(note.id)}> 
  <DeleteIcon style={{ 
            color: color === "white" ? "gray" :"white",
            }}/>
   </IconButton>   <hr></hr></li>);

  const handleClickToOpen = () => {
        setOpen(true);
    }; 
 
  const handleToClose = () => {
        setOpen(false);
    };
 
  const AddNote = () => {
      let text = document.getElementById('newnote').value;
      let newNote = {id: arrNotes.length, note: text};
      list.push(newNote);
      const newList = list;

      setList(newList);

      setOpen(false);      
    }

    function RemoveNote(id) {
      const newList = list.filter((item) => item.id !== id);

      setList(newList);
    }

    function searchNote()
    {
      debugger
      let text = document.getElementById('search').value;
      if(text === ''){
        setList(arrNotes);
      }else{
        const fileteredList = list.filter((item) => item.note.includes(text));

        setList(fileteredList);
      }
    }

  return (
    <div className='MainDiv'>
        <h1 className={color === "white" ? "title; blackTxt" : "title; whiteTxt"} >TODO LIST</h1>
        <div className="center">
            <input id='search' style={{color: color === "white" ? "black": "white",
              backgroundColor: color === "white" ? "white": "black",
              borderColor: color === "black" ? "white" :"purple",
            borderWidth: '1px',
            borderRadius: '4px'
            }} className="input" onChange={() => searchNote()} placeholder="Search note..."/>
            <IconButton style={{ 
              marginTop: "0%",
              marginBottom: "0%",
              marginLeft: "5px",
              marginRight: "5px",
              height: "35px",
              width: "85px",
              borderColor: "purple",
              backgroundColor: "purple",
              borderRadius: "5px",
              color: "white"
             }} className="button1"> ALL <ArrowDownwardIcon /> </IconButton>
            <IconButton style={{ color: "white", backgroundColor: "purple" }} onClick={() => switchMode( color === "white" ? "black" :"white")}> {color === "black"  ? <Brightness7Icon /> : <Brightness4Icon /> }</IconButton>
        </div>

        <div className="center">
          <ul className="notes">{arrayDataItems}</ul>
        </div>
        
        <div className="center">
        {arrayDataItems.length == 0 ? <img style={{ width: "200px", height: "300px"}} src='./empty.webp'></img> : <div></div>
          }
          {arrayDataItems.length == 0 ? <div className={color === "white" ? "blackTxt" : "whiteTxt"}>Empty...</div> : <div></div>
          }
        </div>


        <IconButton style={{ color: "white", backgroundColor: "purple", position: 'absolute', bottom: '0', right: '0' }} variant="outlined" className='addbtn'
                onClick={handleClickToOpen}>
                <AddIcon />
            </IconButton>

        <Dialog open={open} onClose={handleToClose} className='dialog'>
          <div style={{ 
            border: 'solid',
            backgroundColor: color === "white" ? "white" :"black",
            borderColor: color === "black" ? "white" :"black",
            borderWidth: '1px',
            borderRadius: '4px'
            }}>
          <DialogTitle className={color === "white" ? 'blackTxt' : 'whiteTxt'}>{"New Note"}</DialogTitle>
                <DialogContent  className='dialogcontent'>
                    <Input style={{ 
            border: 'solid',
            backgroundColor: color === "white" ? "white" :"black",
            borderColor: color === "black" ? "white" :"black",
            borderWidth: '1px',
            borderRadius: '4px',
            color: color === "white" ? "black": "white"
            }} id='newnote' placeholder='Input your note..'> </Input>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleToClose}
                        style={{ borderColor: "purple", border: 'solid' , color: "purple",  position: 'absolute', left: '10px' }}
                        color="primary" autoFocus>
                        Close
                    </Button>

                    <Button style={{ color: "white", backgroundColor: "purple"}} onClick={AddNote}
                          color="primary" autoFocus>
                          Apply
                    </Button>
                    
                </DialogActions>
          </div>
            </Dialog>
    </div>
  );
}

export default Main;


