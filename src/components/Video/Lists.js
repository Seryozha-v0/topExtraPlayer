import React from "react";
import { Link } from "react-router-dom";

const Lists = ({ videos }) => {
    return (
        <>
            {videos.map((item, i) => (
                <div key={i} style={{ margin: '10px 0', border: '1px solid black' }}>
                    <Link to={`/video/${item._id}`}>
                        <img src={item.previewImage} style={{ width: '100px', border: '1px solid red' }} />
                    </Link>
                    <Link to={`/video/${item._id}`}><p>{item.title}</p></Link>
                </div>
            ))}
        </>
    )
}

export default Lists;