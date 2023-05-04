import React from 'react';


const Message = (props) => (

   
        <div className="d-flex align-items-start px-2 py-1">
            {/* <img src={"avatars/" + props.user + ".jpg"} className="me-2 rounded-circle" height="24" alt="Rhonda D" /> */}
            <div className="w-100 overflow-hidden">
                
                <p className="font-13 mb-0">
                    <span className="w-75"> {props.message}</span>
                </p>
            </div>
        </div>
   
);

export default Message;