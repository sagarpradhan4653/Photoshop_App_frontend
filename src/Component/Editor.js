import React, { useState, useRef, useEffect } from 'react'
import './Editor.css';
import canvasToImage from 'canvas-to-image'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faArrowCircleLeft,
    faArrowCircleDown,
    faArrowCircleUp, 
    faArrowCircleRight,
    faFilter,
    faSun,
    faAdjust,
    faMoon,
    faBurn,
    faFileImage,
    faSave,
    faPlus,
    faMinus,
    faTextHeight
} from '@fortawesome/free-solid-svg-icons'


function Editor(props) {
    const [profileImg, setProfileImg] = useState('')
    const [blr, setBlur] = useState(0)
    const [brg, setBrg] = useState(1)
    const [contrast, setContrast] = useState(1)
    const [saturate, setSaturate] = useState(0.5)
    const [text, setText] = useState('')
    const [color,setColor] = useState('white')

    const [x, setX] = useState(250)
    const [y, setY] = useState(150)

    const filterHere = { // create a variable for filter 
        filter: `brightness(${brg}) blur(${blr}px) contrast(${contrast}) saturate(${saturate})`

    }

    const userefrence = useRef(null)
    const picLoader = (gFlag) => {
        var context = userefrence.current.getContext("2d");
        var img = new Image();
        img.src = profileImg;
        img.onload = function () {
            context.drawImage(img, 0, 0, userefrence.current.width, userefrence.current.height);
            if(gFlag){ // if gFlag will true then text will apply and move at particular direction
            context.font = "bold 32px Arial";
            context.textBaseline = "middle";
            context.fillStyle = `${color}`;
            context.fillText(`${text}`, `${x}`, `${y}`)
            // context.filter = `brightness(${brg}) blur(${blr}px) contrast(${contrast}) saturate(${saturate})`
            }


        };

    }

    // for apply filter to image 
    // this function put new image on previous image with apply filter
    const filterAp = (brg,blr,contrast,saturate) => {
        var context = userefrence.current.getContext("2d");
        userefrence.current.getContext("2d").filter = `brightness(${brg}) blur(${blr}px) contrast(${contrast}) saturate(${saturate})`
        var img = new Image();
        img.crossOrigin="anonymous"
        img.src = profileImg;
        img.onload = function () {
            context.drawImage(img, 0, 0, userefrence.current.width, userefrence.current.height);


        };

    }


    const allowText = ()=>{
        addText()
        picLoader(true)
    }


    const addText = (xFlag,yFlag)=>{
        var ctx = userefrence.current.getContext("2d")
        ctx.font = "bold 32px Arial";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `${color}`;
        ctx.fillText(`${text}`, `${xFlag ? x+10 : x}`, `${yFlag ? y+10: y}`)

    }



    
    
    //for getting text value
    const textChange = (e)=>{
        setText(e.target.value)
        // setToggle(!toggle)
    }
    // for adding directions
    const arrowRight=(x)=>{
        setX(x+10)
        picLoader(true)

    }
    const arrowDown=(y)=>{
        setY(y+10)
        picLoader(true)
    }

    const arrowLeft=(x)=>{
        setX(x-10)
        picLoader(true)
    }

    const arrowUp=(y)=>{
        setY(y-10)
        picLoader(true)
    }
    

    
    const saveImage = () => {
        const takeRef = userefrence.current
        canvasToImage(takeRef, {

            name: 'myImage',

            type: 'jpg',

            quality: 5.0      
    })
}

    


    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImg(reader.result)

            }
        }
        reader.readAsDataURL(e.target.files[0])
        e.preventDefault()
    }



    // Function for increase and decrease filters
    const blurIncrease = (brg,blr,contrast,saturate) => { // this function render all the time when blurInc function renders 
        
        setBlur(blr + 1)
        filterAp(brg,blr+1,contrast,saturate)
        picLoader(true)
     }
    const brightnessIncrease = (brg,blr,contrast,saturate) => { // this function render all the time when brightnessInc function renders 
        
        setBrg(brg + (0.1))
        filterAp(brg+0.1,blr,contrast,saturate)
        picLoader(true)
     }
    const contrastIncrease = (brg,blr,contrast,saturate) => { // this function render all the time when contrastIncr function renders 
        
        setContrast(contrast + (0.3))
        filterAp(brg,blr,contrast+0.3,saturate)
        picLoader(true)
    
    }
    const invertIncrease = (brg,blr,contrast,saturate) => { // this function render all the time when invertInc function renders 
        
        setSaturate(saturate + (0.2))
        filterAp(brg,blr,contrast,saturate+0.2)
        picLoader(true)
        
     }

    const blurDecrease = (brg,blr,contrast,saturate) => { // this function render all the time when blurDec function renders 
        
        setBlur(blr - 1)
        filterAp(brg,blr-1,contrast,saturate)
        picLoader(true)
     }
    const brightnessDecrease = (brg,blr,contrast,saturate) => { // this function render all the time when brightDec function renders 
        
        setBrg(brg - (0.1))
        filterAp(brg-0.1,blr,contrast,saturate)
        picLoader(true)
     }
    const contrastDecrease = (brg,blr,contrast,saturate) => { // this function render all the time when contrastDec function renders 
        
        setContrast(contrast - (0.3))
        filterAp(brg,blr,contrast-0.3,saturate)
        picLoader(true)
     }
    const invertDecrease = (brg,blr,contrast,saturate) => { // this function render all the time when invertDec function renders 
        
        setSaturate(saturate - (0.2))
        filterAp(brg,blr,contrast,saturate-0.2)
        picLoader(true)
     }

     // if user not logged in so this function will not allow that person
     // open editor page
    useEffect(()=>{
        if (!props.sendToAuth) {
            props.history.push('/') // if it's true push to editor page
            }
        
    },[])

    // for changing the color of text which display on canvas
    const changeTextColor = (e)=>{
        setColor(e.target.value)
    }

     

    return (
        <>
            <div>
                    <div className="container ">
                        <div className="row ">
                            <div className="col-md-12 m-auto ">
                                <canvas className="canvass"
                                    height={'500px'}
                                    width={'1400px'}
                                    ref={userefrence}
                                    style={filterHere}
                                />
                                <h4 className="text-center my-2" >Filters <FontAwesomeIcon icon={faFilter} /></h4>
                                <FontAwesomeIcon icon={faTextHeight} />
                                <input type="text" className="form-control-sm" placeholder="type your text" value={text} onChange={textChange}></input>
                                <select value={color} onChange={changeTextColor} className="form-control-sm" id="inputGroupSelect01">
                                        <option  selected>White</option>
                                        <option value="green">Green</option>
                                        <option value="black">Black</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="orange">Orange</option>
                                        <option value="brown">Brown</option>
                                        <option value="gray"><i className="fas fa-couch"></i></option>
                                </select>
                                <button className="btn btn-outline-danger" onClick={allowText}>Display</button>
                                <button className="btn btn-outline-primary" onClick={()=>{arrowRight(x)}}><FontAwesomeIcon icon={faArrowCircleRight} /></button>
                                <button className="btn btn-outline-success" onClick={()=>{arrowDown(y)}}><FontAwesomeIcon icon={faArrowCircleDown} /></button>
                                <button className="btn btn-outline-warning" onClick={()=>{arrowLeft(x)}}><FontAwesomeIcon icon={faArrowCircleLeft} /></button>
                                <button className="btn btn-outline-info" onClick={()=>{arrowUp(y)}}><FontAwesomeIcon icon={faArrowCircleUp} /></button>
                            </div>
                        </div>
                            <div id="buttonclick" className="row  mt-1 mb-1 my-2 mx-1  flex-shrink">
                                <div className="col-md-3">
                                    <div className="btn-group btn-s m-2 btn-group-lg">
                                        <button onClick={()=>{contrastDecrease(brg,blr,contrast,saturate)}} className="filter-btn contrast-remove btn btn-link"><FontAwesomeIcon icon={faMinus} /></button>
                                        <button className="btn btn-outline-light btn-disable btn-s "><FontAwesomeIcon icon={faMoon} /> Contrast</button>
                                        <button onClick={()=>{contrastIncrease(brg,blr,contrast,saturate)}} className="filter-btn contrast-add btn btn-link"><FontAwesomeIcon icon={faPlus} /></button>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="btn-group btn-s m-2 btn-group-lg">
                                        <button onClick={()=>{invertDecrease(brg,blr,contrast,saturate)}} className="filter-btn saturation-remove btn btn-link"><FontAwesomeIcon icon={faMinus} /></button>
                                        <button className="btn btn-outline-danger btn-disable btn-s "><FontAwesomeIcon icon={faAdjust} /> Saturate</button>
                                        <button onClick={()=>{invertIncrease(brg,blr,contrast,saturate)}} className="filter-btn saturation-add btn btn-link"><FontAwesomeIcon icon={faPlus} /></button>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="btn-group btn-s m-2  btn-group-lg">
                                        <button onClick={()=>{brightnessDecrease(brg,blr,contrast,saturate)}} className="filter-btn vibrance-remove btn btn-link "><FontAwesomeIcon icon={faMinus} /></button>
                                        <button className="btn btn-outline-warning btn-disable btn-s "><FontAwesomeIcon icon={faSun} /> Brightness</button>
                                        <button onClick={()=>{brightnessIncrease(brg,blr,contrast,saturate)}} className="filter-btn vibrance-add btn btn-link"><FontAwesomeIcon icon={faPlus} /></button>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="btn-group btn-s m-2 btn-group-lg">
                                        <button onClick={()=>{blurDecrease(brg,blr,contrast,saturate)}} className="filter-btn negative-remove btn btn-link"><FontAwesomeIcon icon={faMinus} /></button>
                                        <button className="btn btn-outline-primary btn-disable btn-s "><FontAwesomeIcon icon={faBurn} /> Blur</button>
                                        <button onClick={()=>{blurIncrease(brg,blr,contrast,saturate)}} className="filter-btn negative-add btn btn-link"><FontAwesomeIcon icon={faPlus} /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-group btn-s btn-group-lg">
                                <input type="file" onChange={imageHandler} className="btn btn-outline-primary btn-sm " id="upload-file"></input>
                                <button className="btn btn-outline-danger btn-sm " onClick={picLoader}><FontAwesomeIcon icon={faFileImage} />  load Image</button>
                                <button onClick={() => { saveImage() }} className="btn btn-outline-warning btn-sm " ><FontAwesomeIcon icon={faSave} />  Download</button>
                            </div>
                        
                    </div>
            </div>
        </>
    )
}

const mapStateToProps = (state)=>{
    return {
        state,
        sendToAuth: state.tokenKey.newToken != null ? true : false
    }
}


export default connect(mapStateToProps)(Editor)

