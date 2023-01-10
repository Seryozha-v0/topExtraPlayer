import React from "react";

const Lists = ({ videos }) => {
    return (
        <>
            {videos.map((item, i) => (
                <div key={i} style={{ margin: '10px 0', border: '1px solid black' }}>
                    <a href={`/video/${item._id}`}>
                        <img src={item.previewImage} style={{ width: '100px', border: '1px solid red' }} />
                    </a>
                    <a href={`/video/${item._id}`}><p>{item.title}</p></a>
                </div>
            ))}
        </>
    )
}

export default Lists;