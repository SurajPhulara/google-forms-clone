import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Responses = () => {
    const { form_id } = useParams();

    const [state, setState] = useState({responses:[]});

    // async function abc(){
    //     axios.get(`https://googleformsclone-suraj66171.b4a.run/getAllResponses/${form_id}`)
    //     .then(response =>{
    //         // console.log("loaded form : ",response.data)
    //         if(response.data) {
    //             setState(response.data)
    //             // console.log(response.data)
    //         }
    //     })
    // }

    useEffect(()=>{
        axios.get(`https://googleformsclone-suraj66171.b4a.run/getAllResponses/${form_id}`)
        .then(response =>{
            // console.log("loaded form : ",response.data)
            if(response.data) {
                setState(response.data)
                // console.log(response.data)
            }
        })
    },[form_id])


    return (
        <div className="questionFormContainer">
            <div className='blankForm'>
                <div className="form__header" style={{ height:'fit-content'}}>
                        <div className="form__header_title" style={{ textTransform: 'none', }}> {`${state?.responses.length}`} Responses </div>
                        {/* <DownloadButton /> */}
                        <div className="responses" style={{marginTop:'20px', overflow:'auto'}}>

                        {state?.responses.map((element, i)=>{
                            // console.log(element)
                            // for(var j in element)
                            // {
                            //     console.log("for "+i+" : ",element[j])
                            // }
                            // console.log("lll ",Object.values(element))
                            return(
                                <div key={i}>
                                    Response {i+1} : &emsp;
                                    {Object.values(element).map((e, k)=>{
                                        if(e!==" ")
                                        return <span key={k}>answer {`${k+1}`} : {`${e}`} &emsp;&emsp;</span>
                                        else
                                        return <span key={k}>answer {`${k+1}`} : not answred &emsp;&emsp;</span>
                                    })}
                                </div>
                                )
                            })}
                            </div>
                </div>
            </div>
        </div>
    )
}

export default Responses
